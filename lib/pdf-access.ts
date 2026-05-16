import { createHash } from 'crypto'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { applyWatermark } from '@/lib/pdf-watermark'

export type AccessTier = 'free' | 'premium' | 'admin'

export interface ResolvedPdf {
  bucket: string
  path: string
  filename: string
  requiredTier: AccessTier
}

const PARASHOT_BUCKET = 'parashot-pdfs'
const TEHILIM_BUCKET = 'tehilim-pdfs'
const WATERMARKED_BUCKET = 'users-watermarked'

function basename(p: string): string {
  const parts = p.split('/')
  return parts[parts.length - 1] || 'document.pdf'
}

/**
 * Aceita tanto path relativo (`bereshit/aliyah-1.pdf`) quanto URL completa antiga
 * (`https://.../storage/v1/object/public/parashot-pdfs/bereshit/aliyah-1.pdf`).
 * Extrai apenas o path para o storage download. Garante compatibilidade
 * durante a janela em que o código novo já está em produção mas a migration
 * de normalização ainda não rodou.
 */
function pathOnly(raw: string): string {
  const m = raw.match(/\/storage\/v1\/object\/(?:public|sign|authenticated)\/[^/]+\/(.+?)(?:\?|$)/)
  return m ? decodeURIComponent(m[1]) : raw
}

/**
 * Resolve o pedido `/api/pdf/[...]` para um arquivo concreto em storage,
 * com o tier mínimo de acesso. Retorna null se path/id desconhecido.
 *
 * Esquemas suportados (todos exigem login):
 *   aliyah/{id}                       → aliyot.pdf_url            (tier=free; aliyah 1 sempre; demais exigem premium)
 *   aliyah/{id}/premium               → aliyot.pdf_premium_url    (tier=premium)
 *   aliyah/{id}/kabbalah              → aliyot.pdf_kabbalah_url   (tier=admin)
 *   parasha/{id}                      → parashot.pdf_url          (tier=free; se parasha.is_premium → tier=premium)
 *   tehilim/{perek_slug}/{filename}   → bucket tehilim-pdfs       (tier=free, mas exige login)
 */
export async function resolvePdfRequest(segments: string[]): Promise<ResolvedPdf | null> {
  if (!hasServiceRoleEnv() || segments.length === 0) return null
  const admin = getSupabaseAdmin()

  const [head, ...rest] = segments

  if (head === 'aliyah' && rest.length >= 1) {
    const aliyahId = rest[0]
    const variant = rest[1] ?? 'free'
    const { data, error } = await admin
      .from('aliyot')
      .select('id, aliyah_number, pdf_url, pdf_premium_url, pdf_kabbalah_url, parasha_id, parashot:parasha_id(is_premium)')
      .eq('id', aliyahId)
      .single()
    if (error || !data) return null

    if (variant === 'premium') {
      if (!data.pdf_premium_url) return null
      const p = pathOnly(data.pdf_premium_url)
      return { bucket: PARASHOT_BUCKET, path: p, filename: basename(p), requiredTier: 'premium' }
    }
    if (variant === 'kabbalah') {
      if (!data.pdf_kabbalah_url) return null
      const p = pathOnly(data.pdf_kabbalah_url)
      return { bucket: PARASHOT_BUCKET, path: p, filename: basename(p), requiredTier: 'admin' }
    }
    // Free / base
    if (!data.pdf_url) return null
    const parashaPremium = Array.isArray(data.parashot)
      ? data.parashot[0]?.is_premium === true
      : (data.parashot as { is_premium?: boolean } | null)?.is_premium === true
    // Aliyah 1 sempre liberada se a parasha não é premium; senão exige premium
    const tier: AccessTier = data.aliyah_number === 1 && !parashaPremium ? 'free' : 'premium'
    const p = pathOnly(data.pdf_url)
    return { bucket: PARASHOT_BUCKET, path: p, filename: basename(p), requiredTier: tier }
  }

  if (head === 'parasha' && rest.length === 1) {
    const parashaId = rest[0]
    const { data, error } = await admin
      .from('parashot')
      .select('id, pdf_url, is_premium')
      .eq('id', parashaId)
      .single()
    if (error || !data || !data.pdf_url) return null
    const p = pathOnly(data.pdf_url)
    return {
      bucket: PARASHOT_BUCKET,
      path: p,
      filename: basename(p),
      requiredTier: data.is_premium ? 'premium' : 'free',
    }
  }

  if (head === 'chag' && rest.length >= 1) {
    const chagId = rest[0]
    const variant = rest[1] ?? 'free'
    const { data, error } = await admin
      .from('chagim')
      .select('id, pdf_url, pdf_premium_url, pdf_kabbalah_url, is_premium')
      .eq('id', chagId)
      .single()
    if (error || !data) return null

    if (variant === 'premium') {
      if (!data.pdf_premium_url) return null
      const p = pathOnly(data.pdf_premium_url)
      return { bucket: PARASHOT_BUCKET, path: p, filename: basename(p), requiredTier: 'premium' }
    }
    if (variant === 'kabbalah') {
      if (!data.pdf_kabbalah_url) return null
      const p = pathOnly(data.pdf_kabbalah_url)
      return { bucket: PARASHOT_BUCKET, path: p, filename: basename(p), requiredTier: 'admin' }
    }
    if (!data.pdf_url) return null
    const p = pathOnly(data.pdf_url)
    return {
      bucket: PARASHOT_BUCKET,
      path: p,
      filename: basename(p),
      requiredTier: data.is_premium ? 'premium' : 'free',
    }
  }

  if (head === 'chag-section' && rest.length === 1) {
    const sectionId = rest[0]
    const { data, error } = await admin
      .from('chag_sections')
      .select('id, pdf_url, is_premium')
      .eq('id', sectionId)
      .single()
    if (error || !data || !data.pdf_url) return null
    const p = pathOnly(data.pdf_url)
    return {
      bucket: PARASHOT_BUCKET,
      path: p,
      filename: basename(p),
      requiredTier: data.is_premium ? 'premium' : 'free',
    }
  }

  if (head === 'tehilim' && rest.length >= 2) {
    // tehilim/{perek_slug}/{filename...}
    const perekSlug = rest[0]
    const file = rest.slice(1).join('/')
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(perekSlug)) return null
    if (file.includes('..') || !file.toLowerCase().endsWith('.pdf')) return null
    const path = `${perekSlug}/${file}`
    // Confirma que o arquivo existe no storage
    const { data } = await admin.storage.from(TEHILIM_BUCKET).list(perekSlug, { search: file.split('/').pop() })
    const found = data?.some((f) => f.name === file.split('/').pop())
    if (!found) return null
    return { bucket: TEHILIM_BUCKET, path, filename: basename(path), requiredTier: 'free' }
  }

  return null
}

