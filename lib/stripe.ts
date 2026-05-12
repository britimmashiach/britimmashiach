import Stripe from 'stripe'

let _stripe: Stripe | undefined

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
    price: 4700, // R$ 47,00 em centavos
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

export type PlanKey = keyof typeof PLANS
