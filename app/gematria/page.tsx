import type { Metadata } from 'next'
import { Hash } from 'lucide-react'
import { GematriaClient } from '@/components/gematria/GematriaClient'

export const metadata: Metadata = {
  title: 'Gematria — calculadora e busca por valor',
  description:
    'Calculadora de gematria judaica em vários métodos (Mispar Hechrachi, Gadol, Siduri, Katan, AtBash e mais) e busca reversa: digite um número e encontre palavras hebraicas do Tanach e do dicionário com aquele valor.',
  keywords: [
    'gematria',
    'guematria',
    'calculadora de gematria',
    'mispar hechrachi',
    'atbash',
    'valor das letras hebraicas',
    'cabala',
    'kabbalah',
  ],
}

export default function GematriaPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2 text-gold-600 dark:text-gold-400">
          <Hash className="w-5 h-5" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold uppercase tracking-[0.3em]">
            Gematria — גימטריה
          </span>
        </div>
        <h1 className="section-title">Calculadora de Gematria</h1>
        <p className="section-subtitle max-w-2xl">
          Some o valor das letras de uma palavra hebraica em vários métodos tradicionais — ou faça o
          caminho inverso: digite um número e descubra quais palavras do{' '}
          <strong className="font-medium text-petroleum-800 dark:text-parchment-100">Tanach</strong> e do
          dicionário compartilham aquele valor. Use o teclado hebraico na tela se preferir.
        </p>
      </div>

      <GematriaClient />

      <div className="mt-12 rounded-2xl border border-border/40 bg-muted/20 p-5 sm:p-6">
        <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 mb-2">
          O que é gematria?
        </h2>
        <p className="text-sm font-inter text-foreground/75 leading-relaxed">
          A gematria (גימטריה) é a tradição judaica de atribuir valores numéricos às letras hebraicas
          e ler relações de sentido entre palavras com o mesmo valor. É uma das ferramentas
          interpretativas da Toráh e da Kabaláh — por exemplo, אהבה (amor) e אחד (um) somam ambos 13,
          e משיח (Messias) e נחש (serpente) somam 358. Esta ferramenta é de estudo: o valor é o ponto
          de partida para a reflexão, não um fim em si.
        </p>
      </div>
    </div>
  )
}
