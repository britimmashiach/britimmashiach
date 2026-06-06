/**
 * Conteúdo das Imersões da Escola Rav EBBY.
 *
 * Apresentação: pública (SEO).
 * Manuais: conteúdo restrito a líderes com formação concluída (ver
 * profileHasConcludedFormation em lib/leader-access-policy).
 *
 * Fonte canônica dos manuais: pasta Escola-Rav-EBBY (Fase 4 e Fase 6).
 * Nada aqui é inventado; o texto espelha os documentos oficiais.
 */

export type ImersaoSlug = 'iecl' | 'avodat-hanefesh'

export interface ImersaoManual {
  title: string
  source: string
  markdown: string
}

export interface ImersaoBlock {
  title: string
  text: string
}

export interface Imersao {
  slug: ImersaoSlug
  name: string
  nameHebrew?: string
  tagline: string
  short: string
  intro: string
  forWho: string[]
  steps: ImersaoBlock[]
  safeguards: string[]
  manuals: ImersaoManual[]
}

// ── IECL · Cura Interior (4.2) ──────────────────────────────────────────────

const MANUAL_CURA_INTERIOR = `## Finalidade

Este Manual define o processo oficial de Cura Interior no Método Rav EBBY: restauração da pessoa nas dimensões emocional, espiritual, relacional e identitária, mediante Teshuváh, Tikkun e práticas autorizadas.

Cura Interior não é cura médica, não é psicoterapia e não promete milagre (Artigos 17º, 18º e 27º).

---

## Capítulo I, Definição e princípios

### Artigo 1º, O que é Cura Interior

Processo estruturado de restauração em que o participante, com apoio do facilitador, identifica rupturas de fluxo, pratica ferramentas espirituais e refina Middot, produzindo transformação ética observável.

### Artigo 2º, O que não é

- Substituição de psicologia, psiquiatria ou medicina.
- Garantia de cura física ou emocional completa.
- Experiência mística espetacular como meta.
- Exposição pública de feridas.

### Artigo 3º, Evidência de progresso

Conforme Artigo 16º, a evidência principal é refinamento de Middot e mudança concreta de conduta, não relato de visões ou sensações.

---

## Capítulo II, Modelo do processo (cinco fases)

### Fase 1, Acolhimento e triagem

**Objetivo:** Segurança, consentimento, escuta.

**Ações do facilitador:**
- Aplicar triagem do Manual 1.3.
- Obter consentimento informado (1.4).
- Escuta sem julgamento; sem promessas.
- Encaminhar se quadro clínico predominante.

**Duração típica:** 1 a 2 encontros.

### Fase 2, Diagnóstico espiritual operacional

**Objetivo:** Formular hipótese de Olam, Netiv e Middot (uso interno do facilitador).

**Ações:**
- Protocolo do Manual 3.1 (etapas 2 a 4).
- Registro de hipótese no prontuário.
- Compartilhar com participante linguagem acessível (ferida, padrão, caminho de cura), sem rotular Netivot tecnicamente salvo formação avançada e consentimento.

**Duração típica:** 1 a 3 encontros.

### Fase 3, Plano de Tikkun

**Objetivo:** Plano escrito, realista, revisável.

**Conteúdo mínimo do Plano:**
- Objetivo em linguagem do participante.
- 2 a 4 ferramentas (Manual 4.1).
- 1 a 2 Middot prioritárias (Manual 3.5).
- Ações concretas em Assiáh (comportamento, relação, hábito).
- Data de revisão (30, 60 ou 90 dias).
- Indicação de supervisão, se necessário.

**Assinatura:** participante e facilitador.

### Fase 4, Acompanhamento

**Objetivo:** Sustentar prática, ajustar plano, encaminhar se necessário.

**Ações:**
- Encontros conforme política da Escola (semanal, quinzenal ou mensal).
- Revisão de Cheshbon HaNefesh.
- Celebração de progresso sem inflar ego.
- Revisão de hipótese de Netiv se não houver mudança em 60 dias.

**Duração típica:** 3 a 12 meses, conforme caso.

### Fase 5, Encerramento ou transição

**Objetivo:** Consolidar Tikkun; liberar para autonomia ou encaminhar nível superior.

**Ações:**
- Revisão final de Middot e conduta.
- Birkat Kohanim quando apropriado (4.1).
- Encaminhamento a grupo, Manhigut ou terapia se indicado.
- Registro de encerramento no prontuário.

---

## Capítulo III, Imersão Espiritual

### Definição

Encontro intensivo de Cura Interior (retiro, módulo presencial ou ciclo concentrado), sempre com consentimento, triagem prévia e supervisão disponível.

### Estrutura mínima autorizada

| Bloco | Conteúdo | Duração orientativa |
|-------|----------|---------------------|
| Abertura | Shmá, orientações, limites | 30 min |
| Escuta | História em ambiente seguro | 60 a 90 min |
| Ensino | Toráh aplicada ao tema (sem exposição) | 45 min |
| Prática | Ferramenta indicada (Hitbodedut, Viduy, etc.) | 30 a 60 min |
| Silêncio | Contemplação supervisionada | 20 min |
| Integração | Plano de Tikkun preliminar | 45 min |
| Encerramento | Oração, Birkat Kohanim se autorizado | 20 min |

### Regras de Imersão

1. Nunca exigir revelação pública de pecado ou trauma.
2. Nunca impor libertação ou unção espetacular.
3. Facilitador certificado mais supervisor de plantão para grupos acima de 8 participantes.
4. Menores apenas com autorização parental documentada.
5. Interromper se participante entrar em crise: protocolo 1.3.

---

## Capítulo IV, Cura Interior por dimensão

### Dimensão emocional (Ruach, Yetziráh)

**Foco:** emoções, ressentimentos, medos, apego.

**Ferramentas prioritárias:** Mechilah, Hitbodedut, Cheshbon, Middot.

**Encaminhar se:** trauma complexo, transtorno de humor, ideação.

### Dimensão relacional

**Foco:** conflitos, isolamento, codependência, violência.

**Ferramentas:** Mechilah (com limites), Gevuráh nas Middot, mediação quando seguro.

**Encaminhar se:** violência doméstica, abuso, stalking.

### Dimensão identitária (Neshamáh, Beriáh)

**Foco:** sentido, vocação, crise de fé, autoconceito.

**Ferramentas:** Hitbodedut, estudo de Toráh, Cheshbon, Netiv 13 (interno).

**Encaminhar se:** crise existencial com risco, depressão severa.

### Dimensão espiritual

**Foco:** conexão com Ado-nai, prática de mitzvot, Deveikut saudável.

**Ferramentas:** Shmá, Tikkun HaKlali, Shabat, oração estruturada.

**Encaminhar se:** experiências que simulam psicose; supervisor antes de libertação.

---

## Capítulo V, Integração com diagnóstico técnico

O facilitador usa Olamot e Netivot internamente. O participante recebe:

- Linguagem de processo, não de mapeamento esotérico.
- Ferramentas concretas, não diagrama do Etz Chaim na apostila padrão.
- Esperança fundamentada em Teshuváh, não em previsão.

Exemplo de tradução pastoral:

| Uso interno | Linguagem ao participante |
|-------------|---------------------------|
| Bloqueio Netiv 21 | Dificuldade em amar com limites saudáveis |
| Olam Yetziráh | Ferida emocional e relacional |
| Middah Rachamim | Cultivar misericórdia sem perder verdade |

---

## Capítulo VI, Paralelo com cuidado profissional

| Situação | Cura Interior | Profissional |
|----------|---------------|--------------|
| Depressão leve estável | Pode complementar | Psicólogo recomendado |
| Depressão severa | Não substitui | Psiquiatra e psicólogo obrigatórios |
| Trauma de abuso | Apoio espiritual paralelo | Terapia especializada obrigatória |
| Vício | Plano espiritual mais grupo | Tratamento de dependência |
| Doença física | Oração e apoio | Médico |

O facilitador documenta encaminhamentos e não contradiz tratamento prescrito.

---

## Capítulo VII, Indicadores de alerta (interromper ou pausar)

- Piora rápida do quadro emocional após intervenção.
- Dependência excessiva do facilitador.
- Romantização ou vínculo inadequado.
- Participante relata dano ou pressão.
- Facilitador em sobrecarga: acionar supervisor (Manual 1.3, Capítulo VI).

---

## Capítulo VIII, Documentação

Registrar em prontuário interno:

- Datas e resumo de encontros.
- Plano de Tikkun e revisões.
- Hipótese de Netiv (código interno).
- Encaminhamentos realizados.
- Consentimentos assinados.

Confidencialidade conforme Política 1.4 e Código de Ética 1.2.

---

Rav.: EBBY`

