export type ManhigutStage = 1 | 2 | 3 | 4

export interface ManhigutCurriculumEntry {
  monthNum: number
  slug: string
  stage: ManhigutStage
  stageLabel: string
  title: string
  subtitle: string
  isCapstone: boolean
}

export const MANHIGUT_PROGRAM = {
  name: 'Beit Midrash do Manhig',
  certification: 'Talmid Manhig',
  totalMonths: 24,
  pastoralNote:
    'Este Beit Midrash acolhe irmãos e irmãs que amam Yeshua e desejam aprofundar a Toráh com reverência. Não pedimos que neguem sua história de fé evangélica; convidamos a conhecer a Brit Im Mashiach dentro da tradição de Israel, com Adonai Echad no centro e diálogo pastoral, nunca confronto.',
} as const

export const STAGE_LABELS: Record<ManhigutStage, string> = {
  1: 'Fundamentos kabalísticos',
  2: 'Arquitetura sefirótica',
  3: 'Operações do Tikun',
  4: 'Aplicações sistêmicas',
}

/** Grade canônica dos 24 meses. Conteúdo completo entra via sync dos .md do Rav EBBY. */
export const MANHIGUT_CURRICULUM: ManhigutCurriculumEntry[] = [
  {
    monthNum: 1,
    slug: 'mes-01-ein-sof-e-tzimtzum',
    stage: 1,
    stageLabel: STAGE_LABELS[1],
    title: 'Ein Sof e Tzimtzum',
    subtitle: 'Transcendência e abertura do espaço criado',
    isCapstone: false,
  },
  {
    monthNum: 2,
    slug: 'mes-02-etz-chaim-e-dez-sefirot',
    stage: 1,
    stageLabel: STAGE_LABELS[1],
    title: 'Etz Chaim e Dez Sefirot',
    subtitle: 'Mapa da auto-manifestação divina',
    isCapstone: false,
  },
  {
    monthNum: 3,
    slug: 'mes-03-quatro-olamot',
    stage: 1,
    stageLabel: STAGE_LABELS[1],
    title: 'Quatro Olamot',
    subtitle: 'Atzilut, Briah, Yetzirah e Asiyah',
    isCapstone: false,
  },
  {
    monthNum: 4,
    slug: 'mes-04-monoteismo-e-shema',
    stage: 1,
    stageLabel: STAGE_LABELS[1],
    title: 'Monoteísmo absoluto e Shema',
    subtitle: 'Adonai Echad como fundamento da Kabaláh autêntica',
    isCapstone: false,
  },
  {
    monthNum: 5,
    slug: 'mes-05-introducao-kabalah-luriana',
    stage: 1,
    stageLabel: STAGE_LABELS[1],
    title: 'Introdução à Kabaláh Luriana autêntica',
    subtitle: 'O sistema do Ari haKadosh para o líder em formação',
    isCapstone: false,
  },
  {
    monthNum: 6,
    slug: 'mes-06-yeshua-contexto-historico',
    stage: 1,
    stageLabel: STAGE_LABELS[1],
    title: 'Yeshua haMashiach no Contexto Histórico-Halachico',
    subtitle: 'Encerramento do Estágio I',
    isCapstone: true,
  },
  {
    monthNum: 7,
    slug: 'mes-07-22-netivot',
    stage: 2,
    stageLabel: STAGE_LABELS[2],
    title: 'Os 22 Netivot',
    subtitle: 'Caminhos entre as Sefirot no Etz Chaim',
    isCapstone: false,
  },
  {
    monthNum: 8,
    slug: 'mes-08-partzufim',
    stage: 2,
    stageLabel: STAGE_LABELS[2],
    title: 'Partzufim',
    subtitle: 'Configurações maduras da vida sefirótica',
    isCapstone: false,
  },
  {
    monthNum: 9,
    slug: 'mes-09-mochin-zeir-anpin',
    stage: 2,
    stageLabel: STAGE_LABELS[2],
    title: 'Mochin de Z\'eir Anpin',
    subtitle: 'Centros cognitivos da face menor',
    isCapstone: false,
  },
  {
    monthNum: 10,
    slug: 'mes-10-shevirat-ha-kelim',
    stage: 2,
    stageLabel: STAGE_LABELS[2],
    title: 'Shevirat ha-Kelim',
    subtitle: 'Cosmogonia luriânica e quebra dos vasos',
    isCapstone: false,
  },
  {
    monthNum: 11,
    slug: 'mes-11-tikun-restauracao',
    stage: 2,
    stageLabel: STAGE_LABELS[2],
    title: 'Tikun como restauração progressiva',
    subtitle: 'Do Birur ao reparo cósmico',
    isCapstone: false,
  },
  {
    monthNum: 12,
    slug: 'mes-12-mashiach-tradicao-luriana',
    stage: 2,
    stageLabel: STAGE_LABELS[2],
    title: 'Mashiach na Tradição Luriana',
    subtitle: 'Encerramento do Estágio II',
    isCapstone: true,
  },
  {
    monthNum: 13,
    slug: 'mes-13-tikun-ha-dibur',
    stage: 3,
    stageLabel: STAGE_LABELS[3],
    title: 'Tikun ha-Dibur',
    subtitle: 'Reparação da palavra falada',
    isCapstone: false,
  },
  {
    monthNum: 14,
    slug: 'mes-14-tikun-ha-reiyah',
    stage: 3,
    stageLabel: STAGE_LABELS[3],
    title: 'Tikun ha-Re\'iyah',
    subtitle: 'Reparação do olhar',
    isCapstone: false,
  },
  {
    monthNum: 15,
    slug: 'mes-15-tikun-ha-machshavah',
    stage: 3,
    stageLabel: STAGE_LABELS[3],
    title: 'Tikun ha-Machshavah',
    subtitle: 'Reparação do pensamento',
    isCapstone: false,
  },
  {
    monthNum: 16,
    slug: 'mes-16-tikun-ha-brit',
    stage: 3,
    stageLabel: STAGE_LABELS[3],
    title: 'Tikun ha-Brit',
    subtitle: 'Integridade do pacto e pureza',
    isCapstone: false,
  },
  {
    monthNum: 17,
    slug: 'mes-17-tikun-achilah-tefilah',
    stage: 3,
    stageLabel: STAGE_LABELS[3],
    title: 'Tikun ha-Achilah e Tikun ha-Tefilah',
    subtitle: 'Kavanot no comer e na oração',
    isCapstone: false,
  },
  {
    monthNum: 18,
    slug: 'mes-18-yeshua-cinco-tikunim',
    stage: 3,
    stageLabel: STAGE_LABELS[3],
    title: 'Yeshua como Modelo Vivo dos Cinco Tikunim',
    subtitle: 'Encerramento do Estágio III',
    isCapstone: true,
  },
  {
    monthNum: 19,
    slug: 'mes-19-cinco-niveis-neshamah',
    stage: 4,
    stageLabel: STAGE_LABELS[4],
    title: 'Cinco níveis da Neshamah',
    subtitle: 'Nefesh, Ruach, Neshamah, Chayah e Yechidah',
    isCapstone: false,
  },
  {
    monthNum: 20,
    slug: 'mes-20-gilgulim',
    stage: 4,
    stageLabel: STAGE_LABELS[4],
    title: 'Gilgulim',
    subtitle: 'Sha\'ar ha-Gilgulim e raízes de almas',
    isCapstone: false,
  },
  {
    monthNum: 21,
    slug: 'mes-21-sefirat-ha-omer',
    stage: 4,
    stageLabel: STAGE_LABELS[4],
    title: 'Sefirat ha-Omer cabalístico',
    subtitle: 'Contagem e mapeamento sefirótico',
    isCapstone: false,
  },
  {
    monthNum: 22,
    slug: 'mes-22-tehilim-cabalistico',
    stage: 4,
    stageLabel: STAGE_LABELS[4],
    title: 'Tehilim cabalístico',
    subtitle: 'Salmos como ferramenta de Tikun',
    isCapstone: false,
  },
  {
    monthNum: 23,
    slug: 'mes-23-shemot-divinos',
    stage: 4,
    stageLabel: STAGE_LABELS[4],
    title: 'Shemot divinos',
    subtitle: 'Nomes sagrados e kavanah no serviço',
    isCapstone: false,
  },
  {
    monthNum: 24,
    slug: 'mes-24-brit-im-mashiach-original',
    stage: 4,
    stageLabel: STAGE_LABELS[4],
    title: 'A Brit Im Mashiach Original e a Identidade do Líder',
    subtitle: 'Encerramento do programa e certificação Talmid Manhig',
    isCapstone: true,
  },
]

export function getCurriculumBySlug(slug: string): ManhigutCurriculumEntry | undefined {
  return MANHIGUT_CURRICULUM.find((m) => m.slug === slug)
}

export function getCurriculumByMonth(monthNum: number): ManhigutCurriculumEntry | undefined {
  return MANHIGUT_CURRICULUM.find((m) => m.monthNum === monthNum)
}
