# SpareTime Calendar: Apple-Style Design Guide

## Core Principle
Design exactly like an iOS app, but swap Apple's default blue for spareTime's brand colors.

## Color Mapping

### Replace iOS Blue with spareTime Blue
Anywhere iOS uses **system blue** (`#007AFF`), use spareTime **Bright Blue** (`#2e95f3`)

**Use for:**
- All tappable links
- Primary action buttons
- Active tab indicators
- Selected states
- Toggle switches (on state)
- Progress indicators

### Background Colors (Just like iOS)

**Primary Background:** `#fafcff` (spareTime's near-white with subtle blue tint)
- Use this instead of pure white
- Main screen backgrounds
- Card backgrounds
- Form backgrounds

**Secondary Background:** `#f6fbff` (slightly more blue)
- Use for grouped lists (like iOS Settings)
- Inset sections
- Input field backgrounds

**Dark Mode Alternative:** `#021220` (spareTime navy)
- Use like iOS dark mode
- White text on dark backgrounds
- Sparingly for impact screens

### Text Colors (iOS Standard)

**Primary Text:** `#021220` (spareTime navy)
- Use like iOS black
- Body text, headings, labels

**Secondary Text:** `#839aac` (spareTime blue-gray)
- Use like iOS gray
- Subtitles, captions, placeholders
- De-emphasized information

**Link/Accent Text:** `#2e95f3` (spareTime bright blue)
- Use like iOS system blue
- All interactive text

### Status Colors (iOS Semantic Colors)

**Green (Success/Available):**
- Primary: `#009247`
- Light background: `#afddc3`
- Use exactly like iOS green

**Orange (Warning/Flexible):**
- Primary: `#fbb03a`
- Light background: `#ffefcc`
- Use exactly like iOS orange

**Red (Error/Busy):**
- Primary: `#ec2027`
- Light background: `#fff3f3`
- Use exactly like iOS red

## Typography (iOS Style)

**Use Poppins font family:**
- Extra Bold = iOS Bold
- SemiBold = iOS Semibold  
- Light = iOS Regular

**Size Scale (iOS Standard):**
- Large Title: 34px, Extra Bold, `#021220`
- Title 1: 28px, Extra Bold, `#021220`
- Title 2: 22px, SemiBold, `#021220`
- Title 3: 20px, SemiBold, `#021220`
- Headline: 17px, SemiBold, `#021220`
- Body: 17px, Light, `#021220`
- Callout: 16px, Light, `#021220`
- Subhead: 15px, Light, `#839aac`
- Footnote: 13px, Light, `#839aac`
- Caption: 12px, Light, `#839aac`

**Color Override for Emphasis:**
- Use `#2e95f3` for subheadings that need to pop
- Keep body text `#021220` or `#839aac`

## Components (Exact iOS Patterns)

### Buttons

**Primary Button (iOS filled):**
```
Background: #2e95f3
Text: White
Border radius: 12px
Height: 50px
Font: 17px SemiBold
Full width or generous padding (20px horizontal minimum)
```

**Secondary Button (iOS bordered):**
```
Background: Transparent
Text: #2e95f3
Border: 1px solid #2e95f3
Border radius: 12px
Height: 50px
```

**Text Button:**
```
No background, no border
Text: #2e95f3
Font: 17px Light
```

### Lists (iOS Grouped Lists)

```
Background: #f6fbff (like iOS gray grouped background)
List items: White cards with #fafcff background
Dividers: 1px solid #c3d5e0
Cell height: 44px minimum
Left padding: 16px
```

### Form Inputs (iOS Standard)

```
Background: #f6fbff
Border: None (iOS style) or 1px solid #c3d5e0 if needed
Border radius: 10px
Height: 44px
Padding: 12px horizontal
Placeholder text: #839aac
Input text: #021220
Focus state: 2px solid #2e95f3 border
```

### Navigation Bar (iOS Top Bar)

```
Background: #fafcff with blur effect
Title: 17px SemiBold, #021220, centered
Back button: #2e95f3 with chevron
Action buttons: #2e95f3
Height: 44px (content area)
```

### Tab Bar (iOS Bottom Bar)

```
Background: #fafcff with blur
Icons: Line style
Inactive: #839aac
Active: #2e95f3 with filled icon
Labels: 10px, Poppins Light
Height: 50px
```

### Cards (iOS Style)

```
Background: White or #fafcff
Border radius: 12px
Padding: 16px
Shadow: 0 2px 8px rgba(2, 18, 32, 0.06)
Spacing between cards: 16px
```

### Switches (iOS Toggle)

```
Off: Background #c3d5e0, white circle
On: Background #2e95f3, white circle
Height: 31px
Width: 51px
```

## Special SpareTime Elements

### Calendar Status Squares (in icon and UI)

```
Size: Equal squares with 4px border radius
Available: Solid #009247
Flexible: Solid #fbb03a
Busy: Solid #ec2027
Inactive/Past: #c3d5e0 at 50% opacity
Spacing: 4px between squares
```

### Status Badges

```
Border radius: 12px (pill shaped)
Padding: 4px 12px
Font: 13px SemiBold

Available:
  Background: #afddc3
  Text: #009247

Flexible:
  Background: #ffefcc
  Text: #fbb03a

Busy:
  Background: #fff3f3
  Text: #ec2027
```

## Layout Rules (iOS Standards)

### Spacing (8pt Grid)
- Screen margins: 16px (iOS standard)
- Between sections: 32px
- Between elements: 16px
- Between related items: 8px
- Inside cards: 16px padding

### Safe Areas
- Respect iOS safe areas exactly
- No content behind notch or bottom bar
- 16px minimum from screen edges

### Hierarchy
1. Use iOS visual weight hierarchy
2. Largest/boldest = most important
3. Fade to gray for less important
4. Use spareTime blue for interactive only

## Onboarding Exception

**For welcome/onboarding screens only**, use full-screen color blocks:

**Screen 1: Dark Impact**
```
Background: #021220 (full screen)
Icon: Centered, colorful version
Heading: White, Extra Bold
Accent words: #2e95f3
Button: White background, #021220 text
```

**Screen 2: Warm Tutorial**
```
Background: #fbb03a (full screen)
Icon: Centered
Heading: #021220, Extra Bold
Body: #021220 at 80% opacity
Button: White background, #021220 text
```

**Screen 3: Action/Signup**
```
Background: #2e95f3 (full screen)
Icon: Centered, white version
Heading: White, Extra Bold
Form fields: White/semi-transparent
Button: White background, #2e95f3 text
```

**After onboarding:** Return to standard iOS layouts with white/light backgrounds

## Quick Design Checklist

✓ Does it look like an iOS app?
✓ Are you using `#2e95f3` instead of iOS blue?
✓ Are backgrounds `#fafcff` instead of pure white?
✓ Are inactive elements `#839aac` gray?
✓ Are status colors green/orange/red used correctly?
✓ Are corners rounded (10-12px for most elements)?
✓ Is text sized using iOS scale (17px body, 13px caption, etc.)?
✓ Are you using Poppins font?
✓ Does it have generous iOS-style spacing (16px margins)?
✓ Are interactive elements tappable (`#2e95f3`)?

## The Simple Rule

**Design every screen exactly like iOS Mail, Settings, or Calendar. Then:**
1. Change iOS blue → `#2e95f3`
2. Change white → `#fafcff`
3. Add calendar color dots (green/orange/red)
4. Use Poppins font
5. Add spareTime logo in nav bar

That's it. You're on brand.
