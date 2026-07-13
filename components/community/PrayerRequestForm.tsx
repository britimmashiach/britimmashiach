'use client'

import { useState } from 'react'
import { HandHeart, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface PrayerRequestFormProps {
  defaultEmail?: string | null
  defaultName?: string | null
}

export function PrayerRequestForm({ defaultEmail, defaultName }: PrayerRequestFormProps) {
  const [message, setMessage] = useState('')
  const [contactName, setContactName] = useState(defaultName ?? '')
  const [contactEmail, setContactEmail] = useState(defaultEmail ?? '')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message,
          contactName,
          contactEmail,
          isAnonymous,
          website,
        }),
      })

      const data = (await res.json()) as { ok?: boolean; error?: string }

      if (!res.ok || data.error) {
        toast.error('Não foi possível enviar', { description: data.error || `Erro ${res.status}` })
        return
      }

      setSent(true)
      toast.success('Pedido registrado', {
        description: 'A kehilah ora por você. Ken Yehi Ratzon.',
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha de conexão'
      toast.error('Erro de conexão', { description: msg })
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="glass-card p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-gold-500/15 flex items-center justify-center mx-auto">
          <HandHeart className="w-7 h-7 text-gold-600 dark:text-gold-400" />
        </div>
        <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
          Seu pedido foi recebido
        </h2>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-sm mx-auto">
          O Rav e a congregação levam seus pedidos à oração com discrição e kavanáh.
        </p>
        <p className="text-xs font-inter text-warmgray-500 leading-relaxed max-w-sm mx-auto">
          Quando alguém responder, você será avisado no site e por e-mail (se tiver informado contato).
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
      <div className="space-y-1">
        <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
          Pedido de oração
        </h2>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
          Compartilhe o que deseja colocar diante de HaShem. Pedidos anônimos não exigem identificação.
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="mt-1 rounded border-border"
        />
        <span className="text-sm font-inter text-warmgray-700 dark:text-warmgray-300">
          Pedido anônimo (sem nome nem e-mail)
        </span>
      </label>

      {!isAnonymous && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="prayer-name" className="text-xs font-inter font-medium text-warmgray-500">
              Nome (opcional)
            </label>
            <input
              id="prayer-name"
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="input-field"
              maxLength={120}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="prayer-email" className="text-xs font-inter font-medium text-warmgray-500">
              E-mail
            </label>
            <input
              id="prayer-email"
              type="email"
              required
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="input-field"
              maxLength={200}
            />
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="prayer-message" className="text-xs font-inter font-medium text-warmgray-500">
          Seu pedido
        </label>
        <textarea
          id="prayer-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn('input-field resize-y min-h-[120px]')}
          maxLength={2000}
          placeholder="Escreva com respeito e clareza o que deseja colocar em oração..."
        />
        <p className="text-[10px] font-inter text-warmgray-400 text-right">{message.length}/2000</p>
      </div>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <button type="submit" disabled={loading} className="btn-gold w-full sm:w-auto inline-flex items-center gap-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="w-4 h-4" aria-hidden="true" />
        )}
        Enviar pedido de oração
      </button>
    </form>
  )
}
