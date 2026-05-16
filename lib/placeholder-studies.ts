/** Mesmo contrato de `Study` em `lib/studies-supabase.ts` (evita import circular). */
export interface SeedStudy {
  slug: string
  title: string
  titleHebrew: string
  excerpt: string
  content: string
  category: string
  readingTime: number
  isPremium: boolean
  tags: string[]
  publishedAt: string
}

/** Estudos de demonstração quando o banco ainda não tem linhas em `studies`. */
export const PLACEHOLDER_STUDIES: SeedStudy[] = [
  {
    slug: 'kabbalah-lurianic-sefirot',
    title: 'Kabaláh Luriana: Os 10 Sefirot',
    titleHebrew: 'עשר ספירות',
    excerpt:
      'Análise das dez Sefirot segundo o sistema do Arizal. Do Keter até Malkhut, cada sefirá como um nível de consciência divina.',
    content:
      'Este estudo apresenta o mapa das dez Sefirot no modelo luriano.\n\n## Peshat\n\nAs Sefirot são dez emanações pelas quais a Infinitude se revela ao mundo finito.\n\n## Remez\n\nCada sefirá guarda alusões numéricas e linguísticas nas Escrituras.\n\n## Drash\n\nOs mestres homileticos conectam as Sefirot à conduta ética de Israel.\n\n## Sod\n\nNo Zohar e na tradição luriana, as Sefirot descrevem dinâmicas internas da vida divina (partzufim, yichudim).\n\n---\n\nConteúdo completo em expansão pelo Rav Eliahu Barzilay ben Yehoshua.',
    category: 'kabalah',
    readingTime: 18,
    isPremium: false,
    tags: ['sefirot', 'arizal', 'etz chaim'],
    publishedAt: '2026-01-01T12:00:00.000Z',
  },
  {
    slug: 'bereshit-pardes',
    title: 'Bereshit: Análise PaRDeS Completa',
    titleHebrew: 'בְּרֵאשִׁית',
    excerpt:
      'A Parashá da Criação nos quatro níveis hermenêuticos: Peshat literal, Remez alegórico, Drash homilético e Sod cabalístico do Zohar.',
    content:
      'A abertura da Toráh convida a quatro camadas de leitura simultâneas.\n\n## Peshat\n\nBereshit bara Elokim et hashamayim veet haaretz — ordem narrativa da criação em sete ditos.\n\n## Remez\n\nLetras iniciais e guematria apontam para nomes divinos e para o Templo futuro.\n\n## Drash\n\nMidrashim exploram por que a humanidade foi criada única e por que a Toráh precede o mundo.\n\n## Sod\n\nTradição cabalística descreve tzimtzum e hitlavshut da luz infinita nos kelim.\n\n---\n\nSérie em continuidade com a leitura semanal da congregação.',
    category: 'parasha',
    readingTime: 25,
    isPremium: false,
    tags: ['criação', 'bereshit', 'pardes'],
    publishedAt: '2026-01-02T12:00:00.000Z',
  },
  {
    slug: 'netivot-alef-keter',
    title: 'Netivot: O Caminho Alef-Keter',
    titleHebrew: 'נְתִיבוֹת',
    excerpt:
      'O modelo de 32 caminhos: estudo do primeiro caminho, da letra Alef ao Keter supremo.',
    content:
      'Este estudo pertence ao acervo premium (Modelo Netivot).\n\n## Visão geral\n\nO caminho Alef–Keter articula a relação entre silêncio primordial e vontade divina.\n\n---\n\nAssine o plano Premium para acessar a continuação completa e os PDFs associados.',
    category: 'netivot',
    readingTime: 20,
    isPremium: true,
    tags: ['netivot', 'alef', 'keter'],
    publishedAt: '2026-01-04T12:00:00.000Z',
  },
  {
    slug: 'pesach-libertacao-espiritual',
    title: 'Pesach: A Libertação Espiritual',
    titleHebrew: 'פֶּסַח',
    excerpt:
      'Além da narrativa histórica: Egito como metáfora da consciência limitada e o Seder como ritual iniciático.',
    content:
      'Pesach une memória histórica e transformação interior.\n\n## Peshat\n\nNarrativa do Êxodo e mitzvot da festa.\n\n## Sod\n\nEgito (Mitzrayim) como “estreituras”; saída como expansão da consciência.\n\n---\n\nEm harmonia com o calendário de Chagim da plataforma.',
    category: 'moedim',
    readingTime: 22,
    isPremium: false,
    tags: ['pesach', 'libertação', 'seder'],
    publishedAt: '2026-01-05T12:00:00.000Z',
  },
  {
    slug: 'introducao-kabbalah-luriana',
    title: 'Shiur: Introdução à Kabaláh Luriana',
    titleHebrew: 'קַבָּלָה לוּרְיָאנִית',
    excerpt:
      'Aula inaugural do ciclo: Tzimtzum, Shevirat haKelim e Tikkun Olam.',
    content:
      'Shiur introdutório ao pensamento do Arizal.\n\n## Tzimtzum\n\nAuto-contração da Luz Infinita para “espaço” da vontade humana.\n\n## Shevirah e Tikkun\n\nQueda dos vasos e reconstrução através das mitzvot de Israel.\n\n---\n\nGravação e notas expandidas disponíveis para assinantes Premium.',
    category: 'shiur',
    readingTime: 30,
    isPremium: true,
    tags: ['arizal', 'tzimtzum', 'tikkun'],
    publishedAt: '2026-01-06T12:00:00.000Z',
  },
  {
    slug: 'alef-beit-alef',
    title: 'Alef-Beit: A Letra Alef',
    titleHebrew: 'אָלֶף',
    excerpt:
      'A primeira letra hebraica como silêncio primordial: forma, guematria e correspondência com Keter.',
    content:
      'A letra Alef abre o alfabeto sagrado e a palavra em si.\n\n## Forma\n\nDuas yods e um vav — equilíbrio entre céu e terra.\n\n## Guematria\n\nAlef = 1, unidade e origem numérica.\n\n---\n\nContinuação com Bet, Guimel e as demais letras em preparação.',
    category: 'alef-beit',
    readingTime: 15,
    isPremium: false,
    tags: ['alef', 'guematria', 'meditação'],
    publishedAt: '2026-01-07T12:00:00.000Z',
  },
]

const bySlug = new Map<string, SeedStudy>(PLACEHOLDER_STUDIES.map((s) => [s.slug, s]))

export function getPlaceholderStudyBySlug(slug: string): SeedStudy | null {
  return bySlug.get(slug) ?? null
}

export function mergeStudySlugsFromDb(dbSlugs: { slug: string }[]): { slug: string }[] {
  const seen = new Set(dbSlugs.map((s) => s.slug))
  const merged = [...dbSlugs]
  for (const p of PLACEHOLDER_STUDIES) {
    if (!seen.has(p.slug)) {
      seen.add(p.slug)
      merged.push({ slug: p.slug })
    }
  }
  return merged
}
