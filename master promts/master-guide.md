# Yoonet Development System — Master Guide

## The Complete Picture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ONE-TIME SETUP                                    │
│                                                                             │
│  1. Deploy Design System Configurator (tool to create design configs)       │
│  2. Create .cursorrules template (paste into every project)                 │
│  3. Set up Prompt Library in Paste app (numbered prompts)                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PER-PROJECT SETUP                                  │
│                                                                             │
│  1. Create design system config (using the configurator app)                │
│  2. Copy .cursorrules into project root                                     │
│  3. Paste design system config into the DESIGN SYSTEM section               │
│  4. Start building using numbered prompts                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DAILY WORKFLOW                                   │
│                                                                             │
│  • Use numbered prompts from Paste (01, 10, 30, etc.)                       │
│  • Reference sections: "following the FORMS rules" or "per DESIGN SYSTEM"  │
│  • Everything stays consistent because .cursorrules is always loaded        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Order of Operations

### Phase 1: One-Time Setup (Do Once)

| Step | What | File/Tool | Time |
|------|------|-----------|------|
| 1 | Deploy Design System Configurator | GitHub → Vercel | 10 min |
| 2 | Save .cursorrules template | See below | 5 min |
| 3 | Set up Prompt Library in Paste | yoonet-prompt-library.md | 15 min |

### Phase 2: Per-Project Setup (Each New Project)

| Step | What | How |
|------|------|-----|
| 1 | Open Design System Configurator | Your Vercel URL |
| 2 | Configure fonts, colours, components | Use the app |
| 3 | Copy the markdown output | Click "Copy Markdown" |
| 4 | Create `.cursorrules` in project root | Copy template below |
| 5 | Paste design system into Section 2 | Replace placeholder |

### Phase 3: Building (Daily Work)

| Task | Prompt # | Section Referenced |
|------|----------|-------------------|
| New page | 10, 11 | PAGES, DESIGN SYSTEM |
| New component | 20, 21 | COMPONENTS, DESIGN SYSTEM |
| New form | 30, 31 | FORMS, DESIGN SYSTEM |
| Layout changes | 40, 41 | LAYOUTS, DESIGN SYSTEM |
| Fix styling | 60 | CORE RULES, DESIGN SYSTEM |
| Migrate existing repo | 70 | All sections |
| Rebuild from URL | 80 | All sections |

---

## How to Reference Sections in Prompts

Your `.cursorrules` file has numbered sections. Reference them like this:

**In your prompts, add:**
- "Following Section 1 (Core Rules)..."
- "Per the DESIGN SYSTEM section..."
- "Using the FORMS patterns..."
- "Apply the COMPONENTS guidelines..."

**Or use shorthand:**
- "Per .cursorrules"
- "Following our stack rules"
- "Using our design system"

Cursor automatically loads `.cursorrules`, so Claude already knows all sections. You're just pointing to the relevant one.

---

## The .cursorrules Template

Copy this entire file into `.cursorrules` at the root of each project.

```markdown
# ============================================================================
# SECTION 1: CORE RULES (Never change this section)
# ============================================================================

## Stack
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS ONLY
- Components: shadcn/ui
- Database: Supabase
- Deployment: Vercel

## Critical Rules

### Styling (Non-negotiable)
1. TAILWIND ONLY — No custom CSS files, no CSS modules, no inline style={{}}
2. USE shadcn/ui — Don't recreate buttons, inputs, cards, dialogs, etc.
3. USE cn() HELPER — For conditional classes: cn("base", condition && "conditional")
4. USE CSS VARIABLES — bg-background, text-foreground, text-muted-foreground, etc.

### File Structure
```
app/
├── (marketing)/          # Public pages
├── (dashboard)/          # Protected pages
├── api/                  # API routes
├── globals.css           # Tailwind + CSS variables ONLY
└── layout.tsx            # Root layout
components/
├── ui/                   # shadcn/ui (don't edit these)
└── [feature]/            # Feature components
lib/
├── supabase/             # Supabase client
└── utils.ts              # cn() helper
```

### Before Writing Any Code
1. Check if shadcn/ui has a component for your need
2. Use Tailwind classes for ALL styling
3. Never create custom CSS

# ============================================================================
# SECTION 2: DESIGN SYSTEM (Paste your config here)
# ============================================================================

<!-- 
INSTRUCTIONS: 
1. Go to your Design System Configurator
2. Configure fonts, colours, components
3. Copy the markdown output
4. Replace this comment block with that output
-->

## Typography

### Fonts
| Purpose | Font Family | Category |
|---------|-------------|----------|
| Headings | [Configure in app] | sans-serif |
| Body | [Configure in app] | sans-serif |
| Mono | [Configure in app] | monospace |

## Colour Palette

[Paste your colour configuration here]

## Components

[Paste your component list and install command here]

# ============================================================================
# SECTION 3: PAGES & CONTENT
# ============================================================================

## Page Structure

### Server Components (Default)
Use for pages that fetch data. No "use client" directive.

```tsx
import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Page Title | Site Name",
  description: "Description for SEO",
}

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.from("table").select("*")
  
  return (
    <div className="container py-8 space-y-8">
      {/* Content */}
    </div>
  )
}
```

### Loading States
Every page should have a loading.tsx:

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8 space-y-8">
      <Skeleton className="h-10 w-48" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  )
}
```

