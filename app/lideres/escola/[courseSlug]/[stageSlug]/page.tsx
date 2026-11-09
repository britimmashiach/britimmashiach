import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { EscolaQuizForm } from '@/components/lideres/EscolaQuizForm'
import { RichMarkdown } from '@/components/ui/RichMarkdown'
import { getEscolaStudyMarkdown } from '@/lib/escola-study-content'
import { getEscolaStageUserStatus } from '@/lib/escola-stage-attempt-status'
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
    .select('id, stage_number, title, subtitle, questionnaire')
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

  const userStatus = await getEscolaStageUserStatus(admin, user.id, stage.id)
  const study = getEscolaStudyMarkdown(courseSlug, stageSlug, stage.stage_number, stage.title)
  const questionnaire = stage.questionnaire as EscolaQuestionnaire

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-10">
      <Link href={`/lideres/escola/${courseSlug}`} className="text-sm text-gold-700 dark:text-gold-400">
        Voltar às etapas
      </Link>
      <header className="space-y-1">
        <p className="text-xs text-warmgray-500">{course.title} · Etapa {stage.stage_number}</p>
        <h1 className="font-cinzel text-2xl">{stage.title}</h1>
        <p className="text-sm text-warmgray-600 dark:text-warmgray-400">{stage.subtitle}</p>
      </header>

      <section className="space-y-4" aria-labelledby="estudo-etapa">
        <h2 id="estudo-etapa" className="font-cinzel text-xl text-petroleum-800 dark:text-parchment-100">
          Material de estudo
        </h2>
        <article className="prose prose-sm md:prose-base max-w-none dark:prose-invert rounded-xl border border-border/60 p-6 bg-card/30">
          <RichMarkdown text={study.markdown} />
        </article>
        {study.manhigutReadUrl && (
          <Link
            href={study.manhigutReadUrl}
            className="inline-flex btn-gold text-sm"
          >
            Abrir leitura completa no Beit Midrash
          </Link>
        )}
      </section>

      <section className="space-y-4 pt-6 border-t border-border" aria-labelledby="avaliacao-etapa">
        <h2 id="avaliacao-etapa" className="font-cinzel text-xl text-petroleum-800 dark:text-parchment-100">
          Avaliação desta etapa
        </h2>
        <EscolaQuizForm
          courseSlug={courseSlug}
          stageSlug={stageSlug}
          questionnaire={questionnaire}
          userStatus={userStatus}
        />
      </section>
    </div>
  )
}
