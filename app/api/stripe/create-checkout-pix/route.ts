import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

const ANNUAL_PRICE_CENTAVOS = 47000

export async function POST() {
  if (!hasSupabaseServerEnv()) {
    return NextResponse.json(
      { error: 'Serviço indisponível: configure o Supabase.' },
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
          unit_amount: ANNUAL_PRICE_CENTAVOS,
          product_data: {
            name: 'Brit Mashiach Premium — 12 meses',
            description: 'Acesso completo ao ecossistema Brit Mashiach por 12 meses via PIX',
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: 'annual-pix',
      months: '12',
      supabase_user_id: user.id,
    },
    payment_intent_data: {
      metadata: {
        type: 'annual-pix',
        months: '12',
        supabase_user_id: user.id,
      },
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium`,
    locale: 'pt-BR',
  })

  return NextResponse.json({ url: session.url })
}
