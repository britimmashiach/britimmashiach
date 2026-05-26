#!/usr/bin/env node
/**
 * Verifica se as colunas Asaas existem em profiles.
 * Se faltar alguma, imprime a SQL da migration 20260528_asaas_premium.sql.
 *
 * Uso: npx tsx --env-file=.env.local scripts/check-asaas-migration.mjs
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const REQUIRED_COLUMNS = [
  'asaas_customer_id',
  'asaas_pix_authorization_id',
  'asaas_subscription_id',
  'cpf_cnpj',
]

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY em .env.local')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })

const missing = []

for (const col of REQUIRED_COLUMNS) {
  const { error } = await supabase.from('profiles').select(col).limit(1)
  if (error) {
    missing.push({ col, message: error.message })
  }
}

if (missing.length === 0) {
  console.log('APROVADO: todas as colunas Asaas existem em profiles.')
  console.log('  - asaas_customer_id')
  console.log('  - asaas_pix_authorization_id')
  console.log('  - asaas_subscription_id')
  console.log('  - cpf_cnpj')

  const { data, error } = await supabase
    .from('profiles')
    .select('id, asaas_customer_id, asaas_pix_authorization_id, asaas_subscription_id, cpf_cnpj')
    .limit(1)

  if (error) {
    console.warn('Aviso ao ler amostra:', error.message)
  } else {
    console.log('\nAmostra (1 linha):', data?.[0] ?? '(tabela vazia)')
  }

  process.exit(0)
}

console.log('\nPENDENTE: migration Asaas ainda nao aplicada.\n')
for (const m of missing) {
  console.log(`  - ${m.col}: ${m.message}`)
}

const migrationPath = join(__dirname, '..', 'supabase', 'migrations', '20260528_asaas_premium.sql')
const sql = readFileSync(migrationPath, 'utf8')

console.log('\nRode no Supabase Studio → SQL Editor (ou supabase db push):\n')
console.log('-----')
console.log(sql.trim())
console.log('-----\n')
process.exit(1)
