# SpareTime API Reference

Complete API documentation for all endpoints.

## Base URL

```
Development: http://localhost:3000/api
Production: https://sparetime.me/api
```

## Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Links](#links)
4. [Requests](#requests)
5. [Calendars](#calendars)
6. [Events](#events)
7. [Protected Times](#protected-times)
8. [Notifications](#notifications)

---

## Authentication

### Sign Up

Create a new user account.

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "securePassword123",
  "displayName": "User Name"
}
```

**Response:** `201 Created`
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username",
    "displayName": "User Name",
    "timezone": "America/New_York",
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - User already exists
- `500` - Internal server error

---

### Login

Authenticate a user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username",
    "displayName": "User Name"
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Internal server error

---

## Users

### Get User by ID

Get user details by ID.

**Endpoint:** `GET /api/users/[id]`

**Response:** `200 OK`
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username",
    "displayName": "User Name",
    "timezone": "America/New_York"
  }
}
```

**Error Responses:**
- `404` - User not found
- `500` - Internal server error

---

### Update User

Update user profile.

**Endpoint:** `PATCH /api/users/[id]`

**Request Body:**
```json
{
  "displayName": "New Display Name",
  "timezone": "America/Los_Angeles",
  "preferences": {
    "notifications": {
      "email": true,
      "push": false
    }
  }
}
```

**Response:** `200 OK`
```json
{
  "message": "User updated successfully",
  "user": { /* updated user object */ }
}
```

---

### Delete User

Delete a user account.

**Endpoint:** `DELETE /api/users/[id]`

**Response:** `200 OK`
```json
{
  "message": "User deleted successfully"
}
```

---

## Links

### Get All Links

Get all links for a user.

**Endpoint:** `GET /api/links?userId={userId}`

**Query Parameters:**
- `userId` (required) - User ID

**Response:** `200 OK`
```json
{
  "links": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Coffee Chat",
      "slug": "coffee-chat",
      "fullUrl": "http://localhost:3000/u/username/coffee-chat",
      "stats": {
        "views": 42,
        "requests": 7
      }
    }
  ],
  "count": 1
}
```

---

### Create Link

Create a new shareable link.

**Endpoint:** `POST /api/links`

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "name": "Coffee Chat",
  "slug": "coffee-chat",
  "expiresAt": "2025-12-31T23:59:59.000Z",
  "settings": {
    "showLabels": true,
    "showNegotiable": true,
    "detailLevel": "minimal",
    "allowRequests": true,
    "defaultDuration": 30,
    "customMessage": "Let's grab coffee!",
    "timeConstraints": {
      "earliestTime": "09:00",
      "latestTime": "17:00",
      "daysInAdvance": 14
    }
  }
}
```

**Response:** `201 Created`
```json
{
  "message": "Link created successfully",
  "link": { /* created link object */ }
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - Slug already exists
- `500` - Internal server error

---

### Get Link by ID

Get link details by ID.

**Endpoint:** `GET /api/links/[id]`

**Response:** `200 OK`

---

### Get Link by Slug

Get link by slug (public access).

**Endpoint:** `GET /api/links/slug/[slug]`

**Response:** `200 OK`
```json
{
  "link": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Coffee Chat",
    "slug": "coffee-chat",
    "userId": {
      "username": "johndoe",
      "displayName": "John Doe",
      "avatar": "/avatars/john.jpg"
    },
    "settings": {
      "customMessage": "Let's grab coffee!",
      "defaultDuration": 30
    }
  }
}
```

**Error Responses:**
- `404` - Link not found
- `410` - Link expired
- `500` - Internal server error

---

### Update Link

Update link settings.

**Endpoint:** `PATCH /api/links/[id]`

**Request Body:**
```json
{
  "name": "Updated Name",
  "settings": {
    "customMessage": "New message"
  }
}
```

**Response:** `200 OK`

---

### Delete Link

Delete a link.

**Endpoint:** `DELETE /api/links/[id]`

**Response:** `200 OK`

---

## Requests

### Get All Requests

Get requests for a user.

**Endpoint:** `GET /api/requests?userId={userId}&status={status}&limit={limit}`

**Query Parameters:**
- `userId` (required) - User ID
- `status` (optional) - Filter by status: `pending`, `approved`, `rejected`, `alternative`
- `limit` (optional) - Limit results (default: 50)

**Response:** `200 OK`
```json
{
  "requests": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "linkId": {
        "name": "Coffee Chat",
        "slug": "coffee-chat"
      },
      "fromUser": {
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "message": "Would love to catch up!"
      },
      "startTime": "2025-01-20T10:00:00.000Z",
      "endTime": "2025-01-20T10:30:00.000Z",
      "status": "pending",
      "urgency": "normal"
    }
  ],
  "count": 1
}
```

---

### Create Request

Create a new time request.

**Endpoint:** `POST /api/requests`

**Request Body:**
```json
{
  "linkId": "507f1f77bcf86cd799439012",
  "toUserId": "507f1f77bcf86cd799439011",
  "fromUser": {
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "message": "Would love to catch up over coffee!"
  },
  "startTime": "2025-01-20T10:00:00.000Z",
  "endTime": "2025-01-20T10:30:00.000Z",
  "purpose": "Networking",
  "urgency": "normal"
}
```

**Response:** `201 Created`

---

### Update Request

Approve, reject, or propose alternative time.

**Endpoint:** `PATCH /api/requests/[id]`

**Request Body (Approve):**
```json
{
  "action": "approve",
  "responseMessage": "Looking forward to it!"
}
```

**Request Body (Reject):**
```json
{
  "action": "reject",
  "responseMessage": "Sorry, not available at that time"
}
```

**Request Body (Propose Alternative):**
```json
{
  "action": "alternative",
  "responseMessage": "How about this time instead?",
  "alternativeTime": {
    "startTime": "2025-01-20T14:00:00.000Z",
    "endTime": "2025-01-20T14:30:00.000Z"
  }
}
```

**Response:** `200 OK`

---

## Calendars

### Get All Calendars

Get calendars for a user.

**Endpoint:** `GET /api/calendars?userId={userId}`

**Query Parameters:**
- `userId` (required) - User ID

**Response:** `200 OK`
```json
{
  "calendars": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Work Calendar",
      "source": "google",
      "color": "#3B82F6",
      "isActive": true,
      "lastSynced": "2025-01-15T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### Create Calendar

Connect a new calendar.

**Endpoint:** `POST /api/calendars`

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "source": "google",
  "sourceId": "primary",
  "name": "Work Calendar",
  "color": "#3B82F6"
}
```

**Response:** `201 Created`

---

## Events

### Get Events

Get events for a user or calendar.

**Endpoint:** `GET /api/events?userId={userId}&startDate={startDate}&endDate={endDate}`

**Query Parameters:**
- `userId` OR `calendarId` (required) - Filter by user or calendar
- `startDate` (optional) - ISO date string
- `endDate` (optional) - ISO date string

**Response:** `200 OK`
```json
{
  "events": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "title": "Team Meeting",
      "description": "Weekly team sync",
      "startTime": "2025-01-20T10:00:00.000Z",
      "endTime": "2025-01-20T11:00:00.000Z",
      "calendarId": {
        "name": "Work Calendar",
        "color": "#3B82F6"
      }
    }
  ],
  "count": 1
}
```

---

### Create Event

Create a new event.

**Endpoint:** `POST /api/events`

**Request Body:**
```json
{
  "calendarId": "507f1f77bcf86cd799439014",
  "title": "Team Meeting",
  "description": "Weekly team sync",
  "location": "Conference Room A",
  "startTime": "2025-01-20T10:00:00.000Z",
  "endTime": "2025-01-20T11:00:00.000Z",
  "isAllDay": false,
  "recurrence": {
    "frequency": "weekly",
    "interval": 1,
    "byDay": [1]
  }
}
```

**Response:** `201 Created`

---

## Protected Times

### Get Protected Times

Get protected time blocks for a user.

**Endpoint:** `GET /api/protected-times?userId={userId}&startDate={startDate}&endDate={endDate}`

**Query Parameters:**
- `userId` (required) - User ID
- `startDate` (optional) - ISO date string
- `endDate` (optional) - ISO date string

**Response:** `200 OK`
```json
{
  "protectedTimes": [
    {
      "_id": "507f1f77bcf86cd799439016",
      "title": "Focus Time",
      "startTime": "2025-01-20T09:00:00.000Z",
      "endTime": "2025-01-20T11:00:00.000Z",
      "priority": "high",
      "isMovable": false,
      "visibility": {
        "default": "busy"
      }
    }
  ],
  "count": 1
}
```

---

### Create Protected Time

Create a protected time block.

**Endpoint:** `POST /api/protected-times`

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "title": "Focus Time",
  "startTime": "2025-01-20T09:00:00.000Z",
  "endTime": "2025-01-20T11:00:00.000Z",
  "priority": "high",
  "isMovable": false,
  "visibility": {
    "default": "busy",
    "overrides": []
  },
  "recurrence": {
    "frequency": "daily",
    "interval": 1,
    "byDay": [1, 2, 3, 4, 5]
  }
}
```

**Response:** `201 Created`

---

## Notifications

### Get Notifications

Get notifications for a user.

**Endpoint:** `GET /api/notifications?userId={userId}&unreadOnly={boolean}&limit={limit}`

**Query Parameters:**
- `userId` (required) - User ID
- `unreadOnly` (optional) - Boolean, filter unread only
- `limit` (optional) - Limit results (default: 50)

**Response:** `200 OK`
```json
{
  "notifications": [
    {
      "_id": "507f1f77bcf86cd799439017",
      "type": "request",
      "title": "New Time Request",
      "message": "Alice Johnson requested time with you",
      "read": false,
      "createdAt": "2025-01-15T10:00:00.000Z",
      "action": {
        "type": "respond",
        "data": {
          "requestId": "507f1f77bcf86cd799439013"
        }
      }
    }
  ],
  "count": 1,
  "unreadCount": 5
}
```

---

### Mark Notifications as Read

Mark one or all notifications as read.

**Endpoint:** `PATCH /api/notifications`

**Request Body (Single):**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "notificationId": "507f1f77bcf86cd799439017"
}
```

**Request Body (All):**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "markAllAsRead": true
}
```

**Response:** `200 OK`

---

## Error Responses

All endpoints may return these common errors:

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 409 Conflict
```json
{
  "error": "Resource already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "details": "Error message"
}
```

---

## Testing with cURL

### Sign Up Example
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "displayName": "Test User"
  }'
```

### Login Example
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Links Example
```bash
curl http://localhost:3000/api/links?userId=507f1f77bcf86cd799439011
```

### Create Link Example
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "name": "Coffee Chat",
    "slug": "coffee-chat"
  }'
```

---

**API Version:** 1.0.0
**Last Updated:** 2025-11-20
**Total Endpoints:** 25+
