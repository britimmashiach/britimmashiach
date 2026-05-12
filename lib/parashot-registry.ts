export interface OfficialParasha {
  slug: string
  title: string
  book: string
  weekNumber: number
}

export const OFFICIAL_PARASHOT: OfficialParasha[] = [
  // BERESHIT
  { slug: 'bereshit',      title: 'Bereshit',       book: 'Bereshit', weekNumber: 1  },
  { slug: 'noach',         title: 'Noach',           book: 'Bereshit', weekNumber: 2  },
  { slug: 'lech-lecha',    title: 'Lech-Lecha',      book: 'Bereshit', weekNumber: 3  },
  { slug: 'vayera',        title: 'Vayera',          book: 'Bereshit', weekNumber: 4  },
  { slug: 'chayei-sarah',  title: 'Chayei-Sarah',    book: 'Bereshit', weekNumber: 5  },
  { slug: 'toldot',        title: 'Toldot',          book: 'Bereshit', weekNumber: 6  },
  { slug: 'vayetze',       title: 'Vayetze',         book: 'Bereshit', weekNumber: 7  },
  { slug: 'vayishlach',    title: 'Vayishlach',      book: 'Bereshit', weekNumber: 8  },
  { slug: 'vayeshev',      title: 'Vayeshev',        book: 'Bereshit', weekNumber: 9  },
  { slug: 'miketz',        title: 'Miketz',          book: 'Bereshit', weekNumber: 10 },
  { slug: 'vayigash',      title: 'Vayigash',        book: 'Bereshit', weekNumber: 11 },
  { slug: 'vayechi',       title: 'Vayechi',         book: 'Bereshit', weekNumber: 12 },

  // SHEMOT
  { slug: 'shemot',        title: 'Shemot',          book: 'Shemot', weekNumber: 13 },
  { slug: 'vaera',         title: 'Vaera',           book: 'Shemot', weekNumber: 14 },
  { slug: 'bo',            title: 'Bo',              book: 'Shemot', weekNumber: 15 },
  { slug: 'beshalach',     title: 'Beshalach',       book: 'Shemot', weekNumber: 16 },
  { slug: 'yitro',         title: 'Yitro',           book: 'Shemot', weekNumber: 17 },
  { slug: 'mishpatim',     title: 'Mishpatim',       book: 'Shemot', weekNumber: 18 },
  { slug: 'terumah',       title: 'Terumah',         book: 'Shemot', weekNumber: 19 },
  { slug: 'tetzaveh',      title: 'Tetzaveh',        book: 'Shemot', weekNumber: 20 },
  { slug: 'ki-tisa',       title: 'Ki-Tisa',         book: 'Shemot', weekNumber: 21 },
  { slug: 'vayakhel',      title: 'Vayakhel',        book: 'Shemot', weekNumber: 22 },
  { slug: 'pekudei',       title: 'Pekudei',         book: 'Shemot', weekNumber: 23 },

  // VAYIKRA
  { slug: 'vayikra',       title: 'Vayikra',         book: 'Vayikra', weekNumber: 24 },
  { slug: 'tzav',          title: 'Tzav',            book: 'Vayikra', weekNumber: 25 },
  { slug: 'shemini',       title: 'Shemini',         book: 'Vayikra', weekNumber: 26 },
  { slug: 'tazria',        title: 'Tazria',          book: 'Vayikra', weekNumber: 27 },
  { slug: 'metzora',       title: 'Metzora',         book: 'Vayikra', weekNumber: 28 },
  { slug: 'acharei-mot',   title: 'Acharei-Mot',     book: 'Vayikra', weekNumber: 29 },
  { slug: 'kedoshim',      title: 'Kedoshim',        book: 'Vayikra', weekNumber: 30 },
  { slug: 'emor',          title: 'Emor',            book: 'Vayikra', weekNumber: 31 },
  { slug: 'behar',         title: 'Behar',           book: 'Vayikra', weekNumber: 32 },
  { slug: 'bechukotai',    title: 'Bechukotai',      book: 'Vayikra', weekNumber: 33 },

  // BAMIDBAR
  { slug: 'bamidbar',      title: 'Bamidbar',        book: 'Bamidbar', weekNumber: 34 },
  { slug: 'naso',          title: 'Naso',            book: 'Bamidbar', weekNumber: 35 },
  { slug: 'behaalotecha',  title: 'Behaalotecha',    book: 'Bamidbar', weekNumber: 36 },
  { slug: 'shelach',       title: 'Shelach',         book: 'Bamidbar', weekNumber: 37 },
  { slug: 'korach',        title: 'Korach',          book: 'Bamidbar', weekNumber: 38 },
  { slug: 'chukat',        title: 'Chukat',          book: 'Bamidbar', weekNumber: 39 },
  { slug: 'balak',         title: 'Balak',           book: 'Bamidbar', weekNumber: 40 },
  { slug: 'pinchas',       title: 'Pinchas',         book: 'Bamidbar', weekNumber: 41 },
  { slug: 'matot',         title: 'Matot',           book: 'Bamidbar', weekNumber: 42 },
  { slug: 'masei',         title: 'Masei',           book: 'Bamidbar', weekNumber: 43 },

  // DEVARIM
  { slug: 'devarim',       title: 'Devarim',         book: 'Devarim', weekNumber: 44 },
  { slug: 'vaetchanan',    title: 'Vaetchanan',      book: 'Devarim', weekNumber: 45 },
  { slug: 'eikev',         title: 'Eikev',           book: 'Devarim', weekNumber: 46 },
  { slug: 'reeh',          title: 'Reeh',            book: 'Devarim', weekNumber: 47 },
  { slug: 'shoftim',       title: 'Shoftim',         book: 'Devarim', weekNumber: 48 },
  { slug: 'ki-tetze',      title: 'Ki-Tetze',        book: 'Devarim', weekNumber: 49 },
  { slug: 'ki-tavo',       title: 'Ki-Tavo',         book: 'Devarim', weekNumber: 50 },
  { slug: 'nitzavim',      title: 'Nitzavim',        book: 'Devarim', weekNumber: 51 },
  { slug: 'vayelech',      title: 'Vayelech',        book: 'Devarim', weekNumber: 52 },
  { slug: 'haazinu',       title: 'Haazinu',         book: 'Devarim', weekNumber: 53 },
  { slug: 'vezot-haberakhah', title: 'Vezot-Haberakhah', book: 'Devarim', weekNumber: 54 },
]

