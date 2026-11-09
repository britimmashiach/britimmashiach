import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { GraduationCap, Lock } from 'lucide-react'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { ensureEscolaEnrollmentsAction, listEscolaProgressAction } from '@/app/lideres/escola/actions'

export const metadata: Metadata = {
  title: 'Cursos da Escola',
  description: 'Trilhas sequenciais Avodat HaNefesh, Manhigut e IECL, Método Rav EBBY.',
}

export default async function LideresEscolaPage() {
  if (!hasSupabaseServerEnv()) redirect('/auth')

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/lideres/escola')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_leader, role')
    .eq('id', user.id)
    .single()

  if (!profile?.is_leader && profile?.role !== 'admin') {
    redirect('/lideres/painel')
  }

  await ensureEscolaEnrollmentsAction()
  const progress = await listEscolaProgressAction()
  const courses = progress.ok ? progress.courses : []

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-8">
      <header className="space-y-2">
        <p className="text-gold-600 dark:text-gold-400 text-sm font-inter uppercase tracking-wide">
          Escola Rav EBBY
        </p>
        <h1 className="font-cinzel text-3xl text-petroleum-800 dark:text-parchment-100">
          Cursos e colação
        </h1>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
          Etapas sequenciais, questionário por módulo e colação do Rav antes de avançar. Sem pular etapas.
        </p>
      </header>

      {!progress.ok && (
        <p className="text-sm text-amber-800 dark:text-amber-200 bg-amber-500/10 rounded-lg p-3">
          {progress.message}
        </p>
      )}

      <ul className="space-y-4">
        {courses.map((c) => (
          <li key={c.slug} className="glass-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-cinzel text-xl">{c.title}</h2>
                <p className="text-xs text-warmgray-500">Diploma: {c.certificationTitle}</p>
              </div>
              {c.status === 'locked' && <Lock className="w-5 h-5 text-warmgray-400 shrink-0" />}
              {c.status === 'completed' && (
                <GraduationCap className="w-5 h-5 text-gold-600 shrink-0" aria-label="Concluído" />
              )}
            </div>

            {c.status === 'locked' && (
              <p className="text-sm text-warmgray-500">Conclua o curso anterior para desbloquear.</p>
            )}

            {c.status === 'active' && (
              <>
                <p className="text-sm">
                  Etapa liberada:{' '}
                  <strong>
                    {c.unlockedStage}/{c.totalStages}
                  </strong>
                  {c.currentStageTitle ? `, ${c.currentStageTitle}` : ''}
                </p>
                <Link
                  href={`/lideres/escola/${c.slug}`}
                  className="inline-flex text-sm font-semibold text-gold-700 dark:text-gold-400"
                >
                  Abrir curso e avaliação
                </Link>
              </>
            )}

            {c.status === 'completed' && (
              <p className="text-sm text-green-700 dark:text-green-400">Curso concluído e colado pelo Rav.</p>
            )}
          </li>
        ))}
      </ul>

      <p className="text-xs text-warmgray-500">
        A formação clássica em{' '}
        <Link href="/lideres/formacao" className="underline">
          /lideres/formacao
        </Link>{' '}
        permanece para leitura dos módulos Manhigut; o progresso oficial passa a ser registrado aqui.
      </p>
    </div>
  )
}
