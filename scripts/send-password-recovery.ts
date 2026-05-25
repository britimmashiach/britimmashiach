import { createClient } from '@supabase/supabase-js'
import { getPublicSiteOrigin } from '../lib/public-site-url'

const email = (process.argv[2] ?? '').trim().toLowerCase()
if (!email) {
  console.error('Uso: npx tsx --env-file=.env.local scripts/send-password-recovery.ts email@exemplo.com')
  process.exit(1)
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })

async function main() {
  const { data: profile, error: pErr } = await supabase
    .from('profiles')
    .select('id, email, role')
    .ilike('email', email)
    .maybeSingle()

  if (pErr) {
    console.error('Erro profiles:', pErr.message)
    process.exit(1)
  }

  if (!profile) {
    console.log('USUARIO_NAO_ENCONTRADO no profiles para', email)
    process.exit(2)
  }

  console.log('Perfil:', profile.id, profile.email, 'role=', profile.role)

  const redirectTo = `${getPublicSiteOrigin().replace(/\/$/, '')}/auth/callback?next=${encodeURIComponent('/auth/redefinir-senha')}`

  console.log('\nRedirect configurado no e-mail:')
  console.log(redirectTo)
  console.log('\nConfirme no Supabase Dashboard que esta URL está permitida (Auth → URL Configuration).\n')

  const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email: profile.email,
    options: { redirectTo },
  })

  if (linkErr) {
    console.error('generateLink:', linkErr.message)
    process.exit(1)
  }

  console.log('\nLink de recuperação (válido por tempo limitado):')
  console.log(linkData.properties?.action_link ?? '(vazio)')

  const { error: mailErr } = await supabase.auth.resetPasswordForEmail(profile.email, { redirectTo })
  if (mailErr) {
    console.error('\nresetPasswordForEmail:', mailErr.message)
    console.log('O link acima ainda pode ser enviado manualmente ao membro.')
    process.exit(1)
  }

  console.log('\nEMAIL_RECUPERACAO_ENVIADO para', profile.email)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
