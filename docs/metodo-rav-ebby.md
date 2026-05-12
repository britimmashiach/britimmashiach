# Método Rav EBBY, geração de Aliyot

Sinagoga Brit Im Mashiach, Franca SP, 5786.

Referência canônica passada pelo Rav. Toda nova Aliyáh, todo gerador DOCX e
toda revisão deve seguir este documento sem desvio. Salvo aqui para que cada
sessão consulte antes de produzir.

---

## Identidade do projeto

Cada Aliyáh é um DOCX completo com PaRDeS (Peshat, Remez, Drash, Sod) de uma
porção da Parashat semanal, no Método Rav EBBY, abordagem luriânica com
comentários dos sábios, Sefirot, Netivot, Mussar e correlação com a Brit
Hadashá.

- Tradição, Judaísmo Messiânico não trinitário.
- Ano corrente, 5786.
- Idioma, Português brasileiro, acessível e com precisão kabalística total.
- Sistema do Chok LeYsrael, quando as Parashot são mechubarot, dividir em 7
  dias seguindo o ciclo semanal, 2 parashot em 7 Aliyot.

---

## Regras absolutas, nunca violar

1. Zero travessão (em-dash, en-dash) em qualquer parte.
2. Zero aspas tipográficas ou retas para destacar texto, usar negrito itálico
   na cor do tópico.
3. Sem espaço antes de vírgulas.
4. Acentuação correta do português, sempre.
5. Dois-pontos permitidos somente quando gramaticalmente necessários.
6. Assinatura final obrigatória, `Rav.: EBBY` com ponto após Rav e dois-pontos
   decorativos, único caso permitido de dois-pontos decorativo.
7. `Ken Yehi Ratzon` em amarelo FFFF00, Calibri 34pt half-points, bold itálico,
   alinhado à esquerda.
8. `Rav.: EBBY` em Calibri 34pt half-points, itálico, alinhado à direita.
9. Texto em português sempre revisado antes de gerar o DOCX.

---

## Tipografia, cores e página

### Fontes
- Corpo, Open Sans, SZ=24 half-points.
- Hebraico, Shlomo Stam, SZ_HEB=26 half-points, com `rightToLeft: true`.
- Títulos, Calibri, SZ_T1=34 e SZ_T2=26 half-points.

### Espaçamento
- Linha, 380 twips, LineRuleType.AUTO.
- Espaço após parágrafo normal, 180 twips.
- Espaço após hebraico, 100 twips.
- Espaço após bullets e fontes, 60 twips.

### Paleta
```
C_NAVY  00204F    cabeçalho e rodapé
C_T1    2E74B5    título padrão azul
C_OR    FF9900    laranja, versículo central e boas-vindas

C_PE    4EA72E    Peshat (verde)
C_RE    215E99    Remez (azul médio)
C_DR    80340D    Drash (marrom)
C_SO    7030A0    Sod (roxo)

C_RA    275317    Rashi (verde escuro)
C_IE    0F9ED5    Ibn Ezra (azul claro)
C_RB    8DD873    Ramban (verde claro)
C_SF    074F6A    Sforno (azul marinho)

C_EV    77206D    Rav EBBY (roxo escuro)
C_MU    47D459    Mussar (verde médio)
C_MT    0C3512    Mussar título (verde muito escuro)
C_NET   002060    Netivot (azul naval)

C_KE    D9D9D9    Keter
C_CH    BFBFBF    Chochmah
C_BI    074F6A    Bináh
C_CS    A6A6A6    Chesed
C_GE    EE0000    Gevura
C_TI    FFC000    Tiferet
C_NE    D86DCB    Netzach e Hod
C_YE    E97132    Yessod
C_MA    663300    Malchut
```

### Cabeçalho (todas as páginas)
- Texto, `SINAGOGA BRIT IM MASHIACH FRANCA S/P`.
- Fonte, Open Sans 24 half-points, bold, cor C_NAVY.
- Borda inferior, single 4pt, C_NAVY.

### Rodapé (todas as páginas)
- Texto, `© 2026 Brit Im Mashiach, Todos os Direitos Reservados, Página X de Y`.
- Fonte, Open Sans 24 half-points, cor C_NAVY.
- Borda superior, single 4pt, C_NAVY.

