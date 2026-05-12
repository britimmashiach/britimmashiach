'use server'

import { redirect } from 'next/navigation'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

export type SignUpResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

const missingEnvMsg =
  'Supabase não configurado no servidor. Na Vercel: Settings → Environment Variables (Production): NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY. Depois Redeploy.'

/** Base pública do site (link do e-mail de confirmação). Inclua esta URL em Supabase → Auth → Redirect URLs. */
function publicSiteOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
  return 'http://localhost:3000'
}

/** Em caso de sucesso chama `redirect('/')` (pode lançar no cliente). Erro = objeto com `error`. */
export async function signInWithPasswordAction(
  email: string,
  password: string,
): Promise<{ error: string } | undefined> {
  if (!hasSupabaseServerEnv()) {
    return { error: missingEnvMsg }
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect('/')
}

export async function signUpAction(
  email: string,
  password: string,
  fullName: string,
): Promise<SignUpResult> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: missingEnvMsg }
  }

  const supabase = await createServerSupabaseClient()
  const origin = publicSiteOrigin()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })
  if (error) return { ok: false, message: error.message }

  return {
    ok: true,
    message: 'Verifique seu email para confirmar o cadastro.',
  }
}
