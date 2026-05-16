'use client'

import { useState, useEffect, useCallback } from 'react'
import { Crown, ArrowRight, BookOpen, FileText } from 'lucide-react'
import { PdfViewer } from '@/components/parashot/PdfViewer'
import { cn } from '@/lib/utils'
import { Drawer } from '@/components/ui/Drawer'
import { AliyotTabs } from '@/components/parashot/AliyotTabs'
import { createClient, supabaseConfigured } from '@/lib/supabase'
import { useProfile } from '@/hooks/useProfile'
import type { Parasha, Aliyah } from '@/lib/parashot-supabase'
import { getParashaTitle, getParashaEntry, groupParashotByBook } from '@/lib/parashot-registry'
import { aliyahPdfUrl } from '@/lib/pdf-urls'

const PARDES_INFO = [
  { letra: 'פ', nome: 'Peshat', desc: 'Sentido literal', color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10' },
  { letra: 'ר', nome: 'Remez', desc: 'Alusão e guematria', color: 'text-green-600 dark:text-green-400 bg-green-500/10' },
  { letra: 'ד', nome: 'Drash', desc: 'Exposição homilética', color: 'text-gold-600 dark:text-gold-400 bg-gold-500/10' },
  { letra: 'ס', nome: 'Sod', desc: 'Segredo cabalístico', color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10' },
]

function normalizeAliyahRow(row: Record<string, unknown>): Aliyah {
  const id = String(row.id)
  return {
    id,
    parashaId: String(row.parasha_id),
    aliyahNumber: Number(row.aliyah_number),
    dayOfWeek: Number(row.day_of_week),
    title: String(row.title),
    content: String(row.content),
    levelPardes: Array.isArray(row.level_pardes) ? row.level_pardes as string[] : [],
    pdfUrl: aliyahPdfUrl(id, row.pdf_url ? String(row.pdf_url) : null, ''),
    pdfPremiumUrl: aliyahPdfUrl(id, row.pdf_premium_url ? String(row.pdf_premium_url) : null, '/premium'),
    pdfKabbalahUrl: aliyahPdfUrl(id, row.pdf_kabbalah_url ? String(row.pdf_kabbalah_url) : null, '/kabbalah'),
  }
}

interface ParashotClientProps {
  parashot: Parasha[]
}

export function ParashotClient({ parashot }: ParashotClientProps) {
  const [selected, setSelected] = useState<Parasha | null>(null)
  const [aliyot, setAliyot] = useState<Aliyah[]>([])
  const [loadingAliyot, setLoadingAliyot] = useState(false)
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null)
  const { isPremium, isAdmin } = useProfile()

  const fetchAliyot = useCallback(async (parashaId: string) => {
    setLoadingAliyot(true)
    setAliyot([])
    try {
      if (!supabaseConfigured) {
        setLoadingAliyot(false)
        return
      }
      const supabase = createClient()
      const { data, error } = await supabase
        .from('aliyot')
        .select('*')
        .eq('parasha_id', parashaId)
        .order('aliyah_number', { ascending: true })
      if (!error && data) {
        setAliyot(data.map(normalizeAliyahRow))
      }
    } finally {
      setLoadingAliyot(false)
    }
  }, [])

  useEffect(() => {
    if (selected) fetchAliyot(selected.id)
  }, [selected, fetchAliyot])

  function handleOpen(parasha: Parasha) {
    setSelected(parasha)
  }

  function handleClose() {
    setSelected(null)
  }

  return (
    <>
      {/* Cabeçalho da página */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-500" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Ciclo da Toráh
          </span>
        </div>
        <h1 className="section-title">Parashot Semanais</h1>
        <p className="section-subtitle max-w-xl">
          Cada porção analisada com o método PaRDeS completo: Peshat, Remez, Drash e Sod.
          Clique em uma Parashá para estudar as Aliyot do dia.
        </p>
      </div>

      {/* PaRDeS explicação */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {PARDES_INFO.map(({ letra, nome, desc, color }) => (
          <div key={nome} className="glass-card p-4 text-center space-y-1">
            <span className={cn('text-2xl font-hebrew font-bold inline-block', color.split(' ').slice(0, 2).join(' '))}>
              {letra}
            </span>
            <p className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100">{nome}</p>
            <p className="text-xs font-inter text-warmgray-500">{desc}</p>
          </div>
        ))}
      </div>

      {/* Estado vazio */}
      {parashot.length === 0 && (
        <div className="glass-card p-10 text-center space-y-2">
          <p className="font-cinzel text-base text-warmgray-500">Parashot ainda não disponíveis.</p>
          <p className="text-xs font-inter text-warmgray-400">O conteúdo está sendo preparado pelo Rav.</p>
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
            {entries.map(({ registry, db: parasha }) => {
              const isSelected = selected?.id === parasha.id
              const title = registry.title
              return (
                <button
                  key={parasha.slug}
                  onClick={() => handleOpen(parasha)}
                  className={cn(
                    'glass-card p-5 group text-left w-full hover:shadow-petroleum-md hover:-translate-y-0.5 transition-all duration-200',
                    isSelected && 'ring-2 ring-gold-500/60 shadow-gold-sm',
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Abrir Parashá ${title}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                        {title}
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

                  <p className="font-hebrew text-xl text-warmgray-600 dark:text-warmgray-400 text-right mb-3" dir="rtl">
                    {parasha.nameHebrew}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {['פ', 'ר', 'ד', 'ס'].map((l) => (
                        <span key={l} className="text-xs font-hebrew text-warmgray-400 dark:text-warmgray-600 w-5 h-5 rounded flex items-center justify-center bg-muted">
                          {l}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-warmgray-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Drawer */}
      <Drawer
        open={selected !== null}
        onClose={handleClose}
        title={selected ? `Parasháh ${getParashaTitle(selected.slug)}` : ''}
        subtitle={selected ? `${getParashaEntry(selected.slug)?.book ?? selected.book} · Semana ${getParashaEntry(selected.slug)?.weekNumber ?? selected.weekNumber}` : undefined}
      >
        {selected && (
          <div className="space-y-6">
            {/* Cabeçalho da Parashá */}
            <div className="space-y-3 pb-5 border-b border-border/40">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {selected.isPremium && (
                      <span className="premium-badge">
                        <Crown className="w-3 h-3" />
                        Premium
                      </span>
                    )}
                  </div>
                  {selected.haftarah && (
                    <p className="text-xs font-inter text-warmgray-500">
                      Haftaráh: {selected.haftarah}
                      {selected.haftarahHebrew && (
                        <span className="font-hebrew ml-2" dir="rtl">{selected.haftarahHebrew}</span>
                      )}
                    </p>
                  )}
                </div>
                <p className="font-hebrew text-2xl text-warmgray-500 dark:text-warmgray-400 flex-shrink-0 leading-none mt-1" dir="rtl">
                  {selected.nameHebrew}
                </p>
              </div>

              {selected.summary && (
                <p className="font-cormorant text-base italic text-petroleum-800 dark:text-parchment-200 leading-relaxed">
                  {selected.summary}
                </p>
              )}

              {/* PDFs da Parashá — abrem no visualizador interno (sem download) */}
              {(selected.pdfUrl || (isPremium && selected.pdfPremiumUrl) || (isAdmin && selected.pdfKabbalahUrl)) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {selected.pdfUrl && (
                    <button
                      type="button"
                      onClick={() => setActivePdf({ url: selected.pdfUrl!, title: `${selected.name} — PDF Geral` })}
                      className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted"
                    >
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      Ler PDF Geral
                    </button>
                  )}
                  {isPremium && selected.pdfPremiumUrl && (
                    <button
                      type="button"
                      onClick={() => setActivePdf({ url: selected.pdfPremiumUrl!, title: `${selected.name} — Premium` })}
                      className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors px-3 py-1.5 rounded-lg border border-gold-500/40 hover:bg-gold-500/5"
                    >
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      Ler PDF Premium
                    </button>
                  )}
                  {isAdmin && selected.pdfKabbalahUrl && (
                    <button
                      type="button"
                      onClick={() => setActivePdf({ url: selected.pdfKabbalahUrl!, title: `${selected.name} — Cabalístico` })}
                      className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors px-3 py-1.5 rounded-lg border border-purple-500/40 hover:bg-purple-500/5"
                    >
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      Ler PDF Cabalístico
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Aliyot */}
            {loadingAliyot ? (
              <div className="space-y-4 animate-pulse">
                <div className="flex gap-1.5">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex-1 h-16 bg-muted rounded-lg" />
                  ))}
                </div>
                <div className="h-32 bg-muted rounded-xl" />
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                  <div className="h-3 bg-muted rounded w-4/6" />
                </div>
              </div>
            ) : (
              <AliyotTabs aliyot={aliyot} />
            )}
          </div>
        )}
      </Drawer>

      <PdfViewer
        url={activePdf?.url ?? ''}
        title={activePdf?.title ?? ''}
        open={!!activePdf}
        onClose={() => setActivePdf(null)}
      />
    </>
  )
}