### Página
A4, 11906 x 16838 twips, margens 1440 twips em todos os lados.

---

## Template canônico, ordem fixa de seções

```
1.  Capa
2.  Saudações (Boker Tov + Shalom U'Vrachá)
3.  Introdução (3 parágrafos)
4.  Separador
5.  Termos-Chave (7 termos obrigatórios)
6.  Separador
7.  Texto Hebraico
8.  Separador
9.  Transliteração
10. Separador
11. Tradução Fiel
12. Separador
13. PARDES, título principal
14.   Peshat (4 a 5 blocos + fonte após cada + bullets finais)
15.   Separador
16.   Remez (3 a 4 blocos + fonte onde aplicável + bullets finais)
17.   Separador
18.   Drash (4 blocos + fonte após cada + bullets finais)
19.   Separador
20.   Sod (4 blocos + fonte após cada + bullets finais)
21. Separador
22. Comentários dos Sábios, título principal
23.   Rashi (2 a 3 blocos + fonte após cada)
24.   Separador
25.   Ibn Ezra (2 blocos + fonte após cada)
26.   Separador
27.   Ramban (2 a 3 blocos + fonte após cada)
28.   Separador
29.   Sforno (2 blocos + fonte após cada)
30. Separador
31. Rav EBBY (4 a 5 ensinamentos numerados + bullets finais)
32. Separador
33. À luz de Chazal (3 blocos + fonte após cada)
34. Separador
35. Talmud (2 a 3 blocos + fonte após cada)
36. Separador
37. Kabaláh, Zohar e Bahir (2 a 3 blocos + fonte após cada)
38. Separador
39. Mussar (3 práticas + fonte após cada + bullets finais)
40. Separador
41. Correlação com a Brit Hadashá (2 a 3 blocos + frase salvaguarda)
42. Separador
43. Sefirot Relacionadas (3 a 4 Sefirot com Netivot)
44. Separador
45. Síntese Sefirótica (bullets das Sefirot e dos Netivot separados)
46. Separador
47. Conclusão (síntese + Peshat + Remez + Drash + Sod resumidos)
48. Poesia final (versículo + tradução + linhas curtas)
49. Separador
50. Ken Yehi Ratzon (amarelo FFFF00, Calibri 34 half-points, bold itálico, LEFT)
51. Rav.: EBBY (Calibri 34 half-points, itálico, RIGHT)
```

---

## Capa, formato exato

```
[espaço vertical 260]
[logo circular 432 x 432, centralizado]
[T1] Nª Parashat NOME
[T1 com TextRun misto] Nª Aliyáh  [hebraico da parashat]  (Nome da Parashat)
[T1] Livro Cap:vers a Cap:vers
[espaço vertical 80]
[alinhado à direita] Por rav EBBY
[T2 laranja] Boker Tov!
[T2 laranja] Shalom U'Vrachá,
[espaço vertical 80]
```

---

## Termos-Chave, regras

- Título, `Termos-Chave desta Aliyáh`.
- Abertura fixa, `Antes de entrar no texto, veja os termos hebraicos
  principais que aparecem nesta Aliyáh. Para os que já os conhecem, a análise
  aprofundada virá na seção de Pardes.`
- Formato de cada termo, `▸ [hebraico] (transliteração) tradução. Explicação
  completa.`
- Quantidade, 7 termos por Aliyáh.
- Sem dois-pontos, sem travessões, sem aspas.
- Símbolo, `▸` U+25B8, cor C_T1.

---

## Hebraico, transliteração e tradução

### Hebraico
- Título alinhado à direita.
- Shlomo Stam 26 half-points.
- `rightToLeft: true`.
- Um versículo por parágrafo.
- Texto massorético com nikud completo (Mechon Mamre ou Sefaria).

