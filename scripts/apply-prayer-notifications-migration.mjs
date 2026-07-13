#!/usr/bin/env node
/**
 * Aplica a migration de notificações + resposta a pedidos de oração via conexão Postgres direta.
 * Requer SUPABASE_DB_URL em .env.local (Settings → Database → Connection string URI).
 *
 * Uso:
 *   npx tsx --env-file=.env.local scripts/apply-prayer-notifications-migration.mjs
 *   npm run apply:prayer-notifications-migration
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

1. Supabase Dashboard → Settings → Database → Connection string → URI
2. Adicione em .env.local:
   SUPABASE_DB_URL=postgresql://postgres.[ref]:[SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres

3. Rode novamente:
   npx tsx --env-file=.env.local scripts/apply-prayer-notifications-migration.mjs

Alternativa manual: cole o SQL de supabase/migrations/20260713_prayer_notifications.sql
no SQL Editor do Supabase Studio.
`)
  process.exit(1)
}

const migrationPath = join(__dirname, '..', 'supabase', 'migrations', '20260713_prayer_notifications.sql')
const sql = readFileSync(migrationPath, 'utf8')

const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  console.log('Conectado ao Postgres. Aplicando migration 20260713_prayer_notifications.sql...')
  await client.query(sql)
  console.log('Migration aplicada com sucesso.')

  const verify = await client.query(`
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'prayer_requests'
      and column_name in ('response_text', 'responded_by', 'responded_at')
    order by column_name
  `)
  const cols = verify.rows.map((r) => r.column_name)

  const notifTable = await client.query(`
    select table_name from information_schema.tables
    where table_schema = 'public' and table_name = 'notifications'
  `)

  const ok = cols.length === 3 && notifTable.rows.length === 1
  if (ok) {
    console.log('APROVADO: colunas prayer_requests:', cols.join(', '), '| tabela notifications criada.')
  } else {
    console.error('REVISAR: colunas encontradas:', cols, '| notifications existe:', notifTable.rows.length === 1)
    process.exit(1)
  }
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err)
  console.error('Falha ao aplicar migration:', msg)
  process.exit(1)
} finally {
  await client.end()
}
