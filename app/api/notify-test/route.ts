import { NextResponse } from 'next/server'
import { triggerPhoneCallNotification } from '@/lib/notify'

/**
 * Rota de teste para validar a integracao com CallMeBot (Phone Call TTS).
 * Uso (apenas Rav EBBY): GET /api/notify-test?secret=SEU_SECRET
 *
 * Protegida por NOTIFY_TEST_SECRET (env var). Se a env nao estiver
 * configurada, a rota responde 404 para nao expor a funcionalidade.
 */
export async function GET(request: Request) {
  const secret = process.env.NOTIFY_TEST_SECRET?.trim()
  if (!secret) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const url = new URL(request.url)
  const provided = url.searchParams.get('secret')
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sent = await triggerPhoneCallNotification(
    'Brit im Mashiach. Teste de notificacao por chamada. Integracao ativa.',
  )

  return NextResponse.json({ sent })
}
