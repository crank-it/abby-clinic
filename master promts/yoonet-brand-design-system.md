# YOONET BRAND DESIGN SYSTEM
# Paste this into Section 2 of your .cursorrules file

## Typography

### Fonts

| Purpose | Font Family | Category | Style |
|---------|-------------|----------|-------|
| Headings & Buttons | Dosis | sans-serif | Bold, friendly, rounded |
| Body Text | Lato | sans-serif | Clean, readable |
| Mono | JetBrains Mono | monospace | Code blocks |

### Font Setup (layout.tsx)

```tsx
import { Dosis, Lato } from "next/font/google"

const dosis = Dosis({ 
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
})

const lato = Lato({ 
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"]
})

// In <body>:
<body className={`${dosis.variable} ${lato.variable} font-body antialiased`}>
```

### Tailwind Config Addition

```ts
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      heading: ["var(--font-heading)", "sans-serif"],
      body: ["var(--font-body)", "sans-serif"],
    },
  },
}
```

### Typography Usage

```tsx
// Brand title (H1)
<h1 className="font-heading text-3xl font-bold text-primary">

// Step/Section title (H2)  
<h2 className="font-heading text-2xl font-bold text-foreground">

// Subtitle
<p className="text-[15px] text-foreground">

// Question text
<p className="text-[17px] font-bold text-foreground">

// Body/Option labels
<p className="text-[17px] text-foreground">

// Small/muted text
<p className="text-sm text-muted-foreground">

// Button text
<span className="font-heading font-bold">
```

---

## Colour Palette

### CSS Variables (globals.css)

```css
@layer base {
  :root {
    /* Yoonet Brand Colours */
    --background: 230 25% 97%;        /* #F6F7FB - page background */
    --foreground: 230 16% 50%;        /* #6b7094 - primary text */
    
    --card: 0 0% 100%;                /* #FFFFFF - panel/card background */
    --card-foreground: 230 16% 50%;   /* #6b7094 */
    
    --primary: 230 100% 77%;          /* #8A9EFF - brand blue */
    --primary-foreground: 0 0% 100%;  /* white text on primary */
    
    --secondary: 230 33% 93%;         /* #E3E8EF - neutral backgrounds */
    --secondary-foreground: 230 16% 50%;
    
    --muted: 230 25% 97%;             /* #F6F7FB */
    --muted-foreground: 226 10% 65%;  /* #9BA1B4 - secondary text */
    
    --accent: 343 94% 68%;            /* #FA6492 - pink accent */
    --accent-foreground: 0 0% 100%;
    
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    
    --border: 228 25% 92%;            /* #E6E8EF */
    --input: 228 25% 92%;
    --ring: 230 100% 77%;             /* brand blue for focus */
    
    --radius: 1rem;                   /* 16px - Yoonet uses rounded corners */
  }
}
```

### Colour Reference

| Variable | Hex | Yoonet Name | Usage |
|----------|-----|-------------|-------|
| --primary | #8A9EFF | Brand Blue | Primary buttons, links, titles, CTAs |
| --accent | #FA6492 | Pink Accent | Progress bars, alerts, highlights |
| --foreground | #6b7094 | Primary Text | Main body text |
| --muted-foreground | #9BA1B4 | Muted | Secondary text, placeholders |
| --background | #F6F7FB | Page BG | Page backgrounds |
| --card | #FFFFFF | Panel | Cards, panels, modals |
| --border | #E6E8EF | Border | Borders, dividers |
| --secondary | #E3E8EF | Neutral | Neutral button backgrounds |

### Yoonet Gradient Background

For landing pages and marketing:

```tsx
// Full page gradient background
<div className="min-h-screen bg-gradient-to-br from-[#f0f2f8] via-[#fafafc] to-[#f5f6fb] bg-fixed">

// Or as a class in globals.css:
.yoonet-gradient {
  background: linear-gradient(135deg, #f0f2f8 0%, #fafafc 50%, #f5f6fb 100%);
  background-attachment: fixed;
}
```

### Progress Bar Gradient

