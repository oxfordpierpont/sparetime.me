![][image1]

### **UX Pilot Prompt: SpareTime Calendar – Full UI/UX Design**

**Project:** SpareTime Calendar  
 **Platform:** Mobile-first (iOS/Android responsive), Web (responsive parity)  
 **Design Delivery:** Wireframes → High-fidelity → Tailwind CSS  
 **Style Guide:** Provided (Typography, Palette, Tone)  
 **UI Requirements:** Provided (Component IDs, Interaction Notes, Naming Conventions)

**Website:** https://sparetimecalendar.com  
**Shortened Domain:** https://sparetime.me  
**Author:** The Oxford Pierpont Corporation  
---

We are designing **SpareTime**, a privacy-first calendar availability sharing app. It lets users create **custom links** to show curated availability (not bookable by default) and lets viewers request time by typing a preferred time, then seeing the **three closest suggestions**.

This is **not** a scheduling app. It's about expressing and managing boundaries clearly — for business, family, and personal contexts.

---

### **Design Requirements**

* You must follow the **attached Style Guide PDF** for all colors, fonts, and visual tone. Fonts: **Alright Sans** or **Poppins** as defined.

* All UI components and screen elements are **defined by ID and interaction** in the **UI Requirements Screenshot** provided.

* Component IDs and interactions must be **used exactly as shown** — this naming system maps directly to our development and database structure.

* The entire component system must be structured using **Tailwind CSS** utility classes.

* You may use Tailwind plugins for responsiveness and state transitions (e.g., `@tailwindcss/forms`, `@tailwindcss/typography`).

---

### **Deliverables**

1. **Wireframes** for all screens (based on provided UI list)\\n2. **Component library** in Tailwind (atomic and reusable)\\n3. **Mobile-first layouts** with scalable breakpoints (desktop optional)\\n4. **Interaction mockups** for:\\n \- Typing a preferred time → getting 3 suggestions\\n \- Selecting a time chip\\n \- Submitting a time request\\n \- Group availability views (heatmap / suggestion chips)\\n5. **Naming & structure** should follow component IDs exactly as shown in `Screenshot 2025-10-24 at 07.22.51.png`\\n6. All color tokens and font stacks from the Style Guide must be represented as Tailwind CSS classes or custom tokens (if needed)\\n\\n---

### **Brand Tone:**

* Calm, trustworthy, and neutral

* Friendly but not whimsical

* Minimalist, clean design that avoids calendar “slot grid” fatigue

---

### **Reference Components (Sample)\\n- `availabilityHeader`, `statusMessageDisplay`, `availabilityDateSelector`, `availabilityTimeLine`\\n- `timeInputField`, `findTimesButton`, `timeOptionChip-{id}`\\n- Use `moreTimesLink` for additional slot loading\\n\\n---**

**Important:**  
 Please confirm you have reviewed both the **Style Guide PDF** and the **UI Component Screenshot** in full. If anything is unclear, request clarification **before building**.

[image1]: <data:image/png;base64,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>