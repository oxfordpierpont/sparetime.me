/**
 * User Signup API Route
 * POST /api/auth/signup
 */

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/database';
import { User } from '@/models';

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, username, password, displayName } = body;

    // Validation
    if (!email || !username || !password || !displayName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      passwordHash,
      displayName,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    });

    // Return user without password
    const safeUser = user.toSafeObject();

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: safeUser
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
