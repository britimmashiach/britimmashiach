import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { notifySiteMessage } from '@/lib/notify'

const CATEGORIES = new Set(['sugestao', 'opiniao', 'reclamacao'])
const CATEGORY_LABELS: Record<string, string> = {
  sugestao: 'Sugestão',
  opiniao: 'Opinião',
  reclamacao: 'Reclamação',
}

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
    category?: string
    subject?: string
    message?: string
    contactName?: string
    contactEmail?: string
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

  const category = body.category?.trim()
  const message = body.message?.trim() ?? ''
  const subject = (body.subject?.trim() ?? '').slice(0, 120)
  const contactName = (body.contactName?.trim() ?? '').slice(0, 120)
  let contactEmail = (body.contactEmail?.trim() ?? '').slice(0, 200)

  if (!category || !CATEGORIES.has(category)) {
    return NextResponse.json({ error: 'Selecione o tipo de mensagem.' }, { status: 400 })
  }

  if (message.length < 10) {
    return NextResponse.json({ error: 'Descreva sua mensagem com pelo menos 10 caracteres.' }, { status: 400 })
  }

  if (message.length > 3000) {
    return NextResponse.json({ error: 'Mensagem muito longa (máximo 3000 caracteres).' }, { status: 400 })
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

    if (!contactEmail && profile?.email) contactEmail = profile.email
  }

  if (!contactEmail || !isValidEmail(contactEmail)) {
    return NextResponse.json({ error: 'Informe um e-mail válido para contato.' }, { status: 400 })
  }

  const { error } = await getSupabaseAdmin().from('site_feedback').insert({
    user_id: userId,
    category,
    subject,
    message,
    contact_name: contactName || null,
    contact_email: contactEmail,
    status: 'novo',
  })

  if (error) {
    console.error('[feedback] insert falhou:', error.message)
    if (error.message.includes('site_feedback') && error.message.includes('does not exist')) {
      return NextResponse.json(
        { error: 'Ouvidoria ainda não configurada no banco. Aplique a migration site_feedback.' },
        { status: 503 },
      )
    }
    return NextResponse.json({ error: 'Não foi possível enviar. Tente novamente.' }, { status: 500 })
  }

  // Notifica o Rav no WhatsApp (nunca lanca; falha aqui nao afeta o envio).
  await notifySiteMessage({
    kind: `Ouvidoria - ${CATEGORY_LABELS[category] ?? category}`,
    name: contactName,
    email: contactEmail,
    message: subject ? `Assunto: ${subject}\n${message}` : message,
  })

  return NextResponse.json({ ok: true })
}
