import Image from 'next/image'
import { Button } from '@/components/Button'
import { SITE_CONFIG } from '@/lib/config'

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-mesh"
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-dots opacity-40" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content with staggered animations */}
        <div className="space-y-8">
          <h1
            id="hero-heading"
            className="animate-on-load animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
          >
            <span className="font-display block mb-2">Your AI can&apos;t see this.</span>
            <span className="font-bold text-brand">Vouch can.</span>
          </h1>

          <p className="animate-on-load animate-fade-in-up delay-200 text-xl lg:text-2xl text-neutral-600 max-w-lg">
            <span className="text-stat text-brand">47</span> errors found on this page.
            Copy → Paste to Claude → Fixed in 5 minutes.
          </p>

          <div className="animate-on-load animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
            <Button href={SITE_CONFIG.chromeStoreUrl} size="lg" className="btn-shine glow-plum">
              Install Free for Chrome
            </Button>
          </div>

          <p className="animate-on-load animate-fade-in-up delay-400 text-sm text-neutral-400 font-mono">
            No account required. Works immediately.
          </p>
        </div>

        {/* Hero image with enhanced presentation */}
        <div className="animate-on-load animate-slide-in-right delay-300 relative">
          {/* Decorative background element */}
          <div
            className="absolute -inset-4 bg-gradient-to-br from-plum-100/50 to-plum-50/30 rounded-2xl -rotate-2"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-4 bg-gradient-to-tr from-plum-50/30 to-transparent rounded-2xl rotate-1"
            aria-hidden="true"
          />

          <Image
            src="/images/hero-demo.svg"
            alt="Vouch extension analyzing a webpage, showing design errors highlighted"
            width={1200}
            height={675}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="relative rounded-xl shadow-[--shadow-2xl] border border-neutral-200/50"
          />

          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-[--shadow-lg] px-4 py-2 border border-neutral-200 animate-float">
            <p className="text-sm font-semibold text-neutral-800">
              <span className="text-stat text-brand">73</span> rules
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
