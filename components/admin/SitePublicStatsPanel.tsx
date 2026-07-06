'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Crown, Eye, GraduationCap, Loader2, RefreshCw, Save, Users } from 'lucide-react'
import {
  getLiveProfileCountsAction,
  updateSitePublicStatsAction,
  type SitePublicStatsPayload,
} from '@/app/admin/actions'
import type { LiveProfileCounts, SitePublicStats } from '@/lib/site-public-stats'
import { formatPublicStat } from '@/lib/site-public-stats'
import { cn } from '@/lib/utils'

type FieldKey = keyof SitePublicStatsPayload

const FIELDS: {
  key: FieldKey
  label: string
  icon: typeof Users
  liveKey?: keyof LiveProfileCounts
  manualOnly?: boolean
}[] = [
  { key: 'visitors', label: 'Visitantes (exibido)', icon: Eye, manualOnly: true },
  { key: 'members', label: 'Membros (exibido)', icon: Users, liveKey: 'members' },
  { key: 'leaders', label: 'Líderes (exibido)', icon: GraduationCap, liveKey: 'leaders' },
  { key: 'mestres', label: 'Mestres (exibido)', icon: Crown, liveKey: 'mestres' },
]

export function SitePublicStatsPanel({
  serviceRoleConfigured,
  initialStats,
  initialLive,
}: {
  serviceRoleConfigured: boolean
  initialStats: SitePublicStats
  initialLive: LiveProfileCounts | null
}) {
  const router = useRouter()
  const [values, setValues] = useState<SitePublicStatsPayload>({
    visitors: initialStats.visitors,
    members: initialStats.members,
    leaders: initialStats.leaders,
    mestres: initialStats.mestres,
  })
  const [live, setLive] = useState<LiveProfileCounts | null>(initialLive)
  const [saving, setSaving] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  function setField(key: FieldKey, raw: string) {
    const n = Math.max(0, Math.floor(Number(raw) || 0))
    setValues((v) => ({ ...v, [key]: n }))
  }

  function applyLive(key: FieldKey, liveKey: keyof LiveProfileCounts) {
    if (!live) return
    setValues((v) => ({ ...v, [key]: live[liveKey] }))
  }

  function applyAllLive() {
    if (!live) return
    setValues({
      visitors: values.visitors,
      members: live.members,
      leaders: live.leaders,
      mestres: live.mestres,
    })
    toast.message('Contagens reais aplicadas', {
      description: 'Membros, líderes e mestres. Visitantes permanece manual.',
    })
  }

  async function refreshLive() {
    setRefreshing(true)
    try {
      const r = await getLiveProfileCountsAction()
      if (!r.ok) {
        toast.error('Não foi possível ler profiles', { description: r.message })
        return
      }
      setLive(r.counts)
      toast.success('Contagens reais atualizadas')
    } finally {
      setRefreshing(false)
    }
  }

  async function save() {
    setSaving(true)
    try {
      const r = await updateSitePublicStatsAction(values)
      if (!r.ok) {
        toast.error('Não foi possível salvar', { description: r.message })
        return
      }
      toast.success('Contadores da home atualizados')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const updatedLabel = initialStats.updatedAt
    ? new Date(initialStats.updatedAt).toLocaleString('pt-BR')
    : null

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/50 px-4 py-3 md:px-6 space-y-1">
        <h3 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
          Contadores da página inicial
        </h3>
        <p className="text-xs font-inter text-warmgray-500 leading-relaxed max-w-3xl">
          Números visíveis a todos em <code className="text-[10px] bg-muted px-1 rounded">/</code>.
          Visitantes é sempre manual (estimativa ou contagem externa). Membros, líderes e mestres podem
          copiar a contagem real de <code className="text-[10px] bg-muted px-1 rounded">profiles</code> ou
          ser ajustados para motivar inscrições.
          {updatedLabel ? (
            <>
              {' '}
              Última alteração: <span className="text-warmgray-600 dark:text-warmgray-400">{updatedLabel}</span>.
            </>
          ) : null}
        </p>
      </div>

      {!serviceRoleConfigured && (
        <p className="px-4 md:px-6 py-3 text-xs font-inter text-amber-800 dark:text-amber-200 bg-amber-500/10 border-b border-amber-500/20">
          Sem service role, só é possível salvar se a migração SQL já estiver aplicada no Supabase e você
          estiver logado como admin.
        </p>
      )}

      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void refreshLive()}
            disabled={refreshing || !serviceRoleConfigured}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-inter font-medium hover:bg-muted disabled:opacity-50"
          >
            {refreshing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            Atualizar contagens reais
          </button>
          <button
            type="button"
            onClick={applyAllLive}
            disabled={!live}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gold-500/40 px-3 py-2 text-xs font-inter font-medium text-gold-800 dark:text-gold-300 hover:bg-gold-500/10 disabled:opacity-50"
          >
            Aplicar reais (membros, líderes, mestres)
          </button>
        </div>

        {live && (
          <p className="text-[11px] font-inter text-warmgray-500">
            Real agora: {formatPublicStat(live.members)} membros · {formatPublicStat(live.leaders)} líderes ·{' '}
            {formatPublicStat(live.mestres)} mestres
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map(({ key, label, icon: Icon, liveKey, manualOnly }) => (
            <label key={key} className="block space-y-1.5">
              <span className="flex items-center gap-2 text-sm font-inter font-medium text-foreground">
                <Icon className="h-4 w-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
                {label}
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={values[key]}
                  onChange={(e) => setField(key, e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-inter tabular-nums"
                />
                {liveKey && live && (
                  <button
                    type="button"
                    title="Usar contagem real"
                    onClick={() => applyLive(key, liveKey)}
                    className={cn(
                      'shrink-0 rounded-lg border border-border px-2.5 text-[10px] font-inter font-semibold uppercase tracking-wide',
                      'hover:bg-muted text-warmgray-600 dark:text-warmgray-400',
                    )}
                  >
                    Real
                  </button>
                )}
              </div>
              {manualOnly && (
                <span className="text-[10px] font-inter text-warmgray-500">Somente manual</span>
              )}
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="btn-gold text-sm inline-flex items-center gap-2 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="h-4 w-4" aria-hidden="true" />
          )}
          Salvar contadores
        </button>
      </div>
    </div>
  )
}
