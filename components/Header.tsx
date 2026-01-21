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
