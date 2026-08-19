'use client'

import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Download, GraduationCap, Loader2, Mail, RefreshCw } from 'lucide-react'
import type { AdminGraduateRow } from '@/app/admin/actions'
import {
  generateDiplomaBase64Action,
  listFormationGraduatesAction,
  sendDiplomaEmailAction,
} from '@/app/admin/actions'
import { cn } from '@/lib/utils'

function formatDate(iso: string | null) {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    })
  } catch {
    return iso.slice(0, 10)
  }
}

function downloadBase64Pdf(filename: string, base64: string) {
  const bin = atob(base64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  const blob = new Blob([bytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function AdminGraduatesPanel({
  serviceRoleConfigured,
  initialGraduates,
}: {
  serviceRoleConfigured: boolean
  initialGraduates: AdminGraduateRow[]
}) {
  const [graduates, setGraduates] = useState(initialGraduates)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    setGraduates(initialGraduates)
  }, [initialGraduates])

  function refresh() {
    if (!serviceRoleConfigured) return
    startTransition(async () => {
      const r = await listFormationGraduatesAction()
      if (!r.ok) {
        toast.error('Formação concluída', { description: r.message })
        return
      }
      setGraduates(r.graduates)
      toast.success('Lista atualizada', { description: `${r.graduates.length} concluinte(s)` })
    })
  }

  async function downloadDiploma(id: string) {
    setBusyId(id)
    try {
      const r = await generateDiplomaBase64Action(id)
      if (!r.ok) {
        toast.error('Diploma', { description: r.message })
        return
      }
      downloadBase64Pdf(r.filename, r.base64)
      toast.success('Diploma gerado', { description: 'Download iniciado.' })
    } finally {
      setBusyId(null)
    }
  }

  async function sendDiploma(id: string) {
    setBusyId(id)
    try {
      const r = await sendDiplomaEmailAction(id)
      if (!r.ok) {
        toast.error('Envio do diploma', { description: r.message })
        return
      }
      toast.success('Parabéns enviados', { description: r.message })
    } finally {
      setBusyId(null)
    }
  }

  if (!serviceRoleConfigured) {
    return (
      <p className="text-sm text-warmgray-500 font-inter">
        Configure a service role para listar concluintes e enviar diplomas.
      </p>
    )
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2 text-sm font-inter">
          <GraduationCap className="h-4 w-4 text-gold-500" aria-hidden="true" />
          <span className="font-medium">
            {graduates.length} membro{graduates.length === 1 ? '' : 's'} com formação concluída
          </span>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={pending}
          className="inline-flex items-center gap-1.5 text-xs font-inter px-2.5 py-1.5 rounded-md border border-border/60 hover:bg-muted/40 disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Atualizar
        </button>
      </div>

      {graduates.length === 0 ? (
        <p className="px-4 py-8 text-sm text-warmgray-500 font-inter text-center">
          Nenhuma formação marcada como concluída ainda. No diretório de membros, use{' '}
          <strong>+ Formação</strong> quando o líder terminar a Manhigut.
        </p>
      ) : (
        <ul className="divide-y divide-border/40">
          {graduates.map((g) => {
            const busy = busyId === g.id
            const name = g.full_name?.trim() || 'Sem nome'
            return (
              <li
                key={g.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3.5"
              >
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-medium text-sm truncate">{name}</p>
                  <p className="text-xs text-warmgray-500 font-inter truncate">{g.email}</p>
                  <p className="text-[11px] text-warmgray-400 font-inter">
                    Concluído em {formatDate(g.formacao_concluida_at ?? g.updated_at)}
                    {g.is_leader ? ' · Líder' : ''}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void downloadDiploma(g.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-inter px-2.5 py-1.5 rounded-md border border-border/60',
                      'hover:bg-muted/40 disabled:opacity-50',
                    )}
                  >
                    {busy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    Baixar diploma
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void sendDiploma(g.id)}
                    className={cn(
                      'inline-flex items-center gap-1.5 text-xs font-inter px-2.5 py-1.5 rounded-md',
                      'bg-gold-500/90 text-petroleum-900 hover:bg-gold-400 disabled:opacity-50 font-medium',
                    )}
                  >
                    {busy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Mail className="h-3.5 w-3.5" />
                    )}
                    Parabenizar + enviar
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
