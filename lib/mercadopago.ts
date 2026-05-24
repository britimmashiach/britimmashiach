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

export function isMpTestToken(): boolean {
  return getMpToken().startsWith('TEST-')
}

/** Extrai mensagem legível do corpo de erro JSON lançado pelo SDK do MP. */
export function formatMpError(err: unknown): string {
  if (err instanceof Error && err.message) return err.message

  if (err && typeof err === 'object') {
    const body = err as {
      message?: string
      error?: string
      status?: number
      cause?: Array<{ description?: string; code?: string | number }>
    }

    const parts: string[] = []
    if (body.message) parts.push(body.message)
    if (body.error && body.error !== body.message) parts.push(body.error)

    const causeDesc = body.cause
      ?.map((c) => c.description)
      .filter(Boolean)
      .join('; ')
    if (causeDesc) parts.push(causeDesc)

    if (parts.length > 0) return parts.join(' — ')

    try {
      return JSON.stringify(err)
    } catch {
      return 'Erro desconhecido ao iniciar assinatura MP'
    }
  }

  return 'Erro desconhecido ao iniciar assinatura MP'
}

/** Em credencial TEST, o MP exige e-mail @testuser.com no payer_email. */
export function mpSandboxEmailError(email: string): string | null {
  if (!isMpTestToken()) return null
  if (email.toLowerCase().endsWith('@testuser.com')) return null
  return (
    'Modo teste do Mercado Pago: use credenciais de PRODUÇÃO (APP_USR) no Vercel para ' +
    'e-mails reais, ou cadastre-se no site com um e-mail de teste @testuser.com ' +
    'criado em Developers → Contas de teste.'
  )
}