const MANUAL_LIBERTACAO = `## Finalidade

Este Manual estabelece o protocolo oficial de libertação no Método Rav EBBY: condução prudente, supervisionada e fundamentada na Toráh, na tradição judaica e no contexto judaico messiânico não-trinitário.

Libertação não é espetáculo, exorcismo teatral, demonização automática nem garantia de resultado (Artigos 21º, 22º e 27º).

---

## Capítulo I, Fundamento doutrinário

### Artigo 1º, Reconhecimento bíblico

O Método reconhece que influências espirituais negativas existem conforme as Escrituras e a tradição judaica (Artigo 19º). A realidade espiritual não reduz a pessoa a diagnóstico único.

### Artigo 2º, Análise multidimensional obrigatória

Antes de qualquer hipótese de influência espiritual, o facilitador avalia simultaneamente (Artigo 20º):

- **Espiritual:** prática, idolatria, ocultismo, abandono de mitzvot.
- **Emocional:** trauma, luto, medo, transtorno não tratado.
- **Relacional:** conflitos, abuso, isolamento, manipulação.
- **Comportamental:** substâncias, sono, hábitos, violência.

### Artigo 3º, Prudência hermenêutica

Nenhuma manifestação incomum é automaticamente influência espiritual (Artigo 21º):

- Sonhos vívidos podem ser processamento emocional.
- Sensação de peso pode ser ansiedade ou depressão.
- Comportamento estranho pode ser efeito de substância ou doença neurológica.

**Regra:** excluir causas médicas e psiquiátricas antes de concluir influência espiritual.

---

## Capítulo II, Quem pode ministrar

### Artigo 4º, Certificação

Libertação exige certificação específica da Escola Rav EBBY (Fase 7), além da formação base de facilitador.

### Artigo 5º, Supervisão obrigatória

Toda sessão de libertação ocorre com supervisor presente ou em plantão imediato (Artigo 22º). Casos complexos exigem supervisor experiente e, se necessário, Conselho Doutrinário.

### Artigo 6º, Vedações

É proibido:

- Libertação em palco, vídeo viral ou multidão.
- Gritar, sacudir, humilhar ou expor o participante.
- Nomear demônios com teatralidade.
- Garantir libertação definitiva.
- Cobrar valores extras por libertação.
- Ministrar a menor sem responsável e protocolo específico.

---

## Capítulo III, Critérios para suspeitar influência espiritual

Suspeita responsável requer **pelo menos três** dos critérios abaixo, após exclusão clínica inicial:

1. Histórico de envolvimento com ocultismo, mediunismo ou práticas proibidas pela Toráh.
2. Manifestações que coincidem com padrão bíblico de opressão espiritual (medo extremo de Deus santo, reação visceral a nome de HaShem ou Escritura, autoconhecimento de presença estranha).
3. Ausência de explicação médica ou psiquiátrica adequada após avaliação profissional quando indicada.
4. Melhora temporária com oração estruturada e piora com retorno a prática proibida.
5. Testemunho consistente de terceiros confiáveis, sem sensacionalismo.
6. Discernimento do supervisor concordante com hipótese.

Se critérios insuficientes: tratar como Cura Interior padrão (Manual 4.2), não como libertação.

---

## Capítulo IV, Protocolo oficial de sessão

### Etapa 0, Pré-sessão (obrigatória)

- Consentimento informado específico para libertação (anexo na Política 1.4).
- Triagem médica e psiquiátrica quando houver qualquer dúvida.
- Supervisor confirmado.
- Ambiente privado, sem gravação não autorizada.
- Participante pode interromper a qualquer momento (Artigo 24º).

### Etapa 1, Estabilização

- Oração calma; Shmá recitado com kavanáh.
- Afirmar autoridade de HaShem, não do facilitador.
- Perguntar ao participante como se sente; não assumir manifestação.

### Etapa 2, Escuta e confissão voluntária

- Espaço para Viduy se o participante desejar, sem coação.
- Identificar portas abertas (práticas, pactos, ressentimentos, idolatria).
- Planejar fechamento de portas com Teshuváh prática.

### Etapa 3, Renúncia e Teshuváh

- Participante renuncia voluntariamente práticas e vínculos contrários à Toráh.
- Compromisso verbal de abandono e retificação.
- Facilitador não inventa nomes de entidades; foca em HaShem como libertador.

### Etapa 4, Ministério de libertação (forma judaico-messiânica)

- Oração em hebraico ou português, tom firme e reverente, sem gritos prolongados.
- Uso de Salmos autorizados (ex: 91, 121, 130), não fórmulas inventadas.
- Birkat Kohanim ou bênção de Shalom para selar, se autorizado.
- Duração típica: 20 a 45 minutos. Interromper se agitação extrema.

### Etapa 5, Integração pós-sessão

- Repouso; água; conversa breve.
- Plano de Tikkun escrito: ferramentas 4.1, comunidade, estudo, Middot.
- Acompanhamento semanal mínimo por 30 dias.
- Revisão com supervisor em 48 horas.

---

## Capítulo V, Fechamento de portas espirituais

Portas abertas são comportamentos ou vínculos que mantêm ruptura de fluxo. Fechamento é **Teshuváh prática**, não ritual vazio.

| Porta comum | Fechamento autorizado |
|-------------|----------------------|
| Ocultismo passado | Destruição de objetos; Viduy; compromisso escrito de abandono |
| Ressentimento crônico | Mechilah estruturada (4.1) |
| Imoralidade persistente | Viduy mais mudança verificável mais accountability |
| Isolamento da comunidade | Reintegração gradual à congregação |
| Palavras de maldição pronunciadas | Retratação quando possível; bênção contrária em oração |

---

## Capítulo VI, Quando NÃO ministrar libertação

Conforme Manual 1.3, Capítulo III:

- Transtorno psiquiátrico não avaliado.
- Epilepsia, intoxicação, febre, hipoglicemia.
- Coação, plateia, sensacionalismo.
- Ausência de supervisão.
- Facilitador sem certificação.
- Participante não consente.

**Ação:** encaminhar clínico; Cura Interior; oração privada do participante, sem sessão formal de libertação.

---

## Capítulo VII, Diferença em relação a práticas proibidas

| Prática proibida | Método Rav EBBY |
|------------------|-----------------|
| Exorcismo teatral | Oração supervisionada e Teshuváh |
| Nomear e interrogar demônio | Foco em HaShem e em portas abertas |
| Expulsar em público | Sessão privada, confidencial |
| Garantir libertação | Acompanhar processo sem promessa |
| Mediunismo | Proibido pela Toráh e pela Escola |
| Neopentecostalismo espetacular | Judaico-messiânico, sóbrio, textual |

---

## Capítulo VIII, Judaico-messiânico não-trinitário

A libertação na Brit Im Mashiach invoca o Deus de Israel, Ado-nai, libertador do Egito e Senhor do Shmá. Yeshua é compreendido como tzaddik e Mashiach no contexto judaico, não como segunda pessoa ontológica para operar libertação.

O poder de libertação pertence a **HaShem**. O facilitador ora e acompanha como servo, não como mediador mágico.

Correlação com Brit Hadashá é por **princípio** (autoridade sobre espíritos em harmonia com o Reino e a Toráh), sem citação litúrgica de versículos como fórmula de exorcismo.

---

## Capítulo IX, Acompanhamento pós-libertação

Mínimo 30 dias:

- Encontro semanal com facilitador ou grupo autorizado.
- Cheshbon HaNefesh diário.
- Shmá manhã e noite.
- Proibição temporária de novelas espirituais, ocultismo e isolamento.
- Supervisor disponível se recaída de sintomas.

Se sintomas retornam: reavaliar clínico primeiro; depois supervisor espiritual. Não repetir sessões em sequência sem discernimento.

---

## Capítulo X, Documentação e ética

Registrar:

- Data, participantes presentes (facilitador, supervisor).
- Critérios que motivaram sessão.
- Ferramentas e orações utilizadas (resumo).
- Plano de Tikkun pós-sessão.
- Encaminhamentos.

Nunca publicar nome, vídeo ou testemunho sem consentimento escrito explícito.

---

## Capítulo XI, Frase salvaguarda institucional

Toda libertação no Método Rav EBBY permanece dentro do quadro da Toráh Kedushah e da Halacháh. A Brit Im Mashiach pratica discernimento multidimensional, supervisão obrigatória e Teshuváh verificável como frutos do processo de libertação.

---

Rav.: EBBY`

