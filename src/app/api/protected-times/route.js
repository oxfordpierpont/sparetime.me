/**
 * Protected Times API Routes
 * GET /api/protected-times - Get protected times for a user
 * POST /api/protected-times - Create a new protected time block
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { ProtectedTime } from '@/models';

// GET - Get protected times for a user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    let query = { userId };

    // Add date range filter if provided
    if (startDate && endDate) {
      query.$or = [
        { startTime: { $gte: new Date(startDate), $lt: new Date(endDate) } },
        { endTime: { $gt: new Date(startDate), $lte: new Date(endDate) } },
        { startTime: { $lt: new Date(startDate) }, endTime: { $gt: new Date(endDate) } },
      ];
    }

    const protectedTimes = await ProtectedTime.find(query).sort({ startTime: 1 });

    return NextResponse.json({
      protectedTimes,
      count: protectedTimes.length,
    });
  } catch (error) {
    console.error('Get protected times error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new protected time block
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, title, startTime, endTime, recurrence, visibility, priority, isMovable } = body;

    // Validation
    if (!userId || !title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'userId, title, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    // Create protected time
    const protectedTime = await ProtectedTime.create({
      userId,
      title,
      startTime,
      endTime,
      recurrence: recurrence || null,
      visibility: visibility || { default: 'busy', overrides: [] },
      priority: priority || 'medium',
      isMovable: isMovable || false,
    });

    return NextResponse.json(
      {
        message: 'Protected time created successfully',
        protectedTime,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create protected time error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
