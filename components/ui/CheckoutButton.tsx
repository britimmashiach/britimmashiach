'use client'

import { useState } from 'react'
import { Crown, Loader2, QrCode } from 'lucide-react'
import { toast } from 'sonner'

type Mode = 'monthly' | 'pix-annual'

interface CheckoutButtonProps {
  mode?: Mode
}

export function CheckoutButton({ mode = 'monthly' }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const endpoint =
    mode === 'pix-annual' ? '/api/stripe/create-checkout-pix' : '/api/stripe/create-checkout'

  const labels = {
    monthly: { idle: 'Assinar Premium', loading: 'Aguarde...' },
    'pix-annual': { idle: 'Pagar 1 ano via PIX (R$ 470)', loading: 'Gerando PIX...' },
  } as const

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch(endpoint, { method: 'POST' })
      const data = (await res.json()) as { url?: string; error?: string }

      if (data.error) {
        if (data.error === 'Não autenticado') {
          toast.error('Faça login para continuar', {
            description: 'É necessário ter uma conta para assinar.',
          })
          window.location.href = '/auth'
          return
        }
        toast.error('Erro ao processar', { description: data.error })
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      toast.error('Erro de conexão', { description: 'Verifique sua internet e tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  const isPix = mode === 'pix-annual'

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={
        isPix
          ? 'w-full py-3 rounded-lg border-2 border-gold-500/50 bg-transparent hover:bg-gold-500/10 transition-colors flex items-center justify-center gap-2 text-sm font-inter font-semibold text-gold-700 dark:text-gold-400 disabled:opacity-60 disabled:cursor-not-allowed'
          : 'w-full btn-gold py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
      }
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPix ? (
        <QrCode className="w-4 h-4" />
      ) : (
        <Crown className="w-4 h-4" />
      )}
      {loading ? labels[mode].loading : labels[mode].idle}
    </button>
  )
}
