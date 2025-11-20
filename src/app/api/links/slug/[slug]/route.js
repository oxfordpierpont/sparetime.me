/**
 * Get Link by Slug API Route
 * GET /api/links/slug/[slug] - Get link by slug (public endpoint with rate limiting)
 *
 * Security:
 * - Public endpoint (no auth required)
 * - Rate limiting to prevent abuse
 * - Input sanitization
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Link } from '@/models';
import { sanitizeString } from '@/lib/sanitize';
import { lenientRateLimit } from '@/lib/rateLimit';

// GET - Get link by slug (public endpoint)
export async function GET(request, { params }) {
  // Rate limiting - lenient for public endpoint
  const rateLimitResult = lenientRateLimit(request);
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult;
  }

  try {
    await connectDB();

    const { slug } = params;

    // Sanitize slug
    const sanitizedSlug = sanitizeString(slug).toLowerCase().replace(/[^a-z0-9-_]/g, '');

    if (!sanitizedSlug || sanitizedSlug.length < 3) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 });
    }

    const link = await Link.findOne({ slug: sanitizedSlug }).populate(
      'userId',
      'username displayName avatar'
    );

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Check if link is expired
    if (link.expiresAt && link.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Link has expired' }, { status: 410 });
    }

    // Increment view count
    await link.incrementViews();

    const response = NextResponse.json({ link });

    // Set rate limit headers
    if (rateLimitResult.headers) {
      Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }

    return response;
  } catch (error) {
    console.error('Get link by slug error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching link'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
