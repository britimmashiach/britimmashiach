import type { Chag } from '@/lib/chagim-supabase'

export type ChagPardesKey = 'peshat' | 'remez' | 'drash' | 'sod'

export const CHAG_PARDES_LEVELS: {
  key: ChagPardesKey
  label: string
  subtitle: string
  isPremium: boolean
  tabClass: string
}[] = [
  {
    key: 'peshat',
    label: 'Peshat',
    subtitle: 'Análise literal e halachica',
    isPremium: false,
    tabClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  },
  {
    key: 'remez',
    label: 'Remez',
    subtitle: 'O princípio velado',
    isPremium: false,
    tabClass: 'bg-green-500/10 text-green-700 dark:text-green-400',
  },
  {
    key: 'drash',
    label: 'Drash',
    subtitle: 'O ensino homilético',
    isPremium: true,
    tabClass: 'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  },
  {
    key: 'sod',
    label: 'Sod',
    subtitle: 'O segredo kabalístico',
    isPremium: true,
    tabClass: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  },
]

export const PARDES_TAB_ACTIVE: Record<ChagPardesKey, string> = {
  peshat: 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500',
  remez: 'bg-green-700 text-white border-green-700 dark:bg-green-600 dark:border-green-600',
  drash: 'bg-gold-600 text-petroleum-950 border-gold-600 dark:bg-gold-500 dark:border-gold-500',
  sod: 'bg-purple-700 text-white border-purple-700 dark:bg-purple-600 dark:border-purple-600',
}

/** Teaser indexável para níveis Premium (não expõe o texto completo). */
export function chagPardesTeaser(text: string, max = 320): string {
  const trimmed = text.trim()
  if (!trimmed) return ''
  const first = trimmed.split('\n\n')[0]?.trim() ?? trimmed
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 180 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

export type ChagPardesPanel = {
  key: ChagPardesKey
  label: string
  subtitle: string
  /** Conteúdo completo (público ou Premium liberado). */
  body: string | null
  /** Resumo público quando Premium bloqueado. */
  teaser: string | null
  locked: boolean
}

export function buildChagPardesPanels(
  chag: Pick<Chag, 'peshat' | 'remez' | 'drash' | 'sod'>,
  hasPremium: boolean,
): ChagPardesPanel[] {
  return CHAG_PARDES_LEVELS.map((level) => {
    const raw = chag[level.key]?.trim() ?? ''
    const locked = level.isPremium && !hasPremium
    return {
      key: level.key,
      label: level.label,
      subtitle: level.subtitle,
      body: locked ? null : raw || null,
      teaser: locked && raw ? chagPardesTeaser(raw) : null,
      locked,
    }
  }).filter((p) => p.body || p.teaser)
}

export function chagHasPardesContent(chag: Pick<Chag, 'peshat' | 'remez' | 'drash' | 'sod'>): boolean {
  return !!(chag.peshat?.trim() || chag.remez?.trim() || chag.drash?.trim() || chag.sod?.trim())
}
