/**
 * Calendar Model
 * Represents connected calendars (Google, Apple, or manual)
 */

import mongoose from 'mongoose';

const CalendarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    source: {
      type: String,
      enum: {
        values: ['google', 'apple', 'manual'],
        message: 'Source must be either google, apple, or manual',
      },
      required: [true, 'Calendar source is required'],
    },
    sourceId: {
      type: String,
      required: function () {
        return this.source !== 'manual';
      },
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Calendar name is required'],
      trim: true,
      maxlength: [100, 'Calendar name cannot exceed 100 characters'],
    },
    color: {
      type: String,
      default: '#3B82F6',
      match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color code'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastSynced: {
      type: Date,
      default: null,
    },
    syncToken: {
      type: String,
      default: null,
      select: false, // Don't include in queries by default
    },
    visibility: {
      default: {
        type: String,
        enum: ['busy', 'free', 'hidden'],
        default: 'busy',
      },
      overrides: [
        {
          audienceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Audience',
            required: true,
          },
          visibility: {
            type: String,
            enum: ['busy', 'free', 'hidden'],
            required: true,
          },
        },
      ],
    },
    authData: {
      accessToken: {
        type: String,
        select: false, // Never include in queries (sensitive)
      },
      refreshToken: {
        type: String,
        select: false, // Never include in queries (sensitive)
      },
      expiresAt: {
        type: Date,
        select: false,
      },
    },
  },
  {
    timestamps: true,
    collection: 'calendars',
  }
);

// Compound index for userId and sourceId uniqueness
CalendarSchema.index({ userId: 1, sourceId: 1 }, { unique: true, sparse: true });
CalendarSchema.index({ userId: 1 });
CalendarSchema.index({ isActive: 1 });

// Method to check if calendar needs reauthorization
CalendarSchema.methods.needsReauth = function () {
  if (this.source === 'manual') return false;
  if (!this.authData?.expiresAt) return true;
  return this.authData.expiresAt < new Date();
};

// Method to check if calendar is synced recently (within last hour)
CalendarSchema.methods.isSyncedRecently = function () {
  if (!this.lastSynced) return false;
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  return this.lastSynced > oneHourAgo;
};

// Method to get visibility for a specific audience
CalendarSchema.methods.getVisibilityForAudience = function (audienceId) {
  const override = this.visibility.overrides.find(
    (o) => o.audienceId.toString() === audienceId.toString()
  );
  return override ? override.visibility : this.visibility.default;
};

// Pre-save hook to validate
CalendarSchema.pre('save', function (next) {
  // If not manual, require sourceId
  if (this.source !== 'manual' && !this.sourceId) {
    next(new Error('sourceId is required for non-manual calendars'));
  }
  next();
});

const Calendar = mongoose.models.Calendar || mongoose.model('Calendar', CalendarSchema);

export default Calendar;
