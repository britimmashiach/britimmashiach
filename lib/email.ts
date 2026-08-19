/**
 * E-mail transacional via Resend (notificações de pedidos de oração).
 *
 * Setup único:
 *  1. Criar conta grátis em resend.com → API Keys → Create API Key.
 *  2. Configurar em .env.local / Vercel:
 *       RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
 *       RESEND_FROM_EMAIL="Brit Im Mashiach <onboarding@resend.dev>"
 *  3. (Opcional) Verificar o domínio britimmashiach.com em Resend → Domains
 *     para trocar o remetente por algo como noreply@britimmashiach.com.
 *
 * Nunca lança: falha de e-mail nunca deve impedir o fluxo principal (a
 * notificação in-app já foi salva). Erros são apenas logados.
 */

const DEFAULT_FROM = 'Brit Im Mashiach <onboarding@resend.dev>'

function hasResendEnv(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

export function isResendConfigured(): boolean {
  return hasResendEnv()
}

function getFrom(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM
}

export type EmailAttachment = {
  filename: string
  /** Conteúdo em Base64 (Resend). */
  content: string
  contentType?: string
}

export async function sendEmail(params: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  attachments?: EmailAttachment[]
}): Promise<boolean> {
  if (!hasResendEnv()) {
    console.warn('[email] RESEND_API_KEY ausente; pulando envio.')
    return false
  }

  const apiKey = process.env.RESEND_API_KEY!.trim()

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: getFrom(),
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
        ...(params.replyTo ? { reply_to: params.replyTo } : {}),
        ...(params.attachments?.length
          ? {
              attachments: params.attachments.map((a) => ({
                filename: a.filename,
                content: a.content,
                ...(a.contentType ? { content_type: a.contentType } : {}),
              })),
            }
          : {}),
      }),
      cache: 'no-store',
    })

    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.warn(`[email] Resend HTTP ${res.status}: ${body.slice(0, 300)}`)
      return false
    }
    return true
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn(`[email] Falha ao enviar via Resend: ${msg}`)
    return false
  }
}

/** Envolve o conteúdo num layout simples, consistente com a identidade do site. */
export function emailLayout(params: { title: string; bodyHtml: string; ctaHref?: string; ctaLabel?: string }): string {
  const { title, bodyHtml, ctaHref, ctaLabel } = params
  const cta =
    ctaHref && ctaLabel
      ? `<p style="margin:28px 0 0"><a href="${ctaHref}" style="background:#c9a84c;color:#0e1d25;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;display:inline-block">${ctaLabel}</a></p>`
      : ''

  return `
<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#f9f4e8;font-family:Georgia,'Times New Roman',serif">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px">
      <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c9a84c;font-weight:600;margin:0 0 18px">
        Brit Im Mashiach
      </p>
      <h1 style="font-size:20px;color:#0e1d25;margin:0 0 16px;font-weight:600">${title}</h1>
      <div style="font-size:15px;line-height:1.6;color:#333">${bodyHtml}</div>
      ${cta}
      <hr style="border:none;border-top:1px solid #e5ddc8;margin:32px 0 16px" />
      <p style="font-size:11px;color:#999;margin:0">
        Sinagoga Brit Im Mashiach — Franca, SP. Este e-mail foi enviado automaticamente; não é necessário responder.
      </p>
    </div>
  </body>
</html>`
}
