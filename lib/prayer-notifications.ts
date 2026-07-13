import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { sendEmail, emailLayout } from '@/lib/email'
import type { Database } from '@/types/database'

type NotificationRow = Database['public']['Tables']['notifications']['Row']
type NotificationInsert = Database['public']['Tables']['notifications']['Insert']

const PAINEL_ORACAO_PATH = '/lideres/painel#pedidos-de-oracao'

/** Líderes aprovados, mestres e administradores: todos podem responder pedidos de oração. */
async function fetchLeaderRecipients(): Promise<{ id: string; email: string; full_name: string | null }[]> {
  const admin = getSupabaseAdmin()
  const { data, error } = await admin
    .from('profiles')
    .select('id, email, full_name')
    .or('role.eq.admin,is_leader.eq.true,is_mestre.eq.true')

  if (error) {
    console.error('[prayer-notifications] falha ao listar líderes/mestres:', error.message)
    return []
  }
  return data ?? []
}

async function insertNotifications(rows: NotificationInsert[]): Promise<void> {
  if (rows.length === 0) return
  const admin = getSupabaseAdmin()
  const { error } = await admin.from('notifications').insert(rows)
  if (error) {
    console.error('[prayer-notifications] falha ao criar notificações:', error.message)
  }
}

function truncate(text: string, max: number): string {
  const trimmed = text.trim()
  return trimmed.length > max ? `${trimmed.slice(0, max)}...` : trimmed
}

/**
 * Dispara ao criar um novo pedido de oração: notificação in-app para todo
 * líder/mestre/admin, e um e-mail para cada um que tiver endereço cadastrado.
 * Nunca lança: falha aqui não deve impedir o envio do pedido pelo visitante.
 */
export async function notifyLeadersOfNewPrayerRequest(params: {
  prayerRequestId: string
  requesterName: string
  message: string
}): Promise<void> {
  const { prayerRequestId, requesterName, message } = params

  try {
    const recipients = await fetchLeaderRecipients()
    if (recipients.length === 0) return

    const link = PAINEL_ORACAO_PATH
    const title = 'Novo pedido de oração'
    const body = `${requesterName}: ${truncate(message, 160)}`

    await insertNotifications(
      recipients.map((r) => ({
        user_id: r.id,
        type: 'prayer_request_new',
        title,
        body,
        link,
        metadata: { prayer_request_id: prayerRequestId },
      })),
    )

    const siteUrl = getPublicSiteOrigin()
    const emails = recipients.map((r) => r.email).filter((e): e is string => Boolean(e?.trim()))
    if (emails.length === 0) return

    const html = emailLayout({
      title: 'Novo pedido de oração recebido',
      bodyHtml: `
        <p><strong>${requesterName}</strong> enviou um novo pedido de oração pelo site.</p>
        <blockquote style="margin:16px 0;padding:12px 16px;background:#f4efe1;border-left:3px solid #c9a84c;border-radius:6px;font-style:italic">
          ${truncate(message, 500)}
        </blockquote>
        <p>Responda pelo Painel de Líderes para que a pessoa receba a resposta no site e por e-mail.</p>
      `,
      ctaHref: `${siteUrl}${link}`,
      ctaLabel: 'Abrir o Painel de Líderes',
    })

    await sendEmail({
      to: emails,
      subject: `Novo pedido de oração — ${requesterName}`,
      html,
      text: `${requesterName} enviou um novo pedido de oração: ${message}\n\nResponda em ${siteUrl}${link}`,
    })
  } catch (err) {
    console.error('[prayer-notifications] notifyLeadersOfNewPrayerRequest falhou:', err)
  }
}

/**
 * Dispara quando um líder/mestre/admin responde um pedido de oração:
 * notificação in-app (se o autor estiver logado) e e-mail (se houver contato).
 * Nunca lança.
 */
export async function notifyAuthorOfPrayerResponse(params: {
  userId: string | null
  contactName: string | null
  contactEmail: string | null
  originalMessage: string
  responseText: string
  responderName: string | null
}): Promise<void> {
  const { userId, contactName, contactEmail, originalMessage, responseText, responderName } = params

  try {
    const link = '/'
    const title = 'Seu pedido de oração recebeu uma resposta'
    const body = truncate(responseText, 160)

    if (userId) {
      await insertNotifications([
        {
          user_id: userId,
          type: 'prayer_request_response',
          title,
          body,
          link,
          metadata: {},
        },
      ])
    }

    if (!contactEmail) return

    const siteUrl = getPublicSiteOrigin()
    const greetingName = (contactName || '').trim().split(/\s+/)[0] || 'Shalom'
    const from = responderName ? `${responderName}, da liderança da Brit Im Mashiach` : 'A liderança da Brit Im Mashiach'

    const html = emailLayout({
      title: 'Recebemos seu pedido de oração — e respondemos',
      bodyHtml: `
        <p>${greetingName}, ${from} enviou uma resposta ao seu pedido de oração:</p>
        <blockquote style="margin:16px 0;padding:12px 16px;background:#f4efe1;border-left:3px solid #c9a84c;border-radius:6px;font-style:italic">
          ${truncate(originalMessage, 400)}
        </blockquote>
        <p style="font-weight:600;margin:20px 0 8px">Resposta:</p>
        <p style="white-space:pre-wrap">${truncate(responseText, 2000)}</p>
      `,
      ctaHref: siteUrl,
      ctaLabel: 'Visitar o site',
    })

    await sendEmail({
      to: contactEmail,
      subject: 'Resposta ao seu pedido de oração — Brit Im Mashiach',
      html,
      text: `${from} respondeu ao seu pedido de oração:\n\n"${originalMessage}"\n\nResposta:\n${responseText}`,
    })
  } catch (err) {
    console.error('[prayer-notifications] notifyAuthorOfPrayerResponse falhou:', err)
  }
}

export async function fetchUnreadNotificationCount(userId: string): Promise<number> {
  const admin = getSupabaseAdmin()
  const { count, error } = await admin
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .is('read_at', null)

  if (error) {
    console.error('[prayer-notifications] falha ao contar não lidas:', error.message)
    return 0
  }
  return count ?? 0
}

export async function fetchRecentNotifications(userId: string, limit = 15): Promise<NotificationRow[]> {
  const admin = getSupabaseAdmin()
  const { data, error } = await admin
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[prayer-notifications] falha ao listar notificações:', error.message)
    return []
  }
  return data ?? []
}

export async function fetchUnreadNotificationsByType(
  userId: string,
  type: string,
  limit = 5,
): Promise<NotificationRow[]> {
  const admin = getSupabaseAdmin()
  const { data, error } = await admin
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('type', type)
    .is('read_at', null)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('[prayer-notifications] falha ao listar notificações por tipo:', error.message)
    return []
  }
  return data ?? []
}

export async function markNotificationRead(userId: string, id: string): Promise<boolean> {
  const admin = getSupabaseAdmin()
  const { error } = await admin
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', userId)

  if (error) {
    console.error('[prayer-notifications] falha ao marcar lida:', error.message)
    return false
  }
  return true
}

export async function markAllNotificationsRead(userId: string): Promise<boolean> {
  const admin = getSupabaseAdmin()
  const { error } = await admin
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('user_id', userId)
    .is('read_at', null)

  if (error) {
    console.error('[prayer-notifications] falha ao marcar todas lidas:', error.message)
    return false
  }
  return true
}

export type { NotificationRow }
