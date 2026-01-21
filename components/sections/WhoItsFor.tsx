import { personas } from '@/lib/content'

export function WhoItsFor() {
  return (
    <section id="who-its-for" aria-labelledby="who-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50 bg-grid-dots">
      <div className="max-w-7xl mx-auto">
        <h2 id="who-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-16">
          For anyone who builds websites
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona) => (
            <div
              key={persona.title}
              className="card-hover bg-white text-center p-8 rounded-2xl border border-neutral-200 shadow-sm"
            >
              <span className="text-5xl mb-6 block" aria-hidden="true">{persona.icon}</span>
              <h3 className="text-xl font-semibold mb-3 text-neutral-800">{persona.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
