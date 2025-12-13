# Yoonet Development Prompt Library

Use with Paste app. Number prefix for quick access.

---

## Project Setup

### 01 - Launch New Project

```
I'm starting a new Next.js project using our standard stack:
- Next.js 14+ (App Router)
- Tailwind CSS (no custom CSS)
- shadcn/ui components
- Supabase for database/auth
- Deploying to Vercel

Project name: [NAME]
Purpose: [WHAT IT DOES]

Please set up the initial file structure following our patterns:
- App router structure with route groups
- Proper layout hierarchy
- shadcn/ui configured
- Supabase client setup
- Standard globals.css with CSS variables

Use only Tailwind classes. Use shadcn/ui components before creating custom ones.
```

### 02 - Clone/Extend Existing Project

```
I'm extending an existing project that uses our standard stack (Next.js 14, Tailwind, shadcn/ui, Supabase).

I need to add: [DESCRIBE FEATURE]

Before writing code:
1. Confirm which shadcn/ui components you'll use
2. Confirm the file structure for new components
3. Use only Tailwind classes — no custom CSS
4. Follow existing patterns in the codebase
```

---

## Pages & Features

### 10 - New Page (Dashboard)

```
Create a new dashboard page at: [ROUTE e.g. /clients]

Purpose: [WHAT THE PAGE SHOWS]

Requirements:
- Server component for data fetching from Supabase
- Proper loading.tsx skeleton
- Error handling with error.tsx
- Page header with title and description
- Use shadcn/ui Card, Table, or appropriate components
- Tailwind only — no custom CSS

Data to display: [DESCRIBE DATA]
Actions needed: [LIST ACTIONS e.g. create, edit, delete]
```

### 11 - New Page (Marketing/Public)

```
Create a marketing page at: [ROUTE e.g. /pricing]

Purpose: [WHAT THE PAGE DOES]

Requirements:
- SEO metadata (title, description)
- Responsive layout (mobile-first)
- Use shadcn/ui components where appropriate
- Tailwind only — no custom CSS
- Should feel polished and professional

Sections needed: [LIST SECTIONS]
```

### 12 - Landing Page / Hero Section

```
Create a landing page hero section for: [PRODUCT/FEATURE]

Key message: [MAIN VALUE PROP]
Target audience: [WHO IT'S FOR]
Primary CTA: [BUTTON TEXT AND ACTION]
Secondary CTA: [OPTIONAL]

Requirements:
- Mobile-responsive
- Tailwind only — no custom CSS
- Clean, professional aesthetic
- Fast loading (no heavy animations)
```

---

## Components

### 20 - New Component (Display)

```
Create a component for displaying: [WHAT IT SHOWS]

Component name: [NAME e.g. ClientCard]
Location: components/[feature]/[name].tsx

Props it needs:
- [LIST PROPS]

Requirements:
- Check if shadcn/ui has this component first
- Use shadcn/ui primitives (Card, Badge, Avatar, etc.)
- Tailwind only — no custom CSS
- Include TypeScript types for props
- Make it reusable
```

### 21 - New Component (Interactive)

```
Create an interactive component for: [WHAT IT DOES]

Component name: [NAME]
Location: components/[feature]/[name].tsx

User interactions:
- [LIST INTERACTIONS]

State it manages:
- [LIST STATE]

Requirements:
- "use client" directive
- shadcn/ui components for UI elements
- Tailwind only — no custom CSS
- Proper loading/disabled states
- TypeScript types
```

### 22 - Update Existing Component

```
I need to update an existing component.

File: [PATH]
Current behaviour: [WHAT IT DOES NOW]
Required change: [WHAT IT SHOULD DO]

Requirements:
- Keep using Tailwind only — don't add custom CSS
- Keep using existing shadcn/ui components
- Maintain existing patterns
- Don't break existing functionality
```

---

## Forms

### 30 - New Form (Simple)

