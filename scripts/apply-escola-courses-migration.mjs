/**
 * Aplica migration escola_courses no Supabase (DATABASE_URL ou SUPABASE_DB_URL).
 * Depois: npm run seed:escola
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const sqlPath = resolve(__dirname, '../supabase/migrations/20261109_escola_courses.sql')
const url = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL

if (!url) {
  console.error('Defina DATABASE_URL ou SUPABASE_DB_URL')
  process.exit(1)
}

const sql = readFileSync(sqlPath, 'utf8')
const client = new pg.Client({ connectionString: url })

try {
  await client.connect()
  await client.query(sql)
  console.log('OK: migration escola_courses aplicada.')
} catch (e) {
  console.error(e)
  process.exit(1)
} finally {
  await client.end()
}
