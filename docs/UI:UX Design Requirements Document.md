![][image1]

# **UI/UX Design Requirements Document**

**Version:** 1.0  
**Date:** October 24, 2025  
**Created for:** Frontend Development Team  
**Website:** https://sparetimecalendar.com  
**Shortened Domain:** https://sparetime.me  
**Author:** The Oxford Pierpont Corporation  
---

## **Table of Contents**

1. [Introduction](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#1-introduction)  
2. [Design System](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#2-design-system)  
3. [Screen Flow & Navigation](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#3-screen-flow--navigation)  
4. [Screen Specifications](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#4-screen-specifications)  
5. [Component Library](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#5-component-library)  
6. [Interaction Patterns](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#6-interaction-patterns)  
7. [Accessibility Requirements](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#7-accessibility-requirements)  
8. [Responsive Design Guidelines](https://claude.ai/chat/11241a9c-78c8-45ec-bc46-de04b79b61f4#8-responsive-design-guidelines)

---

## **1\. Introduction**

SpareTime is a social availability layer application that transforms how people share and communicate their availability. Unlike traditional calendar sharing or scheduling tools, SpareTime allows users to create customized views of their availability for different audiences, protecting their boundaries while maintaining social connections.

### **1.1 Design Philosophy**

The SpareTime app follows these core design principles:

* **Calm & Clear**: Clean, minimal interface with generous white space and clear visual hierarchy  
* **Human & Personal**: Warm, conversational copy with friendly illustrations and accessible design  
* **Efficient & Focused**: Minimal clicks for common tasks, progressive disclosure for complex features

### **1.2 User Goals**

* Protect personal time boundaries while appearing responsive to others  
* Reduce time spent on availability coordination  
* Manage different availability views for different audiences  
* Simplify the "when are you free?" conversation

---

# **SpareTime Calendar App \- Required Screens**

## **Onboarding & Authentication**

1. Welcome Screen  
2. Sign Up Screen  
3. Login Screen  
4. Calendar Connection Screen  
5. Time Preferences Setup Screen

## **Main Application**

6. Dashboard (Home) Screen  
7. Link Management Screen  
8. Link Creation/Edit Screen  
9. Calendar View Screen  
10. Protected Time Creation Screen  
11. Request Management Screen  
12. Time Request Form Screen  
13. Settings Screen

## **Public Facing**

14. Availability View Screen (for link recipients)  
15. Time Request Interface (for link recipients)

This covers all the essential screens needed to implement the core functionality of the SpareTime Calendar app.

## **2\. Design System**

### **2.1 Color Palette**

#### **Primary Colors**

* Primary Dark Blue-Gray: `#36454c` (headings, primary text)  
* Primary Blue: `#6e92a0` (subheadings, buttons, key actions)  
* Light Blue: `#c5e0ea` (subtle backgrounds, highlights)

#### **Secondary Colors**

* Gray Text: `#8a9499` (secondary text)  
* Light Gray: `#bdccd4` (dividers, borders)  
* Background Gray: `#f2f7f9` (backgrounds, cards)

#### **Status Colors**

* Available: `#22b573` (green)  
* Available Light: `#b3e2cc` (light green backgrounds)  
* Negotiable: `#ffd56b` (yellow)  
* Negotiable Light: `#ffefcc` (light yellow backgrounds)  
* Busy: `#ed5a5a` (red)  
* Busy Light: `#fff3f3` (light red backgrounds)

### **2.2 Typography**

#### **Font Families**

* Primary: Alright Sans  
* Fallback: Poppins  
* System Fallback: \-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif

#### **Type Scale**

* H1: 32px, 700 weight (Alright Sans Black or Poppins Extra Bold)  
* H2: 24px, 700 weight (Alright Sans Black or Poppins Extra Bold)  
* H3: 20px, 600 weight (Alright Sans Medium or Poppins SemiBold)  
* Body: 16px, 400 weight (Alright Sans Light or Poppins Light)  
* Small: 14px, 400 weight (Alright Sans Light or Poppins Light)  
* Button: 16px, 600 weight, uppercase (Alright Sans Medium or Poppins SemiBold)

### **2.3 Spacing System**

All spacing in the application follows an 8px grid system:

* Extra Small: 4px  
* Small: 8px  
* Medium: 16px  
* Large: 24px  
* Extra Large: 32px  
* 2X Large: 48px  
* 3X Large: 64px

### **2.4 Shadows and Elevation**

* Level 1 (Subtle): `0px 1px 2px rgba(0, 0, 0, 0.05)`  
* Level 2 (Cards): `0px 2px 4px rgba(0, 0, 0, 0.1)`  
* Level 3 (Elevated Cards): `0px 4px 8px rgba(0, 0, 0, 0.1)`  
* Level 4 (Modals): `0px 8px 16px rgba(0, 0, 0, 0.1)`

### **2.5 Border Radius**

* Small: 4px  
* Medium: 8px  
* Large: 12px  
* Pill: 24px  
* Circle: 50%

---

## **3\. Screen Flow & Navigation**

### **3.1 User Journey Map**

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Onboarding     │────▶│  Authentication │────▶│  Calendar       │
│                 │     │                 │     │  Connection     │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Link           │◀───┤      Main       │◀────│  Protected Time │
│  Management     │     │    Dashboard    │     │  Setup         │
│                 │     │                 │     │                 │
└────────┬────────┘     └────────┬────────┘     └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Share & View   │     │   Calendar      │     │   Request       │
│  Availability   │     │   Management    │     │   Management    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### **3.2 Navigation Structure**

```
├── Onboarding Flow
│   ├── Welcome
│   ├── Sign Up / Login
│   ├── Calendar Connection
│   └── Initial Preferences
│
├── Authentication
│   ├── Login
│   ├── Sign Up
│   ├── Forgot Password
│   └── Email Verification
│
├── Main App (Tab Navigation)
│   ├── Dashboard (Home)
│   ├── Links
│   ├── Calendar
│   ├── Requests
│   └── Profile
│
├── Link Management
│   ├── Create Link
│   ├── Edit Link
│   └── Link Analytics
│
├── Calendar Management
│   ├── View Calendar
│   ├── Add Event
│   ├── Add Protected Time
│   └── Calendar Settings
│
├── Request Management
│   ├── View Requests
│   ├── Request Details
│   └── Respond to Request
│
└── Settings
    ├── Profile Settings
    ├── Notification Settings
    ├── Calendar Settings
    ├── Subscription
    └── Help & Support
```

---

## **4\. Screen Specifications**

### **4.1 Onboarding Flow**

#### **4.1.1 Welcome Screen**

**Purpose**: Introduce the app and its key benefits to new users

**Wireframe**:

```
┌─────────────────────────────┐
│          Welcome to         │
│          SpareTime          │
│                             │
│   Your availability, your   │
│            way.             │
│                             │
│    [Feature Carousel]       │
│                             │
│    ┌─────────────────┐      │
│    │    Sign Up      │      │
│    └─────────────────┘      │
│                             │
│    Already have an account? │
│          Log In             │
└─────────────────────────────┘
```

**Components**:

* `welcomeTitle` (Text): "Welcome to SpareTime"  
* `welcomeSubtitle` (Text): "Your availability, your way."  
* `featureCarousel` (Carousel): Key feature showcase with 3-5 slides  
* `signUpButton` (Button): Primary CTA button to sign up  
* `loginLink` (TextButton): Secondary CTA to log in

#### **4.1.2 Sign Up Screen**

**Purpose**: Allow new users to create an account

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Back          Create      │
│                 Account     │
├─────────────────────────────┤
│                             │
│ Let's get started           │
│                             │
│ ┌─────────────────────────┐ │
│ │ Full Name               │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Email Address           │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Password                │ │
│ └─────────────────────────┘ │
│                             │
│ Password must be at least 8 │
│ characters with 1 uppercase │
│ letter and 1 number         │
│                             │
│ ┌─────────────────────────┐ │
│ │     Create Account      │ │
│ └─────────────────────────┘ │
│                             │
│  ┌───────┐     ┌───────┐    │
│  │Google │     │ Apple │    │
│  └───────┘     └───────┘    │
│                             │
│ Already have an account?    │
│ Log In                      │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to previous screen  
* `headerTitle` (Text): "Create Account"  
* `pageTitle` (Text): "Let's get started"  
* `nameField` (TextField): Full name input with validation  
* `emailField` (TextField): Email input with validation  
* `passwordField` (TextField): Password input with visibility toggle  
* `passwordHelper` (Text): Password requirements  
* `createAccountButton` (Button): Submit form  
* `googleSignUpButton` (Button): Google OAuth sign up  
* `appleSignUpButton` (Button): Apple OAuth sign up  
* `termsCheckbox` (Checkbox): Terms agreement  
* `loginLink` (TextButton): Navigate to login

#### **4.1.3 Calendar Connection Screen**

**Purpose**: Connect user's existing calendars

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Back          Next →      │
├─────────────────────────────┤
│                             │
│ Connect your calendars      │
│                             │
│ Choose calendars to import: │
│                             │
│ ┌─────────────────────────┐ │
│ │ ✓ Connect Google        │ │
│ │   Calendar              │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │   Connect Apple         │ │
│ │   Calendar              │ │
│ └─────────────────────────┘ │
│                             │
│ Connected Calendars:        │
│                             │
│ ○ Work Calendar             │
│ ○ Personal Calendar         │
│ ○ Family Calendar           │
│                             │
│ ┌─────────────────────────┐ │
│ │         Continue        │ │
│ └─────────────────────────┘ │
│                             │
│ Skip for now               │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to previous screen  
* `nextButton` (TextButton): Proceed to next step  
* `screenTitle` (Text): "Connect your calendars"  
* `calendarSelectionText` (Text): "Choose calendars to import:"  
* `googleCalendarButton` (Button): Connect Google Calendar  
* `appleCalendarButton` (Button): Connect Apple Calendar  
* `connectedCalendarsList` (CheckboxList): List of connected calendars  
* `continueButton` (Button): Proceed to next step  
* `skipLink` (TextButton): Skip calendar connection

#### **4.1.4 Time Preferences Screen**

**Purpose**: Set up initial time preferences

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Back          Finish      │
├─────────────────────────────┤
│                             │
│ Set your preferences        │
│                             │
│ Your timezone:              │
│ ┌─────────────────────────┐ │
│ │ US Eastern (GMT-4)    ▼ │ │
│ └─────────────────────────┘ │
│                             │
│ Default work hours:         │
│ ┌─────────────┐┌───────────┐│
│ │ 9:00 AM   ▼ ││ 5:00 PM ▼ ││
│ └─────────────┘└───────────┘│
│                             │
│ Work days:                  │
│ M  T  W  Th  F  Sa  Su      │
│ ⦿  ⦿  ⦿  ⦿  ⦿  ○  ○       │
│                             │
│ Protected time blocks:      │
│ ┌─────────────────────────┐ │
│ │ + Add protected time    │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │       Let's Start       │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to previous screen  
* `finishButton` (TextButton): Complete setup  
* `screenTitle` (Text): "Set your preferences"  
* `timezoneLabel` (Text): "Your timezone:"  
* `timezoneSelector` (Dropdown): User's time zone  
* `workHoursLabel` (Text): "Default work hours:"  
* `workHoursStartPicker` (TimePicker): Work hours start time  
* `workHoursEndPicker` (TimePicker): Work hours end time  
* `workDaysLabel` (Text): "Work days:"  
* `workDaysSelector` (ToggleButtonGroup): Days of week selector  
* `protectedTimeLabel` (Text): "Protected time blocks:"  
* `addProtectedTimeButton` (Button): Add protected time block  
* `startButton` (Button): Complete setup and enter app

### **4.2 Main App**

#### **4.2.1 Dashboard Screen**

**Purpose**: Main home screen showing overview of links, requests, and calendar

**Wireframe**:

```
┌─────────────────────────────┐
│ SpareTime     👤 🔔 ⚙️       │
├─────────────────────────────┤
│                             │
│ Welcome, [Name]             │
│                             │
│ Active Links (3)            │
│ ┌─────────────────────────┐ │
│ │ Friends Link            │ │
│ │ 12 views · 2 requests   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Work Link               │ │
│ │ 5 views · 1 request     │ │
│ └─────────────────────────┘ │
│                             │
│ Pending Requests (2)        │
│ ┌─────────────────────────┐ │
│ │ Coffee with Sam         │ │
│ │ Tomorrow at 3:30pm      │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │      Create New Link    │ │
│ └─────────────────────────┘ │
│                             │
├─────────────────────────────┤
│ 🔗 Links  📅 Calendar       │
│ 🔔 Requests  👤 Profile     │
└─────────────────────────────┘
```

**Components**:

* `appLogo` (Image): SpareTime logo  
* `profileButton` (IconButton): User profile access  
* `notificationsButton` (IconButton): Notification bell  
* `settingsButton` (IconButton): Settings access  
* `welcomeMessage` (Text): Personalized greeting  
* `activeLinksHeader` (Text): "Active Links (3)"  
* `activeLinksSection` (List): Active links with stats  
  * `linkCard` (Card): Individual link card  
    * `linkName` (Text): Link name  
    * `linkStats` (Text): Views and requests  
* `pendingRequestsHeader` (Text): "Pending Requests (2)"  
* `pendingRequestsList` (List): Pending requests preview  
  * `requestCard` (Card): Individual request card  
    * `requestTitle` (Text): Request title/purpose  
    * `requestTime` (Text): Requested time  
* `createLinkButton` (Button): Create new link CTA  
* `bottomNavigation` (TabBar): Main navigation tabs  
  * `linksTab` (Tab): Links tab  
  * `calendarTab` (Tab): Calendar tab  
  * `requestsTab` (Tab): Requests tab  
  * `profileTab` (Tab): Profile tab

#### **4.2.2 Link Creation/Edit Screen**

**Purpose**: Create or edit availability links

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Create Link      Save     │
├─────────────────────────────┤
│                             │
│ Link Details                │
│ ┌─────────────────────────┐ │
│ │ Link Name               │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ For (optional)          │ │
│ └─────────────────────────┘ │
│                             │
│ Expires: Never ▼            │
│                             │
│ sparetime.me/you/link-id    │
│ [Copy]                      │
│                             │
│ Visibility                  │
│ Show event labels    ⚪ ⚫   │
│ Show negotiable      ⚪ ⚫   │
│                             │
│ Detail level: Minimal   ▼   │
│                             │
│ Calendars                   │
│ Work         Busy      ▼    │
│ Personal     Hidden    ▼    │
│                             │
│ Custom Message              │
│ ┌─────────────────────────┐ │
│ │ Hi! Here's my...        │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │         Preview         │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │          Share          │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to previous screen  
* `pageTitle` (Text): "Create Link" or "Edit Link"  
* `saveButton` (TextButton): Save changes  
* `linkDetailsHeader` (Text): "Link Details"  
* `linkNameField` (TextField): Link name input  
* `linkRecipientField` (TextField): Optional recipient/group  
* `expirationLabel` (Text): "Expires:"  
* `expirationPicker` (Dropdown): Expiration date picker  
* `linkUrlDisplay` (Text): Generated URL display  
* `copyLinkButton` (IconButton): Copy to clipboard  
* `visibilityHeader` (Text): "Visibility"  
* `showLabelsToggle` (Switch): Show event labels toggle  
* `showNegotiableToggle` (Switch): Show negotiable status toggle  
* `detailLevelLabel` (Text): "Detail level:"  
* `detailLevelSelector` (Dropdown): Amount of detail to show  
* `calendarsHeader` (Text): "Calendars"  
* `calendarVisibilityList` (List): Per-calendar settings  
  * `calendarItem` (ListItem): Individual calendar item  
    * `calendarName` (Text): Calendar name  
    * `visibilitySelector` (Dropdown): Visibility selector  
* `customMessageLabel` (Text): "Custom Message"  
* `customMessageField` (TextField): Optional message for viewers  
* `previewButton` (Button): Preview link view  
* `shareButton` (Button): Share link

#### **4.2.3 Calendar View Screen**

**Purpose**: View and manage calendar events and protected time

**Wireframe**:

```
┌─────────────────────────────┐
│ ← My Calendar    Today      │
├─────────────────────────────┤
│ Day | Week | Month          │
├─────────────────────────────┤
│ < October 2025 >            │
├─────────────────────────────┤
│   │                         │
│ 8 │ ┌───────────────┐       │
│   │ │ Team Meeting  │       │
│ 9 │ └───────────────┘       │
│   │                         │
│10 │                         │
│   │                         │
│11 │ ┌───────────────────┐   │
│   │ │ Protected Time    │   │
│12 │ │                   │   │
│   │ │                   │   │
│ 1 │ └───────────────────┘   │
│   │                         │
│ 2 │ ┌───────────────┐       │
│   │ │ Client Call   │       │
│ 3 │ └───────────────┘       │
│   │                         │
│ 4 │ ┌───────────────────┐   │
│   │ │ Artificial Busy   │   │
│ 5 │ └───────────────────┘   │
│   │                         │
├─────────────────────────────┤
│ + Event  + Protected  + Busy│
├─────────────────────────────┤
│ Calendars:                  │
│ ● Work   ● Personal         │
│ ● Protected  ● Artificial   │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to dashboard  
* `pageTitle` (Text): "My Calendar"  
* `todayButton` (Button): Jump to today  
* `viewSelector` (SegmentedControl): Day/Week/Month toggle  
* `dateNavigator` (DateNavigator): Date navigation controls  
  * `prevButton` (IconButton): Previous period  
  * `dateDisplay` (Text): Current date/range  
  * `nextButton` (IconButton): Next period  
* `calendarGrid` (CalendarGrid): Calendar display  
  * `timeLabels` (Text): Hour markers  
  * `eventBlocks` (EventBlock): Calendar events  
  * `protectedBlocks` (EventBlock): Protected time blocks  
  * `artificialBusyBlocks` (EventBlock): Artificial busy time  
* `addButtonsRow` (ButtonGroup): Action buttons  
  * `addEventButton` (Button): Add calendar event  
  * `addProtectedTimeButton` (Button): Add protected time  
  * `addArtificialBusyButton` (Button): Add artificial busy  
* `calendarSourceList` (CheckboxList): Calendar filter list  
  * `sourceItem` (CheckboxItem): Individual calendar source  
    * `sourceToggle` (Checkbox): Show/hide toggle  
    * `sourceColorIndicator` (ColorDot): Calendar color  
    * `sourceName` (Text): Calendar name

#### **4.2.4 Availability View (Link Recipient) Screen**

**Purpose**: Show a user's availability to link recipients

**Wireframe**:

```
┌─────────────────────────────┐
│ Maya's Availability         │
│                             │
│ October is mostly packed!   │
├─────────────────────────────┤
│ < Oct 24, 2025 >            │
├─────────────────────────────┤
│ Morning                     │
│ ┌─────────────────────────┐ │
│ │ 9:00 - 10:30  Busy      │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ 11:00 - 12:00 Negotiable│ │
│ └─────────────────────────┘ │
│                             │
│ Afternoon                   │
│                             │
│ ┌─────────────────────────┐ │
│ │ 2:00 - 3:30  Busy       │ │
│ └─────────────────────────┘ │
│                             │
│ Evening                     │
│                             │
│ Request a time:             │
│ ┌─────────┐┌──────────────┐ │
│ │ Oct 24  ││e.g., 4pm     │ │
│ └─────────┘└──────────────┘ │
│ ┌─────────────────────────┐ │
│ │        Find Times       │ │
│ └─────────────────────────┘ │
│                             │
│ Available times:            │
│ ┌─────────────────────────┐ │
│ │ 4:00 PM • 30m           │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 5:15 PM • 30m           │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ 6:30 PM • 30m  Movable  │ │
│ └─────────────────────────┘ │
│                             │
│ Show more times             │
└─────────────────────────────┘
```

**Components**:

* `ownerNameHeader` (Text): "Maya's Availability"  
* `statusMessageDisplay` (Text): Custom status message  
* `dateSelector` (DateSelector): Date selection controls  
  * `prevDayButton` (IconButton): Previous day  
  * `dateDisplay` (Text): Current date  
  * `nextDayButton` (IconButton): Next day  
* `availabilityTimeline` (Timeline): Time availability display  
  * `timeBlockSection` (Section): Time blocks by period (Morning, Afternoon, Evening)  
    * `sectionHeader` (Text): Section title (e.g., "Morning")  
    * `busyBlocks` (TimeBlock): Busy time periods  
    * `negotiableBlocks` (TimeBlock): "Busy but flexible" periods  
* `timeRequestSection` (Section): Request time controls  
  * `requestSectionTitle` (Text): "Request a time:"  
  * `datePillSelector` (DatePill): Date selection  
  * `timeInputField` (TextField): Preferred time input  
  * `findTimesButton` (Button): Search for available times  
* `timeOptionsContainer` (Container): Available time options  
  * `timeOptionsTitle` (Text): "Available times:"  
  * `timeOptionChip` (Card): Individual time option  
    * `timeLabel` (Text): Time display  
    * `durationLabel` (Text): Duration indicator  
    * `statusBadge` (Badge): Special status (if any)  
  * `moreTimesLink` (TextButton): Show additional options

#### **4.2.5 Time Request Interface**

**Purpose**: Allow users to request a specific time slot

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Request Time              │
├─────────────────────────────┤
│                             │
│ Friday, Oct 24, 2025        │
│ 4:00 PM for 30 minutes      │
│                             │
│ Your Details                │
│ ┌─────────────────────────┐ │
│ │ Your Name               │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Your Email              │ │
│ └─────────────────────────┘ │
│                             │
│ Purpose: Coffee Chat     ▼  │
│                             │
│ Message (optional)          │
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ Urgency: Regular        ▼   │
│                             │
│ ┌─────────────────────────┐ │
│ │     Submit Request      │ │
│ └─────────────────────────┘ │
│                             │
│ Cancel                      │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to availability view  
* `pageTitle` (Text): "Request Time"  
* `selectedDateDisplay` (Text): Selected date  
* `selectedTimeDisplay` (Text): Selected time and duration  
* `detailsSectionTitle` (Text): "Your Details"  
* `nameField` (TextField): Requester name  
* `emailField` (TextField): Requester email  
* `purposeLabel` (Text): "Purpose:"  
* `purposeSelector` (Dropdown): Meeting purpose  
* `messageLabel` (Text): "Message (optional)"  
* `messageField` (TextArea): Additional notes  
* `urgencyLabel` (Text): "Urgency:"  
* `urgencySelector` (Dropdown): Importance indicator  
* `submitRequestButton` (Button): Submit the request  
* `cancelButton` (TextButton): Cancel and return

#### **4.2.6 Request Management Screen**

**Purpose**: Manage incoming and outgoing time requests

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Time Requests    Filter   │
├─────────────────────────────┤
│ Incoming | Outgoing | Past  │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ Coffee with Alex        │ │
│ │ Friday at 4:00 PM       │ │
│ │ "Would love to catch up"│ │
│ │                         │ │
│ │ Accept  Propose  Decline│ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Project Discussion      │ │
│ │ Monday at 11:00 AM      │ │
│ │ "Need to discuss the..."│ │
│ │ ⚠️ Urgent               │ │
│ │ Accept  Propose  Decline│ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ Team Check-in           │ │
│ │ Next Thursday at 2:00 PM│ │
│ │ "Weekly sync"           │ │
│ │                         │ │
│ │ Accept  Propose  Decline│ │
│ └─────────────────────────┘ │
│                             │
│ Load more...                │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to dashboard  
* `pageTitle` (Text): "Time Requests"  
* `filterButton` (IconButton): Filter options  
* `requestsTabBar` (TabBar): Request type tabs  
  * `incomingTab` (Tab): Requests from others  
  * `outgoingTab` (Tab): Requests you've sent  
  * `completedTab` (Tab): Past requests  
* `requestsList` (List): List of requests  
  * `requestCard` (Card): Individual request  
    * `requestTitle` (Text): Request title/purpose  
    * `requestTime` (Text): Requested date and time  
    * `requestMessage` (Text): Request message preview  
    * `urgencyIndicator` (Badge): Request urgency  
    * `actionButtonsRow` (ButtonGroup): Response buttons  
      * `acceptButton` (Button): Accept request  
      * `proposeButton` (Button): Propose alternative  
      * `declineButton` (Button): Decline request  
* `loadMoreButton` (TextButton): Load older requests

#### **4.2.7 Protected Time Creation Screen**

**Purpose**: Create or edit protected time blocks

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Add Protected Time   Save │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ Title (e.g., Focus Time)│ │
│ └─────────────────────────┘ │
│                             │
│ Date                        │
│ ┌─────────────────────────┐ │
│ │ Oct 24, 2025            │ │
│ └─────────────────────────┘ │
│                             │
│ Time                        │
│ ┌─────────┐ ┌─────────┐     │
│ │ 1:00 PM │ │ 3:00 PM │     │
│ └─────────┘ └─────────┘     │
│                             │
│ Repeats  ⚪ ⚫               │
│                             │
│ Repeat frequency: Weekly ▼  │
│                             │
│ On these days:              │
│ M  T  W  Th  F  Sa  Su      │
│ ⚪ ⚫ ⚪ ⚪ ⚫ ⚪ ⚪            │
│                             │
│ Ends: Never             ▼   │
│                             │
│ Visibility                  │
│ Default: Busy           ▼   │
│                             │
│ Friends: Negotiable     ▼   │
│ Family: Free            ▼   │
│ + Add audience override     │
│                             │
│ Priority: High          ▼   │
│ Allow moving  ⚪ ⚫          │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to calendar view  
* `pageTitle` (Text): "Add Protected Time"  
* `saveButton` (TextButton): Save protected time  
* `titleField` (TextField): Name for protected block  
* `dateLabel` (Text): "Date"  
* `dateRangePicker` (DatePicker): Date selection  
* `timeLabel` (Text): "Time"  
* `startTimePicker` (TimePicker): Start time  
* `endTimePicker` (TimePicker): End time  
* `repeatsToggle` (Switch): Make recurring  
* `recurrencePatternLabel` (Text): "Repeat frequency:"  
* `recurrencePatternSelector` (Dropdown): Frequency  
* `recurrenceDaysLabel` (Text): "On these days:"  
* `recurrenceDaysSelector` (ToggleButtonGroup): Days of week  
* `recurrenceEndLabel` (Text): "Ends:"  
* `recurrenceEndSelector` (Dropdown): End condition  
* `visibilityLabel` (Text): "Visibility"  
* `defaultVisibilitySelector` (Dropdown): Default view  
* `audienceOverridesList` (List): Per-audience settings  
  * `audienceOverrideItem` (ListItem): Individual audience override  
    * `audienceName` (Text): Audience name  
    * `visibilitySelector` (Dropdown): Visibility setting  
* `addAudienceButton` (Button): Add audience override  
* `priorityLabel` (Text): "Priority:"  
* `prioritySelector` (Dropdown): Importance level  
* `movabilityLabel` (Text): "Allow moving"  
* `movabilityToggle` (Switch): Allow moving

#### **4.2.8 Settings Screen**

**Purpose**: Manage user preferences and app settings

**Wireframe**:

```
┌─────────────────────────────┐
│ ← Settings                  │
├─────────────────────────────┤
│                             │
│ Account                     │
│ ┌─────────────────────────┐ │
│ │ Profile                 >│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Notifications           >│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Privacy                 >│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Premium Plan            >│ │
│ └─────────────────────────┘ │
│                             │
│ Calendars                   │
│ ┌─────────────────────────┐ │
│ │ Manage Calendars        >│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Sync Settings           >│ │
│ └─────────────────────────┘ │
│                             │
│ App Settings                │
│ ┌─────────────────────────┐ │
│ │ Time Zone: US Eastern   >│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Theme: Light            >│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Language: English       >│ │
│ └─────────────────────────┘ │
│                             │
│ Help & Support              │
│ ┌─────────────────────────┐ │
│ │ Help Center             >│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Contact Support         >│ │
│ └─────────────────────────┘ │
│                             │
│ Log Out                     │
└─────────────────────────────┘
```

**Components**:

* `backButton` (IconButton): Return to dashboard  
* `pageTitle` (Text): "Settings"  
* `accountSectionHeader` (Text): "Account"  
* `accountSettingsList` (List): Account settings options  
  * `profileSettings` (ListItem): User profile options  
  * `notificationSettings` (ListItem): Notification preferences  
  * `privacySettings` (ListItem): Privacy controls  
  * `subscriptionSettings` (ListItem): Plan and billing  
* `calendarSectionHeader` (Text): "Calendars"  
* `calendarSettingsList` (List): Calendar settings options  
  * `calendarConnections` (ListItem): Manage connections  
  * `syncSettings` (ListItem): Sync preferences  
* `appSectionHeader` (Text): "App Settings"  
* `appSettingsList` (List): Application settings  
  * `timeZoneSettings` (ListItem): Time zone preferences  
  * `themeSelector` (ListItem): App theme  
  * `languageSelector` (ListItem): App language  
* `helpSectionHeader` (Text): "Help & Support"  
* `helpSettingsList` (List): Support resources  
  * `helpCenter` (ListItem): Help documentation  
  * `contactSupport` (ListItem): Support contact  
* `logOutButton` (Button): Log out user

---

## **5\. Component Library**

### **5.1 Navigation Components**

#### **5.1.1 Header**

* Standard app header with back button, title, and action buttons  
* Props: `title`, `showBackButton`, `rightActions`

#### **5.1.2 TabBar**

* Bottom navigation with icon and label  
* Props: `tabs`, `activeTab`, `onTabChange`

#### **5.1.3 DateNavigator**

* Navigation control for date ranges  
* Props: `date`, `viewMode`, `onDateChange`

### **5.2 Form Components**

#### **5.2.1 TextField**

* Text input field with label and validation  
* Props: `label`, `placeholder`, `value`, `onChange`, `error`, `helperText`

#### **5.2.2 DropdownField**

* Dropdown selector with label  
* Props: `label`, `options`, `value`, `onChange`

#### **5.2.3 TimePicker**

* Time selection control  
* Props: `value`, `onChange`, `minuteInterval`, `format`

#### **5.2.4 DatePicker**

* Calendar date picker  
* Props: `value`, `onChange`, `minDate`, `maxDate`

#### **5.2.5 Switch**

* Toggle switch control  
* Props: `value`, `onChange`, `label`

### **5.3 Calendar Components**

#### **5.3.1 CalendarGrid**

* Calendar day/week/month view  
* Props: `date`, `events`, `viewMode`, `onEventClick`

#### **5.3.2 EventBlock**

* Calendar event block  
* Props: `title`, `startTime`, `endTime`, `type`, `isNegotiable`, `color`

#### **5.3.3 TimeBlock**

* Availability time block  
* Props: `startTime`, `endTime`, `status`, `description`

### **5.4 Content Components**

#### **5.4.1 Card**

* Container for content with elevation  
* Props: `padding`, `elevation`, `onPress`

#### **5.4.2 LinkCard**

* Card for displaying link information  
* Props: `name`, `url`, `stats`, `onPress`

#### **5.4.3 RequestCard**

* Card for displaying request information  
* Props: `title`, `time`, `message`, `urgency`, `actions`

#### **5.4.4 TimeOptionChip**

* Card for displaying available time options  
* Props: `time`, `duration`, `isNegotiable`, `isSelected`, `onPress`

### **5.5 Feedback Components**

#### **5.5.1 Badge**

* Small indicator for status or counts  
* Props: `value`, `type`, `size`

#### **5.5.2 Toast**

* Temporary feedback message  
* Props: `message`, `type`, `duration`

#### **5.5.3 EmptyState**

* Display when no content is available  
* Props: `title`, `message`, `icon`, `action`

---

## **6\. Interaction Patterns**

### **6.1 Gestures**

* **Tap**: Select items, activate buttons, toggle switches  
* **Swipe Left/Right**: Navigate between dates in calendar  
* **Swipe Up/Down**: Scroll through content  
* **Long Press**: Show additional options for calendar events or time blocks  
* **Pinch**: Zoom in/out on calendar view (optional)

### **6.2 Animations**

#### **6.2.1 Transitions**

* Screen transitions: Horizontal slide for navigation flow, vertical slide for modals  
* Fade in/out for content updates  
* Spring animations for interactive elements

#### **6.2.2 Feedback Animations**

* Button press feedback with subtle scale reduction  
* Success animations for completed actions  
* Loading indicators for async operations

#### **6.2.3 Calendar Animations**

* Smooth transitions between calendar view modes  
* Subtle animations when adding/removing events  
* Time block expansion/collapse animations

### **6.3 Form Interaction**

* Inline validation with immediate feedback  
* Context-sensitive form fields (show/hide based on selections)  
* Auto-advance focus through form fields  
* Smart defaults based on user preferences

### **6.4 State Changes**

#### **6.4.1 Loading States**

* Skeleton screens for initial content loading  
* Inline loading indicators for async actions  
* Pull-to-refresh for content updates

#### **6.4.2 Error States**

* Inline error messages for form validation  
* Error screens for network/system errors  
* Retry options for failed operations

#### **6.4.3 Success States**

* Confirmation messages for completed actions  
* Success animations for important completions  
* Auto-dismiss for transient success messages

---

## **7\. Accessibility Requirements**

### **7.1 Text and Color**

* Minimum text size of 14sp for body text  
* Color contrast ratio of at least 4.5:1 for text  
* Do not use color alone to convey information  
* Support for dynamic text sizing (respect system text size settings)

### **7.2 Touch Targets**

* Minimum touch target size of 44x44 points  
* Adequate spacing between interactive elements (minimum 8px)  
* Focus indicators for keyboard navigation

### **7.3 Screen Reader Support**

* Semantic HTML elements with proper roles  
* Descriptive labels for all interactive elements  
* Image alternatives for non-text content  
* Proper heading hierarchy  
* ARIA attributes where appropriate

### **7.4 Motion and Animation**

* Respect reduced motion preferences  
* Essential animations only  
* No flashing content

### **7.5 Input Methods**

* Support for keyboard navigation  
* Voice input compatibility  
* Support for assistive technologies

---

## **8\. Responsive Design Guidelines**

### **8.1 Breakpoints**

* **Small** (320-375px): Base mobile layout  
* **Medium** (376-767px): Enhanced mobile layout  
* **Large** (768-1023px): Tablet layout  
* **Extra Large** (1024px+): Desktop layout

### **8.2 Layout Patterns**

#### **8.2.1 Mobile Layout**

* Single column layout  
* Bottom navigation  
* Modal dialogs for detailed views  
* Simplified calendar view

#### **8.2.2 Tablet Layout**

* Two-column layout for main screens  
* Side navigation option  
* Split-view for calendar and details  
* Inline editing for some content

#### **8.2.3 Desktop Layout**

* Multi-column layout  
* Persistent navigation sidebar  
* Advanced calendar visualization  
* Side panels for details and editing

### **8.3 Component Adaptations**

* Cards: Adjust width based on viewport  
* Forms: Single column on mobile, multi-column on larger screens  
* Calendar: Simplified day view on mobile, week/month view on larger screens  
* Navigation: Bottom tabs on mobile, sidebar on larger screens

### **8.4 Touch vs. Pointer**

* Larger touch targets on touch-primary devices  
* Hover states for pointer devices  
* Different interaction patterns based on input method

---

This document serves as a comprehensive guide for frontend developers to implement the SpareTime Calendar application. It covers all aspects of the UI/UX design, from high-level screen flows to detailed component specifications and interaction patterns.

[image1]: <data:image/png;base64,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>