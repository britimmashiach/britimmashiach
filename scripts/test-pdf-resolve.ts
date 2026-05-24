/**
 * Simula resolvePdfRequest + download do storage para diagnosticar PDF 404.
 * Uso: npx tsx --env-file=.env.local scripts/test-pdf-resolve.ts [slug]
 */
import { createClient } from '@supabase/supabase-js'
import { resolvePdfRequest, getOrCreateWatermarkedPdf } from '../lib/pdf-access'

const slug = process.argv[2] ?? 'matot'
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function main() {
  console.log('SERVICE_ROLE presente:', Boolean(key?.trim()))
  const supabase = createClient(url, key, { auth: { persistSession: false } })

  const { data: parasha } = await supabase
    .from('parashot')
    .select('id, slug')
    .eq('slug', slug)
    .single()

  if (!parasha) {
    console.error('Parasha não encontrada:', slug)
    process.exit(1)
  }

  const { data: aliyah } = await supabase
    .from('aliyot')
    .select('id, aliyah_number, pdf_url')
    .eq('parasha_id', parasha.id)
    .eq('aliyah_number', 1)
    .single()

  if (!aliyah) {
    console.error('Aliyah 1 não encontrada')
    process.exit(1)
  }

  console.log(`\nParasha: ${slug}`)
  console.log(`Aliyah id: ${aliyah.id}`)
  console.log(`pdf_url DB: ${aliyah.pdf_url}`)

  const resolved = await resolvePdfRequest(['aliyah', aliyah.id])
  if (!resolved) {
    // debug extra
    const { hasServiceRoleEnv } = await import('../lib/supabase-admin')
    console.error('\n❌ resolvePdfRequest retornou null')
    console.error('  hasServiceRoleEnv inside lib:', hasServiceRoleEnv())
    process.exit(1)
  }

  console.log('\n✓ resolvePdfRequest OK:')
  console.log(`  bucket: ${resolved.bucket}`)
  console.log(`  path: ${resolved.path}`)
  console.log(`  tier: ${resolved.requiredTier}`)

  const dl = await supabase.storage.from(resolved.bucket).download(resolved.path)
  if (dl.error || !dl.data) {
    console.error('\n❌ Download storage falhou:', dl.error?.message)
    process.exit(1)
  }
  const bytes = await dl.data.arrayBuffer()
  console.log(`\n✓ Storage download OK: ${bytes.byteLength} bytes`)

  // Teste produção (sem cookie → esperado 401, não 404)
  const prodUrl = `https://britimmashiach.com/api/pdf/aliyah/${aliyah.id}`
  console.log(`\nTeste produção (sem login): GET ${prodUrl}`)
  const res = await fetch(prodUrl, { redirect: 'follow' })
  const body = await res.text()
  console.log(`  status: ${res.status}`)
  console.log(`  body: ${body.slice(0, 120)}`)

  // Bereshit controle
  const { data: ber } = await supabase
    .from('parashot')
    .select('id')
    .eq('slug', 'bereshit')
    .single()
  if (ber) {
    const { data: bAliyah } = await supabase
      .from('aliyot')
      .select('id, pdf_url')
      .eq('parasha_id', ber.id)
      .eq('aliyah_number', 1)
      .single()
    if (bAliyah) {
      const berUrl = `https://britimmashiach.com/api/pdf/aliyah/${bAliyah.id}`
      const berRes = await fetch(berUrl)
      console.log(`\nControle bereshit aliyah 1: ${berRes.status} (pdf_url=${bAliyah.pdf_url ?? 'null'})`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