```
Create a form for: [PURPOSE e.g. "adding a new client"]

Fields needed:
- [FIELD]: [TYPE] - [VALIDATION]
- [FIELD]: [TYPE] - [VALIDATION]

On submit: [WHAT HAPPENS]

Requirements:
- react-hook-form + zod validation
- shadcn/ui Form components (FormField, FormItem, FormLabel, etc.)
- shadcn/ui inputs (Input, Select, Textarea, etc.)
- Tailwind only — no custom CSS
- Loading state on submit button
- Toast notification on success/error
- Server action for submission
```

### 31 - New Form (Complex/Multi-step)

```
Create a multi-step form for: [PURPOSE]

Steps:
1. [STEP NAME]: [FIELDS]
2. [STEP NAME]: [FIELDS]
3. [STEP NAME]: [FIELDS]

Requirements:
- react-hook-form + zod validation
- shadcn/ui Form components
- Progress indicator showing current step
- Ability to go back/forward
- Validate each step before proceeding
- Tailwind only — no custom CSS
- Final submission to Supabase via server action
```

### 32 - Edit Form (Pre-populated)

```
Create an edit form for: [ENTITY e.g. "client"]

Data source: [TABLE/ENDPOINT]
Fields to edit: [LIST FIELDS]

Requirements:
- Pre-populate with existing data
- react-hook-form + zod
- shadcn/ui Form components
- Only submit changed fields
- Tailwind only — no custom CSS
- Optimistic UI update
- Toast on success/error
```

---

## Layouts

### 40 - Dashboard Layout Update

```
Update the dashboard layout.

Current issue: [WHAT'S WRONG]
Required change: [WHAT IT SHOULD BE]

Requirements:
- Keep responsive (works on mobile)
- Use shadcn/ui Sheet for mobile nav
- Tailwind only — no custom CSS
- Don't break existing pages
```

### 41 - New Section/Area

```
Add a new section to: [PAGE/LAYOUT]

Section purpose: [WHAT IT CONTAINS]
Position: [WHERE IN THE PAGE]

Requirements:
- Consistent spacing with existing sections
- shadcn/ui components where appropriate
- Tailwind only — no custom CSS
- Responsive
```

---

## Data & API

### 50 - Supabase Query

```
I need to fetch data from Supabase.

Table: [TABLE NAME]
Fields needed: [LIST FIELDS]
Filters: [CONDITIONS]
Relationships: [JOINS IF ANY]

Use in: [SERVER COMPONENT / SERVER ACTION / CLIENT]

Requirements:
- Proper TypeScript types
- Error handling
- Use createClient from @/lib/supabase/server or /client as appropriate
```

### 51 - Server Action

```
Create a server action for: [PURPOSE]

Input: [WHAT IT RECEIVES]
Process: [WHAT IT DOES]
Output: [WHAT IT RETURNS]

Requirements:
- "use server" directive
- Zod validation for input
- Proper error handling
- revalidatePath if data changed
- Return typed response { success, error, data }
```

---

## Fixes & Debugging

### 60 - Fix Styling Issue

```
I have a styling issue.

Component/Page: [LOCATION]
Expected: [WHAT IT SHOULD LOOK LIKE]
Actual: [WHAT IT LOOKS LIKE]

Requirements:
- Fix using Tailwind classes only
- Do NOT add custom CSS
- Do NOT add inline styles
- Check if a shadcn/ui component should be used instead
```

### 61 - Fix Functionality Issue

```
Something isn't working correctly.

Component/Page: [LOCATION]
Expected behaviour: [WHAT SHOULD HAPPEN]
Actual behaviour: [WHAT HAPPENS]
Error messages: [IF ANY]

Requirements:
- Identify root cause before fixing
- Maintain existing patterns
- Don't introduce custom CSS
- Test the fix
```

---

## Quick Modifiers (Add to any prompt)

### +M - Mobile First
```
Ensure this is fully responsive with mobile-first approach. Test all breakpoints.
```

