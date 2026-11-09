import { IMERSOES } from '@/lib/imersoes-content'
import { avodatLessonMarkdown } from '@/lib/escola-lessons/avodat-hanefesh'
import { getCurriculumByMonth } from '@/lib/manhigut-curriculum'

function manualMarkdown(slug: 'cura' | 'libertacao'): string {
  const iecl = IMERSOES.find((i) => i.slug === 'iecl')
  const idx = slug === 'cura' ? 0 : 1
  return iecl?.manuals[idx]?.markdown ?? ''
}

export function getEscolaStudyMarkdown(
  courseSlug: string,
  stageSlug: string,
  stageNumber: number,
  title: string,
): { markdown: string; manhigutReadUrl?: string } {
  if (courseSlug === 'avodat-hanefesh') {
    return { markdown: avodatLessonMarkdown(stageNumber) }
  }

  if (courseSlug === 'manhigut') {
    const curriculum = getCurriculumByMonth(stageNumber)
    const slug = curriculum?.slug ?? stageSlug
    return {
      markdown: `## ${title}

A leitura integral deste mês está no Beit Midrash. Abra o texto completo antes do questionário. O questionário não substitui a leitura.`,
      manhigutReadUrl: `/lideres/formacao/${slug}`,
    }
  }

  if (courseSlug === 'iecl-cura') {
    return {
      markdown: `## ${title}

Leia o Manual de Cura Interior por inteiro nesta etapa, com atenção à fase ${stageNumber}. O questionário supõe que você atravessou o texto, não só o título.

${manualMarkdown('cura')}`,
    }
  }

  if (courseSlug === 'iecl-libertacao') {
    return {
      markdown: `## ${title}

Leia o Manual de Libertação por inteiro nesta etapa. Certificação, supervisão e exclusão de causas clínicas não são detalhes: são o corpo do texto.

${manualMarkdown('libertacao')}`,
    }
  }

  return { markdown: `## ${title}\n\nEstude o material indicado pelo Rav para esta etapa antes do questionário.` }
}

export function publicJourneyLesson(imersaoSlug: string, stepIndex: number): string | null {
  if (imersaoSlug === 'avodat-hanefesh') return avodatLessonMarkdown(stepIndex) || null
  if (imersaoSlug === 'iecl') {
    const manual = manualMarkdown('cura')
    if (!manual) return null
    return `## Fase ${stepIndex}

${manual}`
  }
  return null
}
