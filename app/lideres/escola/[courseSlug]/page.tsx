import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { getEscolaStageUserStatus } from '@/lib/escola-stage-attempt-status'

type Props = { params: Promise<{ courseSlug: string }> }

export default async function LideresEscolaCoursePage({ params }: Props) {
  const { courseSlug } = await params
  if (!hasSupabaseServerEnv() || !hasServiceRoleEnv()) redirect('/auth')

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/auth/login?next=/lideres/escola/${courseSlug}`)

  const admin = getSupabaseAdmin()
  const { data: course } = await admin
    .from('escola_courses')
    .select('id, title, subtitle')
    .eq('slug', courseSlug)
    .single()

  if (!course) notFound()

  const { data: enrollment } = await admin
    .from('escola_enrollments')
    .select('highest_unlocked_stage, status')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .maybeSingle()

  const { data: stages } = await admin
    .from('escola_course_stages')
    .select('id, stage_number, slug, title, subtitle')
    .eq('course_id', course.id)
    .order('stage_number')

  const unlocked = enrollment?.highest_unlocked_stage ?? 0
  const completed = enrollment?.status === 'completed'

  const statuses = await Promise.all(
    (stages ?? []).map(async (s) => ({
      slug: s.slug,
      status: await getEscolaStageUserStatus(admin, user.id, s.id),
    })),
  )
  const bySlug = new Map(statuses.map((x) => [x.slug, x.status]))

  function badge(slug: string) {
    const st = bySlug.get(slug)
    if (!st || st.kind === 'open') return null
    if (st.kind === 'approved')
      return (
        <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
          Aprovado
        </span>
      )
    if (st.kind === 'awaiting_colacao')
      return (
        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Aguardando colação</span>
      )
    return <span className="text-xs text-warmgray-500">Refazer avaliação</span>
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <Link href="/lideres/escola" className="text-sm text-gold-700 dark:text-gold-400">
        Voltar aos cursos
      </Link>
      <h1 className="font-cinzel text-2xl">{course.title}</h1>
      <p className="text-sm text-warmgray-600 dark:text-warmgray-400">{course.subtitle}</p>
      <p className="text-sm text-warmgray-500">
        Estude cada módulo na ordem. Só depois da leitura responda o questionário. Após a colação do Rav, a próxima etapa
        abre.
      </p>

      <ol className="space-y-3">
        {(stages ?? []).map((s) => {
          const open = completed || s.stage_number <= unlocked
          return (
            <li
              key={s.slug}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border px-4 py-4"
            >
              <div className="space-y-1 min-w-0">
                <span className="text-xs text-warmgray-500">Etapa {s.stage_number}</span>
                <p className="font-inter font-medium">{s.title}</p>
                <p className="text-xs text-warmgray-500 line-clamp-2">{s.subtitle}</p>
                {badge(s.slug)}
              </div>
              {open ? (
                <Link
                  href={`/lideres/escola/${courseSlug}/${s.slug}`}
                  className="text-sm font-semibold text-gold-700 dark:text-gold-400 whitespace-nowrap"
                >
                  Estudar e avaliar →
                </Link>
              ) : (
                <span className="text-xs text-warmgray-400">Bloqueada</span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
