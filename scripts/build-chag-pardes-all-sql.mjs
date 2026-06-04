#!/usr/bin/env node
/** Gera supabase/run_once_chag_pardes_full.sql (migration + todos os UPDATEs) */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mig = readFileSync(join(root, 'supabase', 'migrations', '20260604_chagim_pardes.sql'), 'utf8')
const seeds = readdirSync(join(root, 'supabase'))
  .filter((f) => f.startsWith('seed_chag_pardes_') && f.endsWith('.sql'))
  .sort()
  .map((f) => readFileSync(join(root, 'supabase', f), 'utf8'))

const out = [
  '-- Cole TUDO no Supabase SQL Editor e execute uma vez',
  '-- Brit Im Mashiach: colunas PaRDeS + conteúdo dos 14 Chagim',
  '',
  mig.trim(),
  '',
  ...seeds.map((s) => s.trim()),
  '',
].join('\n')

const outPath = join(root, 'supabase', 'run_once_chag_pardes_full.sql')
writeFileSync(outPath, out, 'utf8')
console.log(`OK ${outPath} (${(out.length / 1024).toFixed(0)} KB)`)
