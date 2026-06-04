/**
 * Gravações capítulo a capítulo do Tanach (hebraico sefardita) em Mechon Mamre.
 * Índice: https://mechon-mamre.org/p/pt/ptmp3prq.htm
 */

const MECHON_MP3_BASE = 'https://mechon-mamre.org/mp3'

/** Prefixo do ficheiro MP3 por `apiName` (Sefaria). */
const MECHON_BOOK_PREFIX: Record<string, string> = {
  Genesis: 't01',
  Exodus: 't02',
  Leviticus: 't03',
  Numbers: 't04',
  Deuteronomy: 't05',
  Joshua: 't06',
  Judges: 't07',
  'I Samuel': 't08a',
  'II Samuel': 't08b',
  'I Kings': 't09a',
  'II Kings': 't09b',
  Isaiah: 't10',
  Jeremiah: 't11',
  Ezekiel: 't12',
  Hosea: 't13',
  Joel: 't14',
  Amos: 't15',
  Obadiah: 't16',
  Jonah: 't17',
  Micah: 't18',
  Nahum: 't19',
  Habakkuk: 't20',
  Zephaniah: 't21',
  Haggai: 't22',
  Zechariah: 't23',
  Malachi: 't24',
  'I Chronicles': 't25a',
  'II Chronicles': 't25b',
  Psalms: 't26',
  Job: 't27',
  Proverbs: 't28',
  Ruth: 't29',
  'Song of Songs': 't30',
  Ecclesiastes: 't31',
  Lamentations: 't32',
  Esther: 't33',
  Daniel: 't34',
  Ezra: 't35a',
  Nehemiah: 't35b',
}

function mechonPsalmsFileId(chapter: number): string | null {
  if (!Number.isFinite(chapter) || chapter < 1 || chapter > 150) return null
  if (chapter < 10) return `t260${chapter}`
  if (chapter < 100) return `t26${chapter}`
  const tens = Math.floor(chapter / 10)
  const ones = chapter % 10
  const letter = String.fromCharCode('a'.charCodeAt(0) + tens - 10)
  return `t26${letter}${ones}`
}

function mechonStandardFileId(prefix: string, chapter: number): string | null {
  if (!Number.isFinite(chapter) || chapter < 1) return null
  const suffix = chapter < 10 ? `0${chapter}` : String(chapter)
  return `${prefix}${suffix}`
}

export function buildMechonChapterFileId(bookApi: string, chapter: number): string | null {
  const prefix = MECHON_BOOK_PREFIX[bookApi]
  if (!prefix) return null
  if (prefix === 't26') return mechonPsalmsFileId(chapter)
  return mechonStandardFileId(prefix, chapter)
}

export function mechonChapterMediaUrl(bookApi: string, chapter: number): string | null {
  const fileId = buildMechonChapterFileId(bookApi, chapter)
  if (!fileId) return null
  return `${MECHON_MP3_BASE}/${fileId}.mp3`
}
