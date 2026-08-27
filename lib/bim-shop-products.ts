import type { ShopProduct } from '@/lib/shop-products'

export const BIM_SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: 'camiseta-brit-im-mashiach',
    name: 'Camiseta Brit Im Mashiach',
    description:
      'Camiseta clássica com o nome da congregação. Algodão confortável para estudo, Shabat e o dia a dia. Tamanhos P, M, G e GG. Informe o tamanho no WhatsApp.',
    priceCents: 7900,
    category: 'Camisetas',
  },
  {
    slug: 'camiseta-magen-david',
    name: 'Camiseta Magen David',
    description:
      'Camiseta com a Estrela de David e a marca Brit Im Mashiach. Para vestir identidade com simplicidade. Tamanhos P, M, G e GG.',
    priceCents: 7900,
    category: 'Camisetas',
  },
  {
    slug: 'camiseta-shalom',
    name: 'Camiseta Shalom U Vrachá',
    description:
      'Camiseta com a saudação Shalom U Vrachá. Leve a bênção da kehiláh para fora da sinagoga. Tamanhos P, M, G e GG.',
    priceCents: 7900,
    category: 'Camisetas',
  },
  {
    slug: 'bone-brit-im-mashiach',
    name: 'Boné Brit Im Mashiach',
    description:
      'Boné bordado com a marca da congregação. Acessório discreto para o cotidiano e os encontros da kehiláh.',
    priceCents: 5900,
    category: 'Acessórios',
  },
  {
    slug: 'caneca-brit-im-mashiach',
    name: 'Caneca Brit Im Mashiach',
    description:
      'Caneca para o café do estudo, o chá do Shabat e a mesa de casa. Marca da sinagoga em peça de uso diário.',
    priceCents: 4500,
    category: 'Acessórios',
  },
  {
    slug: 'ecobag-brit-im-mashiach',
    name: 'Ecobag Brit Im Mashiach',
    description:
      'Sacola de tecido com a marca da congregação. Para livros, mercado e os encontros da kehiláh.',
    priceCents: 3900,
    category: 'Acessórios',
  },
]

export function getBimShopCatalog(): ShopProduct[] {
  return BIM_SHOP_PRODUCTS
}

export function getBimShopProduct(slug: string): ShopProduct | undefined {
  return BIM_SHOP_PRODUCTS.find((product) => product.slug === slug)
}
