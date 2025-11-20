# SpareTime - Security Documentation

Complete security overview including implemented measures, vulnerabilities, and recommendations.

**Last Updated:** November 20, 2025
**Security Audit Status:** ⚠️ IN PROGRESS

---

## ⚠️ CRITICAL SECURITY STATUS

### **Current State: NOT PRODUCTION-READY**

The application has foundational security measures in place, but **requires additional implementation before production deployment**.

---

## ✅ Security Measures Implemented

### 1. Password Security
- ✅ **bcryptjs hashing** - All passwords hashed with configurable salt rounds (default: 10)
- ✅ **Password strength validation** - Enforces:
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
- ✅ **Passwords never stored in plain text**
- ✅ **Passwords excluded from queries** - `select: false` in User model

### 2. Authentication (NEW - Partially Implemented)
- ✅ **JWT token generation** - Using jsonwebtoken library
- ✅ **Token verification utilities** - Verify and decode JWT tokens
- ✅ **HttpOnly cookies** - Tokens stored in secure, HTTP-only cookies
- ✅ **Secure cookie flags** - `httpOnly`, `secure` (production), `sameSite: lax`
- ✅ **Token expiration** - Configurable expiry (default: 7 days)
- ⚠️ **Token stored in response** - Also returned in JSON (allow mobile apps)
- ⚠️ **Auth middleware created but NOT APPLIED to all routes yet**

### 3. Input Validation & Sanitization (NEW)
- ✅ **Email validation** - Using validator.js
- ✅ **Email normalization** - Lowercase, trim whitespace
- ✅ **Username validation** - Regex validation, length checks
- ✅ **XSS protection** - HTML escaping on string inputs
- ✅ **Object sanitization** - Recursive sanitization of objects
- ✅ **MongoDB injection prevention** - Remove $-prefixed operators from user input
- ✅ **ObjectId validation** - Validate MongoDB ObjectId format

###  4. Rate Limiting (NEW)
- ✅ **Strict rate limiting for auth** - 5 requests per 15 minutes
- ✅ **Standard rate limiting** - 100 requests per 15 minutes
- ✅ **Lenient rate limiting** - 500 requests per 15 minutes (read-only)
- ✅ **Rate limit headers** - X-RateLimit-* headers in responses
- ✅ **Retry-After header** - When limit exceeded
- ⚠️ **In-memory storage** - Production should use Redis

### 5. Database Security
- ✅ **Mongoose schema validation** - Type checking, required fields
- ✅ **Sensitive field protection** - OAuth tokens, passwords not returned by default
- ✅ **Input validation** - Email format, username format, etc.
- ✅ **Unique constraints** - Email and username must be unique
- ✅ **Safe user object method** - `toSafeObject()` removes sensitive data

### 6. Docker Security
- ✅ **Non-root user** - Container runs as non-root user (nextjs:nodejs)
- ✅ **Multi-stage build** - Minimizes attack surface
- ✅ **.dockerignore** - Excludes sensitive files from image
- ✅ **Minimal base image** - Alpine Linux for small size

### 7. Environment Variables
- ✅ **.env.local gitignored** - Sensitive data not committed
- ✅ **.env.example provided** - Template for configuration
- ✅ **Separate production template** - `.env.production.example`

---

## ❌ Security Gaps (CRITICAL)

### 1. Authentication & Authorization - ⚠️ CRITICAL

**Status:** Partially implemented but NOT enforced

#### Issues:
- ❌ **NO middleware applied to protected routes** - All API endpoints are currently public
- ❌ **NO authentication required** - Anyone can access any endpoint
- ❌ **NO ownership verification** - Users can edit other users' data
- ❌ **NO role-based access control** - No admin vs. user distinction
- ❌ **NO token refresh mechanism** - Tokens expire with no way to refresh
- ❌ **NO logout functionality** - No way to invalidate tokens
- ❌ **NO account lockout** - No protection against brute force attacks

#### Impact:
🔴 **CRITICAL** - Complete data exposure, unauthorized access possible

