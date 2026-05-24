import { NextResponse } from 'next/server'
import { getMpPreApproval, hasMpEnv, MP_PREMIUM_PLAN, formatMpError, mpSandboxEmailError, validateMpAccessToken } from '@/lib/mercadopago'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/**
 * Cria uma assinatura recorrente (PreApproval) no Mercado Pago.
 *
 * Fluxo:
 *  1. Usuário logado clica "Assinar via Mercado Pago" no /premium
 *  2. Este endpoint cria um PreApproval pendente no MP
 *  3. Retorna init_point (URL do checkout MP)
 *  4. Frontend redireciona o usuário para init_point
 *  5. Usuário autoriza no MP (cartão), MP confirma via webhook
 *  6. Webhook atualiza profiles.mp_subscription_id + subscription_status
 */
export async function POST() {
  if (!hasSupabaseServerEnv()) {
    return NextResponse.json(
      { error: 'Serviço indisponível: configure o Supabase.' },
      { status: 503 },
    )
  }

  if (!hasMpEnv()) {
    return NextResponse.json(
      { error: 'MERCADOPAGO_ACCESS_TOKEN não configurada no servidor.' },
      { status: 503 },
    )
  }

  const tokenErr = validateMpAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN ?? '')
  if (tokenErr) {
    return NextResponse.json({ error: tokenErr }, { status: 503 })
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_APP_URL não configurada no servidor.' },
      { status: 503 },
    )
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const sandboxErr = mpSandboxEmailError(user.email)
  if (sandboxErr) {
    return NextResponse.json({ error: sandboxErr }, { status: 400 })
  }

  try {
    const backUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile?mp_subscription=pending`

    const preapproval = await getMpPreApproval().create({
      body: {
        reason: MP_PREMIUM_PLAN.reason,
        auto_recurring: {
          frequency: MP_PREMIUM_PLAN.frequency,
          frequency_type: MP_PREMIUM_PLAN.frequencyType,
          transaction_amount: MP_PREMIUM_PLAN.amount,
          currency_id: MP_PREMIUM_PLAN.currency,
        },
        back_url: backUrl,
        payer_email: user.email,
        external_reference: user.id,
        status: 'pending',
      },
    })

    const initPoint = preapproval.init_point
    if (!initPoint) {
      console.error('[mp create-subscription] init_point ausente na resposta:', preapproval)
      return NextResponse.json(
        { error: 'Mercado Pago não retornou URL de checkout.' },
        { status: 502 },
      )
    }

    // Salva o id do preapproval no perfil (status pending) para podermos
    // correlacionar com webhooks que vierem depois.
    if (preapproval.id) {
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ mp_subscription_id: preapproval.id })
        .eq('id', user.id)

      if (profileErr) {
        console.warn('[mp create-subscription] perfil nao atualizado:', profileErr.message)
      }
    }

    return NextResponse.json({ url: initPoint })
  } catch (err) {
    const msg = formatMpError(err)
    console.error('[mp create-subscription] falha:', msg, err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
