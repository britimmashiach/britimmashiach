import type { Metadata } from 'next'
import { Library } from 'lucide-react'
import { LibraryClient } from '@/components/library/LibraryClient'

export const metadata: Metadata = {
  title: 'Biblioteca Espiritual',
  description: 'Siddur, Machzor, Tehilim, Kabaláh Luriana, obras do Rav EBBY e textos clássicos judaicos.',
  openGraph: {
    title: 'Biblioteca | Brit Mashiach',
    description: 'Acervo espiritual completo: Siddur, Tehilim, Modelo Netivot e obras do Rav EBBY.',
  },
}

export const books = [
  {
    id: '1',
    title: 'Siddur Shabbat Shacharit',
    titleHebrew: 'סידור שבת שחרית',
    author: 'Rav Eliahu Barzilay ben Yehoshua',
    description: 'Siddur completo para Shacharit de Shabbat, com transliteração e comentários cabalísticos.',
    category: 'siddur',
    isPremium: false,
    year: 5785,
  },
  {
    id: '2',
    title: 'Tehilim: transliteração e PaRDeS (L. I–II)',
    titleHebrew: 'תהלים קבלי',
    author: 'Rav Eliahu Barzilay ben Yehoshua',
    description:
      'Salmos 1 a 72 com análise PaRDeS (obra editorial). Transliteração latina do massoreto em preparação para leitura online neste site.',
    category: 'tehilim',
    isPremium: false,
    year: 5785,
    readOnlineHref: '/tehilim',
  },
  {
    id: '3',
    title: 'Modelo Netivot: 32 Caminhos',
    titleHebrew: 'מודל נתיבות',
    author: 'Rav Eliahu Barzilay ben Yehoshua',
    description: 'Sistema proprietário de 32 caminhos da Árvore da Vida segundo o método do Rav EBBY.',
    category: 'kabaláh',
    isPremium: true,
    year: 5785,
  },
  {
    id: '4',
    title: '49 Portões da Alma',
    titleHebrew: 'מ״ט שערי הנשמה',
    author: 'Rav Eliahu Barzilay ben Yehoshua',
    description: 'Meditações e kavanot para os 49 dias de Sefirat haOmer, um portal por dia.',
    category: 'kabaláh',
    isPremium: true,
    year: 5785,
  },
  {
    id: '5',
    title: 'Livro Alef-Beit',
    titleHebrew: 'ספר אלף-בית',
    author: 'Rav Eliahu Barzilay ben Yehoshua',
    description: 'Análise espiritual profunda de cada letra hebraica: forma, guematria e meditação.',
    category: 'kabaláh',
    isPremium: true,
    year: 5786,
  },
  {
    id: '6',
    title: 'Etz Chaim: Árvore da Vida',
    titleHebrew: 'עץ חיים',
    author: 'Rav Yitzchak Luria (Arizal)',
    description: 'Obra fundamental da Kabaláh Luriana. Estrutura do sistema de Olamot, Sefirot e Tzimtzum.',
    category: 'kabaláh',
    isPremium: true,
    year: 5340,
  },
  {
    id: '7',
    title: 'Calendário Litúrgico 5786',
    titleHebrew: 'לוח ליטורגי תשפ״ו',
    author: 'Rav Eliahu Barzilay ben Yehoshua',
    description: 'Calendário completo do ano 5786 com Moedim, Parashiot e datas litúrgicas.',
    category: 'siddur',
    isPremium: false,
    year: 5786,
  },
  {
    id: '8',
    title: 'Toráh: Chumash Completo',
    titleHebrew: 'חומש שלם',
    author: 'Tradição Massorética',
    description: 'Os cinco livros da Toráh em hebraico massorético com nikud completo.',
    category: 'toráh',
    isPremium: false,
    year: null,
    readOnlineTanachResume: { fallbackHref: '/tanach/genesis', scope: 'torah' as const },
  },
]

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2">
          <Library className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Acervo Espiritual
          </span>
        </div>
        <h1 className="section-title">Biblioteca</h1>
        <p className="section-subtitle max-w-xl">
          Obras do Rav EBBY, textos clássicos cabalísticos e material litúrgico da Congregação Brit Im Mashiach.
        </p>
      </div>

      <LibraryClient books={books} />
    </div>
  )
}
