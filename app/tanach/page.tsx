import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollText } from 'lucide-react'
import { TanachContinueReading } from '@/components/tanach/TanachContinueReading'
import { TANACH_BOOKS, TANACH_SECTION_LABELS, type TanachSection } from '@/lib/tanach-books'

export const metadata: Metadata = {
  title: 'Tanach — leitura bilíngue',
  description:
    'Tanach completo em hebraico massorético com tradução (português quando disponível no Sefaria; caso contrário inglês alinhado), via Sefaria.',
}

const SECTION_ORDER: TanachSection[] = ['torah', 'neviim', 'ketuvim']

export default function TanachIndexPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400">
          <ScrollText className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold uppercase tracking-[0.3em]">Miqra — escritura</span>
        </div>
        <h1 className="section-title">Tanach</h1>
        <p className="section-subtitle max-w-2xl">
          Toráh, Neviim e Ketuvim em{' '}
          <strong className="font-medium text-petroleum-800 dark:text-parchment-100">hebraico com nikud</strong> e coluna
          de tradução alinhada ao versículo. Quando o Sefaria não dispõe de português para um livro, a coluna mostra a
          tradução padrão do site (em geral inglês JPS), sempre em paralelo com o massoreto. Ambiente de estudo com
          estética cabalística luriana; transliteração e comentários no próprio Sefaria.
        </p>
      </div>

      <TanachContinueReading />

      <div className="space-y-12">
        {SECTION_ORDER.map((section) => {
          const books = TANACH_BOOKS.filter((b) => b.section === section)
          const lab = TANACH_SECTION_LABELS[section]
          return (
            <section key={section} aria-labelledby={`tanach-section-${section}`}>
              <div className="mb-5 border-b border-border/50 pb-3">
                <h2 id={`tanach-section-${section}`} className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
                  {lab.titlePt}
                </h2>
                <p className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400 mt-1">{lab.subtitlePt}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {books.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/tanach/${b.slug}`}
                      className="group block rounded-xl border border-border/50 bg-card/80 p-5 transition-all duration-200 hover:border-gold-500/35 hover:shadow-petroleum-sm hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors">
                            {b.titlePt}
                          </h3>
                          <p className="font-hebrew text-xl text-warmgray-500 dark:text-warmgray-400 mt-1" dir="rtl" lang="he">
                            {b.titleHe}
                          </p>
                        </div>
                        <span className="text-[10px] font-inter uppercase tracking-wider text-warmgray-400 shrink-0">
                          {b.chapters} cap.
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </div>
  )
}
