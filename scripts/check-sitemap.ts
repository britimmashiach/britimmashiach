/**
 * Diagnóstico local do sitemap (mesma lógica de app/sitemap.ts).
 *
 * Uso: npm run check:sitemap
 */
import { TANACH_BOOKS } from '../lib/tanach-books'
import { OFFICIAL_PARASHOT } from '../lib/parashot-registry'
import { getAllChagSlugsForSitemap } from '../lib/chagim-placeholders'
import { fetchChagimSlugs } from '../lib/chagim-supabase'
import { fetchParashaSlugs } from '../lib/parashot-supabase'
import { fetchStudySlugs } from '../lib/studies-supabase'
import { getPublicSiteOrigin } from '../lib/public-site-url'
import { getShopCatalog } from '../lib/shop-catalog'

const SEO_SPOTLIGHT = [
  '/judaismo-messianico',
  '/chagim/shalosh-regalim',
  '/chagim/yamim-noraim',
  '/chagim/festividades',
  '/faq',
  '/metodo-pardes',
  '/sitemap.xml',
]

async function main() {
  const origin = getPublicSiteOrigin()
  console.log('\n🔍 Diagnóstico do sitemap\n')
  console.log('Origem (NEXT_PUBLIC_APP_URL / VERCEL_URL):', origin)
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ definida' : '✗ ausente')
  console.log('Supabase anon:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ definida' : '✗ ausente')

  const steps: { name: string; run: () => Promise<unknown> }[] = [
    { name: 'fetchStudySlugs', run: fetchStudySlugs },
    { name: 'fetchParashaSlugs', run: fetchParashaSlugs },
    { name: 'fetchChagimSlugs', run: fetchChagimSlugs },
    { name: 'getShopCatalog', run: getShopCatalog },
  ]

  for (const step of steps) {
    try {
      const result = await step.run()
      const count = Array.isArray(result) ? result.length : 1
      console.log(`  ✓ ${step.name}: ${count} itens`)
    } catch (err) {
      console.error(`  ✗ ${step.name}:`, err instanceof Error ? err.message : err)
      process.exitCode = 1
    }
  }

  const [studySlugs, parashaDbSlugs, chagDbSlugs, shopProducts] = await Promise.all([
    fetchStudySlugs(),
    fetchParashaSlugs(),
    fetchChagimSlugs(),
    getShopCatalog(),
  ])

  const parashaSlugs = new Set([
    ...OFFICIAL_PARASHOT.map((p) => p.slug),
    ...parashaDbSlugs.map((p) => p.slug),
  ])
  const chagSlugs = new Set([
    ...getAllChagSlugsForSitemap().map((s) => s.slug),
    ...chagDbSlugs.map((s) => s.slug),
  ])
  const tanachChapters = TANACH_BOOKS.reduce((n, b) => n + b.chapters, 0)
  const staticCount = 18
  const total =
    staticCount +
    parashaSlugs.size +
    studySlugs.length +
    chagSlugs.size +
    shopProducts.length +
    TANACH_BOOKS.length +
    tanachChapters

  console.log('\n📊 Estimativa de URLs no sitemap:', total)
  console.log(`   Parashot: ${parashaSlugs.size}`)
  console.log(`   Studies: ${studySlugs.length}`)
  console.log(`   Chagim: ${chagSlugs.size}`)
  console.log(`   Tanach capítulos: ${tanachChapters}`)

  console.log('\n🎯 Páginas SEO prioritárias:')
  for (const path of SEO_SPOTLIGHT) {
    const url = path === '/sitemap.xml' ? `${origin}/sitemap.xml` : `${origin}${path}`
    console.log(`   → ${url}`)
  }

  if (process.exitCode) {
    console.log('\n❌ Corrija os erros acima antes de enviar ao Search Console.')
  } else {
    console.log('\n✅ Geração local OK. Teste também: https://britimmashiach.com/sitemap.xml')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
