#!/usr/bin/env node
/**
 * Verifica se chagim tem colunas peshat/remez/drash/sod.
 * Uso: npx tsx --env-file=.env.local scripts/check-chag-pardes-migration.mjs
 */
import { createClient } from '@supabase/supabase-js'

const COLS = ['peshat', 'remez', 'drash', 'sod']
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })
const missing = []

for (const col of COLS) {
  const { error } = await supabase.from('chagim').select(col).limit(1)
  if (error) missing.push({ col, message: error.message })
}

if (missing.length === 0) {
  console.log('OK: colunas PaRDeS presentes em chagim.')
  const { data } = await supabase.from('chagim').select('slug, peshat').limit(3)
  const withContent = (data ?? []).filter((r) => (r.peshat ?? '').length > 50).length
  console.log(`Amostra: ${withContent}/${data?.length ?? 0} com peshat preenchido (amostra de 3).`)
  process.exit(0)
}

console.error('Faltam colunas PaRDeS em chagim:\n')
for (const m of missing) console.error(`  - ${m.col}: ${m.message}`)
console.error(`
Execute no Supabase SQL Editor:
  supabase/run_once_chag_pardes_full.sql

Ou configure SUPABASE_DB_URL e rode: npm run chag:pardes:migrate
`)
process.exit(1)
