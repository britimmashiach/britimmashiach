'use client'

import { useState } from 'react'
import { Crown, Loader2, QrCode, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { formatBrlCentavos, PREMIUM_ANNUAL_PIX } from '@/lib/stripe'

type Mode = 'monthly' | 'pix-annual' | 'mp-monthly'

interface CheckoutButtonProps {
  mode?: Mode
}

const ENDPOINTS: Record<Mode, string> = {
  monthly: '/api/stripe/create-checkout',
  'pix-annual': '/api/stripe/create-checkout-pix',
  'mp-monthly': '/api/mercadopago/create-subscription',
}

const LABELS: Record<Mode, { idle: string; loading: string }> = {
  monthly: { idle: 'Assinar Premium', loading: 'Aguarde...' },
  'pix-annual': {
    idle: `Pagar 1 ano via PIX (${formatBrlCentavos(PREMIUM_ANNUAL_PIX.centavos)})`,
    loading: 'Gerando PIX...',
  },
  'mp-monthly': { idle: 'Assinar via Mercado Pago (R$ 47/mês)', loading: 'Conectando...' },
}

export function CheckoutButton({ mode = 'monthly' }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const endpoint = ENDPOINTS[mode]

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch(endpoint, { method: 'POST' })

      let data: { url?: string; error?: string } = {}
      try {
        data = await res.json()
      } catch {
        toast.error('Resposta inválida do servidor', {
          description: `Status ${res.status}. Verifique as variáveis de ambiente no Vercel.`,
        })
        return
      }

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
        return
      }

      toast.error('Resposta sem URL', { description: 'O servidor não retornou a URL do checkout.' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha desconhecida'
      toast.error('Erro de conexão', { description: msg })
    } finally {
      setLoading(false)
    }
  }

  const isPix = mode === 'pix-annual'
  const isMp = mode === 'mp-monthly'

  const Icon = loading ? Loader2 : isPix ? QrCode : isMp ? Wallet : Crown

  const className =
    isMp
      ? 'w-full py-3 rounded-lg bg-[#009ee3] hover:bg-[#007bb8] transition-colors flex items-center justify-center gap-2 text-sm font-inter font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed'
      : isPix
        ? 'w-full py-3 rounded-lg border-2 border-gold-500/50 bg-transparent hover:bg-gold-500/10 transition-colors flex items-center justify-center gap-2 text-sm font-inter font-semibold text-gold-700 dark:text-gold-400 disabled:opacity-60 disabled:cursor-not-allowed'
        : 'w-full btn-gold py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'

  return (
    <button onClick={handleCheckout} disabled={loading} className={className}>
      <Icon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      {loading ? LABELS[mode].loading : LABELS[mode].idle}
    </button>
  )
}