```tsx
// Yoonet brand progress bar
<div className="h-2 rounded-full bg-border overflow-hidden">
  <div 
    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## Shadows

```tsx
// Small shadow (cards, buttons)
className="shadow-[0_6px_18px_rgba(31,41,55,0.08)]"

// Medium shadow (elevated cards, modals)
className="shadow-[0_10px_30px_rgba(31,41,55,0.12)]"

// Or add to Tailwind config:
boxShadow: {
  'yoonet-sm': '0 6px 18px rgba(31,41,55,0.08)',
  'yoonet-md': '0 10px 30px rgba(31,41,55,0.12)',
}
```

---

## Components (shadcn/ui)

### Install Command

```bash
npx shadcn@latest add button card input textarea form label select dialog sheet skeleton sonner tabs avatar badge progress
```

### Yoonet Button Variants

Override in `components/ui/button.tsx` or use classes:

```tsx
// Primary (Brand Blue)
<Button className="bg-primary hover:bg-primary/90 font-heading font-bold">

// Secondary (Neutral)
<Button variant="secondary" className="font-heading font-bold">

// With Yoonet hover effect
<Button className="transition-all hover:-translate-y-0.5 hover:shadow-yoonet-md active:translate-y-0.5">
```

### Yoonet Card Pattern

```tsx
<Card className="border-border bg-card shadow-yoonet-md rounded-2xl">
  <CardHeader>
    <CardTitle className="font-heading text-2xl font-bold text-foreground">
      Title Here
    </CardTitle>
    <CardDescription className="text-[15px] text-foreground">
      Description here
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Yoonet Input Pattern

```tsx
<Input 
  className="rounded-xl border-border focus:border-primary focus:ring-primary/20"
  placeholder="Enter text..."
/>
```

---

## Brand Assets

### Logo URL
```
https://s3.amazonaws.com/appforest_uf/f1679452072099x521288658380311800/yoonet-bubble-app-square-logo.svg
```

### Logo Component

```tsx
export function YoonetLogo({ className }: { className?: string }) {
  return (
    <img 
      src="https://s3.amazonaws.com/appforest_uf/f1679452072099x521288658380311800/yoonet-bubble-app-square-logo.svg"
      alt="Yoonet"
      className={cn("h-10 w-auto", className)}
    />
  )
}
```

---

## Quick Reference

### Yoonet Styling Cheatsheet

| Element | Classes |
|---------|---------|
| Brand title | `font-heading text-3xl font-bold text-primary` |
| Section title | `font-heading text-2xl font-bold text-foreground` |
| Body text | `text-[17px] text-foreground` |
| Muted text | `text-sm text-muted-foreground` |
| Card | `bg-card border-border rounded-2xl shadow-yoonet-md` |
| Primary button | `bg-primary text-primary-foreground font-heading font-bold` |
| Input | `rounded-xl border-border` |
| Page background | `bg-background` or gradient |
| Progress bar fill | `bg-gradient-to-r from-primary to-accent` |

### Yoonet Spacing

- Border radius: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for buttons/inputs
- Card padding: `p-8` (32px)
- Section gaps: `space-y-8` or `gap-8`
- Max content width: `max-w-3xl` (800px)

### Interactive States

```tsx
// Hover lift effect
className="transition-all hover:-translate-y-0.5 hover:shadow-yoonet-md"

// Active press effect
className="active:translate-y-0.5 active:shadow-yoonet-sm"

// Selected state (for option buttons)
className="border-primary bg-primary/10 shadow-[0_0_0_2px_rgba(138,158,255,0.3)]"
```

---

## Do's and Don'ts

### DO ✅
- Use Dosis for headings and buttons
- Use Lato for body text
- Use rounded corners everywhere (16px cards, 12px buttons)
- Use the gradient background for marketing pages
- Use brand blue (#8A9EFF) for primary actions
- Use pink accent (#FA6492) for progress/highlights
- Add hover lift effects to buttons and cards
- Keep max-width at 800px for content

### DON'T ❌
- Don't use sharp corners
- Don't use fonts other than Dosis/Lato
- Don't use green for CTAs (use brand blue)
- Don't forget hover states
- Don't use text smaller than 14px for body content
