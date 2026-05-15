/** Índice do Tanach — nomes `apiName` alinhados à API de textos do Sefaria. */

export type TanachSection = 'torah' | 'neviim' | 'ketuvim'

export type TanachBookMeta = {
  section: TanachSection
  slug: string
  apiName: string
  titlePt: string
  titleHe: string
  chapters: number
}

export const TANACH_BOOKS: TanachBookMeta[] = [
  // Toráh
  { section: 'torah', slug: 'genesis', apiName: 'Genesis', titlePt: 'Bereshit', titleHe: 'בראשית', chapters: 50 },
  { section: 'torah', slug: 'exodus', apiName: 'Exodus', titlePt: 'Shemot', titleHe: 'שמות', chapters: 40 },
  { section: 'torah', slug: 'leviticus', apiName: 'Leviticus', titlePt: 'Vayikra', titleHe: 'ויקרא', chapters: 27 },
  { section: 'torah', slug: 'numbers', apiName: 'Numbers', titlePt: 'Bamidbar', titleHe: 'במדבר', chapters: 36 },
  { section: 'torah', slug: 'deuteronomy', apiName: 'Deuteronomy', titlePt: 'Devarim', titleHe: 'דברים', chapters: 34 },
  // Neviim — Rishonim
  { section: 'neviim', slug: 'joshua', apiName: 'Joshua', titlePt: 'Yehoshua', titleHe: 'יהושע', chapters: 24 },
  { section: 'neviim', slug: 'judges', apiName: 'Judges', titlePt: 'Shoftim', titleHe: 'שופטים', chapters: 21 },
  { section: 'neviim', slug: 'i-samuel', apiName: 'I Samuel', titlePt: 'I Samuel', titleHe: 'שמואל א', chapters: 31 },
  { section: 'neviim', slug: 'ii-samuel', apiName: 'II Samuel', titlePt: 'II Samuel', titleHe: 'שמואל ב', chapters: 24 },
  { section: 'neviim', slug: 'i-kings', apiName: 'I Kings', titlePt: 'I Reis', titleHe: 'מלכים א', chapters: 22 },
  { section: 'neviim', slug: 'ii-kings', apiName: 'II Kings', titlePt: 'II Reis', titleHe: 'מלכים ב', chapters: 25 },
  // Neviim — Acharonim
  { section: 'neviim', slug: 'isaiah', apiName: 'Isaiah', titlePt: 'Isaías', titleHe: 'ישעיה', chapters: 66 },
  { section: 'neviim', slug: 'jeremiah', apiName: 'Jeremiah', titlePt: 'Jeremias', titleHe: 'ירמיה', chapters: 52 },
  { section: 'neviim', slug: 'ezekiel', apiName: 'Ezekiel', titlePt: 'Ezequiel', titleHe: 'יחזקאל', chapters: 48 },
  // Treze profetas menores (Sefaria: capítulos como no índice MAM)
  { section: 'neviim', slug: 'hosea', apiName: 'Hosea', titlePt: 'Hoshea', titleHe: 'הושע', chapters: 14 },
  { section: 'neviim', slug: 'joel', apiName: 'Joel', titlePt: 'Yoel', titleHe: 'יואל', chapters: 4 },
  { section: 'neviim', slug: 'amos', apiName: 'Amos', titlePt: 'Amós', titleHe: 'עמוס', chapters: 9 },
  { section: 'neviim', slug: 'obadiah', apiName: 'Obadiah', titlePt: 'Ovadiá', titleHe: 'עובדיה', chapters: 1 },
  { section: 'neviim', slug: 'jonah', apiName: 'Jonah', titlePt: 'Yoná', titleHe: 'יונה', chapters: 4 },
  { section: 'neviim', slug: 'micah', apiName: 'Micah', titlePt: 'Miquéias', titleHe: 'מיכה', chapters: 7 },
  { section: 'neviim', slug: 'nahum', apiName: 'Nahum', titlePt: 'Naum', titleHe: 'נחום', chapters: 3 },
  { section: 'neviim', slug: 'habakkuk', apiName: 'Habakkuk', titlePt: 'Habacuque', titleHe: 'חבקוק', chapters: 3 },
  { section: 'neviim', slug: 'zephaniah', apiName: 'Zephaniah', titlePt: 'Sofonias', titleHe: 'צפניה', chapters: 3 },
  { section: 'neviim', slug: 'haggai', apiName: 'Haggai', titlePt: 'Hageu', titleHe: 'חגי', chapters: 2 },
  { section: 'neviim', slug: 'zechariah', apiName: 'Zechariah', titlePt: 'Zacarias', titleHe: 'זכריה', chapters: 14 },
  { section: 'neviim', slug: 'malachi', apiName: 'Malachi', titlePt: 'Malachi', titleHe: 'מלאכי', chapters: 3 },
  // Ketuvim
  { section: 'ketuvim', slug: 'psalms', apiName: 'Psalms', titlePt: 'Tehilim', titleHe: 'תהלים', chapters: 150 },
  { section: 'ketuvim', slug: 'proverbs', apiName: 'Proverbs', titlePt: 'Mishlei', titleHe: 'משלי', chapters: 31 },
  { section: 'ketuvim', slug: 'job', apiName: 'Job', titlePt: 'Iyov', titleHe: 'איוב', chapters: 42 },
  { section: 'ketuvim', slug: 'song-of-songs', apiName: 'Song of Songs', titlePt: 'Shir Hashirim', titleHe: 'שיר השירים', chapters: 8 },
  { section: 'ketuvim', slug: 'ruth', apiName: 'Ruth', titlePt: 'Rute', titleHe: 'רות', chapters: 4 },
  { section: 'ketuvim', slug: 'lamentations', apiName: 'Lamentations', titlePt: 'Eikhah', titleHe: 'איכה', chapters: 5 },
  { section: 'ketuvim', slug: 'ecclesiastes', apiName: 'Ecclesiastes', titlePt: 'Kohelet', titleHe: 'קהלת', chapters: 12 },
  { section: 'ketuvim', slug: 'esther', apiName: 'Esther', titlePt: 'Esther', titleHe: 'אסתר', chapters: 10 },
  { section: 'ketuvim', slug: 'daniel', apiName: 'Daniel', titlePt: 'Daniel', titleHe: 'דניאל', chapters: 12 },
  { section: 'ketuvim', slug: 'ezra', apiName: 'Ezra', titlePt: 'Ezra', titleHe: 'עזרא', chapters: 10 },
  { section: 'ketuvim', slug: 'nehemiah', apiName: 'Nehemiah', titlePt: 'Nehemias', titleHe: 'נחמיה', chapters: 13 },
  { section: 'ketuvim', slug: 'i-chronicles', apiName: 'I Chronicles', titlePt: 'I Crônicas', titleHe: 'דברי הימים א', chapters: 29 },
  { section: 'ketuvim', slug: 'ii-chronicles', apiName: 'II Chronicles', titlePt: 'II Crônicas', titleHe: 'דברי הימים ב', chapters: 36 },
]

