import Stripe from 'stripe'

let _stripe: Stripe | undefined

/** Stripe configurado no servidor (secret key + price id premium). */
export function hasStripeEnv(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY?.trim() && process.env.STRIPE_PRICE_ID_PREMIUM?.trim(),
  )
}

/** Exibir checkout Stripe na UI (oculto quando Asaas está ativo, salvo override). */
export function showStripePremium(): boolean {
  if (process.env.NEXT_PUBLIC_PREMIUM_STRIPE_ENABLED === 'true') return hasStripeEnv()
  if (process.env.ASAAS_API_KEY?.trim()) return false
  return hasStripeEnv()
}

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }
  return _stripe
}

export const PLANS = {
  free: {
    name: 'Gratuito',
    description: 'Acesso ao conteúdo básico da plataforma',
    price: 0,
    priceId: null,
    features: [
      'Calendário hebraico',
      'Parasháh da semana',
      'Sefirat haOmer',
      '5 estudos por mês',
      'Biblioteca básica',
    ],
  },
  premium: {
    name: 'Premium',
    description: 'Acesso completo ao ecossistema Brit Mashiach',
    price: 4700, // R$ 47,00 em centavos (mensal)
    priceId: process.env.STRIPE_PRICE_ID_PREMIUM!,
    features: [
      'Tudo do plano Gratuito',
      'Estudos ilimitados',
      'Biblioteca completa com downloads',
      'Kabaláh Luriana aprofundada',
      'Modelo Netivot de 32 Caminhos',
      'Siddur e Machzor completos',
      'Cursos exclusivos do Rav EBBY',
      'Acesso antecipado a novos conteúdos',
    ],
  },
} as const

/** Plano anual prepago via PIX (Stripe Checkout, pagamento unico). */
export const PREMIUM_ANNUAL_PIX = {
  centavos: 40000, // R$ 400,00
  months: 12,
} as const

export function formatBrlCentavos(centavos: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    centavos / 100,
  )
}

export type PlanKey = keyof typeof PLANS
