import { ruleCategories } from '@/lib/content'

export function RulesTable() {
  return (
    <section id="rules" aria-labelledby="rules-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 id="rules-heading" className="text-3xl sm:text-4xl font-bold text-center mb-4">
          50+ rules. Zero opinions.
        </h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Vouch analyzes your page against 50+ design rules covering spacing,
          typography, color, shadows, and alignment. All rules are based on
          proven design principles, not subjective preferences.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-neutral-200">
                <th className="text-left py-4 px-4 font-semibold">Category</th>
                <th className="text-left py-4 px-4 font-semibold">Examples</th>
              </tr>
            </thead>
            <tbody>
              {ruleCategories.map((rule) => (
                <tr key={rule.category} className="border-b border-neutral-200">
                  <td className="py-4 px-4 font-medium">{rule.category}</td>
                  <td className="py-4 px-4 text-neutral-600">{rule.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
