import { faqItems } from '@/lib/content'

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <details
              key={item.question}
              className="bg-white border border-neutral-200 rounded-xl group shadow-sm overflow-hidden"
              open={index === 0}
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg text-neutral-800 hover:bg-neutral-50 transition-colors">
                {item.question}
                <span className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 group-open:bg-plum-100 group-open:text-brand group-open:rotate-180 transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
