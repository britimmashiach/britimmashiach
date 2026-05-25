import { NextResponse } from 'next/server'
import { getStripe, PLANS } from '@/lib/stripe'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/** PIX mensal manual (sem recorrência): R$ 47, renovação pelo botão a cada mês. */
export async function POST() {
  if (!hasSupabaseServerEnv()) {
    return NextResponse.json(
      { error: 'Serviço indisponível: configure o Supabase.' },
      { status: 503 },
    )
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY não configurada no servidor.' },
      { status: 503 },
    )
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

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const amount = PLANS.premium.price

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id

      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['pix', 'card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            unit_amount: amount,
            product_data: {
              name: 'Brit Mashiach Premium — 1 mês (PIX)',
              description:
                'Renovação manual mensal via PIX. Acesso por 30 dias + 2 dias de tolerância para renovar.',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'monthly-pix',
        months: '1',
        supabase_user_id: user.id,
      },
      payment_intent_data: {
        metadata: {
          type: 'monthly-pix',
          months: '1',
          supabase_user_id: user.id,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium`,
      locale: 'pt-BR',
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro desconhecido ao iniciar checkout PIX mensal'
    console.error('[create-checkout-pix-monthly] falha:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
