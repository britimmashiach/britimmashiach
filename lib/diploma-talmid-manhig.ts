import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export type TalmidManhigDiplomaInput = {
  fullName: string
  email: string
  concludedAt: Date
}

/** Helvetica (WinAnsi) não cobre acentos PT; normaliza para o PDF. */
function pdfSafe(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[—–]/g, ',')
    .replace(/[“”«»]/g, '')
    .replace(/[‘’]/g, "'")
}

function formatDatePt(d: Date): string {
  return pdfSafe(
    d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo',
    }),
  )
}

/**
 * Gera diploma PDF personalizado (Talmid Manhig) em A4 paisagem.
 * Usa apenas Helvetica (pdf-lib standard) para não depender de fontes externas.
 */
export async function generateTalmidManhigDiplomaPdf(
  input: TalmidManhigDiplomaInput,
): Promise<Uint8Array> {
  const name = pdfSafe(input.fullName.trim() || input.email.split('@')[0] || 'Talmid')
  const dateLabel = formatDatePt(input.concludedAt)
  const emailSafe = pdfSafe(input.email)

  const pdf = await PDFDocument.create()
  // A4 landscape: 842 x 595 pt
  const page = pdf.addPage([842, 595])
  const { width, height } = page.getSize()

  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await pdf.embedFont(StandardFonts.HelveticaOblique)

  const navy = rgb(0, 0.125, 0.31) // #00204F
  const gold = rgb(0.788, 0.659, 0.298) // #C9A84C
  const ink = rgb(0.1, 0.12, 0.14)
  const muted = rgb(0.35, 0.38, 0.4)

  // Fundo pergaminho suave
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.98, 0.96, 0.91),
  })

  // Moldura dupla
  page.drawRectangle({
    x: 28,
    y: 28,
    width: width - 56,
    height: height - 56,
    borderColor: gold,
    borderWidth: 2.5,
  })
  page.drawRectangle({
    x: 36,
    y: 36,
    width: width - 72,
    height: height - 72,
    borderColor: navy,
    borderWidth: 1,
  })

  const centerX = (text: string, size: number, f = font) =>
    (width - f.widthOfTextAtSize(text, size)) / 2

  page.drawText('SINAGOGA BRIT IM MASHIACH', {
    x: centerX('SINAGOGA BRIT IM MASHIACH', 12, fontBold),
    y: height - 78,
    size: 12,
    font: fontBold,
    color: navy,
  })

  page.drawText('Franca, SP', {
    x: centerX('Franca, SP', 10, font),
    y: height - 96,
    size: 10,
    font,
    color: muted,
  })

  page.drawText('DIPLOMA DE FORMACAO', {
    x: centerX('DIPLOMA DE FORMACAO', 22, fontBold),
    y: height - 150,
    size: 22,
    font: fontBold,
    color: gold,
  })

  page.drawText('Talmid Manhig', {
    x: centerX('Talmid Manhig', 28, fontBold),
    y: height - 188,
    size: 28,
    font: fontBold,
    color: navy,
  })

  page.drawText('Formacao Manhigut · Escola Rav EBBY', {
    x: centerX('Formacao Manhigut · Escola Rav EBBY', 12, fontItalic),
    y: height - 214,
    size: 12,
    font: fontItalic,
    color: muted,
  })

  const line1 = 'Certificamos que'
  page.drawText(line1, {
    x: centerX(line1, 12, font),
    y: height - 260,
    size: 12,
    font,
    color: ink,
  })

  page.drawText(name, {
    x: centerX(name, 26, fontBold),
    y: height - 300,
    size: 26,
    font: fontBold,
    color: navy,
  })

  // Linha sob o nome
  const nameW = fontBold.widthOfTextAtSize(name, 26)
  page.drawLine({
    start: { x: (width - nameW) / 2 - 20, y: height - 312 },
    end: { x: (width + nameW) / 2 + 20, y: height - 312 },
    thickness: 1,
    color: gold,
  })

  const body =
    'concluiu com aproveitamento a Formacao Manhigut (24 meses), recebendo o titulo de Talmid Manhig, segundo o Metodo Rav EBBY da Sinagoga Brit Im Mashiach.'
  // Quebra manual simples
  const wrap = (text: string, maxWidth: number, size: number) => {
    const words = text.split(' ')
    const lines: string[] = []
    let cur = ''
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w
      if (font.widthOfTextAtSize(next, size) > maxWidth) {
        if (cur) lines.push(cur)
        cur = w
      } else {
        cur = next
      }
    }
    if (cur) lines.push(cur)
    return lines
  }

  const bodyLines = wrap(body, width - 160, 11)
  let y = height - 350
  for (const line of bodyLines) {
    page.drawText(line, {
      x: centerX(line, 11, font),
      y,
      size: 11,
      font,
      color: ink,
    })
    y -= 16
  }

  page.drawText(`Data da conclusao: ${dateLabel}`, {
    x: centerX(`Data da conclusao: ${dateLabel}`, 11, font),
    y: 150,
    size: 11,
    font,
    color: muted,
  })

  page.drawText('Ken Yehi Ratzon', {
    x: 80,
    y: 100,
    size: 14,
    font: fontItalic,
    color: gold,
  })

  page.drawText('Rav.: EBBY', {
    x: width - 80 - fontItalic.widthOfTextAtSize('Rav.: EBBY', 14),
    y: 100,
    size: 14,
    font: fontItalic,
    color: navy,
  })

  page.drawText(`Registro: ${emailSafe}`, {
    x: centerX(`Registro: ${emailSafe}`, 8, font),
    y: 58,
    size: 8,
    font,
    color: muted,
  })

  return pdf.save()
}
