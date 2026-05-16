-- =============================================================
-- 2026-05-16 — Marca conteúdo Premium curado
-- =============================================================
-- Objetivo: dar diferença real entre Free e Premium imediatamente.
-- Tudo aqui é idempotente (UPDATE por slug). Rode quantas vezes precisar.
--
-- Política editorial:
--   Free: 1ª Aliyáh (Domingo) de cada Parasháh, parashot do começo do ciclo
--         (Bereshit/Shemot) totalmente livres, e estudos introdutórios.
--   Premium: parashot da segunda metade do ciclo (mais profundidade kabalística),
--         estudos de Kabaláh Luriana, Modelo Netivot, Alef-Beit avançado,
--         e Chagim com seções de Sod.
-- =============================================================

-- -------------------------------------------------------------
-- STUDIES — marca como premium os estudos avançados/exclusivos
-- -------------------------------------------------------------
UPDATE public.studies
   SET is_premium = TRUE
 WHERE slug IN (
   'kabbalah-lurianic-sefirot',
   'introducao-kabbalah-luriana',
   'netivot-alef-keter'
 );

-- Mantém explícito quais são livres (caso já tenham sido marcados em outro lugar)
UPDATE public.studies
   SET is_premium = FALSE
 WHERE slug IN (
   'bereshit-pardes',
   'tehilim-1-peshat',
   'pesach-libertacao-espiritual',
   'alef-beit-alef'
 );

-- -------------------------------------------------------------
-- PARASHOT — Vayikra, Bamidbar e Devarim ficam premium
-- (livros com camadas kabalísticas e haláchicas mais densas;
--  Bereshit e Shemot permanecem livres para evangelização e atração)
-- -------------------------------------------------------------
UPDATE public.parashot
   SET is_premium = TRUE
 WHERE book IN ('Vayikrá', 'Bamidbar', 'Devarim');

UPDATE public.parashot
   SET is_premium = FALSE
 WHERE book IN ('Bereshit', 'Shemot');

-- -------------------------------------------------------------
-- CHAGIM — Chagim com profundidade de Sod ficam premium completo;
-- os principais do ano (Pesach, Shavuot, Sucot, Rosh Hashanáh, Yom Kippur)
-- ficam livres, com seções de Sod/Kavannot marcadas como premium.
-- -------------------------------------------------------------
UPDATE public.chagim
   SET is_premium = FALSE
 WHERE slug IN (
   'pesach',
   'shavuot',
   'sucot',
   'rosh-hashanah',
   'yom-kippur',
   'chanuca',
   'purim'
 );

-- Chag totalmente premium (estudo kabalístico aprofundado)
UPDATE public.chagim
   SET is_premium = TRUE
 WHERE slug IN (
   'tu-bishvat',
   'lag-baomer',
   'shemini-atzeret',
   'simchat-torah',
   'tu-beav'
 );

-- -------------------------------------------------------------
-- CHAG_SECTIONS — seções de Sod e Kavannot sempre premium,
-- mesmo que o Chag em si esteja livre
-- -------------------------------------------------------------
UPDATE public.chag_sections cs
   SET is_premium = TRUE
  FROM public.chagim c
 WHERE cs.chag_id = c.id
   AND (
     'sod' = ANY(cs.level_pardes)
     OR lower(cs.title) LIKE '%kavannot%'
     OR lower(cs.title) LIKE '%kavanot%'
     OR lower(cs.title) LIKE '%kabalá%'
     OR lower(cs.title) LIKE '%kabalah%'
     OR lower(cs.title) LIKE '%luriana%'
     OR lower(cs.title) LIKE '%arizal%'
   );

-- -------------------------------------------------------------
-- LIBRARY_BOOKS — garante que o critério premium da listagem fica
-- coerente com a página /premium (Modelo Netivot, 49 Portões,
-- Alef-Beit avançado, Etz Chaim, Toráh completa)
-- -------------------------------------------------------------
UPDATE public.library_books
   SET is_premium = TRUE
 WHERE lower(title) LIKE '%netivot%'
    OR lower(title) LIKE '%49 portões%'
    OR lower(title) LIKE '%49 portoes%'
    OR lower(title) LIKE '%etz chaim%'
    OR lower(title) LIKE '%alef-beit avançado%';

UPDATE public.library_books
   SET is_premium = FALSE
 WHERE lower(title) LIKE '%siddur%'
    OR lower(title) LIKE '%tehilim%'
    OR lower(title) LIKE '%calendário%'
    OR lower(title) LIKE '%calendario%';
