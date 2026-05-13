# Chagim: guia de conteúdo para assistentes (Claude)

Documento de referência para gerar ou revisar textos da área **Chagim** da
plataforma Brit Mashiach (congregação Brit Im Mashiach, Franca SP). Use junto
com `docs/metodo-rav-ebby.md` quando o texto for espelhar o estilo das Aliyot;
este arquivo foca na **web** (resumos, artigos longos, seções no Supabase).

---

## Objetivo

Produzir conteúdo litúrgico e didático que:

- Respeite tradição judaica e **judaísmo messiânico não trinitário**, no tom da
  comunidade.
- Possa ser organizado em **PaRDeS** quando fizer sentido: Peshat, Remez,
  Drash, Sod (níveis hermenêuticos, não obrigatório repetir os quatro em toda
  frase).
- Sirva para campos `summary`, `content`, tabela `chag_sections` (título +
  conteúdo por ordem), e metadados `level_pardes` / `is_premium` conforme o
  schema do projeto.

Texto principal em **português brasileiro**, claro e acessível; termos hebraicos
com transliteração consistente quando aparecerem pela primeira vez no artigo.

---

## Estrutura sugerida por Chag

1. **summary** (curto): uma ou duas frases para cartão na listagem.
2. **content** (artigo-mãe): introdução + visão geral da festa; pode usar
   subtítulos em Markdown (`##`).
3. **Seções** (`chag_sections`): 4 a 8 blocos com `order_num` crescente; cada
   uma com `title`, `content`, opcionalmente `level_pardes` (array com um ou
   mais de: `peshat`, `remez`, `drash`, `sod`) e `is_premium` para trechos mais
   profundos ou materiais reservados.

### Categorias (`category`)

Valores usados na UI: `yamim_noraim`, `shalosh_regalim`, `rosh_chodesh`,
`minor`. Escolha a categoria correta ao sugerir inserts ou revisões.

### PDFs (opcional)

Campos `pdf_url`, `pdf_premium_url`, `pdf_kabbalah_url`: checklists e estudos
complementares; não inventar URL, deixar nulo se ainda não houver arquivo.

---

## Tom e limites

- Priorizar **halacháh e narrativa corretas** no Peshat; no Sod, ser explícito
  que é leitura cabalística tradicional, sem confundir com psicologia vaga.
- Conectar festas ao **calendário** e à **vida da comunidade** (hospitalidade,
  tzedaká, estudo em grupo) quando couber Drash.
- Evitar tom acadêmico frio; preferir convite ao estudo, como nas Parashot e
  estudos já publicados na plataforma.

---

## Ideias de seções por festa (referência rápida)

| Chag            | Exemplos de seções |
|-----------------|--------------------|
| Pesach          | Hagadá e kavanot; arba kosot; Matsá; memória e Tikkun pessoal |
| Shavuot         | Omer como preparação; Rut; Tikun Leil (lista breve de leituras) |
| Rosh Hashaná    | Malchuyot, Zichronot, Shofarot; Teshuvá em três passos |
| Yom Kippur      | Vidui (comentário focado); Avodá; espírito do jejum |
| Sukkot          | Sucá e confiança; ushpizin; arba minim; ligação com Simchat Torah |
| Chanuká         | Acendimento e ordem; pirsum ha nes; brachot |
| Purim           | Meguiláh; matanot; ausência explícita do Nome (com cuidado e fontes) |
| Lag baOmer      | Hilulá de Rashbi; simbolismo do fogo e da Toráh oral |
| Tu biShvat      | Shivat haminim; brachot sobre frutos |
| Tisha beAv      | Luto pelo Mikdash; tom sobrio; esperança de geulá |

Repita ou adapte conforme o calendário do ano.

---

## Dicionário mínimo de termos hebraicos

Transliteração aproximada para leitores de português; definições curtas.