### +A - Accessibility
```
Ensure proper accessibility: keyboard navigation, ARIA labels, focus states, colour contrast.
```

### +P - Performance
```
Optimise for performance: lazy loading, minimal re-renders, efficient queries.
```

### +T - With Tests
```
Include unit tests using Jest/React Testing Library for key functionality.
```

---

## Website Rebuild Pipeline

### 80 - Full Website Rebuild

```
Rebuild this website using our pipeline.

Source URL: [URL TO SCRAPE]
Project name: [NAME]
Target audience: [WHO IS THIS FOR]
Primary goal: [CONVERSION ACTION - book call, get quote, sign up]

Run the 4-phase pipeline:

Phase 1: Scrape — Extract all content, structure, social proof
Phase 2: Rewrite — Optimise copy for sales + SEO
Phase 3: Build — Create modern page blueprints
Phase 4: Package — Generate Next.js + Tailwind + shadcn code

Pause after each phase for my review.

Output must be:
- Tailwind only (no custom CSS)
- shadcn/ui components
- Centralised content file
- Ready for Yoonet stack

Start with Phase 1.
```

### 81 - Proceed to Next Phase

```
That looks good. Proceed to Phase [NUMBER].

Feedback: [ANY CHANGES OR NOTES]
```

### 82 - Run All Phases (No Stops)

```
Rebuild this website end-to-end: [URL]

Project: [NAME] | Audience: [WHO] | Goal: [ACTION]

Run all 4 phases without stopping. Output complete Next.js codebase.

Requirements: Tailwind only, shadcn/ui, centralised content file.

Go.
```

---

## Migration & Conversion

### 70 - Migrate Repo to Yoonet Stack

```
I need to migrate an existing Next.js project to our standard Yoonet stack.

GitHub Repo: [REPO URL]

Target: Next.js 14+, Tailwind ONLY, shadcn/ui, Supabase, Vercel.

Please follow this process:

**Phase 1: Analysis (report back before proceeding)**
- Scan current styling (CSS modules? Custom CSS? Mixed?)
- Identify components with shadcn/ui equivalents
- Check file structure vs our standard
- Create migration checklist with scope estimate

**Phase 2: Setup**
- Update Tailwind config
- Add shadcn/ui + required components
- Update globals.css (Tailwind + CSS variables only)
- Restructure to app router with route groups if needed

**Phase 3: Component Migration**
- Replace custom UI with shadcn/ui equivalents
- Convert all styling to Tailwind classes
- Remove CSS imports, modules, inline styles
- Use cn() for conditional classes

**Phase 4: Page Migration**
- Add loading.tsx skeletons
- Add error.tsx boundaries
- Ensure server/client split is correct
- Update metadata

**Phase 5: Cleanup**
- Delete unused CSS files
- Remove unused dependencies
- Update README.md

Rules (non-negotiable):
- TAILWIND ONLY — every style must be a Tailwind class
- shadcn/ui FIRST — use before building custom
- NO CUSTOM CSS — delete it or convert it
- cn() FOR CONDITIONS

Start with Phase 1 analysis, then wait for my go-ahead.
```

### 71 - Continue Migration

```
Continue with the next phase of migration.

Last completed: [PHASE]
Status: [ANY ISSUES]

Proceed following the same rules:
- Tailwind only, no custom CSS
- shadcn/ui components first
- cn() helper for conditionals
```

### 72 - Verify Migration Complete

```
Verify the migration is complete:

1. Search for remaining:
   - .css files (except globals.css)
   - .module.css files  
   - style={{}} inline props
   - className={styles.xxx} references

2. Confirm UI components are from shadcn or Tailwind-only

3. Check for loading.tsx, error.tsx, mobile responsiveness

Report any issues found.
```

---

## Notes

- Always reinforce: **Tailwind only, no custom CSS**
- Always prefer shadcn/ui components
- Be specific about what you want
- Include context about where it fits in the app
- Mention data sources and types
