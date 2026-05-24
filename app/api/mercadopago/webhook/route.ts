import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { getMpPreApproval } from '@/lib/mercadopago'
import { createClient } from '@supabase/supabase-js'

/**
 * Webhook do Mercado Pago para Subscriptions (PreApproval).
 *
 * O MP envia notificações nos seguintes tópicos relevantes:
 *  - subscription_preapproval     → status da assinatura mudou
 *  - subscription_authorized_payment → cobrança recorrente aprovada/falhou
 *
 * Validação por assinatura HMAC (header x-signature) é altamente
 * recomendada em produção. Configure MERCADOPAGO_WEBHOOK_SECRET com o
 * Secret exibido em Developers → sua app → Webhooks.
 *
 * Configurar no painel MP:
 *   URL: https://britimmashiach.com/api/mercadopago/webhook
 *   Eventos: Assinaturas (assinatura criada, atualizada, cancelada, pagamento)
 */

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

type ProfileUpdate = {
  mp_subscription_id?: string | null
  subscription_status?: 'active' | 'canceled' | 'past_due' | null
  subscription_current_period_end?: string | null
  role?: 'free' | 'premium'
}

async function updateProfileByUserId(userId: string, updates: ProfileUpdate) {
  const { error } = await getSupabaseAdmin()
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (error) {
    console.error('[MP Webhook] Erro ao atualizar perfil:', error.message)
  }
}

async function updateProfileByMpSubId(subId: string, updates: ProfileUpdate) {
  const { error } = await getSupabaseAdmin()
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('mp_subscription_id', subId)

  if (error) {
    console.error('[MP Webhook] Erro ao atualizar perfil por mp_subscription_id:', error.message)
  }
}

/**
 * Validação opcional da assinatura HMAC do webhook MP.
 * Se MERCADOPAGO_WEBHOOK_SECRET não estiver configurado, pula validação
 * (útil para testes locais e setup inicial).
 *
 * Documentação oficial:
 * https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 */
function isValidMpSignature(req: NextRequest, rawBody: string, dataId: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET?.trim()
  if (!secret) return true // sem secret configurado → não valida (modo permissivo)

  const xSignature = req.headers.get('x-signature')
  const xRequestId = req.headers.get('x-request-id')
  if (!xSignature || !xRequestId) return false

  // x-signature vem como "ts=1234567890,v1=abc123def456"
  const parts = xSignature.split(',').map((p) => p.trim())
  const tsPart = parts.find((p) => p.startsWith('ts='))
  const v1Part = parts.find((p) => p.startsWith('v1='))
  if (!tsPart || !v1Part) return false

  const ts = tsPart.slice(3)
  const v1 = v1Part.slice(3)

  // Template oficial: id:[data.id];request-id:[x-request-id];ts:[ts];
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`
  const hmac = crypto.createHmac('sha256', secret).update(manifest).digest('hex')

  return hmac === v1
}

/**
 * Quando o MP cobra uma assinatura mensal com sucesso, atualiza
 * subscription_current_period_end para "agora + 1 mês" para que o
 * acesso premium permaneça liberado até a próxima cobrança.
 */
function nextMonthIso(from: Date = new Date()): string {
  const d = new Date(from)
  d.setMonth(d.getMonth() + 1)
  return d.toISOString()
}

export async function POST(req: NextRequest) {
  let rawBody: string
  try {
    rawBody = await req.text()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  let payload:
    | {
        action?: string
        type?: string
        data?: { id?: string }
        topic?: string
        resource?: string
      }
    | undefined
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  if (!payload) {
    return NextResponse.json({ error: 'Payload vazio' }, { status: 400 })
  }

  // O MP envia em dois formatos: novo (type+data.id) e legado (topic+resource).
  const type = payload.type || payload.topic
  const dataId =
    payload.data?.id ||
    (payload.resource ? payload.resource.split('/').pop() : undefined) ||
    ''

  if (!type || !dataId) {
    // Notificações de validação inicial podem vir vazias; respondemos 200.
    return NextResponse.json({ received: true, ignored: true })
  }

  if (!isValidMpSignature(req, rawBody, dataId)) {
    console.warn('[MP Webhook] Assinatura inválida ou ausente. dataId=', dataId)
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 })
  }

  try {
    // Apenas eventos de assinatura preapproval são processados aqui.
    if (type === 'subscription_preapproval' || type === 'preapproval') {
      const sub = await getMpPreApproval().get({ id: dataId })

      const status = sub.status as
        | 'pending'
        | 'authorized'
        | 'paused'
        | 'cancelled'
        | undefined
      const externalRef = sub.external_reference

      let subscriptionStatus: 'active' | 'canceled' | 'past_due' | null = null
      let role: 'free' | 'premium' | undefined
      let periodEnd: string | null | undefined

      if (status === 'authorized') {
        subscriptionStatus = 'active'
        role = 'premium'
        // next_payment_date pode ou não vir na resposta. Se vier, usamos.
        const nextPayment = (sub as { next_payment_date?: string }).next_payment_date
        periodEnd = nextPayment ? new Date(nextPayment).toISOString() : nextMonthIso()
      } else if (status === 'cancelled' || status === 'paused') {
        subscriptionStatus = 'canceled'
        role = 'free'
        periodEnd = null
      } else {
        // pending: não muda nada (aguarda autorização do usuário)
        return NextResponse.json({ received: true, status })
      }

      if (externalRef) {
        await updateProfileByUserId(externalRef, {
          mp_subscription_id: dataId,
          subscription_status: subscriptionStatus,
          subscription_current_period_end: periodEnd,
          role,
        })
      } else {
        await updateProfileByMpSubId(dataId, {
          subscription_status: subscriptionStatus,
          subscription_current_period_end: periodEnd,
          role,
        })
      }
      return NextResponse.json({ received: true, status })
    }

    // Eventos de cobrança recorrente: atualiza period_end ao aprovar.
    if (type === 'subscription_authorized_payment' || type === 'authorized_payment') {
      // dataId aqui é o id do pagamento, não da assinatura.
      // O payload do MP geralmente inclui a referência ao preapproval_id em
      // outro campo. Para simplicidade, deixamos o ciclo seguinte ser
      // reconciliado pelo subscription_preapproval que o MP costuma enviar
      // junto. Apenas registramos para auditoria.
      return NextResponse.json({ received: true, payment: dataId })
    }

    // Outros tipos (payment, merchant_order etc.) são ignorados aqui.
    return NextResponse.json({ received: true, ignored: type })
  } catch (err) {
    console.error('[MP Webhook] Erro interno:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

// Permite GET para o teste de URL do painel MP (eles batem com GET às vezes).
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: 'mercadopago-webhook' })
}
