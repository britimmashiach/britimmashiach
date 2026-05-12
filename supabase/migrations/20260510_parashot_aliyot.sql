-- Adiciona pdf_url à tabela parashot (se ainda não existir)
ALTER TABLE parashot
  ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- Cria a tabela de aliyot
CREATE TABLE IF NOT EXISTS aliyot (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parasha_id      UUID NOT NULL REFERENCES parashot(id) ON DELETE CASCADE,
  aliyah_number   SMALLINT NOT NULL CHECK (aliyah_number BETWEEN 1 AND 7),
  day_of_week     SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  title           TEXT NOT NULL,
  content         TEXT NOT NULL DEFAULT '',
  level_pardes    TEXT[] DEFAULT '{}',
  pdf_url         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (parasha_id, aliyah_number)
);

-- Índice para busca por parasha
CREATE INDEX IF NOT EXISTS aliyot_parasha_id_idx ON aliyot (parasha_id, aliyah_number);

-- RLS
ALTER TABLE aliyot ENABLE ROW LEVEL SECURITY;

-- Leitura pública (conteúdo exibido no site)
CREATE POLICY "aliyot_public_read"
  ON aliyot FOR SELECT
  USING (true);

-- Escrita apenas para admins autenticados
CREATE POLICY "aliyot_admin_write"
  ON aliyot FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
