import { faqItems } from '@/lib/content'

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="border border-gray-200 rounded-lg group"
              open={index === 0}
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg">
                {item.question}
                <span className="ml-4 flex-shrink-0 text-gray-500 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
