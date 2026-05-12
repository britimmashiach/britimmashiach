import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

async function updateProfile(
  customerId: string,
  updates: {
    stripe_subscription_id?: string | null
    subscription_status?: 'active' | 'canceled' | 'past_due' | null
    role?: 'free' | 'premium'
  },
) {
  const { error } = await getSupabaseAdmin()
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error('[Webhook] Erro ao atualizar perfil:', error.message)
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Assinatura ausente' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Assinatura inválida'
    console.error('[Webhook] Validação falhou:', msg)
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string
        const status = sub.status

        await updateProfile(customerId, {
          stripe_subscription_id: sub.id,
          subscription_status: status === 'active' || status === 'canceled' || status === 'past_due'
            ? status
            : null,
          role: status === 'active' ? 'premium' : 'free',
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await updateProfile(sub.customer as string, {
          role: 'free',
          subscription_status: 'canceled',
          stripe_subscription_id: null,
        })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        if (typeof invoice.customer === 'string') {
          await updateProfile(invoice.customer, { subscription_status: 'past_due' })
        }
        break
      }
    }
  } catch (err) {
    console.error('[Webhook] Erro interno:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
