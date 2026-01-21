import { Button } from '@/components/Button'
import { SITE_CONFIG } from '@/lib/config'

export function FinalCTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-plum text-white overflow-hidden"
    >
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 bg-grid-dots opacity-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-plum-500/30 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-plum-800/50 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 id="cta-heading" className="font-display text-4xl sm:text-5xl lg:text-6xl mb-8">
          Stop second-guessing. Start shipping.
        </h2>
        <div className="mb-8">
          <Button href={SITE_CONFIG.chromeStoreUrl} size="lg" variant="secondary" className="btn-shine shadow-2xl">
            Install Vouch Free
          </Button>
        </div>
        <p className="text-plum-200 font-mono text-sm">
          Chrome extension · No account · 10 seconds
        </p>
      </div>
    </section>
  )
}
