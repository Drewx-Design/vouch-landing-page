# feat: Vouch Landing Page - SEO & AI Search Optimized (Simplified)

## Overview

Build a landing page for Vouch (vouch.design), a Chrome extension that detects design inconsistencies. Optimized for traditional SEO and AI search (GEO) while keeping implementation simple.

**Key Changes from v1:**
- Removed browser/mobile detection (Chrome Web Store handles this)
- Native `<details>` for FAQ instead of React state
- Static OG image instead of edge runtime generation
- Consolidated schemas into one file
- Reduced from 19 files to ~15 files

---

## Technical Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Framework** | Next.js 15 (App Router) | SSG, Metadata API, excellent SEO |
| **Rendering** | Static Export | Optimal TTFB, guaranteed crawlability |
| **Styling** | Tailwind CSS | Rapid development, small bundle |
| **TypeScript** | Yes | Type safety for schemas |
| **Hosting** | Vercel | Zero-config deployment |

---

## Project Structure

```
vouch-landing/
├── app/
│   ├── layout.tsx        # Root layout + combined schema
│   ├── page.tsx          # All sections assembled
│   ├── globals.css       # Tailwind + custom styles
│   ├── sitemap.ts        # Sitemap generation
│   └── robots.ts         # Crawler rules (with AI bots)
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── WhoItsFor.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── RulesTable.tsx
│   │   ├── FAQ.tsx       # Uses native <details>
│   │   └── FinalCTA.tsx
│   ├── Header.tsx        # Logo + CTA
│   ├── Footer.tsx        # Links
│   └── Button.tsx        # Only UI component needed
├── lib/
│   ├── schemas.ts        # All schemas consolidated
│   ├── content.ts        # FAQ items, personas, steps
│   └── config.ts         # URLs, site config
├── public/
│   ├── images/
│   │   ├── hero-demo.webp
│   │   ├── step-1.webp
│   │   ├── step-2.webp
│   │   ├── step-3.webp
│   │   └── og-image.png  # Static OG image (1200x630)
│   ├── logo.svg
│   └── favicon.ico
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Total: ~15 files** (down from 19)

---

## Phase 1: Project Setup

### 1.1 Initialize Project

```bash
npx create-next-app@latest vouch-landing --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd vouch-landing
```

### 1.2 next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

### 1.3 Site Configuration

```typescript
// lib/config.ts
export const SITE_CONFIG = {
  name: 'Vouch',
  url: 'https://vouch.design',
  chromeStoreUrl: 'https://chrome.google.com/webstore/detail/vouch/EXTENSION_ID',
  description: 'Design linter Chrome extension that catches UI inconsistencies automatically.',
  social: {
    twitter: 'https://twitter.com/vouchdesign',
    github: 'https://github.com/vouch-design',
  },
  email: 'support@vouch.design',
} as const
```

---

## Phase 2: Schema Implementation (Critical for GEO)

### 2.1 Consolidated Schemas

```typescript
// lib/schemas.ts
import { SITE_CONFIG } from './config'
import { faqItems } from './content'

// Type definitions for type safety
interface SchemaBase {
  '@type': string
  '@id'?: string
}

interface OrganizationSchema extends SchemaBase {
  '@type': 'Organization'
  name: string
  url: string
  logo: { '@type': 'ImageObject'; url: string; width: number; height: number }
  description: string
  sameAs: string[]
  contactPoint: { '@type': 'ContactPoint'; contactType: string; email: string }
}

interface SoftwareApplicationSchema extends SchemaBase {
  '@type': 'SoftwareApplication'
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  offers: { '@type': 'Offer'; price: string; priceCurrency: string }
  featureList: string[]
}

// Organization schema
const organizationSchema: OrganizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_CONFIG.url}/logo.png`,
    width: 512,
    height: 512,
  },
  description: SITE_CONFIG.description,
  sameAs: [SITE_CONFIG.social.twitter, SITE_CONFIG.social.github],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: SITE_CONFIG.email,
  },
}

// WebSite schema
const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.url}/#website`,
  url: SITE_CONFIG.url,
  name: SITE_CONFIG.name,
  publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
}

