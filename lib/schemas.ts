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

interface WebSiteSchema extends SchemaBase {
  '@type': 'WebSite'
  url: string
  name: string
  publisher: { '@id': string }
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

interface FAQPageSchema {
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: { '@type': 'Answer'; text: string }
  }>
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
const websiteSchema: WebSiteSchema = {
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
const faqSchema: FAQPageSchema = {
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
