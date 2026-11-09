import { buildEscolaQuestion, questionnaire } from '@/lib/escola-questionnaire-build'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

const PASSING = 70

const PHASES: EscolaQuestionnaire[] = [
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Fase 1, Acolhimento e triagem: prioridade imediata?',
      'Segurança, consentimento informado e escuta sem julgamento.',
      ['Prometer cura física', 'Exigir revelação pública de trauma', 'Iniciar libertação sem triagem'],
    ),
    buildEscolaQuestion(
      '2',
      'Quadro clínico predominante na triagem implica:',
      'Encaminhar ao cuidado médico ou psicológico adequado.',
      ['Ministrar libertação na mesma sessão', 'Ignorar sintomas físicos', 'Proibir tratamento profissional'],
    ),
    buildEscolaQuestion(
      '3',
      'Cura Interior no método NÃO é:',
      'Substituto de psicologia, psiquiatria ou medicina.',
      ['Processo de Teshuváh e Tikkun', 'Acompanhamento com ferramentas autorizadas', 'Refinamento de Middot'],
    ),
    buildEscolaQuestion(
      '4',
      'Evidência principal de progresso na Cura Interior:',
      'Mudança concreta de conduta e Middot, não só visões.',
      ['Espectáculo de libertação', 'Rotular netivot sem consentimento', 'Conclusão em um único encontro'],
    ),
    buildEscolaQuestion(
      '5',
      'Consentimento informado (1.4) significa:',
      'Limites claros, direito de recusar e confidencialidade.',
      ['Assinar renúncia a médicos', 'Confessar pecados na internet', 'Transferir responsabilidade ao grupo'],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Fase 2, diagnóstico espiritual operacional: uso interno do facilitador inclui:',
      'Hipótese de Olam, Netiv e Middot, sem expor rotulação técnica sem formação.',
      ['Publicar nome de entidade no grupo', 'Diagnosticar sem registro', 'Substituir avaliação clínica'],
    ),
    buildEscolaQuestion(
      '2',
      'Linguagem acessível ao participante fala de:',
      'Ferida, padrão e caminho de cura.',
      ['Nomes de demônios inventados', 'Gematria do nome sem consentimento', 'Predestinação sem Teshuváh'],
    ),
    buildEscolaQuestion(
      '3',
      'Registro da hipótese no prontuário serve para:',
      'Supervisão, revisão e ética pastoral.',
      ['Viralizar testemunhos', 'Substituir oração', 'Evitar encaminhamentos'],
    ),
    buildEscolaQuestion(
      '4',
      'Revisão se não houver mudança em 60 dias:',
      'Reavaliar hipótese de Netiv com supervisor.',
      ['Repetir libertação em série', 'Abandonar o participante', 'Publicar fracasso na rede'],
    ),
    buildEscolaQuestion(
      '5',
      'Diagnóstico espiritual jamais:',
      'Substitui avaliação médica ou psiquiátrica quando indicada.',
      ['Apoia o Plano de Tikkun', 'Respeita confidencialidade', 'Usa ferramentas 4.1'],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Plano de Tikkun escrito deve ser:',
      'Realista, revisável, com ferramentas e Middot prioritárias.',
      ['Imutável por um ano', 'Só emoção sem ação', 'Promessa de cura garantida'],
    ),
    buildEscolaQuestion(
      '2',
      'Conteúdo mínimo do plano inclui:',
      'Objetivo claro, ações em Assiáh e data de revisão.',
      ['Ficha dos 22 Netivot do vizinho', 'Sigilo zero', 'Exigência de livestream'],
    ),
    buildEscolaQuestion(
      '3',
      'Assinatura participante e facilitador garante:',
      'Compromisso mútuo verificável.',
      ['Que libertação será pública', 'Anulação da halachá', 'Fim da supervisão'],
    ),
    buildEscolaQuestion(
      '4',
      'Indicação de supervisão no plano ocorre quando:',
      'Complexidade ou risco exigem acompanhamento especializado.',
      ['Nunca', 'Só para iniciantes', 'Para evitar médicos'],
    ),
    buildEscolaQuestion(
      '5',
      'Plano de Tikkun revisa-se tipicamente em:',
      '30, 60 ou 90 dias.',
      ['Apenas após dez anos', 'Nunca', 'Só se houver crítica nas redes'],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Fase 4, acompanhamento: celebração de progresso deve:',
      'Honrar o Tikkun sem inflar ego.',
      ['Humilhar publicamente', 'Virar competição', 'Substituir halachá'],
    ),
    buildEscolaQuestion(
      '2',
      'Cheshbon HaNefesh no acompanhamento é:',
      'Revisão periódica honesta da conduta.',
      ['Diagnóstico de demônios alheios', 'Substituto do Talmud', 'Ritual de exposição'],
    ),
    buildEscolaQuestion(
      '3',
      'Encontros na Fase 4 seguem política:',
      'Semanal, quinzenal ou mensal conforme caso.',
      ['Só por videogame', '24 horas por dia', 'Sem calendário'],
    ),
    buildEscolaQuestion(
      '4',
      'Encaminhar nível superior significa:',
      'Manhigut, terapia ou grupo quando apropriado.',
      ['Expulsar sem diálogo', 'Publicar prontuário', 'Forçar libertação'],
    ),
    buildEscolaQuestion(
      '5',
      'Acompanhamento prolongado típico:',
      '3 a 12 meses conforme caso.',
      ['Um único dia', 'Até eternidade sem revisão', 'Somente online anônimo'],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Encerramento (Fase 5) consolida:',
      'Tikkun alcançado e autonomia saudável.',
      ['Dependência eterna do facilitador', 'Isolamento da kehilah', 'Promessa de nunca falhar'],
    ),
    buildEscolaQuestion(
      '2',
      'Bênção no encerramento, quando apropriado:',
      'Sela o processo com reverência, não espetáculo.',
      ['Substitui medicina', 'Exige denúncia pública', 'Cancela futura Teshuváh'],
    ),
    buildEscolaQuestion(
      '3',
      'Transição para grupo ou Manhigut ocorre se:',
      'Participante estável e próximo passo indicado.',
      ['Participante pagou taxa extra', 'Facilitador deseja fama', 'Sem revisão de plano'],
    ),
    buildEscolaQuestion(
      '4',
      'Encerramento sem Tikkun verificável:',
      'Não é encerramento ético; replaneja ou encaminha.',
      ['É vitória espiritual', 'Dispensa supervisão futura', 'Libera libertação'],
    ),
    buildEscolaQuestion(
      '5',
      'Manual 4.2 fecha com salvaguarda:',
      'Toráh Kedushah, Halacháh e frutos observáveis.',
      ['Ocultismo permitido', 'Tradição sem Teshuváh', 'Cura física garantida'],
    ),
  ]),
]

export function ieclCuraQuestionnaire(phaseIndex: number): EscolaQuestionnaire {
  return PHASES[Math.max(0, Math.min(PHASES.length - 1, phaseIndex - 1))]
}
