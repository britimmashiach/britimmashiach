import Stripe from 'stripe'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    }),
)

const key = env.STRIPE_SECRET_KEY
if (!key?.startsWith('sk_test_')) {
  console.error('STRIPE_SECRET_KEY de teste ausente em .env.local')
  process.exit(1)
}

const stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia' })

const existing = await stripe.products.list({ limit: 100 })
const found = existing.data.find((p) => p.name === 'Brit Im Mashiach Premium')

const product = found ?? (await stripe.products.create({
  name: 'Brit Im Mashiach Premium',
  description:
    'Assinatura mensal Premium da plataforma Brit Im Mashiach: estudos ilimitados, biblioteca completa com downloads, Kabaláh Luriana aprofundada, modelo Netivot de 32 Caminhos, Siddur e Machzor completos, cursos exclusivos do Rav EBBY e acesso antecipado a novos conteúdos.',
}))

const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 })
const match = prices.data.find(
  (p) =>
    p.unit_amount === 4700 &&
    p.currency === 'brl' &&
    p.recurring?.interval === 'month' &&
    p.recurring?.interval_count === 1,
)

const price = match ?? (await stripe.prices.create({
  product: product.id,
  unit_amount: 4700,
  currency: 'brl',
  recurring: { interval: 'month', interval_count: 1 },
}))

console.log(JSON.stringify({
  livemode: product.livemode,
  product_id: product.id,
  product_name: product.name,
  price_id: price.id,
  amount: price.unit_amount,
  currency: price.currency,
  interval: price.recurring?.interval,
  reused_product: !!found,
  reused_price: !!match,
}, null, 2))
