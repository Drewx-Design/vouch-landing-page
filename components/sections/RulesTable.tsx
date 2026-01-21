import Image from 'next/image'
import { ruleCategories } from '@/lib/content'

export function RulesTable() {
  return (
    <section id="rules" aria-labelledby="rules-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 id="rules-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-4">
          <span className="text-stat text-brand">73</span> rules. Zero opinions.
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Covering spacing, typography, color, shadows, alignment,
          accessibility, touch targets, and components. Most are purely mathematical —
          <span className="font-mono text-sm bg-neutral-100 px-2 py-0.5 rounded mx-1">is this divisible by 8?</span>
          or
          <span className="font-mono text-sm bg-neutral-100 px-2 py-0.5 rounded mx-1">is contrast ≥ 4.5:1?</span>
          Deterministic checks your AI can act on.
        </p>

        {/* Mobile: Cards */}
        <div className="sm:hidden space-y-3">
          {ruleCategories.map((rule) => (
            <div key={rule.category} className="card-hover bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-semibold text-neutral-800">{rule.category}</span>
                <span className="text-stat text-brand text-sm">{rule.rules}</span>
              </div>
              <p className="text-sm text-neutral-600">{rule.catches}</p>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden sm:block bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th scope="col" className="text-left py-4 px-6 font-semibold text-neutral-800">Category</th>
                <th scope="col" className="text-center py-4 px-4 font-semibold text-neutral-800 w-24">Rules</th>
                <th scope="col" className="text-left py-4 px-6 font-semibold text-neutral-800">What it catches</th>
              </tr>
            </thead>
            <tbody>
              {ruleCategories.map((rule, index) => (
                <tr
                  key={rule.category}
                  className={`border-b border-neutral-100 hover:bg-plum-50/30 transition-colors ${
                    index === ruleCategories.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="py-4 px-6 font-medium text-neutral-800">{rule.category}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-stat text-brand">{rule.rules}</span>
                  </td>
                  <td className="py-4 px-6 text-neutral-600">{rule.catches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Example: What Vouch catches */}
        <div className="mt-16">
          <h3 className="font-semibold text-lg mb-6 text-center">Example: What Vouch catches</h3>
          <div className="relative">
            <div
              className="absolute -inset-3 bg-gradient-to-br from-plum-100/50 to-transparent rounded-2xl"
              aria-hidden="true"
            />
            <Image
              src="/images/step-1.svg"
              alt="Vouch extension showing design violations highlighted on a webpage with specific issues flagged"
              width={800}
              height={450}
              sizes="(max-width: 896px) 100vw, 800px"
              className="relative rounded-xl border border-neutral-200 shadow-[--shadow-lg]"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
