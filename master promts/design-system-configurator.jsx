import React, { useState } from 'react';
import { Check, Copy, Download, Plus, X, Palette, Type, Layout, Eye } from 'lucide-react';

// Popular Google Fonts for web
const popularFonts = [
  { name: 'Inter', category: 'sans-serif', style: 'Clean & Modern' },
  { name: 'DM Sans', category: 'sans-serif', style: 'Friendly & Geometric' },
  { name: 'Plus Jakarta Sans', category: 'sans-serif', style: 'Professional & Contemporary' },
  { name: 'Manrope', category: 'sans-serif', style: 'Technical & Precise' },
  { name: 'Space Grotesk', category: 'sans-serif', style: 'Bold & Distinctive' },
  { name: 'Outfit', category: 'sans-serif', style: 'Versatile & Balanced' },
  { name: 'Sora', category: 'sans-serif', style: 'Futuristic & Open' },
  { name: 'Poppins', category: 'sans-serif', style: 'Geometric & Friendly' },
  { name: 'Nunito', category: 'sans-serif', style: 'Rounded & Warm' },
  { name: 'Work Sans', category: 'sans-serif', style: 'Optimised for Screens' },
  { name: 'Bricolage Grotesque', category: 'sans-serif', style: 'Playful & Unique' },
  { name: 'Instrument Sans', category: 'sans-serif', style: 'Sharp & Modern' },
  { name: 'Geist', category: 'sans-serif', style: 'Vercel\'s Clean Choice' },
  { name: 'Playfair Display', category: 'serif', style: 'Elegant & Editorial' },
  { name: 'Lora', category: 'serif', style: 'Contemporary Serif' },
  { name: 'Fraunces', category: 'serif', style: 'Quirky & Expressive' },
  { name: 'Libre Baskerville', category: 'serif', style: 'Classic & Readable' },
  { name: 'Source Serif 4', category: 'serif', style: 'Professional & Clear' },
  { name: 'JetBrains Mono', category: 'monospace', style: 'Developer Favourite' },
  { name: 'Fira Code', category: 'monospace', style: 'Ligatures & Clean' },
];

// shadcn/ui components
const shadcnComponents = [
  { name: 'accordion', category: 'Data Display', description: 'Expandable content sections' },
  { name: 'alert', category: 'Feedback', description: 'Contextual feedback messages' },
  { name: 'alert-dialog', category: 'Overlay', description: 'Modal for confirmations' },
  { name: 'aspect-ratio', category: 'Layout', description: 'Maintain aspect ratios' },
  { name: 'avatar', category: 'Data Display', description: 'User profile images' },
  { name: 'badge', category: 'Data Display', description: 'Status indicators & labels' },
  { name: 'breadcrumb', category: 'Navigation', description: 'Page hierarchy navigation' },
  { name: 'button', category: 'Forms', description: 'Clickable actions', essential: true },
  { name: 'calendar', category: 'Forms', description: 'Date picker calendar' },
  { name: 'card', category: 'Layout', description: 'Content containers', essential: true },
  { name: 'carousel', category: 'Data Display', description: 'Sliding content' },
  { name: 'checkbox', category: 'Forms', description: 'Boolean selection' },
  { name: 'collapsible', category: 'Data Display', description: 'Toggle content visibility' },
  { name: 'command', category: 'Forms', description: 'Command palette / search' },
  { name: 'context-menu', category: 'Navigation', description: 'Right-click menus' },
  { name: 'dialog', category: 'Overlay', description: 'Modal dialogs', essential: true },
  { name: 'drawer', category: 'Overlay', description: 'Slide-out panels' },
  { name: 'dropdown-menu', category: 'Navigation', description: 'Dropdown actions', essential: true },
  { name: 'form', category: 'Forms', description: 'Form handling with validation', essential: true },
  { name: 'hover-card', category: 'Data Display', description: 'Hover-triggered cards' },
  { name: 'input', category: 'Forms', description: 'Text input fields', essential: true },
  { name: 'label', category: 'Forms', description: 'Form field labels', essential: true },
  { name: 'menubar', category: 'Navigation', description: 'Horizontal menu bar' },
  { name: 'navigation-menu', category: 'Navigation', description: 'Site navigation' },
  { name: 'pagination', category: 'Navigation', description: 'Page navigation' },
  { name: 'popover', category: 'Overlay', description: 'Floating content' },
  { name: 'progress', category: 'Feedback', description: 'Progress indicators' },
  { name: 'radio-group', category: 'Forms', description: 'Single selection from options' },
  { name: 'scroll-area', category: 'Layout', description: 'Custom scrollbars' },
  { name: 'select', category: 'Forms', description: 'Dropdown selection', essential: true },
  { name: 'separator', category: 'Layout', description: 'Visual dividers' },
  { name: 'sheet', category: 'Overlay', description: 'Side panel overlay', essential: true },
  { name: 'skeleton', category: 'Feedback', description: 'Loading placeholders', essential: true },
  { name: 'slider', category: 'Forms', description: 'Range selection' },
  { name: 'sonner', category: 'Feedback', description: 'Toast notifications', essential: true },
  { name: 'switch', category: 'Forms', description: 'Toggle switches' },
  { name: 'table', category: 'Data Display', description: 'Data tables', essential: true },
  { name: 'tabs', category: 'Navigation', description: 'Tabbed content', essential: true },
  { name: 'textarea', category: 'Forms', description: 'Multi-line text input', essential: true },
  { name: 'tooltip', category: 'Data Display', description: 'Hover information' },
  { name: 'toggle', category: 'Forms', description: 'Toggle buttons' },
  { name: 'toggle-group', category: 'Forms', description: 'Grouped toggles' },
];

