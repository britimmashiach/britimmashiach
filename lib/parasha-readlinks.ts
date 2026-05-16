import type { OfficialParasha } from '@/lib/parashot-registry'
import { OFFICIAL_PARASHOT } from '@/lib/parashot-registry'
import { PLACEHOLDER_STUDIES } from '@/lib/placeholder-studies'

type ParshaSlug = (typeof OFFICIAL_PARASHOT)[number]['slug']

/** Livro na Toráh (nome do registro) → slug de URL Tanach (`/tanach/[book]/[chapter]`). */
export const TORAH_BOOK_TO_TANACH_SLUG: Record<OfficialParasha['book'], string> = {
  Bereshit: 'genesis',
  Shemot: 'exodus',
  Vayikra: 'leviticus',
  Bamidbar: 'numbers',
  Devarim: 'deuteronomy',
}

/**
 * Capítulo em que cada sedrá começa na Torá (convenção mais comum, alinhada ao início da 1ª aliyah).
 * Combinações (ex.: Acharei-Mot–Kedoshim) são resolvidas pela primeira sedrá ao usar `findParashaByName`.
 */
export const PARSHA_OPENING_CHAPTER: Record<ParshaSlug, number> = {
  bereshit: 1,
  noach: 6,
  'lech-lecha': 12,
  vayera: 18,
  'chayei-sarah': 23,
  toldot: 25,
  vayetze: 28,
  vayishlach: 32,
  vayeshev: 37,
  miketz: 41,
  vayigash: 44,
  vayechi: 47,

  shemot: 1,
  vaera: 6,
  bo: 10,
  beshalach: 13,
  yitro: 18,
  mishpatim: 21,
  terumah: 25,
  tetzaveh: 27,
  'ki-tisa': 30,
  vayakhel: 35,
  pekudei: 38,

  vayikra: 1,
  tzav: 6,
  shemini: 9,
  tazria: 12,
  metzora: 14,
  'acharei-mot': 16,
  kedoshim: 19,
  emor: 21,
  behar: 25,
  bechukotai: 26,

  bamidbar: 1,
  naso: 4,
  behaalotecha: 8,
  shelach: 13,
  korach: 16,
  chukat: 19,
  balak: 22,
  pinchas: 25,
  matot: 30,
  masei: 33,

  devarim: 1,
  vaetchanan: 3,
  eikev: 7,
  reeh: 11,
  shoftim: 16,
  'ki-tetze': 21,
  'ki-tavo': 26,
  nitzavim: 29,
  vayelech: 31,
  haazinu: 32,
  'vezot-haberakhah': 33,
}

const STUDY_SUFFIX = '-pardes'

/** Slug esperado para estudos PaRDeS da sedrá no acervo (`/studies/[slug]`). */
export function canonicalStudySlugForParshaRegistrySlug(registrySlug: string): string {
  return `${registrySlug}${STUDY_SUFFIX}`
}

let _basesWithStudy: Set<string> | undefined

/** Bases `{registrySlug}` com estudo conhecido (seed + opcional lista pública env). */
function getPublishedStudyBases(): Set<string> {
  if (!_basesWithStudy) {
    const set = new Set<string>()
    for (const s of PLACEHOLDER_STUDIES) {
      if (s.slug.endsWith(STUDY_SUFFIX)) {
        const base = s.slug.slice(0, -STUDY_SUFFIX.length)
        set.add(base)
      }
    }
    const extra =
      typeof process.env.NEXT_PUBLIC_PUBLISHED_PARSHA_STUDY_SLUGS === 'string'
        ? process.env.NEXT_PUBLIC_PUBLISHED_PARSHA_STUDY_SLUGS.split(',')
            .map((x) => x.trim().toLowerCase())
            .filter(Boolean)
        : []
    for (const x of extra) set.add(x)
    _basesWithStudy = set
  }
  return _basesWithStudy
}

export function hasCanonicalParshaStudy(registrySlug: string): boolean {
  return getPublishedStudyBases().has(registrySlug)
}

/** `null` apenas se dados do registro estiverem incompletos (não esperado nas sedrot oficiais). */
export function tanachHrefForOfficialParasha(p: OfficialParasha): string | null {
  const bookSlug = TORAH_BOOK_TO_TANACH_SLUG[p.book]
  const chapter = PARSHA_OPENING_CHAPTER[p.slug as ParshaSlug]
  if (!bookSlug || chapter == null) return null
  return `/tanach/${bookSlug}/${chapter}`
}

export function tanachOpeningLabelPt(p: OfficialParasha): string {
  const ch = PARSHA_OPENING_CHAPTER[p.slug as ParshaSlug]
  if (ch == null) return p.book
  return `${p.book} · cap. ${ch}`
}
