import { NextResponse } from 'next/server'
import {
  createAnnualPixPayment,
  createAsaasCustomer,
  formatAsaasError,
  getAsaasCustomer,
  getPaymentPixQrCode,
  hasAsaasEnv,
  isValidCpfCnpj,
  normalizeCpfCnpj,
} from '@/lib/asaas'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/** Cobrança PIX única anual (R$ 400 / 12 meses). */
export async function POST(req: Request) {
  if (!hasSupabaseServerEnv()) {
    return NextResponse.json({ error: 'Serviço indisponível: configure o Supabase.' }, { status: 503 })
  }

  if (!hasAsaasEnv()) {
    return NextResponse.json({ error: 'ASAAS_API_KEY não configurada no servidor.' }, { status: 503 })
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  let cpfFromBody: string | undefined
  try {
    const body = (await req.json()) as { cpfCnpj?: string }
    cpfFromBody = body.cpfCnpj
  } catch {
    cpfFromBody = undefined
  }

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    const cpfCnpj = normalizeCpfCnpj(cpfFromBody || profile?.cpf_cnpj || '')
    if (!isValidCpfCnpj(cpfCnpj)) {
      return NextResponse.json(
        { error: 'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.' },
        { status: 400 },
      )
    }

    let customerId = profile?.asaas_customer_id ?? null

    if (customerId) {
      try {
        await getAsaasCustomer(customerId)
      } catch {
        customerId = null
      }
    }

    if (!customerId) {
      const customer = await createAsaasCustomer({
        name: profile?.full_name?.trim() || user.email.split('@')[0] || 'Membro Brit Mashiach',
        email: user.email,
        cpfCnpj,
        externalReference: user.id,
      })
      customerId = customer.id
    }

    const payment = await createAnnualPixPayment({
      customerId,
      userId: user.id,
    })

    const qr = await getPaymentPixQrCode(payment.id)

    await supabase
      .from('profiles')
      .update({
        asaas_customer_id: customerId,
        cpf_cnpj: cpfCnpj,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    return NextResponse.json({
      paymentId: payment.id,
      invoiceUrl: payment.invoiceUrl ?? null,
      payload: qr.payload,
      encodedImage: qr.encodedImage,
      expirationDate: qr.expirationDate ?? null,
    })
  } catch (err) {
    const msg = formatAsaasError(err)
    console.error('[asaas create-pix-annual] falha:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
