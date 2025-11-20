/**
 * User Signup API Route
 * POST /api/auth/signup
 *
 * Security:
 * - Rate limited (5 requests per 15 minutes)
 * - Input sanitization
 * - Password strength validation
 * - JWT token generation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/models';
import { generateToken, hashPassword, validatePassword } from '@/lib/auth';
import { sanitizeEmail, sanitizeString, validateUsername } from '@/lib/sanitize';
import { strictRateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  // Rate limiting - 5 requests per 15 minutes
  const rateLimitResult = strictRateLimit(request);
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult;
  }

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

    // Sanitize inputs
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
      return NextResponse.json(
        { error: usernameValidation.error },
        { status: 400 }
      );
    }

    const sanitizedDisplayName = sanitizeString(displayName);
    if (sanitizedDisplayName.length < 1 || sanitizedDisplayName.length > 50) {
      return NextResponse.json(
        { error: 'Display name must be between 1 and 50 characters' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: 'Password does not meet requirements', details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: sanitizedEmail }, { username: usernameValidation.value }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await User.create({
      email: sanitizedEmail,
      username: usernameValidation.value,
      passwordHash,
      displayName: sanitizedDisplayName,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    });

    // Generate JWT token
    const token = generateToken(user);

    // Return user without password and include token
    const safeUser = user.toSafeObject();

    const response = NextResponse.json(
      {
        message: 'User created successfully',
        user: safeUser,
        token,
      },
      { status: 201 }
    );

    // Set rate limit headers
    if (rateLimitResult.headers) {
      Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
    }

    // Set token in httpOnly cookie for browser-based access
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);

    // Don't expose internal error details in production
    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred during signup'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
