import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(req: Request) {
  if (!hasSupabaseServerEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    return NextResponse.json({ error: 'Serviço indisponível.' }, { status: 503 })
  }

  let body: {
    message?: string
    contactName?: string
    contactEmail?: string
    isAnonymous?: boolean
    website?: string
  }

  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  if (body.website?.trim()) {
    return NextResponse.json({ ok: true })
  }

  const message = body.message?.trim() ?? ''
  const isAnonymous = Boolean(body.isAnonymous)
  let contactName = (body.contactName?.trim() ?? '').slice(0, 120)
  let contactEmail = (body.contactEmail?.trim() ?? '').slice(0, 200)

  if (message.length < 10) {
    return NextResponse.json({ error: 'Descreva seu pedido com pelo menos 10 caracteres.' }, { status: 400 })
  }

  if (message.length > 2000) {
    return NextResponse.json({ error: 'Texto muito longo (máximo 2000 caracteres).' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userId: string | null = null

  if (user) {
    userId = user.id
    if (!contactEmail && user.email) contactEmail = user.email

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .maybeSingle()

    if (!contactName && profile?.full_name) contactName = profile.full_name
    if (!contactEmail && profile?.email) contactEmail = profile.email
  }

  if (!isAnonymous) {
    if (!contactEmail || !isValidEmail(contactEmail)) {
      return NextResponse.json({ error: 'Informe um e-mail válido ou marque pedido anônimo.' }, { status: 400 })
    }
  } else {
    contactName = ''
    contactEmail = ''
  }

  const { error } = await getSupabaseAdmin().from('prayer_requests').insert({
    user_id: userId,
    contact_name: contactName || null,
    contact_email: contactEmail || null,
    message,
    is_anonymous: isAnonymous,
    status: 'novo',
  })

  if (error) {
    console.error('[prayer-requests] insert falhou:', error.message)
    if (error.message.includes('prayer_requests') && error.message.includes('does not exist')) {
      return NextResponse.json(
        { error: 'Pedidos de oração ainda não configurados no banco. Aplique a migration community.' },
        { status: 503 },
      )
    }
    return NextResponse.json({ error: 'Não foi possível enviar. Tente novamente.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
