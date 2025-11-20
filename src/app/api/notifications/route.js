/**
 * Notifications API Routes
 * GET /api/notifications - Get notifications for a user
 * PATCH /api/notifications/mark-read - Mark notifications as read
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Notification } from '@/models';

// GET - Get notifications for a user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = parseInt(searchParams.get('limit')) || 50;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    let query = { userId };
    if (unreadOnly) {
      query.read = false;
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    const unreadCount = await Notification.getUnreadCount(userId);

    return NextResponse.json({
      notifications,
      count: notifications.length,
      unreadCount,
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Mark notifications as read
export async function PATCH(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userId, notificationId, markAllAsRead } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    if (markAllAsRead) {
      // Mark all notifications as read for user
      await Notification.markAllAsReadForUser(userId);
      return NextResponse.json({ message: 'All notifications marked as read' });
    } else if (notificationId) {
      // Mark specific notification as read
      const notification = await Notification.findById(notificationId);
      if (!notification) {
        return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
