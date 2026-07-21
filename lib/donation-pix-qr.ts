import QRCode from 'qrcode'

/** Gera data URL PNG do QR Code a partir do payload PIX. */
export async function donationPixQrDataUrl(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 280,
    color: {
      dark: '#00204F',
      light: '#FFFFFF',
    },
  })
}
