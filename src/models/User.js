/**
 * User Model
 * Represents a registered user with preferences, subscription info, and settings
 */

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [/^[a-z0-9_-]+$/, 'Username can only contain lowercase letters, numbers, hyphens, and underscores'],
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Don't include password in queries by default
    },
    displayName: {
      type: String,
      required: [true, 'Display name is required'],
      trim: true,
      maxlength: [50, 'Display name cannot exceed 50 characters'],
    },
    avatar: {
      type: String,
      default: null,
      match: [/^(https?:\/\/)/, 'Avatar must be a valid URL'],
    },
    timezone: {
      type: String,
      required: [true, 'Timezone is required'],
      default: 'America/New_York',
    },
    preferences: {
      defaultProtectedTimes: [
        {
          dayOfWeek: {
            type: Number,
            min: 0,
            max: 6,
            required: true,
          },
          startTime: {
            type: String,
            required: true,
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
          },
          endTime: {
            type: String,
            required: true,
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
          },
        },
      ],
      defaultLinkSettings: {
        showLabels: {
          type: Boolean,
          default: true,
        },
        showNegotiable: {
          type: Boolean,
          default: true,
        },
        detailLevel: {
          type: String,
          enum: ['none', 'minimal', 'full'],
          default: 'minimal',
        },
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: false,
        },
        requestTypes: {
          type: [String],
          default: ['request', 'response', 'view'],
        },
      },
      workHours: {
        start: {
          type: String,
          default: '09:00',
          match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
        },
        end: {
          type: String,
          default: '17:00',
          match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
        },
        workDays: {
          type: [Number],
          default: [1, 2, 3, 4, 5], // Monday to Friday
          validate: {
            validator: function (days) {
              return days.every((day) => day >= 0 && day <= 6);
            },
            message: 'Work days must be between 0 (Sunday) and 6 (Saturday)',
          },
        },
      },
    },
    subscription: {
      level: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free',
      },
      expiresAt: {
        type: Date,
        default: null,
      },
      features: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: 'users',
  }
);

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ createdAt: -1 });

// Virtual field for full URL
UserSchema.virtual('profileUrl').get(function () {
  return `/u/${this.username}`;
});

// Method to check if user is premium
UserSchema.methods.isPremium = function () {
  if (this.subscription.level === 'free') return false;
  if (!this.subscription.expiresAt) return true;
  return this.subscription.expiresAt > new Date();
};

// Method to get safe user object (without sensitive data)
UserSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

// Prevent model overwrite in development (Next.js hot reload)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