// SoftwareApplication schema (critical for AI understanding your product)
const softwareSchema: SoftwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_CONFIG.url}/#software`,
  name: 'Vouch - Design Linter',
  description: 'Vouch is a Chrome extension that automatically analyzes webpages for design inconsistencies in typography, spacing, color, shadows, and alignment. It outputs AI-friendly reports that work with Claude, Cursor, and ChatGPT.',
  applicationCategory: 'BrowserApplication',
  operatingSystem: 'Chrome Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Typography analysis: Detects font-size, line-height, and font-weight inconsistencies',
    'Color checking: Identifies rogue hex codes and contrast failures',
    'Spacing detection: Finds magic numbers and broken spacing scales',
    'Shadow analysis: Catches light-from-below and inconsistent blur',
    'AI-friendly output: Copy to Claude, Cursor, or ChatGPT',
    'Tailwind preset: Works with Tailwind design tokens out of the box',
  ],
}

// FAQPage schema (most important for AI citations)
const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

// Combined @graph for cleaner implementation
export const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema, softwareSchema, faqSchema],
}

// Export individual schemas if needed elsewhere
export { organizationSchema, websiteSchema, softwareSchema, faqSchema }
```

### 2.2 Content Data

```typescript
// lib/content.ts
export const faqItems = [
  {
    question: 'How is Vouch different from asking AI for design feedback?',
    answer: "AI feedback hallucinates. It says 'looks good!' when it doesn't. Vouch is deterministic — same input, same output. When Vouch says contrast is 3.8:1 and needs 4.5:1, that's not an opinion. That's a WCAG violation.",
  },
  {
    question: 'What design rules does Vouch check?',
    answer: 'Vouch checks 50+ rules across spacing, typography, color, shadows, and alignment. Rules are based on proven design principles. Tailwind preset included; custom design tokens supported.',
  },
  {
    question: 'Does Vouch work with my framework?',
    answer: "Yes. Vouch analyzes rendered CSS in the browser, not source code. React, Vue, Svelte, vanilla HTML — whatever you're building with.",
  },
  {
    question: 'Is my code sent anywhere?',
    answer: 'No. Vouch runs entirely in your browser. Nothing leaves your machine.',
  },
  {
    question: "I'm a designer. Is Vouch useful for me?",
    answer: "Yes. Vouch catches things human eyes miss — spacing that's 1px off, colors that drifted from your tokens, shadows that break light physics. Think of it as a design spellchecker.",
  },
] as const

export const personas = [
  {
    title: 'AI-Assisted Developers',
    description: "Shipping with Cursor, Bolt, or Claude? Vouch catches what your AI can't see.",
    icon: '🤖',
  },
  {
    title: 'Developers Without Design Training',
    description: 'You make things work. Vouch makes them look right.',
    icon: '👨‍💻',
  },
  {
    title: 'Designers Who Want Validation',
    description: 'Trust but verify. Vouch is your objective second opinion.',
    icon: '🎨',
  },
] as const

export const howItWorksSteps = [
  {
    number: 1,
    title: 'Run Vouch',
    description: 'Click the extension. Instant analysis. See every spacing violation, rogue color, and broken shadow highlighted on your page.',
    image: '/images/step-1.webp',
    imageAlt: 'Vouch extension overlay showing errors highlighted on a webpage',
  },
  {
    number: 2,
    title: 'Copy to AI',
    description: 'One click exports all violations in a format Claude/Cursor understands. Specific issues. Specific fixes.',
    image: '/images/step-2.webp',
    imageAlt: 'Vouch copy/export interface showing AI-ready output',
  },
  {
    number: 3,
    title: 'Ship polished',
    description: 'Your AI fixes the issues. Run Vouch again. 1-2 cycles. Done.',
    image: '/images/step-3.webp',
    imageAlt: 'Clean page with only 3 issues remaining',
  },
] as const

export const ruleCategories = [
  { category: 'Spacing', examples: 'Magic numbers, inconsistent margins, broken scales' },
  { category: 'Typography', examples: 'Wrong sizes, bad line heights, hierarchy violations' },
  { category: 'Color', examples: 'Rogue hex codes, contrast failures, palette drift' },
  { category: 'Shadows', examples: 'Light-from-below, inconsistent blur, wrong colors' },
  { category: 'Alignment', examples: 'Near-misses, uneven gutters, visual imbalance' },
] as const

