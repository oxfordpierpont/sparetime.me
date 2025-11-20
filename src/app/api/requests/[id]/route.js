/**
 * Request API Routes
 * GET /api/requests/[id] - Get request by ID
 * PATCH /api/requests/[id] - Update request (approve, reject, etc.)
 * DELETE /api/requests/[id] - Delete request
 */

import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { Request, Notification } from '@/models';

// GET - Get request by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const requestData = await Request.findById(id).populate('linkId', 'name slug');

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ request: requestData });
  } catch (error) {
    console.error('Get request error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update request (approve, reject, propose alternative)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();
    const { action, responseMessage, alternativeTime } = body;

    const requestData = await Request.findById(id);

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    let updatedRequest;
    let notificationMessage = '';

    switch (action) {
      case 'approve':
        updatedRequest = await requestData.approve(responseMessage);
        notificationMessage = 'Your time request was approved!';
        break;

      case 'reject':
        updatedRequest = await requestData.reject(responseMessage);
        notificationMessage = 'Your time request was declined';
        break;

      case 'alternative':
        if (!alternativeTime || !alternativeTime.startTime || !alternativeTime.endTime) {
          return NextResponse.json(
            { error: 'alternativeTime with startTime and endTime is required' },
            { status: 400 }
          );
        }
        updatedRequest = await requestData.proposeAlternative(
          alternativeTime.startTime,
          alternativeTime.endTime,
          responseMessage
        );
        notificationMessage = 'Alternative time proposed for your request';
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Create notification for the requester
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
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete request
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const requestData = await Request.findByIdAndDelete(id);

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Delete request error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
