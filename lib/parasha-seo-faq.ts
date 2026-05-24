export type FaqItem = { question: string; answer: string }

export function getParashaFaqItems(parashaTitle: string, isPremium: boolean): FaqItem[] {
  const items: FaqItem[] = [
    {
      question: `O que é a Parasháh ${parashaTitle}?`,
      answer: `${parashaTitle} é uma porção semanal da Toráh lida no ciclo anual (Parashat ha-Shavua). Cada Parasháh contém sete Aliyot, uma para cada dia da semana, culminando no Shabat.`,
    },
    {
      question: 'O que são as sete Aliyot?',
      answer: 'As Aliyot dividem a Parasháh em sete leituras diárias, seguindo o ciclo Chok LeYisrael. Domingo corresponde à Aliyáh 1; Shabat à Aliyáh 7. Cada Aliyáh concentra um trecho específico do texto bíblico.',
    },
    {
      question: 'O que é o método PaRDeS?',
      answer: 'PaRDeS (Peshat, Remez, Drash, Sod) são os quatro níveis clássicos de interpretação da Toráh: sentido literal, alusão, ensino homilético e dimensão kabalística. A Brit Im Mashiach aplica esse método no estudo semanal.',
    },
  ]

  if (isPremium) {
    items.push({
      question: `Por que o estudo completo de ${parashaTitle} é Premium?`,
      answer: 'A introdução, o índice das Aliyot e a Aliyáh 1 permanecem públicas para indexação e kavanáh litúrgica. O estudo completo com PDFs das sete Aliyot, comentários dos sábios e análise PaRDeS aprofundada é reservado aos assinantes Premium.',
    })
  }

  items.push({
    question: 'Quem prepara o estudo desta Parasháh?',
    answer: 'Os estudos são conduzidos pelo Rav Eliahu Barzilay ben Yehoshua (Rav EBBY), da Congregação Brit Im Mashiach, Franca, São Paulo, com base na tradição judaica e no método PaRDeS luriânico-kabalístico.',
  })

  return items
}

export const SITE_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'O que é a Brit Im Mashiach?',
    answer: 'A Brit Im Mashiach é uma congregação judaico-messiânica não trinitária em Franca, São Paulo. A plataforma digital reúne Parashot semanais, estudos de Kabaláh, calendário hebraico, Tanach bilíngue e material do Rav EBBY.',
  },
  {
    question: 'O que significa judaísmo messiânico não trinitário?',
    answer: 'Cremos em Yeshua HaMashiach como o Mashiach prometido, mantendo o monoteísmo absoluto (Adonai Echad) e a vida judaica segundo a Toráh e a Halacháh, sem a doutrina da trindade.',
  },
  {
    question: 'O que é o plano Premium?',
    answer: 'O Premium libera o estudo completo das Parashot de Bamidbar e Devarim, PDFs das Aliyot com marca d\'água pessoal, estudos kabalísticos avançados e parte da biblioteca reservada do Rav EBBY.',
  },
  {
    question: 'Posso estudar a Toráh gratuitamente no site?',
    answer: 'Sim. Parashot de Bereshit, Shemot e Vayikra, o calendário hebraico, Tanach, Tehilim, estudos públicos e a Aliyáh 1 de cada Parasháh estão disponíveis sem assinatura.',
  },
  {
    question: 'O que é PaRDeS?',
    answer: 'PaRDeS é o acrônimo dos quatro níveis de estudo da Toráh: Peshat (literal), Remez (alusão), Drash (ensino) e Sod (kabaláh). Veja a página Método PaRDeS para entender como aplicamos esse caminho.',
  },
  {
    question: 'Como funciona o ciclo semanal das Parashot?',
    answer: 'São 54 porções lidas ao longo do ano judaico. Cada Parasháh tem sete Aliyot diárias. A plataforma organiza o estudo por dia da semana e conecta cada porção ao calendário litúrgico.',
  },
]
