/**
 * Links API Routes
 * GET /api/links - Get all links for authenticated user
 * POST /api/links - Create a new link
 *
 * Security:
 * - Authentication required for all endpoints
 * - Users can only access their own links
 * - Input sanitization
 * - Rate limiting
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Link } from '@/models';
import { requireAuth } from '@/middleware/auth';
import { sanitizeString, sanitizeObject } from '@/lib/sanitize';
import { standardRateLimit } from '@/lib/rateLimit';

// GET - Get all links for authenticated user
export async function GET(request) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    // Use authenticated user's ID, ignore any userId in query params
    const links = await Link.findActiveByUser(authUser.userId);

    return NextResponse.json({
      links,
      count: links.length,
    });
  } catch (error) {
    console.error('Get links error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching links'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// POST - Create a new link
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
    const { name, slug, expiresAt, settings, audience } = body;

    // Validation
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'name and slug are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeString(name);
    const sanitizedSlug = sanitizeString(slug).toLowerCase().replace(/[^a-z0-9-_]/g, '');

    if (sanitizedSlug.length < 3) {
      return NextResponse.json(
        { error: 'Slug must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingLink = await Link.findOne({ slug: sanitizedSlug });
    if (existingLink) {
      return NextResponse.json(
        { error: 'A link with this slug already exists' },
        { status: 409 }
      );
    }

    // Sanitize nested objects
    const sanitizedSettings = settings ? sanitizeObject(settings) : {};
    const sanitizedAudience = audience ? sanitizeObject(audience) : {};

    // Create link using authenticated user's ID
    const link = await Link.create({
      userId: authUser.userId,
      name: sanitizedName,
      slug: sanitizedSlug,
      expiresAt: expiresAt || null,
      settings: sanitizedSettings,
      audience: sanitizedAudience,
    });

    const response = NextResponse.json(
      {
        message: 'Link created successfully',
        link,
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
    console.error('Create link error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while creating link'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
