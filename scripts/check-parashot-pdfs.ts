import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing env')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })
const SLUGS = ['naso', 'matot', 'masei']

async function listBamidbar() {
  const { data } = await supabase
    .from('parashot')
    .select('slug, name, week_number, is_premium')
    .eq('book', 'Bamidbar')
    .order('week_number')
  console.log('\n=== TODAS BAMIDBAR NO DB ===', data?.length)
  for (const p of data ?? []) console.log(`  ${p.week_number} ${p.slug} premium=${p.is_premium}`)
}

async function main() {
  await listBamidbar()
  const { data: parashot } = await supabase
    .from('parashot')
    .select('id, slug, name, is_premium, week_number')
    .in('slug', SLUGS)
    .order('week_number')

  console.log('\n=== PARASHOT ===')
  for (const p of parashot ?? []) {
    console.log(`- ${p.slug} (${p.name}) week=${p.week_number} premium=${p.is_premium}`)
    const { data: aliyot } = await supabase
      .from('aliyot')
      .select('aliyah_number, pdf_url')
      .eq('parasha_id', p.id)
      .order('aliyah_number')
    const withPdf = (aliyot ?? []).filter((a) => a.pdf_url).length
    console.log(`  aliyot: ${aliyot?.length ?? 0}, com pdf_url: ${withPdf}`)
    if (aliyot?.some((a) => !a.pdf_url)) {
      const missing = aliyot.filter((a) => !a.pdf_url).map((a) => a.aliyah_number)
      console.log(`  sem pdf: aliyah ${missing.join(', ')}`)
    }
    const folder = `bamidbar/${p.slug}`
    const { data: files } = await supabase.storage.from('parashot-pdfs').list(folder)
    console.log(`  storage ${folder}: ${files?.length ?? 0} arquivos`)
    if (files?.length) console.log(`    ${files.map((f) => f.name).join(', ')}`)
    if (aliyot?.length) {
      console.log('  pdf_urls:')
      for (const a of aliyot) console.log(`    ${a.aliyah_number}: ${a.pdf_url ?? '(null)'}`)
    }
  }
}

main().catch(console.error)