const MANUAL_AVODAT_HANEFESH = `## Finalidade

Esta Apostila é o material do **participante** no Método Rav EBBY. O participante recebe o **processo**, não o mapa técnico de Netivot.

Conteúdo: Teshuváh, Middot, ferramentas espirituais e práticas de Cura Interior em linguagem acessível, sem diagnóstico sefirótico operacional.

---

## Princípio reitor

> O participante recebe o processo. O líder recebe o mapa.

O participante não estuda os 22 Netivot como ferramenta diagnóstica. Aprende a orar, examinar a alma, perdoar, retornar a Ado-nai e cultivar Middot. O facilitador usa os documentos técnicos (Fases 3 e 4) em linguagem pastoral.

---

## Estrutura oficial da Apostila (módulos)

### Módulo 1, Boas-vindas e identidade

- Boker Tov, Shalom U'Vrachá
- O que é o Método Rav EBBY (linguagem simples)
- O que você receberá e o que não receberá (resumo da Política 1.4)
- Consentimento e limites

### Módulo 2, Quem você é diante de Ado-nai

- Tzelem Elohim e dignidade
- Nefesh, Ruach, Neshamáh (sem diagrama do Etz Chaim)
- Os quatro Olamot como experiência humana (corpo, emoção, pensamento, presença)
- PaRDeS como quatro formas de ler a Toráh (Peshat, Remez, Drash, Sod em linguagem acessível)

### Módulo 3, Teshuváh, o caminho do retorno

- Os cinco movimentos: reconhecimento, responsabilidade, arrependimento, retificação, mudança prática
- Viduy: confissão honesta perante Ado-nai
- Esperança: Tikkun é possível

### Módulo 4, Middot, o caráter que floresce

- Dez Middot centrais (Manual 3.5, versão participante)
- Uma Middáh por semana
- Cheshbon HaNefesh diário simplificado

### Módulo 5, Ferramentas espirituais

Cada ferramenta com ensino, passo a passo e espaço para prática (sem contraindicações clínicas detalhadas, que ficam com o facilitador):

1. Hitbodedut
2. Cheshbon HaNefesh
3. Viduy
4. Mechilah
5. Tikkun HaKlali
6. Shmá Intencional
7. Birkat Kohanim (como receber bênção)

### Módulo 6, Cura Interior na vida diária

- O processo em cinco fases (linguagem do participante)
- Plano de Tikkun pessoal (modelo simplificado)
- Quando buscar ajuda profissional (médico, psicólogo)
- Shabat como portal de restauração

### Módulo 7, Comunidade e continuidade

- Papel da congregação
- Klal Yisrael e responsabilidade mútua
- Ken Yehi Ratzon

---

## O que a Apostila NÃO contém

- Fichas dos 22 Netivot (Documento 3.3)
- Protocolo de libertação (Documento 4.3)
- Matriz de competências (Documento 5.3)
- Gematria operacional para diagnóstico
- Promessas de cura ou libertação

---

## Uso pedagógico

| Contexto | Como usar |
|----------|-----------|
| Imersão Espiritual | Módulos 3, 4 e 5 como núcleo |
| Acompanhamento individual | Módulo indicado pelo Plano de Tikkun |
| Grupo de estudo | Um módulo por encontro, 7 a 10 semanas |
| Início na congregação | Módulos 1 e 2 |

---

## Relação com o Caderno de Exercícios (6.3)

O participante complementa a Apostila com o Caderno de Exercícios, que traz práticas guiadas, perguntas de reflexão e registros semanais.

---

Rav.: EBBY`

