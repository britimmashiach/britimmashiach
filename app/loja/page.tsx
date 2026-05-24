import type { Metadata } from 'next'
import { ProductCard, ShopHero } from '@/components/loja/ProductCard'
import { getShopCatalog } from '@/lib/shop-catalog'
import { SHOP_NAME } from '@/lib/shop-brand'

export const metadata: Metadata = {
  title: 'Acqua Rios',
  description: `${SHOP_NAME}: velas decorativas e artigos Kosher para o lar. Brit Im Mashiach, Franca SP.`,
}

export const dynamic = 'force-dynamic'

export default async function LojaPage() {
  const products = await getShopCatalog()

  return (
    <div className="min-h-screen">
      <ShopHero />

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 text-center mb-8 max-w-2xl mx-auto">
          Catálogo em preparação. Produtos em breve à disposição.
        </p>
        {products.length === 0 ? (
          <p className="text-center text-warmgray-500 font-inter">Catalogo em preparacao.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
