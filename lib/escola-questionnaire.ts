export type EscolaQuestionOption = {
  id: string
  label: string
}

export type EscolaQuestion = {
  id: string
  prompt: string
  options: EscolaQuestionOption[]
  correctOptionId: string
}

export type EscolaQuestionnaire = {
  passingScorePct: number
  questions: EscolaQuestion[]
}

const PASSING = 70

function q(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
): EscolaQuestion {
  const options: EscolaQuestionOption[] = [
    { id: 'a', label: correct },
    { id: 'b', label: distractors[0] ?? 'Alternativa B' },
    { id: 'c', label: distractors[1] ?? 'Alternativa C' },
    { id: 'd', label: distractors[2] ?? 'Alternativa D' },
  ]
  return { id, prompt, options, correctOptionId: 'a' }
}

/** Questionário padrão por etapa (4 itens). Respostas corretas priorizam o Método Rav EBBY. */
export function defaultQuestionnaireForStage(title: string, context: string): EscolaQuestionnaire {
  const theme = title.trim()
  return {
    passingScorePct: PASSING,
    questions: [
      q(
        '1',
        `No tema ${theme}, qual afirmação está alinhada ao Método Rav EBBY?`,
        'A prática busca refinamento de Middot e mudança concreta de conduta.',
        [
          'O foco principal é experiência mística espetacular como meta.',
          'Cura Interior substitui psicologia e psiquiatria sem exceção.',
          'Libertação pode ser aplicada sem supervisão quando o participante pedir.',
        ],
      ),
      q(
        '2',
        `Sobre ${theme}, o que o participante deve compreender?`,
        'Teshuváh, responsabilidade e retorno prático a Ado-nai, dentro da Toráh Kedushah.',
        [
          'Diagnóstico sefirótico operacional deve ser ensinado a todos os participantes.',
          'Promessas de cura física são parte do compromisso da congregação.',
          'Revelação pública de trauma é requisito para avançar.',
        ],
      ),
      q(
        '3',
        `Em ${theme}, qual é evidência saudável de progresso?`,
        context.slice(0, 120) || 'Refinamento ético observável e prática constante.',
        [
          'Relatos de visões como única medida de sucesso.',
          'Confronto público de pecados de terceiros.',
          'Conclusão imediata sem acompanhamento ou revisão.',
        ],
      ),
      q(
        '4',
        `Aplicação pastoral de ${theme} na Brit Im Mashiach:`,
        'Respeitar Halacháh, consentimento e encaminhamento profissional quando necessário.',
        [
          'Usar gematria operacional para rotular a alma do participante sem consentimento.',
          'Ignorar quadro clínico predominante.',
          'Unir libertação e cura num único ato sem certificação.',
        ],
      ),
    ],
  }
}

export function scoreQuestionnaire(
  questionnaire: EscolaQuestionnaire,
  answers: Record<string, string>,
): number {
  const total = questionnaire.questions.length
  if (total === 0) return 0
  let correct = 0
  for (const question of questionnaire.questions) {
    if (answers[question.id] === question.correctOptionId) correct++
  }
  return Math.round((correct / total) * 100)
}
