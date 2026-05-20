'use server'

import { redirect } from 'next/navigation'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { notifyNewSignup } from '@/lib/notify'

export type SignUpResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

const missingEnvMsg =
  'Supabase não configurado no servidor. Na Vercel: Settings → Environment Variables (Production): NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY. Depois Redeploy.'

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
  const origin = getPublicSiteOrigin()
  const callback = new URL('/auth/callback', `${origin}/`)
  callback.searchParams.set('next', '/profile')
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: callback.toString(),
    },
  })
  if (error) return { ok: false, message: error.message }

  // Fire-and-forget: dispara chamada telefonica TTS para o Rav EBBY
  // via CallMeBot sem bloquear a resposta. Falha nao quebra o cadastro.
  void notifyNewSignup({ email, fullName }).catch(() => undefined)

  return {
    ok: true,
    message: 'Verifique seu email para confirmar o cadastro.',
  }
}
