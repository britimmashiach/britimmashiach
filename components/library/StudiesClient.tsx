'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ArrowRight, Clock, Crown, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NoStudiesFound } from '@/components/ui/EmptyState'

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'kabalah', label: 'Kabaláh' },
  { id: 'parasha', label: 'Parashá' },
  { id: 'tehilim', label: 'Tehilim' },
  { id: 'netivot', label: 'Netivot' },
  { id: 'alef-beit', label: 'Alef-Beit' },
  { id: 'moedim', label: 'Moedim' },
  { id: 'shiur', label: 'Shiurim' },
]

const CATEGORY_COLORS: Record<string, string> = {
  kabalah: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  parasha: 'bg-green-500/10 text-green-700 dark:text-green-400',
  tehilim: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  netivot: 'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  'alef-beit': 'bg-warmgray-500/10 text-warmgray-600 dark:text-warmgray-400',
  moedim: 'bg-red-500/10 text-red-700 dark:text-red-400',
  shiur: 'bg-petroleum-500/10 text-petroleum-700 dark:text-petroleum-300',
}

interface Study {
  slug: string
  title: string
  titleHebrew: string
  excerpt: string
  category: string
  readingTime: number
  isPremium: boolean
  tags: string[]
  publishedAt: string
}

interface StudiesClientProps {
  studies: Study[]
}

export function StudiesClient({ studies }: StudiesClientProps) {
  const pathname = usePathname()
  const displayStudies = studies
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return displayStudies.filter((s) => {
      const cat = s.category.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      const activeCat = activeCategory.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      const matchesCategory = activeCategory === 'all' || cat === activeCat
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [displayStudies, query, activeCategory])

  return (
    <div className="space-y-6">
      {/* Busca */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar por título, tema ou palavra..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field pl-10"
          aria-label="Buscar estudos"
        />
      </div>

      {/* Categorias */}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por categoria">
        {CATEGORIES.map((cat) => {
          if (cat.id === 'tehilim') {
            return (
              <Link
                key={cat.id}
                href="/tehilim"
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-sm font-inter transition-colors duration-150 border',
                  pathname.startsWith('/tehilim')
                    ? 'bg-petroleum-800 text-parchment-100 border-petroleum-800 dark:bg-gold-500 dark:text-petroleum-950 dark:border-gold-500'
                    : 'border-border text-warmgray-600 dark:text-warmgray-400 hover:border-gold-500/40 hover:bg-gold-500/5',
                )}
                aria-current={pathname.startsWith('/tehilim') ? 'page' : undefined}
              >
                {cat.label}
              </Link>
            )
          }
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
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
          )
        })}
      </div>

      {/* Resultado */}
      {filtered.length === 0 ? (
        <NoStudiesFound />
      ) : (
        <>
          <p className="text-xs font-inter text-warmgray-400" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'estudo encontrado' : 'estudos encontrados'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((study) => (
              <Link
                key={study.slug}
                href={study.category === 'tehilim' ? '/tehilim' : `/studies/${study.slug}`}
                className="glass-card p-5 group hover:-translate-y-0.5 transition-all duration-150 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn(
                        'text-xs font-inter font-medium px-2.5 py-0.5 rounded-full capitalize',
                        CATEGORY_COLORS[study.category] ?? CATEGORY_COLORS.shiur,
                      )}>
                        {study.category}
                      </span>
                      {study.isPremium && (
                        <span className="premium-badge" aria-label="Conteúdo premium">
                          <Crown className="w-3 h-3" aria-hidden="true" />
                          Premium
                        </span>
                      )}
                    </div>
                    <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-snug">
                      {study.title}
                    </h3>
                  </div>
                  <span className="font-hebrew text-base text-warmgray-400 dark:text-warmgray-500 flex-shrink-0 text-right leading-relaxed" dir="rtl" aria-hidden="true">
                    {study.titleHebrew}
                  </span>
                </div>

                <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed line-clamp-2">
                  {study.excerpt}
                </p>

                {study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5" aria-label="Temas">
                    {study.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs font-inter text-warmgray-500 bg-muted px-2 py-0.5 rounded">
                        <Tag className="w-2.5 h-2.5" aria-hidden="true" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-border/30">
                  <span className="flex items-center gap-1 text-xs font-inter text-warmgray-400">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {study.readingTime} min
                  </span>
                  <span className="flex items-center gap-1 text-xs font-inter text-warmgray-400 group-hover:text-gold-500 transition-colors">
                    Ler estudo
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
