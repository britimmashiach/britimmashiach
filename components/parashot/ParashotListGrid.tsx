'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Crown, ArrowRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Parasha } from '@/lib/parashot-supabase'
import { groupParashotByBook } from '@/lib/parashot-registry'

interface ParashotListGridProps {
  parashot: Parasha[]
  selectedSlug?: string | null
}

export function ParashotListGrid({ parashot, selectedSlug }: ParashotListGridProps) {
  const scrolledRef = useRef(false)

  useEffect(() => {
    if (!selectedSlug || scrolledRef.current) return
    const el = document.getElementById(`parasha-${selectedSlug}`)
    if (!el) return
    scrolledRef.current = true
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, [selectedSlug, parashot])

  return (
    <>
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
              const isSelected = selectedSlug === parasha.slug
              return (
                <Link
                  key={parasha.slug}
                  id={`parasha-${parasha.slug}`}
                  href={`/parashot/${parasha.slug}`}
                  className={cn(
                    'glass-card p-5 group hover:shadow-petroleum-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3',
                    isSelected && 'ring-2 ring-gold-500/70 shadow-gold-sm border-gold-500/30 bg-gold-500/5',
                  )}
                  aria-current={isSelected ? 'true' : undefined}
                >
                  {isSelected && (
                    <div className="flex items-center gap-1.5 -mt-1">
                      <Star
                        className="w-3.5 h-3.5 text-gold-500 fill-gold-500/30"
                        aria-hidden="true"
                      />
                      <span className="text-[11px] font-inter font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                        Parasháh desta semana
                      </span>
                    </div>
                  )}

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
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}
