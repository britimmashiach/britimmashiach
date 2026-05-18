-- Sincroniza o estudo Netivot com o Modelo Fixo (PDF em library-pdfs)
update public.studies
   set title = 'Netivot: O Caminho Alef-Keter',
       title_hebrew = 'נְתִיבוֹת',
       excerpt = 'Modelo Fixo de Netivot do Rav EBBY: os 22 caminhos (11 a 32) da Etz Chaim, com letras, Sefirot e Olamot. Entrada pelo caminho 11 (Hei, Keter → Chochmah).',
       content = 'Este estudo integra o Modelo Fixo de Netivot (acervo premium da congregação).

## Visão geral

Os 22 Netivot são os canais que conectam as dez Sefirot da Árvore da Vida. Cada caminho corresponde a uma letra do Alef-Beit e transporta um Shefa específico entre as Sefirot. A numeração começa em 11, pois as dez Sefirot já perfazem dez caminhos no modelo.

O documento completo está no PDF logo abaixo (referência fixa Luriânica, Método Rav EBBY).

## Caminho 11 — Hei (Keter → Chochmah)

Fluxo inicial da vontade divina para o ponto de sabedoria primordial. É a porta de entrada recomendada para estudar o modelo antes de percorrer os demais caminhos até o 32 (Tav, Yesod → Malchut).

---

Também disponível na Biblioteca Espiritual, seção Kabaláh.',
       category = 'netivot',
       is_premium = true,
       reading_time_minutes = 20,
       tags = array['netivot', 'modelo-fixo', 'alef', 'keter', 'etz-chaim']::text[],
       published_at = coalesce(published_at, '2026-01-04T12:00:00.000Z'::timestamptz)
 where slug = 'netivot-alef-keter';
