/**
 * Events API Routes
 * GET /api/events - Get events for authenticated user
 * POST /api/events - Create a new event
 *
 * Security:
 * - Authentication required for all endpoints
 * - Users can only access their own events
 * - Input sanitization
 * - Date validation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Event, Calendar } from '@/models';
import { requireAuth } from '@/middleware/auth';
import { isValidObjectId, sanitizeString } from '@/lib/sanitize';
import { standardRateLimit } from '@/lib/rateLimit';

// GET - Get events for authenticated user
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
    const calendarId = searchParams.get('calendarId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = {};

    if (calendarId) {
      // Validate ObjectId
      if (!isValidObjectId(calendarId)) {
        return NextResponse.json({ error: 'Invalid calendarId' }, { status: 400 });
      }

      // Verify calendar belongs to user
      const calendar = await Calendar.findById(calendarId);
      if (!calendar || calendar.userId.toString() !== authUser.userId) {
        return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });
      }

      query.calendarId = calendarId;
    } else {
      // Get all calendars for authenticated user
      const calendars = await Calendar.find({ userId: authUser.userId, isActive: true });
      const calendarIds = calendars.map((c) => c._id);
      query.calendarId = { $in: calendarIds };
    }

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

    // Exclude cancelled events
    query.status = { $ne: 'cancelled' };

    const events = await Event.find(query)
      .populate('calendarId', 'name color')
      .sort({ startTime: 1 });

    return NextResponse.json({
      events,
      count: events.length,
    });
  } catch (error) {
    console.error('Get events error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching events'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// POST - Create a new event
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
    const { calendarId, title, description, location, startTime, endTime, isAllDay, recurrence } =
      body;

    // Validation
    if (!calendarId || !title || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'calendarId, title, startTime, and endTime are required' },
        { status: 400 }
      );
    }

    // Validate ObjectId
    if (!isValidObjectId(calendarId)) {
      return NextResponse.json({ error: 'Invalid calendarId' }, { status: 400 });
    }

    // Verify calendar belongs to user
    const calendar = await Calendar.findById(calendarId);
    if (!calendar || calendar.userId.toString() !== authUser.userId) {
      return NextResponse.json({ error: 'Calendar not found' }, { status: 404 });
    }

    // Sanitize inputs
    const sanitizedTitle = sanitizeString(title);
    const sanitizedDescription = description ? sanitizeString(description) : '';
    const sanitizedLocation = location ? sanitizeString(location) : '';

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

    // Create event
    const event = await Event.create({
      calendarId,
      title: sanitizedTitle,
      description: sanitizedDescription,
      location: sanitizedLocation,
      startTime: start,
      endTime: end,
      isAllDay: isAllDay || false,
      recurrence: recurrence || null,
      visibility: 'private',
      status: 'confirmed',
    });

    const response = NextResponse.json(
      {
        message: 'Event created successfully',
        event,
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
    console.error('Create event error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while creating event'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
