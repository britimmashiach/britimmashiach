import { buildEscolaQuestion, questionnaire } from '@/lib/escola-questionnaire-build'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

const PASSING = 70

const LIB: EscolaQuestionnaire[] = [
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Libertação 4.3 no método exige:',
      'Certificação, supervisão e Toráh Kedushah.',
      ['Apenas desejo do participante', 'Plateia e câmeras', 'Substituição total da medicina'],
    ),
    buildEscolaQuestion(
      '2',
      'Fenômenos médicos antes da hipótese espiritual:',
      'Devem ser excluídos ou encaminhados.',
      ['São ignorados', 'São prova de demônio', 'Dispensam triagem'],
    ),
    buildEscolaQuestion(
      '3',
      'Manual proíbe uso de:',
      'Ocultismo, neopentecostalismo espetacular e mediunismo.',
      ['Salmos autorizados', 'Teshuváh', 'Oração sobria'],
    ),
    buildEscolaQuestion(
      '4',
      'Poder de libertação pertence a:',
      'HaShem; o facilitador ora como servo.',
      ['O líder como mediador mágico', 'O grupo como plateia', 'Entidades nomeadas'],
    ),
    buildEscolaQuestion(
      '5',
      'Pré-requisito IECL Libertação inclui:',
      'Manhigut e certificação específica, não autoatribuição.',
      ['Virar líder no mesmo dia', 'Concluir só Avodat', 'Responder questionário sem estudo'],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Triagem multidimensional distingue:',
      'Causas naturais, emocionais e espirituais com critério.',
      ['Só causas espirituais', 'Nenhuma causa natural', 'Sorteio de diagnóstico'],
    ),
    buildEscolaQuestion(
      '2',
      'Epilepsia ou intoxicação na sessão:',
      'Mandam interromper libertação formal.',
      ['Aumentam gritos de guerra', 'São sinais de vitória', 'Exigem plateia'],
    ),
    buildEscolaQuestion(
      '3',
      'Consentimento na libertação:',
      'Participante deve consentir; coação anula sessão.',
      ['Plateia pode forçar', 'Menores dispensam', 'Silêncio basta'],
    ),
    buildEscolaQuestion(
      '4',
      'Encaminhar clínico ocorre quando:',
      'Quadro psiquiátrico não avaliado ou risco.',
      ['Nunca', 'Só após dez sessões', 'Para diminuir custos'],
    ),
    buildEscolaQuestion(
      '5',
      'Registro interno da triagem serve:',
      'Ética, supervisão e continuidade.',
      ['Marketing viral', 'Humilhação pública', 'Substituir Teshuváh'],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Protocolo operacional 4.3 inclui etapas de:',
      'Preparação, oração autorizada, integração e plano escrito.',
      ['Gritos prolongados obrigatórios', 'Nomear demônio ao microfone', 'Exorcismo teatral'],
    ),
    buildEscolaQuestion(
      '2',
      'Orações autorizadas usam:',
      'Salmos e bênção de Shalom, tom reverente.',
      ['Fórmulas inventadas', 'Latim esotérico', 'Citação de entidades'],
    ),
    buildEscolaQuestion(
      '3',
      'Duração típica da sessão:',
      '20 a 45 minutos, interrompendo se agitação extrema.',
      ['5 horas sem parar', '24 horas', 'Sem limite'],
    ),
    buildEscolaQuestion(
      '4',
      'Plano pós-sessão mínimo:',
      'Ferramentas 4.1, comunidade, acompanhamento 30 dias.',
      ['Isolamento total', 'Abandonar estudo', 'Ocultismo liberado'],
    ),
    buildEscolaQuestion(
      '5',
      'Revisão com supervisor em 48 horas:',
      'Obrigatória para segurança pastoral.',
      ['Opcional se viralizar', 'Proibida', 'Só para iniciantes'],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Supervisão e encerramento responsável exigem:',
      'Critérios éticos e encaminhamento quando indicado.',
      ['Publicar nome do participante', 'Continuar sessões em série', 'Ignorar recaída clínica'],
    ),
    buildEscolaQuestion(
      '2',
      'Fechamento de portas espirituais é:',
      'Teshuváh prática, não ritual vazio.',
      ['Amuleto sem mudança', 'Confronto público', 'Garantia de nunca pecar'],
    ),
    buildEscolaQuestion(
      '3',
      'Quando NÃO ministrar libertação:',
      'Sem certificação, sem supervisão ou sem consentimento.',
      ['Sempre ministrar se pedirem', 'Se houver plateia', 'Se o líder estiver cansado'],
    ),
    buildEscolaQuestion(
      '4',
      'Acompanhamento pós-libertação mínimo:',
      '30 dias com encontros e Cheshbon.',
      ['Zero dias', 'Um minuto', 'Apenas online anônimo'],
    ),
    buildEscolaQuestion(
      '5',
      'Frase salvaguarda institucional afirma:',
      'Libertação dentro da Toráh Kedushah e Teshuváh verificável.',
      ['Libertação substitui halachá', 'Ocultismo é neutro', 'Cura física garantida'],
    ),
  ]),
]

export function ieclLibertacaoQuestionnaire(n: number): EscolaQuestionnaire {
  return LIB[Math.max(0, Math.min(LIB.length - 1, n - 1))]
}
