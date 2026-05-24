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

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  redirect('/')
}

export async function signUpAction(formData: FormData): Promise<SignUpResult> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: missingEnvMsg }
  }

  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const fullName = String(formData.get('name') ?? '')

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

  void notifyNewSignup({ email, fullName }).catch(() => undefined)

  return {
    ok: true,
    message: 'Verifique seu email para confirmar o cadastro.',
  }
}