#### Fix Required:
1. Apply `requireAuth()` middleware to all protected routes
2. Add ownership checks before allowing edits
3. Implement token refresh endpoint
4. Add logout endpoint that blacklists tokens
5. Track failed login attempts and implement account lockout

---

### 2. CORS Configuration - ⚠️ CRITICAL

**Status:** Not implemented

#### Issues:
- ❌ **No CORS headers** - May block legitimate requests
- ❌ **No origin validation** - Any domain can call your API
- ❌ **No preflight handling** - OPTIONS requests not handled

#### Impact:
🔴 **CRITICAL** - API vulnerable to cross-origin attacks

#### Fix Required:
1. Add CORS middleware
2. Whitelist allowed origins
3. Handle OPTIONS requests

---

### 3. Input Sanitization - ⚠️ HIGH

**Status:** Created but only applied to signup route

#### Issues:
- ⚠️ **Sanitization only on signup** - Other routes still vulnerable
- ❌ **No HTML sanitization in all inputs** - XSS risk on forms
- ❌ **No file upload validation** - If file uploads added later
- ❌ **No URL validation** - Malicious URLs could be stored

#### Impact:
🟠 **HIGH** - XSS attacks possible, malicious data storage

#### Fix Required:
1. Apply sanitization to ALL API routes
2. Sanitize all user-generated content
3. Add Content Security Policy headers

---

### 4. Error Handling - ⚠️ MEDIUM

**Status:** Partial implementation

#### Issues:
- ⚠️ **Error details exposed in development** - Stack traces visible
- ❌ **No error logging service** - Errors only in console
- ❌ **No error tracking** - No Sentry or similar
- ❌ **Database errors exposed** - Mongoose errors show schema details

#### Impact:
🟡 **MEDIUM** - Information leakage, hard to debug production issues

#### Fix Required:
1. Hide error details in production
2. Add error logging service (Sentry, LogRocket)
3. Generic error messages to users

---

### 5. Session Management - ⚠️ HIGH

**Status:** Not implemented

#### Issues:
- ❌ **No session tracking** - Can't see active sessions
- ❌ **No session invalidation** - Can't logout all devices
- ❌ **No suspicious activity detection** - No geo-based alerts
- ❌ **No concurrent session limits** - Unlimited devices

#### Impact:
🟠 **HIGH** - Compromised accounts hard to secure

#### Fix Required:
1. Track active sessions in database
2. Add "logout all devices" feature
3. Implement geo-location checks
4. Limit concurrent sessions

---

### 6. Rate Limiting - ⚠️ MEDIUM

**Status:** Implemented but in-memory only

#### Issues:
- ⚠️ **In-memory storage** - Rate limits reset on server restart
- ⚠️ **Not distributed** - Won't work across multiple servers
- ❌ **No IP-based blocking** - No permanent bans
- ❌ **No CAPTCHA for failed attempts** - Easy to brute force

#### Impact:
🟡 **MEDIUM** - Can be bypassed, not production-grade

#### Fix Required:
1. Use Redis for rate limit storage
2. Add IP blocking for repeated violations
3. Add CAPTCHA after X failed attempts

---

### 7. API Security - ⚠️ CRITICAL

**Status:** Endpoints created, not protected

#### Issues:
- ❌ **All endpoints publicly accessible** - No auth required
- ❌ **No API key management** - Third-party integrations not secure
- ❌ **No request signing** - Can't verify request authenticity
- ❌ **No webhook verification** - If webhooks added

#### Impact:
🔴 **CRITICAL** - Complete API exposure

#### Fix Required:
1. Apply authentication to all routes
2. Add API key system for integrations
3. Add request signing for sensitive operations

---

### 8. OAuth Security - ⚠️ HIGH

**Status:** Schema created, implementation missing

#### Issues:
- ❌ **OAuth tokens in plain text** - Should be encrypted
- ❌ **No token rotation** - Refresh tokens don't rotate
- ❌ **No scope validation** - Can't limit permissions
- ❌ **No OAuth implementation** - Google/Apple buttons are placeholders

#### Impact:
🟠 **HIGH** - If implemented without encryption, tokens compromised

#### Fix Required:
1. Encrypt OAuth tokens before storage
2. Implement proper OAuth 2.0 flow
3. Add token rotation
4. Validate scopes

