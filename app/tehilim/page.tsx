import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ScrollText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tehilim — transliteração',
  description:
    'Sefer Tehilim com transliteração latina do hebraico massorético (em expansão). Complemento ao estudo PaRDeS e ao texto no Tanach.',
  openGraph: {
    title: 'Tehilim | Brit Mashiach',
    description: 'Transliteração dos Salmos e apoio ao estudo cabalístico.',
  },
}

export default function TehilimPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <nav className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 mb-8">
        <Link href="/library" className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
          ← Biblioteca
        </Link>
      </nav>

      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400">
          <ScrollText className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold uppercase tracking-[0.3em]">Sefer Tehilim</span>
        </div>
        <h1 className="section-title">Tehilim — transliteração</h1>
        <p className="font-hebrew text-2xl text-warmgray-500 dark:text-warmgray-400" dir="rtl" lang="he">
          תהלים
        </p>
        <p className="section-subtitle max-w-2xl">
          Aqui será publicada a <strong className="font-medium text-petroleum-800 dark:text-parchment-100">transliteração</strong> do hebraico massorético (com nikud) para leitura em caracteres latinos, salmo a salmo, à medida que o trabalho for concluído. O conteúdo cabalístico PaRDeS dos volumes do Rav mantém-se na obra em formato editorial; esta página concentra o texto devocional acessível online.
        </p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/80 p-6 space-y-4">
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-300 leading-relaxed">
          O material de transliteração será acrescentado aqui progressivamente. Até lá, pode usar o leitor massorético bilíngue do Tanach para o livro de Salmos.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/tanach/psalms"
            className="inline-flex items-center gap-2 rounded-lg border border-gold-500/30 bg-gold-500/10 px-4 py-2.5 text-sm font-inter font-medium text-gold-800 dark:text-gold-300 hover:bg-gold-500/15 transition-colors"
          >
            <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
            Tehilim massorético bilíngue (Tanach)
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2.5 text-sm font-inter text-warmgray-600 dark:text-warmgray-300 hover:border-gold-500/35 transition-colors"
          >
            Voltar à biblioteca
          </Link>
        </div>
      </div>
    </div>
  )
}
