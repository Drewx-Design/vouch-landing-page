import { features } from '@/lib/content'

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <h2 id="features-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-16">
          What you get
        </h2>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-hover bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-plum-100 to-plum-50 flex items-center justify-center mb-6">
                <span className="text-stat text-brand text-xl">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-neutral-400 font-mono">
          MCP integration and CI/CD output (SARIF) available for power users.
        </p>
      </div>
    </section>
  )
}
