/**
 * Atualiza colunas peshat, remez, drash, sod em chagim (idempotente).
 * Não altera chag_sections nem deleta linhas.
 *
 * Uso:
 *   npx tsx --env-file=.env.local scripts/deploy-chag-pardes.ts --all
 *   npx tsx --env-file=.env.local scripts/deploy-chag-pardes.ts pessach
 *
 * Pré-requisito: migration 20260604_chagim_pardes.sql aplicada no Supabase.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Faltam NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY no .env.local')
  process.exit(1)
}

const arg = process.argv[2]
if (!arg) {
  console.error('Uso: tsx scripts/deploy-chag-pardes.ts <slug> | --all')
  process.exit(1)
}

const repoRoot = process.cwd()
const LEVELS = ['peshat', 'remez', 'drash', 'sod'] as const

function readPardesFromDir(slug: string): Record<string, string> {
  const dir = join(repoRoot, 'data', 'chagim', slug, 'pardes')
  const out: Record<string, string> = {}
  for (const level of LEVELS) {
    const path = join(dir, `${level}.md`)
    if (!existsSync(path)) continue
    const raw = readFileSync(path, 'utf8').trim()
    const sepIdx = raw.indexOf('\n---\n')
    out[level] = sepIdx === -1 ? raw : raw.slice(sepIdx + 5).trim()
  }
  return out
}

function loadSlugs(): string[] {
  if (arg !== '--all') return [arg]
  return readdirSync(join(repoRoot, 'data', 'chagim'), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

;(async () => {
  const slugs = loadSlugs()
  let ok = 0
  let skip = 0
  let fail = 0

  for (const slug of slugs) {
    const fields = readPardesFromDir(slug)
    if (!LEVELS.some((l) => fields[l]?.length)) {
      console.warn(`[${slug}] sem pardes/ — pulando`)
      skip++
      continue
    }

    const { data: row, error: findErr } = await supabase
      .from('chagim')
      .select('id, slug')
      .eq('slug', slug)
      .maybeSingle()

    if (findErr) {
      console.error(`[${slug}] erro ao buscar:`, findErr.message)
      fail++
      continue
    }
    if (!row) {
      console.warn(`[${slug}] não existe em chagim — rode deploy-chag.ts ${slug} primeiro`)
      skip++
      continue
    }

    const { error: updErr } = await supabase
      .from('chagim')
      .update({
        peshat: fields.peshat ?? '',
        remez: fields.remez ?? '',
        drash: fields.drash ?? '',
        sod: fields.sod ?? '',
      })
      .eq('slug', slug)

    if (updErr) {
      if (updErr.message.includes('peshat') || updErr.message.includes('column')) {
        console.error(
          `[${slug}] colunas PaRDeS ausentes. Execute no SQL Editor: supabase/migrations/20260604_chagim_pardes.sql`,
        )
      } else {
        console.error(`[${slug}]`, updErr.message)
      }
      fail++
      continue
    }

    const lens = LEVELS.map((l) => `${l}=${(fields[l] ?? '').length}`).join(' ')
    console.log(`[${slug}] OK — ${lens}`)
    ok++
  }

  console.log(`\nResumo: ${ok} atualizados, ${skip} pulados, ${fail} falhas`)
  if (fail > 0) process.exit(1)
})().catch((err) => {
  console.error(err)
  process.exit(1)
})
