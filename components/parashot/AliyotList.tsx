'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, FileText, Download, Crown, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useProfile } from '@/hooks/useProfile'
import type { Aliyah } from '@/lib/parashot-supabase'
import { PdfViewer } from './PdfViewer'

const DAY_NAMES = [
  { pt: 'Domingo',       trans: 'Yom Rishon'   },
  { pt: 'Segunda-feira', trans: 'Yom Sheni'    },
  { pt: 'Terça-feira',   trans: 'Yom Shlishi'  },
  { pt: "Quarta-feira",  trans: "Yom Revi'i"   },
  { pt: 'Quinta-feira',  trans: 'Yom Chamishi' },
  { pt: 'Sexta-feira',   trans: 'Yom Shishi'   },
  { pt: 'Shabat',        trans: ''             },
]

const PARDES_COLORS: Record<string, string> = {
  peshat: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  remez:  'bg-green-500/10 text-green-700 dark:text-green-400',
  drash:  'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  sod:    'bg-purple-500/10 text-purple-700 dark:text-purple-400',
}

interface AliyotListProps {
  aliyot: Aliyah[]
}

export function AliyotList({ aliyot }: AliyotListProps) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [todayAliyah, setTodayAliyah] = useState(1)
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null)
  const { isPremium, isAdmin, loading: profileLoading } = useProfile()

  useEffect(() => {
    const today = new Date().getDay() + 1
    setTodayAliyah(today)
    setExpanded(today)
  }, [])

  return (
    <div className="space-y-4">

      {/* Progresso semanal */}
      <div className="glass-card p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-wider">
            Progresso desta semana
          </span>
          <span className="text-sm font-cinzel font-semibold text-petroleum-800 dark:text-parchment-100">
            {todayAliyah}/7
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-gold-500 transition-all duration-500"
            style={{ width: `${(todayAliyah / 7) * 100}%` }}
          />
        </div>
        <p className="text-xs font-inter text-warmgray-400">
          {DAY_NAMES[todayAliyah - 1].pt}
          {DAY_NAMES[todayAliyah - 1].trans ? ` (${DAY_NAMES[todayAliyah - 1].trans})` : ''}
          {' '}· Aliyáh {todayAliyah} de hoje
        </p>
      </div>

      {/* Lista de Aliyot */}
      <div className="space-y-2">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => {
          const aliyah    = aliyot.find((a) => a.aliyahNumber === num) ?? null
          const day       = DAY_NAMES[num - 1]
          const isToday   = num === todayAliyah
          const isExpanded = expanded === num
          const canAccess = isPremium || isAdmin || num === 1
          const isLocked  = !canAccess && !profileLoading

          const pdfHref = canAccess
            ? ((isAdmin && aliyah?.pdfKabbalahUrl)
                || (isPremium && aliyah?.pdfPremiumUrl)
                || aliyah?.pdfUrl
                || null)
            : null

          const pdfLabel = isAdmin && aliyah?.pdfKabbalahUrl
            ? `PDF Cabalístico — Aliyáh ${num}`
            : isPremium && aliyah?.pdfPremiumUrl
              ? `PDF Premium — Aliyáh ${num}`
              : `Aliyáh ${num} — PDF`

          return (
            <div
              key={num}
              className={cn(
                'rounded-xl border overflow-hidden transition-all duration-200',
                isToday
                  ? 'border-gold-500/50 bg-gold-500/3 animate-today-aura'
                  : 'border-border/60 bg-background',
                isExpanded && !isToday && 'border-petroleum-500/30',
              )}
            >
              {/* Cabeçalho — o item inteiro é clicável */}
              <button
                className="w-full flex items-center gap-3 p-4 text-left"
                onClick={() => setExpanded(isExpanded ? null : num)}
                aria-expanded={isExpanded}
                aria-controls={`aliyah-panel-${num}`}
              >
                {/* Número */}
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                  'font-cinzel text-sm font-semibold',
                  isToday
                    ? 'bg-gold-500 text-petroleum-950'
                    : 'bg-muted text-warmgray-600 dark:text-warmgray-400',
                )}>
                  {num}
                </div>

                {/* Nome + dia + badges */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100">
                      Aliyáh {num}
                    </span>
                    {isToday && (
                      <span className="text-xs font-inter font-medium text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full">
                        hoje
                      </span>
                    )}
                    {isLocked && (
                      <span className="premium-badge">
                        <Crown className="w-2.5 h-2.5" aria-hidden="true" />
                        Premium
                      </span>
                    )}
                    {aliyah && aliyah.levelPardes.length > 0 && (
                      aliyah.levelPardes.map((lvl) => (
                        <span
                          key={lvl}
                          className={cn(
                            'text-[10px] font-inter font-medium px-1.5 py-0.5 rounded-full capitalize',
                            PARDES_COLORS[lvl] ?? 'bg-muted text-warmgray-500',
                          )}
                        >
                          {lvl}
                        </span>
                      ))
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs font-inter text-warmgray-500">
                      {num === 7 ? 'Shabat' : day.pt}
                      {day.trans ? ` · ${day.trans}` : ''}
                    </p>
                    {canAccess && aliyah?.pdfUrl && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-inter font-medium text-green-600 dark:text-green-500">
                        <CheckCircle2 className="w-2.5 h-2.5" aria-hidden="true" />
                        PDF
                      </span>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                <div className="flex-shrink-0 text-warmgray-400 dark:text-warmgray-500">
                  {isExpanded
                    ? <ChevronUp  className="w-4 h-4" aria-hidden="true" />
                    : <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  }
                </div>
              </button>

              {/* Painel expandido */}
              {isExpanded && (
                <div id={`aliyah-panel-${num}`}>
                  {canAccess ? (
                    aliyah ? (
                      /* Conteúdo real */
                      <div className="px-4 pb-5 border-t border-border/40 pt-4 space-y-4">
                        {aliyah.title && aliyah.title !== `Aliyah ${num}` && (
                          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                            {aliyah.title}
                          </h3>
                        )}
                        <div className="space-y-3">
                          {aliyah.content.split('\n').map((line, i) => {
                            if (line.trim() === '') return null
                            return (
                              <p key={i} className="font-inter text-sm text-foreground leading-relaxed">
                                {line}
                              </p>
                            )
                          })}
                        </div>
                        {pdfHref && (
                          <div className="pt-3 border-t border-border/30 flex flex-wrap gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActivePdf({ url: pdfHref, title: pdfLabel })
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-petroleum-700 dark:text-parchment-200 hover:text-gold-600 dark:hover:text-gold-400 transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted hover:border-gold-500/40"
                            >
                              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                              Ler PDF
                            </button>
                            <a
                              href={pdfHref}
                              download
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-warmgray-500 hover:text-petroleum-700 dark:hover:text-parchment-100 transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted"
                            >
                              <Download className="w-3.5 h-3.5" aria-hidden="true" />
                              Download
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Placeholder quando sem dados */
                      <div className="px-4 pb-5 border-t border-border/40 pt-4">
                        <p className="text-sm font-inter text-warmgray-500 italic">
                          Conteúdo desta Aliyáh em preparação pelo Rav.
                        </p>
                      </div>
                    )
                  ) : profileLoading ? (
                    /* Skeleton enquanto carrega perfil */
                    <div className="px-4 pb-4 border-t border-border/40 pt-4 space-y-2 animate-pulse">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                      <div className="h-3 bg-muted rounded w-4/5" />
                    </div>
                  ) : (
                    /* Prévia desfocada — gate premium */
                    <div className="relative border-t border-border/40 overflow-hidden min-h-[160px]">
                      <div
                        className="px-4 pt-4 pb-4 space-y-2.5 blur-sm select-none pointer-events-none"
                        aria-hidden="true"
                      >
                        {[100, 88, 95, 75, 100, 82].map((w, i) => (
                          <div
                            key={i}
                            className="h-2.5 bg-warmgray-300/60 dark:bg-warmgray-600/40 rounded-full"
                            style={{ width: `${w}%` }}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2.5 pb-5 text-center px-4">
                        <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center">
                          <Crown className="w-4 h-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
                        </div>
                        <p className="text-xs font-inter text-warmgray-500 max-w-[220px]">
                          Acesso completo às 7 Aliyot com o plano Premium.
                        </p>
                        <Link
                          href="/premium"
                          className="inline-flex items-center gap-1.5 btn-gold text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Assinar Premium - R$ 47/mês
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Visualizador de PDF */}
      <PdfViewer
        url={activePdf?.url ?? ''}
        title={activePdf?.title ?? ''}
        open={!!activePdf}
        onClose={() => setActivePdf(null)}
      />
    </div>
  )
}
