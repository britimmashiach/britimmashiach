import { readFile } from 'fs/promises'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import {
  getShlomoStamFontPath,
  profileCanDownloadShlomoStam,
  SHLOMO_STAM_FONT_FILENAME,
} from '@/lib/shlomo-stam-font'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function deny(status: number, body: string) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  })
}

/** Download protegido da fonte Shlomo Stam para líderes e Mestres. */
export async function GET() {
  if (!hasSupabaseServerEnv()) return deny(503, 'Configuração do Supabase ausente')

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) return deny(401, 'Faça login para baixar a fonte.')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_leader, is_mestre')
    .eq('id', user.id)
    .single()

  if (!profileCanDownloadShlomoStam(profile)) {
    return deny(403, 'Disponível apenas para líderes aprovados e Mestres de Gematria.')
  }

  let bytes: Buffer
  try {
    bytes = await readFile(getShlomoStamFontPath())
  } catch {
    return deny(404, 'Arquivo da fonte não encontrado no servidor.')
  }

  return new Response(new Uint8Array(bytes), {
    status: 200,
    headers: {
      'Content-Type': 'font/ttf',
      'Content-Disposition': `attachment; filename="${SHLOMO_STAM_FONT_FILENAME}"`,
      'Content-Length': String(bytes.length),
      'Cache-Control': 'private, no-store',
    },
  })
}
