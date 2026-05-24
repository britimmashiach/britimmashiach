import Link from 'next/link'
import { formatShopPrice, shopWhatsAppUrl, SHOP_NAME } from '@/lib/shop-brand'
import type { ShopProduct } from '@/lib/shop-products'
import { Flame } from 'lucide-react'

export function ProductCard({ product }: { product: ShopProduct }) {
  const wa = shopWhatsAppUrl(
    `Shalom! Tenho interesse em: ${product.name} (${formatShopPrice(product.priceCents)}).`,
  )

  return (
    <article className="glass-card overflow-hidden flex flex-col h-full">
      <div className="aspect-[4/3] bg-gradient-to-br from-petroleum-800/10 via-gold-500/10 to-petroleum-900/5 dark:from-petroleum-800/40 dark:via-gold-500/15 flex items-center justify-center border-b border-border/40">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center space-y-2 p-6">
            <Flame className="w-10 h-10 mx-auto text-gold-600 dark:text-gold-400 opacity-80" aria-hidden />
            <p className="text-xs font-inter text-warmgray-500 uppercase tracking-widest">Foto em breve</p>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-[10px] font-inter font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400 mb-1">
            {product.category}
          </p>
          <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            {product.name}
          </h2>
        </div>
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed flex-1 line-clamp-3">
          {product.description}
        </p>
        <p className="font-cinzel text-xl font-bold text-petroleum-800 dark:text-parchment-100">
          {formatShopPrice(product.priceCents)}
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <Link
            href={`/loja/${product.slug}`}
            className="w-full text-center rounded-lg border border-border py-2.5 text-sm font-inter font-medium hover:bg-muted transition-colors"
          >
            Ver detalhes
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white py-2.5 text-sm font-inter font-semibold transition-colors"
          >
            Pedir no WhatsApp
          </a>
        </div>
      </div>
    </article>
  )
}

export function ShopHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div className="absolute inset-0 bg-petroleum-gradient opacity-[0.04] dark:opacity-[0.15]" />
      <div className="relative container mx-auto px-4 py-14 md:py-16 max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/12 border border-gold-500/25">
          <Flame className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" aria-hidden />
          <span className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
            {SHOP_NAME}
          </span>
        </div>
        <h1 className="font-cinzel text-3xl md:text-4xl font-semibold text-petroleum-800 dark:text-parchment-100">
          Lojinha da congregacao
        </h1>
        <p className="font-cormorant text-lg text-warmgray-600 dark:text-warmgray-400 italic">
          Velas decorativas e artigos para o lar. Logo e nome definitivos em breve.
        </p>
      </div>
    </section>
  )
}
