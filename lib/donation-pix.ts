/**
 * Configuração pública da doação PIX da sinagoga.
 * QR oficial: /public/images/doacao-pix-qr.png (sempre usado no header).
 * Opcional: NEXT_PUBLIC_DONATION_PIX_PAYLOAD (botão copiar código).
 * Opcional: NEXT_PUBLIC_DONATION_PIX_BENEFICIARY (nome exibido).
 */

export type DonationPixConfig = {
  payload: string | null
  beneficiary: string
  qrImageUrl: string
}

export function getDonationPixConfig(): DonationPixConfig {
  const payload = (process.env.NEXT_PUBLIC_DONATION_PIX_PAYLOAD ?? '').trim() || null
  const beneficiary =
    (process.env.NEXT_PUBLIC_DONATION_PIX_BENEFICIARY ?? '').trim() ||
    'Sinagoga Brit Im Mashiach'

  return {
    payload,
    beneficiary,
    qrImageUrl: '/images/doacao-pix-qr.png',
  }
}
