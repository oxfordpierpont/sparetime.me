/**
 * Request API Routes
 * GET /api/requests/[id] - Get request by ID (requires auth)
 * PATCH /api/requests/[id] - Update request (requires auth + ownership)
 * DELETE /api/requests/[id] - Delete request (requires auth + ownership)
 *
 * Security:
 * - Authentication required for all endpoints
 * - Ownership verification (recipient can PATCH, recipient can DELETE)
 * - Input sanitization
 * - ObjectId validation
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Request, Notification } from '@/models';
import { requireAuth, requireOwner } from '@/middleware/auth';
import { isValidObjectId, sanitizeString } from '@/lib/sanitize';

// GET - Get request by ID
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
      return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
    }

    const requestData = await Request.findById(id).populate('linkId', 'name slug');

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Verify user is involved in the request (either sender or recipient)
    if (requestData.toUserId.toString() !== authUser.userId) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'You do not have permission to view this request' },
        { status: 403 }
      );
    }

    return NextResponse.json({ request: requestData });
  } catch (error) {
    console.error('Get request error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while fetching request'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// PATCH - Update request (approve, reject, propose alternative)
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
      return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
    }

    const body = await request.json();
    const { action, responseMessage, alternativeTime } = body;

    const requestData = await Request.findById(id);

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Only the recipient can update the request
    const ownershipResult = requireOwner(authUser.userId, requestData.toUserId);
    if (ownershipResult instanceof NextResponse) {
      return ownershipResult;
    }

    // Sanitize response message
    const sanitizedMessage = responseMessage ? sanitizeString(responseMessage) : '';

    let updatedRequest;
    let notificationMessage = '';

    switch (action) {
      case 'approve':
        updatedRequest = await requestData.approve(sanitizedMessage);
        notificationMessage = 'Your time request was approved!';
        break;

      case 'reject':
        updatedRequest = await requestData.reject(sanitizedMessage);
        notificationMessage = 'Your time request was declined';
        break;

      case 'alternative':
        if (!alternativeTime || !alternativeTime.startTime || !alternativeTime.endTime) {
          return NextResponse.json(
            { error: 'alternativeTime with startTime and endTime is required' },
            { status: 400 }
          );
        }

        // Validate dates
        const altStart = new Date(alternativeTime.startTime);
        const altEnd = new Date(alternativeTime.endTime);

        if (isNaN(altStart.getTime()) || isNaN(altEnd.getTime())) {
          return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
        }

        if (altEnd <= altStart) {
          return NextResponse.json({ error: 'End time must be after start time' }, { status: 400 });
        }

        updatedRequest = await requestData.proposeAlternative(
          altStart,
          altEnd,
          sanitizedMessage
        );
        notificationMessage = 'Alternative time proposed for your request';
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Create notification for the requester
    // Note: The requester's contact info is in fromUser object
    // We're notifying the recipient (toUserId), which may not be ideal
    // This should probably notify the sender, but the model doesn't store sender's userId
    // For now, keeping the existing logic but this may need review
    await Notification.create({
      userId: requestData.toUserId,
      type: 'response',
      title: 'Request Response',
      message: notificationMessage,
      relatedId: requestData._id,
      relatedType: 'request',
    });

    return NextResponse.json({
      message: 'Request updated successfully',
      request: updatedRequest,
    });
  } catch (error) {
    console.error('Update request error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while updating request'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}

// DELETE - Delete request
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
      return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
    }

    const requestData = await Request.findById(id);

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Only the recipient can delete the request
    const ownershipResult = requireOwner(authUser.userId, requestData.toUserId);
    if (ownershipResult instanceof NextResponse) {
      return ownershipResult;
    }

    await Request.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Delete request error:', error);

    const message = process.env.NODE_ENV === 'production'
      ? 'An error occurred while deleting request'
      : error.message;

    return NextResponse.json(
      { error: 'Internal server error', message },
      { status: 500 }
    );
  }
}
