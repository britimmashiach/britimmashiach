'use client'

import { Suspense, useCallback, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Copy, Loader2, QrCode } from 'lucide-react'
import { toast } from 'sonner'
import { formatBrlCentavos, PLANS, PREMIUM_ANNUAL_PIX } from '@/lib/stripe'
import { PREMIUM_PIX_GRACE_DAYS } from '@/lib/premium-subscription'
import { normalizeCpfCnpj } from '@/lib/asaas'

type PixMode = 'monthly' | 'recurring' | 'annual'
type BillingMode = 'manual' | 'automatic'

function formatCpfDisplay(value: string): string {
  const d = normalizeCpfCnpj(value).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

function PixCheckoutInner() {
  const searchParams = useSearchParams()
  const modeParam = searchParams.get('mode')
  const mode: PixMode =
    modeParam === 'annual' ? 'annual' : modeParam === 'recurring' ? 'recurring' : 'monthly'

  const [cpf, setCpf] = useState('')
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState<string | null>(null)
  const [encodedImage, setEncodedImage] = useState<string | null>(null)
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null)
  const [billingMode, setBillingMode] = useState<BillingMode | null>(null)
  const [fallbackNote, setFallbackNote] = useState<string | null>(null)

  const monthlyFormatted = formatBrlCentavos(PLANS.premium.price)
  const annualFormatted = formatBrlCentavos(PREMIUM_ANNUAL_PIX.centavos)
  const isAnnual = mode === 'annual'

  const handleGenerate = useCallback(async () => {
    const digits = normalizeCpfCnpj(cpf)
    if (digits.length !== 11 && digits.length !== 14) {
      toast.error('CPF ou CNPJ inválido', { description: 'Informe 11 dígitos (CPF) ou 14 (CNPJ).' })
      return
    }

    setLoading(true)
    setFallbackNote(null)
    try {
      const endpoint =
        mode === 'annual'
          ? '/api/asaas/create-pix-annual'
          : mode === 'recurring'
            ? '/api/asaas/create-pix-recurring'
            : '/api/asaas/create-pix-monthly'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cpfCnpj: digits }),
      })

      const data = (await res.json()) as {
        error?: string
        payload?: string
        encodedImage?: string
        invoiceUrl?: string | null
        billingMode?: BillingMode
        fallbackReason?: string
      }

      if (!res.ok || data.error) {
        toast.error('Erro ao gerar PIX', { description: data.error || `Status ${res.status}` })
        return
      }

      if (!data.payload || !data.encodedImage) {
        toast.error('QR Code não retornado', { description: 'Tente novamente em instantes.' })
        return
      }

      setPayload(data.payload)
      setEncodedImage(data.encodedImage)
      setInvoiceUrl(data.invoiceUrl ?? null)
      setBillingMode(data.billingMode ?? (mode === 'annual' ? 'manual' : 'manual'))
      setFallbackNote(data.fallbackReason ?? null)

      if (data.billingMode === 'automatic') {
        toast.success('PIX automático gerado', { description: 'Escaneie e autorize no app do banco.' })
      } else {
        toast.success('PIX gerado', { description: 'Escaneie o QR Code no app do seu banco.' })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha de conexão'
      toast.error('Erro de conexão', { description: msg })
    } finally {
      setLoading(false)
    }
  }, [cpf, mode])

  async function copyPayload() {
    if (!payload) return
    try {
      await navigator.clipboard.writeText(payload)
      toast.success('Código PIX copiado')
    } catch {
      toast.error('Não foi possível copiar')
    }
  }

  const title = isAnnual
    ? `Pagar ${annualFormatted} por 12 meses`
    : billingMode === 'automatic'
      ? `Autorizar débito PIX de ${monthlyFormatted}/mês`
      : `Pagar 1 mês via PIX (${monthlyFormatted})`

  const description = isAnnual
    ? 'Pagamento único via PIX. Acesso Premium por 12 meses (~R$ 33/mês). Renovação manual ao fim do período.'
    : billingMode === 'automatic'
      ? `Você paga o 1º mês agora e autoriza cobranças automáticas todo mês. Tolerância de ${PREMIUM_PIX_GRACE_DAYS} dias se um débito falhar.`
      : `Renovação manual mensal via PIX. Após pagar, você tem ${PREMIUM_PIX_GRACE_DAYS} dias extras para renovar antes do bloqueio. Quando o Asaas liberar Pix Automático, o débito passará a ser automático no banco.`

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-10 max-w-lg space-y-6">
        <Link
          href="/premium"
          className="inline-flex items-center gap-2 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos planos
        </Link>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/12 border border-gold-500/25">
            <QrCode className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
            <span className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
              {isAnnual ? 'PIX anual' : 'PIX mensal'}
            </span>
          </div>
          <h1 className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {title}
          </h1>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            {description}
          </p>
          {fallbackNote && (
            <p className="text-xs font-inter text-amber-700 dark:text-amber-400 leading-relaxed">
              {fallbackNote}
            </p>
          )}
        </div>

        {!encodedImage ? (
          <div className="glass-card p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="cpf" className="text-sm font-inter font-medium text-foreground">
                CPF ou CNPJ do pagador
              </label>
              <input
                id="cpf"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="000.000.000-00"
                value={formatCpfDisplay(cpf)}
                onChange={(e) => setCpf(normalizeCpfCnpj(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              />
              <p className="text-xs font-inter text-warmgray-500">
                Obrigatório pelo Asaas para emissão do PIX.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 rounded-lg border-2 border-gold-500/50 bg-transparent hover:bg-gold-500/10 transition-colors flex items-center justify-center gap-2 text-sm font-inter font-semibold text-gold-700 dark:text-gold-400 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gerando PIX...
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4" />
                  Gerar QR Code PIX
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="glass-card p-6 space-y-5 text-center">
            <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-inter font-medium">
              <Check className="w-4 h-4" />
              QR Code pronto
            </div>

            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/png;base64,${encodedImage}`}
                alt="QR Code PIX"
                className="w-56 h-56 rounded-lg border border-border bg-white p-2"
              />
            </div>

            <button
              type="button"
              onClick={copyPayload}
              className="w-full py-2.5 rounded-lg border border-border hover:bg-muted/50 transition-colors flex items-center justify-center gap-2 text-sm font-inter"
            >
              <Copy className="w-4 h-4" />
              Copiar código PIX
            </button>

            {invoiceUrl && (
              <a
                href={invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-inter text-gold-600 dark:text-gold-400 hover:underline"
              >
                Abrir fatura no Asaas
              </a>
            )}

            <p className="text-xs font-inter text-warmgray-500 leading-relaxed">
              Após o pagamento, o acesso Premium é liberado em instantes. Acompanhe em{' '}
              <Link href="/profile" className="text-gold-600 dark:text-gold-400 hover:underline">
                Meu Perfil
              </Link>
              .
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default function PremiumPixPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gold-600" />
        </div>
      }
    >
      <PixCheckoutInner />
    </Suspense>
  )
}
