/**
 * Catálogo canônico dos cursos da Escola (ordem e etapas).
 * Fontes: manhigut-curriculum, imersoes-content.
 */
import { MANHIGUT_CURRICULUM } from '@/lib/manhigut-curriculum'
import { IMERSOES } from '@/lib/imersoes-content'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'
import { defaultQuestionnaireForStage } from '@/lib/escola-questionnaire'

export type EscolaCatalogStage = {
  stageNumber: number
  slug: string
  title: string
  subtitle: string
  questionnaire: EscolaQuestionnaire
}

export type EscolaCatalogCourse = {
  slug: string
  title: string
  certificationTitle: string
  subtitle: string
  audience: 'leader' | 'member' | 'both'
  prerequisiteSlug: string | null
  sortOrder: number
  requiresLeader: boolean
  profileFlagOnComplete: string | null
  stages: EscolaCatalogStage[]
}

function avodatStages(): EscolaCatalogStage[] {
  const imersao = IMERSOES.find((i) => i.slug === 'avodat-hanefesh')!
  return imersao.steps.map((step, i) => {
    const n = i + 1
    return {
      stageNumber: n,
      slug: `modulo-${String(n).padStart(2, '0')}`,
      title: step.title,
      subtitle: step.text.slice(0, 180),
      questionnaire: defaultQuestionnaireForStage(step.title, step.text),
    }
  })
}

function ieclCuraStages(): EscolaCatalogStage[] {
  const imersao = IMERSOES.find((i) => i.slug === 'iecl')!
  return imersao.steps.map((step, i) => {
    const n = i + 1
    return {
      stageNumber: n,
      slug: `fase-${String(n).padStart(2, '0')}`,
      title: step.title,
      subtitle: step.text.slice(0, 180),
      questionnaire: defaultQuestionnaireForStage(step.title, step.text),
    }
  })
}

function ieclLibertacaoStages(): EscolaCatalogStage[] {
  const titles = [
    {
      title: 'Fundamentos da Libertação no Método Rav EBBY',
      subtitle: 'Limites, Toráh Kedushah, supervisão e exclusão de fenômenos médicos.',
    },
    {
      title: 'Triagem e discernimento multidimensional',
      subtitle: 'Causas naturais, emocionais e espirituais antes de qualquer hipótese.',
    },
    {
      title: 'Protocolo operacional de Libertação',
      subtitle: 'Manual 4.3: etapas, registro interno e Teshuváh verificável.',
    },
    {
      title: 'Supervisão e encerramento responsável',
      subtitle: 'Encaminhamento, bênção quando apropriado e continuidade na kehilah.',
    },
  ]
  return titles.map((t, i) => {
    const n = i + 1
    return {
      stageNumber: n,
      slug: `libertacao-${String(n).padStart(2, '0')}`,
      title: t.title,
      subtitle: t.subtitle,
      questionnaire: defaultQuestionnaireForStage(t.title, t.subtitle),
    }
  })
}

function manhigutStages(): EscolaCatalogStage[] {
  return MANHIGUT_CURRICULUM.map((m) => ({
    stageNumber: m.monthNum,
    slug: m.slug,
    title: m.title,
    subtitle: m.subtitle,
    questionnaire: defaultQuestionnaireForStage(m.title, m.subtitle),
  }))
}

export const ESCOLA_COURSE_CATALOG: EscolaCatalogCourse[] = [
  {
    slug: 'avodat-hanefesh',
    title: 'Avodat HaNefesh',
    certificationTitle: 'Trabalho da Alma',
    subtitle: 'Apostila do participante, 7 módulos, Teshuváh, Middot e ferramentas.',
    audience: 'both',
    prerequisiteSlug: null,
    sortOrder: 10,
    requiresLeader: false,
    profileFlagOnComplete: null,
    stages: avodatStages(),
  },
  {
    slug: 'manhigut',
    title: 'Formação Manhigut',
    certificationTitle: 'Talmid Manhig',
    subtitle: 'Beit Midrash do Manhig, 24 meses sequenciais.',
    audience: 'leader',
    prerequisiteSlug: 'avodat-hanefesh',
    sortOrder: 20,
    requiresLeader: true,
    profileFlagOnComplete: 'formacao_concluida',
    stages: manhigutStages(),
  },
  {
    slug: 'iecl-cura',
    title: 'IECL, Cura Interior',
    certificationTitle: 'Facilitador IECL, Cura',
    subtitle: 'Manual 4.2, cinco fases operacionais.',
    audience: 'leader',
    prerequisiteSlug: 'manhigut',
    sortOrder: 30,
    requiresLeader: true,
    profileFlagOnComplete: null,
    stages: ieclCuraStages(),
  },
  {
    slug: 'iecl-libertacao',
    title: 'IECL, Libertação',
    certificationTitle: 'Certificação em Libertação',
    subtitle: 'Manual 4.3, certificação específica com supervisão.',
    audience: 'leader',
    prerequisiteSlug: 'iecl-cura',
    sortOrder: 40,
    requiresLeader: true,
    profileFlagOnComplete: null,
    stages: ieclLibertacaoStages(),
  },
]

export function getCatalogCourse(slug: string): EscolaCatalogCourse | undefined {
  return ESCOLA_COURSE_CATALOG.find((c) => c.slug === slug)
}
