'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, FileText, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PdfViewer } from '@/components/parashot/PdfViewer'
import type { TehilimPerekFolder } from '@/lib/tehilim-catalog'

interface TehilimPerekClientProps {
  perek: TehilimPerekFolder
}

export function TehilimPerekClient({ perek }: TehilimPerekClientProps) {
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null)

  return (
    <>
      <nav className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 mb-8">
        <Link href="/tehilim" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
          ← Tehilim
        </Link>
      </nav>

      <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400 mb-4">
        <ScrollText className="w-5 h-5" aria-hidden="true" />
        <span className="text-xs font-inter font-semibold uppercase tracking-[0.3em]">Passukim</span>
      </div>

      <div className="mb-8 space-y-2">
        <h1 className="section-title">{perek.label}</h1>
        {perek.labelHe && (
          <p className="font-hebrew text-2xl text-warmgray-500 dark:text-warmgray-400" dir="rtl" lang="he">
            {perek.labelHe}
          </p>
        )}
        <p className="section-subtitle max-w-2xl">
          {perek.pdfCount === 0
            ? `Nenhum PDF nesta pasta ainda. Coloque os arquivos em public/tehilim/${perek.slug}/`
            : `${perek.pdfCount} ${perek.pdfCount === 1 ? 'passuk publicado' : 'passukim publicados'} neste Perek.`}
        </p>
      </div>

      {perek.pdfs.length === 0 ? (
        <p className="text-sm font-inter text-warmgray-500">Em breve.</p>
      ) : (
        <ul className="space-y-2">
          {perek.pdfs.map((pdf) => (
            <li key={pdf.fileName} className="flex gap-2">
              <button
                type="button"
                onClick={() => setActivePdf({ url: pdf.url, title: pdf.title })}
                className={cn(
                  'flex-1 flex items-center gap-3 rounded-xl border border-border/50 bg-card/80 px-4 py-3.5',
                  'text-left hover:border-gold-500/35 hover:bg-gold-500/5 transition-colors',
                )}
              >
                <FileText className="w-4 h-4 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-petroleum-800 dark:text-parchment-100">{pdf.title}</span>
              </button>
              <a
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'shrink-0 flex items-center justify-center rounded-xl border border-border/50 bg-card/80 px-3',
                  'hover:border-gold-500/35 hover:bg-gold-500/5 transition-colors',
                )}
                aria-label={`Abrir ${pdf.title} em nova aba`}
                title="Abrir em nova aba"
              >
                <ExternalLink className="w-4 h-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {activePdf && (
        <PdfViewer
          url={activePdf.url}
          title={activePdf.title}
          open={!!activePdf}
          onClose={() => setActivePdf(null)}
        />
      )}
    </>
  )
}
