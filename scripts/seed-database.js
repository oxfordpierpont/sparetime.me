/**
 * Database Seeding Script
 * Populates the database with sample data for development and testing
 *
 * Usage: node scripts/seed-database.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

// Import models
import {
  User,
  Calendar,
  Event,
  ProtectedTime,
  Link,
  Request,
  Audience,
  Notification,
} from '../src/models/index.js';

/**
 * Connect to MongoDB
 */
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

/**
 * Clear all collections
 */
async function clearDatabase() {
  console.log('\n🗑️  Clearing existing data...');
  await User.deleteMany({});
  await Calendar.deleteMany({});
  await Event.deleteMany({});
  await ProtectedTime.deleteMany({});
  await Link.deleteMany({});
  await Request.deleteMany({});
  await Audience.deleteMany({});
  await Notification.deleteMany({});
  console.log('✅ Database cleared');
}

/**
 * Create sample users
 */
async function createUsers() {
  console.log('\n👥 Creating users...');

  const users = [
    {
      email: 'john.doe@example.com',
      username: 'johndoe',
      passwordHash: await bcrypt.hash('password123', 10),
      displayName: 'John Doe',
      timezone: 'America/New_York',
      preferences: {
        defaultProtectedTimes: [
          { dayOfWeek: 0, startTime: '00:00', endTime: '23:59' }, // Sunday all day
          { dayOfWeek: 6, startTime: '18:00', endTime: '23:59' }, // Saturday evening
        ],
        defaultLinkSettings: {
          showLabels: true,
          showNegotiable: true,
          detailLevel: 'minimal',
        },
        notifications: {
          email: true,
          push: true,
          requestTypes: ['request', 'response'],
        },
        workHours: {
          start: '09:00',
          end: '17:00',
          workDays: [1, 2, 3, 4, 5],
        },
      },
      subscription: {
        level: 'premium',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        features: ['unlimited_links', 'advanced_analytics', 'custom_branding'],
      },
    },
    {
      email: 'jane.smith@example.com',
      username: 'janesmith',
      passwordHash: await bcrypt.hash('password123', 10),
      displayName: 'Jane Smith',
      timezone: 'America/Los_Angeles',
      subscription: {
        level: 'free',
      },
    },
    {
      email: 'bob.wilson@example.com',
      username: 'bobwilson',
      passwordHash: await bcrypt.hash('password123', 10),
      displayName: 'Bob Wilson',
      timezone: 'America/Chicago',
      subscription: {
        level: 'free',
      },
    },
  ];

  const createdUsers = await User.insertMany(users);
  console.log(`✅ Created ${createdUsers.length} users`);
  return createdUsers;
}

/**
 * Create sample calendars
 */
async function createCalendars(users) {
  console.log('\n📅 Creating calendars...');

  const calendars = [
    {
      userId: users[0]._id,
      source: 'google',
      sourceId: 'primary',
      name: 'Work Calendar',
      color: '#3B82F6',
      isActive: true,
      lastSynced: new Date(),
      visibility: {
        default: 'busy',
        overrides: [],
      },
    },
    {
      userId: users[0]._id,
      source: 'manual',
      name: 'Personal Calendar',
      color: '#10B981',
      isActive: true,
      visibility: {
        default: 'busy',
        overrides: [],
      },
    },
    {
      userId: users[1]._id,
      source: 'google',
      sourceId: 'primary',
      name: 'Main Calendar',
      color: '#F59E0B',
      isActive: true,
      lastSynced: new Date(),
      visibility: {
        default: 'busy',
        overrides: [],
      },
    },
  ];

  const createdCalendars = await Calendar.insertMany(calendars);
  console.log(`✅ Created ${createdCalendars.length} calendars`);
  return createdCalendars;
}

/**
 * Create sample events
 */
