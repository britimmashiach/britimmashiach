/**
 * Notificacoes WhatsApp via CallMeBot.
 *
 * Setup unico (uma vez por numero destinatario):
 *  1. No WhatsApp, adicione o contato +34 644 51 95 23 (CallMeBot).
 *  2. Envie a mensagem: "I allow callmebot to send me messages"
 *  3. Aguarde a resposta automatica com sua API key.
 *  4. Defina as env vars no Vercel (Production + Preview + Development):
 *       CALLMEBOT_PHONE  = numero internacional sem o '+', ex.: 5516999999999
 *       CALLMEBOT_APIKEY = a chave numerica recebida
 *  5. Redeploy.
 *
 * Caracteristicas:
 *  - Falha silenciosa: nunca bloqueia o fluxo de cadastro.
 *  - Timeout curto (8s) para nao prender Server Actions.
 *  - Sem dependencias externas (usa fetch nativo do Node 18+).
 */

const CALLMEBOT_ENDPOINT = 'https://api.callmebot.com/whatsapp.php'
const REQUEST_TIMEOUT_MS = 8000

function hasCallMeBotEnv(): boolean {
  return Boolean(process.env.CALLMEBOT_PHONE?.trim() && process.env.CALLMEBOT_APIKEY?.trim())
}

/**
 * Envia mensagem WhatsApp via CallMeBot.
 * Nunca lanca: erros sao apenas logados. Retorna true se o envio teve sucesso.
 */
export async function sendWhatsAppNotification(message: string): Promise<boolean> {
  if (!hasCallMeBotEnv()) {
    console.warn('[whatsapp-notify] CALLMEBOT_PHONE/CALLMEBOT_APIKEY ausentes; pulando notificacao.')
    return false
  }

  const phone = process.env.CALLMEBOT_PHONE!.trim().replace(/[^\d]/g, '')
  const apikey = process.env.CALLMEBOT_APIKEY!.trim()

  const url = new URL(CALLMEBOT_ENDPOINT)
  url.searchParams.set('phone', phone)
  url.searchParams.set('text', message)
  url.searchParams.set('apikey', apikey)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const res = await fetch(url.toString(), {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.warn(`[whatsapp-notify] CallMeBot HTTP ${res.status}: ${body.slice(0, 200)}`)
      return false
    }
    return true
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(`[whatsapp-notify] Falha ao enviar WhatsApp: ${msg}`)
    return false
  } finally {
    clearTimeout(timeout)
  }
}

/** Mensagem padronizada de novo cadastro na congregacao. */
export async function notifyNewSignup(params: {
  email: string
  fullName: string
}): Promise<boolean> {
  const { email, fullName } = params
  const when = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'short',
  })

  const message = [
    'Brit Im Mashiach: novo cadastro no site',
    '',
    `Nome: ${fullName || '(sem nome)'}`,
    `Email: ${email}`,
    `Quando: ${when} (Sao Paulo)`,
  ].join('\n')

  return sendWhatsAppNotification(message)
}
