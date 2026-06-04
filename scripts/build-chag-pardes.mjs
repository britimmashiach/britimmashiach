#!/usr/bin/env node
// Gera supabase/seed_chag_pardes_<slug>.sql a partir de data/chagim/<slug>/pardes/*.md
// Uso: node scripts/build-chag-pardes.mjs pessach
//      node scripts/build-chag-pardes.mjs --all

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const LEVELS = ['peshat', 'remez', 'drash', 'sod']

/** PostgreSQL: literais com aspas simples não podem ter quebras de linha. Usar dollar-quoting. */
function dollarQuote(tag, s) {
  let t = tag
  let n = 0
  while (s.includes(`$${t}$`)) {
    t = `${tag}_${++n}`
  }
  return `$${t}$${s}$${t}$`
}

function readLevel(chagDir, level) {
  const path = join(chagDir, 'pardes', `${level}.md`)
  if (!existsSync(path)) return ''
  const raw = readFileSync(path, 'utf8').trim()
  const sepIdx = raw.indexOf('\n---\n')
  if (sepIdx === -1) return raw
  return raw.slice(sepIdx + 5).trim()
}

function buildSeed(slug) {
  const chagDir = join(repoRoot, 'data', 'chagim', slug)
  if (!existsSync(chagDir)) {
    console.error(`Diretório não encontrado: ${chagDir}`)
    process.exit(1)
  }

  const fields = {}
  for (const level of LEVELS) {
    fields[level] = readLevel(chagDir, level)
  }

  const hasAny = LEVELS.some((l) => fields[l].length > 0)
  if (!hasAny) {
    console.warn(`[${slug}] Nenhum arquivo em pardes/ — pulando`)
    return false
  }

  const outPath = join(repoRoot, 'supabase', `seed_chag_pardes_${slug}.sql`)
  const slugTag = slug.replace(/[^a-z0-9_]/gi, '_')
  const lines = [
    `-- PaRDeS do Chag: ${slug}`,
    `-- Idempotente: atualiza apenas colunas peshat/remez/drash/sod`,
    'BEGIN;',
    `UPDATE chagim SET`,
    `  peshat = ${dollarQuote(`pardes_${slugTag}_peshat`, fields.peshat)},`,
    `  remez = ${dollarQuote(`pardes_${slugTag}_remez`, fields.remez)},`,
    `  drash = ${dollarQuote(`pardes_${slugTag}_drash`, fields.drash)},`,
    `  sod = ${dollarQuote(`pardes_${slugTag}_sod`, fields.sod)}`,
    `WHERE slug = ${dollarQuote(`pardes_${slugTag}_slug`, slug)};`,
    'COMMIT;',
    '',
  ]

  writeFileSync(outPath, lines.join('\n'), 'utf8')
  console.log(`OK ${outPath}`)
  return true
}

const arg = process.argv[2]
if (!arg) {
  console.error('Uso: node scripts/build-chag-pardes.mjs <slug> | --all')
  process.exit(1)
}

if (arg === '--all') {
  const slugs = readdirSync(join(repoRoot, 'data', 'chagim'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
  let n = 0
  for (const slug of slugs) {
    if (buildSeed(slug)) n++
  }
  console.log(`Gerados ${n} seeds PaRDeS`)
} else {
  buildSeed(arg)
}
