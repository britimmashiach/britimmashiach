'use server'

import { redirect } from 'next/navigation'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { notifyNewSignup } from '@/lib/notify'

export type SignUpResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

export type SimpleResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

const missingEnvMsg =
  'Supabase não configurado no servidor. Na Vercel: Settings → Environment Variables (Production): NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY. Depois Redeploy.'

/** Valida um caminho de redirecionamento interno vindo de formulário/URL (evita open redirect). */
function safeNextPath(value: string, fallback: string): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.length > 128) return fallback
  return value
}

// Recebe FormData (não args posicionais) para evitar que o logger de dev do
// Next.js imprima senhas em texto puro no terminal.
export async function signInWithPasswordAction(
  formData: FormData,
): Promise<{ error: string } | undefined> {
  if (!hasSupabaseServerEnv()) {
    return { error: missingEnvMsg }
  }

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const next = safeNextPath(String(formData.get('next') ?? ''), '/')

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect(next)
}

export async function signUpAction(formData: FormData): Promise<SignUpResult> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: missingEnvMsg }
  }

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const fullName = String(formData.get('name') ?? '')
  const next = safeNextPath(String(formData.get('next') ?? ''), '/profile')

  const supabase = await createServerSupabaseClient()
  const origin = getPublicSiteOrigin()
  const callback = new URL('/auth/callback', `${origin}/`)
  callback.searchParams.set('next', next)
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: callback.toString(),
    },
  })
  if (error) return { ok: false, message: error.message }

  void notifyNewSignup({ email, fullName }).catch(() => undefined)

  return {
    ok: true,
    message: 'Verifique seu email para confirmar o cadastro.',
  }
}

export async function resetPasswordRequestAction(formData: FormData): Promise<SimpleResult> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: missingEnvMsg }
  }

  const email = String(formData.get('email') ?? '').trim()
  if (!email) {
    return { ok: false, message: 'Informe o email da conta.' }
  }

  const supabase = await createServerSupabaseClient()
  const origin = getPublicSiteOrigin()
  const callback = new URL('/auth/callback', `${origin}/`)
  callback.searchParams.set('next', '/auth/redefinir-senha')

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callback.toString(),
  })

  if (error) return { ok: false, message: error.message }

  return {
    ok: true,
    message: 'Enviamos um link para redefinir a senha. Verifique sua caixa de entrada e o spam.',
  }
}

export async function updatePasswordAction(
  formData: FormData,
): Promise<{ error: string } | undefined> {
  if (!hasSupabaseServerEnv()) {
    return { error: missingEnvMsg }
  }

  const password = String(formData.get('password') ?? '')
  if (password.length < 8) {
    return { error: 'A senha deve ter no mínimo 8 caracteres.' }
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Sessão expirada. Solicite um novo link de recuperação.' }
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }

  redirect('/profile?auth=password-updated')
}
