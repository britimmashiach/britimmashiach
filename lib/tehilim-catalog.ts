import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'

const TEHILIM_BUCKET = 'tehilim-pdfs'
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Estudos antigos em markdown que na verdade são PDFs no bucket privado. */
export const TEHILIM_STUDY_REDIRECTS: Record<string, string> = {
  'tehilim-1-peshat': '/tehilim/livro-0',
}

export function getTehilimStudyRedirect(slug: string): string | null {
  return TEHILIM_STUDY_REDIRECTS[slug] ?? null
}

export function isLegacyTehilimStudySlug(slug: string): boolean {
  return slug in TEHILIM_STUDY_REDIRECTS
}

export interface TehilimPdfFile {
  fileName: string
  title: string
  /** URL do proxy `/api/pdf/tehilim/...` (exige login). */
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

function pdfUrl(slug: string, fileName: string): string {
  return `/api/pdf/tehilim/${encodeURIComponent(slug)}/${encodeURIComponent(fileName)}`
}

async function listPdfsInFolder(slug: string): Promise<TehilimPdfFile[]> {
  if (!hasServiceRoleEnv()) return []
  const admin = getSupabaseAdmin()
  const { data, error } = await admin.storage.from(TEHILIM_BUCKET).list(slug, { limit: 1000 })
  if (error || !data) return []
  return data
    .filter((e) => e.name && e.name.toLowerCase().endsWith('.pdf'))
    .map((e) => e.name)
    .sort(naturalCompare)
    .map((fileName) => ({
      fileName,
      title: pdfTitleFromFileName(fileName),
      url: pdfUrl(slug, fileName),
    }))
}

async function listFolders(): Promise<string[]> {
  if (!hasServiceRoleEnv()) return []
  const admin = getSupabaseAdmin()
  // `list('')` retorna entradas no root do bucket; pastas aparecem com id=null e name=slug
  const { data, error } = await admin.storage.from(TEHILIM_BUCKET).list('', { limit: 1000 })
  if (error || !data) return []
  return data
    .filter((e) => e && e.name && (e.id === null || e.id === undefined) && isSafeSlug(e.name))
    .map((e) => e.name)
    .sort((a, b) => {
      if (a === 'livro-0') return -1
      if (b === 'livro-0') return 1
      return naturalCompare(a, b)
    })
}

/** Lista todas as pastas de Perek (e livros introdutórios) com PDFs no bucket privado. */
export async function listTehilimPerakim(): Promise<TehilimPerekFolder[]> {
  const slugs = await listFolders()
  if (slugs.length === 0) return []

  return Promise.all(
    slugs.map(async (slug) => {
      const pdfs = await listPdfsInFolder(slug)
      return {
        slug,
        label: tehilimPerekLabel(slug),
        labelHe: tehilimPerekLabelHe(slug),
        pdfCount: pdfs.length,
        pdfs,
      }
    }),
  )
}

export async function getTehilimPerek(slug: string): Promise<TehilimPerekFolder | null> {
  if (!isSafeSlug(slug)) return null
  const pdfs = await listPdfsInFolder(slug)
  if (pdfs.length === 0) {
    // Pasta pode existir vazia; confirma listando o root
    const folders = await listFolders()
    if (!folders.includes(slug)) return null
  }
  return {
    slug,
    label: tehilimPerekLabel(slug),
    labelHe: tehilimPerekLabelHe(slug),
    pdfCount: pdfs.length,
    pdfs,
  }
}
