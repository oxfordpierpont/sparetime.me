/**
 * Database Connection & Schema Test Script
 * Validates database connection and all model schemas
 *
 * Usage: node scripts/test-database.js
 */

import mongoose from 'mongoose';
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
 * Test database connection
 */
async function testConnection() {
  console.log('\n🔌 Testing database connection...');

  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log(`   Connecting to: ${mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')}`);

    await mongoose.connect(mongoUri);

    const db = mongoose.connection.db;
    const admin = db.admin();
    const serverStatus = await admin.serverStatus();

    console.log('   ✅ Connection successful!');
    console.log(`   📊 MongoDB version: ${serverStatus.version}`);
    console.log(`   🗄️  Database: ${db.databaseName}`);
    console.log(`   🔗 Host: ${serverStatus.host}`);

    return true;
  } catch (error) {
    console.error('   ❌ Connection failed:', error.message);
    return false;
  }
}

/**
 * Test model schemas
 */
async function testSchemas() {
  console.log('\n📋 Testing model schemas...');

  const models = [
    { name: 'User', model: User },
    { name: 'Calendar', model: Calendar },
    { name: 'Event', model: Event },
    { name: 'ProtectedTime', model: ProtectedTime },
    { name: 'Link', model: Link },
    { name: 'Request', model: Request },
    { name: 'Audience', model: Audience },
    { name: 'Notification', model: Notification },
  ];

  let passedCount = 0;
  let failedCount = 0;

  for (const { name, model } of models) {
    try {
      // Validate model exists
      if (!model) {
        throw new Error('Model is undefined');
      }

      // Check schema paths
      const schema = model.schema;
      const paths = Object.keys(schema.paths);

      // Check indexes
      const indexes = schema.indexes();

      console.log(`   ✅ ${name.padEnd(20)} - ${paths.length} fields, ${indexes.length} indexes`);
      passedCount++;
    } catch (error) {
      console.log(`   ❌ ${name.padEnd(20)} - ${error.message}`);
      failedCount++;
    }
  }

  console.log(`\n   Summary: ${passedCount} passed, ${failedCount} failed`);
  return failedCount === 0;
}

/**
 * Test model validation
 */
async function testValidation() {
  console.log('\n✅ Testing model validation...');

  const tests = [
    {
      name: 'User - Invalid email',
      test: async () => {
        const user = new User({
          email: 'invalid-email',
          username: 'testuser',
          passwordHash: 'hash123',
          displayName: 'Test User',
        });
        await user.validate();
      },
      shouldFail: true,
    },
    {
      name: 'User - Valid data',
      test: async () => {
        const user = new User({
          email: 'test@example.com',
          username: 'testuser',
          passwordHash: 'hash123',
          displayName: 'Test User',
        });
        await user.validate();
      },
      shouldFail: false,
    },
    {
      name: 'Event - End before start',
      test: async () => {
        const event = new Event({
          calendarId: new mongoose.Types.ObjectId(),
          title: 'Test Event',
          startTime: new Date('2025-01-01T14:00:00'),
          endTime: new Date('2025-01-01T12:00:00'), // Before start
        });
        await event.validate();
      },
      shouldFail: true,
    },
    {
      name: 'Link - Invalid slug',
      test: async () => {
        const link = new Link({
          userId: new mongoose.Types.ObjectId(),
          name: 'Test Link',
          slug: 'Invalid Slug!', // Spaces and special chars not allowed
        });
        await link.validate();
      },
      shouldFail: true,
    },
  ];

  let passedCount = 0;
  let failedCount = 0;

  for (const { name, test, shouldFail } of tests) {
    try {
      await test();
      if (shouldFail) {
        console.log(`   ❌ ${name} - Should have failed validation`);
        failedCount++;
      } else {
        console.log(`   ✅ ${name}`);
        passedCount++;
      }
    } catch (error) {
      if (shouldFail) {
        console.log(`   ✅ ${name} - Correctly rejected`);
        passedCount++;
      } else {
        console.log(`   ❌ ${name} - ${error.message}`);
        failedCount++;
      }
    }
  }

  console.log(`\n   Summary: ${passedCount} passed, ${failedCount} failed`);
  return failedCount === 0;
}

