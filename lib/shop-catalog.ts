import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { FALLBACK_SHOP_PRODUCTS, type ShopProduct } from '@/lib/shop-products'

type DbRow = {
  slug: string
  name: string
  description: string
  price_cents: number
  category: string
  image_url: string | null
}

function mapRow(row: DbRow): ShopProduct {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    priceCents: row.price_cents,
    category: row.category,
    imageUrl: row.image_url,
  }
}

export async function getShopCatalog(): Promise<ShopProduct[]> {
  if (!hasSupabaseServerEnv()) return FALLBACK_SHOP_PRODUCTS

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('shop_products')
      .select('slug, name, description, price_cents, category, image_url')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data?.length) return FALLBACK_SHOP_PRODUCTS
    return data.map(mapRow)
  } catch {
    return FALLBACK_SHOP_PRODUCTS
  }
}

export async function getShopProduct(slug: string): Promise<ShopProduct | null> {
  if (!hasSupabaseServerEnv()) {
    return FALLBACK_SHOP_PRODUCTS.find((p) => p.slug === slug) ?? null
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('shop_products')
      .select('slug, name, description, price_cents, category, image_url')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle()

    if (error || !data) {
      return FALLBACK_SHOP_PRODUCTS.find((p) => p.slug === slug) ?? null
    }
    return mapRow(data)
  } catch {
    return FALLBACK_SHOP_PRODUCTS.find((p) => p.slug === slug) ?? null
  }
}
