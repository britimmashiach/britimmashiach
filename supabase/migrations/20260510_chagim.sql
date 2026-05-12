-- Adiciona colunas de PDF premium/kabbalah às tabelas existentes

ALTER TABLE parashot
  ADD COLUMN IF NOT EXISTS pdf_premium_url TEXT,
  ADD COLUMN IF NOT EXISTS pdf_kabbalah_url TEXT;

ALTER TABLE aliyot
  ADD COLUMN IF NOT EXISTS pdf_premium_url TEXT,
  ADD COLUMN IF NOT EXISTS pdf_kabbalah_url TEXT;

-- Cria tabela de Chagim
CREATE TABLE IF NOT EXISTS chagim (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  name_hebrew      TEXT NOT NULL,
  category         TEXT NOT NULL DEFAULT 'minor',
  month_hebrew     TEXT,
  day_start        SMALLINT,
  duration_days    SMALLINT NOT NULL DEFAULT 1,
  summary          TEXT NOT NULL DEFAULT '',
  content          TEXT NOT NULL DEFAULT '',
  level_pardes     TEXT[] DEFAULT '{}',
  is_premium       BOOLEAN NOT NULL DEFAULT false,
  pdf_url          TEXT,
  pdf_premium_url  TEXT,
  pdf_kabbalah_url TEXT,
  published_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índice de slug para busca rápida
CREATE INDEX IF NOT EXISTS chagim_slug_idx ON chagim (slug);
CREATE INDEX IF NOT EXISTS chagim_category_idx ON chagim (category);

-- Cria tabela de seções dos Chagim
CREATE TABLE IF NOT EXISTS chag_sections (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chag_id      UUID NOT NULL REFERENCES chagim(id) ON DELETE CASCADE,
  order_num    SMALLINT NOT NULL DEFAULT 1,
  title        TEXT NOT NULL,
  content      TEXT NOT NULL DEFAULT '',
  level_pardes TEXT[] DEFAULT '{}',
  is_premium   BOOLEAN NOT NULL DEFAULT false,
  pdf_url      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (chag_id, order_num)
);

CREATE INDEX IF NOT EXISTS chag_sections_chag_id_idx ON chag_sections (chag_id, order_num);

-- RLS: chagim
ALTER TABLE chagim ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chagim_public_read"
  ON chagim FOR SELECT
  USING (true);

CREATE POLICY "chagim_admin_write"
  ON chagim FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- RLS: chag_sections
ALTER TABLE chag_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chag_sections_public_read"
  ON chag_sections FOR SELECT
  USING (true);

CREATE POLICY "chag_sections_admin_write"
  ON chag_sections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
