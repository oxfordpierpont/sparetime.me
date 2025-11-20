/**
 * Get Link by Slug API Route
 * GET /api/links/slug/[slug] - Get link by slug (for public access)
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Link } from '@/models';

// GET - Get link by slug
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = params;
    const link = await Link.findOne({ slug }).populate('userId', 'username displayName avatar');

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Check if link is expired
    if (link.expiresAt && link.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Link has expired' }, { status: 410 });
    }

    // Increment view count
    await link.incrementViews();

    return NextResponse.json({ link });
  } catch (error) {
    console.error('Get link by slug error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
