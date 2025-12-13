# 80 - Website Rebuild Pipeline

## The Prompt

```
I want to rebuild a website using our pipeline.

**Source URL**: [URL TO SCRAPE]

**Project name**: [NAME FOR NEW PROJECT]

**Target audience**: [WHO IS THIS FOR]

**Primary goal**: [MAIN CONVERSION ACTION - e.g., book a call, get a quote, sign up]

---

## Please follow the 4-phase pipeline:

### Phase 1: Scrape
- Fetch all pages from the source URL
- Extract content, structure, images, forms, social proof
- Create a content inventory
- **Stop and show me what you found before proceeding**

### Phase 2: Rewrite  
- Improve all copy for clarity and conversion
- Optimise for SEO (titles, descriptions, keywords)
- Strengthen CTAs and value propositions
- Apply Problem → Solution → Proof → Action structure
- **Stop and show me the rewritten content before proceeding**

### Phase 3: Build
- Create page blueprints for each page
- Define component structure
- Plan responsive layouts
- Map content to sections
- **Stop and show me the blueprints before proceeding**

### Phase 4: Package
- Generate complete Next.js codebase
- Use Tailwind CSS only (no custom CSS)
- Use shadcn/ui components
- Create centralised content file
- Output ready for Yoonet stack

---

## Output requirements:
- Next.js 14+ (App Router)
- Tailwind CSS only — NO custom CSS
- shadcn/ui components
- TypeScript throughout
- Mobile-first responsive
- SEO metadata on all pages
- Centralised content file for easy editing

---

## Checkpoints:
Please pause after each phase and summarise:
1. What was done
2. Key decisions made
3. Anything that needs my input
4. Confirmation to proceed

Let's start with Phase 1.
```

---

## Quick Version

```
Rebuild this website: [URL]

Project name: [NAME]
Audience: [WHO]
Goal: [CONVERSION ACTION]

Run the full pipeline:
1. Scrape — extract all content
2. Rewrite — optimise for sales + SEO  
3. Build — create modern page structures
4. Package — output as Next.js + Tailwind + shadcn

Pause after each phase for my review.

Output must be:
- Tailwind only (no custom CSS)
- shadcn/ui components
- Ready for Yoonet stack

Start with Phase 1.
```

---

## Run All (No Checkpoints)

```
Rebuild this website end-to-end: [URL]

Project name: [NAME]
Audience: [WHO]  
Goal: [CONVERSION ACTION]

Run all 4 phases without stopping:
1. Scrape
2. Rewrite
3. Build
4. Package

Output complete Next.js codebase using:
- Tailwind only (no custom CSS)
- shadcn/ui components
- Centralised content file

Go.
```

---

## Phase-Specific Follow-ups

### 81 - Proceed to Next Phase
```
That looks good. Proceed to Phase [NUMBER].

[Any specific feedback or changes:]
```

### 82 - Revise Current Phase
```
Before proceeding, please revise:

Phase: [CURRENT PHASE]
Issue: [WHAT NEEDS CHANGING]
Desired outcome: [WHAT I WANT INSTEAD]
```

### 83 - Skip to Packaging
```
The content and structure look good. Skip ahead to Phase 4 (Package) and generate the final codebase.

Remember:
- Tailwind only
- shadcn/ui components
- Centralised content file
```

### 84 - Add Page to Rebuild
```
Add an additional page to the rebuild:

Page type: [e.g., pricing, FAQ, blog, team]
Content source: [URL if scraping, or "I'll provide"]
Purpose: [What this page does]

Apply the same pipeline:
1. Extract/gather content
2. Rewrite for conversion
3. Create blueprint
4. Package as component
```

### 85 - Adjust Tone/Voice
```
The content needs a tone adjustment.

Current tone: [How it reads now]
Desired tone: [How it should read]

Examples of desired voice:
- [Example phrase 1]
- [Example phrase 2]

Please revise the Phase 2 content with this voice.
```

---

## Notes

- Always provide the source URL
- Be specific about target audience and conversion goal
- Review each phase output before proceeding
- The "Run All" version is faster but less controlled
- Final output is ready to drop into your Yoonet stack
