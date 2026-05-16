'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Crown, Download, BookMarked, Lock, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NoLibraryResults } from '@/components/ui/EmptyState'
import { TanachReadOnlineLink } from '@/components/tanach/TanachReadOnlineLink'
import { useProfile } from '@/hooks/useProfile'
import type { TanachResumeScope } from '@/lib/tanach-reading-prefs'

const CATEGORIES = [
  { id: 'all',     label: 'Todos'    },
  { id: 'siddur',  label: 'Siddur'  },
  { id: 'toráh',   label: 'Toráh'   },
  { id: 'kabaláh', label: 'Kabaláh' },
  { id: 'tehilim', label: 'Tehilim' },
]

interface Book {
  id: string
  title: string
  titleHebrew: string
  author: string
  description: string
  category: string
  isPremium: boolean
  year: number | null
  /** Se definido, mostra ação “Ler online” em vez de “Baixar” (livro não premium). */
  readOnlineHref?: string
  /** “Ler online” para Tanach: usa última leitura no aparelho quando cabe no `scope`. */
  readOnlineTanachResume?: { fallbackHref: string; scope: TanachResumeScope }
}

interface LibraryClientProps {
  books: Book[]
}

export function LibraryClient({ books }: LibraryClientProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const { isPremium, isAdmin } = useProfile()

  function handleCategoryClick(catId: string) {
    if (catId === 'tehilim') {
      router.push('/tehilim')
      return
    }
    setActiveCategory(catId)
  }

  useEffect(() => {
    function blockKeys(e: KeyboardEvent) {
      if (e.ctrlKey && (e.key === 'c' || e.key === 's' || e.key === 'p' || e.key === 'a')) {
        const target = e.target as HTMLElement
        const inInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
        if (!inInput) e.preventDefault()
      }
    }
    document.addEventListener('keydown', blockKeys)
    return () => document.removeEventListener('keydown', blockKeys)
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return books.filter((b) => {
      const matchesCategory = activeCategory === 'all' || b.category === activeCategory
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [books, query, activeCategory])

  return (
    <div className="space-y-7">

      {/* Busca */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar na biblioteca..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field pl-10"
          aria-label="Buscar livros"
        />
      </div>

      {/* Categorias */}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por categoria">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-sm font-inter transition-colors duration-150 border',
              activeCategory === cat.id
                ? 'bg-petroleum-800 text-parchment-100 border-petroleum-800 dark:bg-gold-500 dark:text-petroleum-950 dark:border-gold-500'
                : 'border-border text-warmgray-600 dark:text-warmgray-400 hover:border-gold-500/40 hover:bg-gold-500/5',
            )}
            aria-pressed={activeCategory === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resultado */}
      {filtered.length === 0 ? (
        <NoLibraryResults />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((book) => {
            const isLocked = book.isPremium && !isPremium && !isAdmin
            return (
              <div
                key={book.id}
                className={cn(
                  'rounded-xl border border-border/50 bg-card/90 flex flex-col overflow-hidden group',
                  'hover:-translate-y-0.5 transition-all duration-200',
                  'hover:border-gold-500/30 hover:shadow-petroleum-sm',
                  isLocked && 'select-none',
                )}
                style={{ boxShadow: '0 1px 3px rgba(27,58,75,0.06)' }}
                onContextMenu={isLocked ? (e) => e.preventDefault() : undefined}
                onCopy={isLocked ? (e) => e.preventDefault() : undefined}
                onCut={isLocked ? (e) => e.preventDefault() : undefined}
              >
                {/* Capa */}
                <div className="h-36 flex relative overflow-hidden bg-petroleum-800 dark:bg-petroleum-900">
                  {/* Lombada */}
                  <div
                    className="w-1.5 self-stretch flex-shrink-0 bg-gradient-to-b from-gold-500/50 via-gold-400/30 to-gold-600/20"
                    aria-hidden="true"
                  />
                  {/* Título hebraico */}
                  <div className="flex-1 flex items-center justify-center px-3 py-4 relative">
                    <div
                      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.petroleum.700/25),transparent_70%)]"
                      aria-hidden="true"
                    />
                    <p
                      className="font-hebrew text-2xl text-parchment-100/75 text-center leading-loose relative z-10"
                      dir="rtl"
                      lang="he"
                    >
                      {book.titleHebrew}
                    </p>
                  </div>
                  {/* Badge premium */}
                  {book.isPremium && !isLocked && (
                    <div className="absolute top-2 right-2 z-30">
                      <span className="premium-badge" aria-label="Conteúdo premium">
                        <Crown className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                  {/* Sobreposição bloqueado */}
                  {isLocked && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 bg-petroleum-950/82 backdrop-blur-[2px]">
                      <Lock className="w-4 h-4 text-gold-400" aria-hidden="true" />
                      <span className="text-[9px] font-inter font-semibold text-gold-300/80 uppercase tracking-widest text-center px-2">
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 flex flex-col gap-2.5 p-4">
                  <div>
                    <h3 className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100 leading-snug group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[11px] font-inter text-warmgray-400 mt-0.5 uppercase tracking-wide">
                      {book.author}
                    </p>
                  </div>

                  <p className={cn(
                    'font-cormorant text-sm italic text-warmgray-600 dark:text-warmgray-400 leading-relaxed flex-1 line-clamp-3',
                    isLocked && 'blur-[3px] pointer-events-none',
                  )}>
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-border/30 mt-auto">
                    <span className="text-[10px] font-inter text-warmgray-400 uppercase tracking-wider">
                      {book.year ?? 'Tradição'}
                    </span>
                    {isLocked ? (
                      <Link
                        href="/premium"
                        className="inline-flex items-center gap-1 text-xs font-inter font-semibold text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors"
                        aria-label="Desbloquear conteúdo premium"
                      >
                        <Crown className="w-3 h-3" aria-hidden="true" />
                        Desbloquear
                      </Link>
                    ) : book.isPremium ? (
                      <Link
                        href="/premium"
                        className="inline-flex items-center gap-1 text-xs font-inter font-medium text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors"
                      >
                        <Crown className="w-3 h-3" aria-hidden="true" />
                        Premium
                      </Link>
                    ) : book.readOnlineTanachResume ? (
                      <TanachReadOnlineLink
                        fallbackHref={book.readOnlineTanachResume.fallbackHref}
                        scope={book.readOnlineTanachResume.scope}
                        bookTitle={book.title}
                      />
                    ) : book.readOnlineHref ? (
                      <Link
                        href={book.readOnlineHref}
                        className="inline-flex items-center gap-1 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                        aria-label={`Ler online: ${book.title}`}
                      >
                        <BookOpen className="w-3 h-3" aria-hidden="true" />
                        Ler online
                      </Link>
                    ) : (
                      <button
                        className="inline-flex items-center gap-1 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                        aria-label={`Baixar ${book.title}`}
                      >
                        <Download className="w-3 h-3" aria-hidden="true" />
                        Baixar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Banner acervo */}
      <div className="rounded-xl border border-gold-500/20 bg-gold-500/4 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
            <span className="text-[10px] font-inter font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
              Acervo completo
            </span>
          </div>
          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Premium: acesso a toda a biblioteca
          </h3>
          <p className="font-cormorant text-sm italic text-warmgray-600 dark:text-warmgray-400 max-w-lg">
            Download ilimitado de todos os títulos, incluindo os volumes do Modelo Netivot e 49 Portões da Alma.
          </p>
        </div>
        <Link href="/premium" className="btn-gold whitespace-nowrap flex-shrink-0">
          Ver Premium
        </Link>
      </div>
    </div>
  )
}
