import { IMERSOES } from '@/lib/imersoes-content'
import { getCurriculumByMonth } from '@/lib/manhigut-curriculum'

const avodat = IMERSOES.find((i) => i.slug === 'avodat-hanefesh')!

function avodatModuleStudy(n: number): string {
  const step = avodat.steps[n - 1]
  if (!step) return ''

  const bodies: Record<number, string> = {
    1: `## O que estudar neste módulo

Leia com calma e anote dúvidas para o grupo ou para o Rav.

- **Método Rav EBBY:** trabalho da alma em linguagem acessível, dentro da Toráh Kedushah.
- **O que você recebe:** processo de Teshuváh, Middot, ferramentas espirituais e cura interior cotidiana.
- **O que você não recebe:** mapa dos 22 Netivot, protocolo de libertação, gematria operacional para diagnosticar pessoas, promessas de cura.
- **Consentimento:** você pode recusar prática, pedir pausa e buscar médico ou psicólogo quando necessário.
- **Limites:** confidencialidade pastoral, sem exposição pública de pecado ou trauma.`,
    2: `## O que estudar neste módulo

- **Tzelem Elohim:** dignidade humana à imagem de Ado-nai.
- **Nefesh, Ruach, Neshamáh:** dimensões vividas (vida, emoção, profundidade), sem diagrama técnico do Etz Chaim.
- **Quatro Olamot na experiência:** corpo (Assiáh), emoção, pensamento, presença.
- **PaRDeS:** quatro modos de ler a Toráh, Peshat literal, Remez alusão, Drash ensino, Sod profundidade, cada um com seu lugar.`,
    3: `## O que estudar neste módulo

- **Cinco movimentos da Teshuváh:** reconhecer, assumir responsabilidade, arrepender-se, retificar, mudar na prática.
- **Viduy:** falar a verdade a Ado-nai, em particular ou com guia de confiança, sem espetáculo.
- **Esperança:** o Tikkun é possível, passo a passo, com apoio da congregação.`,
    4: `## O que estudar neste módulo

- Escolha **uma Middáh por semana** (dez centrais na apostila).
- Use **Cheshbon HaNefesh** diário: o que fiz bem, onde falhei, o que pedirei a HaShem amanhã.
- Progresso = conduta observável, não competição espiritual.`,
    5: `## O que estudar neste módulo

Estude uma ferramenta por vez e pratique na semana:

1. Hitbodedut, conversa íntima com Ado-nai.
2. Cheshbon HaNefesh.
3. Viduy.
4. Mechilah (perdão estruturado).
5. Tikkun HaKlali (com orientação).
6. Shmá intencional.
7. Birkat Kohanim (como receber bênção).`,
    6: `## O que estudar neste módulo

- **Cinco fases** da Cura Interior em linguagem simples: acolhimento, entendimento, plano, acompanhamento, encerramento ou transição.
- Monte um **plano de Tikkun pessoal** com metas realistas e data de revisão.
- **Quando buscar profissional:** medicina, psicologia ou psiquiatria se o quadro clínico for predominante.
- **Shabat:** repouso, kodesh e reinício da semana.`,
    7: `## O que estudar neste módulo

- Papel da **congregação** no seu Tikkun.
- **Klal Yisrael:** você não caminha sozinho.
- **Responsabilidade mútua:** apoio, limites, encaminhamento ético.
- Encerramento com **Ken Yehi Ratzon** e preparação para a próxima trilha (Manhigut, se líder).`,
  }

  return `${bodies[n] ?? ''}

### Resumo da jornada

${step.text}

---

**Próximo passo:** role até o final desta página e responda o questionário **somente depois** de ler o conteúdo.`
}

export function getEscolaStudyMarkdown(
  courseSlug: string,
  stageSlug: string,
  stageNumber: number,
  title: string,
): { markdown: string; manhigutReadUrl?: string } {
  if (courseSlug === 'avodat-hanefesh') {
    return { markdown: avodatModuleStudy(stageNumber) }
  }

  if (courseSlug === 'manhigut') {
    const curriculum = getCurriculumByMonth(stageNumber)
    const slug = curriculum?.slug ?? stageSlug
    return {
      markdown: `## Estudo desta etapa

O conteúdo completo do **Mês ${String(stageNumber).padStart(2, '0')}** está no Beit Midrash do Manhig.

1. Leia o módulo com atenção (texto, termos e reflexão pastoral).
2. Volte aqui ou permaneça na página do módulo para enviar o questionário após a leitura.

**Tema:** ${title}`,
      manhigutReadUrl: `/lideres/formacao/${slug}`,
    }
  }

  if (courseSlug === 'iecl-cura' || courseSlug === 'iecl-libertacao') {
  const iecl = IMERSOES.find((i) => i.slug === 'iecl')
  const step = iecl?.steps[stageNumber - 1]
  const manual = iecl?.manuals[0]?.markdown.slice(0, 4000) ?? ''
  return {
    markdown: `## ${title}

${step ? `### Foco\n\n${step.text}\n\n` : ''}### Referência (trecho do Manual 4.2)

Consulte no painel de imersões o manual completo. Trecho inicial para estudo desta fase:

${manual.split('\n').slice(0, 40).join('\n')}

---

**Próximo passo:** questionário ao final, após leitura.`,
  }
  }

  return { markdown: `## ${title}\n\nEstude o material indicado pelo Rav para esta etapa antes do questionário.` }
}
