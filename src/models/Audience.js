/**
 * Audience Model
 * Represents named groups for sharing different availability views
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

const RequestPermissionsSchema = new mongoose.Schema(
  {
    canRequest: {
      type: Boolean,
      default: true,
    },
    defaultDuration: {
      type: Number,
      default: 30,
      min: 15,
      max: 480,
    },
  },
  { _id: false }
);

const AudienceSettingsSchema = new mongoose.Schema(
  {
    defaultVisibility: {
      type: String,
      enum: ['busy', 'free', 'negotiable'],
      default: 'busy',
    },
    calendarVisibility: {
      type: [CalendarVisibilitySchema],
      default: [],
    },
    requestPermissions: {
      type: RequestPermissionsSchema,
      default: () => ({}),
    },
  },
  { _id: false }
);

const AudienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Audience name is required'],
      trim: true,
      maxlength: [50, 'Audience name cannot exceed 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot exceed 200 characters'],
      default: '',
    },
    links: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
      },
    ],
    settings: {
      type: AudienceSettingsSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    collection: 'audiences',
  }
);

// Indexes for performance
AudienceSchema.index({ userId: 1 });
AudienceSchema.index({ userId: 1, name: 1 });

// Virtual field for number of links
AudienceSchema.virtual('linkCount').get(function () {
  return this.links.length;
});

// Method to add a link to the audience
AudienceSchema.methods.addLink = async function (linkId) {
  if (!this.links.includes(linkId)) {
    this.links.push(linkId);
    await this.save();
  }
  return this;
};

// Method to remove a link from the audience
AudienceSchema.methods.removeLink = async function (linkId) {
  this.links = this.links.filter((id) => id.toString() !== linkId.toString());
  await this.save();
  return this;
};

// Method to check if audience has a specific link
AudienceSchema.methods.hasLink = function (linkId) {
  return this.links.some((id) => id.toString() === linkId.toString());
};

// Method to get calendar visibility for a specific calendar
AudienceSchema.methods.getCalendarVisibility = function (calendarId) {
  const setting = this.settings.calendarVisibility.find(
    (cv) => cv.calendarId.toString() === calendarId.toString()
  );
  return setting ? setting.visibility : 'busy';
};

// Method to update calendar visibility
AudienceSchema.methods.setCalendarVisibility = async function (calendarId, visibility) {
  const existingIndex = this.settings.calendarVisibility.findIndex(
    (cv) => cv.calendarId.toString() === calendarId.toString()
  );

  if (existingIndex >= 0) {
    this.settings.calendarVisibility[existingIndex].visibility = visibility;
  } else {
    this.settings.calendarVisibility.push({ calendarId, visibility });
  }

  await this.save();
  return this;
};

// Static method to find all audiences for a user
AudienceSchema.statics.findByUser = function (userId) {
  return this.find({ userId }).sort({ name: 1 });
};

// Static method to find audiences with links populated
AudienceSchema.statics.findByUserWithLinks = function (userId) {
  return this.find({ userId })
    .populate('links')
    .sort({ name: 1 });
};

// Static method to find audience by name for a user
AudienceSchema.statics.findByUserAndName = function (userId, name) {
  return this.findOne({ userId, name });
};

const Audience = mongoose.models.Audience || mongoose.model('Audience', AudienceSchema);

export default Audience;
