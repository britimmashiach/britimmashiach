'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lock, Crown, FileText, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProfile } from '@/hooks/useProfile'
import type { Aliyah } from '@/lib/parashot-supabase'

const DAY_NAMES = [
  { pt: 'Domingo', trans: 'Yom Rishon' },
  { pt: 'Segunda-feira', trans: 'Yom Sheni' },
  { pt: 'Terça-feira', trans: 'Yom Shlishi' },
  { pt: "Quarta-feira", trans: "Yom Revi'i" },
  { pt: 'Quinta-feira', trans: 'Yom Chamishi' },
  { pt: 'Sexta-feira', trans: 'Yom Shishi' },
  { pt: 'Shabat', trans: '' },
] as const

const PARDES_COLORS: Record<string, string> = {
  peshat: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  remez:  'bg-green-500/10 text-green-700 dark:text-green-400',
  drash:  'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  sod:    'bg-purple-500/10 text-purple-700 dark:text-purple-400',
}

// Domingo = 0 → Aliyáh 1 … Shabbat = 6 → Aliyáh 7
function todayAliyahNumber(): number {
  return new Date().getDay() + 1
}

interface AliyotTabsProps {
  aliyot: Aliyah[]
}

export function AliyotTabs({ aliyot }: AliyotTabsProps) {
  const [activeTab, setActiveTab] = useState(1)
  const [todayTab, setTodayTab] = useState(1)
  const { isPremium, isAdmin, loading: profileLoading } = useProfile()

  useEffect(() => {
    const today = todayAliyahNumber()
    setTodayTab(today)
    setActiveTab(today)
  }, [])

  if (aliyot.length === 0) {
    return (
      <div className="glass-card p-8 text-center space-y-2">
        <p className="font-cinzel text-base text-warmgray-500">Aliyot desta Parashá ainda não disponíveis.</p>
        <p className="text-xs font-inter text-warmgray-400">O conteúdo está sendo preparado pelo Rav.</p>
      </div>
    )
  }

  const currentAliyah = aliyot.find((a) => a.aliyahNumber === activeTab) ?? null
  const canAccess = isPremium || isAdmin || activeTab === 1
  const weekProgress = todayTab

  return (
    <div className="space-y-5">

      {/* Progresso semanal */}
      <div className="glass-card p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-wider">
            Progresso desta semana
          </span>
          <span className="text-sm font-cinzel font-semibold text-petroleum-800 dark:text-parchment-100">
            {weekProgress}/7
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-gold-500 transition-all duration-500"
            style={{ width: `${(weekProgress / 7) * 100}%` }}
          />
        </div>
        <p className="text-xs font-inter text-warmgray-400">
          {DAY_NAMES[todayTab - 1].pt}
          {DAY_NAMES[todayTab - 1].trans ? ` (${DAY_NAMES[todayTab - 1].trans})` : ''}
          {' '}· Aliyáh {todayTab}
        </p>
      </div>

      {/* Abas */}
      <div className="flex gap-1.5 flex-wrap" role="tablist" aria-label="Aliyot da Parashá">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => {
          const day = DAY_NAMES[num - 1]
          const isToday = num === todayTab
          const isActive = num === activeTab
          const locked = !isPremium && !isAdmin && num > 1

          return (
            <button
              key={num}
              role="tab"
              aria-selected={isActive}
              aria-controls={`aliyah-panel-${num}`}
              onClick={() => setActiveTab(num)}
              className={cn(
                'flex-1 min-w-[64px] flex flex-col items-center gap-0.5 py-2.5 px-1 rounded-lg border text-center transition-all duration-150 relative',
                isActive
                  ? 'bg-petroleum-800 text-parchment-100 border-petroleum-800 dark:bg-gold-500 dark:text-petroleum-950 dark:border-gold-500'
                  : isToday
                    ? 'border-gold-500/60 bg-gold-500/5 text-petroleum-800 dark:text-parchment-100 hover:bg-gold-500/10'
                    : 'border-border text-warmgray-600 dark:text-warmgray-400 hover:border-gold-500/40 hover:bg-gold-500/5',
              )}
            >
              <span className="text-xs font-inter font-semibold leading-none">
                Aliyáh {num}
              </span>
              <span className={cn(
                'text-[10px] font-inter leading-tight',
                isActive ? 'opacity-80' : 'text-warmgray-400 dark:text-warmgray-500',
              )}>
                {num === 7 ? 'Shabat' : day.pt.split('-')[0]}
              </span>
              {locked && !profileLoading && (
                <Lock className="absolute top-1.5 right-1.5 w-2.5 h-2.5 opacity-50" aria-hidden="true" />
              )}
              {isToday && !isActive && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold-500" aria-label="Aliyáh de hoje" />
              )}
            </button>
          )
        })}
      </div>

      {/* Nome do dia atual */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-sm font-inter font-medium text-petroleum-800 dark:text-parchment-100">
          {DAY_NAMES[activeTab - 1].pt}
        </span>
        {DAY_NAMES[activeTab - 1].trans && (
          <span className="text-xs font-inter text-warmgray-400">
            ({DAY_NAMES[activeTab - 1].trans})
          </span>
        )}
        {activeTab === todayTab && (
          <span className="text-xs font-inter font-medium text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full">
            hoje
          </span>
        )}
      </div>

      {/* Painel de conteúdo */}
      <div
        id={`aliyah-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {profileLoading && activeTab > 1 ? (
          <div className="glass-card p-6 space-y-3 animate-pulse">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-5/6" />
          </div>
        ) : !canAccess ? (
          /* Gate premium */
          <div className="glass-card p-8 text-center space-y-4 border-gold-500/20">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                Aliyáh {activeTab} - Conteúdo Premium
              </h3>
              <p className="text-sm font-inter text-warmgray-500 max-w-sm mx-auto">
                {DAY_NAMES[activeTab - 1].pt}
                {DAY_NAMES[activeTab - 1].trans ? ` (${DAY_NAMES[activeTab - 1].trans})` : ''}
                . Acesso completo às 7 Aliyot com o plano Premium.
              </p>
            </div>
            <Link
              href="/premium"
              className="inline-flex items-center gap-2 btn-gold text-sm"
            >
              <Crown className="w-4 h-4" aria-hidden="true" />
              Assinar Premium - R$ 47/mês
            </Link>
          </div>
        ) : currentAliyah === null ? (
          <div className="glass-card p-6 text-center">
            <p className="text-sm font-inter text-warmgray-500">
              Aliyáh {activeTab} ainda não disponível para esta Parashá.
            </p>
          </div>
        ) : (
          <div className="glass-card p-6 space-y-5">
            {/* Título da Aliyáh */}
            <div className="space-y-2 pb-4 border-b border-border/40">
              <h3 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
                {currentAliyah.title}
              </h3>
              {currentAliyah.levelPardes.length > 0 && (
                <div className="flex flex-wrap gap-1.5" aria-label="Níveis PaRDeS desta Aliyáh">
                  {currentAliyah.levelPardes.map((level) => (
                    <span
                      key={level}
                      className={cn(
                        'text-xs font-inter font-medium px-2 py-0.5 rounded-full capitalize',
                        PARDES_COLORS[level] ?? 'bg-muted text-warmgray-500',
                      )}
                    >
                      {level}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="space-y-4">
              {currentAliyah.content.split('\n').map((line, i) => {
                if (line.trim() === '') return null
                return (
                  <p key={i} className="font-inter text-sm text-foreground leading-relaxed">
                    {line}
                  </p>
                )
              })}
            </div>

            {/* PDFs */}
            {(currentAliyah.pdfUrl || (isPremium && currentAliyah.pdfPremiumUrl) || (isAdmin && currentAliyah.pdfKabbalahUrl)) && (
              <div className="pt-4 border-t border-border/40 flex flex-wrap gap-4">
                {currentAliyah.pdfUrl && (
                  <a
                    href={currentAliyah.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    PDF desta Aliyáh
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
                {isPremium && currentAliyah.pdfPremiumUrl && (
                  <a
                    href={currentAliyah.pdfPremiumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-inter font-medium text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    PDF Premium
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
                {isAdmin && currentAliyah.pdfKabbalahUrl && (
                  <a
                    href={currentAliyah.pdfKabbalahUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-inter font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    PDF Cabalístico
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
