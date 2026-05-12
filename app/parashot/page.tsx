import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Crown, ArrowRight } from 'lucide-react'
import { fetchParashot } from '@/lib/parashot-supabase'
import { groupParashotByBook } from '@/lib/parashot-registry'

export const metadata: Metadata = {
  title: 'Parashot',
  description: 'Porções semanais da Toráh com Aliyot diárias e análise PaRDeS completa.',
}

// Revalida a listagem a cada 5 minutos para refletir parashot recém-publicadas
// e PDFs recém-sincronizados (`npm run sync:pdfs`).
export const revalidate = 300

export default async function ParashotPage() {
  const parashot = await fetchParashot()

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Cabeçalho */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-500" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Ciclo da Toráh
          </span>
        </div>
        <h1 className="section-title">Parashot Semanais</h1>
        <p className="section-subtitle max-w-xl">
          54 porções da Toráh. Cada Parashá contém 7 Aliyot — uma por dia da semana.
        </p>
      </div>

      {/* Estado vazio */}
      {parashot.length === 0 && (
        <div className="glass-card p-10 text-center space-y-3 max-w-lg mx-auto">
          <p className="font-cinzel text-base text-warmgray-600 dark:text-warmgray-400">
            Nenhuma Parashá listada no momento.
          </p>
          <p className="text-xs font-inter text-warmgray-500 leading-relaxed">
            A lista vem da tabela <code className="text-[11px] bg-muted px-1 rounded">parashot</code> no Supabase.
            Se ela estiver vazia, ou se a leitura pública (RLS) estiver bloqueada, nada aparece aqui — mesmo com o site no ar.
          </p>
          <p className="text-xs font-inter text-warmgray-400">
            Administrador: Supabase → <strong>Table Editor</strong> → <strong>parashot</strong> (deve haver linhas) e{' '}
            <strong>Authentication</strong> / políticas RLS com SELECT permitido para o papel anônimo, se aplicável.
          </p>
        </div>
      )}

      {/* Lista por livro */}
      {groupParashotByBook(parashot).map(({ book, entries }) => (
        <div key={book} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
              {book}
            </h2>
            <hr className="flex-1 border-border/60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map(({ registry, db: parasha }) => (
              <Link
                key={parasha.slug}
                href={`/parashot/${parasha.slug}`}
                className="glass-card p-5 group hover:shadow-petroleum-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {registry.title}
                    </h3>
                    <p className="text-xs font-inter text-warmgray-500 mt-0.5">
                      Semana {registry.weekNumber}
                      {parasha.haftarah ? ` · ${parasha.haftarah}` : ''}
                    </p>
                  </div>
                  {parasha.isPremium && (
                    <span className="premium-badge flex-shrink-0">
                      <Crown className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <p className="font-hebrew text-xl text-warmgray-600 dark:text-warmgray-400 text-right leading-relaxed" dir="rtl">
                  {parasha.nameHebrew}
                </p>

                {parasha.summary && (
                  <p className="text-xs font-inter text-warmgray-500 leading-relaxed line-clamp-2 flex-1">
                    {parasha.summary}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-xs font-inter text-warmgray-400">7 Aliyot</span>
                  <ArrowRight className="w-4 h-4 text-warmgray-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
