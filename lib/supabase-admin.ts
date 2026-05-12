import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

export function hasServiceRoleEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  )
}

/** Cliente com service role — só em Server Actions / Route Handlers (bypassa RLS). */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!.trim()
  return createClient<Database>(url, key, { auth: { persistSession: false } })
}
