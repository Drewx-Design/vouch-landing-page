# Vouch Design System Implementation

**Type:** ✨ Feature
**Priority:** High
**Complexity:** Moderate (Streamlined)

---

## Overview

Implement a focused design system for Vouch's landing page that demonstrates the design quality principles Vouch enforces. This is credibility-critical: a design linter with sloppy design tokens is like a spell-checker with typos.

**Scope:** Foundation only. No component library, no dark mode, no semantic colors.

---

## Problem Statement

The current landing page has:
- Only 3 brand colors (insufficient for hover/active/focus states)
- Uses Inter font instead of the more technical IBM Plex
- Standard Tailwind grays (no plum tint for brand cohesion)

This creates a "thrown together" aesthetic rather than "designed with intention."

---

## What We're Building

| Include | Exclude (YAGNI) |
|---------|-----------------|
| 9 color tokens (4 brand + 5 neutral) | 90-token three-tier architecture |
| IBM Plex Sans font | Dark mode |
| 4-size typography system | Input component (no forms) |
| Two-layer plum-tinted shadows | Card component (divs work) |
| | Badge component (not used) |
| | Icon wrapper (Lucide is fine) |
| | Semantic colors (no error states) |

---

## Implementation

### 1. Color Tokens

**Base:** `#632D6B` → HSB(289°, 58%, 42%)

```css
/* app/globals.css */

@import "tailwindcss";

@theme inline {
  /* Brand (Wax Seal Plum) - Kennedy HSB rules applied */
  --color-plum-100: #E8D6EB;  /* focus rings, light backgrounds (B↑92%, S↓12%, H→292°) */
  --color-plum-500: #632D6B;  /* primary CTA - BASE */
  --color-plum-600: #512359;  /* hover (B↓35%, S↑65%, H→286°) */
  --color-plum-700: #401A47;  /* active/pressed (B↓28%, S↑72%, H→283°) */

  /* Neutrals (plum-tinted H:289°, S:4-5%) */
  --color-neutral-50:  #FAF9FA;  /* page background */
  --color-neutral-200: #DCD8DD;  /* borders, dividers */
  --color-neutral-400: #8B858D;  /* secondary text, icons */
  --color-neutral-600: #524D54;  /* primary text */
  --color-neutral-800: #2A262B;  /* headlines */

  /* Semantic aliases for Tailwind */
  --color-background: var(--color-neutral-50);
  --color-foreground: var(--color-neutral-800);
  --color-brand: var(--color-plum-500);
  --color-brand-hover: var(--color-plum-600);
  --color-brand-light: var(--color-plum-100);

  /* Typography */
  --font-sans: var(--font-ibm-plex), ui-sans-serif, system-ui, sans-serif;

  /* Shadows (two-layer, plum-tinted from plum-700) */
  --shadow-sm:
    0 1px 2px rgba(64, 26, 71, 0.06),
    0 1px 3px rgba(64, 26, 71, 0.04);
  --shadow-md:
    0 2px 4px rgba(64, 26, 71, 0.06),
    0 4px 8px rgba(64, 26, 71, 0.04);
  --shadow-lg:
    0 4px 8px rgba(64, 26, 71, 0.08),
    0 8px 16px rgba(64, 26, 71, 0.04);

  /* Focus ring */
  --shadow-focus: 0 0 0 3px var(--color-plum-100);
}
```

**Files to modify:** `app/globals.css:1-30`

---

### 2. Font Swap (IBM Plex Sans)

```tsx
/* app/layout.tsx */

import { IBM_Plex_Sans } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex',
  weight: ['400', '500', '600', '700'],
});

// In the html element:
<html lang="en" className={ibmPlexSans.variable}>
```

**Files to modify:** `app/layout.tsx:1-20`

---

### 3. Typography System (4 Sizes)

Enforce Kennedy's 4-size principle through consistent class usage:

| Level | Size | Weight | Use Case | Class Pattern |
|-------|------|--------|----------|---------------|
| Display | 40px | 600 | Hero headline | `text-4xl font-semibold` |
| Title | 24px | 600 | Section headers | `text-2xl font-semibold` |
| Body | 18px | 400 | Paragraphs | `text-lg` |
| Small | 14px | 500 | Labels, captions | `text-sm font-medium` |

No custom CSS variables needed - enforce through code review and Tailwind classes.

---

### 4. Class Migration

Replace standard Tailwind grays with plum-tinted neutrals:

| Current | Replace With |
|---------|--------------|
| `text-gray-900` | `text-neutral-800` |
| `text-gray-600` | `text-neutral-600` |
| `text-gray-500` | `text-neutral-400` |
| `bg-gray-50` | `bg-neutral-50` |
| `border-gray-200` | `border-neutral-200` |

**Files to update:**
- `components/sections/Hero.tsx`
- `components/sections/Features.tsx`
- `components/sections/HowItWorks.tsx`
- `components/sections/Problem.tsx`
- `components/sections/WhoItsFor.tsx`
- `components/sections/FAQ.tsx`
- `components/sections/FinalCTA.tsx`
- `components/Footer.tsx`
- `components/Header.tsx`

---

### 5. Button Update (Preserve API)

**Keep the existing link-based API.** Only update colors to use new tokens.

```tsx
/* components/Button.tsx */

const variants = {
  primary: 'bg-plum-500 text-white hover:bg-plum-600 active:bg-plum-700 focus:ring-2 focus:ring-plum-100 focus:ring-offset-2',
  secondary: 'bg-white text-neutral-800 hover:bg-neutral-50 focus:ring-2 focus:ring-plum-100',
}
```

**Do NOT change:** The `href`-based API, Link/anchor rendering, or add loading states.

---

### 6. Add `cn()` Utility

```tsx
/* lib/utils.ts */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```bash
npm install clsx tailwind-merge
```

---

## Acceptance Criteria

### Must Have
- [ ] IBM Plex Sans renders as primary font
- [ ] Brand color is `#632D6B` with correct hover/active states
- [ ] All grays replaced with plum-tinted neutrals
- [ ] Two-layer shadows use plum tint
- [ ] Button focus ring uses `--color-plum-100`

### Quality Gates
- [ ] Vouch design linter reports 0 critical violations on own landing page
- [ ] Lighthouse accessibility score: 100
- [ ] No layout shift on font load (CLS < 0.1)

---

## What We're NOT Building

| Feature | Why Not |
|---------|---------|
| Dark mode | Zero conversion value for landing page. Add when users request. |
| Input component | No forms exist on this page. |
| Card component | Simple divs with Tailwind work fine. |
| Badge component | Not used anywhere. |
| Semantic colors | No success/error/warning states needed. |
| Three-tier token architecture | Enterprise bloat for a 10-file project. |
| Icon wrapper | Lucide-react is already ergonomic. |

---

## File Change Summary

| File | Change |
|------|--------|
| `app/globals.css` | Replace CSS variables with 9-token system |
| `app/layout.tsx` | Swap Inter → IBM Plex Sans |
| `components/Button.tsx` | Update to plum-* classes |
| `components/Header.tsx` | gray-* → neutral-* |
| `components/Footer.tsx` | gray-* → neutral-* |
| `components/sections/*.tsx` (7 files) | gray-* → neutral-* |
| `lib/utils.ts` | NEW: Add cn() utility |
| `package.json` | Add clsx, tailwind-merge |

**Total: ~1-2 hours of focused work**

---

## The Credibility Test

Before shipping, run Vouch on the landing page. If the tool that enforces design rules can't pass its own rules, that's a credibility problem.

Goal: **0 critical violations, <3 warnings** on `localhost:3000`.
