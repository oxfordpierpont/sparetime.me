![][image1]

## **Project Overview**

**Version:** 1.0  
 **Date:** October 24, 2025  
 **Status:** Draft

**Website:** https://sparetimecalendar.com

**Shortened Domain:** https://sparetime.me

**Author:** The Oxford Pierpont Corporation

---

## **1\. Executive Summary**

SpareTime is a social availability layer that sits on top of existing calendar systems, enabling users to share customized views of their availability with different audiences. Unlike traditional scheduling tools, SpareTime focuses on boundary-setting and communication of availability rather than direct booking. The app allows users to import their calendars, then create shareable links with fine-grained control over what each recipient can see and request.

The key innovation of SpareTime is its approach to time boundaries: users can artificially mark themselves as busy, customize views for different audiences, protect personal time blocks automatically, and indicate when they're "busy but flexible" for select viewers. This creates a socially intelligent system for communicating availability while maintaining personal boundaries.

## **2\. Product Overview**

### **2.1 Vision & Mission**

**Vision:** A world where people have healthier relationships with their time and clearer boundaries in both professional and personal contexts.

**Mission:** To provide a social availability layer that helps users communicate when they're free while maintaining control over their personal time boundaries.

### **2.2 Core Value Proposition**

SpareTime solves several key problems:

* The awkwardness of saying "I'm busy" without explanation  
* The inefficiency of back-and-forth "when are you free?" messaging  
* The invasiveness of fully transparent calendar sharing  
* The transactional nature of scheduling tools in social contexts

By giving users full control over how their availability appears to different audiences, SpareTime creates a more humane and socially intelligent way to coordinate time.

### **2.3 Product Positioning**

SpareTime is positioned as a "social availability layer" distinct from:

* **Scheduling tools** like Calendly (which are transaction-focused and impersonal)  
* **Calendar sharing** like Google Calendar (which exposes too much private information)  
* **Manual coordination** via text/email (which is inefficient and repetitive)

SpareTime is for people who want to protect their time while still appearing accessible and responsive.

## **3\. Market Differentiation**

### **3.1 Competitive Landscape**

**Google Calendar Appointment Slots**

* *Similarities:* Shows available time slots to others  
* *Differences:* SpareTime allows artificial "busy" blocks, different views for different people, and "busy but movable" indicators

**Calendly**

* *Similarities:* Creates shareable links for availability  
* *Differences:* SpareTime focuses on availability communication rather than scheduling; allows for audience-specific views; emphasizes personal boundaries

**When2Meet/Doodle**

* *Similarities:* Helps coordinate free time  
* *Differences:* SpareTime is persistent rather than event-specific; provides richer context about availability; allows negotiable slots

**Manual Text Coordination**

* *Similarities:* Personal, relationship-based  
* *Differences:* SpareTime eliminates repetitive questions; provides visual context; respects privacy

### **3.2 Unique Selling Points**

1. **Boundary Control:** Mark yourself artificially busy to protect time  
2. **Audience-Specific Views:** Show different availability to different groups  
3. **Context Preservation:** Keep the "why" of your busy time private but visible to select viewers  
4. **Social Negotiation:** Indicate when you're "busy but flexible" for certain people  
5. **Expiring Access:** Create temporary availability windows for specific purposes

### **3.3 Target Market**

**Primary User Personas:**

1. **The Boundary-Setter (Personal Use)**

   * Values personal time  
   * Juggles multiple social circles  
   * Wants to be responsive without being constantly available  
2. **The Team Lead (Professional Use)**

   * Manages multiple stakeholders  
   * Needs to protect focus time  
   * Wants to appear accessible to team while limiting interruptions  
3. **The Family Coordinator**

   * Manages complex family schedules  
   * Needs to protect family time from external demands  
   * Wants to coordinate with extended family/friends efficiently

## **4\. Key Features & Use Cases**

### **4.1 Core Features (MVP)**

1. **Calendar Integration**

   * Import from Google Calendar  
   * Synchronize changes automatically  
   * Support for multiple calendars  
2. **Availability Customization**

   * Create artificial "busy" blocks  
   * Set recurring protected time slots  
   * Define custom labels for time blocks (visible to select viewers)  
3. **Shareable Links**

   * Generate unique, customized view links  
   * Set expiration dates for links  
   * Control what each link recipient can view  
4. **Time Request System**

   * Allow viewers to request time slots  
   * "Can you make time for X?" vs. direct scheduling  
   * Three nearest options interface for time selection  
5. **Viewer Experience**

   * Clean, minimal interface  
   * Mobile-optimized view  
   * Natural language time input ("evening," "after 3pm")

### **4.2 Premium Features**

1. **Multiple Audience Views**

   * Create separate links for friends, family, colleagues  
   * Customize what each group can see (labels, details, etc.)  
   * Set different levels of busy/free visibility  
2. **Negotiable Time Slots**

   * Mark time as "busy but movable" for select viewers  
   * Indicate priority/importance of existing commitments  
   * Allow conditional availability ("free if it's important")  
