import { buildEscolaQuestion, questionnaire } from '@/lib/escola-questionnaire-build'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

const P = 70

/** Casos pastorais: as quatro respostas são plausíveis; só uma honra o método. */
const MODULES: EscolaQuestionnaire[] = [
  questionnaire(P, [
    buildEscolaQuestion(
      '1',
      'Um irmão diz: "Se eu contar meu pecado no microfone, HaShem me leva mais a sério." O que a identidade deste módulo pede que você responda?',
      'Viduy é verdade diante de Ado-nai; exposição pública não aumenta o perdão e pode ferir você e outros.',
      [
        'Aceitar, porque vulnerabilidade pública sempre acelera o Tikkun.',
        'Pedir que ele conte só o pecado do cônjuge, para não se expor sozinho.',
        'Dizer que, sem plateia, a Teshuváh não tem valor comunitário.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Alguém oferece "ler seus Netivot" no primeiro encontro para provar que o curso é profundo. Qual discernimento está correto?',
      'O participante recebe o processo, não o mapa técnico; diagnóstico sefirótico não é porta de entrada.',
      [
        'Aceitar, desde que o resultado fique só entre vocês dois.',
        'Aceitar se a pessoa for líder, mesmo sem supervisão.',
        'Recusar o curso inteiro, porque qualquer linguagem de alma é proibida.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Você está em crise e um amigo diz que buscar psicólogo é falta de fé. Como o consentimento e os limites deste módulo se aplicam?',
      'O caminho espiritual permanece, e o cuidado profissional entra quando o quadro clínico pede; recusar médico não é fé maior.',
      [
        'Suspender oração até o psicólogo autorizar qualquer menção a Ado-nai.',
        'Concordar com o amigo para não parecer fraco na kehilah.',
        'Trocar o psicólogo por uma sessão de libertação no mesmo dia.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Depois de ler o módulo, você quer "resultado" em sete dias. O que é maturidade, e não pressa disfarçada?',
      'Nomear o que você busca e o que precisa soltar, e aceitar um ritmo de verdade sem promessa de cura.',
      [
        'Cobrar do facilitador um prazo de milagre por escrito.',
        'Comparar sua velocidade com a de quem já está no módulo 7.',
        'Abandonar o módulo se a primeira semana não tiver emoção forte.',
      ],
    ),
  ]),
  questionnaire(P, [
    buildEscolaQuestion(
      '1',
      'Alguém errou grave e diz: "Se eu fui criado à imagem, não preciso de Teshuváh." Onde o raciocínio quebra?',
      'Tzelem Elohim afirma dignidade, não isenção; a imagem permanece e por isso o retorno ainda é possível e devido.',
      [
        'A imagem se apaga no primeiro pecado e só volta após libertação.',
        'Dignidade significa que a comunidade não pode corrigir ninguém.',
        'Tzelem Elohim só vale para quem já concluiu Manhigut.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Você ora com fervor e trata mal quem mora com você. Qual leitura dos "andares" da vida é honesta?',
      'Oração sem conduta no chão concreto não é subida; os andares não se substituem.',
      [
        'A oração cobre a casa automaticamente, então o conflito pode esperar.',
        'O problema é só emoção, então basta sentir mais na reunião.',
        'Quem ora muito já está no Sod e não deve ser cobrado no Peshat da vida.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Um estudo ignora o mandamento e fala só de "mistério". O que PaRDeS impede aqui?',
      'Sod não cancela Peshat nem a prática; profundidade sem letra vira fuga.',
      [
        'Peshat é sempre superior e Sod deve ser evitado por leigos.',
        'Remez autoriza qualquer associação pessoal sem contexto.',
        'Drash existe para constranger publicamente quem discorda.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'No caderno, a pergunta era: em qual andar você se esconde para não mudar? Você descobre que se esconde no discurso bonito. Qual passo seguinte é coerente com o módulo?',
      'Trazer um fato concreto da semana e uma ação pequena, sem transformar o insight em nova identidade espiritual.',
      [
        'Contar o insight no grupo como prova de que você já avançou.',
        'Parar de orar, porque pensamento basta.',
        'Pedir um mapa de Sefirot para explicar o esconderijo.',
      ],
    ),
  ]),
  questionnaire(P, [
    buildEscolaQuestion(
      '1',
      'A pessoa chora muito no culto e na terça repete o mesmo ato. O que ainda não aconteceu na Teshuváh?',
      'O choro pode ser arrependimento, mas sem mudança prática a Teshuváh ficou no discurso.',
      [
        'Faltou plateia maior para o choro valer.',
        'O ato repetido prova que Teshuváh não existe para esse caso.',
        'Faltou apenas um nome hebraico novo para a emoção.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Alguém diz: "A culpa é só da minha família, eu não escolho nada." Qual distinção o módulo exige?',
      'Há ferida recebida e há resposta escolhida; responsabilidade nomeia a parte que é sua, sem negar o contexto.',
      [
        'Toda ferida recebida anula qualquer responsabilidade presente.',
        'Contexto familiar não pode ser mencionado, senão é desculpa.',
        'A família deve confessar no lugar dela para a Teshuváh valer.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Reparar o dano humilharia de novo a pessoa atingida. O que é retificação adulta?',
      'Não criar novo dano; a retificação vira conduta nova e oração honesta, não teatro de "já resolvi".',
      [
        'Forçar o encontro público para "fechar ciclo".',
        'Desistir de qualquer mudança porque a reparação direta é impossível.',
        'Publicar o pedido de perdão nas redes para testemunho.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Viduy em voz baixa, sem lágrima, e um hábito que muda três vezes na semana. Como avaliar?',
      'É caminho válido: verdade específica diante de Ado-nai e mudança verificável, sem espetáculo.',
      [
        'Inválido, porque não houve emoção visível.',
        'Válido só se um líder assinar o caderno.',
        'Superior a quem chora, então a pessoa pode corrigir os outros.',
      ],
    ),
  ]),
  questionnaire(P, [
    buildEscolaQuestion(
      '1',
      'Você quer trabalhar as dez Middot na mesma semana para "não perder tempo". O que o módulo revela nessa pressa?',
      'A pressa de parecer avançado é uma forma de orgulho; uma Middáh habitada vale mais que dez anunciadas.',
      [
        'É o ideal, porque intensidade prova zelo.',
        'É correto se você já é líder.',
        'É errado apenas porque Middot são só para o módulo 7.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'No Cheshbon, você só escreve vitórias. O que falta para o exame ser exame?',
      'Nomear onde a Middáh foi traída, sem crueldade e sem desculpa automática.',
      [
        'Mostrar o caderno ao grupo para prestação pública.',
        'Trocar o Cheshbon pela sensação do culto.',
        'Comparar suas vitórias com as de outro membro.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Seu cultivo de "verdade" virou correção áspera dos outros no grupo. Qual Middáh o módulo devolveria ao centro?',
      'Humildade: caráter que produz desprezo pelos "atrasados" ainda não floresceu.',
      [
        'Nenhuma; verdade autoriza exposição do próximo.',
        'Coragem, no sentido de falar mais alto.',
        'Disciplina, no sentido de corrigir todo Shabat.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Qual cena conta como progresso real de Middáh?',
      'Você retém uma palavra ferina quando ninguém está filmando e assume uma dívida sem plateia.',
      [
        'Você vence um debate usando o vocabulário novo.',
        'Você sente unção ao corrigir alguém em público.',
        'Você posta um versículo depois de ter falado mal da pessoa.',
      ],
    ),
  ]),
  questionnaire(P, [
    buildEscolaQuestion(
      '1',
      'No Hitbodedut você só se defende. O que a ferramenta pede em seguida?',
      'Falar o que você evita e escutar o suficiente para a conversa não virar monólogo de autodefesa.',
      [
        'Aumentar o tempo até a emoção ficar forte.',
        'Chamar testemunhas para validar a conversa.',
        'Trocar a conversa por um ritual com nomes novos.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Pedem que uma pessoa abrace, no culto, quem a violentou, "para liberar Mechilah". O que o módulo recusa?',
      'Obrigar reconciliação insegura não é perdão; Mechilah distingue perdão diante de Ado-nai e aproximação perigosa.',
      [
        'Recusar o abraço é falta de fé, sempre.',
        'Mechilah só vale se houver plateia.',
        'O agressor deve conduzir a oração da vítima.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Alguém trata Tikkun HaKlali como garantia de cura do corpo. Qual correção é fiel?',
      'A prática não dispensa mudança de conduta nem cuidado médico; garantia de cura sai do método.',
      [
        'Aceitar a garantia se a pessoa jejuar.',
        'Proibir a prática por completo, mesmo com orientação.',
        'Cobrar o resultado em sete dias.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Você quer praticar as sete ferramentas no mesmo dia. O que é sabedoria aqui?',
      'Uma ferramenta na semana, com registro do que aconteceu de fato, não do que você queria sentir.',
      [
        'As sete juntas, senão o módulo não "pega".',
        'Nenhuma, até decorar os nomes em hebraico.',
        'Só Birkat Kohanim, porque as outras são emocionais demais.',
      ],
    ),
  ]),
  questionnaire(P, [
    buildEscolaQuestion(
      '1',
      'O plano de Tikkun cabe em uma página, mas não tem data. O que ele ainda é?',
      'Desejo. Sem data de revisão, não há acompanhamento verificável.',
      [
        'Plano completo, porque a intenção basta.',
        'Plano melhor, porque flexível demais evita cobrança.',
        'Plano inválido só se não citar Sefirot.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Em duas semanas a pessoa não "virou outra". O acompanhamento maduro faz o quê?',
      'Ajusta o plano, não pune a lentidão e não chama atraso de falta de fé automática.',
      [
        'Encerra o processo como fracasso espiritual.',
        'Aumenta a meta para forçar breakthrough.',
        'Expõe o atraso no grupo para gerar vergonha útil.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Há pensamento de morte. O que este módulo coloca junto da oração?',
      'Cuidado profissional imediato; oração acompanha e não substitui.',
      [
        'Mais Hitbodedut até passar, sem contar a ninguém.',
        'Libertação na mesma noite como primeiro passo.',
        'Shabat rigoroso como único tratamento.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'A pessoa não descansa e chama isso de zelo. O que o Shabat, como portal, denuncia?',
      'Cansaço disfarçado de piedade costuma ferir quem ama; parar também é obediência.',
      [
        'Descanso é fraqueza e deve ser adiado até o Tikkun acabar.',
        'Shabat só restaura se houver emoção mística.',
        'Trabalhar no Shabat é neutro se a intenção for a kehilah.',
      ],
    ),
  ]),
  questionnaire(P, [
    buildEscolaQuestion(
      '1',
      'Você só busca a congregação quando está em crise e nunca sustenta ninguém. O que a continuidade ainda não atravessou?',
      'A kehilah não é plateia da sua crise; continuidade inclui receber e carregar.',
      [
        'Nada: consumo de cuidado é o papel do participante.',
        'Falta apenas um cargo formal.',
        'Falta distance: comunidade atrapalha a alma.',
      ],
    ),
    buildEscolaQuestion(
      '2',
      'Alguém corrige o próximo no grupo com detalhes que não eram seus. Como nomear isso à luz do módulo?',
      'Não é discernimento; é lashon hara com vocabulário espiritual.',
      [
        'É responsabilidade mútua exemplar.',
        'É permitido se a intenção for Tikkun.',
        'É obrigatório para a etapa ser aprovada.',
      ],
    ),
    buildEscolaQuestion(
      '3',
      'Concluir Avodat HaNefesh deixa o líder tentado a "já poder libertar". O que o módulo fecha?',
      'Conclusão não autoriza libertação nem diagnóstico público; a própria Teshuváh não termina.',
      [
        'Autoriza protocolo 4.3 no Shabat seguinte.',
        'Encerra a necessidade de supervisão para sempre.',
        'Transfere o mapa dos Netivot para qualquer participante.',
      ],
    ),
    buildEscolaQuestion(
      '4',
      'Klal Yisrael, neste fechamento, pede de você qual peso?',
      'A sua conduta repara um fio no povo, sem desprezo por quem está fora e sem nacionalismo espiritual.',
      [
        'Superioridade sobre quem não estuda com você.',
        'Isolamento como prova de santidade.',
        'Missão de julgar as nações antes de revisar a própria fala.',
      ],
    ),
  ]),
]

export function avodatHanefeshQuestionnaire(moduleIndex: number): EscolaQuestionnaire {
  const idx = Math.max(0, Math.min(MODULES.length - 1, moduleIndex - 1))
  return MODULES[idx]
}
