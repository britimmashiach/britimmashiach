'use client'

import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Check, Loader2, RefreshCw, X } from 'lucide-react'
import {
  approveColacaoAction,
  listPendingColacaoAction,
  rejectColacaoAction,
  type AdminColacaoRow,
} from '@/app/admin/escola-actions'
import { cn } from '@/lib/utils'

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  } catch {
    return iso
  }
}

export function AdminColacaoPanel({
  serviceRoleConfigured,
  initialRows,
}: {
  serviceRoleConfigured: boolean
  initialRows: AdminColacaoRow[]
}) {
  const [rows, setRows] = useState(initialRows)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    setRows(initialRows)
  }, [initialRows])

  function refresh() {
    if (!serviceRoleConfigured) return
    startTransition(async () => {
      const r = await listPendingColacaoAction()
      if (!r.ok) {
        toast.error('Colação', { description: r.message })
        return
      }
      setRows(r.rows)
      toast.success('Lista atualizada', { description: `${r.rows.length} pendente(s)` })
    })
  }

  async function approve(id: string) {
    setBusyId(id)
    try {
      const r = await approveColacaoAction(id)
      if (!r.ok) {
        toast.error('Colação', { description: r.message })
        return
      }
      setRows((prev) => prev.filter((x) => x.id !== id))
      toast.success('Aprovado', { description: r.message })
    } finally {
      setBusyId(null)
    }
  }

  async function reject(id: string) {
    setBusyId(id)
    try {
      const r = await rejectColacaoAction(id)
      if (!r.ok) {
        toast.error('Colação', { description: r.message })
        return
      }
      setRows((prev) => prev.filter((x) => x.id !== id))
      toast.success('Rejeitado', { description: r.message })
    } finally {
      setBusyId(null)
    }
  }

  if (!serviceRoleConfigured) {
    return (
      <p className="text-sm text-warmgray-500">
        Configure a service role para gerenciar colações da Escola.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-warmgray-600 dark:text-warmgray-400">
          Membros aptos no questionário aguardam sua colação. A notificação no topo do site permanece
          até você aprovar ou rejeitar.
        </p>
        <button
          type="button"
          onClick={refresh}
          disabled={pending}
          className="inline-flex items-center gap-2 text-sm font-inter text-petroleum-800 dark:text-gold-400"
        >
          {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Atualizar
        </button>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-warmgray-500">Nenhuma colação pendente.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              className={cn(
                'rounded-xl border border-gold-500/30 bg-gold-500/5 p-4',
                'dark:border-gold-400/20 dark:bg-gold-400/5',
              )}
            >
              <p className="font-cinzel text-base text-petroleum-800 dark:text-parchment-100">
                {row.user_name || row.user_email}
              </p>
              <p className="text-xs font-inter text-warmgray-500 mt-1">{row.user_email}</p>
              <p className="text-sm font-inter mt-2">
                <span className="font-semibold">{row.course_title}</span>
                {' · '}
                Etapa {row.stage_number}: {row.stage_title}
              </p>
              <p className="text-xs text-warmgray-500 mt-1">
                Nota {row.score_pct}% · {formatWhen(row.created_at)}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  type="button"
                  disabled={busyId === row.id}
                  onClick={() => void approve(row.id)}
                  className="inline-flex items-center gap-1 rounded-lg bg-petroleum-800 px-3 py-1.5 text-sm text-gold-400"
                >
                  {busyId === row.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Concordo com a colação
                </button>
                <button
                  type="button"
                  disabled={busyId === row.id}
                  onClick={() => void reject(row.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm"
                >
                  <X className="w-4 h-4" />
                  Rejeitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
