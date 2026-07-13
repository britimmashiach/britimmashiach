// Aguarda a verificação do domínio britimmashiach.com na Resend e, quando
// concluída, troca automaticamente RESEND_FROM_EMAIL em .env.local para
// noreply@britimmashiach.com. Roda em segundo plano; pode ser interrompido
// e reexecutado sem problema (idempotente).
import fs from 'node:fs'
import path from 'node:path'

const ENV_PATH = path.resolve(process.cwd(), '.env.local')
const DOMAIN_ID = '6fcf0ef2-c7bc-4f34-9e89-f3e82230a247'
const NEW_FROM = 'Brit Im Mashiach <noreply@britimmashiach.com>'
const POLL_MS = 60_000
const MAX_ATTEMPTS = 120 // ~2h

function getApiKey() {
  const content = fs.readFileSync(ENV_PATH, 'utf8')
  const match = content.match(/RESEND_API_KEY=(.*)/)
  if (!match) throw new Error('RESEND_API_KEY não encontrada em .env.local')
  return match[1].trim()
}

async function checkStatus(apiKey) {
  await fetch(`https://api.resend.com/domains/${DOMAIN_ID}/verify`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
  }).catch(() => {})
  await new Promise((r) => setTimeout(r, 3000))
  const res = await fetch(`https://api.resend.com/domains/${DOMAIN_ID}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
  return res.json()
}

function switchSenderInEnvFile() {
  let content = fs.readFileSync(ENV_PATH, 'utf8')
  const before = content
  content = content.replace(
    /RESEND_FROM_EMAIL=.*/,
    `RESEND_FROM_EMAIL="${NEW_FROM}"`
  )
  if (content === before) {
    console.log('[wait-resend-domain] RESEND_FROM_EMAIL não encontrada para substituir; adicionando linha.')
    content += `\nRESEND_FROM_EMAIL="${NEW_FROM}"\n`
  }
  fs.writeFileSync(ENV_PATH, content, 'utf8')
}

async function main() {
  const apiKey = getApiKey()
  console.log(`[wait-resend-domain] Monitorando verificação do domínio (a cada ${POLL_MS / 1000}s)...`)

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    let data
    try {
      data = await checkStatus(apiKey)
    } catch (err) {
      console.warn(`[wait-resend-domain] Falha na tentativa ${attempt}:`, err?.message || err)
      await new Promise((r) => setTimeout(r, POLL_MS))
      continue
    }

    console.log(`[wait-resend-domain] Tentativa ${attempt}: status=${data.status}`)

    if (data.status === 'verified') {
      switchSenderInEnvFile()
      console.log('[wait-resend-domain] DOMINIO_VERIFICADO — RESEND_FROM_EMAIL atualizado para noreply@britimmashiach.com')
      console.log('[wait-resend-domain] Reinicie o servidor Next.js (dev/produção) para carregar a nova variável de ambiente.')
      return
    }

    await new Promise((r) => setTimeout(r, POLL_MS))
  }

  console.log('[wait-resend-domain] Tempo limite atingido sem verificação. Verifique os registros DNS em resend.com/domains e execute o script novamente se necessário.')
}

main().catch((err) => {
  console.error('[wait-resend-domain] Erro fatal:', err)
  process.exit(1)
})
