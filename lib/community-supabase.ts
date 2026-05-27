import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { hasSupabaseServerEnv } from '@/lib/supabase-server'
import { FALLBACK_TESTIMONIALS, getFallbackEvents } from '@/lib/community-fallback'
import type { KehilahEvent, KehilahTestimonial } from '@/lib/community-types'

type EventRow = Database['public']['Tables']['kehilah_events']['Row']
type TestimonialRow = Database['public']['Tables']['kehilah_testimonials']['Row']

function getReadClient() {
  if (hasServiceRoleEnv()) return getSupabaseAdmin()
  if (!hasSupabaseServerEnv()) return null
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim(),
    { auth: { persistSession: false } },
  )
}

function mapEvent(row: EventRow): KehilahEvent {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    eventType: row.event_type as KehilahEvent['eventType'],
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    location: row.location,
    liveUrl: row.live_url,
  }
}

function mapTestimonial(row: TestimonialRow): KehilahTestimonial {
  return {
    id: row.id,
    authorDisplayName: row.author_display_name,
    body: row.body,
    city: row.city,
    isFeatured: row.is_featured,
  }
}

export async function fetchKehilahEvents(limit = 12): Promise<KehilahEvent[]> {
  const client = getReadClient()
  if (!client) return getFallbackEvents()

  const now = new Date().toISOString()

  const { data, error } = await client
    .from('kehilah_events')
    .select('*')
    .eq('is_public', true)
    .gte('starts_at', now)
    .order('starts_at', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('[community] kehilah_events:', error.message)
    return getFallbackEvents()
  }

  if (!data?.length) return getFallbackEvents()
  return data.map(mapEvent)
}

export async function fetchKehilahTestimonials(limit = 8): Promise<KehilahTestimonial[]> {
  const client = getReadClient()
  if (!client) return FALLBACK_TESTIMONIALS

  const { data, error } = await client
    .from('kehilah_testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('is_featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[community] kehilah_testimonials:', error.message)
    return FALLBACK_TESTIMONIALS
  }

  if (!data?.length) return FALLBACK_TESTIMONIALS
  return data.map(mapTestimonial)
}
