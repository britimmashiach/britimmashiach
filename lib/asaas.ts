/**
 * Cliente HTTP da API Asaas v3.
 * PIX recorrente: Pix Automático (Jornada 3) com paymentCreationMode SUBSCRIPTION.
 */

import { PREMIUM_ANNUAL_PIX, PLANS } from '@/lib/stripe'

const APP_USER_AGENT = 'BritImMashiach/1.0.0'

export const ASAAS_PREMIUM_MONTHLY_BRL = PLANS.premium.price / 100
export const ASAAS_PREMIUM_ANNUAL_BRL = PREMIUM_ANNUAL_PIX.centavos / 100

type AsaasEnv = 'sandbox' | 'production'

export function getAsaasEnv(): AsaasEnv {
  const env = process.env.ASAAS_ENV?.trim().toLowerCase()
  return env === 'sandbox' ? 'sandbox' : 'production'
}

export function getAsaasBaseUrl(): string {
  return getAsaasEnv() === 'sandbox'
    ? 'https://api-sandbox.asaas.com'
    : 'https://api.asaas.com'
}

export function hasAsaasEnv(): boolean {
  return Boolean(process.env.ASAAS_API_KEY?.trim())
}

interface AsaasErrorItem {
  code?: string
  description?: string
}

interface AsaasErrorBody {
  errors?: AsaasErrorItem[]
}

export class AsaasApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AsaasApiError'
    this.status = status
  }
}

export function formatAsaasError(err: unknown): string {
  if (err instanceof AsaasApiError) return err.message
  if (err instanceof Error && err.message) return err.message
  return 'Erro desconhecido na API Asaas'
}

export async function asaasRequest<T>(
  path: string,
  options?: { method?: string; body?: unknown },
): Promise<T> {
  const apiKey = process.env.ASAAS_API_KEY?.trim()
  if (!apiKey) {
    throw new AsaasApiError('ASAAS_API_KEY não configurada no servidor.', 503)
  }

  const headers: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/json',
    'User-Agent': APP_USER_AGENT,
    access_token: apiKey,
  }

  const res = await fetch(`${getAsaasBaseUrl()}${path}`, {
    method: options?.method ?? 'GET',
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  let payload: T | AsaasErrorBody | null = null
  try {
    payload = (await res.json()) as T | AsaasErrorBody
  } catch {
    payload = null
  }

  if (!res.ok) {
    const errors = (payload as AsaasErrorBody | null)?.errors
    const msg =
      errors?.map((e) => e.description).filter(Boolean).join('; ') ||
      `Erro Asaas HTTP ${res.status}`
    throw new AsaasApiError(msg, res.status)
  }

  return payload as T
}

export interface AsaasCustomer {
  id: string
  name?: string
  email?: string
  cpfCnpj?: string
  externalReference?: string
}

export interface AsaasPixAuthorization {
  id: string
  status: 'CREATED' | 'ACTIVE' | 'CANCELLED' | 'REFUSED' | 'EXPIRED'
  customerId: string
  subscriptionId?: string | null
  payload?: string | null
  encodedImage?: string | null
  value?: number
  frequency?: string
}

export interface AsaasPayment {
  id: string
  customer: string
  billingType: string
  value: number
  status: string
  dueDate?: string
  invoiceUrl?: string
  externalReference?: string
  subscription?: string | null
}

export interface AsaasPixQrCode {
  encodedImage: string
  payload: string
  expirationDate?: string
}

export function normalizeCpfCnpj(value: string): string {
  return value.replace(/\D/g, '')
}

export function isValidCpfCnpj(value: string): boolean {
  const digits = normalizeCpfCnpj(value)
  return digits.length === 11 || digits.length === 14
}

export async function createAsaasCustomer(input: {
  name: string
  email: string
  cpfCnpj: string
  externalReference: string
}): Promise<AsaasCustomer> {
  return asaasRequest<AsaasCustomer>('/v3/customers', {
    method: 'POST',
    body: {
      name: input.name,
      email: input.email,
      cpfCnpj: normalizeCpfCnpj(input.cpfCnpj),
      externalReference: input.externalReference,
      notificationDisabled: false,
    },
  })
}

export async function getAsaasCustomer(id: string): Promise<AsaasCustomer> {
  return asaasRequest<AsaasCustomer>(`/v3/customers/${id}`)
}

export function formatDateYmd(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export function premiumContractId(userId: string): string {
  return `prem-${userId.replace(/-/g, '').slice(0, 28)}`
}

/** Pix Automático mensal: 1º pagamento + autorização recorrente (SUBSCRIPTION). */
export async function createPixAutomaticAuthorization(input: {
  customerId: string
  userId: string
  startDate?: string
}): Promise<AsaasPixAuthorization> {
  return asaasRequest<AsaasPixAuthorization>('/v3/pix/automatic/authorizations', {
    method: 'POST',
    body: {
      customerId: input.customerId,
      contractId: premiumContractId(input.userId),
      frequency: 'MONTHLY',
      startDate: input.startDate ?? formatDateYmd(),
      value: ASAAS_PREMIUM_MONTHLY_BRL,
      description: 'Brit Im Mashiach Premium',
      paymentCreationMode: 'SUBSCRIPTION',
      immediateQrCode: {
        originalValue: ASAAS_PREMIUM_MONTHLY_BRL,
        expirationSeconds: 86_400,
        description: 'Brit Premium - 1o mes',
      },
    },
  })
}

export async function getPixAutomaticAuthorization(id: string): Promise<AsaasPixAuthorization> {
  return asaasRequest<AsaasPixAuthorization>(`/v3/pix/automatic/authorizations/${id}`)
}

/** Cobrança PIX única mensal manual (R$ 47). Renovação pelo botão a cada mês. */
export async function createMonthlyPixPayment(input: {
  customerId: string
  userId: string
  dueDate?: string
}): Promise<AsaasPayment> {
  return asaasRequest<AsaasPayment>('/v3/payments', {
    method: 'POST',
    body: {
      customer: input.customerId,
      billingType: 'PIX',
      value: ASAAS_PREMIUM_MONTHLY_BRL,
      dueDate: input.dueDate ?? formatDateYmd(),
      description: 'Brit Im Mashiach Premium - 1 mes',
      externalReference: `monthly:${input.userId}`,
    },
  })
}

/** Cobrança PIX única anual (R$ 400). */
export async function createAnnualPixPayment(input: {
  customerId: string
  userId: string
  dueDate?: string
}): Promise<AsaasPayment> {
  return asaasRequest<AsaasPayment>('/v3/payments', {
    method: 'POST',
    body: {
      customer: input.customerId,
      billingType: 'PIX',
      value: ASAAS_PREMIUM_ANNUAL_BRL,
      dueDate: input.dueDate ?? formatDateYmd(),
      description: 'Brit Im Mashiach Premium - 12 meses',
      externalReference: `annual:${input.userId}`,
    },
  })
}

export async function getPaymentPixQrCode(paymentId: string): Promise<AsaasPixQrCode> {
  return asaasRequest<AsaasPixQrCode>(`/v3/payments/${paymentId}/pixQrCode`)
}

export async function getAsaasPayment(paymentId: string): Promise<AsaasPayment> {
  return asaasRequest<AsaasPayment>(`/v3/payments/${paymentId}`)
}

export function monthsForAsaasPayment(value: number): number {
  if (value >= ASAAS_PREMIUM_ANNUAL_BRL - 0.01) return PREMIUM_ANNUAL_PIX.months
  return 1
}
