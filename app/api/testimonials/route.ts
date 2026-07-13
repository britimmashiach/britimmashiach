import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { notifySiteMessage } from '@/lib/notify'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

export async function POST(req: Request) {
  if (!hasSupabaseServerEnv() || !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    return NextResponse.json({ error: 'Serviço indisponível.' }, { status: 503 })
  }

  let body: {
    body?: string
    authorDisplayName?: string
    city?: string
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

  const text = body.body?.trim() ?? ''
  const city = (body.city?.trim() ?? '').slice(0, 120) || null
  let authorDisplayName = (body.authorDisplayName?.trim() ?? '').slice(0, 120)

  if (text.length < 20) {
    return NextResponse.json({ error: 'Compartilhe com pelo menos 20 caracteres.' }, { status: 400 })
  }

  if (text.length > 1500) {
    return NextResponse.json({ error: 'Texto muito longo (máximo 1500 caracteres).' }, { status: 400 })
  }

  // Testemunho exige cadastro: evita spam e garante que o texto é atribuível a alguém.
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Crie sua conta com e-mail para compartilhar seu testemunho.' },
      { status: 401 },
    )
  }

  if (!authorDisplayName) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', user.id)
      .maybeSingle()
    authorDisplayName = profile?.full_name?.trim() || user.email?.split('@')[0] || 'Membro da kehilah'
  }

  const { error } = await getSupabaseAdmin()
    .from('kehilah_testimonials')
    .insert({
      user_id: user.id,
      author_display_name: authorDisplayName,
      body: text,
      city,
      is_approved: false,
      is_featured: false,
    })

  if (error) {
    console.error('[testimonials] insert falhou:', error.message)
    if (error.message.includes('kehilah_testimonials') && error.message.includes('does not exist')) {
      return NextResponse.json(
        { error: 'Testemunhos ainda não configurados no banco. Aplique a migration community.' },
        { status: 503 },
      )
    }
    return NextResponse.json({ error: 'Não foi possível enviar. Tente novamente.' }, { status: 500 })
  }

  // Notifica o Rav para revisão/aprovação (nunca lança; falha aqui não afeta o envio).
  await notifySiteMessage({
    kind: 'Testemunho (aguardando aprovação)',
    name: authorDisplayName,
    email: user.email ?? null,
    message: text,
  })

  return NextResponse.json({ ok: true })
}
