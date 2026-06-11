'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash2, Mail, HeartHandshake, MessageSquareText } from 'lucide-react'
import {
  updatePrayerStatusAction,
  deletePrayerRequestAction,
  updateFeedbackStatusAction,
  deleteFeedbackAction,
  type AdminPrayerRow,
  type AdminFeedbackRow,
} from '@/app/admin/actions'

const PRAYER_STATUS: Record<string, string> = {
  novo: 'Novo',
  em_oracao: 'Em oração',
  arquivado: 'Arquivado',
}

const FEEDBACK_STATUS: Record<string, string> = {
  novo: 'Novo',
  lido: 'Lido',
  respondido: 'Respondido',
  arquivado: 'Arquivado',
}

const CATEGORY_LABEL: Record<string, string> = {
  sugestao: 'Sugestão',
  opiniao: 'Opinião',
  reclamacao: 'Reclamação',
}

const selectClass =
  'rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30'

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

function StatusBadge({ status, isNew }: { status: string; isNew: boolean }) {
  return (
    <span
      className={
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-inter font-semibold ' +
        (isNew
          ? 'bg-gold-500/20 text-gold-700 dark:text-gold-300'
          : 'bg-muted text-warmgray-600 dark:text-warmgray-400')
      }
    >
      {status}
    </span>
  )
}

