import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MagenDavidIcon } from '@/components/ui/MagenDavidIcon'
import { ResetPasswordForm } from '@/components/ui/ResetPasswordForm'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'Redefinir senha',
  description: 'Defina uma nova senha para sua conta na Brit Im Mashiach.',
}

export default async function RedefinirSenhaPage() {
  if (!hasSupabaseServerEnv()) {
    redirect('/auth?error=Supabase+não+configurado+no+servidor.')
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth?error=Link+expirado+ou+inválido.+Solicite+um+novo+e-mail+de+recuperação.')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-petroleum-gradient flex items-center justify-center mx-auto shadow-petroleum-md">
            <MagenDavidIcon className="w-6 h-6 text-gold-400" />
          </div>
          <div>
            <h1 className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100 tracking-wide">
              Nova senha
            </h1>
            <p className="text-sm font-inter text-warmgray-500 mt-2">
              Conta: {user.email}
            </p>
          </div>
        </div>

        <div className="glass-card p-8">
          <ResetPasswordForm />
        </div>

        <p className="text-center text-xs font-inter text-warmgray-500">
          <Link href="/auth" className="text-gold-600 hover:underline dark:text-gold-400">
            Voltar ao login
          </Link>
        </p>
      </div>
    </div>
  )
}
