import type { Metadata } from 'next'
import { connection } from 'next/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { hasServiceRoleEnv } from '@/lib/supabase-admin'
import { PromoteUserPanel } from '@/components/admin/PromoteUserPanel'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Administração',
  description: 'Promover utilizadores e funções administrativas.',
}

export default async function AdminPage() {
  await connection()

  if (!hasSupabaseServerEnv()) {
    redirect('/auth')
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single()
  if (profile?.role !== 'admin') {
    redirect('/')
  }

  const serviceOk = hasServiceRoleEnv()

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl space-y-8">
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-inter text-warmgray-500 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Início
        </Link>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-gold-500" aria-hidden="true" />
          <h1 className="section-title text-2xl md:text-3xl">Administração</h1>
        </div>
        <p className="section-subtitle">
          Olá{profile.full_name ? `, ${profile.full_name.split(/\s+/)[0]}` : ''}. Aqui pode alterar o papel de qualquer utilizador pelo
          e-mail registado.
        </p>
      </div>

      {!serviceOk && (
        <div
          role="alert"
          className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-inter text-amber-900 dark:text-amber-100"
        >
          Defina <code className="text-xs bg-background/60 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> nas variáveis de ambiente do
          servidor (Vercel → Production). Sem ela, os botões de promoção não conseguem gravar na base.
        </div>
      )}

      <PromoteUserPanel serviceRoleConfigured={serviceOk} />
    </div>
  )
}
