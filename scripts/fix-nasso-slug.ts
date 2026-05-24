/**
 * Corrige slug nasso → naso (oficial no registry/seed) e move PDFs no storage.
 * Uso: npx tsx --env-file=.env.local scripts/fix-nasso-slug.ts
 */
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })
const BUCKET = 'parashot-pdfs'
const FROM = 'bamidbar/nasso'
const TO = 'bamidbar/naso'

async function main() {
  const { data: row, error } = await supabase
    .from('parashot')
    .select('id, slug, name')
    .eq('slug', 'nasso')
    .maybeSingle()

  if (error) {
    console.error('Erro ao buscar parasha nasso:', error.message)
    process.exit(1)
  }

  if (!row) {
    const { data: naso } = await supabase.from('parashot').select('slug').eq('slug', 'naso').maybeSingle()
    if (naso) {
      console.log('✓ Slug já está como naso — nada a fazer.')
      return
    }
    console.error('Parasha nasso não encontrada no banco.')
    process.exit(1)
  }

  console.log(`Parasha encontrada: ${row.name} (${row.id})`)

  // 1. Mover PDFs no storage
  const { data: files } = await supabase.storage.from(BUCKET).list(FROM)
  const pdfs = (files ?? []).filter((f) => f.name.endsWith('.pdf'))
  console.log(`Movendo ${pdfs.length} PDFs de ${FROM}/ → ${TO}/`)

  for (const f of pdfs) {
    const fromPath = `${FROM}/${f.name}`
    const toPath = `${TO}/${f.name}`
    const { error: moveErr } = await supabase.storage.from(BUCKET).move(fromPath, toPath)
    if (moveErr) {
      console.error(`  ✗ ${fromPath}: ${moveErr.message}`)
    } else {
      console.log(`  ✓ ${f.name}`)
    }
  }

  // 2. Atualizar pdf_url nas aliyot
  const { data: aliyot } = await supabase
    .from('aliyot')
    .select('id, aliyah_number, pdf_url')
    .eq('parasha_id', row.id)

  for (const a of aliyot ?? []) {
    if (!a.pdf_url?.includes('nasso')) continue
    const newPath = a.pdf_url.replace('bamidbar/nasso/', 'bamidbar/naso/')
    const { error: uErr } = await supabase.from('aliyot').update({ pdf_url: newPath }).eq('id', a.id)
    if (uErr) console.error(`  aliyah ${a.aliyah_number}: ${uErr.message}`)
    else console.log(`  aliyah ${a.aliyah_number} pdf_url → ${newPath}`)
  }

  // 3. Renomear slug da parasha
  const { error: slugErr } = await supabase
    .from('parashot')
    .update({ slug: 'naso', name: 'Naso' })
    .eq('id', row.id)

  if (slugErr) {
    console.error('Erro ao atualizar slug:', slugErr.message)
    process.exit(1)
  }

  console.log('\n✅ Concluído: nasso → naso. Teste em /parashot e /parashot/naso')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
