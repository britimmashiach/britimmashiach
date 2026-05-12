'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { findParashaByName } from '@/lib/parashot-registry'

const DAY_NAMES = [
  { pt: 'Domingo',       heb: 'Yom Rishon'   },
  { pt: 'Segunda-feira', heb: 'Yom Sheni'    },
  { pt: 'Terça-feira',   heb: 'Yom Shlishi'  },
  { pt: 'Quarta-feira',  heb: "Yom Revi'i"   },
  { pt: 'Quinta-feira',  heb: 'Yom Chamishi' },
  { pt: 'Sexta-feira',   heb: 'Yom Shishi'   },
  { pt: 'Shabat',        heb: ''             },
]

interface ParashaWidgetProps {
  name: string | null
  className?: string
}

export function ParashaWidget({ name, className }: ParashaWidgetProps) {
  const [todayNum, setTodayNum] = useState(1)

  useEffect(() => {
    setTodayNum(new Date().getDay() + 1)
  }, [])

  if (!name) return null

  const entry       = findParashaByName(name)
  const displayTitle = entry?.title      ?? name
  const slug         = entry?.slug       ?? name.toLowerCase().replace(/\s+/g, '-')
  const book         = entry?.book       ?? ''
  const weekNumber   = entry?.weekNumber ?? null

  const today = DAY_NAMES[todayNum - 1]
  const progressLabel =
    todayNum === 7 ? 'Shabat · ciclo completo' :
    todayNum === 1 ? '1/7 · início da semana' :
    `${todayNum}/7 · ${todayNum - 1} ${todayNum - 1 === 1 ? 'Aliyáh completada' : 'Aliyot completadas'}`

  return (
    <div className={cn('glass-card p-5 space-y-4', className)}>

      {/* Label */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-petroleum-800/10 dark:bg-petroleum-700/30 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-3.5 h-3.5 text-petroleum-700 dark:text-petroleum-300" aria-hidden="true" />
        </div>
        <span className="text-[10px] font-inter font-semibold text-warmgray-400 uppercase tracking-widest">
          Parasháh da Semana
        </span>
      </div>

      {/* Parashá + livro */}
      <div>
        {(book || weekNumber) && (
          <p className="text-[10px] font-inter text-warmgray-400 uppercase tracking-widest mb-1">
            {[book, weekNumber ? `Semana ${weekNumber}` : ''].filter(Boolean).join(' · ')}
          </p>
        )}
        <h3 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight">
          {displayTitle}
        </h3>
      </div>

      <hr className="border-border/40" />

      {/* Aliyáh de hoje */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <p className="text-[10px] font-inter font-semibold text-gold-600 dark:text-gold-500 uppercase tracking-widest">
            Aliyáh de hoje
          </p>
          <p className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Aliyáh {todayNum}
          </p>
          <p className="text-xs font-inter text-warmgray-500">
            {today.pt}{today.heb ? ` · ${today.heb}` : ''}
          </p>
        </div>
        <div
          className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center flex-shrink-0 shadow-gold-sm"
          aria-hidden="true"
        >
          <span className="font-cinzel text-base font-bold text-petroleum-950">
            {todayNum}
          </span>
        </div>
      </div>

      {/* Progresso semanal */}
      <div className="space-y-1.5">
        <div className="flex gap-1" role="progressbar" aria-valuenow={todayNum} aria-valuemin={1} aria-valuemax={7}>
          {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
            <div
              key={n}
              className={cn(
                'h-1 flex-1 rounded-full transition-all duration-300',
                n < todayNum  ? 'bg-gold-400/70' :
                n === todayNum ? 'bg-gold-500'    :
                'bg-border',
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="text-[10px] font-inter text-warmgray-400">
          {progressLabel}
        </p>
      </div>

      {/* CTA */}
      <Link
        href={`/parashot/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-inter font-medium text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 transition-colors"
      >
        Continuar estudo
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Link>
    </div>
  )
}
