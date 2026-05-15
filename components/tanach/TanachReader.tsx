'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getTanachBook, type TanachSection } from '@/lib/tanach-books'
import { saveTanachLastRead, saveTanachViewPref, loadTanachViewPref } from '@/lib/tanach-reading-prefs'
import type { TanachChapterPayload } from '@/lib/sefaria-tanach'

export type TanachViewMode = 'both' | 'he' | 'pt'

/** @deprecated Use TanachChapterPayload de @/lib/sefaria-tanach */
export type TanachApiPayload = TanachChapterPayload

type InnerProps = {
  apiBook: string
  bookSlug: string
  titlePt: string
  titleHe: string
  chapter: number
  section: TanachSection
  /** Pré-carregado no servidor (SSR) para indexação e primeira pintura sem skeleton. */
  initialData?: TanachChapterPayload | null
}

function parseView(raw: string | null): TanachViewMode {
  if (raw === 'he' || raw === 'pt') return raw
  return 'both'
}

function viewQuery(view: TanachViewMode): string {
  return view === 'both' ? '' : `?view=${view}`
}

const SECTION_HEADLINE: Record<TanachSection, string> = {
  torah: 'Toráh — leitura cabalística',
  neviim: 'Neviim — leitura cabalística',
  ketuvim: 'Ketuvim — leitura cabalística',
}

