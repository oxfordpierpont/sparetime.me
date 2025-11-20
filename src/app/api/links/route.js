/**
 * Links API Routes
 * GET /api/links - Get all links for a user
 * POST /api/links - Create a new link
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Link } from '@/models';

// GET - Get all links for a user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const links = await Link.findActiveByUser(userId);

    return NextResponse.json({
      links,
      count: links.length,
    });
  } catch (error) {
    console.error('Get links error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new link
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, name, slug, expiresAt, settings, audience } = body;

    // Validation
    if (!userId || !name || !slug) {
      return NextResponse.json(
        { error: 'userId, name, and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingLink = await Link.findOne({ slug });
    if (existingLink) {
      return NextResponse.json(
        { error: 'A link with this slug already exists' },
        { status: 409 }
      );
    }

    // Create link
    const link = await Link.create({
      userId,
      name,
      slug,
      expiresAt: expiresAt || null,
      settings: settings || {},
      audience: audience || {},
    });

    return NextResponse.json(
      {
        message: 'Link created successfully',
        link,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create link error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
