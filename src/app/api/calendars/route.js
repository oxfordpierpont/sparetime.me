/**
 * Calendars API Routes
 * GET /api/calendars - Get all calendars for authenticated user
 * POST /api/calendars - Create a new calendar
 *
 * Security:
 * - Authentication required for all endpoints
 * - Users can only access their own calendars
 * - Input sanitization
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Calendar } from '@/models';
import { requireAuth } from '@/middleware/auth';
import { sanitizeString } from '@/lib/sanitize';
import { standardRateLimit } from '@/lib/rateLimit';

// GET - Get all calendars for authenticated user
export async function GET(request) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    // Use authenticated user's ID
    const calendars = await Calendar.find({ userId: authUser.userId, isActive: true });

    return NextResponse.json({
      calendars,
      count: calendars.length,
    });
  } catch (error) {
    console.error('Get calendars error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching calendars'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// POST - Create a new calendar
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
    const { source, sourceId, name, color } = body;

    // Validation
    if (!source || !name) {
      return NextResponse.json(
        { error: 'source and name are required' },
        { status: 400 }
      );
    }

    // Validate source
    if (!['google', 'apple', 'manual'].includes(source)) {
      return NextResponse.json({ error: 'Invalid source' }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeString(name);
    const sanitizedSourceId = sourceId ? sanitizeString(sourceId) : null;

    if (sanitizedName.length < 1) {
      return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 });
    }

    // Check if calendar with same sourceId already exists (for non-manual)
    if (source !== 'manual' && sanitizedSourceId) {
      const existingCalendar = await Calendar.findOne({
        userId: authUser.userId,
        sourceId: sanitizedSourceId,
      });
      if (existingCalendar) {
        return NextResponse.json(
          { error: 'Calendar already connected' },
          { status: 409 }
        );
      }
    }

    // Create calendar using authenticated user's ID
    const calendar = await Calendar.create({
      userId: authUser.userId,
      source,
      sourceId: sanitizedSourceId,
      name: sanitizedName,
      color: color || '#3B82F6',
      isActive: true,
    });

    const response = NextResponse.json(
      {
        message: 'Calendar created successfully',
        calendar,
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
    console.error('Create calendar error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while creating calendar'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
