'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { getTanachBook } from '@/lib/tanach-books'
import { loadTanachLastRead, loadTanachViewPref } from '@/lib/tanach-reading-prefs'

export function TanachContinueReading() {
  const [href, setHref] = useState<string | null>(null)
  const [label, setLabel] = useState<string>('')

  useEffect(() => {
    const last = loadTanachLastRead()
    if (!last) return
    const meta = getTanachBook(last.bookSlug)
    if (!meta || last.chapter < 1 || last.chapter > meta.chapters) return
    const v = loadTanachViewPref()
    const q = v === 'both' ? '' : `?view=${v}`
    setHref(`/tanach/${last.bookSlug}/${last.chapter}${q}`)
    setLabel(`${meta.titlePt} · cap. ${last.chapter}`)
  }, [])

  if (!href) return null

  return (
    <div className="mb-8 rounded-xl border border-gold-500/25 bg-gold-500/[0.06] px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <p className="text-sm font-inter text-petroleum-800 dark:text-parchment-100">
        <span className="text-warmgray-500 dark:text-warmgray-400 text-xs uppercase tracking-wider block mb-0.5">
          Continuar a ler
        </span>
        {label}
      </p>
      <Link
        href={href}
        className="inline-flex items-center justify-center gap-1.5 shrink-0 rounded-lg border border-gold-500/35 bg-gold-500/15 px-3 py-2 text-xs font-inter font-medium text-gold-900 dark:text-gold-200 hover:bg-gold-500/25 transition-colors"
      >
        <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
        Abrir
      </Link>
    </div>
  )
}
