'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Crown, Loader2, QrCode, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { formatBrlCentavos, PLANS, PREMIUM_ANNUAL_PIX } from '@/lib/stripe'

type Mode =
  | 'monthly'
  | 'pix-monthly'
  | 'pix-annual'
  | 'mp-monthly'
  | 'asaas-pix-monthly'
  | 'asaas-pix-recurring'
  | 'asaas-pix-annual'

interface CheckoutButtonProps {
  mode?: Mode
}

const API_ENDPOINTS: Partial<Record<Mode, string>> = {
  monthly: '/api/stripe/create-checkout',
  'pix-monthly': '/api/stripe/create-checkout-pix-monthly',
  'pix-annual': '/api/stripe/create-checkout-pix',
  'mp-monthly': '/api/mercadopago/create-subscription',
}

const NAV_ROUTES: Partial<Record<Mode, string>> = {
  'asaas-pix-monthly': '/premium/pix?mode=monthly',
  'asaas-pix-recurring': '/premium/pix?mode=recurring',
  'asaas-pix-annual': '/premium/pix?mode=annual',
}

const LABELS: Record<Mode, { idle: string; loading: string }> = {
  monthly: { idle: 'Assinar Premium', loading: 'Aguarde...' },
  'pix-monthly': {
    idle: `Pagar 1 mês via PIX (${formatBrlCentavos(PLANS.premium.price)})`,
    loading: 'Gerando PIX...',
  },
  'pix-annual': {
    idle: `Pagar 1 ano via PIX (${formatBrlCentavos(PREMIUM_ANNUAL_PIX.centavos)})`,
    loading: 'Gerando PIX...',
  },
  'mp-monthly': { idle: 'Cartão recorrente via Mercado Pago', loading: 'Conectando...' },
  'asaas-pix-monthly': {
    idle: `PIX mensal ${formatBrlCentavos(PLANS.premium.price)}`,
    loading: 'Abrindo...',
  },
  'asaas-pix-recurring': {
    idle: `PIX automático ${formatBrlCentavos(PLANS.premium.price)}/mês`,
    loading: 'Abrindo...',
  },
  'asaas-pix-annual': {
    idle: `PIX anual ${formatBrlCentavos(PREMIUM_ANNUAL_PIX.centavos)}`,
    loading: 'Abrindo...',
  },
}

export function CheckoutButton({ mode = 'monthly' }: CheckoutButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const navRoute = NAV_ROUTES[mode]
  const endpoint = API_ENDPOINTS[mode]

  async function handleCheckout() {
    if (navRoute) {
      router.push(navRoute)
      return
    }

    if (!endpoint) {
      toast.error('Modo de checkout inválido')
      return
    }

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

  const isPix =
    mode === 'pix-annual' ||
    mode === 'pix-monthly' ||
    mode === 'asaas-pix-monthly' ||
    mode === 'asaas-pix-recurring' ||
    mode === 'asaas-pix-annual'
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
