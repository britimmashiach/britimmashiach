#!/usr/bin/env node
// Lê C:/.../data/chagim/<slug>/ e gera supabase/seed_chag_<slug>.sql
// Uso: node scripts/build-chag-seed.mjs shabat
//
// Estrutura esperada do diretório do Chag:
//   00-metadata.json         → linha em `chagim`
//   01-*.md ... NN-*.md      → 1 linha em `chag_sections` por arquivo
//
// Cada .md começa com cabeçalho:
//   # Título
//
//   **title:** ...
//   **order_num:** N
//   **level_pardes:** ["..."]
//   **is_premium:** true|false
//
//   ---
//
//   <conteúdo>
//
// O `content` salvo no banco é tudo o que vem depois do primeiro `---`,
// trimado. Os metadados vêm das linhas `**chave:** valor` do cabeçalho.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')

const slug = process.argv[2]
if (!slug) {
  console.error('Uso: node scripts/build-chag-seed.mjs <slug>')
  process.exit(1)
}

const chagDir = join(repoRoot, 'data', 'chagim', slug)
const outPath = join(repoRoot, 'supabase', `seed_chag_${slug}.sql`)

const metadata = JSON.parse(readFileSync(join(chagDir, '00-metadata.json'), 'utf8'))

function escapeSqlString(s) {
  return s.replace(/'/g, "''")
}

function parseHeader(text) {
  const sepIdx = text.indexOf('\n---\n')
  if (sepIdx === -1) throw new Error('separador --- não encontrado')
  const header = text.slice(0, sepIdx)
  const body = text.slice(sepIdx + 5).trim()
  const meta = {}
  for (const line of header.split('\n')) {
    const m = line.match(/^\*\*([a-z_]+):\*\*\s*(.+)$/)
    if (!m) continue
    const key = m[1]
    let val = m[2].trim()
    if (key === 'level_pardes') val = JSON.parse(val)
    else if (key === 'is_premium') val = val === 'true'
    else if (key === 'order_num') val = parseInt(val, 10)
    meta[key] = val
  }
  return { meta, body }
}

const sectionFiles = readdirSync(chagDir)
  .filter((f) => /^\d{2}-.+\.md$/.test(f))
  .sort()

const sections = sectionFiles.map((f) => {
  const raw = readFileSync(join(chagDir, f), 'utf8')
  const { meta, body } = parseHeader(raw)
  return { ...meta, content: body, file: f }
})

const pardesArr = (arr) => arr && arr.length
  ? `ARRAY[${arr.map((p) => `'${p}'`).join(',')}]::TEXT[]`
  : `'{}'::TEXT[]`

const lines = []
lines.push(`-- Seed do Chag: ${metadata.name} (${slug})`)
lines.push(`-- Gerado por scripts/build-chag-seed.mjs`)
lines.push(`-- Executar contra a base Supabase do projeto Brit Mashiach`)
lines.push('')
lines.push(`BEGIN;`)
lines.push('')
lines.push(`-- Idempotência: apaga (cascade) chag anterior com mesmo slug.`)
lines.push(`DELETE FROM chagim WHERE slug = '${slug}';`)
lines.push('')
lines.push(`-- Insere o Chag em si.`)
lines.push(`INSERT INTO chagim (`)
lines.push(`  slug, name, name_hebrew, category, month_hebrew, day_start,`)
lines.push(`  duration_days, summary, content, level_pardes, is_premium,`)
lines.push(`  pdf_url, pdf_premium_url, pdf_kabbalah_url`)
lines.push(`) VALUES (`)
lines.push(`  '${escapeSqlString(metadata.slug)}',`)
lines.push(`  '${escapeSqlString(metadata.name)}',`)
lines.push(`  '${escapeSqlString(metadata.name_hebrew)}',`)
lines.push(`  '${escapeSqlString(metadata.category)}',`)
lines.push(metadata.month_hebrew ? `  '${escapeSqlString(metadata.month_hebrew)}',` : `  NULL,`)
lines.push(metadata.day_start ? `  ${metadata.day_start},` : `  NULL,`)
lines.push(`  ${metadata.duration_days || 1},`)
lines.push(`  '${escapeSqlString(metadata.summary)}',`)
lines.push(`  '${escapeSqlString(metadata.content_intro || '')}',`)
lines.push(`  ${pardesArr(metadata.level_pardes)},`)
lines.push(`  ${metadata.is_premium ? 'true' : 'false'},`)
lines.push(metadata.pdf_url ? `  '${escapeSqlString(metadata.pdf_url)}',` : `  NULL,`)
lines.push(metadata.pdf_premium_url ? `  '${escapeSqlString(metadata.pdf_premium_url)}',` : `  NULL,`)
lines.push(metadata.pdf_kabbalah_url ? `  '${escapeSqlString(metadata.pdf_kabbalah_url)}'` : `  NULL`)
lines.push(`);`)
lines.push('')
lines.push(`-- Insere as seções.`)
lines.push(`WITH chag AS (SELECT id FROM chagim WHERE slug = '${slug}')`)
lines.push(`INSERT INTO chag_sections (chag_id, order_num, title, content, level_pardes, is_premium) VALUES`)

const rows = sections.map((s, i) => {
  const last = i === sections.length - 1
  return [
    `  ((SELECT id FROM chag),`,
    `   ${s.order_num},`,
    `   '${escapeSqlString(s.title)}',`,
    `   '${escapeSqlString(s.content)}',`,
    `   ${pardesArr(s.level_pardes)},`,
    `   ${s.is_premium ? 'true' : 'false'})${last ? ';' : ','}`,
  ].join('\n')
})
lines.push(rows.join('\n\n'))
lines.push('')
lines.push(`COMMIT;`)
lines.push('')

writeFileSync(outPath, lines.join('\n'), 'utf8')
console.log(`Gerado: ${outPath}`)
console.log(`Seções: ${sections.length}`)
console.log(`Total bytes: ${lines.join('\n').length}`)
