import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { triggerPhoneCallNotification } from '@/lib/notify'
import {
  getWhatsAppProvider,
  normalizeBrWhatsAppE164,
  sendWhatsAppMessage,
  whatsappBroadcastDelayMs,
} from '@/lib/whatsapp-notify'

export type BroadcastResult = {
  provider: string
  total: number
  sent: number
  failed: number
  skipped: number
}

function buildAnnouncementMessage(title: string, showOnHome: boolean): { fullText: string; link: string } {
  const origin = getPublicSiteOrigin()
  const link = showOnHome ? origin : `${origin}/lideres/painel`
  const fullText = [
    '*Brit Im Mashiach*',
    '',
    'Novo aviso da kehilah:',
    title,
    '',
    `Detalhes: ${link}`,
  ].join('\n')
  return { fullText, link }
}

/** Conta membros com opt-in e numero valido. */
export async function countWhatsAppOptInMembers(): Promise<number> {
  if (!hasServiceRoleEnv()) return 0
  const admin = getSupabaseAdmin()
  const { count, error } = await admin
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('whatsapp_notify', true)
    .not('whatsapp', 'is', null)

  if (error) {
    console.warn('[broadcast-whatsapp] count:', error.message)
    return 0
  }
  return count ?? 0
}

/**
 * Envia o titulo do aviso por WhatsApp a todos com opt-in.
 * Executar em background (after) para nao travar o admin.
 */
export async function broadcastAnnouncementWhatsApp(params: {
  title: string
  showOnHome: boolean
}): Promise<BroadcastResult> {
  const provider = getWhatsAppProvider()
  const empty: BroadcastResult = {
    provider,
    total: 0,
    sent: 0,
    failed: 0,
    skipped: 0,
  }

  if (!hasServiceRoleEnv()) return empty

  if (provider === 'none') {
    console.warn(
      '[broadcast-whatsapp] WHATSAPP_PROVIDER nao configurado (meta ou twilio). Pulando disparo.',
    )
    void triggerPhoneCallNotification(
      `Brit im Mashiach. Aviso publicado: ${params.title}. Configure WhatsApp na Vercel para enviar aos membros.`,
    )
    return empty
  }

  const admin = getSupabaseAdmin()
  const { data: rows, error } = await admin
    .from('profiles')
    .select('id, whatsapp, full_name')
    .eq('whatsapp_notify', true)
    .not('whatsapp', 'is', null)
    .limit(200)

  if (error) {
    console.warn('[broadcast-whatsapp] select:', error.message)
    return empty
  }

  const { fullText, link } = buildAnnouncementMessage(params.title, params.showOnHome)
  const delay = whatsappBroadcastDelayMs()
  let sent = 0
  let failed = 0
  let skipped = 0

  for (const row of rows ?? []) {
    const raw = row.whatsapp?.trim()
    if (!raw) {
      skipped++
      continue
    }
    const toE164 = normalizeBrWhatsAppE164(raw)
    if (toE164.length < 12) {
      skipped++
      continue
    }

    const ok = await sendWhatsAppMessage({
      toE164,
      title: params.title,
      link,
      fullText,
    })
    if (ok) sent++
    else failed++

    await new Promise((r) => setTimeout(r, delay))
  }

  const total = rows?.length ?? 0
  console.info(
    `[broadcast-whatsapp] provider=${provider} total=${total} sent=${sent} failed=${failed} skipped=${skipped}`,
  )

  void triggerPhoneCallNotification(
    `Brit im Mashiach. Aviso enviado por zap. ${sent} de ${total} membros.`,
  )

  return { provider, total, sent, failed, skipped }
}
