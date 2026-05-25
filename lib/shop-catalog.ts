import { createClient } from '@supabase/supabase-js'
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

function createAnonSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  if (!url || !key) return null
  return createClient(url, key)
}

/** Catálogo público via anon key (sem cookies — seguro para sitemap e SSG). */
export async function getShopCatalog(): Promise<ShopProduct[]> {
  const supabase = createAnonSupabase()
  if (!supabase) return FALLBACK_SHOP_PRODUCTS

  try {
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
  const fallback = FALLBACK_SHOP_PRODUCTS.find((p) => p.slug === slug) ?? null
  const supabase = createAnonSupabase()
  if (!supabase) return fallback

  try {
    const { data, error } = await supabase
      .from('shop_products')
      .select('slug, name, description, price_cents, category, image_url')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle()

    if (error || !data) return fallback
    return mapRow(data)
  } catch {
    return fallback
  }
}
