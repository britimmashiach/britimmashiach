// =============================================================================
// MOTOR DE GEMATRIA
// -----------------------------------------------------------------------------
// Cálculo de valores em vários métodos tradicionais (gematriot) e utilidades
// de normalização do hebraico (remoção de nikud, formas finais, etc.).
// Tudo é puro (sem dependências externas) e roda no cliente ou no servidor.
// =============================================================================

/** Ordem canônica do alfabeto (22 letras-base, sem formas finais). */
const ALEPHBET = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ',
  'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת',
] as const

/** Forma final → forma base (para métodos que ignoram o sofit). */
const FINAL_TO_BASE: Record<string, string> = {
  ך: 'כ',
  ם: 'מ',
  ן: 'נ',
  ף: 'פ',
  ץ: 'צ',
}

/** Valor padrão (Mispar Hechrachi). Formas finais valem como a base. */
const STANDARD: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50,
  ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
}

/** Valores ampliados das formas finais (Mispar Gadol). */
const SOFIT: Record<string, number> = {
  ך: 500, ם: 600, ן: 700, ף: 800, ץ: 900,
}

/** Valor ordinal (Mispar Siduri): א=1 … ת=22. Final = base. */
const ORDINAL: Record<string, number> = (() => {
  const m: Record<string, number> = {}
  ALEPHBET.forEach((letter, i) => {
    m[letter] = i + 1
  })
  for (const [final, base] of Object.entries(FINAL_TO_BASE)) {
    m[final] = m[base]
  }
  return m
})()

const HEBREW_LETTER_RE = /[\u05D0-\u05EA]/

/** Remove nikud, te'amim e qualquer caractere que não seja letra hebraica. */
export function normalizeHebrew(input: string): string {
  return Array.from(input)
    .filter((ch) => HEBREW_LETTER_RE.test(ch))
    .join('')
}

/** Reduz um número à sua raiz digital (1–9), preservando 0. */
function digitalRoot(n: number): number {
  let x = Math.abs(n)
  while (x >= 10) {
    x = String(x)
      .split('')
      .reduce((acc, d) => acc + Number(d), 0)
  }
  return x
}

/** Dígito significativo de um valor padrão (300→3, 20→2, 7→7). */
function reduceLetterValue(value: number): number {
  if (value >= 100) return value / 100
  if (value >= 10) return value / 10
  return value
}

/** Espelho AtBash de uma letra-base (א↔ת, ב↔ש …). */
function atbashLetter(letter: string): string {
  const base = FINAL_TO_BASE[letter] ?? letter
  const idx = ALEPHBET.indexOf(base as (typeof ALEPHBET)[number])
  if (idx === -1) return base
  return ALEPHBET[ALEPHBET.length - 1 - idx]
}

export type GematriaMethodId =
  | 'hechrachi'
  | 'gadol'
  | 'siduri'
  | 'katan'
  | 'katanMispari'
  | 'atbash'
  | 'kolel'

export interface GematriaMethod {
  id: GematriaMethodId
  /** Nome transliterado (ex.: "Mispar Hechrachi"). */
  name: string
  /** Nome em hebraico. */
  he: string
  /** Descrição curta em português. */
  desc: string
  /** 'public' = aberto a todos; 'mestre' = restrito a Mestres/admin. */
  tier: 'public' | 'mestre'
  compute: (letters: string) => number
}

/** Métodos abertos ao público geral (sem login). */
export const PUBLIC_METHOD_IDS: GematriaMethodId[] = ['hechrachi']

/** Um método é liberado para todos? */
export function isPublicMethod(id: GematriaMethodId): boolean {
  return PUBLIC_METHOD_IDS.includes(id)
}

/**
 * Catálogo de métodos. `compute` recebe a string JÁ normalizada
 * (somente letras hebraicas).
 */