### Transliteração sefardita
```
Alef inicial/final, silencioso ou vogal
Alef com vogal, vogal apenas
Bet com dagesh, B
Bet sem dagesh, V
Guimel, G
Dalet, D
Hei, H, final geralmente silencioso
Vav, V (consoante), U ou O (vogal)
Zayin, Z
Chet, Ch
Tet, T
Yud, Y (consoante), I (vogal)
Kaf com dagesh, K
Kaf sem dagesh (Chaf), Ch
Lamed, L
Mem, M
Nun, N
Samech, S
Ayin, apóstrofo ou omitido no início
Pei com dagesh, P
Pei sem dagesh (Fei), F ou Ph
Tzadi, Tz
Kuf, K
Resh, R
Shin, Sh
Sin, S
Tav, T (sefardita, nunca Th)

Vogais
Patach e Kamatz, A
Segol e Tzere, E
Chirik, I
Cholam, O
Shuruk e Kibbutz, U
Shewa na, e minúsculo ou omitido
Chataf patach, A
Chataf segol, E
Chataf kamatz, O
```

### Glossário fixo, formas obrigatórias
```
Toráh, Adonai, HaShem, Mashiach, Brit Hadashá, Chazal, Kabaláh, Halacháh,
Talmud, Midrash, Zohar, Mishkan, Mishná, Parashat, Parasháh, Aliyáh, Aliyot,
Kohen, Kohanim, Shabat, Yom Kippur, Rosh Hashanáh, Pessach, Sefiráh, Sefirot,
Netivot, Etz Chaim, PaRDeS, Peshat, Remez, Drash, Sod, Mussar, Tikun, Klipot,
Nitzotzot, Brit Im Mashiach, Rav EBBY, Yovel, Shemitáh, Degel, Degelim, Nassi,
Nesiim, Ohel Moéd, Kohen Gadol, Yeshua (nunca Jesus em material interno).
```

Nunca o Tetragrama soletrado YHWH ou YHVH.

---

## Expressões fixas obrigatórias

### Abertura
```
Boker Tov!
Shalom U'Vrachá,
```
T2 laranja, alinhado à esquerda, sem ponto final no segundo, vírgula.

### Frase salvaguarda na Correlação com a Brit Hadashá
```
É essencial reafirmar que toda correlação permanece dentro do quadro da
Toráh Kedushah e da Halacháh. A Brit Im Mashiach [ação específica desta
Aliyáh] e pratica os princípios, [lista de 2 a 3 princípios desta Aliyáh].
```

### Fechamento
```
Ken Yehi Ratzon, Shavua Tov
Rav.: EBBY
```

---

## Método PaRDeS, regras internas

### Peshat (cor C_PE)
- Análise literal, histórica, halachica.
- Fontes, Rashi, Sforno, Ibn Ezra, Ramban, Maimonides, Mishná, Talmud Bavli.
- 4 a 5 blocos analíticos.
- Cada bloco cita o versículo em negrito itálico cor da seção, análise e
  `Fonte:` ao final.
- Bullets finais com 4 a 5 itens.
- Não invade Remez, Drash nem Sod.
- Subtítulo descritivo em negrito itálico cor C_PE, sz=SZ_T2.

### Remez (cor C_RE)
- Sentido alegórico, princípios universais aludidos.
- 3 a 4 blocos.
- Bullets finais começando com `No Remez desta Aliyáh:`.
- Não invade Drash nem Sod.

### Drash (cor C_DR)
- Homilética, Midrash, Talmud aggadico, ensinamentos dos sábios.
- Fontes, Midrash Rabah, Talmud Bavli aggadah, Sifrei, Mechilta, Tanchuma,
  Pesikta, Baal Shem Tov, Rav Levi Yitzchak de Berditchev.
- 4 blocos.
- Citação interna em negrito itálico cor do nível, sem aspas.
- Bullets finais começando com `O Derash desta Aliyáh revela:`.

### Sod (cor C_SO)
- Dimensão cabalística e luriânica.
- Fontes, Zohar, Bahir, Ari haKadosh (Shaar ha-Kavvanot, Etz Chaim, Shaar
  ha-Gilgulim), Rav Moshe Cordovero.
- 4 blocos.
- Cada bloco relaciona o texto a Sefirot, Netivot, Olamot, Tikun ou Shevirah.
- Bullets finais começando com `No Sod desta Aliyáh:`.
- Nomes das Sefirot em negrito itálico na sua cor específica.

