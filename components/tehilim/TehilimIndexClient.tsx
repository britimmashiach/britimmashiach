'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, FolderOpen, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TehilimPerekFolder } from '@/lib/tehilim-catalog'

interface TehilimIndexClientProps {
  perakim: TehilimPerekFolder[]
}

export function TehilimIndexClient({ perakim }: TehilimIndexClientProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return perakim
    return perakim.filter(
      (p) =>
        p.label.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.labelHe?.includes(q) ?? false),
    )
  }, [perakim, query])

  return (
    <div className="space-y-6">
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar Perek ou Salmo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field pl-10"
          aria-label="Buscar Perek"
        />
      </div>


      {filtered.length === 0 ? (
        <p className="text-sm font-inter text-warmgray-500">Nenhuma pasta encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((perek) => (
            <Link
              key={perek.slug}
              href={`/tehilim/${perek.slug}`}
              className={cn(
                'rounded-xl border border-border/50 bg-card/80 p-4 flex flex-col gap-2',
                'hover:border-gold-500/35 hover:bg-gold-500/5 transition-colors',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <FolderOpen className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" aria-hidden="true" />
                {perek.labelHe && (
                  <span className="font-hebrew text-sm text-warmgray-500" dir="rtl" lang="he">
                    {perek.labelHe}
                  </span>
                )}
              </div>
              <h2 className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100">
                {perek.label}
              </h2>
              <p className="flex items-center gap-1.5 text-xs font-inter text-warmgray-500">
                <FileText className="w-3 h-3" aria-hidden="true" />
                {perek.pdfCount === 0
                  ? 'Sem PDFs ainda'
                  : `${perek.pdfCount} ${perek.pdfCount === 1 ? 'passuk' : 'passukim'}`}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
