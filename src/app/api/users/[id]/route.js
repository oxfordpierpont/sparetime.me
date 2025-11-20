/**
 * User API Routes
 * GET /api/users/[id] - Get user by ID
 * PATCH /api/users/[id] - Update user
 * DELETE /api/users/[id] - Delete user
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/models';

// GET - Get user by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: user.toSafeObject() });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update user
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    delete body.passwordHash;
    delete body.email;
    delete body.username;
    delete body._id;

    const user = await User.findByIdAndUpdate(id, body, {
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
