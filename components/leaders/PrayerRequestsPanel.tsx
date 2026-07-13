'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { HeartHandshake, Send, CheckCircle2 } from 'lucide-react'
import {
  respondPrayerRequestAction,
  updateLeaderPrayerStatusAction,
  type LeaderPrayerRow,
} from '@/app/lideres/actions'

const STATUS_LABEL: Record<string, string> = {
  novo: 'Novo',
  em_oracao: 'Em oração',
  respondido: 'Respondido',
  arquivado: 'Arquivado',
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function PrayerCard({ request }: { request: LeaderPrayerRow }) {
  const router = useRouter()
  const [responseText, setResponseText] = useState(request.response_text ?? '')
  const [busy, setBusy] = useState(false)
  const name = request.is_anonymous ? 'Anônimo' : request.contact_name || 'Sem nome'
  const alreadyResponded = Boolean(request.response_text)

  async function markInOracao() {
    setBusy(true)
    try {
      const r = await updateLeaderPrayerStatusAction(request.id, 'em_oracao')
      if (!r.ok) return toast.error('Status', { description: r.message })
      toast.success('Marcado como "Em oração"')
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  async function submitResponse() {
    if (responseText.trim().length < 3) {
      toast.error('Escreva uma resposta antes de enviar.')
      return
    }
    setBusy(true)
    try {
      const r = await respondPrayerRequestAction(request.id, responseText)
      if (!r.ok) return toast.error('Resposta', { description: r.message })
      toast.success(r.message)
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className="rounded-xl border border-border/60 bg-background p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-inter font-semibold text-sm truncate">{name}</span>
          <span
            className={
              'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-inter font-semibold ' +
              (request.status === 'respondido'
                ? 'bg-green-500/15 text-green-700 dark:text-green-400'
                : request.status === 'novo'
                  ? 'bg-gold-500/20 text-gold-700 dark:text-gold-300'
                  : 'bg-muted text-warmgray-600 dark:text-warmgray-400')
            }
          >
            {STATUS_LABEL[request.status] ?? request.status}
          </span>
        </div>
        <span className="text-xs font-inter text-warmgray-500">{fmtDate(request.created_at)}</span>
      </div>

      {!request.is_anonymous && request.contact_email && (
        <p className="text-xs font-inter text-warmgray-500">{request.contact_email}</p>
      )}

      <p className="text-sm font-inter whitespace-pre-wrap text-foreground/90">{request.message}</p>

      {alreadyResponded && (
        <div className="rounded-lg border border-green-500/25 bg-green-500/[0.04] p-3 space-y-1">
          <p className="flex items-center gap-1.5 text-xs font-inter font-semibold text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Resposta enviada {request.responded_at ? `em ${fmtDate(request.responded_at)}` : ''}
          </p>
          <p className="text-sm font-inter whitespace-pre-wrap text-foreground/80">{request.response_text}</p>
        </div>
      )}

      {!alreadyResponded && (
        <div className="space-y-2">
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            disabled={busy}
            rows={3}
            maxLength={4000}
            placeholder="Escreva sua resposta de oração e apoio..."
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30 resize-none"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void submitResponse()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500 px-3 py-1.5 text-xs font-inter font-semibold text-petroleum-950 hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" aria-hidden="true" />
              Enviar resposta
            </button>
            {request.status !== 'em_oracao' && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void markInOracao()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-inter hover:bg-muted transition-colors disabled:opacity-50"
              >
                Marcar &quot;Em oração&quot;
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  )
}

export function PrayerRequestsPanel({ requests }: { requests: LeaderPrayerRow[] }) {
  const pending = requests.filter((r) => r.status !== 'respondido' && r.status !== 'arquivado')
  const answered = requests.filter((r) => r.status === 'respondido' || r.status === 'arquivado')

  return (
    <div id="pedidos-de-oracao" className="space-y-4 scroll-mt-24">
      <div className="flex items-center gap-2">
        <HeartHandshake className="h-5 w-5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
        <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
          Pedidos de oração
        </h2>
        {pending.length > 0 && (
          <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[11px] font-bold text-petroleum-950">
            {pending.length} pendente{pending.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 max-w-2xl">
        Responda com uma palavra de oração e apoio. A pessoa recebe sua resposta no site (se estiver logada) e por
        e-mail (se tiver informado contato).
      </p>

      <div className="space-y-3">
        {requests.length === 0 && (
          <p className="text-sm font-inter text-warmgray-500">Nenhum pedido de oração recebido ainda.</p>
        )}
        {pending.map((r) => (
          <PrayerCard key={r.id} request={r} />
        ))}
      </div>

      {answered.length > 0 && (
        <details className="pt-2">
          <summary className="cursor-pointer text-sm font-inter font-medium text-warmgray-500 hover:text-foreground transition-colors">
            Ver respondidos/arquivados ({answered.length})
          </summary>
          <div className="space-y-3 mt-3">
            {answered.map((r) => (
              <PrayerCard key={r.id} request={r} />
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