---

### 9. Data Privacy - ⚠️ MEDIUM

**Status:** Partial implementation

#### Issues:
- ⚠️ **Soft delete not implemented** - Data permanently deleted
- ❌ **No data export** - Users can't export their data
- ❌ **No data retention policy** - Old data kept forever
- ❌ **No GDPR compliance** - If EU users

#### Impact:
🟡 **MEDIUM** - Privacy concerns, potential legal issues

#### Fix Required:
1. Implement soft delete
2. Add data export endpoint
3. Add data retention policy
4. GDPR compliance if needed

---

### 10. Dependency Security - ⚠️ LOW

**Status:** Not checked

#### Issues:
- ❌ **No dependency scanning** - Vulnerable packages unknown
- ❌ **No automated updates** - Dependencies get stale
- ❌ **No security audits** - npm audit not run

#### Impact:
🟢 **LOW** - Currently low risk, but grows over time

#### Fix Required:
1. Run `npm audit` regularly
2. Set up Dependabot or Renovate
3. Pin dependency versions

---

## 🔒 Security Checklist for Production

### Before Deploying to Production:

#### Authentication (CRITICAL)
- [ ] Apply authentication middleware to ALL protected routes
- [ ] Verify ownership checks on all edit/delete operations
- [ ] Implement token refresh mechanism
- [ ] Add logout endpoint
- [ ] Implement account lockout after failed attempts
- [ ] Add "remember me" option with longer-lived tokens

#### API Security (CRITICAL)
- [ ] Configure CORS properly
- [ ] Whitelist allowed origins
- [ ] Remove all console.log() statements
- [ ] Hide error details in production
- [ ] Apply input sanitization to ALL routes
- [ ] Add Content Security Policy headers
- [ ] Add security headers (Helmet.js)

#### Data Protection (HIGH)
- [ ] Encrypt OAuth tokens in database
- [ ] Implement soft delete for user data
- [ ] Add data export functionality
- [ ] Set up data retention policy
- [ ] Implement audit logs for sensitive operations

#### Infrastructure (HIGH)
- [ ] Use Redis for rate limiting
- [ ] Set up SSL/TLS certificates
- [ ] Configure environment variables properly
- [ ] Use strong JWT_SECRET (64+ characters)
- [ ] Enable database backups
- [ ] Set up monitoring and alerting

#### Testing (MEDIUM)
- [ ] Run security penetration tests
- [ ] Test rate limiting thoroughly
- [ ] Test authentication on all endpoints
- [ ] Test XSS prevention
- [ ] Test SQL injection prevention (N/A for MongoDB, but test NoSQL injection)
- [ ] Run npm audit and fix vulnerabilities

#### Compliance (if applicable)
- [ ] GDPR compliance (EU users)
- [ ] CCPA compliance (California users)
- [ ] Data processing agreements
- [ ] Privacy policy updated
- [ ] Terms of service updated

---

## 🛡️ Security Best Practices Implemented

### Code Level
- ✅ Passwords hashed with bcrypt
- ✅ Sensitive fields excluded from queries
- ✅ Input validation on all models
- ✅ Email normalization and validation
- ✅ Username sanitization

### Infrastructure Level
- ✅ Non-root Docker user
- ✅ Environment variables for secrets
- ✅ .gitignore for sensitive files
- ✅ Multi-stage Docker builds

### API Level
- ✅ JWT token generation
- ✅ Rate limiting utilities created
- ✅ Sanitization utilities created
- ✅ Authentication middleware created

---

## 📊 Security Risk Assessment

| Category | Risk Level | Status |
|----------|-----------|--------|
| **Authentication** | 🔴 CRITICAL | Partially implemented |
| **Authorization** | 🔴 CRITICAL | Not implemented |
| **API Protection** | 🔴 CRITICAL | Not implemented |
| **CORS** | 🔴 CRITICAL | Not implemented |
| **Input Validation** | 🟠 HIGH | Partial |
| **OAuth Security** | 🟠 HIGH | Not implemented |
| **Session Management** | 🟠 HIGH | Not implemented |
| **Error Handling** | 🟡 MEDIUM | Partial |
| **Rate Limiting** | 🟡 MEDIUM | In-memory only |
| **Data Privacy** | 🟡 MEDIUM | Partial |
| **Password Security** | 🟢 LOW | Implemented |
| **Database Security** | 🟢 LOW | Implemented |
| **Docker Security** | 🟢 LOW | Implemented |