// Preset colour palettes
const colorPresets = [
  {
    name: 'Slate Professional',
    colors: {
      background: '#ffffff',
      foreground: '#0f172a',
      primary: '#0f172a',
      primaryForeground: '#f8fafc',
      secondary: '#f1f5f9',
      secondaryForeground: '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      accent: '#f1f5f9',
      accentForeground: '#0f172a',
      destructive: '#ef4444',
      border: '#e2e8f0',
    }
  },
  {
    name: 'Ocean Blue',
    colors: {
      background: '#ffffff',
      foreground: '#0c4a6e',
      primary: '#0284c7',
      primaryForeground: '#ffffff',
      secondary: '#e0f2fe',
      secondaryForeground: '#0c4a6e',
      muted: '#f0f9ff',
      mutedForeground: '#0369a1',
      accent: '#bae6fd',
      accentForeground: '#0c4a6e',
      destructive: '#dc2626',
      border: '#bae6fd',
    }
  },
  {
    name: 'Forest Green',
    colors: {
      background: '#ffffff',
      foreground: '#14532d',
      primary: '#16a34a',
      primaryForeground: '#ffffff',
      secondary: '#dcfce7',
      secondaryForeground: '#14532d',
      muted: '#f0fdf4',
      mutedForeground: '#15803d',
      accent: '#bbf7d0',
      accentForeground: '#14532d',
      destructive: '#dc2626',
      border: '#bbf7d0',
    }
  },
  {
    name: 'Warm Coral',
    colors: {
      background: '#fffbeb',
      foreground: '#78350f',
      primary: '#f59e0b',
      primaryForeground: '#78350f',
      secondary: '#fef3c7',
      secondaryForeground: '#78350f',
      muted: '#fef9c3',
      mutedForeground: '#a16207',
      accent: '#fde68a',
      accentForeground: '#78350f',
      destructive: '#dc2626',
      border: '#fcd34d',
    }
  },
  {
    name: 'Purple Luxe',
    colors: {
      background: '#faf5ff',
      foreground: '#3b0764',
      primary: '#9333ea',
      primaryForeground: '#ffffff',
      secondary: '#f3e8ff',
      secondaryForeground: '#3b0764',
      muted: '#faf5ff',
      mutedForeground: '#7e22ce',
      accent: '#e9d5ff',
      accentForeground: '#3b0764',
      destructive: '#dc2626',
      border: '#d8b4fe',
    }
  },
  {
    name: 'Dark Mode',
    colors: {
      background: '#09090b',
      foreground: '#fafafa',
      primary: '#fafafa',
      primaryForeground: '#18181b',
      secondary: '#27272a',
      secondaryForeground: '#fafafa',
      muted: '#27272a',
      mutedForeground: '#a1a1aa',
      accent: '#27272a',
      accentForeground: '#fafafa',
      destructive: '#ef4444',
      border: '#27272a',
    }
  },
];

