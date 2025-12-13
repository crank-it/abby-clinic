# Design System Configuration

**Project**: Allied Flow

Generated: 2025-01-15

## Typography

### Fonts

| Purpose | Font Family | Category | Import |
|---------|-------------|----------|--------|
| Headings | Plus Jakarta Sans | sans-serif | `import { Plus_Jakarta_Sans } from "next/font/google"` |
| Body | DM Sans | sans-serif | `import { DM_Sans } from "next/font/google"` |
| Mono | JetBrains Mono | monospace | `import { JetBrains_Mono } from "next/font/google"` |

### Font Setup (layout.tsx)

```tsx
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google"

const heading = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
})

const body = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-body" 
})

// In <body>:
<body className={`${heading.variable} ${body.variable} font-body`}>
```

### Tailwind Config Addition

```ts
// tailwind.config.ts
fontFamily: {
  heading: ["var(--font-heading)", "sans-serif"],
  body: ["var(--font-body)", "sans-serif"],
  mono: ["var(--font-mono)", "monospace"],
}
```

### Usage

- Headings: `className="font-heading"`
- Body text: Uses font-body by default
- Code: `className="font-mono"`

---

## Colour Palette

### CSS Variables (globals.css)

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 210 40% 11%;
    --primary: 199 89% 48%;
    --primary-foreground: 0 0% 100%;
    --secondary: 199 95% 93%;
    --secondary-foreground: 200 98% 22%;
    --muted: 199 100% 97%;
    --mutedForeground: 200 90% 32%;
    --accent: 199 92% 84%;
    --accent-foreground: 200 98% 22%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border: 199 92% 84%;
    --input: 199 92% 84%;
    --ring: 199 89% 48%;
    --radius: 0.5rem;
  }
}
```

### Colour Reference

| Variable | Hex | Usage |
|----------|-----|-------|
| background | #ffffff | Page backgrounds |
| foreground | #0c4a6e | Primary text |
| primary | #0284c7 | Buttons, links, CTAs |
| primary-foreground | #ffffff | Text on primary |
| secondary | #e0f2fe | Secondary backgrounds |
| muted | #f0f9ff | Subtle backgrounds |
| muted-foreground | #0369a1 | Secondary text |
| accent | #bae6fd | Highlights |
| destructive | #dc2626 | Errors, delete actions |
| border | #bae6fd | Borders, dividers |

### Usage Examples

```tsx
// Backgrounds
<div className="bg-background">      // Main page
<div className="bg-primary">         // CTA sections
<div className="bg-secondary">       // Cards, subtle areas
<div className="bg-muted">           // Very subtle backgrounds

// Text
<p className="text-foreground">      // Primary text
<p className="text-muted-foreground"> // Secondary text
<p className="text-primary">         // Accent/link text

// Borders
<div className="border border-border">
<div className="border-primary">     // Emphasised borders
```

---

## Components (shadcn/ui)

### Install Command

```bash
npx shadcn@latest add button card dialog dropdown-menu form input label select sheet skeleton sonner table tabs textarea
```

### Selected Components (14)

**Forms**
- `button` — Clickable actions
- `form` — Form handling with validation
- `input` — Text input fields
- `label` — Form field labels
- `select` — Dropdown selection
- `textarea` — Multi-line text input

**Layout**
- `card` — Content containers

**Navigation**
- `dropdown-menu` — Dropdown actions
- `tabs` — Tabbed content

**Overlay**
- `dialog` — Modal dialogs
- `sheet` — Side panel overlay

**Feedback**
- `skeleton` — Loading placeholders
- `sonner` — Toast notifications

**Data Display**
- `table` — Data tables

### Import Pattern

```tsx
// Always import from @/components/ui/
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
```

---

## Quick Reference

### Do's
- Use Tailwind classes for ALL styling
- Use these fonts consistently (heading for h1-h6, body for paragraphs)
- Use CSS variables via Tailwind (bg-primary, text-muted-foreground)
- Import components from @/components/ui/

### Don'ts
- No custom CSS files
- No inline style={{}} props  
- No CSS modules
- Don't recreate components that exist in shadcn/ui
- Don't use fonts outside this system

---

*This design system file should be included as a reference in your development skill.*
