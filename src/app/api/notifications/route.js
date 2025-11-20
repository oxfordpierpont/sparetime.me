/**
 * Notifications API Routes
 * GET /api/notifications - Get notifications for authenticated user
 * PATCH /api/notifications/mark-read - Mark notifications as read
 *
 * Security:
 * - Authentication required for all endpoints
 * - Users can only access their own notifications
 * - ObjectId validation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Notification } from '@/models';
import { requireAuth, requireOwner } from '@/middleware/auth';
import { isValidObjectId } from '@/lib/sanitize';

// GET - Get notifications for authenticated user
export async function GET(request) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = Math.min(parseInt(searchParams.get('limit')) || 50, 100); // Cap at 100

    // Use authenticated user's ID
    let query = { userId: authUser.userId };
    if (unreadOnly) {
      query.read = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const unreadCount = await Notification.getUnreadCount(authUser.userId);

    return NextResponse.json({
      notifications,
      count: notifications.length,
      unreadCount,
    });
  } catch (error) {
    console.error('Get notifications error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching notifications'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// PATCH - Mark notifications as read
export async function PATCH(request) {
  // Require authentication
  const authResult = requireAuth(request);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const authUser = authResult;

  try {
    await connectDB();

    const body = await request.json();
    const { notificationId, markAllAsRead } = body;

    if (markAllAsRead) {
      // Mark all notifications as read for authenticated user
      await Notification.markAllAsReadForUser(authUser.userId);
      return NextResponse.json({ message: 'All notifications marked as read' });
    } else if (notificationId) {
      // Validate ObjectId
      if (!isValidObjectId(notificationId)) {
        return NextResponse.json({ error: 'Invalid notification ID' }, { status: 400 });
      }

      // Mark specific notification as read
      const notification = await Notification.findById(notificationId);

      if (!notification) {
        return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
      }

      // Verify ownership
      const ownershipResult = requireOwner(authUser.userId, notification.userId);
      if (ownershipResult instanceof NextResponse) {
        return ownershipResult;
      }

      await notification.markAsRead();

      return NextResponse.json({
        message: 'Notification marked as read',
        notification,
      });
    } else {
      return NextResponse.json(
        { error: 'notificationId or markAllAsRead is required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Update notifications error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while updating notifications'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
