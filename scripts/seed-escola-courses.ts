/**
 * Popula escola_courses e escola_course_stages a partir do catálogo.
 *
 *   npm run seed:escola
 *   npm run seed:escola -- --force
 */
import { createClient } from '@supabase/supabase-js'
import { ESCOLA_COURSE_CATALOG } from '../lib/escola-course-catalog'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const force = process.argv.includes('--force')

if (!url || !key) {
  console.error('Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })

async function main() {
  const slugToId = new Map<string, string>()

  for (const course of ESCOLA_COURSE_CATALOG) {
    const { data: existing } = await supabase
      .from('escola_courses')
      .select('id')
      .eq('slug', course.slug)
      .maybeSingle()

    let courseId = existing?.id

    if (!courseId) {
      const { data, error } = await supabase
        .from('escola_courses')
        .insert({
          slug: course.slug,
          title: course.title,
          certification_title: course.certificationTitle,
          subtitle: course.subtitle,
          audience: course.audience,
          sort_order: course.sortOrder,
          requires_leader: course.requiresLeader,
          profile_flag_on_complete: course.profileFlagOnComplete,
          is_published: true,
        })
        .select('id')
        .single()
      if (error) {
        console.error(`curso ${course.slug}:`, error.message)
        process.exit(1)
      }
      courseId = data.id
      console.log(`+ curso ${course.slug}`)
    } else if (force) {
      await supabase
        .from('escola_courses')
        .update({
          title: course.title,
          certification_title: course.certificationTitle,
          subtitle: course.subtitle,
          audience: course.audience,
          sort_order: course.sortOrder,
          requires_leader: course.requiresLeader,
          profile_flag_on_complete: course.profileFlagOnComplete,
        })
        .eq('id', courseId)
      console.log(`~ curso ${course.slug}`)
    } else {
      console.log(`= curso ${course.slug}`)
    }

    slugToId.set(course.slug, courseId!)

    for (const stage of course.stages) {
      const { data: st } = await supabase
        .from('escola_course_stages')
        .select('id')
        .eq('course_id', courseId!)
        .eq('stage_number', stage.stageNumber)
        .maybeSingle()

      if (st?.id && !force) continue

      const row = {
        course_id: courseId!,
        stage_number: stage.stageNumber,
        slug: stage.slug,
        title: stage.title,
        subtitle: stage.subtitle,
        passing_score_pct: stage.questionnaire.passingScorePct,
        questionnaire: stage.questionnaire,
      }

      if (st?.id) {
        await supabase.from('escola_course_stages').update(row).eq('id', st.id)
      } else {
        const { error } = await supabase.from('escola_course_stages').insert(row)
        if (error) {
          console.error(`etapa ${course.slug} ${stage.stageNumber}:`, error.message)
          process.exit(1)
        }
      }
    }
  }

  for (const course of ESCOLA_COURSE_CATALOG) {
    if (!course.prerequisiteSlug) continue
    const id = slugToId.get(course.slug)
    const preId = slugToId.get(course.prerequisiteSlug)
    if (!id || !preId) continue
    await supabase.from('escola_courses').update({ prerequisite_course_id: preId }).eq('id', id)
  }

  console.log('\nseed:escola concluido')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