export const features = [
  { title: "See what's wrong", description: 'Click any error. See expected vs. actual. No guessing.' },
  { title: 'Paste and fix', description: 'Output optimized for Claude, Cursor, ChatGPT. Your AI gets instructions, not vibes.' },
  { title: 'Tailwind out of the box', description: 'Start immediately. Or import your own design tokens.' },
] as const
```

---

## Phase 3: Root Layout

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { combinedSchema } from '@/lib/schemas'
import { SITE_CONFIG } from '@/lib/config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Vouch - Design Linter for Chrome | Catch UI Inconsistencies Automatically',
    template: '%s | Vouch',
  },
  description: 'Vouch is a Chrome extension that automatically detects design inconsistencies in typography, spacing, and color. Copy the AI-friendly report to Claude or Cursor and fix issues in minutes.',
  keywords: ['design linter', 'UI linter', 'CSS linter', 'design QA tool', 'Tailwind linter'],
  authors: [{ name: 'Vouch' }],
  creator: 'Vouch',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Vouch - Design Linter for Chrome',
    description: 'Catch design inconsistencies automatically. 50+ rules. AI-friendly output.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Vouch - Design Linter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vouch - Design Linter for Chrome',
    description: 'Catch design inconsistencies automatically. 50+ rules. AI-friendly output.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

---

## Phase 4: SEO Files

### 4.1 robots.ts (with AI bots)

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // AI crawlers - critical for GEO
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
```

### 4.2 sitemap.ts

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
```

---

## Phase 5: Components

### 5.1 Button (Only UI Component Needed)

```typescript
// components/Button.tsx
import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  className?: string
} & (
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void }
)

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-white',
  }

  const sizes = {
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>
  }

  return <button onClick={onClick} className={classes}>{children}</button>
}
```

### 5.2 Header

```typescript
// components/Header.tsx
import Link from 'next/link'
import { Button } from './Button'
import { SITE_CONFIG } from '@/lib/config'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-gray-900">
          Vouch
        </Link>
        <Button href={SITE_CONFIG.chromeStoreUrl} size="md">
          Install Free
        </Button>
      </nav>
    </header>
  )
}
```

### 5.3 Footer

```typescript
// components/Footer.tsx
import { SITE_CONFIG } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Vouch. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href={SITE_CONFIG.social.twitter} className="text-sm text-gray-500 hover:text-gray-700">
            Twitter
          </a>
          <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  )
}
```

---

## Phase 6: Page Sections

### 6.1 Hero

```typescript
// components/sections/Hero.tsx
import Image from 'next/image'
import { Button } from '@/components/Button'
import { SITE_CONFIG } from '@/lib/config'

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Your AI can't see this. <span className="text-blue-600">Vouch can.</span>
          </h1>
          <p className="text-xl text-gray-600">
            47 errors found on this page. Copy → Paste to Claude → Fixed in 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={SITE_CONFIG.chromeStoreUrl} size="lg">
              Install Free for Chrome
            </Button>
          </div>
          <p className="text-sm text-gray-500">No account required. Works immediately.</p>
        </div>
        <div>
          <Image
            src="/images/hero-demo.webp"
            alt="Vouch extension analyzing a webpage, showing design errors highlighted"
            width={1200}
            height={675}
            priority
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
```

### 6.2 Problem (AI-Citable)

```typescript
// components/sections/Problem.tsx
export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="problem-heading" className="text-3xl sm:text-4xl font-bold mb-6">
          You know something's off. You just can't name it.
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Maybe you're shipping fast with AI tools and the output looks generic.
          Maybe you're a developer who never learned design principles.
          Maybe you're a designer who wants a second opinion.
          Either way — <strong>Vouch finds the 47 specific things wrong</strong> and
          gives your AI exact fixes.
        </p>
      </div>
    </section>
  )
}
```

### 6.3 Who It's For

```typescript
// components/sections/WhoItsFor.tsx
import { personas } from '@/lib/content'

