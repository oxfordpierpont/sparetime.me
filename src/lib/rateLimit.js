/**
 * Rate Limiting Utility
 * Prevent abuse of API endpoints
 */

import { NextResponse } from 'next/server';
import { getRateLimitKey } from './sanitize.js';

// Store for rate limit data (in production, use Redis)
const rateLimitStore = new Map();

/**
 * Clean up old entries from rate limit store
 */
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

/**
 * Rate limiter middleware
 * @param {Object} options - Rate limit options
 * @param {number} options.maxRequests - Maximum requests allowed
 * @param {number} options.windowMs - Time window in milliseconds
 * @returns {Function} Middleware function
 */
export function rateLimit(options = {}) {
  const maxRequests = options.maxRequests || 100;
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes default

  return (request) => {
    const key = getRateLimitKey(request);
    const now = Date.now();

    // Get or create rate limit data for this key
    let data = rateLimitStore.get(key);

    if (!data || now > data.resetTime) {
      // Create new rate limit window
      data = {
        count: 0,
        resetTime: now + windowMs,
      };
      rateLimitStore.set(key, data);
    }

    // Increment request count
    data.count++;

    // Check if limit exceeded
    if (data.count > maxRequests) {
      const retryAfter = Math.ceil((data.resetTime - now) / 1000);

      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(data.resetTime).toISOString(),
          },
        }
      );
    }

    // Add rate limit headers to indicate current status
    const remaining = maxRequests - data.count;

    return {
      headers: {
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': new Date(data.resetTime).toISOString(),
      },
    };
  };
}

/**
 * Strict rate limiter for sensitive endpoints (auth, password reset)
 */
export const strictRateLimit = rateLimit({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 5 requests per 15 minutes
});

/**
 * Standard rate limiter for API endpoints
 */
export const standardRateLimit = rateLimit({
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 100 requests per 15 minutes
});

/**
 * Lenient rate limiter for read-only endpoints
 */
export const lenientRateLimit = rateLimit({
  maxRequests: 500,
  windowMs: 15 * 60 * 1000, // 500 requests per 15 minutes
});
