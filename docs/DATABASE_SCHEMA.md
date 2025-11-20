# SpareTime Database Schema Documentation

Complete reference for all database models, fields, and relationships.

## Table of Contents

1. [User](#1-user)
2. [Calendar](#2-calendar)
3. [Event](#3-event)
4. [ProtectedTime](#4-protectedtime)
5. [Link](#5-link)
6. [Request](#6-request)
7. [Audience](#7-audience)
8. [Notification](#8-notification)
9. [Indexes](#indexes)
10. [Relationships](#relationships)

---

## 1. User

**Collection:** `users`
**Purpose:** Store user accounts, preferences, and subscription information

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `email` | String | Yes | User email (unique, lowercase) |
| `username` | String | Yes | Username (unique, 3-30 chars, lowercase) |
| `passwordHash` | String | Yes | Bcrypt hashed password |
| `displayName` | String | Yes | User's display name |
| `avatar` | String | No | Avatar URL |
| `timezone` | String | Yes | Timezone (default: 'America/New_York') |
| `preferences` | Object | No | User preferences object |
| `subscription` | Object | No | Subscription info |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Preferences Object

```javascript
{
  defaultProtectedTimes: [
    {
      dayOfWeek: Number,      // 0-6 (Sunday-Saturday)
      startTime: String,      // HH:MM format
      endTime: String         // HH:MM format
    }
  ],
  defaultLinkSettings: {
    showLabels: Boolean,      // Default: true
    showNegotiable: Boolean,  // Default: true
    detailLevel: String       // 'none' | 'minimal' | 'full'
  },
  notifications: {
    email: Boolean,           // Default: true
    push: Boolean,            // Default: false
    requestTypes: [String]    // ['request', 'response', 'view']
  },
  workHours: {
    start: String,            // HH:MM format
    end: String,              // HH:MM format
    workDays: [Number]        // Array of 0-6
  }
}
```

### Subscription Object

```javascript
{
  level: String,              // 'free' | 'premium'
  expiresAt: Date,            // Null for free tier
  features: [String]          // Array of feature names
}
```

### Methods

- `isPremium()` - Returns boolean indicating active premium status
- `toSafeObject()` - Returns user object without sensitive data

### Indexes

- `email` (unique)
- `username` (unique)
- `createdAt` (descending)

---

## 2. Calendar

**Collection:** `calendars`
**Purpose:** Store connected calendar sources (Google, Apple, or manual)

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | ObjectId | Yes | Reference to User |
| `source` | String | Yes | 'google' \| 'apple' \| 'manual' |
| `sourceId` | String | Conditional | Required for non-manual calendars |
| `name` | String | Yes | Calendar display name |
| `color` | String | No | Hex color (default: '#3B82F6') |
| `isActive` | Boolean | No | Active status (default: true) |
| `lastSynced` | Date | No | Last sync timestamp |
| `syncToken` | String | No | Sync token for incremental sync |
| `visibility` | Object | No | Visibility settings |
| `authData` | Object | No | OAuth credentials (encrypted) |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Visibility Object

```javascript
{
  default: String,            // 'busy' | 'free' | 'hidden'
  overrides: [
    {
      audienceId: ObjectId,   // Reference to Audience
      visibility: String      // 'busy' | 'free' | 'hidden'
    }
  ]
}
```

### AuthData Object

```javascript
{
  accessToken: String,        // Encrypted OAuth access token
  refreshToken: String,       // Encrypted OAuth refresh token
  expiresAt: Date            // Token expiration
}
```

### Methods

- `needsReauth()` - Check if calendar needs reauthorization
- `isSyncedRecently()` - Check if synced within last hour
- `getVisibilityForAudience(audienceId)` - Get visibility for specific audience

### Indexes

- `userId`
- `userId + sourceId` (compound, unique, sparse)
- `isActive`

---

## 3. Event

**Collection:** `events`
**Purpose:** Store calendar events from synced calendars or manual entry

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `calendarId` | ObjectId | Yes | Reference to Calendar |
| `sourceId` | String | No | External event ID |
| `title` | String | Yes | Event title |
| `description` | String | No | Event description |
| `location` | String | No | Event location |
| `startTime` | Date | Yes | Event start time |
| `endTime` | Date | Yes | Event end time (must be after start) |
| `isAllDay` | Boolean | No | All-day event flag |
| `recurrence` | Object | No | Recurrence pattern |
| `visibility` | String | No | 'public' \| 'private' |
| `status` | String | No | 'confirmed' \| 'tentative' \| 'cancelled' |
| `lastUpdated` | Date | Auto | Last update timestamp |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Recurrence Object

```javascript
{
  frequency: String,          // 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom'
  interval: Number,           // Repeat every N periods
  byDay: [Number],           // Days of week (0-6)
  endDate: Date,             // Recurrence end date
  count: Number              // Number of occurrences
}
```

### Methods

- `isHappeningNow()` - Check if event is currently happening
- `isUpcoming()` - Check if event is in the future
- `isRecurring()` - Check if event has recurrence
- `conflictsWith(startTime, endTime)` - Check time conflict

### Static Methods

- `findInRange(calendarId, startDate, endDate)` - Find events in date range

### Indexes

- `calendarId`
- `calendarId + sourceId` (compound, unique, sparse)
- `startTime + endTime` (compound)
- `status`

---

## 4. ProtectedTime

**Collection:** `protected_times`
**Purpose:** User-defined protected time blocks that appear busy to specific audiences

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | ObjectId | Yes | Reference to User |
| `title` | String | Yes | Protected time title |
| `startTime` | Date | Yes | Block start time |
| `endTime` | Date | Yes | Block end time (must be after start) |
| `recurrence` | Object | No | Recurrence pattern (same as Event) |
| `visibility` | Object | No | Visibility settings |
| `priority` | String | No | 'low' \| 'medium' \| 'high' |
| `isMovable` | Boolean | No | Can be rescheduled |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Visibility Object

```javascript
{
  default: String,            // 'busy' | 'free' | 'negotiable'
  overrides: [
    {
      audienceId: ObjectId,   // Reference to Audience
      visibility: String      // 'busy' | 'free' | 'negotiable'
    }
  ]
}
```

### Methods

- `isActiveNow()` - Check if protected time is active
- `isUpcoming()` - Check if in the future
- `isRecurring()` - Check if has recurrence
- `getVisibilityForAudience(audienceId)` - Get visibility for audience
- `conflictsWith(startTime, endTime)` - Check time conflict

### Static Methods

- `findInRange(userId, startDate, endDate)` - Find protected times in range
- `findHighPriority(userId)` - Find high priority upcoming blocks

### Indexes

- `userId`
- `userId + startTime + endTime` (compound)
- `startTime`
- `priority`

---

## 5. Link

**Collection:** `links`
**Purpose:** Shareable availability links with custom settings and audiences

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | ObjectId | Yes | Reference to User |
| `name` | String | Yes | Link display name |
| `slug` | String | Yes | URL slug (unique, lowercase) |
| `fullUrl` | String | Auto | Complete URL |
| `expiresAt` | Date | No | Expiration date |
| `settings` | Object | No | Link settings |
| `audience` | Object | No | Target audience info |
| `stats` | Object | Auto | Usage statistics |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Settings Object

```javascript
{
  showLabels: Boolean,
  showNegotiable: Boolean,
  detailLevel: String,        // 'none' | 'minimal' | 'full'
  calendarVisibility: [
    {
      calendarId: ObjectId,
      visibility: String      // 'busy' | 'free' | 'hidden'
    }
  ],
  customMessage: String,
  allowRequests: Boolean,
  defaultDuration: Number,    // Minutes
  timeConstraints: {
    earliestTime: String,     // HH:MM
    latestTime: String,       // HH:MM
    daysInAdvance: Number
  }
}
```

### Audience Object

```javascript
{
  id: ObjectId,               // Reference to Audience
  name: String                // Audience name
}
```

### Stats Object

```javascript
{
  views: Number,              // View count
  requests: Number,           // Request count
  lastViewed: Date           // Last view timestamp
}
```

### Methods

- `incrementViews()` - Increment view count
- `incrementRequests()` - Increment request count
- `canReceiveRequests()` - Check if accepting requests
- `getCalendarVisibility(calendarId)` - Get calendar visibility

### Virtuals

- `isExpired` - Boolean indicating if link is expired
- `isActive` - Boolean indicating if link is active

### Static Methods

- `findActiveByUser(userId)` - Find active links for user
- `findExpired()` - Find all expired links

### Indexes

- `userId`
- `slug` (unique)
- `expiresAt`
- `stats.views` (descending)
- `stats.requests` (descending)

---

## 6. Request

**Collection:** `requests`
**Purpose:** Time requests from visitors through shared links

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `linkId` | ObjectId | Yes | Reference to Link |
| `fromUser` | Object | Yes | Requester information |
| `toUserId` | ObjectId | Yes | Reference to recipient User |
| `startTime` | Date | Yes | Requested start time |
| `endTime` | Date | Yes | Requested end time |
| `purpose` | String | No | Request purpose |
| `urgency` | String | No | 'low' \| 'normal' \| 'high' |
| `status` | String | No | 'pending' \| 'approved' \| 'rejected' \| 'alternative' |
| `alternativeTime` | Object | No | Alternative time proposal |
| `responseMessage` | String | No | Response from recipient |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### FromUser Object

```javascript
{
  name: String,               // Requester name
  email: String,              // Requester email
  message: String             // Request message
}
```

### AlternativeTime Object

```javascript
{
  startTime: Date,
  endTime: Date
}
```

### Methods

- `approve(responseMessage)` - Approve request
- `reject(responseMessage)` - Reject request
- `proposeAlternative(startTime, endTime, message)` - Propose alternative
- `isPending()` - Check if pending
- `needsAction()` - Check if needs action (pending + upcoming)

### Virtuals

- `durationMinutes` - Duration in minutes
- `isPast` - Boolean if in the past
- `isUpcoming` - Boolean if in the future

### Static Methods

- `findPendingByUser(userId)` - Find pending requests for user
- `findByLink(linkId)` - Find all requests for link
- `findRecentByUser(userId, limit)` - Find recent requests
- `findInRange(userId, startDate, endDate)` - Find requests in range

### Indexes

- `linkId`
- `toUserId`
- `toUserId + status` (compound)
- `startTime`
- `status + createdAt` (compound)

---

## 7. Audience

**Collection:** `audiences`
**Purpose:** Named groups for sharing different availability views

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | ObjectId | Yes | Reference to User |
| `name` | String | Yes | Audience name |
| `description` | String | No | Audience description |
| `links` | [ObjectId] | No | Array of Link references |
| `settings` | Object | No | Audience settings |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Settings Object

```javascript
{
  defaultVisibility: String,  // 'busy' | 'free' | 'negotiable'
  calendarVisibility: [
    {
      calendarId: ObjectId,
      visibility: String      // 'busy' | 'free' | 'hidden'
    }
  ],
  requestPermissions: {
    canRequest: Boolean,
    defaultDuration: Number   // Minutes
  }
}
```

### Methods

- `addLink(linkId)` - Add link to audience
- `removeLink(linkId)` - Remove link from audience
- `hasLink(linkId)` - Check if link belongs to audience
- `getCalendarVisibility(calendarId)` - Get calendar visibility
- `setCalendarVisibility(calendarId, visibility)` - Update visibility

### Virtuals

- `linkCount` - Number of links

### Static Methods

- `findByUser(userId)` - Find all audiences for user
- `findByUserWithLinks(userId)` - Find audiences with links populated
- `findByUserAndName(userId, name)` - Find audience by name

### Indexes

- `userId`
- `userId + name` (compound)

---

## 8. Notification

**Collection:** `notifications`
**Purpose:** User notifications for requests, responses, views, and system events

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Unique identifier |
| `userId` | ObjectId | Yes | Reference to User |
| `type` | String | Yes | 'request' \| 'response' \| 'view' \| 'system' |
| `title` | String | Yes | Notification title |
| `message` | String | Yes | Notification message |
| `relatedId` | ObjectId | No | Related entity ID |
| `relatedType` | String | No | 'request' \| 'link' \| 'user' \| 'calendar' |
| `read` | Boolean | No | Read status (default: false) |
| `delivered` | Boolean | No | Delivery status |
| `action` | Object | No | Action button config |
| `createdAt` | Date | Auto | Creation timestamp |
| `updatedAt` | Date | Auto | Last update timestamp |

### Action Object

```javascript
{
  type: String,               // 'view' | 'respond' | 'settings' | 'link'
  data: Object               // Action-specific data
}
```

### Methods

- `markAsRead()` - Mark notification as read
- `markAsDelivered()` - Mark as delivered

### Virtuals

- `isRecent` - Boolean if created within last 24 hours

### Static Methods

- `findUnreadByUser(userId)` - Find unread notifications
- `findRecentByUser(userId, limit)` - Find recent notifications
- `findByUserAndType(userId, type)` - Find by type
- `markAllAsReadForUser(userId)` - Mark all as read
- `getUnreadCount(userId)` - Get unread count
- `createNotification(data)` - Create new notification
- `deleteOldReadNotifications(daysOld)` - Cleanup old notifications

### Indexes

- `userId`
- `userId + read` (compound)
- `userId + createdAt` (compound, descending)
- `userId + type` (compound)

---

## Indexes

### Summary by Collection

| Collection | Total Indexes | Unique Indexes |
|------------|---------------|----------------|
| users | 3 | 2 (email, username) |
| calendars | 3 | 1 (userId + sourceId) |
| events | 4 | 1 (calendarId + sourceId) |
| protected_times | 4 | 0 |
| links | 5 | 1 (slug) |
| requests | 5 | 0 |
| audiences | 2 | 0 |
| notifications | 4 | 0 |

---

## Relationships

### Entity Relationship Diagram

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     ├─── (1:N) ──→ Calendar
     │                 │
     │                 └─── (1:N) ──→ Event
     │
     ├─── (1:N) ──→ ProtectedTime
     │
     ├─── (1:N) ──→ Link
     │                 │
     │                 └─── (1:N) ──→ Request
     │
     ├─── (1:N) ──→ Audience
     │                 │
     │                 └─── (1:N) ──→ Link (referenced)
     │
     └─── (1:N) ──→ Notification
```

### Relationship Details

1. **User → Calendars** (One-to-Many)
   - One user can have multiple calendars
   - Each calendar belongs to one user

2. **Calendar → Events** (One-to-Many)
   - One calendar can have multiple events
   - Each event belongs to one calendar

3. **User → ProtectedTimes** (One-to-Many)
   - One user can have multiple protected time blocks
   - Each protected time belongs to one user

4. **User → Links** (One-to-Many)
   - One user can create multiple shareable links
   - Each link belongs to one user

5. **Link → Requests** (One-to-Many)
   - One link can receive multiple time requests
   - Each request is associated with one link

6. **User → Audiences** (One-to-Many)
   - One user can create multiple audiences
   - Each audience belongs to one user

7. **Audience → Links** (One-to-Many, Referenced)
   - One audience can be associated with multiple links
   - One link can belong to one audience

8. **User → Notifications** (One-to-Many)
   - One user can have multiple notifications
   - Each notification belongs to one user

---

**Schema Version:** 1.0.0
**Last Updated:** 2025-11-20
**Total Collections:** 8
**Total Indexes:** 30