async function createEvents(calendars) {
  console.log('\n📆 Creating events...');

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const events = [
    {
      calendarId: calendars[0]._id,
      sourceId: 'event-001',
      title: 'Team Meeting',
      description: 'Weekly team sync',
      location: 'Conference Room A',
      startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(11, 0, 0, 0)),
      isAllDay: false,
      visibility: 'public',
      status: 'confirmed',
      recurrence: {
        frequency: 'weekly',
        interval: 1,
        byDay: [1], // Monday
      },
    },
    {
      calendarId: calendars[0]._id,
      title: 'Project Review',
      description: 'Q4 project review session',
      startTime: new Date(tomorrow.setHours(14, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(15, 30, 0, 0)),
      isAllDay: false,
      visibility: 'private',
      status: 'confirmed',
    },
    {
      calendarId: calendars[1]._id,
      title: 'Dentist Appointment',
      startTime: new Date(nextWeek.setHours(9, 0, 0, 0)),
      endTime: new Date(nextWeek.setHours(10, 0, 0, 0)),
      isAllDay: false,
      visibility: 'private',
      status: 'confirmed',
    },
    {
      calendarId: calendars[1]._id,
      title: 'Lunch with Sarah',
      location: 'Downtown Café',
      startTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(13, 0, 0, 0)),
      isAllDay: false,
      visibility: 'private',
      status: 'confirmed',
    },
  ];

  const createdEvents = await Event.insertMany(events);
  console.log(`✅ Created ${createdEvents.length} events`);
  return createdEvents;
}

/**
 * Create sample protected times
 */
async function createProtectedTimes(users) {
  console.log('\n🛡️  Creating protected times...');

  const protectedTimes = [
    {
      userId: users[0]._id,
      title: 'Focus Time',
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
      endTime: new Date(new Date().setHours(11, 0, 0, 0)),
      recurrence: {
        frequency: 'daily',
        interval: 1,
        byDay: [1, 2, 3, 4, 5], // Weekdays
      },
      visibility: {
        default: 'busy',
        overrides: [],
      },
      priority: 'high',
      isMovable: false,
    },
    {
      userId: users[0]._id,
      title: 'Lunch Break',
      startTime: new Date(new Date().setHours(12, 0, 0, 0)),
      endTime: new Date(new Date().setHours(13, 0, 0, 0)),
      recurrence: {
        frequency: 'daily',
        interval: 1,
        byDay: [1, 2, 3, 4, 5],
      },
      visibility: {
        default: 'negotiable',
        overrides: [],
      },
      priority: 'medium',
      isMovable: true,
    },
  ];

  const createdProtectedTimes = await ProtectedTime.insertMany(protectedTimes);
  console.log(`✅ Created ${createdProtectedTimes.length} protected times`);
  return createdProtectedTimes;
}

/**
 * Create sample audiences
 */
async function createAudiences(users, calendars) {
  console.log('\n👨‍👩‍👧‍👦 Creating audiences...');

  const audiences = [
    {
      userId: users[0]._id,
      name: 'Friends',
      description: 'Close friends group',
      links: [],
      settings: {
        defaultVisibility: 'negotiable',
        calendarVisibility: [
          { calendarId: calendars[0]._id, visibility: 'busy' },
          { calendarId: calendars[1]._id, visibility: 'free' },
        ],
        requestPermissions: {
          canRequest: true,
          defaultDuration: 60,
        },
      },
    },
    {
      userId: users[0]._id,
      name: 'Work Colleagues',
      description: 'Professional contacts',
      links: [],
      settings: {
        defaultVisibility: 'busy',
        calendarVisibility: [
          { calendarId: calendars[0]._id, visibility: 'busy' },
          { calendarId: calendars[1]._id, visibility: 'hidden' },
        ],
        requestPermissions: {
          canRequest: true,
          defaultDuration: 30,
        },
      },
    },
    {
      userId: users[0]._id,
      name: 'Family',
      description: 'Family members',
      links: [],
      settings: {
        defaultVisibility: 'free',
        calendarVisibility: [
          { calendarId: calendars[0]._id, visibility: 'busy' },
          { calendarId: calendars[1]._id, visibility: 'free' },
        ],
        requestPermissions: {
          canRequest: true,
          defaultDuration: 120,
        },
      },
    },
  ];

  const createdAudiences = await Audience.insertMany(audiences);
  console.log(`✅ Created ${createdAudiences.length} audiences`);
  return createdAudiences;
}

