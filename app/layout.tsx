import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { combinedSchema } from '@/lib/schemas'
import { SITE_CONFIG } from '@/lib/config'

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
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
    description: 'Catch design inconsistencies automatically. 73 rules. AI-friendly output.',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Vouch - Design Linter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vouch - Design Linter for Chrome',
    description: 'Catch design inconsistencies automatically. 73 rules. AI-friendly output.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-800">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-brand focus:rounded focus:shadow-lg"
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
