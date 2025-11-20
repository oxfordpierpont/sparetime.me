/**
 * Requests API Routes
 * GET /api/requests - Get all requests for authenticated user
 * POST /api/requests - Create a new request (public with rate limiting)
 *
 * Security:
 * - Authentication required for GET
 * - Rate limiting for POST (public endpoint)
 * - Input sanitization for all inputs
 * - ObjectId validation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Request, Notification } from '@/models';
import { requireAuth } from '@/middleware/auth';
import { isValidObjectId, sanitizeString, sanitizeObject } from '@/lib/sanitize';
import { strictRateLimit } from '@/lib/rateLimit';

// GET - Get all requests for authenticated user
export async function GET(request) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit')) || 50, 100); // Cap at 100

    // Use authenticated user's ID, ignore userId in query params
    let query = { toUserId: authUser.userId };
    if (status && ['pending', 'approved', 'rejected', 'alternative'].includes(status)) {
      query.status = status;
    }

    const requests = await Request.find(query)
      .populate('linkId', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({
      requests,
      count: requests.length,
    });
  } catch (error) {
    console.error('Get requests error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching requests'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// POST - Create a new request (public endpoint via link)
export async function POST(request) {
  // Rate limiting - strict for public endpoint
  const rateLimitResult = strictRateLimit(request);
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult;
  }

  try {
    await connectDB();

    const body = await request.json();
    const { linkId, fromUser, toUserId, startTime, endTime, purpose, urgency } = body;

    // Validation
    if (!linkId || !fromUser || !toUserId || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'linkId, fromUser, toUserId, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    // Validate ObjectIds
    if (!isValidObjectId(linkId) || !isValidObjectId(toUserId)) {
      return NextResponse.json({ error: 'Invalid linkId or toUserId' }, { status: 400 });
    }

    // Sanitize fromUser object
    const sanitizedFromUser = {
      name: sanitizeString(fromUser.name || ''),
      email: sanitizeString(fromUser.email || ''),
    };

    if (!sanitizedFromUser.name || sanitizedFromUser.name.length < 2) {
      return NextResponse.json({ error: 'Valid name is required' }, { status: 400 });
    }

    // Sanitize strings
    const sanitizedPurpose = sanitizeString(purpose || '');
    const sanitizedUrgency = ['low', 'normal', 'high'].includes(urgency) ? urgency : 'normal';

    // Validate dates
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (end <= start) {
      return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 });
    }

    // Create request
    const newRequest = await Request.create({
      linkId,
      fromUser: sanitizedFromUser,
      toUserId,
      startTime: start,
      endTime: end,
      purpose: sanitizedPurpose,
      urgency: sanitizedUrgency,
      status: 'pending',
    });

    // Create notification for the recipient
    await Notification.create({
      userId: toUserId,
      type: 'request',
      title: 'New Time Request',
      message: `${sanitizedFromUser.name} requested time with you`,
      relatedId: newRequest._id,
      relatedType: 'request',
      action: {
        type: 'respond',
        data: { requestId: newRequest._id.toString() },
      },
    });

    const response = NextResponse.json(
      {
        message: 'Request created successfully',
        request: newRequest,
      },
      { status: 201 }
    );

    // Set rate limit headers
    if (rateLimitResult.headers) {
      Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }

    return response;
  } catch (error) {
    console.error('Create request error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while creating request'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
