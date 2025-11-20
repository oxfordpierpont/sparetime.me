/**
 * Link API Routes
 * GET /api/links/[id] - Get link by ID (requires auth + ownership)
 * PATCH /api/links/[id] - Update link (requires auth + ownership)
 * DELETE /api/links/[id] - Delete link (requires auth + ownership)
 *
 * Security:
 * - Authentication required for all endpoints
 * - Ownership verification for ALL endpoints
 * - Input sanitization
 * - ObjectId validation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Link } from '@/models';
import { requireAuth, requireOwner } from '@/middleware/auth';
import { isValidObjectId, sanitizeObject } from '@/lib/sanitize';

// GET - Get link by ID
export async function GET(request, { params }) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid link ID' }, { status: 400 });
    }

    const link = await Link.findById(id);

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Require ownership - only the owner can view their link details
    const ownershipResult = requireOwner(authUser.userId, link.userId);
    if (ownershipResult instanceof NextResponse) {
      return ownershipResult;
    }

    return NextResponse.json({ link });
  } catch (error) {
    console.error('Get link error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching link'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// PATCH - Update link
export async function PATCH(request, { params }) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid link ID' }, { status: 400 });
    }

    // Get link to check ownership
    const existingLink = await Link.findById(id);
    if (!existingLink) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Require ownership
    const ownershipResult = requireOwner(authUser.userId, existingLink.userId);
    if (ownershipResult instanceof NextResponse) {
      return ownershipResult;
    }

    const body = await request.json();

    // Sanitize input
    const sanitizedBody = sanitizeObject(body);

    // Remove fields that shouldn't be updated directly
    delete sanitizedBody._id;
    delete sanitizedBody.userId;
    delete sanitizedBody.stats;

    const link = await Link.findByIdAndUpdate(id, sanitizedBody, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      message: 'Link updated successfully',
      link,
    });
  } catch (error) {
    console.error('Update link error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while updating link'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// DELETE - Delete link
export async function DELETE(request, { params }) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid link ID' }, { status: 400 });
    }

    // Get link to check ownership
    const link = await Link.findById(id);
    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Require ownership
    const ownershipResult = requireOwner(authUser.userId, link.userId);
    if (ownershipResult instanceof NextResponse) {
      return ownershipResult;
    }

    await Link.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Delete link error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while deleting link'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
