import type { SupabaseClient } from '@supabase/supabase-js'
import type { Profile } from '@/types'
import {
  AsaasApiError,
  createAsaasCustomer,
  createMonthlyPixPayment,
  getAsaasCustomer,
  getPaymentPixQrCode,
  isValidCpfCnpj,
  normalizeCpfCnpj,
} from '@/lib/asaas'

export function isPixAutomaticUnavailableError(err: unknown): boolean {
  const msg = (err instanceof AsaasApiError ? err.message : err instanceof Error ? err.message : String(err)).toLowerCase()
  return (
    msg.includes('pix autom') ||
    msg.includes('pix automatic') ||
    msg.includes('não está disponível') ||
    msg.includes('nao esta disponivel') ||
    msg.includes('not available') ||
    msg.includes('indispon') ||
    msg.includes('habilit')
  )
}

export function resolveCpfCnpjFromRequest(
  cpfFromBody: string | undefined,
  profile: Pick<Profile, 'cpf_cnpj'> | null,
): { cpfCnpj: string; error?: string } {
  const cpfCnpj = normalizeCpfCnpj(cpfFromBody || profile?.cpf_cnpj || '')
  if (!isValidCpfCnpj(cpfCnpj)) {
    return {
      cpfCnpj,
      error: 'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.',
    }
  }
  return { cpfCnpj }
}

export async function ensureAsaasCustomerId(input: {
  userId: string
  email: string
  fullName: string | null
  cpfCnpj: string
  existingCustomerId?: string | null
}): Promise<string> {
  let customerId = input.existingCustomerId ?? null

  if (customerId) {
    try {
      await getAsaasCustomer(customerId)
      return customerId
    } catch {
      customerId = null
    }
  }

  const customer = await createAsaasCustomer({
    name: input.fullName?.trim() || input.email.split('@')[0] || 'Membro Brit Mashiach',
    email: input.email,
    cpfCnpj: input.cpfCnpj,
    externalReference: input.userId,
  })

  return customer.id
}

export async function createManualMonthlyPixCheckout(input: {
  customerId: string
  userId: string
  cpfCnpj: string
  supabase: SupabaseClient
}): Promise<{
  billingMode: 'manual'
  paymentId: string
  payload: string
  encodedImage: string
  invoiceUrl: string | null
}> {
  const payment = await createMonthlyPixPayment({
    customerId: input.customerId,
    userId: input.userId,
  })

  const qr = await getPaymentPixQrCode(payment.id)

  await input.supabase
    .from('profiles')
    .update({
      asaas_customer_id: input.customerId,
      cpf_cnpj: input.cpfCnpj,
      updated_at: new Date().toISOString(),
    })
    .eq('id', input.userId)

  return {
    billingMode: 'manual',
    paymentId: payment.id,
    payload: qr.payload,
    encodedImage: qr.encodedImage,
    invoiceUrl: payment.invoiceUrl ?? null,
  }
}
