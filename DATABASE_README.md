# SpareTime Database Setup

Complete MongoDB database infrastructure for the SpareTime application.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Scripts](#scripts)
- [Models Reference](#models-reference)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The SpareTime database is built with MongoDB and Mongoose ODM. It consists of 8 core collections that manage users, calendars, events, availability links, time requests, and notifications.

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SpareTime Database                    │
├─────────────────────────────────────────────────────────┤
│  Collections:                                           │
│  • users            - User accounts & preferences       │
│  • calendars        - Connected calendar sources        │
│  • events           - Calendar events                   │
│  • protected_times  - Protected time blocks             │
│  • links            - Shareable availability links      │
│  • requests         - Time requests from visitors       │
│  • audiences        - Named sharing groups              │
│  • notifications    - User notifications                │
└─────────────────────────────────────────────────────────┘
```

## 🗄️ Database Schema

### Collections Overview

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| **users** | User accounts | email, username, preferences, subscription |
| **calendars** | Connected calendars | source (google/apple/manual), authData |
| **events** | Calendar events | title, startTime, endTime, recurrence |
| **protected_times** | Protected blocks | title, visibility, priority, isMovable |
| **links** | Share links | slug, settings, audience, stats |
| **requests** | Time requests | fromUser, toUserId, status, urgency |
| **audiences** | Sharing groups | name, settings, links[] |
| **notifications** | User alerts | type, title, message, action |

### Relationships

```
User (1) ──→ (many) Calendars
User (1) ──→ (many) Events
User (1) ──→ (many) ProtectedTimes
User (1) ──→ (many) Links
User (1) ──→ (many) Audiences
User (1) ──→ (many) Notifications

Calendar (1) ──→ (many) Events
Link (1) ──→ (many) Requests
Audience (1) ──→ (many) Links
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

Dependencies installed:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `dotenv` - Environment variable management

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your MongoDB URI
# For local: mongodb://localhost:27017/sparetime
# For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/sparetime
```

### 3. Test Database Connection

```bash
npm run db:test
```

### 4. Seed Sample Data

```bash
npm run db:seed
```

### 5. Start Development

```bash
npm run dev
```

## 📦 Installation

### Prerequisites

- Node.js 18+
- MongoDB 6.0+ (local or MongoDB Atlas)

### Local MongoDB Setup

**macOS (via Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Windows:**
Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create database user
4. Whitelist your IP (or allow from anywhere: 0.0.0.0/0)
5. Get connection string
6. Add to `.env.local` as `MONGODB_URI`

## ⚙️ Configuration

### Environment Variables

Create `.env.local` from `.env.example`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/sparetime

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

## 💻 Usage

### Importing Models

```javascript
// Import all models
import { User, Calendar, Event, Link } from '@/models';

// Or import individually
import User from '@/models/User';
```

### Database Connection

```javascript
import connectDB from '@/lib/database';

// Connect to database
await connectDB();

// Use models
const users = await User.find();
```

### Example API Route

```javascript
// src/app/api/users/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import { User } from '@/models';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().select('-passwordHash');
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

## 🔧 Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "db:test": "node scripts/test-database.js",
    "db:seed": "node scripts/seed-database.js"
  }
}
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run db:test` | Test database connection and schemas |
| `npm run db:seed` | Seed database with sample data |

## 📚 Models Reference

### User Model

```javascript
const user = await User.create({
  email: 'user@example.com',
  username: 'username',
  passwordHash: await bcrypt.hash('password', 10),
  displayName: 'User Name',
  timezone: 'America/New_York',
});

// Methods
user.isPremium();           // Check if user has active premium
user.toSafeObject();        // Get user without sensitive data
```

### Calendar Model

```javascript
const calendar = await Calendar.create({
  userId: user._id,
  source: 'google',
  sourceId: 'primary',
  name: 'Work Calendar',
  color: '#3B82F6',
});

// Methods
calendar.needsReauth();     // Check if needs reauthorization
calendar.isSyncedRecently(); // Check if synced in last hour
calendar.getVisibilityForAudience(audienceId);
```

### Link Model

```javascript
const link = await Link.create({
  userId: user._id,
  name: 'Coffee Chat',
  slug: 'coffee-chat',
  settings: {
    allowRequests: true,
    defaultDuration: 30,
  },
});

// Methods
await link.incrementViews();
await link.incrementRequests();
link.canReceiveRequests();
link.getCalendarVisibility(calendarId);

// Statics
const activeLinks = await Link.findActiveByUser(userId);
```

### Request Model

```javascript
const request = await Request.create({
  linkId: link._id,
  toUserId: user._id,
  fromUser: {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Would love to chat!',
  },
  startTime: new Date('2025-01-15T10:00:00'),
  endTime: new Date('2025-01-15T10:30:00'),
});

// Methods
await request.approve('Looking forward to it!');
await request.reject('Sorry, not available');
await request.proposeAlternative(newStart, newEnd, 'How about this?');

// Statics
const pending = await Request.findPendingByUser(userId);
```

## 🧪 Testing

### Run Tests

```bash
npm run db:test
```

### Test Output

```
═══════════════════════════════════════════════════════════
🧪 SpareTime Database Test Suite
═══════════════════════════════════════════════════════════

🔌 Testing database connection...
   ✅ Connection successful!
   📊 MongoDB version: 6.0.0
   🗄️  Database: sparetime

📋 Testing model schemas...
   ✅ User                 - 12 fields, 2 indexes
   ✅ Calendar             - 10 fields, 3 indexes
   [...]

✅ All tests passed! Database is ready to use.
```

### Seed Database

```bash
npm run db:seed
```

This creates:
- 3 sample users (john.doe@example.com / password123)
- 3 calendars
- 4 events
- 2 protected times
- 3 audiences
- 3 links
- 4 requests
- 5 notifications

## 🐛 Troubleshooting

### Connection Issues

**Error: `MONGODB_URI is not defined`**
```bash
# Make sure .env.local exists
cp .env.example .env.local
# Edit .env.local and set MONGODB_URI
```

**Error: `Connection failed`**
```bash
# Check MongoDB is running
mongosh  # Should connect successfully

# For MongoDB Atlas, check:
# 1. IP whitelist includes your IP
# 2. Database user exists
# 3. Connection string is correct
```

### Schema Validation Errors

**Error: `Email validation failed`**
- Ensure email format is valid: `user@domain.com`

**Error: `Username validation failed`**
- Username must be lowercase, 3-30 characters
- Only letters, numbers, hyphens, underscores

**Error: `End time must be after start time`**
- Check that `endTime > startTime` for events/requests

### Performance Issues

**Slow queries:**
```javascript
// Ensure proper indexes are created
await User.createIndexes();
await Calendar.createIndexes();
await Event.createIndexes();
```

**Too many connections:**
```javascript
// Check connection pooling settings in src/lib/database.js
maxPoolSize: 10,
minPoolSize: 2,
```

## 📖 Additional Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Next.js with MongoDB](https://nextjs.org/docs/app/building-your-application/data-fetching)

## 🆘 Support

For issues or questions:
1. Check this README
2. Review the test output: `npm run db:test`
3. Check MongoDB logs
4. Review model schemas in `src/models/`

---

**Database Version:** 1.0.0
**Last Updated:** 2025-11-20
**MongoDB Version Required:** 6.0+
