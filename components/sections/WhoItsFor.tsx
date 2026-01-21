import { personas } from '@/lib/content'

export function WhoItsFor() {
  return (
    <section id="who-its-for" aria-labelledby="who-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 id="who-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
          For anyone who builds websites
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona) => (
            <div key={persona.title} className="text-center p-8 rounded-xl border border-neutral-200">
              <span className="text-4xl mb-4 block" aria-hidden="true">{persona.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{persona.title}</h3>
              <p className="text-neutral-600">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
