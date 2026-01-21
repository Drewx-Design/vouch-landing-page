import Image from 'next/image'
import { ruleCategories } from '@/lib/content'

export function RulesTable() {
  return (
    <section id="rules" aria-labelledby="rules-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 id="rules-heading" className="text-3xl sm:text-4xl font-bold text-center mb-4">
          73 rules. Zero opinions.
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          73 rules covering spacing, typography, color, shadows, alignment,
          accessibility, touch targets, and components. Most are purely mathematical —
          &quot;is this divisible by 8?&quot; or &quot;is contrast ≥ 4.5:1?&quot; Deterministic checks
          your AI can act on.
        </p>

        {/* Mobile: Cards */}
        <div className="sm:hidden space-y-4">
          {ruleCategories.map((rule) => (
            <div key={rule.category} className="border border-neutral-200 rounded-lg p-4 bg-white">
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-medium">{rule.category}</span>
                <span className="text-sm text-neutral-500">{rule.rules} rules</span>
              </div>
              <p className="text-sm text-neutral-600">{rule.catches}</p>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden sm:block">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th scope="col" className="text-left py-4 px-4 font-semibold">Category</th>
                <th scope="col" className="text-left py-4 px-4 font-semibold w-20">Rules</th>
                <th scope="col" className="text-left py-4 px-4 font-semibold">What it catches</th>
              </tr>
            </thead>
            <tbody>
              {ruleCategories.map((rule) => (
                <tr key={rule.category} className="border-b border-neutral-200 hover:bg-white transition-colors">
                  <td className="py-4 px-4 font-medium">{rule.category}</td>
                  <td className="py-4 px-4 text-neutral-600 tabular-nums">{rule.rules}</td>
                  <td className="py-4 px-4 text-neutral-600">{rule.catches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Example: What Vouch catches */}
        <div className="mt-12">
          <h3 className="font-semibold text-lg mb-4">Example: What Vouch catches</h3>
          <Image
            src="/images/step-1.svg"
            alt="Vouch extension showing design violations highlighted on a webpage with specific issues flagged"
            width={800}
            height={450}
            className="rounded-lg border border-neutral-200"
          />
        </div>

      </div>
    </section>
  )
}