function TanachReaderInner({
  apiBook,
  bookSlug,
  titlePt,
  titleHe,
  chapter,
  section,
  initialData = null,
}: InnerProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const view = parseView(searchParams.get('view'))
  const viewSuffix = viewQuery(view)
  const skipRestoreFromPrefsRef = useRef(false)

  const [data, setData] = useState<TanachChapterPayload | null>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(!initialData)

  useEffect(() => {
    if (initialData) {
      saveTanachLastRead(bookSlug, chapter)
      return
    }

    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `/api/tanach?book=${encodeURIComponent(apiBook)}&chapter=${encodeURIComponent(String(chapter))}`,
        )
        const json = (await res.json()) as TanachChapterPayload & { error?: string }
        if (!res.ok) throw new Error(json.error || 'Falha ao carregar o capítulo.')
        if (!cancelled) {
          setData(json)
          saveTanachLastRead(bookSlug, chapter)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Erro desconhecido.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [apiBook, chapter, bookSlug, initialData])

  useEffect(() => {
    const param = searchParams.get('view')
    if (param !== null) {
      saveTanachViewPref(parseView(param))
      return
    }
    if (skipRestoreFromPrefsRef.current) {
      skipRestoreFromPrefsRef.current = false
      return
    }
    const saved = loadTanachViewPref()
    if (saved === 'both') return
    router.replace(`${pathname}?view=${saved}`, { scroll: false })
  }, [searchParams, pathname, router])

  const meta = getTanachBook(bookSlug)
  const totalChapters = meta?.chapters ?? 0

  const chapterHref = useMemo(
    () => (n: number) => `/tanach/${bookSlug}/${n}${viewSuffix}`,
    [bookSlug, viewSuffix],
  )

  const translationLang = data?.locale === 'pt' ? 'pt-BR' : 'en'

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <nav className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 flex flex-wrap items-center gap-2">
        <Link href="/tanach" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
          Tanach
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/tanach/${bookSlug}${view === 'both' ? '' : `?view=${view}`}`}
          className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
        >
          {titlePt}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-petroleum-800 dark:text-parchment-200 font-medium">Capítulo {chapter}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-[10px] font-inter font-semibold uppercase tracking-[0.35em] text-gold-600/90 dark:text-gold-400/90 mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {SECTION_HEADLINE[section]}
          </p>
          <h1 className="font-cinzel text-2xl md:text-3xl font-semibold text-petroleum-900 dark:text-parchment-50 tracking-wide">
            {titlePt} · capítulo {chapter}
          </h1>
          <p className="font-hebrew text-2xl text-warmgray-500 dark:text-warmgray-400 mt-2" dir="rtl" lang="he">
            {titleHe}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            href={`/tanach/${bookSlug}${view === 'both' ? '' : `?view=${view}`}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-2 text-xs font-inter text-warmgray-600 dark:text-warmgray-300 hover:border-gold-500/35 hover:bg-gold-500/5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Capítulos
          </Link>
          {data?.sefariaUrl && (
            <a
              href={data.sefariaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold-500/30 bg-gold-500/10 px-3 py-2 text-xs font-inter font-medium text-gold-800 dark:text-gold-300 hover:bg-gold-500/15 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Sefaria (incl. transliteração)
            </a>
          )}
        </div>
      </div>

      <div
        className="flex flex-wrap items-center gap-2 rounded-xl border border-border/50 bg-card/60 px-3 py-2.5"
        role="group"
        aria-label="Modo de exibição"
      >
        <span className="text-[10px] font-inter uppercase tracking-wider text-warmgray-500 dark:text-warmgray-400 mr-1">
          Ver
        </span>
        {(
          [
            { id: 'both' as const, label: 'Hebraico + tradução' },
            { id: 'he' as const, label: 'Só hebraico' },
            { id: 'pt' as const, label: 'Só tradução' },
          ] as const
        ).map(({ id, label }) => (
          <Link
            key={id}
            href={`/tanach/${bookSlug}/${chapter}${viewQuery(id)}`}
            scroll={false}
            onClick={
              id === 'both'
                ? () => {
                    saveTanachViewPref('both')
                    skipRestoreFromPrefsRef.current = true
                  }
                : undefined
            }
            className={cn(
              'rounded-lg px-2.5 py-1.5 text-[11px] font-inter font-medium transition-colors',
              view === id
                ? 'bg-gold-500/20 text-gold-900 dark:text-gold-200 border border-gold-500/35'
                : 'text-warmgray-600 dark:text-warmgray-300 hover:bg-gold-500/10 border border-transparent',
            )}
          >
            {label}
          </Link>
        ))}
      </div>

      <section
        className={cn(
          'relative overflow-hidden rounded-2xl border border-gold-500/25',
          'bg-[radial-gradient(ellipse_100%_70%_at_50%_-25%,rgba(201,168,76,0.11),transparent_50%),linear-gradient(185deg,#0e1a28_0%,#0a121c_45%,#060d14_100%)]',
          'shadow-[inset_0_1px_0_rgba(201,168,76,0.07),0_24px_48px_rgba(0,0,0,0.35)]',
        )}
        aria-label="Texto do capítulo"
      >
        <div
          className="pointer-events-none absolute inset-5 rounded-xl border border-gold-500/[0.07]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-500/[0.04] blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-petroleum-500/[0.06] blur-3xl" aria-hidden="true" />

        <div className="relative z-10 px-5 py-8 md:px-10 md:py-10 space-y-6">
          {loading && (
            <div className="space-y-4 animate-pulse" aria-busy="true" aria-live="polite">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 rounded-lg bg-parchment-100/5 border border-gold-500/10" />
              ))}
            </div>
          )}

          {error && (
            <p className="text-sm font-inter text-red-300/90" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && data && (
            <div className="space-y-6">
              {data.locale === 'en' && (view === 'both' || view === 'pt') && (
                <p
                  className="text-[11px] font-inter text-amber-200/90 leading-relaxed border border-amber-500/25 rounded-lg bg-amber-950/30 px-3 py-2"
                  role="status"
                >
                  Para este livro o Sefaria ainda não oferece tradução completa em português alinhada versículo a
                  versículo. Estamos a mostrar a tradução em <strong className="text-parchment-100/95">inglês</strong>{' '}
                  (edição padrão do site), alinhada ao hebraico massorético.
                </p>
              )}

              <p className="text-[11px] font-inter text-parchment-200/70 leading-relaxed border-b border-gold-500/15 pb-4">
                Texto massorético (hebraico com nikud) e coluna de tradução via acervo público do Sefaria. A{' '}
                <strong className="text-parchment-100/90">transliteração latina</strong> por versículo não está
                estável nesta API; use o botão <em>Sefaria</em> acima para recursos de leitura e comentários.
              </p>

              <ol className="space-y-6 list-none m-0 p-0">
                {data.he.map((heLine, i) => (
                  <li
                    key={i}
                    className={cn(
                      'rounded-xl border border-gold-500/10 bg-petroleum-950/35 backdrop-blur-[2px]',
                      'p-4 md:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
                    )}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <span
                        className={cn(
                          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                          'border border-gold-500/35 bg-gold-500/10 text-[11px] font-cinzel font-semibold text-gold-200',
                        )}
                        aria-label={`Versículo ${i + 1}`}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1 space-y-3">
                        {(view === 'both' || view === 'he') && (
                          <p
                            className="font-hebrew text-lg md:text-xl text-parchment-50/95 leading-[1.85] tracking-wide"
                            dir="rtl"
                            lang="he"
                          >
                            {heLine}
                          </p>
                        )}
                        {(view === 'both' || view === 'pt') && (
                          <p
                            className={cn(
                              'font-cormorant text-[15px] md:text-base italic text-parchment-200/85 leading-relaxed',
                              view === 'both' && 'border-l-2 border-gold-500/25 pl-3 md:pl-4',
                            )}
                            lang={translationLang}
                          >
                            {data.translation[i]?.trim() ? data.translation[i] : '—'}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <footer className="pt-4 border-t border-gold-500/10 text-[10px] font-inter text-parchment-300/60 leading-relaxed space-y-1">
                <p>
                  {data.locale === 'pt' ? 'Tradução' : 'Tradução (inglês)'}:{' '}
                  <span className="text-parchment-200/80">{data.versionTitle}</span>
                </p>
                <p>
                  Fonte dos textos:{' '}
                  <a
                    href={data.attribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-400/90 hover:text-gold-300 underline underline-offset-2"
                  >
                    {data.attribution.source}
                  </a>
                  . Uso sujeito aos termos do projeto Sefaria.
                </p>
              </footer>
            </div>
          )}
        </div>
      </section>

      {totalChapters > 0 && (
        <div className="flex flex-wrap justify-between gap-3 text-xs font-inter text-warmgray-600 dark:text-warmgray-400">
          {chapter > 1 ? (
            <Link
              href={chapterHref(chapter - 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-2 hover:border-gold-500/35 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Capítulo {chapter - 1}
            </Link>
          ) : (
            <span />
          )}
          {chapter < totalChapters ? (
            <Link
              href={chapterHref(chapter + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-2 hover:border-gold-500/35 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
            >
              Capítulo {chapter + 1}
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  )
}

function ReaderSuspenseFallback() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-pulse">
      <div className="h-4 w-48 rounded bg-parchment-100/10" />
      <div className="h-10 w-2/3 rounded bg-parchment-100/10" />
      <div className="h-64 rounded-2xl bg-parchment-100/5 border border-gold-500/10" />
    </div>
  )
}

export function TanachReader(props: InnerProps) {
  return (
    <Suspense fallback={<ReaderSuspenseFallback />}>
      <TanachReaderInner {...props} />
    </Suspense>
  )
}