export const IMERSOES: Imersao[] = [
  {
    slug: 'iecl',
    name: 'IECL',
    tagline: 'Imersão Espiritual · Cura · Libertação',
    short:
      'Encontro intensivo de Cura Interior e Libertação judaico-messiânica: restauração emocional, relacional e espiritual mediante Teshuváh e Tikkun, com triagem, consentimento e supervisão.',
    intro:
      'A IECL é um encontro intensivo de Cura Interior e Libertação no Método Rav EBBY. Busca a restauração da pessoa nas dimensões emocional, espiritual, relacional e identitária, mediante Teshuváh, Tikkun e práticas autorizadas. Não é cura médica, não é psicoterapia e não promete milagre: a evidência de progresso é o refinamento das Middot e a mudança concreta de conduta.',
    forWho: [
      'Irmãos e irmãs que buscam restauração emocional, relacional ou espiritual com base na Toráh.',
      'Quem deseja praticar Teshuváh e Tikkun de forma estruturada e acompanhada.',
      'Pessoas com quadro clínico predominante são acolhidas e encaminhadas ao cuidado profissional adequado, em paralelo ao apoio espiritual.',
    ],
    steps: [
      { title: 'Acolhimento e triagem', text: 'Segurança, consentimento informado e escuta sem julgamento. Encaminhamento se houver quadro clínico predominante.' },
      { title: 'Diagnóstico espiritual', text: 'O facilitador formula hipótese de trabalho em linguagem acessível: ferida, padrão e caminho de cura.' },
      { title: 'Plano de Tikkun', text: 'Plano escrito, realista e revisável, com ferramentas, Middot prioritárias e ações concretas no dia a dia.' },
      { title: 'Acompanhamento', text: 'Encontros regulares, revisão de Cheshbon HaNefesh e celebração do progresso sem inflar o ego.' },
      { title: 'Encerramento ou transição', text: 'Consolidação do Tikkun, bênção quando apropriado e encaminhamento a grupo, Manhigut ou terapia se indicado.' },
    ],
    safeguards: [
      'Nunca se exige revelação pública de pecado ou trauma.',
      'Nunca se impõe libertação ou unção espetacular.',
      'Libertação exige certificação específica e supervisão obrigatória.',
      'Causas médicas e psiquiátricas são excluídas antes de qualquer hipótese espiritual.',
      'Cura Interior não substitui medicina, psicologia ou psiquiatria.',
    ],
    manuals: [
      {
        title: 'Manual de Cura Interior',
        source: 'Documento 4.2 da Arquitetura Mestra · Fase 4, Sistema de Intervenção · Versão 1.0, 5786',
        markdown: MANUAL_CURA_INTERIOR,
      },
      {
        title: 'Manual de Libertação Judaico-Messiânica',
        source: 'Documento 4.3 da Arquitetura Mestra · Fase 4, Sistema de Intervenção · Versão 1.0, 5786',
        markdown: MANUAL_LIBERTACAO,
      },
    ],
  },
  {
    slug: 'avodat-hanefesh',
    name: 'Avodat HaNefesh',
    nameHebrew: 'עבודת הנפש',
    tagline: 'Imersão de Tikkun · Cura · Retorno',
    short:
      'Trabalho da alma: Teshuváh, Middot, ferramentas espirituais e Cura Interior na vida diária, em linguagem acessível ao participante. O participante recebe o processo; o líder recebe o mapa.',
    intro:
      'Avodat HaNefesh, o trabalho da alma, é a jornada do participante no Método Rav EBBY. Por meio de Teshuváh, Middot, ferramentas espirituais e práticas de Cura Interior em linguagem acessível, a pessoa aprende a orar, examinar a alma, perdoar, retornar a Ado-nai e cultivar caráter. O princípio reitor é claro: o participante recebe o processo, e o líder recebe o mapa.',
    forWho: [
      'Participantes que iniciam a jornada de cura e retorno na congregação.',
      'Quem deseja uma rotina espiritual prática: oração, exame da alma, perdão e cultivo de Middot.',
      'Grupos de estudo da kehilah, com um módulo por encontro ao longo de sete a dez semanas.',
    ],
    steps: [
      { title: 'Boas-vindas e identidade', text: 'O que é o Método, o que você recebe e o que não recebe, consentimento e limites.' },
      { title: 'Quem você é diante de Ado-nai', text: 'Tzelem Elohim, as dimensões da alma e o PaRDeS como quatro formas de ler a Toráh.' },
      { title: 'Teshuváh, o caminho do retorno', text: 'Os cinco movimentos do retorno, o Viduy e a esperança de que o Tikkun é possível.' },
      { title: 'Middot, o caráter que floresce', text: 'Dez Middot centrais, uma por semana, com Cheshbon HaNefesh diário simplificado.' },
      { title: 'Ferramentas espirituais', text: 'Hitbodedut, Cheshbon, Viduy, Mechilah, Tikkun HaKlali, Shmá intencional e Birkat Kohanim.' },
      { title: 'Cura Interior na vida diária', text: 'O processo em cinco fases, plano de Tikkun pessoal e o Shabat como portal de restauração.' },
      { title: 'Comunidade e continuidade', text: 'O papel da congregação, Klal Yisrael e a responsabilidade mútua.' },
    ],
    safeguards: [
      'A apostila não traz fichas dos 22 Netivot nem protocolo de libertação (reservados ao facilitador).',
      'Sem gematria operacional para diagnóstico.',
      'Sem promessas de cura ou libertação.',
      'Orienta quando buscar ajuda profissional (médico, psicólogo).',
    ],
    manuals: [
      {
        title: 'Apostila do Participante, Avodat HaNefesh',
        source: 'Documento 6.1 da Arquitetura Mestra · Fase 6, Material Didático · Versão 1.0, 5786',
        markdown: MANUAL_AVODAT_HANEFESH,
      },
    ],
  },
]

export function getImersaoBySlug(slug: string): Imersao | undefined {
  return IMERSOES.find((i) => i.slug === slug)
}