const bySlug = new Map(TANACH_BOOKS.map((b) => [b.slug, b]))
const byApiName = new Map(TANACH_BOOKS.map((b) => [b.apiName, b]))

/** Cinco livros da Toráh (compatibilidade). */
export const TORAH_BOOKS: TanachBookMeta[] = TANACH_BOOKS.filter((b) => b.section === 'torah')

/** Metadados do livro pelo segmento de URL (`slug`). */
export function getTanachBook(slug: string): TanachBookMeta | undefined {
  return bySlug.get(slug.toLowerCase())
}

/** Alias histórico — resolve qualquer livro do Tanach pelo `slug`. */
export function getTorahBook(slug: string): TanachBookMeta | undefined {
  return getTanachBook(slug)
}

export function getTanachBookByApiName(apiName: string): TanachBookMeta | undefined {
  return byApiName.get(apiName)
}

export function sefariaRef(bookApi: string, chapter: number): string {
  return `${bookApi}.${chapter}`
}

export const TANACH_SECTION_LABELS: Record<TanachSection, { titlePt: string; subtitlePt: string }> = {
  torah: { titlePt: 'Toráh', subtitlePt: 'Chumash — cinco livros de Moishe' },
  neviim: { titlePt: 'Neviim', subtitlePt: 'Profetas — anteriores e posteriores' },
  ketuvim: { titlePt: 'Ketuvim', subtitlePt: 'Escritos' },
}