export default function DesignSystemConfigurator() {
  const [activeTab, setActiveTab] = useState('fonts');
  const [headingFont, setHeadingFont] = useState(popularFonts[0]);
  const [bodyFont, setBodyFont] = useState(popularFonts[0]);
  const [monoFont, setMonoFont] = useState(popularFonts.find(f => f.category === 'monospace'));
  const [selectedComponents, setSelectedComponents] = useState(
    shadcnComponents.filter(c => c.essential).map(c => c.name)
  );
  const [colors, setColors] = useState(colorPresets[0].colors);
  const [projectName, setProjectName] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleComponent = (name) => {
    setSelectedComponents(prev => 
      prev.includes(name) 
        ? prev.filter(c => c !== name)
        : [...prev, name]
    );
  };

  const selectAllInCategory = (category) => {
    const categoryComponents = shadcnComponents.filter(c => c.category === category).map(c => c.name);
    const allSelected = categoryComponents.every(c => selectedComponents.includes(c));
    
    if (allSelected) {
      setSelectedComponents(prev => prev.filter(c => !categoryComponents.includes(c)));
    } else {
      setSelectedComponents(prev => [...new Set([...prev, ...categoryComponents])]);
    }
  };

  const generateMarkdown = () => {
    const md = `# Design System Configuration
${projectName ? `\n**Project**: ${projectName}\n` : ''}
Generated: ${new Date().toISOString().split('T')[0]}

## Typography

### Fonts

| Purpose | Font Family | Category | Import |
|---------|-------------|----------|--------|
| Headings | ${headingFont.name} | ${headingFont.category} | \`import { ${headingFont.name.replace(/\s+/g, '_')} } from "next/font/google"\` |
| Body | ${bodyFont.name} | ${bodyFont.category} | \`import { ${bodyFont.name.replace(/\s+/g, '_')} } from "next/font/google"\` |
| Mono | ${monoFont.name} | ${monoFont.category} | \`import { ${monoFont.name.replace(/\s+/g, '_')} } from "next/font/google"\` |

### Font Setup (layout.tsx)

\`\`\`tsx
import { ${headingFont.name.replace(/\s+/g, '_')}${headingFont.name !== bodyFont.name ? `, ${bodyFont.name.replace(/\s+/g, '_')}` : ''} } from "next/font/google"

const heading = ${headingFont.name.replace(/\s+/g, '_')}({ 
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
})

const body = ${bodyFont.name.replace(/\s+/g, '_')}({ 
  subsets: ["latin"],
  variable: "--font-body" 
})

// In <body>:
<body className={\`\${heading.variable} \${body.variable} font-body\`}>
\`\`\`

### Tailwind Config Addition

\`\`\`ts
// tailwind.config.ts
fontFamily: {
  heading: ["var(--font-heading)", "${headingFont.category}"],
  body: ["var(--font-body)", "${bodyFont.category}"],
  mono: ["var(--font-mono)", "monospace"],
}
\`\`\`

### Usage

- Headings: \`className="font-heading"\`
- Body text: Uses font-body by default
- Code: \`className="font-mono"\`

---

## Colour Palette

### CSS Variables (globals.css)

\`\`\`css
@layer base {
  :root {
    --background: ${hexToHsl(colors.background)};
    --foreground: ${hexToHsl(colors.foreground)};
    --primary: ${hexToHsl(colors.primary)};
    --primary-foreground: ${hexToHsl(colors.primaryForeground)};
    --secondary: ${hexToHsl(colors.secondary)};
    --secondary-foreground: ${hexToHsl(colors.secondaryForeground)};
    --muted: ${hexToHsl(colors.muted)};
    --muted-foreground: ${hexToHsl(colors.mutedForeground)};
    --accent: ${hexToHsl(colors.accent)};
    --accent-foreground: ${hexToHsl(colors.accentForeground)};
    --destructive: ${hexToHsl(colors.destructive)};
    --destructive-foreground: 0 0% 100%;
    --border: ${hexToHsl(colors.border)};
    --input: ${hexToHsl(colors.border)};
    --ring: ${hexToHsl(colors.primary)};
    --radius: 0.5rem;
  }
}
\`\`\`

### Colour Reference

| Variable | Hex | Usage |
|----------|-----|-------|
| background | ${colors.background} | Page backgrounds |
| foreground | ${colors.foreground} | Primary text |
| primary | ${colors.primary} | Buttons, links, CTAs |
| primary-foreground | ${colors.primaryForeground} | Text on primary |
| secondary | ${colors.secondary} | Secondary backgrounds |
| muted | ${colors.muted} | Subtle backgrounds |
| muted-foreground | ${colors.mutedForeground} | Secondary text |
| accent | ${colors.accent} | Highlights |
| destructive | ${colors.destructive} | Errors, delete actions |
| border | ${colors.border} | Borders, dividers |

### Usage Examples

\`\`\`tsx
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
\`\`\`

---

## Components (shadcn/ui)

### Install Command

\`\`\`bash
npx shadcn@latest add ${selectedComponents.join(' ')}
\`\`\`

### Selected Components (${selectedComponents.length})

${Object.entries(
  selectedComponents.reduce((acc, comp) => {
    const component = shadcnComponents.find(c => c.name === comp);
    if (component) {
      if (!acc[component.category]) acc[component.category] = [];
      acc[component.category].push(component);
    }
    return acc;
  }, {})
).map(([category, components]) => `
**${category}**
${components.map(c => `- \`${c.name}\` — ${c.description}`).join('\n')}`).join('\n')}

### Import Pattern

\`\`\`tsx
// Always import from @/components/ui/
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
\`\`\`

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
`;
    return md;
  };

  const hexToHsl = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0 0% 0%';
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([generateMarkdown()], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName || 'design-system'}.md`;
    a.click();
  };

  const categories = [...new Set(shadcnComponents.map(c => c.category))];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Design System Configurator</h1>
          <p className="text-zinc-400">Configure fonts, colours, and components. Export as MD for your skill system.</p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Project name (optional)"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'fonts', label: 'Typography', icon: Type },
            { id: 'colors', label: 'Colours', icon: Palette },
            { id: 'components', label: 'Components', icon: Layout },
            { id: 'preview', label: 'Preview & Export', icon: Eye },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-zinc-100 text-zinc-900' 
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Fonts Tab */}
        {activeTab === 'fonts' && (
          <div className="space-y-8">
            {[
              { label: 'Heading Font', value: headingFont, setter: setHeadingFont, filter: null },
              { label: 'Body Font', value: bodyFont, setter: setBodyFont, filter: null },
              { label: 'Monospace Font', value: monoFont, setter: setMonoFont, filter: 'monospace' },
            ].map(({ label, value, setter, filter }) => (
              <div key={label}>
                <h3 className="text-lg font-semibold mb-3">{label}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {popularFonts
                    .filter(f => !filter || f.category === filter)
                    .map(font => (
                      <button
                        key={font.name}
                        onClick={() => setter(font)}
                        className={`p-4 rounded-lg border text-left transition-all ${
                          value?.name === font.name
                            ? 'border-zinc-100 bg-zinc-900'
                            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                        }`}
                      >
                        <div className="font-medium">{font.name}</div>
                        <div className="text-xs text-zinc-500 mt-1">{font.style}</div>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Colours Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Presets</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {colorPresets.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => setColors(preset.colors)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      JSON.stringify(colors) === JSON.stringify(preset.colors)
                        ? 'border-zinc-100'
                        : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex gap-1 mb-2">
                      {[preset.colors.primary, preset.colors.secondary, preset.colors.accent, preset.colors.background].map((c, i) => (
                        <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="font-medium">{preset.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Customise</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(colors).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm text-zinc-400 block mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => setColors(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setColors(prev => ({ ...prev, [key]: e.target.value }))}
                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2 text-sm font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400">Selected: {selectedComponents.length} components</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedComponents(shadcnComponents.filter(c => c.essential).map(c => c.name))}
                  className="text-sm px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
                >
                  Reset to Essentials
                </button>
                <button
                  onClick={() => setSelectedComponents(shadcnComponents.map(c => c.name))}
                  className="text-sm px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
                >
                  Select All
                </button>
              </div>
            </div>

            {categories.map(category => (
              <div key={category}>
                <button
                  onClick={() => selectAllInCategory(category)}
                  className="text-lg font-semibold mb-3 flex items-center gap-2 hover:text-zinc-300"
                >
                  {category}
                  <span className="text-xs text-zinc-500 font-normal">
                    ({shadcnComponents.filter(c => c.category === category && selectedComponents.includes(c.name)).length}/
                    {shadcnComponents.filter(c => c.category === category).length})
                  </span>
                </button>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {shadcnComponents.filter(c => c.category === category).map(comp => (
                    <button
                      key={comp.name}
                      onClick={() => toggleComponent(comp.name)}
                      className={`p-3 rounded-lg border text-left text-sm transition-all ${
                        selectedComponents.includes(comp.name)
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono">{comp.name}</span>
                        {selectedComponents.includes(comp.name) && <Check size={14} className="text-emerald-500" />}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">{comp.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 font-medium hover:bg-zinc-200"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Markdown'}
              </button>
              <button
                onClick={downloadMarkdown}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
              >
                <Download size={18} />
                Download .md
              </button>
            </div>

            <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-mono overflow-auto max-h-[600px]">
                {generateMarkdown()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