---

## Comentaristas, formato padrão

- Título T2 na cor do comentarista.
- Subtítulo descritivo em negrito itálico na cor do comentarista.
- 2 a 3 blocos analíticos.
- `Fonte:` ao final de cada bloco.
- Citação interna ao texto em negrito itálico na cor do comentarista.

### Linha de fonte (formato literal)
```
Fonte: Rashi, Perush Rashi al ha-Torah, Vayikra 25:14; Talmud Bavli, Bava Metzia 58b.
```

---

## Seção Rav EBBY, estrutura fixa

### Título
```
RAV EBBY.:
```
Cor C_EV, negrito itálico, sz=SZ_T2.

### Subtítulo
```
[NOME PARASHAT] [Nª ALIYÁH], [TEMA EM MAIÚSCULAS]
```
Cor C_EV, itálico, sz=SZ_T2.

### Abertura
```
Esta Nª Aliyáh [verbo de síntese]. [N] ensinamentos para a Brit Im Mashiach.
```

### Cada ensinamento
```
O primeiro/segundo/terceiro/quarto/quinto,
[princípio em negrito itálico cor C_EV].
[Desenvolvimento, quem ensinou + o que ensinou + Para a Brit Im Mashiach,
aplicação prática].
[Segunda frase de fechamento em negrito itálico C_EV].
```

### Bullets finais
4 a 5 bullets, um para cada ensinamento, em itálico cor C_EV.

---

## Seções Chazal, Talmud, Kabaláh, Mussar

### Chazal
- Título, `À luz da tradição de Chazal, aprendemos`.
- Abertura geral.
- 3 blocos com Midrash e Talmud aggadico.
- `Fonte:` ao final de cada bloco.

### Talmud
- Título, `Talmud`.
- Abertura, `Os tratados mais relevantes para esta Aliyáh são [lista]`.
- 2 a 3 blocos com análise talmúdica.
- `Fonte:` ao final.

### Kabaláh
- Título, `Kabaláh, Zohar e Bahir sobre a Aliyáh`.
- Abertura sobre o que o Zohar revela.
- 2 a 3 blocos zoháricos e luriânicos.
- Nomes das Sefirot em negrito itálico na cor específica.

### Mussar
- Título, `Mussar, a Ética da Toráh nos ensina` (cor C_MT).
- Subtítulo descritivo em negrito itálico cor C_MU.
- Abertura, `O Mussar desta Aliyáh entrega três práticas concretas.`
- 3 práticas:
  - `Primeira prática,` em negrito itálico C_MU, princípio, fonte clássica,
    aplicação prática em negrito itálico.
  - Idem para Segunda e Terceira.
- Fontes obrigatórias, Mesilat Yesharim, Or Yisrael, Chochmah U'Mussar,
  Michtav me-Eliyahu.
- Bullets finais com `Três práticas desta Aliyáh:` como primeiro bullet.

---

## Correlação com a Brit Hadashá

1. Nunca citar versículos da Brit Hadashá com referência (Mateus, João, etc.).
2. Correlação por princípio, jamais por texto.
3. Sempre enquadrar dentro da Toráh e da Halacháh.
4. Sempre `Brit Hadashá`, nunca `Novo Testamento`.
5. 2 a 3 parágrafos + frase salvaguarda no último.

---

## Sefirot, modelo luriânico

### Dez Sefirot
```
Keter      C_KE   D9D9D9   vontade primordial, Ein Sof
Chochmah   C_CH   BFBFBF   sabedoria, primeira luz
Bináh      C_BI   074F6A   compreensão, matriz
Chesed     C_CS   A6A6A6   bondade, amor
Gevura     C_GE   EE0000   rigor, julgamento
Tiferet    C_TI   FFC000   beleza, equilíbrio
Netzach    C_NE   D86DCB   vitória, persistência
Hod        C_NE   D86DCB   gratidão, esplendor
Yessod     C_YE   E97132   fundamento, canal
Malchut    C_MA   663300   reino, receptora, Shechináh
```

