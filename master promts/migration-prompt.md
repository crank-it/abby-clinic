# 70 - Migrate Repo to Yoonet Stack

## The Prompt

```
I need to migrate an existing Next.js project to our standard Yoonet stack and patterns.

GitHub Repo: [REPO URL]

## Target Stack
- Next.js 14+ (App Router)
- Tailwind CSS ONLY — no custom CSS files, no CSS modules, no inline styles
- shadcn/ui components — replace custom components where equivalents exist
- Supabase (if applicable)
- Deployed on Vercel

## Migration Process

Please follow this systematic approach:

### Phase 1: Analysis (Do this first, report back before proceeding)

1. **Scan the codebase** and identify:
   - Current styling approach (CSS modules? Styled-components? Custom CSS? Mixed?)
   - Custom components that have shadcn/ui equivalents
   - File structure vs our standard (app router with route groups)
   - Any anti-patterns or inconsistencies
   - Dependencies that need updating/removing

2. **Create a migration checklist** showing:
   - Files that need CSS migration
   - Components to replace with shadcn/ui
   - Structural changes needed
   - Estimated scope (small/medium/large)

**Stop here and show me the analysis before proceeding.**

---

### Phase 2: Setup & Structure

3. **Update dependencies**:
   - Ensure Tailwind CSS is properly configured
   - Add shadcn/ui and configure components.json
   - Add required shadcn/ui components via CLI commands
   - Remove deprecated/unnecessary CSS dependencies

4. **Update file structure** (if needed):
   ```
   app/
   ├── (marketing)/      # Public pages
   ├── (dashboard)/      # Protected pages  
   │   └── layout.tsx    # Dashboard shell
   ├── api/              # API routes
   ├── globals.css       # Tailwind + CSS variables ONLY
   └── layout.tsx        # Root layout
   components/
   ├── ui/               # shadcn/ui (don't edit)
   └── [feature]/        # Feature components
   lib/
   ├── supabase/         # If using Supabase
   └── utils.ts          # cn() helper
   ```

5. **Update globals.css**:
   - Remove all custom CSS
   - Keep only Tailwind directives and CSS variables
   - Ensure shadcn/ui CSS variables are present

---

### Phase 3: Component Migration

6. **Replace custom components with shadcn/ui**:
   - Buttons → `@/components/ui/button`
   - Inputs → `@/components/ui/input`
   - Cards → `@/components/ui/card`
   - Modals → `@/components/ui/dialog`
   - Dropdowns → `@/components/ui/dropdown-menu`
   - Tables → `@/components/ui/table`
   - Forms → shadcn/ui form components + react-hook-form + zod
   - etc.

7. **For each component file**:
   - Remove CSS imports
   - Remove CSS module references (styles.xxx)
   - Remove inline style={{}} props
   - Convert all styling to Tailwind classes
   - Use cn() helper for conditional classes
   - Import from @/components/ui/ where applicable

---

### Phase 4: Page Migration

8. **For each page**:
   - Ensure proper server/client component split
   - Add loading.tsx skeletons using shadcn Skeleton
   - Add error.tsx error boundaries
   - Update metadata exports
   - Convert all styling to Tailwind

9. **Update layouts**:
   - Ensure consistent layout hierarchy
   - Mobile-responsive navigation
   - Proper use of CSS variables (bg-background, text-foreground, etc.)

---

### Phase 5: Cleanup & Documentation

10. **Remove dead code**:
    - Delete unused CSS files
    - Delete unused components
    - Clean up unused dependencies from package.json

11. **Update documentation**:
    - Update README.md with current stack info
    - Document any project-specific patterns
    - Add setup instructions

12. **Final checklist**:
    - [ ] No .css files except globals.css
    - [ ] No CSS modules (.module.css)
    - [ ] No styled-components or emotion
    - [ ] No inline style={{}} props
    - [ ] All UI components from shadcn/ui or built with Tailwind
    - [ ] cn() helper used for conditional classes
    - [ ] Proper TypeScript types throughout
    - [ ] Mobile responsive
    - [ ] Loading and error states

---

## Key Rules (Non-negotiable)

1. **TAILWIND ONLY** — Every single style must be a Tailwind class
2. **shadcn/ui FIRST** — Use existing components before building custom
3. **NO CUSTOM CSS** — Delete it, convert it, but don't keep it
4. **cn() FOR CONDITIONS** — Use the helper for conditional styling
5. **CSS VARIABLES** — Use bg-background, text-foreground, etc.

---

## What I Need From You

After each phase, provide:
- Summary of changes made
- Any decisions that need my input
- Files that couldn't be automatically migrated (need manual review)
- Next steps

Let's start with Phase 1 — analyse the repo and show me what we're working with.
```

---

## Quick Version (for smaller projects)

```
Migrate this repo to our Yoonet stack: [REPO URL]

Target: Next.js 14, Tailwind ONLY, shadcn/ui components, no custom CSS.

1. First, analyse and tell me what needs to change
2. Then systematically migrate:
   - Remove all custom CSS → convert to Tailwind classes
   - Replace custom components → use shadcn/ui equivalents  
   - Update file structure → app router with route groups
   - Clean up → remove dead code, update docs

Rules:
- Tailwind classes only (no CSS files, no inline styles)
- shadcn/ui components first
- cn() helper for conditional classes
- Mobile responsive

Show me the analysis first before making changes.
```

---

## Follow-up Prompts

### 71 - Continue Migration
```
Continue with the next phase of migration. 

Last completed: [PHASE]
Current status: [ANY ISSUES]

Proceed with [NEXT PHASE] following the same rules:
- Tailwind only
- shadcn/ui components
- No custom CSS
```

### 72 - Migration Stuck/Issues
```
I'm having issues with the migration.

Problem: [DESCRIBE]
File(s) affected: [LIST]
Error (if any): [ERROR MESSAGE]

Please help resolve while maintaining:
- Tailwind only — no custom CSS
- shadcn/ui components where applicable
- Existing functionality must still work
```

### 73 - Verify Migration Complete
```
Please verify the migration is complete by checking:

1. Search for any remaining:
   - .css files (except globals.css)
   - .module.css files
   - style={{}} inline props
   - CSS-in-JS (styled-components, emotion)
   - className={styles.xxx} references

2. Confirm all UI components are either:
   - From @/components/ui/ (shadcn)
   - Built with Tailwind classes only

3. Check for:
   - Proper loading.tsx files
   - Proper error.tsx files
   - Mobile responsiveness
   - TypeScript types

Report any remaining issues.
```
