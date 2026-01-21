import Image from 'next/image'
import { howItWorksSteps } from '@/lib/content'
import { cn } from '@/lib/utils'

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 id="how-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-6">
          Run. Copy. Ship.
        </h2>
        <p className="text-center text-neutral-500 mb-16 font-mono text-sm">
          Three steps to pixel-perfect UI
        </p>
        <ol className="space-y-20">
          {howItWorksSteps.map((step, index) => (
            <li key={step.number} className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={cn(index % 2 === 1 && 'md:order-2')}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-brand to-plum-700 text-white font-mono font-bold text-lg shadow-[--shadow-md]">
                    {step.number}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-semibold text-neutral-800">{step.title}</h3>
                </div>
                <p className="text-lg text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
              <div className={cn('relative', index % 2 === 1 && 'md:order-1')}>
                <div
                  className="absolute -inset-2 bg-gradient-to-br from-plum-100/40 to-transparent rounded-xl"
                  aria-hidden="true"
                />
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  className="relative rounded-lg shadow-[--shadow-lg] border border-neutral-200/50"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
