import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

const PLACEHOLDERS = ['xxxxx', 'xxxx', 'your-project', '<seu', 'example.supabase']

function isInvalid(value: string): boolean {
  if (!value.trim()) return true
  return PLACEHOLDERS.some((p) => value.toLowerCase().includes(p))
}

export const supabaseConfigured =
  !isInvalid(SUPABASE_URL) && !isInvalid(SUPABASE_ANON_KEY)

if (process.env.NODE_ENV === 'development') {
  if (!supabaseConfigured) {
    const urlInfo = SUPABASE_URL
      ? `"${SUPABASE_URL.slice(0, 35)}..." - placeholder ou inválida`
      : 'não definida (NEXT_PUBLIC_SUPABASE_URL ausente no .env.local)'
    const keyInfo = SUPABASE_ANON_KEY
      ? 'definida mas parece placeholder'
      : 'não definida (NEXT_PUBLIC_SUPABASE_ANON_KEY ausente no .env.local)'
    console.error(
      '[Supabase] Credenciais não configuradas.\n' +
      `  URL: ${urlInfo}\n` +
      `  ANON_KEY: ${keyInfo}\n` +
      '  Solução: supabase.com > seu projeto > Settings > API\n' +
      '  Depois reinicie: Ctrl+C e npm run dev',
    )
  } else {
    console.log(`[Supabase] Client inicializado. URL: ${SUPABASE_URL.slice(0, 40)}...`)
  }
}

export function createClient() {
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
}