/**
 * Test database collections
 */
async function testCollections() {
  console.log('\n📦 Testing database collections...');

  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log(`   Found ${collections.length} collections:`);
    collections.forEach((col) => {
      console.log(`   • ${col.name}`);
    });

    return true;
  } catch (error) {
    console.error('   ❌ Error listing collections:', error.message);
    return false;
  }
}

/**
 * Test CRUD operations
 */
async function testCRUD() {
  console.log('\n🔧 Testing basic CRUD operations...');

  try {
    // Create a test user
    console.log('   Creating test user...');
    const testUser = await User.create({
      email: 'crud-test@example.com',
      username: 'crudtest',
      passwordHash: 'test123',
      displayName: 'CRUD Test User',
    });
    console.log(`   ✅ Created user: ${testUser.username}`);

    // Read the user
    console.log('   Reading user...');
    const foundUser = await User.findById(testUser._id);
    if (!foundUser) throw new Error('User not found');
    console.log(`   ✅ Found user: ${foundUser.username}`);

    // Update the user
    console.log('   Updating user...');
    foundUser.displayName = 'Updated Name';
    await foundUser.save();
    console.log(`   ✅ Updated user display name`);

    // Delete the user
    console.log('   Deleting user...');
    await User.findByIdAndDelete(testUser._id);
    const deletedUser = await User.findById(testUser._id);
    if (deletedUser) throw new Error('User still exists after deletion');
    console.log(`   ✅ Deleted user`);

    return true;
  } catch (error) {
    console.error('   ❌ CRUD test failed:', error.message);
    return false;
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('═'.repeat(60));
  console.log('🧪 SpareTime Database Test Suite');
  console.log('═'.repeat(60));

  const results = {
    connection: false,
    schemas: false,
    validation: false,
    collections: false,
    crud: false,
  };

  try {
    // Test connection
    results.connection = await testConnection();
    if (!results.connection) {
      throw new Error('Database connection failed. Please check your MONGODB_URI in .env.local');
    }

    // Test schemas
    results.schemas = await testSchemas();

    // Test validation
    results.validation = await testValidation();

    // Test collections
    results.collections = await testCollections();

    // Test CRUD
    results.crud = await testCRUD();

    // Summary
    console.log('\n' + '═'.repeat(60));
    console.log('📊 Test Results Summary');
    console.log('═'.repeat(60));
    console.log(`   Connection:     ${results.connection ? '✅' : '❌'}`);
    console.log(`   Schemas:        ${results.schemas ? '✅' : '❌'}`);
    console.log(`   Validation:     ${results.validation ? '✅' : '❌'}`);
    console.log(`   Collections:    ${results.collections ? '✅' : '❌'}`);
    console.log(`   CRUD:           ${results.crud ? '✅' : '❌'}`);

    const allPassed = Object.values(results).every((r) => r === true);

    console.log('\n' + '═'.repeat(60));
    if (allPassed) {
      console.log('✅ All tests passed! Database is ready to use.');
    } else {
      console.log('❌ Some tests failed. Please check the errors above.');
    }
    console.log('═'.repeat(60) + '\n');

    return allPassed;
  } catch (error) {
    console.error('\n❌ Test suite error:', error.message);
    console.log('\n💡 Tips:');
    console.log('   1. Copy .env.example to .env.local');
    console.log('   2. Set MONGODB_URI in .env.local');
    console.log('   3. Make sure MongoDB is running');
    console.log('   4. For local: mongodb://localhost:27017/sparetime');
    console.log('   5. For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/sparetime\n');
    return false;
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB\n');
  }
}

// Run tests
runTests().then((success) => {
  process.exit(success ? 0 : 1);
});
