import { NextRequest } from 'next/server'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { resolvePdfRequest, canAccessTier, getOrCreateWatermarkedPdf } from '@/lib/pdf-access'

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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  if (!hasSupabaseServerEnv()) return deny(503, 'Configuração do Supabase ausente')

  // 1. Autenticação
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) return deny(401, 'Não autenticado')

  // 2. Perfil + role
  const { data: profile } = await supabase
    .from('profiles')
    .select('email, role')
    .eq('id', user.id)
    .single()
  if (!profile) return deny(403, 'Perfil não encontrado')

  // 3. Resolve o pedido em (bucket, path, tier exigido)
  const { path: segments } = await params
  const resolved = await resolvePdfRequest(segments)
  if (!resolved) return deny(404, 'PDF não encontrado')

  // 4. Verifica permissão
  if (!canAccessTier(profile.role, resolved.requiredTier)) {
    return deny(403, 'Sem permissão para este conteúdo')
  }

  // 5. Busca (ou gera) PDF estampado para esse usuário
  let pdfBytes: Uint8Array
  try {
    pdfBytes = await getOrCreateWatermarkedPdf({
      userId: user.id,
      email: profile.email,
      bucket: resolved.bucket,
      path: resolved.path,
    })
  } catch (err) {
    console.error('[api/pdf] erro ao gerar PDF estampado:', err)
    return deny(500, 'Erro ao preparar PDF')
  }

  // Compatibilidade Node ↔ Web: garantimos um BodyInit aceito pelo Response.
  // Uint8Array é ArrayBufferView, mas alguns runtimes do Node tipam de modo estrito.
  const body = new Uint8Array(pdfBytes) as unknown as BodyInit

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${encodeURIComponent(resolved.filename)}"`,
      'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
      'Content-Length': String(pdfBytes.byteLength),
    },
  })
}