export const BOOKS_ORDER = ['Bereshit', 'Shemot', 'Vayikra', 'Bamidbar', 'Devarim'] as const

const _bySlug = new Map<string, OfficialParasha>(OFFICIAL_PARASHOT.map(p => [p.slug, p]))

export function getParashaTitle(slug: string): string {
  return _bySlug.get(slug)?.title ?? slug
}

export function getParashaEntry(slug: string): OfficialParasha | undefined {
  return _bySlug.get(slug)
}

export function findParashaByName(name: string): OfficialParasha | undefined {
  const norm = name.replace(/^parashat?\s+/i, '').trim()
  const lower = norm.toLowerCase()
  const direct = OFFICIAL_PARASHOT.find(
    p =>
      p.title.toLowerCase() === lower ||
      p.slug === lower ||
      p.slug === lower.replace(/\s+/g, '-'),
  )
  if (direct) return direct

  // Trata parshiot combinadas como "Tazria-Metzora" / "Matot-Masei" /
  // "Acharei Mot-Kedoshim" — devolve a primeira parashá da combinação,
  // que é a referência de estudo para a semana corrente.
  const slugForm = lower.replace(/\s+/g, '-')
  const parts = slugForm.split('-').filter(Boolean)
  for (let take = parts.length; take >= 1; take--) {
    const candidate = parts.slice(0, take).join('-')
    const hit = OFFICIAL_PARASHOT.find(p => p.slug === candidate)
    if (hit) return hit
  }
  return undefined
}

export function groupParashotByBook<T extends { slug: string }>(
  dbParashot: T[],
): { book: string; entries: Array<{ registry: OfficialParasha; db: T }> }[] {
  const bySlug = new Map(dbParashot.map(p => [p.slug, p]))
  return BOOKS_ORDER.map(book => ({
    book,
    entries: OFFICIAL_PARASHOT
      .filter(rp => rp.book === book)
      .map(rp => ({ registry: rp, db: bySlug.get(rp.slug)! }))
      .filter(e => e.db != null),
  })).filter(g => g.entries.length > 0)
}
