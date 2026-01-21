import Link from 'next/link'
import { Button } from './Button'
import { SITE_CONFIG } from '@/lib/config'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-2xl text-neutral-800 hover:text-brand transition-colors"
        >
          Vouch
        </Link>
        <Button href={SITE_CONFIG.chromeStoreUrl} size="md" className="btn-shine">
          Install Free
        </Button>
      </nav>
    </header>
  )
}