export function WhoItsFor() {
  return (
    <section id="who-its-for" aria-labelledby="who-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 id="who-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
          For anyone who builds websites
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona) => (
            <div key={persona.title} className="text-center p-8 rounded-xl border border-gray-200">
              <span className="text-4xl mb-4 block" aria-hidden="true">{persona.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{persona.title}</h3>
              <p className="text-gray-600">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 6.4 How It Works

```typescript
// components/sections/HowItWorks.tsx
import Image from 'next/image'
import { howItWorksSteps } from '@/lib/content'

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 id="how-heading" className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Run. Copy. Ship.
        </h2>
        <ol className="space-y-16">
          {howItWorksSteps.map((step, index) => (
            <li key={step.number} className="grid md:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-lg text-gray-600">{step.description}</p>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

### 6.5 Features

```typescript
// components/sections/Features.tsx
import { features } from '@/lib/content'

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
          What you get
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 italic">
          MCP integration and CI/CD output (SARIF) available for power users.
        </p>
      </div>
    </section>
  )
}
```

### 6.6 Rules Table

```typescript
// components/sections/RulesTable.tsx
import { ruleCategories } from '@/lib/content'

export function RulesTable() {
  return (
    <section id="rules" aria-labelledby="rules-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 id="rules-heading" className="text-3xl sm:text-4xl font-bold text-center mb-4">
          50+ rules. Zero opinions.
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Vouch analyzes your page against 50+ design rules covering spacing,
          typography, color, shadows, and alignment. All rules are based on
          proven design principles, not subjective preferences.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold">Category</th>
                <th className="text-left py-4 px-4 font-semibold">Examples</th>
              </tr>
            </thead>
            <tbody>
              {ruleCategories.map((rule) => (
                <tr key={rule.category} className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium">{rule.category}</td>
                  <td className="py-4 px-4 text-gray-600">{rule.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
```

### 6.7 FAQ (Native `<details>` - Key Simplification)

```typescript
// components/sections/FAQ.tsx
import { faqItems } from '@/lib/content'

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={index}
              className="border border-gray-200 rounded-lg group"
              open={index === 0}
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg">
                {item.question}
                <span className="ml-4 flex-shrink-0 text-gray-500 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 6.8 Final CTA

```typescript
// components/sections/FinalCTA.tsx
import { Button } from '@/components/Button'
import { SITE_CONFIG } from '@/lib/config'

export function FinalCTA() {
  return (
    <section id="cta" aria-labelledby="cta-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-6">
          Stop second-guessing. Start shipping.
        </h2>
        <Button href={SITE_CONFIG.chromeStoreUrl} size="lg" variant="secondary">
          Install Vouch Free
        </Button>
        <p className="mt-4 text-gray-400 text-sm">
          Chrome extension. No account. 10 seconds.
        </p>
      </div>
    </section>
  )
}
```

---

## Phase 7: Main Page Assembly

```typescript
// app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { WhoItsFor } from '@/components/sections/WhoItsFor'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Features } from '@/components/sections/Features'
import { RulesTable } from '@/components/sections/RulesTable'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <Problem />
      <WhoItsFor />
      <HowItWorks />
      <Features />
      <RulesTable />
      <FAQ />
      <FinalCTA />
    </main>
  )
}
```

---

## Acceptance Criteria

### Functional
- [ ] All 8 sections render correctly
- [ ] CTA links to Chrome Web Store
- [ ] FAQ uses native `<details>` (no JavaScript required)
- [ ] Page is responsive (mobile, tablet, desktop)

### SEO (Non-Negotiable)
- [ ] Combined @graph schema includes Organization, WebSite, SoftwareApplication, FAQPage
- [ ] All schemas validate with Google Rich Results Test
- [ ] robots.ts allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- [ ] sitemap.ts generates valid sitemap
- [ ] Meta description 150-160 characters
- [ ] Single H1, proper heading hierarchy

### Performance
- [ ] Lighthouse Performance > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] No client-side JavaScript for layout (native `<details>` for FAQ)

### Accessibility
- [ ] Skip link present
- [ ] All images have alt text
- [ ] Keyboard navigable

---

## What Was Removed (vs Original Plan)

| Removed | Reason |
|---------|--------|
| `BrowserAwareCTA.tsx` | Chrome Web Store handles non-Chrome users |
| `MobileAwareCTA.tsx` | Chrome Web Store handles mobile users |
| `Accordion.tsx` | Native `<details>` is simpler and better for SEO |
| `Card.tsx` | Inline divs are sufficient |
| `BrowserBadge.tsx` | Unnecessary complexity |
| `opengraph-image.tsx` | Static PNG is simpler |
| `icon.tsx` | Static favicon is simpler |
| 4 separate schema files | Consolidated into `lib/schemas.ts` |

---

## Open Questions

1. **Chrome Web Store URL**: What is the actual extension ID?
2. **Images**: Do you have hero-demo.webp and step screenshots?
3. **Domain**: Is vouch.design configured?

---

## References

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)
- [Native `<details>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
