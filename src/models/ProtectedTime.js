/**
 * ProtectedTime Model
 * Represents user-defined protected time blocks that appear busy to specific audiences
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

const VisibilityOverrideSchema = new mongoose.Schema(
  {
    audienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Audience',
      required: true,
    },
    visibility: {
      type: String,
      enum: ['busy', 'free', 'negotiable'],
      required: true,
    },
  },
  { _id: false }
);

const ProtectedTimeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Protected time title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
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
    recurrence: {
      type: RecurrenceSchema,
      default: null,
    },
    visibility: {
      default: {
        type: String,
        enum: ['busy', 'free', 'negotiable'],
        default: 'busy',
      },
      overrides: {
        type: [VisibilityOverrideSchema],
        default: [],
      },
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    isMovable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'protected_times',
  }
);

// Compound indexes for performance
ProtectedTimeSchema.index({ userId: 1 });
ProtectedTimeSchema.index({ userId: 1, startTime: 1, endTime: 1 });
ProtectedTimeSchema.index({ startTime: 1 });
ProtectedTimeSchema.index({ priority: 1 });

// Virtual field for duration in minutes
ProtectedTimeSchema.virtual('durationMinutes').get(function () {
  return Math.round((this.endTime - this.startTime) / (1000 * 60));
});

// Method to check if protected time is active now
ProtectedTimeSchema.methods.isActiveNow = function () {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime;
};

// Method to check if protected time is upcoming
ProtectedTimeSchema.methods.isUpcoming = function () {
  return this.startTime > new Date();
};

// Method to check if protected time is recurring
ProtectedTimeSchema.methods.isRecurring = function () {
  return this.recurrence !== null;
};

// Method to get visibility for a specific audience
ProtectedTimeSchema.methods.getVisibilityForAudience = function (audienceId) {
  const override = this.visibility.overrides.find(
    (o) => o.audienceId.toString() === audienceId.toString()
  );
  return override ? override.visibility : this.visibility.default;
};

// Method to check if time conflicts with another time range
ProtectedTimeSchema.methods.conflictsWith = function (startTime, endTime) {
  return (
    (startTime >= this.startTime && startTime < this.endTime) ||
    (endTime > this.startTime && endTime <= this.endTime) ||
    (startTime <= this.startTime && endTime >= this.endTime)
  );
};

// Static method to find protected times in a date range
ProtectedTimeSchema.statics.findInRange = function (userId, startDate, endDate) {
  return this.find({
    userId,
    $or: [
      { startTime: { $gte: startDate, $lt: endDate } },
      { endTime: { $gt: startDate, $lte: endDate } },
      { startTime: { $lt: startDate }, endTime: { $gt: endDate } },
    ],
  }).sort({ startTime: 1 });
};

// Static method to find high priority protected times for a user
ProtectedTimeSchema.statics.findHighPriority = function (userId) {
  return this.find({
    userId,
    priority: 'high',
    startTime: { $gte: new Date() },
  }).sort({ startTime: 1 });
};

const ProtectedTime =
  mongoose.models.ProtectedTime || mongoose.model('ProtectedTime', ProtectedTimeSchema);

export default ProtectedTime;
