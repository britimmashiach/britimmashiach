import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { EnsinosPillar } from '@/lib/ensinos-pillars'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { FaqSection } from '@/components/seo/FaqSection'
import type { BreadcrumbItem } from '@/lib/json-ld'

type EnsinosPillarArticleProps = {
  pillar: EnsinosPillar
  crumbs: BreadcrumbItem[]
}

export function EnsinosPillarArticle({ pillar, crumbs }: EnsinosPillarArticleProps) {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border/40 bg-spiritual-depth bg-kabbalah-texture">
        <div className="relative container mx-auto px-4 py-14 md:py-20 max-w-3xl text-center space-y-4">
          <p className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
            {pillar.eyebrow}
          </p>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight text-balance">
            {pillar.title}
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-2xl mx-auto">
            {pillar.subtitle}
          </p>
        </div>
      </section>

      <article className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
        <Breadcrumbs items={crumbs} />

        <div className="space-y-10">
          {pillar.sections.map((section) => (
            <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
              <h2 className="font-cinzel text-xl md:text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
                {section.title}
              </h2>
              {section.paragraphs.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="font-inter text-base md:text-[17px] leading-relaxed text-petroleum-800 dark:text-parchment-100/95"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-xl border border-border/50 bg-background/80 dark:bg-petroleum-950/40 p-6 md:p-8 space-y-4">
          <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            Continue o estudo
          </h2>
          <ul className="space-y-2">
            {pillar.relatedHrefs.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-sm font-inter text-gold-700 dark:text-gold-400 font-medium hover:underline"
                >
                  {label}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection items={pillar.faq} title="Perguntas sobre este tema" />
      </article>
    </div>
  )
}
