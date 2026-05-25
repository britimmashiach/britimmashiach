/**
 * Checklist de Auth / recovery de senha (Supabase Dashboard).
 *
 * Uso: npm run check:auth
 */
const PRODUCTION_ORIGIN = 'https://britimmashiach.com'

function printForOrigin(label: string, origin: string) {
  console.log(`\n── ${label} (${origin}) ──\n`)
  console.log('Site URL:')
  console.log(`  ${origin}`)
  console.log('\nRedirect URLs:')
  for (const url of [
    `${origin}/auth/callback`,
    `${origin}/auth/callback*`,
  ]) {
    console.log(`  ${url}`)
  }
  const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent('/auth/redefinir-senha')}`
  console.log('\nRedirect do recovery:')
  console.log(`  ${redirectTo}`)
}

function main() {
  console.log('\n🔐 Supabase → Authentication → URL Configuration')

  printForOrigin('Produção (obrigatório)', PRODUCTION_ORIGIN)
  printForOrigin('Desenvolvimento local', 'http://localhost:3000')

  console.log('\n── Fluxo de teste ──\n')
  console.log('  1. https://britimmashiach.com/auth → Esqueci minha senha')
  console.log('  2. E-mail → callback → /auth/redefinir-senha')
  console.log('  3. Nova senha → /profile')
  console.log('\nEnviar e-mail de teste:')
  console.log('  npm run auth:recovery -- seu@email.com')
}

main()
