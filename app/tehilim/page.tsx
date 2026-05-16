import type { Metadata } from 'next'
import Link from 'next/link'
import { ScrollText } from 'lucide-react'
import { listTehilimPerakim } from '@/lib/tehilim-catalog'
import { TehilimIndexClient } from '@/components/tehilim/TehilimIndexClient'

export const metadata: Metadata = {
  title: 'Tehilim — PaRDeS e Passukim',
  description:
    'Sefer Tehilim com análise kabalística PaRDeS do Rav EBBY. Cada Perek em pasta própria com os Passukim em PDF.',
  openGraph: {
    title: 'Tehilim | Brit Mashiach',
    description: 'Salmos com Passukim em PDF, organizados por Perek.',
  },
}

export default async function TehilimPage() {
  const perakim = await listTehilimPerakim()

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <nav className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 mb-8">
        <Link href="/library" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
          ← Biblioteca
        </Link>
      </nav>

      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400">
          <ScrollText className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold uppercase tracking-[0.3em]">Sefer Tehilim</span>
        </div>
        <h1 className="section-title">Tehilim — Passukim em PDF</h1>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 max-w-2xl">
          A <strong className="font-medium text-petroleum-800 dark:text-parchment-100">Introdução aos Salmos</strong> está em{' '}
          <Link href="/tehilim/livro-0" className="text-gold-600 dark:text-gold-400 hover:underline underline-offset-2">
            Livro 0 — Apresentação
          </Link>
          {' '}(PDF editorial do Rav EBBY), não na seção Estudos.
        </p>
        <p className="font-hebrew text-2xl text-warmgray-500 dark:text-warmgray-400" dir="rtl" lang="he">
          תהלים
        </p>
        <p className="section-subtitle max-w-2xl">
          Análise kabalística PaRDeS do Rav EBBY. Cada <strong className="font-medium text-petroleum-800 dark:text-parchment-100">Perek</strong> tem sua pasta; dentro dela ficam os PDFs dos <strong className="font-medium text-petroleum-800 dark:text-parchment-100">Passukim</strong> (convertidos do DOCX).
        </p>
        <p className="text-xs font-inter text-warmgray-500 max-w-2xl">
          Publicação: suba os PDFs no Supabase Storage (bucket{' '}
          <code className="text-gold-700 dark:text-gold-400">tehilim-pdfs</code>), em pastas{' '}
          <code className="text-gold-700 dark:text-gold-400">perek-001/</code>,{' '}
          <code className="text-gold-700 dark:text-gold-400">perek-002/</code>… A apresentação fica em{' '}
          <code className="text-gold-700 dark:text-gold-400">livro-0/</code>.
        </p>
      </div>

      <TehilimIndexClient perakim={perakim} />
    </div>
  )
}
