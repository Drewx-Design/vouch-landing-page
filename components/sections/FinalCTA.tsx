import { Button } from '@/components/Button'
import { SITE_CONFIG } from '@/lib/config'

export function FinalCTA() {
  return (
    <section id="cta" aria-labelledby="cta-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-800 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-6">
          Stop second-guessing. Start shipping.
        </h2>
        <Button href={SITE_CONFIG.chromeStoreUrl} size="lg" variant="secondary">
          Install Vouch Free
        </Button>
        <p className="mt-4 text-neutral-400 text-sm">
          Chrome extension. No account. 10 seconds.
        </p>
      </div>
    </section>
  )
}
