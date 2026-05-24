import { MercadoPagoConfig, PreApproval } from 'mercadopago'

/**
 * Cliente Mercado Pago. Usado para assinaturas recorrentes (PreApproval).
 *
 * Em produção (Vercel): MERCADOPAGO_ACCESS_TOKEN começa com APP_USR-...
 * Em desenvolvimento/teste: começa com TEST-...
 *
 * O Access Token tem privilégios de cobrança, jamais expor no frontend.
 */

let _client: MercadoPagoConfig | undefined
let _preapproval: PreApproval | undefined

function getMpToken(): string {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) {
    throw new Error(
      'MERCADOPAGO_ACCESS_TOKEN não configurada no servidor. ' +
        'Configure no Vercel (Settings → Environment Variables).',
    )
  }
  return token
}

export function hasMpEnv(): boolean {
  return Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN?.trim())
}

export function getMpClient(): MercadoPagoConfig {
  if (!_client) {
    _client = new MercadoPagoConfig({
      accessToken: getMpToken(),
      options: { timeout: 10_000 },
    })
  }
  return _client
}

export function getMpPreApproval(): PreApproval {
  if (!_preapproval) {
    _preapproval = new PreApproval(getMpClient())
  }
  return _preapproval
}

/**
 * Configuração do plano Premium no Mercado Pago.
 * Mantém preço idêntico ao Stripe (R$ 47,00/mês recorrente).
 */
export const MP_PREMIUM_PLAN = {
  reason: 'Brit Im Mashiach Premium',
  amount: 47.0,
  currency: 'BRL',
  frequency: 1,
  frequencyType: 'months' as const,
} as const
