#!/usr/bin/env node
/**
 * Aplica migration PaRDeS em chagim via Postgres direto.
 * Requer SUPABASE_DB_URL em .env.local
 *
 * Uso: npx tsx --env-file=.env.local scripts/apply-chag-pardes-migration.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbUrl = process.env.SUPABASE_DB_URL?.trim()

if (!dbUrl) {
  console.error(`
SUPABASE_DB_URL não configurada.

Supabase → Settings → Database → Connection string → URI
Adicione em .env.local e rode novamente.

Alternativa: cole supabase/apply_chag_pardes_all.sql no SQL Editor.
`)
  process.exit(1)
}

const migrationPath = join(__dirname, '..', 'supabase', 'migrations', '20260604_chagim_pardes.sql')
const sql = readFileSync(migrationPath, 'utf8')

const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  console.log('Conectado. Aplicando 20260604_chagim_pardes.sql...')
  await client.query(sql)

  const verify = await client.query(`
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'chagim'
      and column_name in ('peshat', 'remez', 'drash', 'sod')
    order by column_name
  `)
  const cols = verify.rows.map((r) => r.column_name)
  console.log('Colunas em chagim:', cols.join(', ') || '(nenhuma)')
  if (cols.length === 4) {
    console.log('Migration PaRDeS OK.')
  } else {
    console.warn('Esperadas 4 colunas; verifique manualmente.')
    process.exit(1)
  }
} catch (err) {
  console.error('Erro:', err instanceof Error ? err.message : err)
  process.exit(1)
} finally {
  await client.end()
}
