'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, HandHeart, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { clearPendingDraft, readPendingDraft, savePendingDraft } from '@/lib/pending-submission'

const DRAFT_KEY = 'bm_pending_prayer_v1'

interface PendingPrayerDraft {
  message: string
}

interface HomePrayerRequestCardProps {
  isAuthenticated: boolean
  defaultEmail?: string | null
  defaultName?: string | null
}

export function HomePrayerRequestCard({ isAuthenticated, defaultEmail, defaultName }: HomePrayerRequestCardProps) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const draft = readPendingDraft<PendingPrayerDraft>(DRAFT_KEY)
    if (!draft?.message) return

    if (!isAuthenticated) {
      setExpanded(true)
      setMessage(draft.message)
      return
    }

    setExpanded(true)
    void submit(draft.message, true)
    // Reenvia apenas o rascunho salvo antes do cadastro/login; não repete em toda mudança.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  async function submit(text: string, fromDraft: boolean) {
    setLoading(true)
    try {
      const res = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: text,
          contactName: defaultName ?? '',
          contactEmail: defaultEmail ?? '',
          isAnonymous: false,
        }),
      })

      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok || data.error) {
        toast.error('Não foi possível enviar', { description: data.error || `Erro ${res.status}` })
        return
      }

      clearPendingDraft(DRAFT_KEY)
      setSent(true)
      toast.success(fromDraft ? 'Pedido enviado! A kehilah ora por você.' : 'Pedido registrado', {
        description: 'Ken Yehi Ratzon.',
      })
    } catch (err) {
      toast.error('Erro de conexão', { description: err instanceof Error ? err.message : 'Falha de conexão' })
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = message.trim()

    if (text.length < 10) {
      toast.error('Escreva seu pedido com pelo menos 10 caracteres.')
      return
    }

    if (!isAuthenticated) {
      savePendingDraft<PendingPrayerDraft>(DRAFT_KEY, { message: text })
      toast.info('Quase lá!', { description: 'Crie sua conta com e-mail para enviar seu pedido de oração.' })
      router.push('/auth?mode=register&next=%2F&pending=prayer')
      return
    }

    void submit(text, false)
  }

  if (sent) {
    return (
      <div className="glass-card p-6 space-y-3 text-center">
        <div className="w-12 h-12 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto">
          <HandHeart className="w-6 h-6 text-gold-600 dark:text-gold-400" aria-hidden="true" />
        </div>
        <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
          Seu pedido foi recebido
        </h3>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          A kehilah leva seu pedido à oração com discrição. Você será avisado quando alguém responder.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 space-y-4">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 text-left"
        aria-expanded={expanded}
        aria-controls="home-prayer-request-form"
      >
        <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center shrink-0">
          <HandHeart className="w-5 h-5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Pedido de oração
          </h3>
          <p className="text-xs font-inter text-warmgray-500">A kehilah ora com você e por você</p>
        </div>
        <ChevronDown
          className={cn('w-4 h-4 text-warmgray-400 transition-transform shrink-0', expanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <form id="home-prayer-request-form" onSubmit={handleSubmit} className="space-y-3 pt-1">
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field resize-y min-h-[100px] text-sm"
            maxLength={2000}
            placeholder="Escreva com respeito e clareza o que deseja colocar em oração..."
          />
          {!isAuthenticated && (
            <p className="text-[11px] font-inter text-warmgray-500 leading-relaxed">
              Seu pedido só será enviado depois que você criar uma conta com e-mail (ou Gmail).
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="w-4 h-4" aria-hidden="true" />
            )}
            Enviar pedido
          </button>
        </form>
      )}
    </div>
  )
}
