import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

/**
 * Cria sessão do Stripe Customer Portal. O Portal permite ao membro:
 * - Atualizar cartão / método de pagamento
 * - Ver faturas anteriores
 * - Cancelar a assinatura
 * - Reativar assinatura cancelada
 *
 * Pré-requisito: o customer já deve existir no Stripe (criado pelo
 * /api/stripe/create-checkout na primeira assinatura). Se o usuário
 * nunca assinou, retorna 400 com mensagem clara.
 *
 * Configuração: o Portal precisa estar ativado no Stripe Dashboard em
 * Settings → Billing → Customer Portal (uma vez por conta Stripe).
 */
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
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_customer_id) {
    return NextResponse.json(
      {
        error:
          'Você ainda não possui um histórico de assinatura. Assine o plano Premium para gerenciar pagamentos.',
      },
      { status: 400 },
    )
  }

  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/profile`,
      locale: 'pt-BR',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro desconhecido'
    console.error('[billing-portal] erro ao criar sessão:', msg)
    return NextResponse.json(
      {
        error:
          'Não foi possível abrir o portal de gerenciamento. Verifique se o Customer Portal está ativado no Stripe.',
      },
      { status: 500 },
    )
  }
}
