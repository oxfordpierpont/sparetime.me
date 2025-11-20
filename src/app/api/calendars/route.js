/**
 * Calendars API Routes
 * GET /api/calendars - Get all calendars for a user
 * POST /api/calendars - Create a new calendar
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Calendar } from '@/models';

// GET - Get all calendars for a user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const calendars = await Calendar.find({ userId, isActive: true });

    return NextResponse.json({
      calendars,
      count: calendars.length,
    });
  } catch (error) {
    console.error('Get calendars error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new calendar
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, source, sourceId, name, color } = body;

    // Validation
    if (!userId || !source || !name) {
      return NextResponse.json(
        { error: 'userId, source, and name are required' },
        { status: 400 }
      );
    }

    // Check if calendar with same sourceId already exists (for non-manual)
    if (source !== 'manual' && sourceId) {
      const existingCalendar = await Calendar.findOne({ userId, sourceId });
      if (existingCalendar) {
        return NextResponse.json(
          { error: 'Calendar already connected' },
          { status: 409 }
        );
      }
    }

    // Create calendar
    const calendar = await Calendar.create({
      userId,
      source,
      sourceId: sourceId || null,
      name,
      color: color || '#3B82F6',
      isActive: true,
    });

    return NextResponse.json(
      {
        message: 'Calendar created successfully',
        calendar,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create calendar error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
