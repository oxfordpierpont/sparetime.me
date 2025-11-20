/**
 * User API Routes
 * GET /api/users/[id] - Get user by ID (requires auth)
 * PATCH /api/users/[id] - Update user (requires auth + ownership)
 * DELETE /api/users/[id] - Delete user (requires auth + ownership)
 *
 * Security:
 * - Authentication required for all endpoints
 * - Ownership verification for PATCH and DELETE
 * - Input sanitization
 * - ObjectId validation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/models';
import { requireAuth, requireOwner } from '@/middleware/auth';
import { isValidObjectId, sanitizeObject } from '@/lib/sanitize';

// GET - Get user by ID
export async function GET(request, { params }) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await connectDB();

    const { id } = params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: user.toSafeObject() });
  } catch (error) {
    console.error('Get user error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching user'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// PATCH - Update user
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
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Require ownership
    const ownershipResult = requireOwner(authUser.userId, id);
    if (ownershipResult instanceof NextResponse) {
      return ownershipResult;
    }

    const body = await request.json();

    // Sanitize input
    const sanitizedBody = sanitizeObject(body);

    // Remove fields that shouldn't be updated directly
    delete sanitizedBody.passwordHash;
    delete sanitizedBody.email;
    delete sanitizedBody.username;
    delete sanitizedBody._id;

    const user = await User.findByIdAndUpdate(id, sanitizedBody, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: user.toSafeObject(),
    });
  } catch (error) {
    console.error('Update user error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while updating user'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
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
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Require ownership
    const ownershipResult = requireOwner(authUser.userId, id);
    if (ownershipResult instanceof NextResponse) {
      return ownershipResult;
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while deleting user'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