export const GEMATRIA_METHODS: GematriaMethod[] = [
  {
    id: 'hechrachi',
    name: 'Mispar Hechrachi',
    he: 'מספר הכרחי',
    desc: 'Valor padrão: a soma simples do valor de cada letra.',
    tier: 'public',
    compute: (s) =>
      Array.from(s).reduce((acc, ch) => acc + (STANDARD[ch] ?? 0), 0),
  },
  {
    id: 'gadol',
    name: 'Mispar Gadol',
    he: 'מספר גדול',
    desc: 'Como o padrão, mas as letras finais (sofit) valem de 500 a 900.',
    tier: 'mestre',
    compute: (s) =>
      Array.from(s).reduce(
        (acc, ch) => acc + (SOFIT[ch] ?? STANDARD[ch] ?? 0),
        0,
      ),
  },
  {
    id: 'siduri',
    name: 'Mispar Siduri',
    he: 'מספר סידורי',
    desc: 'Valor ordinal: a posição da letra no alfabeto (א=1 … ת=22).',
    tier: 'mestre',
    compute: (s) =>
      Array.from(s).reduce((acc, ch) => acc + (ORDINAL[ch] ?? 0), 0),
  },
  {
    id: 'katan',
    name: 'Mispar Katan',
    he: 'מספר קטן',
    desc: 'Cada letra reduzida a um dígito (300→3, 20→2), depois somadas.',
    tier: 'mestre',
    compute: (s) =>
      Array.from(s).reduce(
        (acc, ch) => acc + (STANDARD[ch] ? reduceLetterValue(STANDARD[ch]) : 0),
        0,
      ),
  },
  {
    id: 'katanMispari',
    name: 'Mispar Katan Mispari',
    he: 'מספר קטן מספרי',
    desc: 'Raiz digital: reduz o valor padrão a um único dígito (1–9).',
    tier: 'mestre',
    compute: (s) =>
      digitalRoot(
        Array.from(s).reduce((acc, ch) => acc + (STANDARD[ch] ?? 0), 0),
      ),
  },
  {
    id: 'atbash',
    name: 'AtBash',
    he: 'אתב״ש',
    desc: 'Troca cada letra pela sua espelhada (א↔ת) e soma o valor padrão.',
    tier: 'mestre',
    compute: (s) =>
      Array.from(s).reduce(
        (acc, ch) => acc + (STANDARD[atbashLetter(ch)] ?? 0),
        0,
      ),
  },
  {
    id: 'kolel',
    name: 'Mispar im HaKolel',
    he: 'מספר עם הכולל',
    desc: 'Valor padrão somado a 1 (o "kolel", a própria palavra como unidade).',
    tier: 'mestre',
    compute: (s) => {
      const total = Array.from(s).reduce(
        (acc, ch) => acc + (STANDARD[ch] ?? 0),
        0,
      )
      return total === 0 ? 0 : total + 1
    },
  },
]

export const GEMATRIA_METHOD_BY_ID: Record<GematriaMethodId, GematriaMethod> =
  Object.fromEntries(GEMATRIA_METHODS.map((m) => [m.id, m])) as Record<
    GematriaMethodId,
    GematriaMethod
  >

export interface GematriaResult {
  method: GematriaMethod
  value: number
}

/** Calcula todos os métodos para um texto hebraico (normaliza internamente). */
export function computeAllGematria(input: string): {
  letters: string
  letterCount: number
  results: GematriaResult[]
} {
  const letters = normalizeHebrew(input)
  return {
    letters,
    letterCount: letters.length,
    results: GEMATRIA_METHODS.map((method) => ({
      method,
      value: method.compute(letters),
    })),
  }
}

/** Calcula o valor de um único método para um texto hebraico. */
export function computeMethod(input: string, methodId: GematriaMethodId): number {
  const method = GEMATRIA_METHOD_BY_ID[methodId]
  if (!method) return 0
  return method.compute(normalizeHebrew(input))
}
