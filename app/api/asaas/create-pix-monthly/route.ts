import { NextResponse } from 'next/server'
import {
  createManualMonthlyPixCheckout,
  ensureAsaasCustomerId,
  resolveCpfCnpjFromRequest,
} from '@/lib/asaas-premium-checkout'
import { formatAsaasError, hasAsaasEnv } from '@/lib/asaas'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/** PIX mensal manual via Asaas (R$ 47). Funciona sem Pix Automático habilitado. */
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

    const { cpfCnpj, error: cpfError } = resolveCpfCnpjFromRequest(cpfFromBody, profile)
    if (cpfError) {
      return NextResponse.json({ error: cpfError }, { status: 400 })
    }

    const customerId = await ensureAsaasCustomerId({
      userId: user.id,
      email: user.email,
      fullName: profile?.full_name ?? null,
      cpfCnpj,
      existingCustomerId: profile?.asaas_customer_id,
    })

    const checkout = await createManualMonthlyPixCheckout({
      customerId,
      userId: user.id,
      cpfCnpj,
      supabase,
    })

    return NextResponse.json(checkout)
  } catch (err) {
    const msg = formatAsaasError(err)
    console.error('[asaas create-pix-monthly] falha:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