### Netivot, 22 caminhos
Cada letra conecta duas Sefirot no Etz Chaim. Conexões frequentes:
```
Alef    Keter para Chochmah
Bet     Chochmah para Bináh
Guimel  Keter para Tiferet
Dalet   Chesed para Netzach (no Modelo Netivot Rav EBBY, Keter para Tiferet, camada 13)
Hei     Chochmah para Bináh
Zayin   Bináh para Tiferet
Chet    Gevura para Bináh
Tet     Chesed para Gevura
Yud     Keter para Chochmah (variante)
Lamed   Chesed para Tiferet
Mem     Bináh para Tiferet
Nun     Tiferet para Yessod
Peh     Bináh para Gevura
Resh    Tiferet para Yessod (caminho único no Modelo Rav EBBY)
Shin    Chochmah para Tiferet
Tav     Yessod para Malchut
```

### Estrutura da seção
- 3 a 4 Sefirot ativas nesta Aliyáh.
- Cada uma, nome em negrito itálico sz=28 cor da Sefiráh + relação com o texto
  + Netiva ativo (letra + conexão).
- `Os Netivot ativos nesta Aliyáh:` + bullets de cada Netiv ativo.

### Síntese Sefirótica
- Bullets das Sefirot (cada uma na sua cor).
- Bullets dos Netivot (cor C_NET).
- Separados visualmente.

---

## Conclusão e Poesia

### Conclusão, 5 parágrafos
```
1, síntese geral
2, No Peshat,
3, No Remez,
4, No Drash,
5, No Sod,
```

### Poesia final
```
[versículo em transliteração]
[tradução em português]
[3 a 7 linhas curtas contemplativas]
```
Itálico, alinhado à esquerda, SP_XS, cada linha um parágrafo.

---

## Obras-fonte padrão por seção

### Peshat
Rashi, Ibn Ezra, Ramban, Sforno, Rashbam, Maimonides (Mishne Torah), Mishná,
Talmud Bavli.

### Drash
Midrash Rabah (Bereshit, Shemot, Vayikra, Bamidbar, Devarim), Tanchuma,
Mechilta, Sifra, Sifrei, Pesikta de-Rav Kahana, Pesikta Rabati, Midrash
Tehilim, Talmud Bavli aggadah, Baal Shem Tov (Keter Shem Tov), Kedushat Levi.

### Sod
Zohar, Bahir, Ari haKadosh (Shaar ha-Gilgulim, Shaar ha-Kavvanot, Etz Chaim,
Shaar ha-Pesukim, Sefer ha-Likutim).

### Mussar
Mesilat Yesharim, Or Yisrael, Chochmah U'Mussar, Michtav me-Eliyahu.

### Halacháh
Maimonides (Mishne Torah), Shulchan Aruch.

### Política de citação
- Capítulo, seção ou folio sempre que disponível.
- Zohar, parashat e folio (ex: Zohar, Behar 108b).
- Talmud, tratado e folio (ex: Talmud Bavli, Bava Metzia 58b).
- Midrash, parashat ou capítulo (ex: Midrash Vayikra Rabah 33:1).
- Maimonides, livro de leis e capítulo:halacháh.
- Mussar, obra e capítulo ou número de carta.

---

## Nomenclatura de arquivos

```
[NNa]_Parashat_[Nome]_[Na]_Aliyah.docx

Exemplos:
  01a_Parashat_Bereshit_1a_Aliyah.docx
  34a_Parashat_Bamidbar_1a_Aliyah.docx
  33a_Parashat_Behar_2a_Aliyah.docx
```

---

## Checklist antes de entregar

- [ ] Português revisado, sem erros gramaticais ou de acentuação.
- [ ] Zero travessões.
- [ ] Zero aspas tipográficas ou retas para destaque.
- [ ] Zero espaço antes de vírgulas.
- [ ] 7 termos-chave.
- [ ] Hebraico com nikud.
- [ ] Transliteração e tradução completas.
- [ ] PaRDeS com 4 níveis completos e bullets finais.
- [ ] 4 comentaristas com fontes.
- [ ] Rav EBBY com 4 a 5 ensinamentos.
- [ ] Chazal, Talmud, Kabaláh, Mussar.
- [ ] Brit Hadashá com frase salvaguarda.
- [ ] Sefirot e Síntese Sefirótica com Netivot.
- [ ] Conclusão com resumo dos 4 níveis.
- [ ] Poesia final.
- [ ] Ken Yehi Ratzon e Rav.: EBBY com formatação exata.

