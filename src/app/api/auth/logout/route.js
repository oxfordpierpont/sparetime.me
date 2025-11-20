/**
 * User Logout API Route
 * POST /api/auth/logout
 *
 * Security:
 * - Clears httpOnly cookie
 * - No authentication required (logout can happen even with invalid token)
 * - Rate limiting to prevent abuse
 */

import { NextResponse } from 'next/server';
import { standardRateLimit } from '@/lib/rateLimit';

export async function POST(request) {
  // Rate limiting
  const rateLimitResult = standardRateLimit(request);
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult;
  }

  try {
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred during logout'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
