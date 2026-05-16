import fs from 'fs'
import path from 'path'

const TEHILIM_PUBLIC = path.join(process.cwd(), 'public', 'tehilim')
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export interface TehilimPdfFile {
  fileName: string
  title: string
  url: string
}

export interface TehilimPerekFolder {
  slug: string
  label: string
  labelHe: string | null
  pdfCount: number
  pdfs: TehilimPdfFile[]
}

function isSafeSlug(slug: string): boolean {
  return SLUG_RE.test(slug) && !slug.includes('..')
}

function pdfTitleFromFileName(fileName: string): string {
  return fileName.replace(/\.pdf$/i, '').replace(/_/g, ' ').trim()
}

function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, 'pt-BR', { numeric: true, sensitivity: 'base' })
}

export function tehilimPerekLabel(slug: string): string {
  if (slug === 'livro-0') return 'Livro 0 — Apresentação'
  const m = slug.match(/^perek-(\d+)$/i)
  if (m) {
    const n = parseInt(m[1], 10)
    return `Perek ${n} (Salmo ${n})`
  }
  return slug.replace(/-/g, ' ')
}

export function tehilimPerekLabelHe(slug: string): string | null {
  if (slug === 'livro-0') return 'הקדמה'
  const m = slug.match(/^perek-(\d+)$/i)
  if (m) {
    const n = parseInt(m[1], 10)
    return `תְּהִלִּים ${n}`
  }
  return null
}

function listPdfsInFolder(slug: string): TehilimPdfFile[] {
  const dir = path.join(TEHILIM_PUBLIC, slug)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.pdf'))
    .map((e) => e.name)
    .sort(naturalCompare)
    .map((fileName) => ({
      fileName,
      title: pdfTitleFromFileName(fileName),
      url: `/tehilim/${slug}/${encodeURIComponent(fileName)}`,
    }))
}

/** Lista todas as pastas de Perek (e livros introdutórios) com PDFs em `public/tehilim/`. */
export function listTehilimPerakim(): TehilimPerekFolder[] {
  if (!fs.existsSync(TEHILIM_PUBLIC)) return []

  const slugs = fs
    .readdirSync(TEHILIM_PUBLIC, { withFileTypes: true })
    .filter((e) => e.isDirectory() && isSafeSlug(e.name))
    .map((e) => e.name)
    .sort((a, b) => {
      if (a === 'livro-0') return -1
      if (b === 'livro-0') return 1
      return naturalCompare(a, b)
    })

  return slugs.map((slug) => {
    const pdfs = listPdfsInFolder(slug)
    return {
      slug,
      label: tehilimPerekLabel(slug),
      labelHe: tehilimPerekLabelHe(slug),
      pdfCount: pdfs.length,
      pdfs,
    }
  })
}

export function getTehilimPerek(slug: string): TehilimPerekFolder | null {
  if (!isSafeSlug(slug)) return null
  const pdfs = listPdfsInFolder(slug)
  const dir = path.join(TEHILIM_PUBLIC, slug)
  if (!fs.existsSync(dir)) return null

  return {
    slug,
    label: tehilimPerekLabel(slug),
    labelHe: tehilimPerekLabelHe(slug),
    pdfCount: pdfs.length,
    pdfs,
  }
}

export function getTehilimPdf(slug: string, fileName: string): TehilimPdfFile | null {
  if (!isSafeSlug(slug)) return null
  if (!fileName.toLowerCase().endsWith('.pdf') || fileName.includes('..') || fileName.includes('/')) {
    return null
  }
  const filePath = path.join(TEHILIM_PUBLIC, slug, fileName)
  if (!fs.existsSync(filePath)) return null

  return {
    fileName,
    title: pdfTitleFromFileName(fileName),
    url: `/tehilim/${slug}/${encodeURIComponent(fileName)}`,
  }
}
