import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { emailLayout, sendEmail } from '@/lib/email'

type AdminClient = SupabaseClient<Database>

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://britimmashiach.com'

export async function notifyAdminsEscolaColacao(
  admin: AdminClient,
  detail: {
    learnerName: string | null
    learnerEmail: string
    courseTitle: string
    stageTitle: string
    scorePct: number
  },
): Promise<void> {
  const { data: admins } = await admin
    .from('profiles')
    .select('email, full_name')
    .eq('role', 'admin')
    .not('email', 'is', null)

  const emails = [...new Set((admins ?? []).map((a) => a.email?.trim()).filter(Boolean))] as string[]
  if (emails.length === 0) return

  const who = detail.learnerName?.trim() || detail.learnerEmail
  const subject = `Escola: colação pendente, ${who} apto em ${detail.stageTitle}`
  const adminUrl = `${SITE_URL}/admin#escola-colacao`
  const bodyLine = `${who} obteve ${detail.scorePct}% na etapa ${detail.stageTitle} (${detail.courseTitle}). Assine a colação no painel.`
  const html = emailLayout({
    title: 'Colação da Escola',
    bodyHtml: `<p>${bodyLine}</p>`,
    ctaLabel: 'Abrir painel de colação',
    ctaHref: adminUrl,
  })
  const text = `${bodyLine}\n\n${adminUrl}`

  await sendEmail({ to: emails, subject, html, text })
}
