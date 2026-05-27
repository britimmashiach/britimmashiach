import type { FaqItem } from '@/lib/parasha-seo-faq'

export type EnsinosSection = {
  id: string
  title: string
  paragraphs: string[]
}

export type EnsinosPillar = {
  slug: string
  title: string
  metaTitle: string
  description: string
  eyebrow: string
  subtitle: string
  sections: EnsinosSection[]
  faq: FaqItem[]
  relatedHrefs: { href: string; label: string }[]
}

export const ENSINOS_PILLARS: EnsinosPillar[] = [
  {
    slug: 'kabalah-luriana',
    title: 'O que é Kabaláh Luriana',
    metaTitle: 'Kabaláh Luriana — Etz Chaim, Sefirot e Tzimtzum',
    description:
      'Entenda a Kabaláh do Ari haKadosh: Tzimtzum, Shevirat haKelim, Tikun, Sefirot e Olamot. Estudo na tradição da Brit Im Mashiach com o Rav Eliahu Barzilay.',
    eyebrow: 'Estudo kabalístico',
    subtitle: 'O sistema místico de Rav Itzchak Luria aplicado com fidelidade à Toráh e ao método PaRDeS.',
    sections: [
      {
        id: 'origem',
        title: 'Origem e lugar na Toráh',
        paragraphs: [
          'A Kabaláh Luriana é a escola mística formulada por Rav Itzchak Luria, o Ari haKadosh, no século XVI, em Safed. Não substitui o Peshat nem a Halacháh: revela as dimensões interiores (Sod) pelas quais a criação, a alma e a redenção se ordenam segundo a vontade do Ein Sof.',
          'Na Brit Im Mashiach, estudamos Luria dentro do quadro completo da Toráh: comentários clássicos, Zohar, Etz Chaim, Shaar ha-Gilgulim e a correlação responsável com a vida messiânica da congregação.',
        ],
      },
      {
        id: 'conceitos',
        title: 'Tzimtzum, Shevirah e Tikun',
        paragraphs: [
          'O Tzimtzum descreve a contração divina que abre espaço para os mundos. A Shevirat haKelim, a quebra dos vasos, explica a dispersão das centelhas (Nitzotzot) e a presença do mal. O Tikun é a restauração que Israel realiza por mitzvot, estudo e kavanáh.',
          'Esses conceitos não são especulação distante: orientam o Mussar, a oração com intenção e a leitura sefirótica de cada Parasháh nas Aliyot semanais do Rav EBBY.',
        ],
      },
      {
        id: 'estudo',
        title: 'Como estudar na plataforma',
        paragraphs: [
          'Comece pelo Método PaRDeS e pelas Parashot públicas. O nível Sod das Aliyot, os estudos de Kabaláh na biblioteca e o Modelo Netivot estão nos portões internos para quem aprofunda o caminho com continuidade.',
        ],
      },
    ],
    faq: [
      {
        question: 'Kabaláh Luriana é ocultismo?',
        answer: 'Não na Brit Im Mashiach. É estudo rabínico-místico ancorado na Toráh, nos Sábios e no Zohar, com disciplina halachica e sem sincretismo.',
      },
      {
        question: 'Preciso ser Premium para estudar Luria?',
        answer: 'Há estudos e introduções públicas. As Aliyot completas em Sod, PDFs e obras avançadas da biblioteca exigem entrada nos portões internos.',
      },
    ],
    relatedHrefs: [
      { href: '/metodo-pardes', label: 'Método PaRDeS' },
      { href: '/ensinos/netivot', label: 'Modelo Netivot' },
      { href: '/parashot', label: 'Parashot semanais' },
      { href: '/rav', label: 'Rav Eliahu Barzilay' },
    ],
  },
  {
    slug: 'yeshua-judaismo-messianico',
    title: 'Quem é Yeshua no judaísmo messiânico',
    metaTitle: 'Yeshua HaMashiach no judaísmo messiânico não trinitário',
    description:
      'Yeshua como Mashiach ben Yosef, Adonai Echad e vida judaica praticada. Explicação doutrinária da Brit Im Mashiach em Franca, SP.',
    eyebrow: 'Identidade messiânica',
    subtitle: 'Mashiach de Israel dentro do monoteísmo absoluto, sem trindade e sem ruptura com a Toráh.',
    sections: [
      {
        id: 'quem',
        title: 'Yeshua HaMashiach ben Yosef',
        paragraphs: [
          'Na Brit Im Mashiach, Yeshua é reconhecido como o Mashiach prometido às tribos de Israel e às nações, enviado na linhagem de Yosef e Davi, não como o Criador nem como segunda pessoa divina.',
          'Mantemos o Shemá como fundamento: Adonai Echad. Respeitamos outros caminhos de fé, mas nossa halacháh e nossa confissão pública permanecem no judaísmo messiânico não trinitário.',
        ],
      },
      {
        id: 'torah',
        title: 'Toráh, Brit e comunidade',
        paragraphs: [
          'Yeshua não abole a Toráh: ilumina seu cumprimento na kehilah. Praticamos Shabat, Moedim, kashrut comunitária e o ciclo das Parashot com PaRDeS completo.',
          'A correlação com princípios da Brit Hadashá é feita por alinhamento doutrinário responsável, sempre subordinada à Toráh Kedushah, nunca como substituição da revelação no Sinai.',
        ],
      },
      {
        id: 'aprofundar',
        title: 'Onde aprofundar',
        paragraphs: [
          'A página pilar de judaísmo messiânico detalha nossa confissão. As Parashot semanais mostram como o método do Rav EBBY aplica Peshat a Sod na vida real da congregação.',
        ],
      },
    ],
    faq: [
      {
        question: 'Vocês consideram Yeshua como Deus?',
        answer: 'Não. Cremos que ele é o Mashiach, não o Ein Sof nem o Criador. O culto e a teologia permanecem dirigidos a Adonai Echad.',
      },
      {
        question: 'Isso é igreja ou sinagoga?',
        answer: 'Somos sinagoga judaico-messiânica: vida litúrgica judaica com fé no Mashiach de Israel.',
      },
    ],
    relatedHrefs: [
      { href: '/judaismo-messianico', label: 'Judaísmo messiânico (pilar)' },
      { href: '/sobre', label: 'Quem somos' },
      { href: '/rav', label: 'Rav Eliahu Barzilay' },
    ],
  },
  {
    slug: 'sefirat-haomer',
    title: 'Sefirat haÔmer',
    metaTitle: 'Sefirat haOmer — 49 dias entre Pesach e Shavuot',
    description:
      'Contagem do Omer, preparação espiritual e Tikun dos 49 dias. Calendário hebraico e estudos da Brit Im Mashiach.',
    eyebrow: 'Ciclo do calendário',
    subtitle: 'Quarenta e nove dias de refinamento entre a saída do Egito e a entrega da Toráh.',
    sections: [
      {
        id: 'o-que',
        title: 'O que é Sefirat haOmer',
        paragraphs: [
          'Sefirat haOmer é o mandamento de contar cinquenta dias a partir do segundo dia de Pesach até Shavuot. Cada noite pronunciamos o dia corrente, ligando a liberação física à maturidade espiritual que recebe a Toráh.',
          'Na tradição kabalística, os quarenta e nove dias correspondem às combinações de Sefirot (Chesed, Gevura, Tiferet e assim por diante), formando um mapa de Tikun interior.',
        ],
      },
      {
        id: 'pratica',
        title: 'Prática na Brit Im Mashiach',
        paragraphs: [
          'O calendário da plataforma exibe o dia do Omer com o texto litúrgico. A biblioteca reserva meditações dos 49 Portões da Alma para quem entra nos portões internos do caminho.',
          'Durante o Omer, evitamos festividades com música conforme o minhague comunitário e intensificamos o estudo e a kavanáh.',
        ],
      },
    ],
    faq: [
      {
        question: 'Preciso contar em hebraico?',
        answer: 'O ideal é a fórmula tradicional em hebraico com compreensão do significado. O calendário da plataforma auxilia com o dia e a transliteração.',
      },
      {
        question: 'O que são os 49 Portões da Alma?',
        answer: 'É o material kabalístico do Rav EBBY para cada dia do Omer, disponível na biblioteca Premium.',
      },
    ],
    relatedHrefs: [
      { href: '/calendar', label: 'Calendário hebraico' },
      { href: '/chagim/pesach', label: 'Pesach' },
      { href: '/chagim/shavuot', label: 'Shavuot' },
      { href: '/ensinos/kabalah-luriana', label: 'Kabaláh Luriana' },
    ],
  },
  {
    slug: 'netivot',
    title: 'Modelo Netivot',
    metaTitle: 'Netivot — os 32 caminhos do Etz Chaim',
    description:
      'O Modelo Netivot proprietário do Rav Eliahu Barzilay: 32 caminhos sefiróticos aplicados à Toráh semanal e ao Tikun da alma na Brit Im Mashiach.',
    eyebrow: 'Diferencial doutrinário',
    subtitle: 'As letras do Alef-Beit como Netivot que conectam as Sefirot no estudo do Rav EBBY.',
    sections: [
      {
        id: 'definicao',
        title: 'O que são Netivot',
        paragraphs: [
          'Na Kabaláh, Netivot (caminhos) são as trinta e duas sendas do Etz Chaim que ligam as dez Sefirot por meio das letras hebraicas. Cada Parasháh e cada Aliyáh ativam conexões específicas: Keter a Chochmah, Chesed a Tiferet, Yessod a Malchut, entre outras.',
          'O Modelo Netivot do Rav EBBY é um sistema proprietário de análise, desenvolvido na Brit Im Mashiach, que nomeia e aplica esses caminhos de forma didática e repetível em cada Aliyáh semanal.',
        ],
      },
      {
        id: 'metodo',
        title: 'Relação com PaRDeS e Sod',
        paragraphs: [
          'Netivot pertencem ao nível Sod, mas nunca flutuam sem Peshat e Halacháh. Nas Aliyot, após os comentários clássicos, a seção Sefirot Relacionadas indica quais Netivot estão ativos e como o texto da porção os ilumina.',
          'Estudos dedicados na biblioteca e no Premium aprofundam caminhos individuais (por exemplo, Dalet entre Keter e Tiferet).',
        ],
      },
    ],
    faq: [
      {
        question: 'Netivot é igual a caminhos do Tarô?',
        answer: 'Não. É tradição judaica do Etz Chaim (Árvore da Vida) baseada na Toráh e nos mekubalím, sem adivinhação nem sincretismo.',
      },
      {
        question: 'Onde estudar o Modelo Netivot completo?',
        answer: 'Nas Aliyot Premium, nos estudos da categoria netivot e na biblioteca (Modelo Fixo de Netivot) para assinantes.',
      },
    ],
    relatedHrefs: [
      { href: '/ensinos/kabalah-luriana', label: 'Kabaláh Luriana' },
      { href: '/metodo-pardes', label: 'Método PaRDeS' },
      { href: '/studies', label: 'Estudos' },
      { href: '/rav', label: 'Rav Eliahu Barzilay' },
    ],
  },
  {
    slug: 'parasha-da-semana',
    title: 'Parashá da semana',
    metaTitle: 'Parashá da semana — ciclo anual da Toráh',
    description:
      'Como estudar a Parashá semanal com sete Aliyot, PaRDeS e o método do Rav EBBY. Primeira Aliyáh aberta, portões internos para o estudo completo.',
    eyebrow: 'Ciclo semanal',
    subtitle: 'Do Domingo ao Shabat: sete Aliyot que percorrem a porção da Toráh lida na sinagoga.',
    sections: [
      {
        id: 'ciclo',
        title: 'O ciclo das Parashot',
        paragraphs: [
          'A Toráh é dividida em cinquenta e quatro porções (Parashot) lidas ao longo do ano judaico. Cada semana a congregação estuda a Parashá corrente, muitas vezes dividida em sete Aliyot correspondentes aos dias da semana.',
          'Na plataforma Brit Im Mashiach, cada Aliyáh recebe análise PaRDeS completa: Peshat, Remez, Drash, Sod, comentários dos sábios, Rav EBBY, Mussar, Sefirot e Netivot.',
        ],
      },
      {
        id: 'acesso',
        title: 'Primeira Aliyáh aberta e portões internos',
        paragraphs: [
          'A introdução e a primeira Aliyáh de cada Parashá são públicas para que qualquer visitante entre no ciclo. As Aliyot 2 a 7, com PDFs e Sod completo, pertencem aos portões internos.',
          'Comece pela lista de Parashot, identifique a porção da semana no calendário ou na home e siga o estudo dia a dia.',
        ],
      },
    ],
    faq: [
      {
        question: 'Quantas Aliyot tem cada Parashá?',
        answer: 'Em geral sete, uma por dia da semana (Domingo a Shabat). Parashot mechubarot podem seguir regras especiais do ciclo.',
      },
      {
        question: 'Os PDFs podem ser baixados?',
        answer: 'Assinantes Premium acessam PDFs protegidos das Aliyot completas pela biblioteca e pela página de cada Parashá.',
      },
    ],
    relatedHrefs: [
      { href: '/parashot', label: 'Todas as Parashot' },
      { href: '/calendar', label: 'Calendário' },
      { href: '/metodo-pardes', label: 'Método PaRDeS' },
      { href: '/premium', label: 'Portões internos' },
    ],
  },
]

const pillarBySlug = new Map(ENSINOS_PILLARS.map((p) => [p.slug, p]))

export function getEnsinosPillar(slug: string): EnsinosPillar | undefined {
  return pillarBySlug.get(slug)
}

export function getAllEnsinosSlugs(): string[] {
  return ENSINOS_PILLARS.map((p) => p.slug)
}
