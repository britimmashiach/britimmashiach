import { buildEscolaQuestion, questionnaire } from '@/lib/escola-questionnaire-build'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

const PASSING = 70

/** Banco rotativo: cada mês do Manhigut usa 5 perguntas distintas. */
const BANK: Array<{ prompt: string; correct: string; wrong: [string, string, string] }> = [
  {
    prompt: 'Ein Sof, no Estágio I, ensina que Ado-nai:',
    correct: 'Transcende atributos humanos e sustenta criação por Shefa contínuo.',
    wrong: [
      'É uma energia neutra manipulável por gematria popular.',
      'Equivale a múltiplos deuses separados no culto.',
      'Deixa de existir após o Tzimtzum literal total.',
    ],
  },
  {
    prompt: 'Tzimtzum no método é compreendido como:',
    correct: 'Contração amorosa que abre espaço para mundo e vontade humana.',
    wrong: [
      'Ausência total de Deus no mundo físico.',
      'Ritual de libertação obrigatório semanal.',
      'Sinônimo de pecado original impossível de reparar.',
    ],
  },
  {
    prompt: 'Etz Chaim e dez Sefirot servem ao líder para:',
    correct: 'Mapear manifestação divina sem confundir Ein Sof com mapa.',
    wrong: ['Substituir Toráh escrita', 'Diagnosticar almas sem consentimento', 'Cancelar halachá'],
  },
  {
    prompt: 'Shevirat haKelim orienta que:',
    correct: 'Nitzotzot dispersas exigem Tikun por mitzvot e kavanáh.',
    wrong: ['Mal não existe no mundo', 'Tikkun é só emocional sem prática', 'Gilgul cancela responsabilidade'],
  },
  {
    prompt: 'Os cinco Tikunim pastorais exigem que o líder:',
    correct: 'Integre fala, visão, pensamento, alimento e aliança com ética.',
    wrong: ['Substitua psiquiatria sempre', 'Ignore consentimento', 'Prometa libertação garantida'],
  },
  {
    prompt: 'Yeshua no Beit Midrash é apresentado como:',
    correct: 'Tzaddik judaico-observante no quadro Toráh, não mediador trinitário.',
    wrong: ['Segunda pessoa ontológica para libertação', 'Substituto do Talmud', 'Fórmula de exorcismo'],
  },
  {
    prompt: 'Monoteísmo do Shema na formação Manhigut:',
    correct: 'HaShem Echad diferencia unidade bíblica de deísmo ou politeísmo.',
    wrong: ['Permite sincretismo cultual', 'Elimina Mashiach', 'Nega criação contínua'],
  },
  {
    prompt: '22 Netivot no Modelo Fixo Rav EBBY:',
    correct: 'São caminhos 11 a 32 entre Sefirot, não tabela Golden Dawn.',
    wrong: ['Vêm do Sefer Yetzirah genérico', 'Substituem os 10 mandamentos', 'São entidades a invocar'],
  },
  {
    prompt: 'Líder Manhigut ao ensinar Kabaláh deve:',
    correct: 'Manter PaRDeS, halachá e linguagem acessível à kehilah.',
    wrong: ['Expor Sod sem madurez', 'Usar ocultismo', 'Garantir visões'],
  },
  {
    prompt: 'Brit Im Mashiach original no módulo final integra:',
    correct: 'Identidade messiânica judaica com Toráh e responsabilidade pastoral.',
    wrong: ['Substituição da sinagoga por culto espetacular', 'Abandono de Shabat', 'Ocultismo aprovado'],
  },
  {
    prompt: 'Tikun haDibur envolve palavra usada para:',
    correct: 'Edificar, confessar com verdade e evitar lashon hara.',
    wrong: ['Atacar inimigos publicamente', 'Substituir médicos', 'Criar novos nomes divinos'],
  },
  {
    prompt: 'Tehilim cabalístico na formação ensina:',
    correct: 'Kavanáh e textos autorizados, não fórmulas mágicas inventadas.',
    wrong: ['Amuleto universal sem Toráh', 'Devoção a entidades', 'Proibição de estudo'],
  },
  {
    prompt: 'Gilgulim no Manhigut são tratados como:',
    correct: 'Tema luriânico com cautela pastoral e sem determinismo fatalista.',
    wrong: ['Desculpa para não fazer Teshuváh', 'Diagnóstico público obrigatório', 'Substituto de terapia'],
  },
  {
    prompt: 'Shemot divinos exigem do líder:',
    correct: 'Reverência haláchica e não pronunciar Tetragrama levianamente.',
    wrong: ['Usar nomes como feitiços', 'Ensinar a todos sem contexto', 'Publicar nomes secretos'],
  },
  {
    prompt: 'Mashiach na tradição luriana, no programa, é:',
    correct: 'Tikun Olam e serviço a HaShem, não especulação sensacionalista.',
    wrong: ['Data fixa anunciada pelo líder', 'Substituto de ética', 'Licença para ocultismo'],
  },
]

export function manhigutQuestionnaire(monthNum: number, title: string): import('@/lib/escola-questionnaire').EscolaQuestionnaire {
  const start = ((monthNum - 1) * 5) % BANK.length
  const questions = []
  for (let i = 0; i < 5; i++) {
    const item = BANK[(start + i) % BANK.length]
    questions.push(
      buildEscolaQuestion(
        String(i + 1),
        `Mês ${String(monthNum).padStart(2, '0')} · ${title}: ${item.prompt}`,
        item.correct,
        item.wrong,
      ),
    )
  }
  return questionnaire(PASSING, questions)
}
