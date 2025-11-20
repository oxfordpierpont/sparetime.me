/**
 * Input Sanitization Utilities
 * Protect against XSS, SQL injection, and other attacks
 */

import validator from 'validator';

/**
 * Sanitize string input to prevent XSS
 * @param {string} input - User input
 * @returns {string} Sanitized string
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') return '';

  // Remove any HTML tags and escape special characters
  return validator.escape(input.trim());
}

/**
 * Sanitize email
 * @param {string} email - Email address
 * @returns {string|null} Normalized email or null if invalid
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return null;

  const normalized = validator.normalizeEmail(email);
  return validator.isEmail(normalized) ? normalized : null;
}

/**
 * Sanitize URL
 * @param {string} url - URL to sanitize
 * @returns {string|null} Sanitized URL or null if invalid
 */
export function sanitizeURL(url) {
  if (typeof url !== 'string') return null;

  return validator.isURL(url, { protocols: ['http', 'https'] }) ? url : null;
}

/**
 * Sanitize object recursively
 * @param {Object} obj - Object to sanitize
 * @returns {Object} Sanitized object
 */
export function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Validate and sanitize username
 * @param {string} username - Username
 * @returns {Object} Validation result
 */
export function validateUsername(username) {
  if (typeof username !== 'string') {
    return { valid: false, error: 'Username must be a string' };
  }

  const sanitized = username.trim().toLowerCase();

  if (sanitized.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }

  if (sanitized.length > 30) {
    return { valid: false, error: 'Username cannot exceed 30 characters' };
  }

  if (!/^[a-z0-9_-]+$/.test(sanitized)) {
    return {
      valid: false,
      error: 'Username can only contain lowercase letters, numbers, hyphens, and underscores',
    };
  }

  return { valid: true, value: sanitized };
}

/**
 * Remove dangerous characters from MongoDB queries
 * @param {Object} query - MongoDB query object
 * @returns {Object} Sanitized query
 */
export function sanitizeMongoQuery(query) {
  if (typeof query !== 'object' || query === null) return query;

  // Remove any keys starting with $ (MongoDB operators)
  // This prevents NoSQL injection
  const sanitized = {};

  for (const [key, value] of Object.entries(query)) {
    if (key.startsWith('$')) {
      continue; // Skip MongoDB operators in user input
    }

    if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeMongoQuery(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Validate ID format (MongoDB ObjectId)
 * @param {string} id - ID to validate
 * @returns {boolean} True if valid ObjectId format
 */
export function isValidObjectId(id) {
  if (typeof id !== 'string') return false;
  return validator.isMongoId(id);
}

/**
 * Rate limit key generator
 * @param {Request} request - Next.js request
 * @returns {string} Rate limit key
 */
export function getRateLimitKey(request) {
  // Use IP address for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}