---

## Títulos, quando usar T1, T2 e texto simples

### T1, HeadingLevel.HEADING_1
- Fonte Calibri, 34 half-points (17pt), bold, cor C_T1 `2E74B5`, centralizado.
- Espaçamento, `before=280` twips (14pt), `after=0`, linha `380` (LineRuleType.AUTO).

Usar T1 em:
- Nome da Parashat na capa, exemplo `34ª Parashat BAMIDBAR`.
- Versículos da Aliyáh na capa, exemplo `Bamidbar 1:1 a 1:19`.
- Título da Aliyáh na capa, parágrafo com TextRun misto (texto + hebraico + texto).
- `PARDES, As Quatro Dimensões da Toráh`.
- `Comentários dos Sábios`.
- `À luz da tradição de Chazal, aprendemos`.
- `Talmud`.
- `Kabaláh, Zohar e Bahir sobre a Aliyáh`.
- `Mussar, a Ética da Toráh nos ensina`, com cor C_MT `0C3512` (verde muito escuro).
- `Correlação Geral com a Brit Hadashá`.
- `Sefirot Relacionadas com a Nª Aliyáh de [Parashat]`.
- `Síntese Sefirótica da Nª Aliyáh de [Parashat]`.
- `Conclusão`.

### T2, HeadingLevel.HEADING_2
- Fonte Calibri, 26 half-points (13pt), bold, cor C_T1 padrão ou cor do nível, alinhado à esquerda.
- Espaçamento, `before=120` twips (6pt), `after=0`.

Usar T2 em:
- `Boker Tov!`, cor C_OR `FF9900`.
- `Shalom U'Vrachá,`, cor C_OR `FF9900`.
- `Termos-Chave desta Aliyáh`, cor C_T1.
- `Texto Hebraico`, cor C_T1, alinhamento RIGHT (exceção).
- `Transliteração`, cor C_T1.
- `Tradução Fiel`, cor C_T1.
- `Peshat.:`, cor C_PE `4EA72E`.
- `Remez.:`, cor C_RE `215E99` (cor do nível).
- `Sod.:`, cor C_SO `7030A0`.
- `RASHI.:`, cor C_RA `275317`.
- `Ibn Ezra.:`, cor C_IE `0F9ED5`.
- `Ramban`, cor C_RB `8DD873`, sem ponto.
- `Sforno.:`, cor C_SF `074F6A`.
- Subtítulos intermediários (`Quadro do Censo`, `Os Quatro Acampamentos`), cor C_PE.

### Drash, formato especial, NÃO é T2 padrão
Drash usa parágrafo direto com TextRun bold itálico tamanho 28 half-points cor C_DR `80340D`,
não HeadingLevel.

### Rav EBBY, formato especial
- Título principal `Rav EBBY.:`, T2 cor C_EV `77206D`.
- Subtítulo descritivo `[PARASHAT] [Nª ALIYAH], [TEMA EM MAIÚSCULAS]`, itálico cor C_EV, SZ_T2.

### Mussar, formato especial
- Título principal `Mussar, a Ética da Toráh nos ensina`, T1 cor C_MT.
- Subtítulo descritivo `[Tema da Mussar desta Aliyáh]`, bold itálico cor C_MU, SZ_T2.

---

## Bordas de parágrafo, especificações técnicas

### Separador de seção, função `sep()`
- Lado, `bottom`.
- Estilo, `SINGLE`.
- Espessura, `size=6`, equivale a 0,75pt.
- Cor, C_T1 `2E74B5` (azul T1, não C_NAVY).
- Espaço para texto, `space=1`.
- Espaçamento do parágrafo, `before=60` twips (3pt), `after=200` twips (10pt).

### Cabeçalho, borda inferior
- Lado, `bottom`.
- Estilo, `SINGLE`.
- Espessura, `size=4`, equivale a 0,5pt.
- Cor, C_NAVY `00204F`.