### Error States
Every route should have an error.tsx:

```tsx
"use client"

import { Button } from "@/components/ui/button"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

# ============================================================================
# SECTION 4: LAYOUTS
# ============================================================================

## Dashboard Layout Pattern

```tsx
// app/(dashboard)/layout.tsx
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0" />
      <main className="flex-1 lg:pl-64 py-6">
        {children}
      </main>
    </div>
  )
}
```

## Marketing Layout Pattern

```tsx
// app/(marketing)/layout.tsx
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

## Responsive Patterns

```tsx
// Container
<div className="container py-8">

// Responsive grid
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// Stack with spacing
<div className="space-y-8">
```

# ============================================================================
# SECTION 5: FORMS
# ============================================================================

## Form Stack
- react-hook-form for state management
- zod for validation
- shadcn/ui Form components for UI

## Standard Form Pattern

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  })

  async function onSubmit(values: FormValues) {
    // Handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
```

## Form in Card Pattern

```tsx
<Card>
  <CardHeader>
    <CardTitle>Form Title</CardTitle>
    <CardDescription>Form description</CardDescription>
  </CardHeader>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {/* Fields */}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">Save</Button>
      </CardFooter>
    </form>
  </Form>
</Card>
```

# ============================================================================
# SECTION 6: COMPONENTS
# ============================================================================

## Always Use shadcn/ui For:
- Buttons → `@/components/ui/button`
- Cards → `@/components/ui/card`
- Inputs → `@/components/ui/input`
- Forms → `@/components/ui/form`
- Dialogs/Modals → `@/components/ui/dialog`
- Dropdowns → `@/components/ui/dropdown-menu`
- Tables → `@/components/ui/table`
- Tabs → `@/components/ui/tabs`
- Toasts → `sonner`

## Component Pattern

```tsx
import { cn } from "@/lib/utils"

interface ComponentProps {
  className?: string
  children: React.ReactNode
}

export function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  )
}
```

## Icons
Use Lucide React:

```tsx
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"

<Plus className="h-4 w-4" />
<Loader2 className="h-4 w-4 animate-spin" />
```

# ============================================================================
# END OF RULES
# ============================================================================
```

---

## Quick Reference Card

| I want to... | Use Prompt # | Key Section |
|--------------|--------------|-------------|
| Start a new project | 01 | CORE RULES |
| Create a page | 10, 11 | PAGES |
| Create a component | 20, 21 | COMPONENTS |
| Create a form | 30, 31 | FORMS |
| Update layout | 40, 41 | LAYOUTS |
| Fix styling issues | 60 | CORE RULES |
| Migrate existing repo | 70 | All |
| Rebuild from URL | 80 | All |

---

## Files You Have

| File | Purpose | Where It Lives |
|------|---------|----------------|
| `design-system-configurator.zip` | App to create design configs | Deploy to Vercel |
| `yoonet-nextjs-stack.skill` | Original skill (for reference) | Archive |
| `yoonet-prompt-library.md` | All numbered prompts | Paste app |
| `website-rebuild-pipeline.skill` | URL rebuild skill | Reference |
| `.cursorrules` template | Above template | Every project root |

---

## Checklist: Getting Started

### One-Time Setup
- [ ] Deploy design-system-configurator to Vercel
- [ ] Bookmark the configurator URL
- [ ] Save .cursorrules template somewhere accessible
- [ ] Set up prompts in Paste app (numbered 01-85)

### Per-Project Setup
- [ ] Open configurator, set fonts/colours/components
- [ ] Copy markdown output
- [ ] Create `.cursorrules` in project root
- [ ] Paste design system into Section 2
- [ ] Start building with numbered prompts

---

## Example Workflow

**Starting Allied Flow project:**

1. Open `design-system-configurator.vercel.app`
2. Set:
   - Heading: Plus Jakarta Sans
   - Body: DM Sans
   - Colours: Ocean Blue preset
   - Components: Essential + table + accordion
3. Copy markdown
4. In project: create `.cursorrules`
5. Paste template, add design system to Section 2
6. Use Prompt 01 to scaffold
7. Use Prompt 10 to create pages
8. Use Prompt 30 for forms
9. Everything stays consistent ✓
