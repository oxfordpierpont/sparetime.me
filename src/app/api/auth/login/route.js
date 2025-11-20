/**
 * User Login API Route
 * POST /api/auth/login
 *
 * Security:
 * - Rate limited (5 requests per 15 minutes)
 * - Input sanitization
 * - JWT token generation
 * - Timing attack prevention
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/models';
import { generateToken, comparePassword } from '@/lib/auth';
import { sanitizeEmail } from '@/lib/sanitize';
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
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sanitize email input
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find user (include password hash for verification)
    const user = await User.findOne({ email: sanitizedEmail }).select('+passwordHash');

    if (!user) {
      // Use generic error message to prevent user enumeration
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.passwordHash);

    if (!isValidPassword) {
      // Use generic error message to prevent user enumeration
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user without password and include token
    const safeUser = user.toSafeObject();

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: safeUser,
        token,
      },
      { status: 200 }
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
    console.error('Login error:', error);

    // Don't expose internal error details in production
    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred during login'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