| Termo | Significado resumido |
|-------|----------------------|
| **Aliyá** | Subida à Toráh para leitura pública; porção lida. |
| **Arba minim** | Quatro espécies (lulav, etrog, hadassim, aravot) na Sukkot. |
| **Avodá** | Serviço (no Templo); em Yom Kippur, a liturgia do sumo sacerdote. |
| **Beit HaMikdash** | Templo de Jerusalém. |
| **Brachá** | Bênção formulada antes de mitzvá ou alimento. |
| **Brit** | Aliança (pacto) entre HaShem e Israel. |
| **Chag** | Festa (dia santo de alegria, muitas vezes com trabalho proibido). |
| **Chametz** | fermentado; proibido no Pesach. |
| **Chol haMoed** | dias intermediários de Pesach ou Sukkot (meio termo entre chag e dia comum). |
| **Drash** | camada homilética ou midráchica do texto. |
| **Geulá** | redenção, libertação messiânica. |
| **Haftará** | leitura dos Profetas após a Toráh no Shabat/festas. |
| **Hagadá** | livro do Seder de Pesach. |
| **HaShem** | “O Nome”; forma respeitosa de referir-se a Deus em estudo ou oração. |
| **Halacháh** | lei judaica prática. |
| **Havdalá** | separação santa e profana no fim do Shabat ou chag. |
| **Hitbodedut** | meditação ou conversação íntima em oração (termo chassídico, usar com contexto). |
| **Kavaná** | intenção interior ao cumprir mitzvá ou oração. |
| **Kiddush** | santificação do dia (vinho ou suco, bênção). |
| **Matsá** | pão ázimo da Páscoa. |
| **Meguilá** | rolo (ex.: Meguilat Esther em Purim). |
| **Midrash** | comentário narrativo ou homilético sobre a Toráh. |
| **Mikvé** | banho ritual de imersão. |
| **Minchá** | oração da tarde. |
| **Mitzvá** | mandamento ou boa obra prescrita. |
| **Moed** | tempo fixo sagrado (festa ou encontro no calendário). |
| **Musaf** | oração adicional em Shabat e chaguim. |
| **Omer** | contagem de 49 dias entre Pesach e Shavuot. |
| **PaRDeS** | quatro níveis: Peshat, Remez, Drash, Sod. |
| **Peshat** | sentido simples ou literal do versículo. |
| **Remez** | alusão ou dica textual (inclui jogos de letras ou números). |
| **Seder** | ordem da refeição ritual de Pesach. |
| **Sefirá** | emanção cabalística; também dia do Omer com par espiritual. |
| **Shabaton** | descanso absoluto (cessação total de trabalho). |
| **Shacharit** | oração da manhã. |
| **Shofar** | chifre de carneiro ou antílope tocado em Rosh Hashaná. |
| **Sod** | dimensão esotérica ou cabalística do texto. |
| **Sucá** | cabana da festa de Sukkot. |
| **Tefilá** | oração. |
| **Teshuvá** | arrependimento e retorno (literalmente “voltar”). |
| **Tikkun** | reparo ou correção espiritual; também livro de leituras noturnas. |
| **Toráh** | Pentateuco; por extensão, ensino sagrado. |
| **Tzitzit** | franjas do talit ou vestuário com quatro pontas. |
| **Yom Tov** | dia de festa com restrições semelhantes ao Shabat (salvo onde a halacháh difere). |

---

## Checklist antes de entregar um texto

- [ ] `summary` cabe em duas frases sem jargão excessivo.
- [ ] `content` tem introdução clara e, se longo, seções `##`.
- [ ] Seções numeradas fazem sentido na ordem litúrgica ou pedagógica.
- [ ] `level_pardes` reflete o tom real da seção (não decorativo).
- [ ] Termos hebraicos: primeira ocorrência com transliteração ou explicação.
- [ ] Nenhuma URL de PDF inventada.

---

## Onde isso aparece no código

- Página: `app/chagim/page.tsx` e componente `components/chagim/ChagimClient.tsx`.
- Dados: `lib/chagim-supabase.ts`, tabelas `chagim` e `chag_sections` (migração
  `supabase/migrations/20260510_chagim.sql`).
- Estudos de referência de tom: `lib/placeholder-studies.ts` (ex.: PaRDeS,
  Pesach espiritual, Tehilim).

---

## Claude na web (claude.ai)

No site do Claude **não** há acesso automático à pasta do seu PC nem ao
repositório Git. O guia só vale lá se você **levar o contexto** de um destes
jeitos:

1. **Anexar o arquivo** `docs/chagim-conteudo-claude.md` no início do chat (ícone
   de clipe / upload), e pedir explicitamente: “siga este documento para todo
   texto de Chagim”.
2. **Projeto (Project)** no Claude: criar um projeto “Brit Mashiach – Chagim” e
   colar nas **instruções personalizadas** um resumo do guia *ou* anexar o
   `.md` como **conhecimento do projeto**, para não precisar reenviar a cada
   conversa.
3. **Repositório público no GitHub**: usar o link **raw** do arquivo no prompt
   (“leia e siga: `https://raw.githubusercontent.com/.../chagim-conteudo-claude.md`”),
   se o repositório for público e o Claude conseguir buscar a URL (varia com
   plano e recursos de busca).
4. **Copiar e colar** o trecho relevante (objetivo + dicionário + checklist)
   quando a conversa for curta.

No **Cursor**, o mesmo arquivo pode ser citado com `@docs/chagim-conteudo-claude.md`
sem upload manual.

Atualize este guia se novas categorias ou campos forem adicionados ao banco.
