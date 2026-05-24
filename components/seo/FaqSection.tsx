import type { FaqItem } from '@/lib/parasha-seo-faq'

type FaqSectionProps = {
  items: FaqItem[]
  title?: string
  id?: string
}

export function FaqSection({ items, title = 'Perguntas frequentes', id = 'faq-heading' }: FaqSectionProps) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby={id} className="mt-10 rounded-2xl border border-border/50 bg-card/30 p-5 md:p-6">
      <h2 id={id} className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100 mb-5">
        {title}
      </h2>
      <dl className="space-y-5">
        {items.map((item) => (
          <div key={item.question} className="border-b border-border/30 pb-5 last:border-0 last:pb-0">
            <dt className="font-inter text-sm font-semibold text-petroleum-800 dark:text-parchment-100 mb-2">
              {item.question}
            </dt>
            <dd className="font-inter text-sm text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