3. **Rich Status Messages**

   * Set availability context messages ("October is packed")  
   * Custom messages for different audiences  
   * Time-limited status indicators  
4. **Advanced Time Protection**

   * Pattern-based automatic blocking  
   * Time of day protection rules  
   * Seasonal/holiday automated rules  
5. **Team/Group Coordination**

   * Shared group availability view  
   * Find mutual free time across team members  
   * Group-based access controls

## **5\. Time Selection Feature**

### **5.1 Overview**

One of the most innovative aspects of SpareTime is its approach to time selection. Instead of using the traditional calendar grid interface that takes up significant screen space, SpareTime uses a streamlined input approach:

### **5.2 Interaction Flow**

1. User picks a date (tiny date pill or mini calendar—no time slots shown).  
2. User types a preferred time in free-form text: "7pm", "after 3", "19:30", "tonight", "lunch"  
3. System returns exactly three chips: the nearest available times around that preference (e.g., 6:45 PM, 7:15 PM, 7:45 PM)  
4. User taps a chip → confirmation sheet → "Send request" (not scheduling, just asking "can you make time for me?")  
5. Optional: a "More times" link expands to show additional options

### **5.3 UI Details**

**Single input row:**

* \[ Date pill \] \[ time text field (placeholder: "e.g., 7pm or 'after 3'") \]

**Result chips (compact):**

* 6:45 PM • 30m 7:15 PM • 60m 7:45 PM • 30m

**Badge variants:**

* Movable (if the slot is busy-but-negotiable)  
* Priority (if user marks VIP windows)  
* Low-probability (if near a protected block)

**Error handling:**

* Microcopy under chips if none fit: "No close matches. Try 'after 8' or pick another date."

### **5.4 Time Parsing Rules**

* Accept absolute ("19:30", "7pm"), relative ("after 3", "around noon"), and fuzzy ("tonight", "early morning")  
* Normalize to user's viewer timezone with prominent label  
* Default duration from the requester (e.g., 30m) with options for 15/30/45/60 minutes

### **5.5 Benefits**

* Tiny UI, big clarity: a single field \+ chips replaces two bulky grids  
* Respectful: keeps boundaries while still offering flexibility  
* Fast path: three choices beat analysis paralysis from too many options

## **6\. Technical Implementation**

### **6.1 Mobile Development**

The application will be developed for both iOS and Android platforms:

**iOS Development:**

* Swift 5.9+ / SwiftUI for UI  
* Core Data for local storage  
* URLSession for networking  
* EventKit for calendar access

**Android Development:**

* Kotlin 1.8+ / Jetpack Compose  
* Room for local storage  
* Retrofit for networking  
* WorkManager for background tasks

### **6.2 Backend Development**

* Node.js with TypeScript  
* MongoDB for data storage  
* RESTful API architecture  
* JWT authentication  
* Google Calendar API integration

### **6.3 Development Phases**

**Phase 1: Core Infrastructure (Weeks 1-4)**

* Set up development environments  
* Create basic project structures  
* Implement authentication system  
* Build API foundation  
* Set up CI/CD pipelines

**Phase 2: Calendar Integration (Weeks 5-8)**

* Implement Google Calendar integration  
* Build calendar sync mechanism  
* Develop availability calculation engine  
* Create protected time functionality  
* Build time parsing utilities

**Phase 3: Link System (Weeks 9-12)**

* Develop link creation and management  
* Build public availability view  
* Implement time request system  
* Create time selection UI (3-option picker)  
* Develop link analytics

**Phase 4: Mobile Apps (Weeks 13-20)**

* Develop core iOS application  
* Develop core Android application  
* Implement mobile calendar integration  
* Build notifications system  
* Create local storage and sync

**Phase 5: Premium Features (Weeks 21-24)**

* Implement multiple audience views  
* Build team/group functionality  
* Create advanced time protection  
* Develop negotiable time slots  
* Add rich status messages

**Phase 6: Refinement & Launch (Weeks 25-28)**

* Performance optimization  
* Comprehensive testing  
* Beta testing program  
* Marketing site preparation  
* App store submission

## **7\. Conclusion**

SpareTime addresses a genuine need in the market for a more socially intelligent way to communicate availability. Unlike existing calendar tools, it focuses on the human aspect of time management—helping users protect their boundaries while still appearing responsive and accessible.

The comprehensive requirements in this document provide a solid foundation for building a high-quality, production-ready mobile application. By following the detailed implementation guidance, developers can create a consistent experience across iOS and Android platforms while adhering to platform-specific best practices.

Key success factors for this project:

1. Focusing on the social layer of availability rather than pure scheduling mechanics  
2. Providing fine-grained control over what different audiences can see  
3. Creating a natural, intuitive time selection experience (three nearest options)  
4. Building a system that respects and reinforces personal boundaries  
5. Emphasizing user control throughout the experience

With the right team and careful implementation of this specification, SpareTime has the potential to change how people think about and communicate their availability in both personal and professional contexts.

[image1]: <data:image/png;base64,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>