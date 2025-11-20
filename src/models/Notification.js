/**
 * Notification Model
 * Represents user notifications for requests, responses, views, and system events
 */

import mongoose from 'mongoose';

const ActionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['view', 'respond', 'settings', 'link'],
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false }
);

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['request', 'response', 'view', 'system'],
      required: [true, 'Notification type is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true,
    },
    relatedType: {
      type: String,
      enum: ['request', 'link', 'user', 'calendar', null],
      default: null,
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    action: {
      type: ActionSchema,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'notifications',
  }
);

// Compound indexes for performance
NotificationSchema.index({ userId: 1, read: 0 }); // Unread notifications for a user
NotificationSchema.index({ userId: 1, createdAt: -1 }); // All notifications for a user, sorted by newest
NotificationSchema.index({ userId: 1, type: 1 });
NotificationSchema.index({ createdAt: -1 });

// Virtual field to check if notification is recent (within last 24 hours)
NotificationSchema.virtual('isRecent').get(function () {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return this.createdAt > oneDayAgo;
});

// Method to mark as read
NotificationSchema.methods.markAsRead = async function () {
  if (!this.read) {
    this.read = true;
    await this.save();
  }
  return this;
};

// Method to mark as delivered
NotificationSchema.methods.markAsDelivered = async function () {
  if (!this.delivered) {
    this.delivered = true;
    await this.save();
  }
  return this;
};

// Static method to find unread notifications for a user
NotificationSchema.statics.findUnreadByUser = function (userId) {
  return this.find({ userId, read: false }).sort({ createdAt: -1 });
};

// Static method to find recent notifications for a user
NotificationSchema.statics.findRecentByUser = function (userId, limit = 20) {
  return this.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to find notifications by type
NotificationSchema.statics.findByUserAndType = function (userId, type) {
  return this.find({ userId, type }).sort({ createdAt: -1 });
};

// Static method to mark all as read for a user
NotificationSchema.statics.markAllAsReadForUser = async function (userId) {
  return this.updateMany({ userId, read: false }, { read: true });
};

// Static method to get unread count for a user
NotificationSchema.statics.getUnreadCount = async function (userId) {
  return this.countDocuments({ userId, read: false });
};

// Static method to create a notification
NotificationSchema.statics.createNotification = async function (notificationData) {
  const notification = new this(notificationData);
  await notification.save();
  return notification;
};

// Static method to delete old read notifications (cleanup)
NotificationSchema.statics.deleteOldReadNotifications = async function (daysOld = 30) {
  const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
  return this.deleteMany({
    read: true,
    createdAt: { $lt: cutoffDate },
  });
};

// Pre-save hook to set delivered to true by default for new notifications
NotificationSchema.pre('save', function (next) {
  if (this.isNew && this.delivered === undefined) {
    this.delivered = false;
  }
  next();
});

const Notification =
  mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export default Notification;
