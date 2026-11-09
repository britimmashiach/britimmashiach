import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export type EscolaDiplomaInput = {
  fullName: string
  email: string
  certificationTitle: string
  courseTitle: string
  bodyLine: string
  certificateCode: string
  concludedAt: Date
}

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

export async function generateEscolaDiplomaPdf(input: EscolaDiplomaInput): Promise<Uint8Array> {
  const name = pdfSafe(input.fullName.trim() || input.email.split('@')[0] || 'Talmid')
  const dateLabel = formatDatePt(input.concludedAt)
  const emailSafe = pdfSafe(input.email)
  const certTitle = pdfSafe(input.certificationTitle)
  const courseTitle = pdfSafe(input.courseTitle)
  const body = pdfSafe(input.bodyLine)
  const code = pdfSafe(input.certificateCode)

  const pdf = await PDFDocument.create()
  const page = pdf.addPage([842, 595])
  const { width, height } = page.getSize()

  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await pdf.embedFont(StandardFonts.HelveticaOblique)

  const navy = rgb(0, 0.125, 0.31)
  const gold = rgb(0.788, 0.659, 0.298)
  const ink = rgb(0.1, 0.12, 0.14)
  const muted = rgb(0.35, 0.38, 0.4)

  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.98, 0.96, 0.91) })
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

  page.drawText('DIPLOMA DA ESCOLA RAV EBBY', {
    x: centerX('DIPLOMA DA ESCOLA RAV EBBY', 20, fontBold),
    y: height - 150,
    size: 20,
    font: fontBold,
    color: gold,
  })

  page.drawText(certTitle, {
    x: centerX(certTitle, 26, fontBold),
    y: height - 188,
    size: 26,
    font: fontBold,
    color: navy,
  })

  page.drawText(courseTitle, {
    x: centerX(courseTitle, 12, fontItalic),
    y: height - 214,
    size: 12,
    font: fontItalic,
    color: muted,
  })

  page.drawText('Certificamos que', {
    x: centerX('Certificamos que', 12, font),
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

  const wrap = (text: string, maxWidth: number, size: number) => {
    const words = text.split(' ')
    const lines: string[] = []
    let cur = ''
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w
      if (font.widthOfTextAtSize(next, size) > maxWidth) {
        if (cur) lines.push(cur)
        cur = w
      } else cur = next
    }
    if (cur) lines.push(cur)
    return lines
  }

  let y = height - 350
  for (const line of wrap(body, width - 160, 11)) {
    page.drawText(line, { x: centerX(line, 11, font), y, size: 11, font, color: ink })
    y -= 16
  }

  page.drawText(`Data da colacao: ${dateLabel}`, {
    x: centerX(`Data da colacao: ${dateLabel}`, 11, font),
    y: 150,
    size: 11,
    font,
    color: muted,
  })

  page.drawText(`Autenticacao: ${code}`, {
    x: centerX(`Autenticacao: ${code}`, 9, font),
    y: 120,
    size: 9,
    font,
    color: muted,
  })

  page.drawText('Ken Yehi Ratzon', { x: 80, y: 80, size: 14, font: fontItalic, color: gold })
  page.drawText('Rav.: EBBY', {
    x: width - 80 - fontItalic.widthOfTextAtSize('Rav.: EBBY', 14),
    y: 80,
    size: 14,
    font: fontItalic,
    color: navy,
  })

  page.drawText(`Registro: ${emailSafe}`, {
    x: centerX(`Registro: ${emailSafe}`, 8, font),
    y: 52,
    size: 8,
    font,
    color: muted,
  })

  return pdf.save()
}
