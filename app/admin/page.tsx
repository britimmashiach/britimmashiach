import type { Metadata } from 'next'
import { connection } from 'next/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Wrench } from 'lucide-react'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { hasServiceRoleEnv } from '@/lib/supabase-admin'
import { listMembersAction } from '@/app/admin/actions'
import { PromoteUserPanel } from '@/components/admin/PromoteUserPanel'
import { AdminMembersPanel } from '@/components/admin/AdminMembersPanel'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Manutenção',
  description: 'Painel de administração: membros, papéis, banir e excluir contas.',
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
  const listResult = serviceOk ? await listMembersAction(1, 25) : null
  const snapshot =
    listResult && listResult.ok
      ? {
          members: listResult.members,
          nextPage: listResult.nextPage,
          total: listResult.total,
          perPage: listResult.perPage,
        }
      : null

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl space-y-10">
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-inter text-warmgray-500 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Início
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wrench className="h-6 w-6 text-gold-500 shrink-0" aria-hidden="true" />
              <h1 className="section-title text-2xl md:text-3xl">Manutenção do site</h1>
            </div>
            <p className="section-subtitle max-w-2xl">
              Olá{profile?.full_name ? `, ${profile.full_name.split(/\s+/)[0]}` : ''}. Gestão de membros: alterar papel (Membro /
              Premium / Admin), banir ou revogar banimento no Auth, e excluir contas. Requer{' '}
              <code className="text-xs bg-muted px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> no servidor.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-xs font-inter text-warmgray-600 dark:text-warmgray-400">
            <ShieldCheck className="h-4 w-4 text-gold-500 shrink-0" aria-hidden="true" />
            Acesso de administrador
          </div>
        </div>
      </div>

      {!serviceOk && (
        <div
          role="alert"
          className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-inter text-amber-900 dark:text-amber-100"
        >
          Defina <code className="text-xs bg-background/60 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> na Vercel (Production).
          Sem ela, as ações de manutenção não funcionam.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
          Alterar papel por e-mail
        </h2>
        <PromoteUserPanel serviceRoleConfigured={serviceOk} />
      </section>

      <section className="space-y-3">
        <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
          Diretório de membros
        </h2>
        <AdminMembersPanel
          serviceRoleConfigured={serviceOk}
          currentUserId={user.id}
          initialSnapshot={snapshot}
        />
      </section>
    </div>
  )
}
