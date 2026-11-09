import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { EscolaQuizForm } from '@/components/lideres/EscolaQuizForm'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

type Props = { params: Promise<{ courseSlug: string; stageSlug: string }> }

export default async function LideresEscolaStagePage({ params }: Props) {
  const { courseSlug, stageSlug } = await params
  if (!hasSupabaseServerEnv() || !hasServiceRoleEnv()) redirect('/auth')

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?next=/lideres/escola/${courseSlug}/${stageSlug}`)

  const admin = getSupabaseAdmin()
  const { data: course } = await admin.from('escola_courses').select('id, title').eq('slug', courseSlug).single()
  if (!course) notFound()

  const { data: stage } = await admin
    .from('escola_course_stages')
    .select('stage_number, title, subtitle, questionnaire')
    .eq('course_id', course.id)
    .eq('slug', stageSlug)
    .single()

  if (!stage) notFound()

  const { data: enrollment } = await admin
    .from('escola_enrollments')
    .select('highest_unlocked_stage, status')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .maybeSingle()

  if (
    !enrollment ||
    enrollment.status === 'completed' ||
    stage.stage_number > enrollment.highest_unlocked_stage
  ) {
    redirect(`/lideres/escola/${courseSlug}`)
  }

  const questionnaire = stage.questionnaire as EscolaQuestionnaire

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
      <Link href={`/lideres/escola/${courseSlug}`} className="text-sm text-gold-700 dark:text-gold-400">
        Voltar às etapas
      </Link>
      <header className="space-y-1">
        <p className="text-xs text-warmgray-500">{course.title}</p>
        <h1 className="font-cinzel text-2xl">{stage.title}</h1>
        <p className="text-sm text-warmgray-600 dark:text-warmgray-400">{stage.subtitle}</p>
      </header>

      <EscolaQuizForm
        courseSlug={courseSlug}
        stageSlug={stageSlug}
        questionnaire={questionnaire}
      />
    </div>
  )
}
