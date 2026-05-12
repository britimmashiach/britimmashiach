'use client'

import { useState } from 'react'
import { Crown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export function CheckoutButton() {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout', { method: 'POST' })
      const data = await res.json() as { url?: string; error?: string }

      if (data.error) {
        if (data.error === 'Não autenticado') {
          toast.error('Faça login para continuar', { description: 'É necessário ter uma conta para assinar.' })
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

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full btn-gold py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Crown className="w-4 h-4" />
      )}
      {loading ? 'Aguarde...' : 'Assinar Premium'}
    </button>
  )
}
