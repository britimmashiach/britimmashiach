'use client'

import { useState } from 'react'
import { MessageCircle, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'
import { createClient, supabaseConfigured } from '@/lib/supabase'

interface WhatsAppOptInCardProps {
  profileId: string
  initialWhatsapp: string | null
  initialNotify: boolean
}

/** Mantem apenas digitos; util para validar e exibir o numero. */
function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

/** Formata visualmente um numero brasileiro: (16) 99999-9999. */
function formatBrPhone(value: string): string {
  const d = digitsOnly(value).slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function WhatsAppOptInCard({ profileId, initialWhatsapp, initialNotify }: WhatsAppOptInCardProps) {
  const [phone, setPhone] = useState(initialWhatsapp ? formatBrPhone(initialWhatsapp) : '')
  const [notify, setNotify] = useState(initialNotify)
  const [saving, setSaving] = useState(false)
  const alreadySaved = Boolean(initialWhatsapp)

  async function handleSave() {
    if (!supabaseConfigured) {
      toast.error('Supabase não configurado')
      return
    }
    const digits = digitsOnly(phone)
    if (digits.length < 10 || digits.length > 13) {
      toast.error('WhatsApp inválido', {
        description: 'Informe DDD e número, ex.: (16) 99999-9999.',
      })
      return
    }

    setSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({ whatsapp: digits, whatsapp_notify: notify })
        .eq('id', profileId)

      if (error) {
        toast.error('Não foi possível salvar', { description: error.message })
        return
      }
      toast.success('WhatsApp registrado', {
        description: notify
          ? 'Você passará a receber os avisos da kehilah pelo zap.'
          : 'Número salvo. Ative o aviso quando quiser receber pelo zap.',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="glass-card p-6 space-y-4 border-green-600/20 bg-green-500/[0.03]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-green-600/10 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Receba os avisos pelo WhatsApp
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            Deixe seu WhatsApp registrado e receba os avisos da kehilah também pelo zap, além da página inicial.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="whatsapp-input" className="sr-only">
          Seu número de WhatsApp
        </label>
        <input
          id="whatsapp-input"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="(16) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(formatBrPhone(e.target.value))}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-green-500/30"
        />

        <label className="flex items-start gap-2 text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border accent-green-600"
          />
          <span>
            Aceito receber avisos da kehilah pelo WhatsApp. Posso cancelar quando quiser, atualizando aqui.
          </span>
        </label>

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-inter font-semibold text-white hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : alreadySaved ? (
            <Check className="w-4 h-4" aria-hidden="true" />
          ) : (
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
          )}
          {saving ? 'Salvando…' : alreadySaved ? 'Atualizar WhatsApp' : 'Registrar WhatsApp'}
        </button>
      </div>
    </div>
  )
}
