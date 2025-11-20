/**
 * Protected Times API Routes
 * GET /api/protected-times - Get protected times for authenticated user
 * POST /api/protected-times - Create a new protected time block
 *
 * Security:
 * - Authentication required for all endpoints
 * - Users can only access their own protected times
 * - Input sanitization
 * - Date validation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { ProtectedTime } from '@/models';
import { requireAuth } from '@/middleware/auth';
import { sanitizeString, sanitizeObject } from '@/lib/sanitize';
import { standardRateLimit } from '@/lib/rateLimit';

// GET - Get protected times for authenticated user
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Use authenticated user's ID
    let query = { userId: authUser.userId };

    // Add date range filter if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
      }

      query.$or = [
        { startTime: { $gte: start, $lt: end } },
        { endTime: { $gt: start, $lte: end } },
        { startTime: { $lt: start }, endTime: { $gt: end } },
      ];
    }

    const protectedTimes = await ProtectedTime.find(query).sort({ startTime: 1 });

    return NextResponse.json({
      protectedTimes,
      count: protectedTimes.length,
    });
  } catch (error) {
    console.error('Get protected times error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching protected times'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// POST - Create a new protected time block
export async function POST(request) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  // Rate limiting
  const rateLimitResult = standardRateLimit(request);
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult;
  }

  try {
    await connectDB();

    const body = await request.json();
    const { title, startTime, endTime, recurrence, visibility, priority, isMovable } = body;

    // Validation
    if (!title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'title, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedTitle = sanitizeString(title);

    if (sanitizedTitle.length < 1) {
      return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 });
    }

    // Validate dates
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    if (end <= start) {
      return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 });
    }

    // Validate priority
    const validPriority = ['low', 'medium', 'high'].includes(priority) ? priority : 'medium';

    // Sanitize visibility object
    const sanitizedVisibility = visibility
      ? sanitizeObject(visibility)
      : { default: 'busy', overrides: [] };

    // Create protected time using authenticated user's ID
    const protectedTime = await ProtectedTime.create({
      userId: authUser.userId,
      title: sanitizedTitle,
      startTime: start,
      endTime: end,
      recurrence: recurrence || null,
      visibility: sanitizedVisibility,
      priority: validPriority,
      isMovable: isMovable || false,
    });

    const response = NextResponse.json(
      {
        message: 'Protected time created successfully',
        protectedTime,
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
    console.error('Create protected time error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while creating protected time'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
