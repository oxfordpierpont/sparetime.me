import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import User from '@/models/User';
import { requireAuth } from '@/middleware/auth';
import { lenientRateLimit } from '@/lib/rateLimit';

// GET - Get current authenticated user
export async function GET(request) {
  // Rate limiting - lenient since this is called frequently
  const rateLimitResult = lenientRateLimit(request);
  if (rateLimitResult instanceof NextResponse) {
    return rateLimitResult;
  }

  // Check authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    const user = await User.findById(authUser.userId).select(
      '-password -__v'
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
