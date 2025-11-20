/**
 * Link Model
 * Represents shareable availability links with custom settings and audiences
 */

import mongoose from 'mongoose';

const CalendarVisibilitySchema = new mongoose.Schema(
  {
    calendarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Calendar',
      required: true,
    },
    visibility: {
      type: String,
      enum: ['busy', 'free', 'hidden'],
      required: true,
    },
  },
  { _id: false }
);

const TimeConstraintsSchema = new mongoose.Schema(
  {
    earliestTime: {
      type: String,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
      default: '09:00',
    },
    latestTime: {
      type: String,
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
      default: '17:00',
    },
    daysInAdvance: {
      type: Number,
      default: 30,
      min: 1,
      max: 365,
    },
  },
  { _id: false }
);

const LinkSettingsSchema = new mongoose.Schema(
  {
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
    calendarVisibility: {
      type: [CalendarVisibilitySchema],
      default: [],
    },
    customMessage: {
      type: String,
      trim: true,
      maxlength: [500, 'Custom message cannot exceed 500 characters'],
      default: '',
    },
    allowRequests: {
      type: Boolean,
      default: true,
    },
    defaultDuration: {
      type: Number,
      default: 30,
      min: 15,
      max: 480,
    },
    timeConstraints: {
      type: TimeConstraintsSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const AudienceInfoSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audience',
      default: null,
    },
    name: {
      type: String,
      default: 'General',
    },
  },
  { _id: false }
);

const LinkStatsSchema = new mongoose.Schema(
  {
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    requests: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastViewed: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

const LinkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Link name is required'],
      trim: true,
      maxlength: [100, 'Link name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9_-]+$/, 'Slug can only contain lowercase letters, numbers, hyphens, and underscores'],
      index: true,
    },
    fullUrl: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: null,
      index: true,
    },
    settings: {
      type: LinkSettingsSchema,
      default: () => ({}),
    },
    audience: {
      type: AudienceInfoSchema,
      default: () => ({}),
    },
    stats: {
      type: LinkStatsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    collection: 'links',
  }
);

// Indexes for performance
LinkSchema.index({ userId: 1 });
LinkSchema.index({ slug: 1 }, { unique: true });
LinkSchema.index({ expiresAt: 1 });
LinkSchema.index({ 'stats.views': -1 });
LinkSchema.index({ 'stats.requests': -1 });

// Virtual field to check if link is expired
LinkSchema.virtual('isExpired').get(function () {
  if (!this.expiresAt) return false;
  return this.expiresAt < new Date();
});

// Virtual field to check if link is active
LinkSchema.virtual('isActive').get(function () {
  return !this.isExpired;
});

// Method to increment view count
LinkSchema.methods.incrementViews = async function () {
  this.stats.views += 1;
  this.stats.lastViewed = new Date();
  await this.save();
};

// Method to increment request count
LinkSchema.methods.incrementRequests = async function () {
  this.stats.requests += 1;
  await this.save();
};

// Method to check if link allows requests
LinkSchema.methods.canReceiveRequests = function () {
  return this.settings.allowRequests && !this.isExpired;
};

// Method to get calendar visibility setting for a specific calendar
LinkSchema.methods.getCalendarVisibility = function (calendarId) {
  const setting = this.settings.calendarVisibility.find(
    (cv) => cv.calendarId.toString() === calendarId.toString()
  );
  return setting ? setting.visibility : 'busy';
};

// Static method to find active links for a user
LinkSchema.statics.findActiveByUser = function (userId) {
  const now = new Date();
  return this.find({
    userId,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }],
  }).sort({ createdAt: -1 });
};

// Static method to find expired links
LinkSchema.statics.findExpired = function () {
  return this.find({
    expiresAt: { $lte: new Date() },
  });
};

// Pre-save hook to generate fullUrl
LinkSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('slug')) {
    // Get the user to build the full URL
    const User = mongoose.model('User');
    const user = await User.findById(this.userId);
    if (user) {
      this.fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/u/${user.username}/${this.slug}`;
    }
  }
  next();
});

const Link = mongoose.models.Link || mongoose.model('Link', LinkSchema);

export default Link;
