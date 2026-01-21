import { features } from '@/lib/content'

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
          What you get
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-neutral-400 italic">
          MCP integration and CI/CD output (SARIF) available for power users.
        </p>
      </div>
    </section>
  )
}
