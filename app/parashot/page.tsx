import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { fetchParashot } from '@/lib/parashot-supabase'
import { ParashotListGrid } from '@/components/parashot/ParashotListGrid'

export const metadata: Metadata = {
  title: 'Parashot',
  description: 'Porções semanais da Toráh com Aliyot diárias e análise PaRDeS completa.',
}

export const dynamic = 'force-dynamic'

interface ParashotPageProps {
  searchParams: Promise<{ select?: string }>
}

export default async function ParashotPage({ searchParams }: ParashotPageProps) {
  const { select } = await searchParams
  const parashot = await fetchParashot()
  const selectedSlug = select?.trim().toLowerCase() || null

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Cabeçalho */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-500" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Ciclo da Toráh
          </span>
        </div>
        <h1 className="section-title">Parashot Semanais</h1>
        <p className="section-subtitle max-w-2xl">
          54 porções da Toráh. Cada Parashá contém 7 Aliyot, uma por dia da semana, com estudo nos quatro níveis
          PaRDeS do Rav EBBY. A introdução e a Aliyáh 1 são públicas; o estudo completo com PDFs está no Premium.
        </p>
        <p className="text-sm font-inter text-warmgray-500 max-w-2xl leading-relaxed">
          Entenda o método em{' '}
          <Link href="/metodo-pardes" className="text-gold-600 hover:underline dark:text-gold-400">
            Método PaRDeS
          </Link>
          , a{' '}
          <Link href="/judaismo-messianico" className="text-gold-600 hover:underline dark:text-gold-400">
            identidade messiânica
          </Link>
          {' '}ou consulte o{' '}
          <Link href="/faq" className="text-gold-600 hover:underline dark:text-gold-400">
            FAQ
          </Link>
          .
        </p>
      </div>

      {/* Estado vazio */}
      {parashot.length === 0 && (
        <div className="glass-card p-10 text-center space-y-3 max-w-lg mx-auto">
          <p className="font-cinzel text-base text-warmgray-600 dark:text-warmgray-400">
            Nenhuma Parashá listada no momento.
          </p>
          <p className="text-xs font-inter text-warmgray-500 leading-relaxed">
            A lista vem da tabela <code className="text-[11px] bg-muted px-1 rounded">parashot</code> no Supabase (chave{' '}
            <code className="text-[11px] bg-muted px-1 rounded">anon</code>).
            Tabela vazia, RLS sem SELECT para <code className="text-[11px] bg-muted px-1 rounded">anon</code>, ou variáveis{' '}
            <code className="text-[11px] bg-muted px-1 rounded">NEXT_PUBLIC_SUPABASE_*</code> na Vercel apontando para outro projeto
            geram a mesma tela vazia.
          </p>
          <p className="text-xs font-inter text-warmgray-400">
            Administrador: Supabase → <strong>Table Editor</strong> → <strong>parashot</strong> (linhas);{' '}
            <strong>Database</strong> → <strong>Policies</strong> em <strong>parashot</strong> — política de SELECT para{' '}
            <code className="text-[11px] bg-muted px-1 rounded">anon</code> (ex.: <code className="text-[11px] bg-muted px-1 rounded">parashot_select_public</code>).
            Vercel: conferir URL e anon key do <em>mesmo</em> projeto. SQL de seed: <code className="text-[11px] bg-muted px-1 rounded">supabase/seed_parashot_54.sql</code>.
          </p>
        </div>
      )}

      {/* Lista por livro — destaca ?select=slug vinda do calendário */}
      <ParashotListGrid parashot={parashot} selectedSlug={selectedSlug} />
    </div>
  )
}
