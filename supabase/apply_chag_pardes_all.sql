-- Execute UMA vez no Supabase SQL Editor
ALTER TABLE chagim
  ADD COLUMN IF NOT EXISTS peshat TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS remez TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS drash TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS sod TEXT NOT NULL DEFAULT '';

-- Depois, no PC (pasta brit-mashiach):
--   npm run chag:pardes:deploy
