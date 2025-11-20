/**
 * Next.js Middleware
 * Handles CORS and other request-level concerns
 */

import { NextResponse } from 'next/server';
import { getCorsHeaders } from '@/lib/cors';

export function middleware(request) {
  const origin = request.headers.get('origin') || '';

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = NextResponse.json({}, { status: 200 });
    const corsHeaders = getCorsHeaders(origin);

    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // For all other requests, clone the response and add CORS headers
  const response = NextResponse.next();
  const corsHeaders = getCorsHeaders(origin);

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// Apply middleware to API routes only
export const config = {
  matcher: '/api/:path*',
};
