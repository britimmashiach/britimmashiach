import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, BookOpen, HeartHandshake, Shield, ArrowRight } from 'lucide-react'
import { CONGREGATION } from '@/lib/site-brand'

export const metadata: Metadata = {
  title: 'Líderes',
  description:
    'Portal de líderes da Brit Im Mashiach: serviço na congregação, materiais de ministério e formação. Acesso por aprovação do Rav EBBY.',
}

const pillars = [
  {
    icon: HeartHandshake,
    title: 'Serviço na congregação',
    text: 'Líderes apoiam Shabatot, estudos, acolhimento e a vida comunitária em Franca e online.',
  },
  {
    icon: BookOpen,
    title: 'Formação contínua',
    text: 'Programa Manhigut (Beit Midrash do Manhig): formação kabalística para quem serve, com respeito pastoral a irmãos de origem evangélica.',
  },
  {
    icon: Shield,
    title: 'Acesso distinto do Premium',
    text: 'Premium é assinatura paga de conteúdo. Líder é papel aprovado pelo Rav para quem serve na obra.',
  },
]

export default function LideresPage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-petroleum-gradient opacity-[0.05] dark:opacity-[0.18]" />
        <div className="relative container mx-auto px-4 py-14 md:py-18 max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-petroleum-800/10 border border-petroleum-800/20 dark:border-gold-500/25">
            <Users className="w-3.5 h-3.5 text-petroleum-700 dark:text-gold-400" aria-hidden />
            <span className="text-xs font-inter font-semibold text-petroleum-700 dark:text-gold-400 uppercase tracking-widest">
              Líderes
            </span>
          </div>
          <h1 className="font-cinzel text-3xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Área de líderes
          </h1>
          <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic">
            {CONGREGATION}
          </p>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-prose mx-auto pt-2">
            Este espaço é para irmãos e irmãs que o Rav EBBY aprovar para liderar, ensinar e servir.
            Assinar Premium não substitui esta aprovação.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass-card p-6 space-y-3">
              <Icon className="w-8 h-8 text-gold-600 dark:text-gold-400" aria-hidden />
              <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">{title}</h2>
              <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 space-y-4 text-center max-w-xl mx-auto">
          <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Já é líder aprovado?
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
            Entre com sua conta e acesse o painel com materiais e avisos para líderes.
          </p>
          <Link
            href="/lideres/painel"
            className="inline-flex items-center gap-2 rounded-lg bg-petroleum-800 dark:bg-gold-500 px-6 py-3 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:opacity-90 transition-opacity"
          >
            Ir ao painel de líderes
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>

        <p className="text-center text-xs font-inter text-warmgray-500 mt-8 max-w-md mx-auto leading-relaxed">
          Deseja servir como líder? Converse com o Rav EBBY após os cultos ou pelo contato da congregação.
        </p>
      </section>
    </div>
  )
}
