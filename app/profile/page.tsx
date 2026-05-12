import type { Metadata } from 'next'
import { connection } from 'next/server'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { ProfileClient } from '@/components/ui/ProfileClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Meu Perfil',
  description: 'Gerencie sua conta e assinatura na plataforma Brit Mashiach.',
}

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  // Evita pré-render estático no `next build` (sem cookies / sem env no worker).
  await connection()

  if (!hasSupabaseServerEnv()) {
    redirect('/auth')
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const params = await searchParams
  const successPayment = params.success === 'true'

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <ProfileClient profile={profile} successPayment={successPayment} />
    </div>
  )
}
