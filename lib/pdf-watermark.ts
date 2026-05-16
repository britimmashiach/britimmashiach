import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib'

interface WatermarkOptions {
  pdfBytes: ArrayBuffer | Uint8Array
  email: string
  userId: string
}

/**
 * Aplica marca d'água personalizada (email + userId + data) em cada página.
 * Estampa em rodapé (forte) + diagonal central (suave).
 * Retorna bytes do novo PDF.
 */
export async function applyWatermark({ pdfBytes, email, userId }: WatermarkOptions): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes, { updateMetadata: false })
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
  const idShort = userId.slice(0, 8)
  const footer = `${email}  ·  ${stamp} UTC  ·  Brit Im Mashiach  ·  id:${idShort}`
  const diagonal = `${email}  ·  ${stamp}`

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize()

    // Diagonal central, muito suave (denuncia origem em prints sem incomodar leitura)
    const diagFontSize = Math.min(width, height) * 0.04
    const diagTextWidth = fontBold.widthOfTextAtSize(diagonal, diagFontSize)
    page.drawText(diagonal, {
      x: width / 2 - diagTextWidth / 2 * Math.cos(Math.PI / 6),
      y: height / 2 - diagTextWidth / 2 * Math.sin(Math.PI / 6),
      size: diagFontSize,
      font: fontBold,
      color: rgb(0.5, 0.5, 0.55),
      opacity: 0.08,
      rotate: degrees(-30),
    })

    // Rodapé, mais firme
    const footerSize = 7
    const footerWidth = font.widthOfTextAtSize(footer, footerSize)
    // Fundo translúcido pra leitura sobre qualquer conteúdo
    page.drawRectangle({
      x: (width - footerWidth) / 2 - 6,
      y: 4,
      width: footerWidth + 12,
      height: footerSize + 6,
      color: rgb(1, 1, 1),
      opacity: 0.55,
    })
    page.drawText(footer, {
      x: (width - footerWidth) / 2,
      y: 8,
      size: footerSize,
      font,
      color: rgb(0.15, 0.15, 0.2),
      opacity: 0.85,
    })
  }

  return await pdfDoc.save()
}
