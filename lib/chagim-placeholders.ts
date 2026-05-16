import type { Chag } from '@/lib/chagim-supabase'

/** Conteúdo editorial quando o Supabase ainda não tem linhas em `chagim`. */
export const PLACEHOLDER_CHAGIM: Chag[] = [
  {
    id: 'ph-pesach',
    slug: 'pesach',
    name: 'Pesach',
    nameHebrew: 'פֶּסַח',
    category: 'shalosh_regalim',
    monthHebrew: 'Nissan',
    dayStart: 15,
    durationDays: 7,
    summary:
      'Libertação do Egito. A noite do Seder, os sete dias de Matsot e a saída da escravidão espiritual.',
    content:
      'Pesach é o eixo da memória de Israel: saída do Egito, tempo da primavera e renovação do pacto.\n\nNesta plataforma, o estudo completo reunirá visão literal (Peshat), alusões (Remez), homilética (Drash) e dimensão cabalística (Sod), com PDFs para acompanhar o Seder e os sete dias de Matsot.',
    levelPardes: ['peshat', 'sod'],
    isPremium: false,
    pdfUrl: null,
    pdfPremiumUrl: null,
    pdfKabbalahUrl: null,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'ph-shavuot',
    slug: 'shavuot',
    name: 'Shavuot',
    nameHebrew: 'שָׁבוּעוֹת',
    category: 'shalosh_regalim',
    monthHebrew: 'Sivan',
    dayStart: 6,
    durationDays: 2,
    summary: 'Entrega da Toráh no Monte Sinai. Colheita das primícias e revelação dos Dez Mandamentos.',
    content:
      'Shavuot une agricultura e revelação: primícias do trigo e Matan Toráh.\n\nOs estudos em preparação tratarão da preparação interior (49 dias), da noite de Tikun e da leitura de Rut.',
    levelPardes: ['peshat', 'remez'],
    isPremium: false,
    pdfUrl: null,
    pdfPremiumUrl: null,
    pdfKabbalahUrl: null,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'ph-sukkot',
    slug: 'sukkot',
    name: 'Sukkot',
    nameHebrew: 'סֻכּוֹת',
    category: 'shalosh_regalim',
    monthHebrew: 'Tishri',
    dayStart: 15,
    durationDays: 7,
    summary: 'Festa dos Tabernáculos. Sete dias na Sucá, alegria plena e hospitalidade espiritual.',
    content:
      'Sukkot celebra confiança na Providência: saída das paredes seguras para a fragilidade da Sucá.\n\nHoshanot, Arbaat Haminim e Simchat Toráh serão organizados em seções claras para o calendário litúrgico da plataforma.',
    levelPardes: ['peshat', 'drash'],
    isPremium: false,
    pdfUrl: null,
    pdfPremiumUrl: null,
    pdfKabbalahUrl: null,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'ph-rosh-hashanah',
    slug: 'rosh-hashanah',
    name: 'Rosh Hashanah',
    nameHebrew: 'רֹאשׁ הַשָּׁנָה',
    category: 'yamim_noraim',
    monthHebrew: 'Tishri',
    dayStart: 1,
    durationDays: 2,
    summary: 'Ano Novo judaico. Dias de julgamento, Teshuvah e renovação espiritual profunda.',
    content:
      'Rosh Hashanah inaugura os Yamim Noraim: Shofar, soberania divina e introspecção.\n\nConteúdo premium em preparação incluirá meditações cabalísticas e guia de Teshuvah segundo a tradição.',
    levelPardes: ['sod'],
    isPremium: false,
    pdfUrl: null,
    pdfPremiumUrl: null,
    pdfKabbalahUrl: null,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'ph-yom-kippur',
    slug: 'yom-kippur',
    name: 'Yom Kippur',
    nameHebrew: 'יוֹם כִּפּוּר',
    category: 'yamim_noraim',
    monthHebrew: 'Tishri',
    dayStart: 10,
    durationDays: 1,
    summary: 'O Dia do Perdão. O dia mais sagrado do calendário judaico. Jejum e oração contínua.',
    content:
      'Yom Kippur é Shabat Shabaton: cessar do trabalho físico para aprofundar o trabalho espiritual.\n\nA liturgia do dia (vidui, avodah) será estudada em camadas, com material reservado a assinantes Premium.',
    levelPardes: ['sod'],
    isPremium: false,
    pdfUrl: null,
    pdfPremiumUrl: null,
    pdfKabbalahUrl: null,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'ph-chanukah',
    slug: 'chanukah',
    name: 'Chanukah',
    nameHebrew: 'חֲנוּכָּה',
    category: 'minor',
    monthHebrew: 'Kislev',
    dayStart: 25,
    durationDays: 8,
    summary: 'Festa das Luzes. Oito dias de acendimento do Chanukiá e vitória da luz sobre a escuridão.',
    content:
      'Chanukah lembra a dedicação do Beit HaMikdash e a continuidade da chama interior.\n\nOs oito dias, a ordem do acendimento e a halacháh prática serão tratados em seções acessíveis a todos.',
    levelPardes: ['peshat', 'remez'],
    isPremium: false,
    pdfUrl: null,
    pdfPremiumUrl: null,
    pdfKabbalahUrl: null,
    publishedAt: new Date().toISOString(),
  },
  {
    id: 'ph-purim',
    slug: 'purim',
    name: 'Purim',
    nameHebrew: 'פּוּרִים',
    category: 'minor',
    monthHebrew: 'Adar',
    dayStart: 14,
    durationDays: 1,
    summary:
      'Alegria e inversão. Salvação no tempo de Mordechai e Ester. Meguiláh, mishloach manot e festejo.',
    content:
      'Purim oculta a mão divina na história. Estudos sobre Meguiláh, matanot laevyonim e o espírito de alegria contida serão acrescentados ao acervo.',
    levelPardes: ['drash', 'sod'],
    isPremium: false,
    pdfUrl: null,
    pdfPremiumUrl: null,
    pdfKabbalahUrl: null,
    publishedAt: new Date().toISOString(),
  },
]

export function getPlaceholderChagBySlug(slug: string): Chag | null {
  return PLACEHOLDER_CHAGIM.find((c) => c.slug === slug) ?? null
}

export function getAllChagSlugsForSitemap(): { slug: string }[] {
  return PLACEHOLDER_CHAGIM.map((c) => ({ slug: c.slug }))
}
