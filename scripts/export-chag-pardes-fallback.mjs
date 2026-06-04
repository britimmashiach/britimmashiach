#!/usr/bin/env node
// Gera lib/chag-pardes-fallback.generated.ts a partir de data/chagim SLUG/pardes/
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const LEVELS = ['peshat', 'remez', 'drash', 'sod']

function readLevel(chagDir, level) {
  const path = join(chagDir, 'pardes', `${level}.md`)
  if (!existsSync(path)) return ''
  const raw = readFileSync(path, 'utf8').trim()
  const sepIdx = raw.indexOf('\n---\n')
  return sepIdx === -1 ? raw : raw.slice(sepIdx + 5).trim()
}

const slugs = readdirSync(join(repoRoot, 'data', 'chagim'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

const data = {}
for (const slug of slugs) {
  const chagDir = join(repoRoot, 'data', 'chagim', slug)
  const entry = {}
  for (const level of LEVELS) {
    entry[level] = readLevel(chagDir, level)
  }
  if (LEVELS.some((l) => entry[l].length > 0)) data[slug] = entry
}

const outPath = join(repoRoot, 'data', 'chagim', 'pardes-fallback.json')
writeFileSync(outPath, JSON.stringify(data, null, 0), 'utf8')
console.log(`Exportados ${Object.keys(data).length} chagim → data/chagim/pardes-fallback.json`)
