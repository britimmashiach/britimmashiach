'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Loader2, Quote, Send } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { clearPendingDraft, readPendingDraft, savePendingDraft } from '@/lib/pending-submission'

const DRAFT_KEY = 'bm_pending_testimonial_v1'

interface PendingTestimonyDraft {
  body: string
  city: string
}

interface HomeTestimonyCardProps {
  isAuthenticated: boolean
  defaultName?: string | null
}

export function HomeTestimonyCard({ isAuthenticated, defaultName }: HomeTestimonyCardProps) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [body, setBody] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const draft = readPendingDraft<PendingTestimonyDraft>(DRAFT_KEY)
    if (!draft?.body) return

    if (!isAuthenticated) {
      setExpanded(true)
      setBody(draft.body)
      setCity(draft.city ?? '')
      return
    }

    setExpanded(true)
    void submit(draft.body, draft.city ?? '', true)
    // Reenvia apenas o rascunho salvo antes do cadastro/login; não repete em toda mudança.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  async function submit(text: string, cityValue: string, fromDraft: boolean) {
    setLoading(true)
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          body: text,
          city: cityValue,
          authorDisplayName: defaultName ?? '',
        }),
      })

      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok || data.error) {
        toast.error('Não foi possível enviar', { description: data.error || `Erro ${res.status}` })
        return
      }

      clearPendingDraft(DRAFT_KEY)
      setSent(true)
      toast.success(fromDraft ? 'Testemunho enviado!' : 'Testemunho registrado', {
        description: 'Será revisado antes de ser publicado. Toda honra a HaShem.',
      })
    } catch (err) {
      toast.error('Erro de conexão', { description: err instanceof Error ? err.message : 'Falha de conexão' })
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = body.trim()

    if (text.length < 20) {
      toast.error('Compartilhe com pelo menos 20 caracteres.')
      return
    }

    if (!isAuthenticated) {
      savePendingDraft<PendingTestimonyDraft>(DRAFT_KEY, { body: text, city: city.trim() })
      toast.info('Quase lá!', { description: 'Crie sua conta com e-mail para compartilhar seu testemunho.' })
      router.push('/auth?mode=register&next=%2F&pending=testimonial')
      return
    }

    void submit(text, city.trim(), false)
  }

  if (sent) {
    return (
      <div className="glass-card p-6 space-y-3 text-center">
        <div className="w-12 h-12 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto">
          <Quote className="w-6 h-6 text-gold-600 dark:text-gold-400" aria-hidden="true" />
        </div>
        <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
          Seu testemunho foi recebido
        </h3>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          Ele será revisado e, se aprovado, publicado na página da Comunidade.
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
        aria-controls="home-testimony-form"
      >
        <div className="w-10 h-10 rounded-full bg-gold-500/15 flex items-center justify-center shrink-0">
          <Quote className="w-5 h-5 text-gold-600 dark:text-gold-400" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Testemunho
          </h3>
          <p className="text-xs font-inter text-warmgray-500">O que Elohim tem feito em sua vida</p>
        </div>
        <ChevronDown
          className={cn('w-4 h-4 text-warmgray-400 transition-transform shrink-0', expanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <form id="home-testimony-form" onSubmit={handleSubmit} className="space-y-3 pt-1">
          <textarea
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="input-field resize-y min-h-[100px] text-sm"
            maxLength={1500}
            placeholder="Compartilhe o que Elohim tem feito em sua vida..."
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field text-sm"
            maxLength={120}
            placeholder="Sua cidade (opcional)"
          />
          {!isAuthenticated && (
            <p className="text-[11px] font-inter text-warmgray-500 leading-relaxed">
              Seu testemunho só será enviado depois que você criar uma conta com e-mail (ou Gmail).
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
            Enviar testemunho
          </button>
        </form>
      )}
    </div>
  )
}
