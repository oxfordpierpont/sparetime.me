/**
 * Authentication Middleware
 * Protects API routes and verifies JWT tokens
 */

import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

/**
 * Middleware to require authentication
 * @param {Request} request - Next.js request object
 * @returns {Object|NextResponse} User object or error response
 */
export function requireAuth(request) {
  const user = getAuthUser(request);

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    );
  }

  return user;
}

/**
 * Middleware to optionally get authenticated user
 * @param {Request} request - Next.js request object
 * @returns {Object|null} User object or null
 */
export function optionalAuth(request) {
  return getAuthUser(request);
}

/**
 * Check if user owns the resource
 * @param {string} userId - User ID from auth
 * @param {string} resourceUserId - User ID from resource
 * @returns {boolean} True if user owns resource
 */
export function isOwner(userId, resourceUserId) {
  return userId === resourceUserId.toString();
}

/**
 * Require user to own the resource
 * @param {string} userId - User ID from auth
 * @param {string} resourceUserId - User ID from resource
 * @returns {NextResponse|null} Error response or null if authorized
 */
export function requireOwner(userId, resourceUserId) {
  if (!isOwner(userId, resourceUserId)) {
    return NextResponse.json(
      { error: 'Forbidden', message: 'You do not have permission to access this resource' },
      { status: 403 }
    );
  }
  return null;
}
