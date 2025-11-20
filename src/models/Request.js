/**
 * Request Model
 * Represents time requests from visitors through shared links
 */

import mongoose from 'mongoose';

const FromUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Requester name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Requester email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
      default: '',
    },
  },
  { _id: false }
);

const AlternativeTimeSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (endTime) {
          return endTime > this.startTime;
        },
        message: 'End time must be after start time',
      },
    },
  },
  { _id: false }
);

const RequestSchema = new mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
      required: [true, 'Link ID is required'],
      index: true,
    },
    fromUser: {
      type: FromUserSchema,
      required: [true, 'Requester information is required'],
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Recipient user ID is required'],
      index: true,
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
    purpose: {
      type: String,
      trim: true,
      maxlength: [500, 'Purpose cannot exceed 500 characters'],
      default: '',
    },
    urgency: {
      type: String,
      enum: ['low', 'normal', 'high'],
      default: 'normal',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'alternative'],
      default: 'pending',
      index: true,
    },
    alternativeTime: {
      type: AlternativeTimeSchema,
      default: null,
    },
    responseMessage: {
      type: String,
      trim: true,
      maxlength: [1000, 'Response message cannot exceed 1000 characters'],
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'requests',
  }
);

// Compound indexes for performance
RequestSchema.index({ linkId: 1 });
RequestSchema.index({ toUserId: 1 });
RequestSchema.index({ toUserId: 1, status: 1 });
RequestSchema.index({ startTime: 1 });
RequestSchema.index({ createdAt: -1 });
RequestSchema.index({ status: 1, createdAt: -1 });

// Virtual field for duration in minutes
RequestSchema.virtual('durationMinutes').get(function () {
  return Math.round((this.endTime - this.startTime) / (1000 * 60));
});

// Virtual field to check if request is in the past
RequestSchema.virtual('isPast').get(function () {
  return this.startTime < new Date();
});

// Virtual field to check if request is upcoming
RequestSchema.virtual('isUpcoming').get(function () {
  return this.startTime >= new Date();
});

// Method to approve the request
RequestSchema.methods.approve = async function (responseMessage = '') {
  this.status = 'approved';
  this.responseMessage = responseMessage;
  await this.save();
  return this;
};

// Method to reject the request
RequestSchema.methods.reject = async function (responseMessage = '') {
  this.status = 'rejected';
  this.responseMessage = responseMessage;
  await this.save();
  return this;
};

// Method to propose alternative time
RequestSchema.methods.proposeAlternative = async function (startTime, endTime, responseMessage = '') {
  this.status = 'alternative';
  this.alternativeTime = { startTime, endTime };
  this.responseMessage = responseMessage;
  await this.save();
  return this;
};

// Method to check if request is pending
RequestSchema.methods.isPending = function () {
  return this.status === 'pending';
};

// Method to check if request needs action (pending and upcoming)
RequestSchema.methods.needsAction = function () {
  return this.status === 'pending' && this.startTime >= new Date();
};

// Static method to find pending requests for a user
RequestSchema.statics.findPendingByUser = function (userId) {
  return this.find({
    toUserId: userId,
    status: 'pending',
    startTime: { $gte: new Date() },
  }).sort({ startTime: 1 });
};

// Static method to find all requests for a specific link
RequestSchema.statics.findByLink = function (linkId) {
  return this.find({ linkId }).sort({ createdAt: -1 });
};

// Static method to find recent requests for a user
RequestSchema.statics.findRecentByUser = function (userId, limit = 10) {
  return this.find({ toUserId: userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to find requests in a date range
RequestSchema.statics.findInRange = function (userId, startDate, endDate) {
  return this.find({
    toUserId: userId,
    startTime: { $gte: startDate, $lte: endDate },
  }).sort({ startTime: 1 });
};

// Pre-save hook to increment link request count
RequestSchema.pre('save', async function (next) {
  if (this.isNew) {
    const Link = mongoose.model('Link');
    await Link.findByIdAndUpdate(this.linkId, {
      $inc: { 'stats.requests': 1 },
    });
  }
  next();
});

const Request = mongoose.models.Request || mongoose.model('Request', RequestSchema);

export default Request;
