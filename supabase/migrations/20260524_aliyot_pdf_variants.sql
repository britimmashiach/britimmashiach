-- Garante colunas de PDF premium/kabbalah em aliyot e parashot (idempotente).
-- Necessário para queries do proxy /api/pdf e UI de variantes.

ALTER TABLE public.aliyot
  ADD COLUMN IF NOT EXISTS pdf_premium_url TEXT,
  ADD COLUMN IF NOT EXISTS pdf_kabbalah_url TEXT;

ALTER TABLE public.parashot
  ADD COLUMN IF NOT EXISTS pdf_premium_url TEXT,
  ADD COLUMN IF NOT EXISTS pdf_kabbalah_url TEXT;

COMMENT ON COLUMN public.aliyot.pdf_premium_url IS 'Path relativo no bucket parashot-pdfs (Premium).';
COMMENT ON COLUMN public.aliyot.pdf_kabbalah_url IS 'Path relativo no bucket parashot-pdfs (Admin/Kabbalah).';