export function InboxAdminPanel({
  serviceRoleConfigured,
  prayerRequests,
  feedback,
}: {
  serviceRoleConfigured: boolean
  prayerRequests: AdminPrayerRow[]
  feedback: AdminFeedbackRow[]
}) {
  const router = useRouter()
  const disabled = !serviceRoleConfigured
  const [tab, setTab] = useState<'prayer' | 'feedback'>('prayer')
  const [busy, setBusy] = useState<string | null>(null)

  const prayerNew = prayerRequests.filter((p) => p.status === 'novo').length
  const feedbackNew = feedback.filter((f) => f.status === 'novo').length

  async function changePrayerStatus(id: string, status: string) {
    setBusy(id)
    try {
      const r = await updatePrayerStatusAction(id, status)
      if (!r.ok) return toast.error('Status', { description: r.message })
      toast.success('Status atualizado')
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  async function removePrayer(id: string) {
    if (!confirm('Remover este pedido de oração? Esta ação não pode ser desfeita.')) return
    setBusy(id)
    try {
      const r = await deletePrayerRequestAction(id)
      if (!r.ok) return toast.error('Remover', { description: r.message })
      toast.success('Pedido removido')
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  async function changeFeedbackStatus(id: string, status: string) {
    setBusy(id)
    try {
      const r = await updateFeedbackStatusAction(id, status)
      if (!r.ok) return toast.error('Status', { description: r.message })
      toast.success('Status atualizado')
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  async function removeFeedback(id: string) {
    if (!confirm('Remover esta mensagem da ouvidoria? Esta ação não pode ser desfeita.')) return
    setBusy(id)
    try {
      const r = await deleteFeedbackAction(id)
      if (!r.ok) return toast.error('Remover', { description: r.message })
      toast.success('Mensagem removida')
      router.refresh()
    } finally {
      setBusy(null)
    }
  }

  if (disabled) {
    return (
      <div className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
        Defina <code className="text-xs bg-background/60 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> para visualizar e
        gerenciar as mensagens recebidas.
      </div>
    )
  }

  const tabBtn = (active: boolean) =>
    'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-inter font-semibold transition-colors ' +
    (active
      ? 'bg-petroleum-800 text-parchment-50 dark:bg-gold-500 dark:text-petroleum-950'
      : 'bg-muted text-warmgray-600 hover:text-foreground dark:text-warmgray-400')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={tabBtn(tab === 'prayer')} onClick={() => setTab('prayer')}>
          <HeartHandshake className="h-4 w-4" aria-hidden="true" />
          Pedidos de oração
          {prayerNew > 0 && (
            <span className="ml-1 rounded-full bg-gold-500 px-1.5 text-[11px] font-bold text-petroleum-950">
              {prayerNew}
            </span>
          )}
        </button>
        <button type="button" className={tabBtn(tab === 'feedback')} onClick={() => setTab('feedback')}>
          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
          Ouvidoria
          {feedbackNew > 0 && (
            <span className="ml-1 rounded-full bg-gold-500 px-1.5 text-[11px] font-bold text-petroleum-950">
              {feedbackNew}
            </span>
          )}
        </button>
      </div>

      {tab === 'prayer' && (
        <div className="space-y-3">
          {prayerRequests.length === 0 && (
            <p className="text-sm font-inter text-warmgray-500">Nenhum pedido de oração recebido.</p>
          )}
          {prayerRequests.map((p) => {
            const name = p.is_anonymous ? 'Anônimo' : p.contact_name || 'Sem nome'
            const rowBusy = busy === p.id
            return (
              <article
                key={p.id}
                className="rounded-xl border border-border/60 bg-background p-4 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-inter font-semibold text-sm truncate">{name}</span>
                    <StatusBadge status={PRAYER_STATUS[p.status] ?? p.status} isNew={p.status === 'novo'} />
                  </div>
                  <span className="text-xs font-inter text-warmgray-500">{fmtDate(p.created_at)}</span>
                </div>
                {!p.is_anonymous && p.contact_email && (
                  <p className="text-xs font-inter text-warmgray-500">{p.contact_email}</p>
                )}
                <p className="text-sm font-inter whitespace-pre-wrap text-foreground/90">{p.message}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className={selectClass}
                    value={p.status}
                    disabled={rowBusy}
                    onChange={(e) => void changePrayerStatus(p.id, e.target.value)}
                    aria-label="Status do pedido"
                  >
                    {Object.entries(PRAYER_STATUS).map(([v, label]) => (
                      <option key={v} value={v}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {!p.is_anonymous && p.contact_email && (
                    <a
                      href={`mailto:${p.contact_email}?subject=${encodeURIComponent(
                        'Seu pedido de oração — Brit Im Mashiach',
                      )}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-inter hover:bg-muted transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      Responder por e-mail
                    </a>
                  )}
                  <button
                    type="button"
                    disabled={rowBusy}
                    onClick={() => void removePrayer(p.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-inter text-red-700 dark:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remover
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {tab === 'feedback' && (
        <div className="space-y-3">
          {feedback.length === 0 && (
            <p className="text-sm font-inter text-warmgray-500">Nenhuma mensagem na ouvidoria.</p>
          )}
          {feedback.map((f) => {
            const rowBusy = busy === f.id
            return (
              <article
                key={f.id}
                className="rounded-xl border border-border/60 bg-background p-4 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex items-center rounded-full bg-petroleum-800/10 dark:bg-gold-500/15 px-2 py-0.5 text-[11px] font-inter font-semibold text-petroleum-800 dark:text-gold-300">
                      {CATEGORY_LABEL[f.category] ?? f.category}
                    </span>
                    <span className="font-inter font-semibold text-sm truncate">
                      {f.contact_name || 'Sem nome'}
                    </span>
                    <StatusBadge status={FEEDBACK_STATUS[f.status] ?? f.status} isNew={f.status === 'novo'} />
                  </div>
                  <span className="text-xs font-inter text-warmgray-500">{fmtDate(f.created_at)}</span>
                </div>
                {f.contact_email && <p className="text-xs font-inter text-warmgray-500">{f.contact_email}</p>}
                {f.subject && <p className="text-sm font-inter font-semibold text-foreground">{f.subject}</p>}
                <p className="text-sm font-inter whitespace-pre-wrap text-foreground/90">{f.message}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    className={selectClass}
                    value={f.status}
                    disabled={rowBusy}
                    onChange={(e) => void changeFeedbackStatus(f.id, e.target.value)}
                    aria-label="Status da mensagem"
                  >
                    {Object.entries(FEEDBACK_STATUS).map(([v, label]) => (
                      <option key={v} value={v}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {f.contact_email && (
                    <a
                      href={`mailto:${f.contact_email}?subject=${encodeURIComponent(
                        `Re: ${f.subject || CATEGORY_LABEL[f.category] || 'Sua mensagem'} — Brit Im Mashiach`,
                      )}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-inter hover:bg-muted transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      Responder por e-mail
                    </a>
                  )}
                  <button
                    type="button"
                    disabled={rowBusy}
                    onClick={() => void removeFeedback(f.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-inter text-red-700 dark:text-red-300 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remover
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
