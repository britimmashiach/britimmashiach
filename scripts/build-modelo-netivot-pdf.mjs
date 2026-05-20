/**
 * Gera o PDF "Modelo Fixo de Netivot" a partir do conteúdo do vault.
 *
 * Saída: scripts/uploads/modelo-fixo-rav-ebby.pdf
 *
 * Uso:
 *   node scripts/build-modelo-netivot-pdf.mjs
 *
 * Requer apenas pdf-lib (já instalado no projeto).
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, 'uploads')
const OUT_FILE = join(OUT_DIR, 'modelo-fixo-rav-ebby.pdf')

const hex = (h) => {
  const v = h.replace('#', '')
  const r = parseInt(v.slice(0, 2), 16) / 255
  const g = parseInt(v.slice(2, 4), 16) / 255
  const b = parseInt(v.slice(4, 6), 16) / 255
  return rgb(r, g, b)
}

const C_NAVY = hex('00204F')
const C_T1 = hex('2E74B5')
const C_OR = hex('FF9900')
const C_GOLD = hex('FFC000')
const C_BG_LIGHT = hex('F5F7FA')
const C_BORDER = hex('B8C2D1')
const C_TEXT = hex('1F2A44')
const C_MUTED = hex('5A6478')
const C_WHITE = hex('FFFFFF')

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 56

const TABLES = [
  {
    title: 'Saindo de Keter',
    rows: [
      ['1', 'Keter para Chochmah', 'Hei', '11'],
      ['2', 'Keter para Bina', 'Vav', '12'],
      ['3', 'Keter para Tiferet', 'Dalet', '13'],
    ],
  },
  {
    title: 'Saindo de Chochmah',
    rows: [
      ['4', 'Chochmah para Bina', 'Shin', '14'],
      ['5', 'Chochmah para Chesed', 'Bet', '15'],
      ['6', 'Chochmah para Tiferet', 'Tet', '16'],
      ['7', 'Chochmah para Gevura', 'Zayin', '17'],
    ],
  },
  {
    title: 'Saindo de Bina',
    rows: [
      ['8', 'Bina para Gevura', 'Guimel', '18'],
      ['9', 'Bina para Tiferet', 'Ayin', '19'],
      ['10', 'Bina para Chesed', 'Kuf', '20'],
    ],
  },
  {
    title: 'Saindo de Chesed',
    rows: [
      ['11', 'Chesed para Gevura', 'Alef', '21'],
      ['12', 'Chesed para Tiferet', 'Chet', '22'],
      ['13', 'Chesed para Netzach', 'Kaf', '23'],
    ],
  },
  {
    title: 'Saindo de Gevura',
    rows: [
      ['14', 'Gevura para Tiferet', 'Tsade', '24'],
      ['15', 'Gevura para Hod', 'Pey', '25'],
    ],
  },
  {
    title: 'Saindo de Tiferet',
    rows: [
      ['16', 'Tiferet para Netzach', 'Yod', '26'],
      ['17', 'Tiferet para Hod', 'Samech', '27'],
      ['18', 'Tiferet para Yesod', 'Resh', '28'],
    ],
  },
  {
    title: 'Saindo de Netzach, Hod e Yesod',
    rows: [
      ['19', 'Netzach para Yesod', 'Nun', '29'],
      ['20', 'Netzach para Hod', 'Mem', '30'],
      ['21', 'Hod para Yesod', 'Lamed', '31'],
      ['22', 'Yesod para Malchut', 'Tav', '32'],
    ],
  },
]

const HEADERS = ['Netiv', 'Caminho', 'Letra', 'Camada']
const COL_W = [55, 230, 90, 65]

const OLAMOT = [
  ['Atzilut', 'Yod (Y)'],
  ['Beria', 'Hei (H)'],
  ['Yetzira', 'Vav (V)'],
  ['Assia', 'Hei final (H)'],
]

const PORTOES_CHESED = [
  ['P1', 'Chesed shebeChesed', 'Bina para Chesed', 'Kuf'],
  ['P2', 'Gevura shebeChesed', 'Chesed para Gevura', 'Alef'],
  ['P3', 'Tiferet shebeChesed', 'Chesed para Tiferet', 'Chet'],
  ['P4', 'Netzach shebeChesed', 'Chesed para Netzach', 'Kaf'],
  ['P5', 'Hod shebeChesed', 'Gevura para Hod', 'Pey'],
  ['P6', 'Yesod shebeChesed', 'Netzach para Yesod', 'Nun'],
  ['P7', 'Malchut shebeChesed', 'Yesod para Malchut', 'Tav'],
]

const REGRAS = [
  'Dalet liga Keter para Tiferet (camada 13). Atribuicao fixa.',
  'Resh possui um unico caminho: Tiferet para Yesod (camada 28).',
  'Total de 22 Netivot com letras do Alef-Beit; as 10 Sefirot mais os 22 Netivot somam 32.',
]

const PROIBICOES = [
  'Nao alterar nomes ja definidos.',
  'Nao omitir etapas.',
  'Nao simplificar letras ou caminhos.',
  'Nao misturar com Sefer Yetzirah padrao, Golden Dawn ou outros sistemas.',
  'Nao inverter atribuicoes.',
  'Nao atribuir Netiv ao 50o portao.',
]

async function build() {
  const pdf = await PDFDocument.create()
  pdf.setTitle('Modelo Fixo de Netivot')
  pdf.setAuthor('Rav Eliahu Barzilay ben Yehoshua')
  pdf.setSubject('Os 22 caminhos da Etz Chaim segundo o Metodo Rav EBBY')
  pdf.setKeywords(['Netivot', 'Etz Chaim', 'Kabalah', 'Rav EBBY', 'Brit Im Mashiach'])
  pdf.setProducer('Brit Im Mashiach')
  pdf.setCreator('Sinagoga Brit Im Mashiach - Franca SP')

  const fontReg = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontItal = await pdf.embedFont(StandardFonts.HelveticaOblique)
  const fontSerif = await pdf.embedFont(StandardFonts.TimesRomanBold)

  const ctx = { pdf, fontReg, fontBold, fontItal, fontSerif, page: null, y: 0 }

  drawCover(ctx)
  newPage(ctx)
  drawIntro(ctx)
  drawAllTables(ctx)
  drawRegras(ctx)
  drawOlamot(ctx)
  drawPortoes(ctx)
  drawShaarHaNun(ctx)
  drawProibicoes(ctx)
  drawObjetivo(ctx)
  drawColofao(ctx)

  const bytes = await pdf.save()
  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(OUT_FILE, bytes)
  console.log('PDF gerado em:', OUT_FILE)
  console.log('Tamanho:', (bytes.length / 1024).toFixed(1), 'KB')
}

function newPage(ctx) {
  ctx.page = ctx.pdf.addPage([PAGE_W, PAGE_H])
  drawHeader(ctx)
  drawFooter(ctx)
  ctx.y = PAGE_H - MARGIN - 20
}

function drawHeader(ctx) {
  const txt = 'SINAGOGA BRIT IM MASHIACH - FRANCA SP'
  const sz = 9
  const w = ctx.fontBold.widthOfTextAtSize(txt, sz)
  ctx.page.drawText(txt, {
    x: (PAGE_W - w) / 2,
    y: PAGE_H - 30,
    size: sz,
    font: ctx.fontBold,
    color: C_NAVY,
  })
  ctx.page.drawLine({
    start: { x: MARGIN, y: PAGE_H - 38 },
    end: { x: PAGE_W - MARGIN, y: PAGE_H - 38 },
    thickness: 0.6,
    color: C_NAVY,
  })
}

function drawFooter(ctx) {
  ctx.page.drawLine({
    start: { x: MARGIN, y: 38 },
    end: { x: PAGE_W - MARGIN, y: 38 },
    thickness: 0.6,
    color: C_NAVY,
  })
  const txt = 'Modelo Fixo de Netivot - Metodo Rav EBBY - 5786 - Todos os Direitos Reservados'
  const sz = 7.5
  const w = ctx.fontReg.widthOfTextAtSize(txt, sz)
  ctx.page.drawText(txt, {
    x: (PAGE_W - w) / 2,
    y: 25,
    size: sz,
    font: ctx.fontReg,
    color: C_NAVY,
  })
}

function ensureSpace(ctx, needed) {
  if (ctx.y - needed < 60) {
    newPage(ctx)
  }
}

function drawCover(ctx) {
  ctx.page = ctx.pdf.addPage([PAGE_W, PAGE_H])

  ctx.page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_W,
    height: PAGE_H,
    color: C_NAVY,
  })

  ctx.page.drawRectangle({
    x: MARGIN,
    y: MARGIN,
    width: PAGE_W - 2 * MARGIN,
    height: PAGE_H - 2 * MARGIN,
    borderColor: C_GOLD,
    borderWidth: 1.2,
  })

  let y = PAGE_H - 180
  const titulo = 'MODELO FIXO'
  const sub = 'DE NETIVOT'
  const sz1 = 38

  let w = ctx.fontSerif.widthOfTextAtSize(titulo, sz1)
  ctx.page.drawText(titulo, {
    x: (PAGE_W - w) / 2,
    y,
    size: sz1,
    font: ctx.fontSerif,
    color: C_GOLD,
  })
  y -= 46
  w = ctx.fontSerif.widthOfTextAtSize(sub, sz1)
  ctx.page.drawText(sub, {
    x: (PAGE_W - w) / 2,
    y,
    size: sz1,
    font: ctx.fontSerif,
    color: C_GOLD,
  })

  y -= 30
  ctx.page.drawLine({
    start: { x: PAGE_W / 2 - 80, y },
    end: { x: PAGE_W / 2 + 80, y },
    thickness: 0.8,
    color: C_OR,
  })

  y -= 30
  const linha2 = 'NeTIVoT'
  const sz2 = 22
  w = ctx.fontItal.widthOfTextAtSize(linha2, sz2)
  ctx.page.drawText(linha2, {
    x: (PAGE_W - w) / 2,
    y,
    size: sz2,
    font: ctx.fontItal,
    color: C_WHITE,
  })

  y -= 80
  const desc1 = 'Os 22 caminhos (11 a 32) da Etz Chaim'
  const desc2 = 'segundo o Metodo Rav EBBY'
  const desc3 = 'Referencia fixa Lurianica com letras, Sefirot e Olamot'
  const sz3 = 13
  for (const t of [desc1, desc2, desc3]) {
    w = ctx.fontReg.widthOfTextAtSize(t, sz3)
    ctx.page.drawText(t, {
      x: (PAGE_W - w) / 2,
      y,
      size: sz3,
      font: ctx.fontReg,
      color: C_WHITE,
    })
    y -= 22
  }

  y = MARGIN + 130
  ctx.page.drawLine({
    start: { x: MARGIN + 60, y: y + 20 },
    end: { x: PAGE_W - MARGIN - 60, y: y + 20 },
    thickness: 0.4,
    color: C_GOLD,
  })

  const autor = 'Por Rav Eliahu Barzilay ben Yehoshua'
  w = ctx.fontReg.widthOfTextAtSize(autor, 12)
  ctx.page.drawText(autor, {
    x: (PAGE_W - w) / 2,
    y,
    size: 12,
    font: ctx.fontItal,
    color: C_GOLD,
  })

  y -= 22
  const cong = 'Sinagoga Brit Im Mashiach - Franca SP'
  w = ctx.fontReg.widthOfTextAtSize(cong, 11)
  ctx.page.drawText(cong, {
    x: (PAGE_W - w) / 2,
    y,
    size: 11,
    font: ctx.fontReg,
    color: C_WHITE,
  })

  y -= 18
  const ano = '5786'
  w = ctx.fontBold.widthOfTextAtSize(ano, 14)
  ctx.page.drawText(ano, {
    x: (PAGE_W - w) / 2,
    y,
    size: 14,
    font: ctx.fontBold,
    color: C_OR,
  })
}

function drawIntro(ctx) {
  drawSectionTitle(ctx, 'Apresentacao')

  drawParagraph(
    ctx,
    'Sistema proprietario do Rav EBBY. Integra 32 Netivot (caminhos) a Etz Chaim com atribuicao fixa de letras hebraicas. Nao e Sefer Yetzirah padrao, nao e Golden Dawn, nao e sistema academico generico. Uso interno e exclusivo da congregacao.',
  )

  drawParagraph(
    ctx,
    'Cada Netiv e um caminho ativo entre duas Sefirot, com uma letra hebraica correspondente e uma camada numerica que vai de 11 a 32. As dez Sefirot ja perfazem dez caminhos no modelo, por isso a numeracao dos Netivot comeca em 11.',
  )
}

function drawAllTables(ctx) {
  drawSectionTitle(ctx, 'Os 22 Netivot com atribuicao fixa de letras')
  for (const t of TABLES) {
    drawSubsection(ctx, t.title)
    drawTable(ctx, HEADERS, t.rows, COL_W)
  }
}

function drawRegras(ctx) {
  drawSectionTitle(ctx, 'Regras especificas')
  drawBullets(ctx, REGRAS)
}

function drawOlamot(ctx) {
  drawSectionTitle(ctx, 'Os Olamot e o Tetragrama')
  drawParagraph(
    ctx,
    'Mapeamento usado em toda analise estrutural do modelo:',
  )
  drawTable(ctx, ['Olam', 'Letra do Nome'], OLAMOT, [180, 260])
}

function drawPortoes(ctx) {
  drawSectionTitle(ctx, 'Aplicacao nos 49 Portoes da Sefirat haOmer')
  drawParagraph(
    ctx,
    'Cada portao corresponde a um estado de fluxo em um Netiv especifico. A logica detalhada de cada uma das sete semanas esta documentada na nota interna 49-Portoes-Atribuicao-Netivot. Como exemplo, segue a primeira semana (Chesed):',
  )
  drawTable(ctx, ['Portao', 'Sefira', 'Netiv aplicado', 'Letra'], PORTOES_CHESED, [55, 200, 130, 55])
}

function drawShaarHaNun(ctx) {
  drawSectionTitle(ctx, 'Shaar haNun - 50o portao')
  drawBullets(ctx, [
    'Nao atribuir Netiv.',
    'Nao estruturar como continuacao linear.',
    'Definicao: ruptura do sistema, acesso a Bina, recepcao de Or que nao percorre Netivot.',
  ])
  drawSubsection(ctx, 'Portao 49 - Malchut shebeMalchut')
  drawBullets(ctx, [
    'Ponto de convergencia de todos os Netivot.',
    'Estado de Bitul completo.',
    'Ausencia de fluxo proprio (somente recepcao).',
  ])
}

function drawProibicoes(ctx) {
  drawSectionTitle(ctx, 'Proibicoes ao usar o modelo')
  drawBullets(ctx, PROIBICOES)
}

function drawObjetivo(ctx) {
  drawSectionTitle(ctx, 'Objetivo final do modelo')
  drawParagraph(
    ctx,
    'Um mapa vivo da alma dentro da Etz Chaim, operando dinamicamente atraves dos Netivot. Os 49 portoes correspondem a estados da alma, os Netivot sao os caminhos reais do fluxo espiritual e o Tikkun e a correcao do fluxo dentro destes caminhos.',
  )
}

function drawColofao(ctx) {
  ensureSpace(ctx, 80)
  ctx.y -= 24
  ctx.page.drawLine({
    start: { x: MARGIN + 60, y: ctx.y },
    end: { x: PAGE_W - MARGIN - 60, y: ctx.y },
    thickness: 0.5,
    color: C_T1,
  })
  ctx.y -= 22

  const linhas = [
    'Sinagoga Brit Im Mashiach - Franca SP',
    'Documento de referencia interna - acervo premium da congregacao',
    'Metodo Rav EBBY - 5786',
  ]
  for (const t of linhas) {
    const w = ctx.fontItal.widthOfTextAtSize(t, 9)
    ctx.page.drawText(t, {
      x: (PAGE_W - w) / 2,
      y: ctx.y,
      size: 9,
      font: ctx.fontItal,
      color: C_MUTED,
    })
    ctx.y -= 14
  }
}

function drawSectionTitle(ctx, title) {
  ensureSpace(ctx, 60)
  ctx.y -= 6
  ctx.page.drawRectangle({
    x: MARGIN,
    y: ctx.y - 4,
    width: 4,
    height: 18,
    color: C_OR,
  })
  ctx.page.drawText(title, {
    x: MARGIN + 14,
    y: ctx.y,
    size: 16,
    font: ctx.fontBold,
    color: C_NAVY,
  })
  ctx.y -= 12
  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: PAGE_W - MARGIN, y: ctx.y },
    thickness: 0.5,
    color: C_T1,
  })
  ctx.y -= 18
}

function drawSubsection(ctx, title) {
  ensureSpace(ctx, 30)
  ctx.page.drawText(title, {
    x: MARGIN,
    y: ctx.y,
    size: 11.5,
    font: ctx.fontBold,
    color: C_T1,
  })
  ctx.y -= 18
}

function drawParagraph(ctx, text) {
  const sz = 10.5
  const maxW = PAGE_W - 2 * MARGIN
  const lines = wrapText(text, ctx.fontReg, sz, maxW)
  ensureSpace(ctx, lines.length * 14 + 6)
  for (const line of lines) {
    ctx.page.drawText(line, {
      x: MARGIN,
      y: ctx.y,
      size: sz,
      font: ctx.fontReg,
      color: C_TEXT,
    })
    ctx.y -= 14
  }
  ctx.y -= 8
}

function drawBullets(ctx, items) {
  const sz = 10.5
  const maxW = PAGE_W - 2 * MARGIN - 14
  for (const item of items) {
    const lines = wrapText(item, ctx.fontReg, sz, maxW)
    ensureSpace(ctx, lines.length * 14 + 4)
    ctx.page.drawText('-', {
      x: MARGIN,
      y: ctx.y,
      size: sz,
      font: ctx.fontBold,
      color: C_OR,
    })
    for (let i = 0; i < lines.length; i++) {
      ctx.page.drawText(lines[i], {
        x: MARGIN + 14,
        y: ctx.y,
        size: sz,
        font: ctx.fontReg,
        color: C_TEXT,
      })
      ctx.y -= 14
    }
  }
  ctx.y -= 6
}

function drawTable(ctx, headers, rows, widths) {
  const headH = 22
  const rowH = 20
  const totalH = headH + rowH * rows.length
  ensureSpace(ctx, totalH + 14)

  const startX = MARGIN
  const totalW = widths.reduce((a, b) => a + b, 0)

  ctx.page.drawRectangle({
    x: startX,
    y: ctx.y - headH,
    width: totalW,
    height: headH,
    color: C_NAVY,
  })

  let x = startX
  for (let c = 0; c < headers.length; c++) {
    drawCellText(ctx, headers[c], x, ctx.y - headH, widths[c], headH, ctx.fontBold, 10, C_WHITE)
    x += widths[c]
  }
  ctx.y -= headH

  for (let r = 0; r < rows.length; r++) {
    const isAlt = r % 2 === 1
    if (isAlt) {
      ctx.page.drawRectangle({
        x: startX,
        y: ctx.y - rowH,
        width: totalW,
        height: rowH,
        color: C_BG_LIGHT,
      })
    }
    let cx = startX
    for (let c = 0; c < rows[r].length; c++) {
      const cellText = rows[r][c]
      const isLetra = c === 2
      const isCamada = c === 3
      const isNetiv = c === 0
      const font = isLetra || isNetiv || isCamada ? ctx.fontBold : ctx.fontReg
      const color = isLetra ? C_NAVY : isCamada ? C_OR : C_TEXT
      drawCellText(ctx, cellText, cx, ctx.y - rowH, widths[c], rowH, font, 10, color)
      cx += widths[c]
    }
    ctx.y -= rowH
  }

  ctx.page.drawRectangle({
    x: startX,
    y: ctx.y,
    width: totalW,
    height: totalH,
    borderColor: C_BORDER,
    borderWidth: 0.5,
  })
  let lineX = startX
  for (let i = 0; i < widths.length - 1; i++) {
    lineX += widths[i]
    ctx.page.drawLine({
      start: { x: lineX, y: ctx.y },
      end: { x: lineX, y: ctx.y + totalH },
      thickness: 0.4,
      color: C_BORDER,
    })
  }
  ctx.page.drawLine({
    start: { x: startX, y: ctx.y + rowH * rows.length },
    end: { x: startX + totalW, y: ctx.y + rowH * rows.length },
    thickness: 0.4,
    color: C_BORDER,
  })

  ctx.y -= 12
}

function drawCellText(ctx, text, x, y, w, h, font, sz, color) {
  const padX = 8
  const tw = font.widthOfTextAtSize(text, sz)
  const tx = x + padX
  const ty = y + (h - sz) / 2 + 2
  let drawn = text
  if (tw > w - padX * 2) {
    drawn = truncate(text, font, sz, w - padX * 2)
  }
  ctx.page.drawText(drawn, { x: tx, y: ty, size: sz, font, color })
}

function truncate(text, font, sz, maxW) {
  let s = text
  while (s.length > 0 && font.widthOfTextAtSize(s + '...', sz) > maxW) {
    s = s.slice(0, -1)
  }
  return s + '...'
}

function wrapText(text, font, sz, maxW) {
  const words = text.split(/\s+/)
  const lines = []
  let cur = ''
  for (const w of words) {
    const tryLine = cur ? cur + ' ' + w : w
    if (font.widthOfTextAtSize(tryLine, sz) > maxW && cur) {
      lines.push(cur)
      cur = w
    } else {
      cur = tryLine
    }
  }
  if (cur) lines.push(cur)
  return lines
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
