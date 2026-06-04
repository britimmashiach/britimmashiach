#!/usr/bin/env node
/**
 * Monta data/chagim/<slug>/pardes/*.md a partir das seções numeradas existentes.
 * Fonte: 03 (peshat), 04 (remez), 15 (drash), 05 (sod) — sem alterar os .md originais.
 * Uso: node scripts/aggregate-chag-pardes.mjs --all
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')

function bodyAfterHeader(text) {
  const sepIdx = text.indexOf('\n---\n')
  if (sepIdx === -1) return text.trim()
  return text.slice(sepIdx + 5).trim()
}

function findSection(chagDir, patterns) {
  const files = readdirSync(chagDir).filter((f) => /^\d{2}-.+\.md$/.test(f))
  for (const pat of patterns) {
    const hit = files.find((f) => pat.test(f))
    if (hit) return bodyAfterHeader(readFileSync(join(chagDir, hit), 'utf8'))
  }
  return ''
}

function wrap(level, title, body) {
  const subtitles = {
    peshat: 'Análise Literal e Halachica',
    remez: 'O Princípio Velado',
    drash: 'O Ensino Homilético',
    sod: 'O Segredo Kabalístico',
  }
  return `# ${title}\n\n**level:** ${level}\n\n---\n\n${body}\n`
}

function aggregate(slug) {
  const chagDir = join(repoRoot, 'data', 'chagim', slug)
  const pardesDir = join(chagDir, 'pardes')
  if (!existsSync(chagDir)) return false
  mkdirSync(pardesDir, { recursive: true })

  const peshat = findSection(chagDir, [/03-origem/, /02-o-que/])
  const remez = findSection(chagDir, [/04-significado/])
  const drash = findSection(chagDir, [/15-comentarios/])
  const sod = findSection(chagDir, [/05-perspectiva-kabalistica/])

  const name = slug.replace(/-/g, ' ')
  if (peshat) writeFileSync(join(pardesDir, 'peshat.md'), wrap('peshat', `Peshat — ${name}`, peshat), 'utf8')
  if (remez) writeFileSync(join(pardesDir, 'remez.md'), wrap('remez', `Remez — ${name}`, remez), 'utf8')
  if (drash) writeFileSync(join(pardesDir, 'drash.md'), wrap('drash', `Drash — ${name}`, drash), 'utf8')
  if (sod) writeFileSync(join(pardesDir, 'sod.md'), wrap('sod', `Sod — ${name}`, sod), 'utf8')

  console.log(`[${slug}] peshat=${!!peshat} remez=${!!remez} drash=${!!drash} sod=${!!sod}`)
  return !!(peshat || remez || drash || sod)
}

if (process.argv[2] !== '--all') {
  console.error('Uso: node scripts/aggregate-chag-pardes.mjs --all')
  process.exit(1)
}

const slugs = readdirSync(join(repoRoot, 'data', 'chagim'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

let n = 0
for (const slug of slugs) {
  if (aggregate(slug)) n++
}
console.log(`Agregados ${n} chagim`)
