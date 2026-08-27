import type { Metadata } from 'next'
import Link from 'next/link'
import { ProductCard } from '@/components/loja/ProductCard'
import { BimShopHero } from '@/components/loja/BimShopHero'
import {
  BIM_SHOP_AVAILABILITY_LABEL,
  BIM_SHOP_NAME,
  BIM_SHOP_PATH,
  bimShopInterestMessage,
  bimShopWhatsAppUrl,
} from '@/lib/bim-shop-brand'
import { getBimShopCatalog } from '@/lib/bim-shop-products'
import { Shirt } from 'lucide-react'

export const metadata: Metadata = {
  title: BIM_SHOP_NAME,
  description: `${BIM_SHOP_NAME}: camisetas e acessórios da congregação. Brit Im Mashiach, Franca SP.`,
}

export default function LojaBimPage() {
  const products = getBimShopCatalog()
  const camisetas = products.filter((p) => p.category === 'Camisetas')
  const acessorios = products.filter((p) => p.category === 'Acessórios')

  return (
    <div className="min-h-screen">
      <BimShopHero />

      <section className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
        <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 text-center max-w-2xl mx-auto">
          Catálogo em preparação. Camisetas e acessórios em breve à disposição. Enquanto isso, registre seu interesse pelo WhatsApp.
        </p>

        <CategoryBlock title="Camisetas" products={camisetas} />
        <CategoryBlock title="Acessórios" products={acessorios} />

        <p className="text-center text-sm font-inter text-warmgray-500">
          Velas e artigos para o lar:{' '}
          <Link href="/loja" className="text-cyan-700 dark:text-cyan-400 hover:underline">
            Acqua Rios
          </Link>
        </p>
      </section>
    </div>
  )
}

function CategoryBlock({
  title,
  products,
}: {
  title: string
  products: ReturnType<typeof getBimShopCatalog>
}) {
  if (products.length === 0) return null

  return (
    <div className="space-y-6">
      <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100 text-center">
        {title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            href={`${BIM_SHOP_PATH}/${product.slug}`}
            shopName={BIM_SHOP_NAME}
            availabilityLabel={BIM_SHOP_AVAILABILITY_LABEL}
            availabilityClassName="text-gold-700 dark:text-gold-400"
            whatsappUrl={bimShopWhatsAppUrl(bimShopInterestMessage(product.name))}
            PlaceholderIcon={Shirt}
          />
        ))}
      </div>
    </div>
  )
}
