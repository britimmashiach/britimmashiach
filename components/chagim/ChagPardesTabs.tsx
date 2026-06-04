'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Crown, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { RichMarkdown } from '@/components/ui/RichMarkdown'
import type { ChagPardesKey, ChagPardesPanel } from '@/lib/chag-pardes'
import { PARDES_TAB_ACTIVE } from '@/lib/chag-pardes'

const TAB_IDLE: Record<ChagPardesKey, string> = {
  peshat: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  remez: 'bg-green-500/10 text-green-700 dark:text-green-400',
  drash: 'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  sod: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
}

const TITLE_COLOR: Record<ChagPardesKey, string> = {
  peshat: 'text-blue-700 dark:text-blue-400',
  remez: 'text-green-700 dark:text-green-400',
  drash: 'text-gold-700 dark:text-gold-400',
  sod: 'text-purple-700 dark:text-purple-400',
}

type ChagPardesTabsProps = {
  chagName: string
  panels: ChagPardesPanel[]
}

export function ChagPardesTabs({ chagName, panels }: ChagPardesTabsProps) {
  const [active, setActive] = useState<ChagPardesKey>(panels[0]?.key ?? 'peshat')

  if (panels.length === 0) return null

  return (
    <section className="mt-10 mb-8" aria-labelledby="chag-pardes-heading">
      <div className="mb-5">
        <h2
          id="chag-pardes-heading"
          className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100"
        >
          PaRDeS de {chagName}
        </h2>
        <p className="text-xs font-inter text-warmgray-500 mt-1 max-w-2xl leading-relaxed">
          Quatro dimensões do estudo: Peshat e Remez abertos para leitura e busca. Drash e Sod com
          aprofundamento reservado a assinantes Premium.
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2 mb-6"
        role="tablist"
        aria-label={`Níveis PaRDeS de ${chagName}`}
      >
        {panels.map((panel) => {
          const isActive = active === panel.key
          return (
            <button
              key={panel.key}
              type="button"
              role="tab"
              id={`tab-chag-${panel.key}`}
              aria-selected={isActive}
              aria-controls={`panel-chag-${panel.key}`}
              onClick={() => setActive(panel.key)}
              className={cn(
                'inline-flex items-center gap-1.5 text-xs font-inter font-semibold px-3 py-1.5 rounded-full border transition-all capitalize',
                isActive
                  ? PARDES_TAB_ACTIVE[panel.key]
                  : cn(TAB_IDLE[panel.key], 'border-transparent hover:opacity-90'),
              )}
            >
              {panel.label}
              {panel.locked && <Lock className="w-3 h-3 opacity-70" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.key}
          id={`panel-chag-${panel.key}`}
          role="tabpanel"
          aria-labelledby={`tab-chag-${panel.key}`}
          hidden={active !== panel.key}
          className={active !== panel.key ? 'hidden' : undefined}
        >
          <article className="glass-card p-5 md:p-6 space-y-3">
            <header className="space-y-1 pb-3 border-b border-border/40">
              <h3 className={cn('font-cinzel text-lg font-semibold capitalize', TITLE_COLOR[panel.key])}>
                {panel.label}
              </h3>
              <p className="text-[11px] font-inter font-medium text-warmgray-500 uppercase tracking-wide">
                {panel.subtitle}
              </p>
            </header>

            {panel.body ? (
              <RichMarkdown text={panel.body} />
            ) : panel.teaser ? (
              <div className="space-y-4">
                <RichMarkdown text={panel.teaser} />
                <div className="rounded-xl border border-gold-500/25 bg-gold-500/5 p-5 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto">
                    <Lock className="w-4 h-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-md mx-auto">
                    O estudo completo de {panel.label} sobre {chagName} está disponível para
                    assinantes Premium, com fontes de Chazal, Zohar e tradição luriânica.
                  </p>
                  <Link
                    href="/premium"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-sm font-inter font-semibold text-petroleum-950 hover:bg-gold-400 transition-colors"
                  >
                    <Crown className="h-4 w-4 shrink-0" aria-hidden="true" />
                    Assinar Premium
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-sm font-inter text-warmgray-500">Conteúdo em preparação para este nível.</p>
            )}
          </article>
        </div>
      ))}
    </section>
  )
}
