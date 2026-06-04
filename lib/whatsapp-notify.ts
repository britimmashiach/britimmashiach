/**
 * Envio de WhatsApp para membros que registraram numero + opt-in.
 *
 * Provedores (defina WHATSAPP_PROVIDER no Vercel):
 *   - meta   : WhatsApp Cloud API (Meta Business)
 *   - twilio : Twilio WhatsApp
 *
 * Meta (recomendado para avisos em massa):
 *   WHATSAPP_PROVIDER=meta
 *   WHATSAPP_ACCESS_TOKEN=...
 *   WHATSAPP_PHONE_NUMBER_ID=...
 *   WHATSAPP_TEMPLATE_NAME=avisos_kehilah  (template aprovado na Meta)
 *   WHATSAPP_TEMPLATE_LANG=pt_BR
 *
 * Twilio:
 *   WHATSAPP_PROVIDER=twilio
 *   TWILIO_ACCOUNT_SID=...
 *   TWILIO_AUTH_TOKEN=...
 *   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
 *
 * Sem provedor configurado: o disparo e ignorado (nao bloqueia publicacao).
 */

const REQUEST_TIMEOUT_MS = 12_000

export type WhatsAppProvider = 'meta' | 'twilio' | 'none'

export function getWhatsAppProvider(): WhatsAppProvider {
  const p = process.env.WHATSAPP_PROVIDER?.trim().toLowerCase()
  if (p === 'twilio' && hasTwilioWhatsAppEnv()) return 'twilio'
  if (p === 'meta' && hasMetaWhatsAppEnv()) return 'meta'
  if (!p || p === 'auto') {
    if (hasMetaWhatsAppEnv()) return 'meta'
    if (hasTwilioWhatsAppEnv()) return 'twilio'
  }
  return 'none'
}

export function hasMetaWhatsAppEnv(): boolean {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN?.trim() && process.env.WHATSAPP_PHONE_NUMBER_ID?.trim(),
  )
}

export function hasTwilioWhatsAppEnv(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID?.trim() &&
      process.env.TWILIO_AUTH_TOKEN?.trim() &&
      process.env.TWILIO_WHATSAPP_FROM?.trim(),
  )
}

/** Normaliza para E.164 Brasil (55 + DDD + numero). */
export function normalizeBrWhatsAppE164(digits: string): string {
  const d = digits.replace(/\D/g, '')
  if (!d) return ''
  if (d.startsWith('55') && d.length >= 12) return d
  if (d.length === 10 || d.length === 11) return `55${d}`
  return d
}

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' })
  } finally {
    clearTimeout(timeout)
  }
}

/** Meta Cloud API: template aprovado (fora da janela de 24h). */
async function sendMetaTemplate(toE164: string, title: string, link: string): Promise<boolean> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN!.trim()
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID!.trim()
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME?.trim() || 'avisos_kehilah'
  const lang = process.env.WHATSAPP_TEMPLATE_LANG?.trim() || 'pt_BR'

  const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`
  const body = {
    messaging_product: 'whatsapp',
    to: toE164,
    type: 'template',
    template: {
      name: templateName,
      language: { code: lang },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: title.slice(0, 1024) },
            { type: 'text', text: link.slice(0, 1024) },
          ],
        },
      ],
    },
  }

  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    console.warn(`[whatsapp-meta] ${toE164} HTTP ${res.status}: ${errBody.slice(0, 300)}`)
    return false
  }
  return true
}

/** Meta Cloud API: texto livre (so funciona dentro da janela de servico de 24h). */
async function sendMetaText(toE164: string, text: string): Promise<boolean> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN!.trim()
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID!.trim()
  const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`

  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: toE164,
      type: 'text',
      text: { body: text.slice(0, 4096) },
    }),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    console.warn(`[whatsapp-meta] ${toE164} HTTP ${res.status}: ${errBody.slice(0, 300)}`)
    return false
  }
  return true
}

async function sendTwilioWhatsApp(toE164: string, text: string): Promise<boolean> {
  const sid = process.env.TWILIO_ACCOUNT_SID!.trim()
  const token = process.env.TWILIO_AUTH_TOKEN!.trim()
  const from = process.env.TWILIO_WHATSAPP_FROM!.trim()
  const to = toE164.startsWith('whatsapp:') ? toE164 : `whatsapp:+${toE164}`

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`
  const params = new URLSearchParams({ From: from, To: to, Body: text.slice(0, 1600) })
  const auth = Buffer.from(`${sid}:${token}`).toString('base64')

  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    console.warn(`[whatsapp-twilio] ${toE164} HTTP ${res.status}: ${errBody.slice(0, 300)}`)
    return false
  }
  return true
}

export type SendWhatsAppParams = {
  toE164: string
  title: string
  link: string
  /** Texto completo para Twilio ou Meta texto livre. */
  fullText: string
}

/** Envia uma mensagem para um numero. Nunca lanca. */
export async function sendWhatsAppMessage(params: SendWhatsAppParams): Promise<boolean> {
  const provider = getWhatsAppProvider()
  const { toE164, title, link, fullText } = params
  if (!toE164 || provider === 'none') return false

  try {
    if (provider === 'meta') {
      if (process.env.WHATSAPP_TEMPLATE_NAME?.trim()) {
        return await sendMetaTemplate(toE164, title, link)
      }
      return await sendMetaText(toE164, fullText)
    }
    if (provider === 'twilio') {
      return await sendTwilioWhatsApp(toE164, fullText)
    }
    return false
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(`[whatsapp] Falha para ${toE164}: ${msg}`)
    return false
  }
}

/** Pausa entre envios para respeitar limites da API. */
export function whatsappBroadcastDelayMs(): number {
  const n = Number(process.env.WHATSAPP_BROADCAST_DELAY_MS)
  return Number.isFinite(n) && n >= 500 ? n : 2000
}
