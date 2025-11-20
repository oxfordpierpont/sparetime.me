/**
 * Requests API Routes
 * GET /api/requests - Get all requests for a user
 * POST /api/requests - Create a new request
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Request, Notification } from '@/models';

// GET - Get all requests for a user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 50;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    let query = { toUserId: userId };
    if (status) {
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new request
export async function POST(request) {
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

    // Create request
    const newRequest = await Request.create({
      linkId,
      fromUser,
      toUserId,
      startTime,
      endTime,
      purpose: purpose || '',
      urgency: urgency || 'normal',
      status: 'pending',
    });

    // Create notification for the recipient
    await Notification.create({
      userId: toUserId,
      type: 'request',
      title: 'New Time Request',
      message: `${fromUser.name} requested time with you`,
      relatedId: newRequest._id,
      relatedType: 'request',
      action: {
        type: 'respond',
        data: { requestId: newRequest._id },
      },
    });

    return NextResponse.json(
      {
        message: 'Request created successfully',
        request: newRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create request error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
