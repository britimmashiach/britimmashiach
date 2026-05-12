import { NextResponse } from 'next/server'
import { getStripe, PLANS } from '@/lib/stripe'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

export async function POST() {
  if (!hasSupabaseServerEnv()) {
    return NextResponse.json({ error: 'Serviço indisponível: configure o Supabase.' }, { status: 503 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

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
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: PLANS.premium.priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium`,
    locale: 'pt-BR',
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