### Rodapé, borda superior
- Lado, `top`.
- Estilo, `SINGLE`.
- Espessura, `size=4`, equivale a 0,5pt.
- Cor, C_NAVY `00204F`.

### Títulos T1 principais, sem borda
Os títulos T1 de seção (PARDES, Comentários dos Sábios, etc.) não recebem borda inferior.
O peso visual é dado pelo tamanho, cor e centralização, não por linha.

### Blocos coloridos opcionais (acampamento, clã)
- `top`, SINGLE, `size=6` (0,75pt), cor do bloco.
- `bottom`, SINGLE, `size=2` (0,25pt), cor do bloco.
- `left`, THICK, `size=16` (2pt), cor do bloco.
- `right`, NONE.

### Tabela de conversão de espessuras docx
| size | pontos |
|------|--------|
| 2    | 0,25pt |
| 4    | 0,50pt |
| 6    | 0,75pt |
| 8    | 1,00pt |
| 12   | 1,50pt |
| 16   | 2,00pt |
| 24   | 3,00pt |

---

## Constantes de tipografia, referência rápida

```
FONT     = 'Open Sans'    # corpo
FONT_HEB = 'Shlomo Stam'  # hebraico
FONT_T   = 'Calibri'      # títulos

SZ      = 24   # corpo, 24 half-points = 12pt
SZ_HEB  = 26   # hebraico, 13pt
SZ_T1   = 34   # título 1, 17pt
SZ_T2   = 26   # título 2, 13pt

LN      = 380  # espaçamento entre linhas, LineRuleType.AUTO
SP      = 180  # espaço após parágrafo normal
SP_HEB  = 100  # espaço após linha hebraica
SP_XS   = 60   # espaço após bullet ou fonte

# Página A4
# width  11906 twips
# height 16838 twips
# margens 1440 twips em todos os lados, 2,54cm
```

---

## Funções helper canônicas (JS docx, referência)

```javascript
// Parágrafo simples
function cp(t, after) {
  return par([rn(t)], AlignmentType.JUSTIFIED, after||SP);
}

// Parágrafo com segmentos coloridos/formatados
function cm(segs, after) {
  return par(segs.map(s => r(s.t, s.c, s.b, s.i, s.sz)), AlignmentType.JUSTIFIED, after||SP);
}

// Bullet (itálico, alinhado à esquerda)
function po(t, c, b) {
  return par([r(t, c||null, b||false, true)], AlignmentType.LEFT, SP_XS);
}

// Linha de fonte (itálico tamanho 20)
function fonte(t) {
  return par([r(t, null, false, true, 20)], AlignmentType.LEFT, SP_XS);
}

// Linha hebraica
function hebp(t) {
  return par([rh(t)], AlignmentType.RIGHT, SP_HEB);
}

// Espaço vertical
function vz(n) {
  return par([rn('')], AlignmentType.LEFT, n||120);
}

// Separador de seção
function sep() {
  return par([rn('')], AlignmentType.LEFT, 200, 60, {
    bottom: { style: BorderStyle.SINGLE, size: 6, color: C_T1, space: 1 }
  });
}

// Termo-chave
function termo(heb, translit, trad, expl) {
  return par([
    r('\u25b8 ', C_T1, true),
    r(heb+' ', null, false, false, SZ_HEB, FONT_HEB),
    r('('+translit+') ', C_T1, true),
    r(trad+'. ', null, true),
    r(expl)
  ], AlignmentType.JUSTIFIED, SP_XS);
}

// Título nível 1
function T1(t, c) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { before: 280, after: 0, line: LN, lineRule: LineRuleType.AUTO },
    children: [new TextRun({ text: t, font: FONT_T, size: SZ_T1, color: c||C_T1, bold: true })]
  });
}

// Título nível 2
function T2(t, c, a) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: a || AlignmentType.LEFT,
    spacing: { before: 120, after: 0, line: LN, lineRule: LineRuleType.AUTO },
    children: [new TextRun({ text: t, font: FONT_T, size: SZ_T2, color: c||C_T1, bold: true })]
  });
}
```

---

*Atualizado a cada nova Aliyáh.*
*Congregação Brit Im Mashiach, Franca SP, 5786.*