/**
 * Create sample links
 */
async function createLinks(users, audiences) {
  console.log('\n🔗 Creating links...');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const links = [
    {
      userId: users[0]._id,
      name: 'Coffee Chat',
      slug: 'coffee-chat',
      fullUrl: `${baseUrl}/u/johndoe/coffee-chat`,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      settings: {
        showLabels: true,
        showNegotiable: true,
        detailLevel: 'minimal',
        calendarVisibility: [],
        customMessage: 'Let\'s grab a coffee and chat!',
        allowRequests: true,
        defaultDuration: 30,
        timeConstraints: {
          earliestTime: '09:00',
          latestTime: '17:00',
          daysInAdvance: 14,
        },
      },
      audience: {
        id: audiences[0]._id,
        name: 'Friends',
      },
      stats: {
        views: 42,
        requests: 7,
        lastViewed: new Date(),
      },
    },
    {
      userId: users[0]._id,
      name: 'Quick Meeting',
      slug: 'quick-meeting',
      fullUrl: `${baseUrl}/u/johndoe/quick-meeting`,
      settings: {
        showLabels: true,
        showNegotiable: false,
        detailLevel: 'none',
        customMessage: 'Book a quick 15-minute meeting with me',
        allowRequests: true,
        defaultDuration: 15,
        timeConstraints: {
          earliestTime: '10:00',
          latestTime: '16:00',
          daysInAdvance: 7,
        },
      },
      audience: {
        id: audiences[1]._id,
        name: 'Work Colleagues',
      },
      stats: {
        views: 128,
        requests: 23,
        lastViewed: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
    },
    {
      userId: users[1]._id,
      name: 'Lunch Meetup',
      slug: 'lunch-meetup',
      fullUrl: `${baseUrl}/u/janesmith/lunch-meetup`,
      settings: {
        showLabels: true,
        showNegotiable: true,
        detailLevel: 'full',
        customMessage: 'Available for lunch meetups!',
        allowRequests: true,
        defaultDuration: 60,
        timeConstraints: {
          earliestTime: '11:30',
          latestTime: '14:00',
          daysInAdvance: 14,
        },
      },
      stats: {
        views: 15,
        requests: 3,
      },
    },
  ];

  const createdLinks = await Link.insertMany(links);

  // Update audience links
  await Audience.findByIdAndUpdate(audiences[0]._id, {
    $push: { links: createdLinks[0]._id },
  });
  await Audience.findByIdAndUpdate(audiences[1]._id, {
    $push: { links: createdLinks[1]._id },
  });

  console.log(`✅ Created ${createdLinks.length} links`);
  return createdLinks;
}

/**
 * Create sample requests
 */
async function createRequests(links, users) {
  console.log('\n📬 Creating requests...');

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const requests = [
    {
      linkId: links[0]._id,
      fromUser: {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        message: 'Would love to catch up over coffee!',
      },
      toUserId: users[0]._id,
      startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(10, 30, 0, 0)),
      purpose: 'Networking',
      urgency: 'normal',
      status: 'pending',
    },
    {
      linkId: links[1]._id,
      fromUser: {
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        message: 'Quick question about the project',
      },
      toUserId: users[0]._id,
      startTime: new Date(tomorrow.setHours(14, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(14, 15, 0, 0)),
      purpose: 'Project Discussion',
      urgency: 'high',
      status: 'approved',
      responseMessage: 'Sure, looking forward to it!',
    },
    {
      linkId: links[0]._id,
      fromUser: {
        name: 'Sarah Martinez',
        email: 'sarah.m@example.com',
        message: 'Can we meet next week?',
      },
      toUserId: users[0]._id,
      startTime: new Date(nextWeek.setHours(11, 0, 0, 0)),
      endTime: new Date(nextWeek.setHours(11, 30, 0, 0)),
      purpose: 'Collaboration',
      urgency: 'low',
      status: 'pending',
    },
    {
      linkId: links[2]._id,
      fromUser: {
        name: 'David Lee',
        email: 'david.lee@example.com',
        message: 'Let\'s have lunch together!',
      },
      toUserId: users[1]._id,
      startTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
      endTime: new Date(tomorrow.setHours(13, 0, 0, 0)),
      purpose: 'Social',
      urgency: 'normal',
      status: 'pending',
    },
  ];

  const createdRequests = await Request.insertMany(requests);
  console.log(`✅ Created ${createdRequests.length} requests`);
  return createdRequests;
}

/**
 * Create sample notifications
 */
async function createNotifications(users, requests) {
  console.log('\n🔔 Creating notifications...');

  const notifications = [
    {
      userId: users[0]._id,
      type: 'request',
      title: 'New Time Request',
      message: 'Alice Johnson requested time for coffee chat',
      relatedId: requests[0]._id,
      relatedType: 'request',
      read: false,
      delivered: true,
      action: {
        type: 'respond',
        data: { requestId: requests[0]._id },
      },
    },
    {
      userId: users[0]._id,
      type: 'view',
      title: 'Link Viewed',
      message: 'Your "Quick Meeting" link was viewed 5 times today',
      relatedType: 'link',
      read: false,
      delivered: true,
      action: {
        type: 'view',
        data: { path: '/dashboard/analytics' },
      },
    },
    {
      userId: users[0]._id,
      type: 'response',
      title: 'Request Approved',
      message: 'You approved a meeting with Michael Chen',
      relatedId: requests[1]._id,
      relatedType: 'request',
      read: true,
      delivered: true,
    },
    {
      userId: users[0]._id,
      type: 'system',
      title: 'Welcome to SpareTime!',
      message: 'Get started by creating your first availability link',
      read: true,
      delivered: true,
      action: {
        type: 'link',
        data: { path: '/dashboard/links/create' },
      },
    },
    {
      userId: users[1]._id,
      type: 'request',
      title: 'New Time Request',
      message: 'David Lee requested time for lunch',
      relatedId: requests[3]._id,
      relatedType: 'request',
      read: false,
      delivered: true,
      action: {
        type: 'respond',
        data: { requestId: requests[3]._id },
      },
    },
  ];

  const createdNotifications = await Notification.insertMany(notifications);
  console.log(`✅ Created ${createdNotifications.length} notifications`);
  return createdNotifications;
}

/**
 * Main seeding function
 */
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');
    console.log('═'.repeat(50));

    await connect();
    await clearDatabase();

    const users = await createUsers();
    const calendars = await createCalendars(users);
    const events = await createEvents(calendars);
    const protectedTimes = await createProtectedTimes(users);
    const audiences = await createAudiences(users, calendars);
    const links = await createLinks(users, audiences);
    const requests = await createRequests(links, users);
    const notifications = await createNotifications(users, requests);

    console.log('\n' + '═'.repeat(50));
    console.log('\n✅ Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   • ${users.length} users`);
    console.log(`   • ${calendars.length} calendars`);
    console.log(`   • ${events.length} events`);
    console.log(`   • ${protectedTimes.length} protected times`);
    console.log(`   • ${audiences.length} audiences`);
    console.log(`   • ${links.length} links`);
    console.log(`   • ${requests.length} requests`);
    console.log(`   • ${notifications.length} notifications`);
    console.log('\n🔑 Test Credentials:');
    console.log('   Email: john.doe@example.com');
    console.log('   Password: password123');
    console.log('   Username: johndoe\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB\n');
    process.exit(0);
  }
}

// Run the seeding script
seedDatabase();