/**
 * Confere se o role do usuário satisfaz o tier exigido.
 *   free      → free, premium, admin
 *   premium   → premium, admin
 *   admin     → admin
 */
export function canAccessTier(userRole: string | null | undefined, required: AccessTier): boolean {
  if (required === 'free') return userRole === 'free' || userRole === 'premium' || userRole === 'admin'
  if (required === 'premium') return userRole === 'premium' || userRole === 'admin'
  if (required === 'admin') return userRole === 'admin'
  return false
}

/**
 * Busca o PDF estampado para esse usuário; gera+cacheia na primeira vez.
 * O cache vive em users-watermarked/{user_id}/{hash}.pdf, onde hash é
 * derivado de bucket+path para evitar colisões.
 */
export async function getOrCreateWatermarkedPdf(args: {
  userId: string
  email: string
  bucket: string
  path: string
}): Promise<Uint8Array> {
  const admin = getSupabaseAdmin()
  const cacheKey = `${args.userId}/${createHash('sha256').update(`${args.bucket}|${args.path}`).digest('hex')}.pdf`

  // 1. Tenta cache
  const cached = await admin.storage.from(WATERMARKED_BUCKET).download(cacheKey)
  if (cached.data) {
    const buf = await cached.data.arrayBuffer()
    return new Uint8Array(buf)
  }

  // 2. Baixa original
  const original = await admin.storage.from(args.bucket).download(args.path)
  if (original.error || !original.data) {
    throw new Error(`PDF original não encontrado: ${args.bucket}/${args.path} (${original.error?.message ?? 'sem dados'})`)
  }
  const originalBytes = new Uint8Array(await original.data.arrayBuffer())

  // 3. Estampa
  const stamped = await applyWatermark({
    pdfBytes: originalBytes,
    email: args.email,
    userId: args.userId,
  })

  // 4. Cache (fire-and-forget; falha não impede entrega)
  void admin.storage
    .from(WATERMARKED_BUCKET)
    .upload(cacheKey, stamped, { contentType: 'application/pdf', upsert: true })
    .catch(() => {
      // log silencioso; usuário ainda recebe o PDF
    })

  return stamped
}
