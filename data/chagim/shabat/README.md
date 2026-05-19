# Shabat — Conteúdo Litúrgico Completo

Diretório contendo o conteúdo do Chag **Shabat** pronto para inserção no
Supabase do site Brit Im Mashiach.

## Estrutura dos arquivos

```
00-metadata.json            # metadados da linha `chagim` (slug, name, summary etc.)
01-capa-hero.md             # Capa Hero (briefing visual + texto-âncora)
02-o-que-e-shabat.md        # O Que é Shabat (introdução)
03-origem-biblica.md        # Origem Bíblica (Bereshit, Shemot, Devarim, Yesha'yahu)
04-significado-espiritual.md# Significado Espiritual (neshamáh yeterá, tikun)
05-perspectiva-kabalistica.md # Kabaláh luriânica (Malchut/Tiferet, Olamot, Netivot) [PREMIUM]
06-perspectiva-messianica.md# Mashiach senhor do Shabat (Brit Im Mashiach)
07-preparacao.md            # Cronograma semanal de preparação
08-horarios-estrutura-temporal.md # Horários, entrada e saída
09-liturgia-completa.md     # Acendimento, Kabalat Shabat, Lecha Dodi (9 estrofes),
                            #   Shalom Aleichem, Eshet Chayil, Kidush noite/dia,
                            #   Havdaláh, Eliyahu haNavi (Heb + Translit + Tradução)
10-guia-iniciantes.md       # Guia passo a passo para quem começa
11-leituras-do-shabat.md    # Parashat, Haftaráh, Tehilim, Pirkei Avot
12-estudos-do-shabat.md     # Programa de estudo (4 planos A/B/C/D) [PREMIUM]
13-refeicoes.md             # Três Seudot, Sefirot, cardápios tradicionais
14-brachot.md               # Brachot essenciais (referência compacta)
15-comentarios-profundos.md # PaRDeS completo do Shabat [PREMIUM]
16-conclusao.md             # Síntese e bênção final do Rav
```

## Cabeçalho dos arquivos `.md`

Cada arquivo de seção começa com:

```markdown
# Título Humano

**title:** Título salvo na coluna `title` do banco
**order_num:** N (inteiro)
**level_pardes:** ["peshat", "remez", "drash", "sod"]  (array, pode ser vazio)
**is_premium:** true | false

---

<conteúdo que vai na coluna `content`>
```

O script `scripts/build-chag-seed.mjs` parseia este formato.

## Como gerar o seed SQL

A partir da raiz do projeto:

```bash
node scripts/build-chag-seed.mjs shabat
```

Isto gera `supabase/seed_chag_shabat.sql` com:

1. `BEGIN; DELETE FROM chagim WHERE slug = 'shabat';` (idempotente; remove versão anterior em cascade)
2. `INSERT INTO chagim (...)` com os metadados do `00-metadata.json`
3. 16 `INSERT INTO chag_sections (...)` com o conteúdo de cada arquivo `.md`
4. `COMMIT;`

## Como aplicar ao Supabase

### Opção 1 — Console SQL do Supabase (recomendado para primeira execução)

1. Abra o Supabase Studio do projeto Brit Mashiach.
2. Vá em **SQL Editor**.
3. Cole o conteúdo de `supabase/seed_chag_shabat.sql`.
4. Execute. A transação é envolvida em `BEGIN/COMMIT`.
5. Verifique no Table Editor que `chagim` tem uma linha `slug='shabat'` e `chag_sections` tem 16 linhas associadas.

### Opção 2 — `supabase db push` via CLI

Se você gerencia migrations via CLI, mova o arquivo para
`supabase/migrations/YYYYMMDDHHMMSS_chag_shabat.sql` e rode `supabase db push`.

**Atenção:** este seed não é uma migration de schema (não cria tabelas).
A migration `20260510_chagim.sql` já criou `chagim` e `chag_sections`. Este é
apenas conteúdo. Recomendo manter como `seed_chag_shabat.sql` separado das
migrations, e executá-lo manualmente no SQL Editor.

## Atualizando conteúdo

Para alterar qualquer seção:

1. Edite o arquivo `.md` correspondente.
2. Rode `node scripts/build-chag-seed.mjs shabat` novamente.
3. Re-execute o SQL gerado no Supabase. Como há `DELETE` no topo, a versão
   anterior é substituída integralmente (idempotente).

## Edição em produção

Como `chagim` tem RLS com policy `chagim_admin_write`, apenas usuários com
`role='admin'` na tabela `profiles` podem inserir/atualizar via aplicação.
O SQL Editor do Supabase Studio rouda como `postgres` superusuário e
contorna o RLS automaticamente.

## Bloqueio de PDFs

Os campos `pdf_url`, `pdf_premium_url`, `pdf_kabbalah_url` ficam `NULL` neste
seed. PDFs litúrgicos (Sidur de Shabat com Open Sans / Shlomo Stam) serão
gerados em paralelo no estilo das Aliyot, conforme protocolo em
`docs/metodo-rav-ebby.md`. Quando prontos, atualizar:

```sql
UPDATE chagim
   SET pdf_url = 'shabat/sidur-shabat.pdf'
 WHERE slug = 'shabat';
```

E subir o arquivo ao Storage bucket `parashot-pdfs` (mesmo bucket usado pelos
PDFs dos Chagim na rota `/api/pdf/chag/[id]`).

## Marcação de seções premium

Três seções são `is_premium=true`:

▸ **05 — Perspectiva Kabalística** (núcleo luriânico, Sefirot, Netivot)
▸ **12 — Estudos do Shabat** (programa avançado A/B/C/D)
▸ **15 — Comentários Profundos** (PaRDeS completo do Shabat)

Estas só aparecem para usuários com `role='premium'` ou `role='admin'`.
As demais 13 seções ficam abertas para qualquer visitante, garantindo:

▸ Funil de conversão: visitante lê 13 seções gratuitas (~18 mil palavras),
  vê a profundidade real, e sente o valor dos 3 blocos bloqueados.
▸ Indexabilidade SEO: o grosso do conteúdo é público, gera tráfego orgânico.
▸ Compartilhabilidade: o material aberto é forte o suficiente para ser
  enviado no WhatsApp da família toda sexta-feira.

## Próximos passos

Após validação visual no site, replicar o mesmo padrão para:

1. **Shavuot** (próximo no calendário, 31-mai/01-jun 5786)
2. **Yamim Noraim** (Rosh Hashanáh + Yom Kippur, queue para agosto)
3. Demais Chagim conforme demanda
