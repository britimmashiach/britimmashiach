import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getShopProduct } from '@/lib/shop-catalog'
import { formatShopPrice, shopWhatsAppUrl, SHOP_NAME } from '@/lib/shop-brand'
import { Flame, ArrowLeft } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getShopProduct(slug)
  if (!product) return { title: 'Produto nao encontrado' }
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  }
}

export default async function LojaProdutoPage({ params }: Props) {
  const { slug } = await params
  const product = await getShopProduct(slug)
  if (!product) notFound()

  const wa = shopWhatsAppUrl(
    `Shalom! Quero pedir: ${product.name} (${formatShopPrice(product.priceCents)}).`,
  )

  return (
    <div className="min-h-screen container mx-auto px-4 py-10 max-w-3xl">
      <Link
        href="/loja"
        className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Voltar a {SHOP_NAME}
      </Link>

      <div className="glass-card overflow-hidden">
        <div className="aspect-[16/10] bg-gradient-to-br from-petroleum-800/10 via-gold-500/10 to-petroleum-900/5 flex items-center justify-center border-b border-border/40">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center space-y-2">
              <Flame className="w-12 h-12 mx-auto text-gold-600 dark:text-gold-400" aria-hidden />
              <p className="text-xs font-inter text-warmgray-500">Imagem do produto em breve</p>
            </div>
          )}
        </div>
        <div className="p-8 space-y-4">
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400">
            {product.category}
          </p>
          <h1 className="font-cinzel text-3xl font-semibold text-petroleum-800 dark:text-parchment-100">
            {product.name}
          </h1>
          <p className="font-cinzel text-2xl font-bold text-petroleum-800 dark:text-gold-400">
            {formatShopPrice(product.priceCents)}
          </p>
          <p className="text-base font-inter text-warmgray-700 dark:text-warmgray-300 leading-relaxed">
            {product.description}
          </p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3 text-sm font-inter font-semibold transition-colors mt-4"
          >
            Pedir pelo WhatsApp
          </a>
          <p className="text-xs font-inter text-warmgray-500 pt-2">
            Retirada em Franca SP ou combinacao de entrega pelo WhatsApp.
          </p>
        </div>
      </div>
    </div>
  )
}
