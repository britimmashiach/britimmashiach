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
    subscription_current_period_end?: string | null
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
        // current_period_end vem em segundos UTC; converter para ISO string
        const periodEnd =
          typeof (sub as unknown as { current_period_end?: number }).current_period_end === 'number'
            ? new Date(
                (sub as unknown as { current_period_end: number }).current_period_end * 1000,
              ).toISOString()
            : null

        await updateProfile(customerId, {
          stripe_subscription_id: sub.id,
          subscription_status: status === 'active' || status === 'canceled' || status === 'past_due'
            ? status
            : null,
          subscription_current_period_end: periodEnd,
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
          subscription_current_period_end: null,
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

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode === 'payment' && session.metadata?.type === 'annual-pix') {
          const customerId = session.customer as string
          const months = parseInt(session.metadata.months ?? '12', 10)
          const periodEnd = new Date()
          periodEnd.setMonth(periodEnd.getMonth() + months)
          await updateProfile(customerId, {
            role: 'premium',
            subscription_status: 'active',
            subscription_current_period_end: periodEnd.toISOString(),
          })
        }
        break
      }

      // Reembolso total via Dashboard revoga acesso premium imediatamente.
      // Reembolso parcial nao revoga (membro fica com credito proporcional).
      // Sem este handler, usuario PIX reembolsado mantem acesso ate o
      // periodo expirar mesmo apos receber o dinheiro de volta.
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const fullRefund = charge.amount_refunded >= charge.amount
        if (fullRefund && typeof charge.customer === 'string') {
          await updateProfile(charge.customer, {
            role: 'free',
            subscription_status: 'canceled',
            subscription_current_period_end: null,
          })
        }
        break
      }

      // Disputa aberta congela o acesso preventivamente (past_due),
      // espelhando o tratamento de invoice.payment_failed. Ao resolver
      // a disputa no Dashboard, customer.subscription.updated reativa.
      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        if (typeof dispute.charge === 'string') {
          const charge = await getStripe().charges.retrieve(dispute.charge)
          if (typeof charge.customer === 'string') {
            await updateProfile(charge.customer, { subscription_status: 'past_due' })
          }
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
