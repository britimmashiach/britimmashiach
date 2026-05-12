import { NextResponse } from 'next/server'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

function safeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/'
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

/**
 * Retorno do e-mail de confirmação (PKCE): ?code=...
 * Supabase → Auth → Redirect URLs: inclua {SITE_URL}/auth/callback
 */
export async function GET(request: Request) {
  const base = publicBaseUrl(request)
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = safeNext(url.searchParams.get('next'))

  if (!hasSupabaseServerEnv()) {
    return NextResponse.redirect(
      `${base}/auth?error=${encodeURIComponent('Supabase não configurado no servidor.')}`,
    )
  }

  if (!code) {
    return NextResponse.redirect(
      `${base}/auth?error=${encodeURIComponent('Link inválido ou expirado. Peça um novo e-mail de confirmação.')}`,
    )
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${base}/auth?error=${encodeURIComponent(error.message)}`)
  }

  return NextResponse.redirect(`${base}${next}`)
}
