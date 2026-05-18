'use client'

import { FileText } from 'lucide-react'
import { PdfButton } from '@/components/ui/PdfButton'
import { studyLibraryPdfUrl } from '@/lib/study-library-pdf'

interface StudyLibraryPdfProps {
  studySlug: string
  pdfTitle: string
}

export function StudyLibraryPdf({ studySlug, pdfTitle }: StudyLibraryPdfProps) {
  const url = studyLibraryPdfUrl(studySlug)
  if (!url) return null

  return (
    <section
      className="mt-8 rounded-xl border border-gold-500/30 bg-gold-500/[0.06] dark:bg-petroleum-900/40 p-5 space-y-3"
      aria-labelledby="study-pdf-heading"
    >
      <div className="flex items-start gap-3">
        <span
          className="w-10 h-10 rounded-lg bg-petroleum-800 dark:bg-gold-500/20 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <FileText className="w-5 h-5 text-gold-600 dark:text-gold-400" />
        </span>
        <div className="space-y-1 min-w-0">
          <h2
            id="study-pdf-heading"
            className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100"
          >
            Modelo Fixo de Netivot (PDF)
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            Referência completa dos 22 caminhos (11 a 32) da Etz Chaim, letras do Alef-Beit, Sefirot e Olamot.
            Método Rav EBBY · Brit Im Mashiach.
          </p>
        </div>
      </div>
      <PdfButton url={url} title={pdfTitle} label="Abrir Modelo Fixo no visualizador" className="w-full sm:w-auto justify-center" />
      <p className="text-[11px] font-inter text-warmgray-500 leading-relaxed">
        Conta logada (Premium ou Admin). Envie o arquivo em Supabase Storage → bucket{' '}
        <span className="font-mono text-[10px]">library-pdfs</span> →{' '}
        <span className="font-mono text-[10px]">netivot/modelo-fixo-rav-ebby.pdf</span> se o visualizador
        retornar erro.
      </p>
    </section>
  )
}
