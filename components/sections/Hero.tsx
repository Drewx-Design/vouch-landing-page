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
            src="/images/hero-demo.svg"
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
