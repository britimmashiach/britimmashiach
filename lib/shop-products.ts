/**
 * Catalogo estatico (fallback) enquanto shop_products no Supabase nao estiver migrado.
 * A pagina /loja tenta Supabase primeiro e cai nesta lista se vazia.
 */

export type ShopProduct = {
  slug: string
  name: string
  description: string
  priceCents: number
  category: string
  imageUrl?: string | null
}

export const FALLBACK_SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: 'vela-shabbat-classica',
    name: 'Vela decorativa Shabbat',
    description:
      'Vela artesanal para mesa de Shabbat e ambientacao da casa. Acabamento elegante, ideal para kiddush e momentos de kavanah em familia.',
    priceCents: 4500,
    category: 'velas',
  },
  {
    slug: 'vela-menorah-dourada',
    name: 'Vela decorativa Menorah',
    description:
      'Vela decorativa inspirada na Menorah, com detalhes dourados. Para Chanukah, estudo ou decoracao do lar messianico.',
    priceCents: 5200,
    category: 'velas',
  },
  {
    slug: 'vela-par-shalom',
    name: 'Vela Par Shalom',
    description:
      'Vela com motivo Shalom, simbolo de paz e wholeness. Presente ou uso pessoal na rotina de oracao.',
    priceCents: 3800,
    category: 'velas',
  },
]

export function getFallbackProduct(slug: string): ShopProduct | undefined {
  return FALLBACK_SHOP_PRODUCTS.find((p) => p.slug === slug)
}