### Overall Risk: 🔴 HIGH - NOT PRODUCTION READY

---

## 🚀 Implementation Priority

### Phase 1: CRITICAL (Deploy Blockers)
**Estimated Time:** 4-6 hours

1. **Apply authentication to all protected routes**
   - Update all `/api/users`, `/api/links`, `/api/requests` routes
   - Add `requireAuth()` middleware
   - Add ownership verification

2. **Configure CORS**
   - Add CORS middleware
   - Whitelist production domain
   - Handle preflight requests

3. **Apply input sanitization**
   - Update all API routes to sanitize input
   - Add to login route
   - Add to all edit/update routes

4. **Update login route with security**
   - Add rate limiting
   - Add sanitization
   - Return JWT token

### Phase 2: HIGH PRIORITY
**Estimated Time:** 6-8 hours

1. **Implement token refresh**
2. **Add logout functionality**
3. **Encrypt OAuth tokens**
4. **Add Content Security Policy**
5. **Set up Redis for rate limiting**
6. **Implement account lockout**

### Phase 3: MEDIUM PRIORITY
**Estimated Time:** 4-6 hours

1. **Add error logging (Sentry)**
2. **Implement session tracking**
3. **Add data export**
4. **Set up monitoring**
5. **Run security audit**

---

## 📝 Security Utilities Created

### Files Created:
1. ✅ `src/lib/auth.js` - JWT and password utilities
2. ✅ `src/middleware/auth.js` - Authentication middleware
3. ✅ `src/lib/sanitize.js` - Input sanitization
4. ✅ `src/lib/rateLimit.js` - Rate limiting

### Routes Updated:
1. ✅ `src/app/api/auth/signup/route.js` - Full security implementation

### Routes Needing Updates:
- ⚠️ `src/app/api/auth/login/route.js`
- ⚠️ All `/api/users/*` routes
- ⚠️ All `/api/links/*` routes
- ⚠️ All `/api/requests/*` routes
- ⚠️ All `/api/calendars/*` routes
- ⚠️ All `/api/events/*` routes
- ⚠️ All `/api/protected-times/*` routes
- ⚠️ All `/api/notifications/*` routes

---

## 🔐 Security Testing Commands

### Test Authentication:
```bash
# Should fail without token
curl http://localhost:3000/api/users/123

# Should work with token
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/users/123
```

### Test Rate Limiting:
```bash
# Send 6 requests quickly (should get 429 on 6th)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/auth/signup \
    -H "Content-Type: application/json" \
    -d '{"email":"test'$i'@test.com","username":"test'$i'","password":"Test123!","displayName":"Test"}';
done
```

### Test Input Sanitization:
```bash
# Try XSS attack
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"test","password":"Test123!","displayName":"<script>alert(1)</script>"}'

# Should return sanitized: &lt;script&gt;alert(1)&lt;/script&gt;
```

### Run Dependency Audit:
```bash
npm audit
npm audit fix
```

---

## 📞 Security Contacts

### Reporting Security Issues:
- **DO NOT** open public GitHub issues for security vulnerabilities
- Email: security@sparetime.me (set this up)
- Use private disclosure

---

## ✅ Next Steps

1. **Immediate:** Update login route with security (like signup)
2. **Immediate:** Apply `requireAuth()` to all protected routes
3. **Immediate:** Configure CORS for production
4. **Short-term:** Implement token refresh and logout
5. **Short-term:** Set up Redis for rate limiting
6. **Medium-term:** Add Sentry for error tracking
7. **Before production:** Complete security audit and penetration testing

---

**Status:** ⚠️ WORK IN PROGRESS
**Last Security Audit:** November 20, 2025
**Next Audit Due:** Before production deployment
**Production Ready:** ❌ NO - Critical security gaps remain
