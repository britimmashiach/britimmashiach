import type { FaqItem } from '@/lib/parasha-seo-faq'

export function getChagFaqItems(chagName: string, isPremium: boolean): FaqItem[] {
  const items: FaqItem[] = [
    {
      question: `O que é ${chagName}?`,
      answer: `${chagName} é um Moed, uma festa ou tempo sagrado do calendário bíblico judaico. Na Brit Im Mashiach estudamos cada Chag com base na Toráh, nos comentários clássicos e no método PaRDeS.`,
    },
    {
      question: 'Como a Brit Im Mashiach observa os Chagim?',
      answer: 'Guardamos Shabat e Moedim conforme a Toráh e a tradição de Israel, com kavanáh litúrgica, estudo em comunidade e aplicação prática dos mandamentos de cada festa.',
    },
    {
      question: 'O que é o método PaRDeS aplicado aos Chagim?',
      answer: 'PaRDeS (Peshat, Remez, Drash, Sod) permite ler cada festa no sentido literal, alusivo, homilético e kabalístico. O estudo público apresenta a introdução; seções aprofundadas podem ser reservadas ao Premium.',
    },
  ]

  if (isPremium) {
    items.push({
      question: `Por que parte do estudo de ${chagName} é Premium?`,
      answer: 'A introdução, o resumo e as seções públicas permanecem indexáveis para quem busca entender o Moed. Kavannot, Sod, Tikun Leil e materiais kabalísticos avançados são exclusivos para assinantes Premium.',
    })
  }

  items.push({
    question: 'Quem conduz os estudos de Chagim na plataforma?',
    answer: 'Os estudos são preparados pelo Rav Eliahu Barzilay ben Yehoshua (Rav EBBY), da Congregação Brit Im Mashiach, Franca, São Paulo, dentro da tradição judaica messiânica não trinitária.',
  })

  return items
}
