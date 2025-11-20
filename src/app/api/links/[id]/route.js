/**
 * Link API Routes
 * GET /api/links/[id] - Get link by ID
 * PATCH /api/links/[id] - Update link
 * DELETE /api/links/[id] - Delete link
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Link } from '@/models';

// GET - Get link by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const link = await Link.findById(id);

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    return NextResponse.json({ link });
  } catch (error) {
    console.error('Get link error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update link
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    delete body._id;
    delete body.userId;
    delete body.stats;

    const link = await Link.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Link updated successfully',
      link,
    });
  } catch (error) {
    console.error('Update link error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete link
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const link = await Link.findByIdAndDelete(id);

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Delete link error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
