/**
 * CORS Configuration Utility
 * Handle Cross-Origin Resource Sharing (CORS) headers
 */

/**
 * Get allowed origins based on environment
 * @returns {string[]} Array of allowed origins
 */
export function getAllowedOrigins() {
  const origins = [];

  // Always allow the main domain in production
  if (process.env.NEXT_PUBLIC_APP_URL) {
    origins.push(process.env.NEXT_PUBLIC_APP_URL);
  }

  // In development, allow localhost
  if (process.env.NODE_ENV === 'development') {
    origins.push('http://localhost:3000');
    origins.push('http://localhost:3001');
    origins.push('http://127.0.0.1:3000');
  }

  // Allow additional origins from environment variable
  if (process.env.ALLOWED_ORIGINS) {
    const additionalOrigins = process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    origins.push(...additionalOrigins);
  }

  return origins;
}

/**
 * Check if origin is allowed
 * @param {string} origin - Origin to check
 * @returns {boolean} True if origin is allowed
 */
export function isOriginAllowed(origin) {
  if (!origin) return false;

  const allowedOrigins = getAllowedOrigins();

  // In development, be more lenient
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  return allowedOrigins.includes(origin);
}

/**
 * Get CORS headers for a response
 * @param {string} origin - Request origin
 * @returns {Object} CORS headers
 */
export function getCorsHeaders(origin) {
  const headers = {};

  if (isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  } else {
    // Default to first allowed origin or deny
    const allowedOrigins = getAllowedOrigins();
    if (allowedOrigins.length > 0) {
      headers['Access-Control-Allow-Origin'] = allowedOrigins[0];
    }
  }

  headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS';
  headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
  headers['Access-Control-Allow-Credentials'] = 'true';
  headers['Access-Control-Max-Age'] = '86400'; // 24 hours

  return headers;
}

/**
 * Apply CORS headers to a NextResponse
 * @param {NextResponse} response - Next.js response object
 * @param {string} origin - Request origin
 * @returns {NextResponse} Response with CORS headers
 */
export function applyCorsHeaders(response, origin) {
  const corsHeaders = getCorsHeaders(origin);

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}
