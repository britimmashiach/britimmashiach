import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'

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
    .select('stage_number, slug, title, subtitle')
    .eq('course_id', course.id)
    .order('stage_number')

  const unlocked = enrollment?.highest_unlocked_stage ?? 0
  const completed = enrollment?.status === 'completed'

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <Link href="/lideres/escola" className="text-sm text-gold-700 dark:text-gold-400">
        Voltar aos cursos
      </Link>
      <h1 className="font-cinzel text-2xl">{course.title}</h1>
      <p className="text-sm text-warmgray-600 dark:text-warmgray-400">{course.subtitle}</p>

      <ol className="space-y-2">
        {(stages ?? []).map((s) => {
          const open = completed || s.stage_number <= unlocked
          return (
            <li
              key={s.slug}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-4 py-3"
            >
              <div>
                <span className="text-xs text-warmgray-500">Etapa {s.stage_number}</span>
                <p className="font-inter font-medium">{s.title}</p>
              </div>
              {open ? (
                <Link
                  href={`/lideres/escola/${courseSlug}/${s.slug}`}
                  className="text-sm font-semibold text-gold-700 dark:text-gold-400"
                >
                  Questionário
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
