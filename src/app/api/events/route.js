/**
 * Events API Routes
 * GET /api/events - Get events for a calendar or user
 * POST /api/events - Create a new event
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Event, Calendar } from '@/models';

// GET - Get events for a calendar or user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const calendarId = searchParams.get('calendarId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = {};

    if (calendarId) {
      query.calendarId = calendarId;
    } else if (userId) {
      // Get all calendars for user
      const calendars = await Calendar.find({ userId, isActive: true });
      const calendarIds = calendars.map((c) => c._id);
      query.calendarId = { $in: calendarIds };
    } else {
      return NextResponse.json(
        { error: 'userId or calendarId is required' },
        { status: 400 }
      );
    }

    // Add date range filter if provided
    if (startDate && endDate) {
      query.$or = [
        { startTime: { $gte: new Date(startDate), $lt: new Date(endDate) } },
        { endTime: { $gt: new Date(startDate), $lte: new Date(endDate) } },
        { startTime: { $lt: new Date(startDate) }, endTime: { $gt: new Date(endDate) } },
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new event
export async function POST(request) {
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

    // Create event
    const event = await Event.create({
      calendarId,
      title,
      description: description || '',
      location: location || '',
      startTime,
      endTime,
      isAllDay: isAllDay || false,
      recurrence: recurrence || null,
      visibility: 'private',
      status: 'confirmed',
    });

    return NextResponse.json(
      {
        message: 'Event created successfully',
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
