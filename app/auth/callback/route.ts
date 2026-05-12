import { NextResponse } from 'next/server'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

function safeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/'
  if (value.length > 128) return '/'
  return value
}

/** Origem pública (domínio customizado na Vercel via X-Forwarded-Host). */
function publicBaseUrl(request: Request): string {
  const url = new URL(request.url)
  if (process.env.NODE_ENV === 'development') return url.origin
  const forwardedHost = request.headers.get('x-forwarded-host')
  if (forwardedHost) return `https://${forwardedHost}`
  return url.origin
}

function withWelcomeQuery(path: string): string {
  const sep = path.includes('?') ? '&' : '?'
  return `${path}${sep}auth=confirmed`
}

function isEmailOtpType(t: string): t is 'signup' | 'email' | 'magiclink' | 'recovery' | 'invite' | 'email_change' {
  return ['signup', 'email', 'magiclink', 'recovery', 'invite', 'email_change'].includes(t)
}

/**
 * Retorno do e-mail de confirmação:
 * - PKCE: ?code=...
 * - Legado: ?token_hash=...&type=signup|email|...
 *
 * Supabase → Auth → Redirect URLs: inclua {SITE}/auth/callback e, se usar ?next=, {SITE}/auth/callback*
 */
export async function GET(request: Request) {
  const base = publicBaseUrl(request)
  const url = new URL(request.url)
  const next = safeNext(url.searchParams.get('next'))
  const code = url.searchParams.get('code')
  const token_hash = url.searchParams.get('token_hash')
  const typeParam = url.searchParams.get('type')

  if (!hasSupabaseServerEnv()) {
    return NextResponse.redirect(
      `${base}/auth?error=${encodeURIComponent('Supabase não configurado no servidor.')}`,
    )
  }

  const supabase = await createServerSupabaseClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return NextResponse.redirect(`${base}/auth?error=${encodeURIComponent(error.message)}`)
    }
    return NextResponse.redirect(`${base}${withWelcomeQuery(next)}`)
  }

  if (token_hash && typeParam && isEmailOtpType(typeParam)) {
    const { error } = await supabase.auth.verifyOtp({
      type: typeParam,
      token_hash,
    })
    if (error) {
      return NextResponse.redirect(`${base}/auth?error=${encodeURIComponent(error.message)}`)
    }
    return NextResponse.redirect(`${base}${withWelcomeQuery(next)}`)
  }

  return NextResponse.redirect(
    `${base}/auth?error=${encodeURIComponent('Link inválido ou expirado. Peça um novo e-mail de confirmação.')}`,
  )
}
