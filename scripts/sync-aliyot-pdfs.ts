/**
 * sync-aliyot-pdfs.ts
 *
 * Percorre todas as Aliyot no banco, verifica se o PDF correspondente existe no
 * Supabase Storage (bucket parashot-pdfs) e atualiza a coluna aliyot.pdf_url.
 *
 * Uso:
 *   npm run sync:pdfs
 *
 * Variáveis obrigatórias em .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (formato atual do Supabase, ex.: sb_secret_...)
 */

import { createClient } from '@supabase/supabase-js'

// ─── Configuração ──────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
const BUCKET       = 'parashot-pdfs'

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('\n❌ Variáveis de ambiente ausentes:')
  if (!SUPABASE_URL)  console.error('   NEXT_PUBLIC_SUPABASE_URL não definida')
  if (!SERVICE_KEY)   console.error('   SUPABASE_SERVICE_ROLE_KEY não definida')
  console.error('\n   Adicione-as ao .env.local e rode novamente.\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
})

// ─── Cache de listagens do Storage (1 request por pasta de parashá) ────────

const storageListCache = new Map<string, Set<string>>()

async function listStorageFolder(folderPath: string): Promise<Set<string>> {
  if (storageListCache.has(folderPath)) {
    return storageListCache.get(folderPath)!
  }

  const { data, error } = await supabase.storage.from(BUCKET).list(folderPath)

  const files = new Set<string>()
  if (error) {
    console.warn(`   ⚠  Storage: não foi possível listar "${folderPath}" — ${error.message}`)
  } else if (data) {
    for (const item of data) files.add(item.name)
  }

  storageListCache.set(folderPath, files)
  return files
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  sync-aliyot-pdfs — Brit Mashiach Platform')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // 1. Carregar parashot do banco: id → { slug, book (lowercase) }
  const { data: dbParashot, error: pErr } = await supabase
    .from('parashot')
    .select('id, slug, book')

  if (pErr) {
    console.error(`❌ Erro ao buscar parashot: ${pErr.message}`)
    process.exit(1)
  }

  const parashaById = new Map(
    dbParashot!.map(p => [p.id, { slug: p.slug, book: p.book.toLowerCase() }])
  )
  console.log(`  Parashot no banco  : ${parashaById.size}`)

  // 2. Carregar todas as Aliyot do banco
  const { data: allAliyot, error: aErr } = await supabase
    .from('aliyot')
    .select('id, parasha_id, aliyah_number')
    .order('parasha_id')
    .order('aliyah_number')

  if (aErr) {
    console.error(`❌ Erro ao buscar aliyot: ${aErr.message}`)
    process.exit(1)
  }

  console.log(`  Aliyot no banco    : ${allAliyot!.length}`)
  console.log(`  Bucket             : ${BUCKET}\n`)
  console.log('─────────────────────────────────────────────────────────')

  let countUpdated = 0
  let countMissing = 0
  let countError   = 0
  let countSkipped = 0

  for (const aliyah of allAliyot!) {
    const parasha = parashaById.get(aliyah.parasha_id)

    if (!parasha) {
      console.log(`❌ aliyah ${aliyah.id} — parasha_id "${aliyah.parasha_id}" não encontrada no banco`)
      countError++
      continue
    }

    const { slug, book } = parasha
    const folderPath = `${book}/${slug}`
    const fileName   = `aliyah-${aliyah.aliyah_number}.pdf`
    const filePath   = `${folderPath}/${fileName}`

    const existingFiles = await listStorageFolder(folderPath)

    if (!existingFiles.has(fileName)) {
      console.log(`⚠  ${slug}/aliyah-${aliyah.aliyah_number} — PDF não encontrado no storage`)
      countMissing++
      continue
    }

    const pdfUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`

    const { error: uErr } = await supabase
      .from('aliyot')
      .update({ pdf_url: pdfUrl })
      .eq('id', aliyah.id)

    if (uErr) {
      console.log(`❌ ${slug}/aliyah-${aliyah.aliyah_number} — erro ao atualizar: ${uErr.message}`)
      countError++
    } else {
      console.log(`✔  ${slug}/aliyah-${aliyah.aliyah_number} → ${pdfUrl}`)
      countUpdated++
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`  ✔  Atualizados       : ${countUpdated}`)
  console.log(`  ⚠  Não encontrados   : ${countMissing}`)
  console.log(`  ❌ Erros             : ${countError}`)
  if (countSkipped > 0) {
    console.log(`  –  Ignorados         : ${countSkipped}`)
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (countError > 0) process.exit(1)
}

main().catch(err => {
  console.error('\n❌ Erro fatal:', err)
  process.exit(1)
})
