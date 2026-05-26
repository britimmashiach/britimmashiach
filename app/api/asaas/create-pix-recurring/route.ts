import { NextResponse } from 'next/server'
import {
  createManualMonthlyPixCheckout,
  ensureAsaasCustomerId,
  isPixAutomaticUnavailableError,
  resolveCpfCnpjFromRequest,
} from '@/lib/asaas-premium-checkout'
import {
  createPixAutomaticAuthorization,
  formatAsaasError,
  getPixAutomaticAuthorization,
  hasAsaasEnv,
} from '@/lib/asaas'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/**
 * Tenta Pix Automático (recorrência real). Se a conta não tiver o recurso,
 * faz fallback para PIX mensal manual (R$ 47).
 */
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

    if (profile?.asaas_pix_authorization_id) {
      try {
        const existing = await getPixAutomaticAuthorization(profile.asaas_pix_authorization_id)
        if (existing.status === 'ACTIVE') {
          return NextResponse.json(
            { error: 'Você já possui PIX automático ativo. Veja seu perfil.' },
            { status: 409 },
          )
        }
        if (existing.status === 'CREATED' && existing.payload && existing.encodedImage) {
          return NextResponse.json({
            billingMode: 'automatic',
            authorizationId: existing.id,
            payload: existing.payload,
            encodedImage: existing.encodedImage,
            status: existing.status,
          })
        }
      } catch {
        // autorização antiga inválida: segue fluxo
      }
    }

    try {
      const authorization = await createPixAutomaticAuthorization({
        customerId,
        userId: user.id,
      })

      if (authorization.payload && authorization.encodedImage) {
        await supabase
          .from('profiles')
          .update({
            asaas_customer_id: customerId,
            asaas_pix_authorization_id: authorization.id,
            asaas_subscription_id: authorization.subscriptionId ?? null,
            cpf_cnpj: cpfCnpj,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)

        return NextResponse.json({
          billingMode: 'automatic',
          authorizationId: authorization.id,
          payload: authorization.payload,
          encodedImage: authorization.encodedImage,
          status: authorization.status,
          subscriptionId: authorization.subscriptionId ?? null,
        })
      }
    } catch (autoErr) {
      if (!isPixAutomaticUnavailableError(autoErr)) {
        throw autoErr
      }
      console.warn('[asaas create-pix-recurring] Pix Automático indisponível, usando PIX mensal manual.')
    }

    const checkout = await createManualMonthlyPixCheckout({
      customerId,
      userId: user.id,
      cpfCnpj,
      supabase,
    })

    return NextResponse.json({
      ...checkout,
      fallbackReason: 'Pix Automático ainda não está habilitado na conta Asaas.',
    })
  } catch (err) {
    const msg = formatAsaasError(err)
    console.error('[asaas create-pix-recurring] falha:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
