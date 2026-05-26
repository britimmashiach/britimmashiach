import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  getPixAutomaticAuthorization,
  monthsForAsaasPayment,
} from '@/lib/asaas'
import { extendPremiumPeriodMonths } from '@/lib/premium-subscription'

/**
 * Webhook Asaas: cobranças PIX + Pix Automático.
 *
 * Configurar no painel Asaas:
 *   URL: https://britimmashiach.com/api/asaas/webhook
 *   Token: ASAAS_WEBHOOK_TOKEN (header asaas-access-token)
 *   Eventos: Cobranças + Pix Automático
 */

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

type ProfileUpdate = {
  role?: 'free' | 'premium'
  subscription_status?: 'active' | 'canceled' | 'past_due' | null
  subscription_current_period_end?: string | null
  asaas_customer_id?: string | null
  asaas_pix_authorization_id?: string | null
  asaas_subscription_id?: string | null
}

async function updateProfileByUserId(userId: string, updates: ProfileUpdate) {
  const { error } = await getSupabaseAdmin()
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (error) console.error('[Asaas Webhook] Erro ao atualizar perfil:', error.message)
}

async function updateProfileByAsaasCustomer(customerId: string, updates: ProfileUpdate) {
  const { error } = await getSupabaseAdmin()
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('asaas_customer_id', customerId)

  if (error) console.error('[Asaas Webhook] Erro por asaas_customer_id:', error.message)
}

async function updateProfileByAuthorization(authId: string, updates: ProfileUpdate) {
  const { error } = await getSupabaseAdmin()
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('asaas_pix_authorization_id', authId)

  if (error) console.error('[Asaas Webhook] Erro por authorization:', error.message)
}

function isValidAsaasToken(req: NextRequest): boolean {
  const expected = process.env.ASAAS_WEBHOOK_TOKEN?.trim()
  if (!expected) return true
  const token = req.headers.get('asaas-access-token')
  return token === expected
}

function resolveUserIdFromPayment(payment: {
  externalReference?: string | null
  customer?: string | null
}): string | null {
  const ref = payment.externalReference?.trim()
  if (ref?.startsWith('annual:')) return ref.slice('annual:'.length)
  if (ref?.startsWith('monthly:')) return ref.slice('monthly:'.length)
  if (ref && ref.length >= 32) return ref
  return null
}

async function grantPremiumFromPayment(payment: {
  value?: number
  customer?: string | null
  externalReference?: string | null
}) {
  const value = payment.value ?? 0
  const months = monthsForAsaasPayment(value)
  const userId = resolveUserIdFromPayment(payment)

  if (userId) {
    const { data: existing } = await getSupabaseAdmin()
      .from('profiles')
      .select('subscription_current_period_end')
      .eq('id', userId)
      .maybeSingle()

    await updateProfileByUserId(userId, {
      role: 'premium',
      subscription_status: 'active',
      subscription_current_period_end: extendPremiumPeriodMonths(
        existing?.subscription_current_period_end,
        months,
      ),
      asaas_customer_id: payment.customer ?? undefined,
    })
    return
  }

  if (payment.customer) {
    const { data: existing } = await getSupabaseAdmin()
      .from('profiles')
      .select('subscription_current_period_end')
      .eq('asaas_customer_id', payment.customer)
      .maybeSingle()

    await updateProfileByAsaasCustomer(payment.customer, {
      role: 'premium',
      subscription_status: 'active',
      subscription_current_period_end: extendPremiumPeriodMonths(
        existing?.subscription_current_period_end,
        months,
      ),
    })
  }
}

export async function POST(req: NextRequest) {
  if (!isValidAsaasToken(req)) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  let payload: Record<string, unknown>
  try {
    payload = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const event = String(payload.event ?? '')

  try {
    switch (event) {
      case 'PAYMENT_RECEIVED':
      case 'PAYMENT_CONFIRMED': {
        const payment = payload.payment as {
          value?: number
          customer?: string
          externalReference?: string
        } | undefined
        if (payment) await grantPremiumFromPayment(payment)
        break
      }

      case 'PAYMENT_OVERDUE': {
        const payment = payload.payment as { customer?: string } | undefined
        if (payment?.customer) {
          await updateProfileByAsaasCustomer(payment.customer, { subscription_status: 'past_due' })
        }
        break
      }

      case 'PAYMENT_REFUNDED':
      case 'PAYMENT_DELETED': {
        const payment = payload.payment as {
          customer?: string
          externalReference?: string
          value?: number
        } | undefined
        const userId = payment ? resolveUserIdFromPayment(payment) : null
        const updates: ProfileUpdate = {
          role: 'free',
          subscription_status: 'canceled',
          subscription_current_period_end: null,
        }
        if (userId) await updateProfileByUserId(userId, updates)
        else if (payment?.customer) await updateProfileByAsaasCustomer(payment.customer, updates)
        break
      }

      case 'PIX_AUTOMATIC_RECURRING_AUTHORIZATION_ACTIVATED': {
        const authorization = payload.authorization as {
          id?: string
          customerId?: string
          subscriptionId?: string
        } | undefined
        if (authorization?.id) {
          await updateProfileByAuthorization(authorization.id, {
            asaas_pix_authorization_id: authorization.id,
            asaas_customer_id: authorization.customerId ?? undefined,
            asaas_subscription_id: authorization.subscriptionId ?? undefined,
            subscription_status: 'active',
          })
        }
        break
      }

      case 'PIX_AUTOMATIC_RECURRING_AUTHORIZATION_CANCELLED':
      case 'PIX_AUTOMATIC_RECURRING_AUTHORIZATION_EXPIRED':
      case 'PIX_AUTOMATIC_RECURRING_AUTHORIZATION_REFUSED': {
        const authorization = payload.authorization as { id?: string } | undefined
        if (authorization?.id) {
          await updateProfileByAuthorization(authorization.id, {
            asaas_pix_authorization_id: null,
            asaas_subscription_id: null,
            subscription_status: 'canceled',
          })
        }
        break
      }

      case 'PIX_AUTOMATIC_RECURRING_AUTHORIZATION_CREATED': {
        const authorization = payload.authorization as {
          id?: string
          customerId?: string
          subscriptionId?: string
        } | undefined
        if (authorization?.id && authorization.customerId) {
          const { data: profile } = await getSupabaseAdmin()
            .from('profiles')
            .select('id')
            .eq('asaas_customer_id', authorization.customerId)
            .maybeSingle()

          if (profile?.id) {
            await updateProfileByUserId(profile.id, {
              asaas_pix_authorization_id: authorization.id,
              asaas_subscription_id: authorization.subscriptionId ?? undefined,
            })
          } else {
            try {
              const full = await getPixAutomaticAuthorization(authorization.id)
              const { data: byRef } = await getSupabaseAdmin()
                .from('profiles')
                .select('id')
                .eq('id', full.customerId)
                .maybeSingle()
              if (byRef?.id) {
                await updateProfileByUserId(byRef.id, {
                  asaas_customer_id: authorization.customerId,
                  asaas_pix_authorization_id: authorization.id,
                  asaas_subscription_id: authorization.subscriptionId ?? undefined,
                })
              }
            } catch {
              // best effort
            }
          }
        }
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error('[Asaas Webhook] Erro interno:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }

  return NextResponse.json({ received: true, event })
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: 'asaas-webhook' })
}
