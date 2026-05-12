-- Adiciona colunas ausentes à tabela aliyot
-- day_of_week e level_pardes estão na definição original (20260510_parashot_aliyot.sql)
-- mas não foram criadas na instância atual do Supabase.

ALTER TABLE public.aliyot
  ADD COLUMN IF NOT EXISTS day_of_week  SMALLINT NOT NULL DEFAULT 0
    CHECK (day_of_week BETWEEN 0 AND 6),
  ADD COLUMN IF NOT EXISTS level_pardes TEXT[]   NOT NULL DEFAULT '{}';

-- Backfill das 378 linhas existentes
-- Convenção: Aliyah 1 = Yom Rishon (0) ... Aliyah 7 = Shabbat (6)
UPDATE public.aliyot
  SET day_of_week = aliyah_number - 1
  WHERE day_of_week = 0 AND aliyah_number > 1;
