/**
 * Notificacoes por CHAMADA telefonica (text-to-speech) via CallMeBot.
 *
 * Setup unico:
 *  1. No WhatsApp, adicionar o numero do bot CallMeBot (o que estiver
 *     ativo no momento; foi distribuido pelo proprio CallMeBot em
 *     resposta automatica). Enviar a frase exata que o bot pedir.
 *  2. Anotar o numero (com DDI, sem '+') e a APIKEY retornada.
 *  3. Configurar no Vercel (Production + Preview + Development):
 *       CALLMEBOT_PHONE  = numero internacional sem '+', ex.: 5516999999999
 *       CALLMEBOT_APIKEY = chave numerica recebida
 *  4. Redeploy.
 *
 * Caracteristicas:
 *  - Falha silenciosa: nunca bloqueia o fluxo de cadastro.
 *  - Timeout curto (8s) para nao prender Server Actions.
 *  - Sem dependencias externas (usa fetch nativo do Node 18+).
 *  - O CallMeBot le o texto em voz, entao mensagens precisam ser
 *    curtas e em frases simples para soar claro.
 */

const CALLMEBOT_CALL_ENDPOINT = 'https://api.callmebot.com/call.php'
const CALLMEBOT_WHATSAPP_ENDPOINT = 'https://api.callmebot.com/whatsapp.php'
const REQUEST_TIMEOUT_MS = 8000

function hasCallMeBotEnv(): boolean {
  return Boolean(process.env.CALLMEBOT_PHONE?.trim() && process.env.CALLMEBOT_APIKEY?.trim())
}

function hasWhatsAppEnv(): boolean {
  return Boolean(
    process.env.CALLMEBOT_WHATSAPP_PHONE?.trim() && process.env.CALLMEBOT_WHATSAPP_APIKEY?.trim(),
  )
}

/**
 * Envia uma MENSAGEM DE TEXTO para o WhatsApp do administrador via CallMeBot.
 *
 * Setup unico (uma vez):
 *  1. No WhatsApp, adicionar o numero do CallMeBot (+34 644 60 90 95) e enviar
 *     a frase: "I allow callmebot to send me messages".
 *  2. O bot responde com uma APIKEY.
 *  3. Configurar no Vercel (Production + Preview + Development):
 *       CALLMEBOT_WHATSAPP_PHONE  = seu numero com DDI, sem '+', ex.: 5516996326446
 *       CALLMEBOT_WHATSAPP_APIKEY = chave recebida do bot
 *  4. Redeploy.
 *
 * Nunca lanca: erros sao apenas logados. Retorna true em sucesso.
 */
export async function triggerWhatsAppNotification(text: string): Promise<boolean> {
  if (!hasWhatsAppEnv()) {
    return false
  }

  const phone = process.env.CALLMEBOT_WHATSAPP_PHONE!.trim().replace(/[^\d]/g, '')
  const apikey = process.env.CALLMEBOT_WHATSAPP_APIKEY!.trim()

  const url = new URL(CALLMEBOT_WHATSAPP_ENDPOINT)
  url.searchParams.set('phone', phone)
  url.searchParams.set('text', text)
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
      console.warn(`[notify] CallMeBot WhatsApp HTTP ${res.status}: ${body.slice(0, 200)}`)
      return false
    }
    return true
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(`[notify] Falha ao enviar WhatsApp: ${msg}`)
    return false
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Dispara uma chamada telefonica com TTS via CallMeBot.
 * Nunca lanca: erros sao apenas logados. Retorna true em sucesso.
 */
export async function triggerPhoneCallNotification(textToSpeak: string): Promise<boolean> {
  if (!hasCallMeBotEnv()) {
    console.warn('[notify] CALLMEBOT_PHONE/CALLMEBOT_APIKEY ausentes; pulando notificacao.')
    return false
  }

  const phone = process.env.CALLMEBOT_PHONE!.trim().replace(/[^\d]/g, '')
  const apikey = process.env.CALLMEBOT_APIKEY!.trim()

  const url = new URL(CALLMEBOT_CALL_ENDPOINT)
  url.searchParams.set('phone', phone)
  url.searchParams.set('text', textToSpeak)
  url.searchParams.set('apikey', apikey)
  // 'lang' aceito pelo CallMeBot para definir o idioma da voz.
  url.searchParams.set('lang', 'pt-BR-Standard-A')

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
      console.warn(`[notify] CallMeBot HTTP ${res.status}: ${body.slice(0, 200)}`)
      return false
    }
    return true
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(`[notify] Falha ao acionar CallMeBot: ${msg}`)
    return false
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Converte um e-mail em uma forma falada legivel pelo TTS.
 * Ex.: joao.silva@gmail.com -> "joao ponto silva arroba gmail ponto com"
 */
function emailToSpeech(email: string): string {
  return email
    .replace(/@/g, ' arroba ')
    .replace(/\./g, ' ponto ')
    .replace(/_/g, ' underline ')
    .replace(/-/g, ' traco ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Mensagem padrao falada quando um novo usuario se cadastra. */
export async function notifyNewSignup(params: {
  email: string
  fullName: string
}): Promise<boolean> {
  const { email, fullName } = params
  const safeName = (fullName || '').trim() || 'usuario sem nome'
  const safeEmail = emailToSpeech(email)

  // Curto, em frases separadas: a chamada nao dura mais que ~10 segundos.
  const text = `Brit im Mashiach. Novo cadastro no site. Nome: ${safeName}. E-mail: ${safeEmail}.`

  return triggerPhoneCallNotification(text)
}

/**
 * Notifica o administrador (via WhatsApp de texto, com fallback para chamada)
 * sobre uma nova mensagem enviada por um formulario do site.
 *
 * Preferencia:
 *  1. WhatsApp de texto (CallMeBot) -> mensagem completa e legivel.
 *  2. Se WhatsApp nao estiver configurado, cai para a chamada telefonica (TTS)
 *     com um resumo curto.
 *
 * Nunca lanca. Falha de notificacao nao deve impactar o envio do visitante.
 */
export async function notifySiteMessage(params: {
  /** Rotulo do tipo: 'Pedido de oracao', 'Ouvidoria - Sugestao', etc. */
  kind: string
  name?: string | null
  email?: string | null
  message: string
}): Promise<boolean> {
  const { kind } = params
  const name = (params.name || '').trim() || 'Nao informado'
  const email = (params.email || '').trim() || 'Nao informado'
  const message = (params.message || '').trim()

  // WhatsApp aceita texto longo; ainda assim limitamos para evitar abusos.
  const safeMessage = message.length > 900 ? `${message.slice(0, 900)}...` : message

  const whatsappText =
    `*Brit im Mashiach - Nova mensagem do site*\n` +
    `Tipo: ${kind}\n` +
    `Nome: ${name}\n` +
    `E-mail: ${email}\n` +
    `\n${safeMessage}`

  const sentWhatsApp = await triggerWhatsAppNotification(whatsappText)
  if (sentWhatsApp) return true

  // Fallback: chamada telefonica curta (nao le a mensagem inteira).
  const spoken = `Brit im Mashiach. Nova mensagem no site. Tipo: ${kind}. De: ${name}.`
  return triggerPhoneCallNotification(spoken)
}
