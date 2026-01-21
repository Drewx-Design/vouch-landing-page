import Image from 'next/image'
import { howItWorksSteps } from '@/lib/content'

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <h2 id="how-heading" className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Run. Copy. Ship.
        </h2>
        <ol className="space-y-16">
          {howItWorksSteps.map((step, index) => (
            <li key={step.number} className="grid md:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand text-white font-bold">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-lg text-neutral-600">{step.description}</p>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={600}
                  height={400}
                  loading="lazy"
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
