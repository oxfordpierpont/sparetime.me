/**
 * Event Model
 * Represents calendar events from synced calendars or manual entry
 */

import mongoose from 'mongoose';

const RecurrenceSchema = new mongoose.Schema(
  {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly', 'custom'],
      required: true,
    },
    interval: {
      type: Number,
      default: 1,
      min: 1,
    },
    byDay: {
      type: [Number],
      default: [],
      validate: {
        validator: function (days) {
          return days.every((day) => day >= 0 && day <= 6);
        },
        message: 'Days must be between 0 (Sunday) and 6 (Saturday)',
      },
    },
    endDate: {
      type: Date,
      default: null,
    },
    count: {
      type: Number,
      default: null,
      min: 1,
    },
  },
  { _id: false }
);

const EventSchema = new mongoose.Schema(
  {
    calendarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Calendar',
      required: [true, 'Calendar ID is required'],
      index: true,
    },
    sourceId: {
      type: String,
      trim: true,
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Event title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Event description cannot exceed 2000 characters'],
      default: '',
    },
    location: {
      type: String,
      trim: true,
      maxlength: [500, 'Location cannot exceed 500 characters'],
      default: '',
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
      index: true,
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
      validate: {
        validator: function (endTime) {
          return endTime > this.startTime;
        },
        message: 'End time must be after start time',
      },
    },
    isAllDay: {
      type: Boolean,
      default: false,
    },
    recurrence: {
      type: RecurrenceSchema,
      default: null,
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
    },
    status: {
      type: String,
      enum: ['confirmed', 'tentative', 'cancelled'],
      default: 'confirmed',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'events',
  }
);

// Compound indexes for performance
EventSchema.index({ calendarId: 1, sourceId: 1 }, { unique: true, sparse: true });
EventSchema.index({ calendarId: 1 });
EventSchema.index({ startTime: 1, endTime: 1 });
EventSchema.index({ startTime: -1 }); // For sorting by most recent
EventSchema.index({ status: 1 });

// Virtual field for duration in minutes
EventSchema.virtual('durationMinutes').get(function () {
  return Math.round((this.endTime - this.startTime) / (1000 * 60));
});

// Method to check if event is happening now
EventSchema.methods.isHappeningNow = function () {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime;
};

// Method to check if event is in the future
EventSchema.methods.isUpcoming = function () {
  return this.startTime > new Date();
};

// Method to check if event is recurring
EventSchema.methods.isRecurring = function () {
  return this.recurrence !== null;
};

// Method to check if event conflicts with another time range
EventSchema.methods.conflictsWith = function (startTime, endTime) {
  return (
    (startTime >= this.startTime && startTime < this.endTime) ||
    (endTime > this.startTime && endTime <= this.endTime) ||
    (startTime <= this.startTime && endTime >= this.endTime)
  );
};

// Static method to find events in a date range
EventSchema.statics.findInRange = function (calendarId, startDate, endDate) {
  return this.find({
    calendarId,
    status: { $ne: 'cancelled' },
    $or: [
      { startTime: { $gte: startDate, $lt: endDate } },
      { endTime: { $gt: startDate, $lte: endDate } },
      { startTime: { $lt: startDate }, endTime: { $gt: endDate } },
    ],
  }).sort({ startTime: 1 });
};

// Pre-save hook to update lastUpdated
EventSchema.pre('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;
