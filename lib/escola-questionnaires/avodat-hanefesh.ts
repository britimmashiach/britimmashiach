import { buildEscolaQuestion, questionnaire } from '@/lib/escola-questionnaire-build'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

const PASSING = 70

const MODULES: EscolaQuestionnaire[] = [
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'No Módulo 1, o que o participante recebe ao iniciar Avodat HaNefesh?',
      'O processo de trabalho da alma, com linguagem acessível e limites claros.',
      [
        'O mapa técnico dos 22 Netivot para diagnosticar outras pessoas.',
        'Protocolo de libertação para aplicar sem supervisão.',
        'Promessa de cura física completa ao concluir o módulo.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'O que a Política de consentimento exige antes de práticas sensíveis?',
      'Consentimento informado, limites e possibilidade de encaminhamento profissional.',
      [
        'Revelação pública de pecados para liberar avanço na trilha.',
        'Assinatura de promessa de não buscar médico nem psicólogo.',
        'Uso de gematria operacional em grupo sem aviso.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'O princípio reitor da Apostila do participante afirma:',
      'O participante recebe o processo; o líder recebe o mapa.',
      [
        'Participante e líder estudam o mesmo protocolo de libertação.',
        'O participante deve memorizar as Sefirot antes da Teshuváh.',
        'O líder só entra após o participante concluir os 22 Netivot.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'O que a Apostila explicitamente NÃO oferece ao participante?',
      'Fichas dos 22 Netivot e gematria operacional para diagnóstico.',
      [
        'Viduy, Cheshbon e ferramentas espirituais básicas.',
        'Teshuváh e cultivo de Middot na vida diária.',
        'Orientação para buscar ajuda médica quando necessário.',
      ],
    ),
    buildEscolaQuestion(
      '5',
      'Na identidade brit, o participante aprende que a congregação:',
      'Pratica Teshuváh e Tikkun dentro da Toráh Kedushah, sem ocultismo.',
      [
        'Substitui psicoterapia por unção espetacular em toda reunião.',
        'Garante libertação demônica após cada culto.',
        'Exige exposição de trauma como prova de conversão.',
      ],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Tzelem Elohim, neste módulo, significa principalmente:',
      'Dignidade humana criada à imagem de Ado-nai, base ética da pessoa.',
      [
        'Diagrama obrigatório do Etz Chaim para cada participante.',
        'Prova de eleição que elimina necessidade de Teshuváh.',
        'Sinônimo de visão profética garantida a todos.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Nefesh, Ruach e Neshamáh são apresentadas como:',
      'Dimensões da alma vividas na experiência, sem mapa sefirótico operacional.',
      [
        'Nomes de anjos a serem invocados no Hitbodedut.',
        'Três níveis de liderança pastoral obrigatória.',
        'Substitutos de tratamento psiquiátrico.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Os quatro Olamot, na linguagem do participante, relacionam-se a:',
      'Corpo, emoção, pensamento e presença na vida cotidiana.',
      [
        'Quatro cultos dominicais distintos na sinagoga.',
        'Quatro livros do Shulchan Aruch que todos decoram.',
        'Quatro demônios catalogados no protocolo de libertação.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'PaRDeS no nível participante ensina que a Toráh possui:',
      'Quatro camadas de leitura: Peshat, Remez, Drash e Sod, cada uma com função.',
      [
        'Apenas sentido místico, ignorando halachá e narrativa.',
        'Somente aplicações de gematria de nomes de membros.',
        'Leitura literal substituída por revelações pessoais.',
      ],
    ),
    buildEscolaQuestion(
      '5',
      'Quem você é diante de Ado-nai implica, praticamente:',
      'Responsabilidade moral, retorno possível e cultivo de caráter.',
      [
        'Certeza de que nunca se pecará de novo.',
        'Direito de julgar publicamente o pecado alheio.',
        'Isenção de buscar ajuda profissional em saúde mental.',
      ],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Teshuváh, no método, envolve quantos movimentos centrais?',
      'Cinco: reconhecimento, responsabilidade, arrependimento, retificação e mudança prática.',
      [
        'Dois: confissão em público e unção imediata.',
        'Um único ato de fé sem mudança de conduta.',
        'Sete movimentos iguais aos do Sefirat haOmer litúrgico.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Viduy neste contexto é:',
      'Confissão honesta perante Ado-nai, não espetáculo para plateia.',
      [
        'Lista de pecados de terceiros que o grupo deve confrontar.',
        'Fórmula em latim herdada do sincretismo.',
        'Substituto legal de psicoterapia.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'A esperança do Tikkun afirma que:',
      'Restauração é possível com esforço, tempo e apoio da comunidade.',
      [
        'Cura física é garantida em sete dias.',
        'O passado deixa de importar sem mudança presente.',
        'Somente líderes certificados podem se arrepender.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Mudança prática na Teshuváh exige:',
      'Ações concretas observáveis, não só sentimento passageiro.',
      [
        'Revelar todo trauma em live para a congregação.',
        'Abandonar medicina se orar com fervor.',
        'Confrontar demônios antes de cada culto.',
      ],
    ),
    buildEscolaQuestion(
      '5',
      'O retorno a Ado-nai na Brit Im Mashiach permanece:',
      'Dentro da Toráh Kedushah e da responsabilidade pessoal.',
      [
        'Fora da halachá, desde que haja experiência emotiva.',
        'Condicionado a visões e sonhos proféticos.',
        'Desvinculado de Middot e ética comunitária.',
      ],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Middot no Avodat HaNefesh são cultivadas:',
      'Uma Middáh por semana, com Cheshbon HaNefesh diário simplificado.',
      [
        'Todas de uma vez em um único fim de semana intensivo.',
        'Somente após dominar gematria operacional.',
        'Apenas por líderes, nunca por participantes.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Cheshbon HaNefesh diário visa:',
      'Exame honesto da conduta e progresso no caráter.',
      [
        'Diagnosticar Netivot de terceiros para o grupo.',
        'Substituir a Amidáh por um diário secreto.',
        'Provar superioridade espiritual sobre outros membros.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Dez Middot centrais na versão participante servem para:',
      'Refinar ética observável na vida real, não rotular almas.',
      [
        'Classificar pessoas em klipot permanentes.',
        'Eliminar necessidade de comunidade.',
        'Justificar publicamente faltas alheias.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Evidência saudável de progresso em Middot é:',
      'Mudança concreta de conduta e relações, não só emoção.',
      [
        'Relato de visões como única métrica.',
        'Confronto agressivo de pecados alheios.',
        'Isolamento do mundo como virtude absoluta.',
      ],
    ),
    buildEscolaQuestion(
      '5',
      'O caráter que floresce conecta-se à Toráh porque:',
      'Middot traduzem mandamentos em hábitos de vida.',
      [
        'Middot cancelam necessidade de estudo.',
        'Middot são sinônimo de carisma de palco.',
        'Middot substituem encaminhamento clínico sempre.',
      ],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Hitbodedut, na apostila, é apresentada como:',
      'Conversa íntima com Ado-nai em linguagem pessoal e reverente.',
      [
        'Rito público de libertação com gritos prolongados.',
        'Técnica de invocar nomes de entidades desconhecidas.',
        'Substituto de hospitalização psiquiátrica.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Mechilah (perdão) no método enfatiza:',
      'Processo estruturado, limites e não exposição forçada.',
      [
        'Perdoar apenas se o outro confessar em culto.',
        'Cancelar responsabilidade sem Teshuváh.',
        'Perdoar demônios para encerrar o processo.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Tikkun HaKlali no material do participante:',
      'É ferramenta espiritual autorizada, com orientação pastoral.',
      [
        'Garante cura física imediata.',
        'Substitui todo o Talmud no estudo.',
        'Exige gematria do nome de cada ouvinte.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Shmá intencional visa:',
      'Consolidar unidade de Ado-nai e presença diária.',
      [
        'Produzir transes coletivos semanalmente.',
        'Substituir Minyan e Halacháh.',
        'Identificar espíritos pelo tom da voz.',
      ],
    ),
    buildEscolaQuestion(
      '5',
      'Birkat Kohanim, para o participante, significa:',
      'Receber bênção sacerdotal com reverência, não espetáculo.',
      [
        'Ser obrigado a curar enfermos na hora.',
        'Substituir o papel do médico na congregação.',
        'Transferir autoridade mágica ao participante.',
      ],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Cura Interior na vida diária, para o participante, é descrita em:',
      'Cinco fases em linguagem simples, com plano de Tikkun pessoal.',
      [
        'Protocolo de libertação 4.3 sem supervisão.',
        'Substituição integral de psiquiatria.',
        'Diagnóstico sefirótico publicado ao grupo.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Quando buscar ajuda profissional (médico, psicólogo)?',
      'Quando o quadro clínico é predominante ou surge risco.',
      [
        'Nunca, pois só a oração resolve.',
        'Somente após três sessões de libertação.',
        'Apenas se o Rav não estiver na cidade.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'O Shabat como portal de restauração enfatiza:',
      'Repouso, kodesh e recomeço semana, sem substituir tratamento.',
      [
        'Proibição de medicar em qualquer situação.',
        'Libertação demônica obrigatória à noite.',
        'Jejum permanente todo Shabat.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'O Plano de Tikkun pessoal simplificado inclui:',
      'Objetivos realistas, ferramentas e revisão periódica.',
      [
        'Promessa pública de cura física.',
        'Exposição de pecados de terceiros.',
        'Mapa dos 22 Netivot do participante.',
      ],
    ),
    buildEscolaQuestion(
      '5',
      'Evidência de progresso na cura interior participante:',
      'Refinamento de Middot e mudança observável, não só sensação.',
      [
        'Única métrica é quantidade de visões.',
        'Sucesso medido por confrontos vencidos em público.',
        'Progresso definido só pelo líder sem consentimento.',
      ],
    ),
  ]),
  questionnaire(PASSING, [
    buildEscolaQuestion(
      '1',
      'Comunidade e continuidade ensina que a congregação:',
      'Sustenta Klal Yisrael e responsabilidade mútua no Tikkun.',
      [
        'Substitui família e profissionais sem exceção.',
        'Exige isolamento de quem ainda se arrepende.',
        'Elimina necessidade de estudo após o módulo 7.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Klal Yisrael, no encerramento da apostila, reflete:',
      'Ligação do participante ao povo e à missão comunitária.',
      [
        'Superioridade étnica sobre vizinhos.',
        'Mandato de julgar nações sem Teshuváh própria.',
        'Dispensa de halachá comunitária.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Após concluir Avodat HaNefesh, o líder pode:',
      'Avançar na trilha Manhigut se colado pelo Rav.',
      [
        'Aplicar libertação 4.3 sem certificação.',
        'Diagnosticar Netivot de membros publicamente.',
        'Ignorar supervisão porque já é apto.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Responsabilidade mútua na kehilah inclui:',
      'Apoio, limites e encaminhamento ético, sem exposição.',
      [
        'Fofoca espiritual como método de correção.',
        'Obrigação de revelar pecados uns dos outros.',
        'Competição pública por quem é mais santo.',
      ],
    ),
    buildEscolaQuestion(
      '5',
      'Ken Yehi Ratzon, ao fechar a jornada, expressa:',
      'Desejo de que a vontade divina se manifeste no caminho vivido.',
      [
        'Garantia de que não haverá mais provações.',
        'Fim de qualquer necessidade de Teshuváh.',
        'Autorização automática para ministrar libertação.',
      ],
    ),
  ]),
]

export function avodatHanefeshQuestionnaire(moduleIndex: number): EscolaQuestionnaire {
  const idx = Math.max(0, Math.min(MODULES.length - 1, moduleIndex - 1))
  return MODULES[idx]
}
