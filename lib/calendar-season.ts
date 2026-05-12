import type { LiturgicalSeason, HolidayKey } from '@/lib/hebrew-date'

/**
 * Paleta sazonal portada do app Flutter `_SeasonalPalette.fromJewish`,
 * traduzida para os tokens do site (petroleum / gold / parchment / warmgray).
 *
 * Cada `LiturgicalSeason` retorna:
 *  - background do container da página /calendar  (gradiente leve)
 *  - atmosphere (camada superior sobre o background — opcional)
 *  - cell tint dos dias de chag/jejum/omer dentro da grade
 *  - accentRing — anel dourado/parchment em "hoje"/"selecionado"
 *
 * Tudo expresso em classes Tailwind para light + dark.
 */

export interface SeasonStyle {
  /** Gradiente discreto aplicado ao container do mês. */
  containerBg: string
  /** Anel/destaque do cabeçalho mensal. */
  headerRing: string
  /** Tag textual curta exibida no painel do dia. */
  label: string
}

export const SEASON_STYLES: Record<LiturgicalSeason, SeasonStyle> = {
  shabbat: {
    containerBg:
      'bg-gradient-to-br from-petroleum-950/[0.04] via-transparent to-petroleum-800/[0.06] ' +
      'dark:from-petroleum-950/40 dark:via-petroleum-900/20 dark:to-petroleum-950/30',
    headerRing: 'ring-1 ring-gold-500/30',
    label: 'Shabat',
  },
  chanukah: {
    containerBg:
      'bg-gradient-to-b from-gold-500/[0.06] via-transparent to-petroleum-900/[0.04] ' +
      'dark:from-gold-500/[0.08] dark:via-petroleum-950/20 dark:to-petroleum-900/40',
    headerRing: 'ring-1 ring-gold-400/40',
    label: 'Chanukáh',
  },
  yamim_noraim: {
    containerBg:
      'bg-gradient-to-b from-parchment-50/80 via-parchment-100/40 to-transparent ' +
      'dark:from-parchment-50/[0.04] dark:via-parchment-100/[0.03] dark:to-transparent',
    headerRing: 'ring-1 ring-gold-500/35',
    label: 'Yamim Noraim',
  },
  yom_tov: {
    containerBg:
      'bg-gradient-to-br from-gold-500/[0.07] via-transparent to-petroleum-800/[0.04] ' +
      'dark:from-gold-500/[0.06] dark:via-petroleum-900/15 dark:to-petroleum-950/30',
    headerRing: 'ring-1 ring-gold-500/40',
    label: 'Yom Tov',
  },
  chol_hamoed: {
    containerBg:
      'bg-gradient-to-br from-gold-500/[0.04] via-transparent to-parchment-200/30 ' +
      'dark:from-gold-500/[0.04] dark:via-petroleum-900/10 dark:to-petroleum-900/25',
    headerRing: 'ring-1 ring-gold-500/25',
    label: 'Chol haMoed',
  },
  omer: {
    containerBg:
      'bg-gradient-to-b from-gold-500/[0.05] via-transparent to-warmgray-200/30 ' +
      'dark:from-gold-500/[0.04] dark:via-transparent dark:to-petroleum-900/30',
    headerRing: 'ring-1 ring-gold-500/30',
    label: 'Sefirat haOmer',
  },
  tishrei: {
    containerBg:
      'bg-gradient-to-b from-parchment-50/60 via-transparent to-petroleum-800/[0.03] ' +
      'dark:from-parchment-100/[0.03] dark:via-transparent dark:to-petroleum-900/30',
    headerRing: 'ring-1 ring-gold-500/25',
    label: 'Tishrei',
  },
  nissan: {
    containerBg:
      'bg-gradient-to-b from-petroleum-800/[0.05] via-transparent to-gold-500/[0.04] ' +
      'dark:from-petroleum-900/30 dark:via-transparent dark:to-gold-500/[0.04]',
    headerRing: 'ring-1 ring-gold-500/25',
    label: 'Nissan',
  },
  fast: {
    containerBg:
      'bg-gradient-to-b from-warmgray-300/30 via-transparent to-petroleum-900/[0.05] ' +
      'dark:from-warmgray-700/20 dark:via-transparent dark:to-petroleum-950/30',
    headerRing: 'ring-1 ring-warmgray-500/40',
    label: 'Jejum',
  },
  default: {
    containerBg:
      'bg-gradient-to-br from-parchment-50/40 via-transparent to-petroleum-800/[0.03] ' +
      'dark:from-petroleum-900/15 dark:via-transparent dark:to-petroleum-950/20',
    headerRing: 'ring-1 ring-border/40',
    label: '',
  },
}

/**
 * Cor de fundo da célula (no grid) baseada no estado do dia.
 * Não usamos a season do mês — cada célula tem seu próprio estado.
 */
export function cellStyleFor(args: {
  isToday: boolean
  isSelected: boolean
  isShabbat: boolean
  holidayKey: HolidayKey
  omerDay: number
}): string {
  const { isToday, isSelected, isShabbat, holidayKey, omerDay } = args

  if (isSelected) {
    return 'bg-petroleum-800 text-parchment-100 ring-2 ring-gold-500 ' +
      'dark:bg-gold-500 dark:text-petroleum-950 dark:ring-gold-400 shadow-sm'
  }
  if (isToday) {
    return 'bg-gold-500/15 text-petroleum-800 dark:text-parchment-100 ring-1.5 ring-gold-500'
  }
  if (holidayKey === 'chanukah') {
    return 'bg-gold-500/10 text-petroleum-800 dark:text-parchment-100 ring-1 ring-gold-500/30'
  }
  if (
    holidayKey === 'pesach' ||
    holidayKey === 'shavuot' ||
    holidayKey === 'rosh_hashana' ||
    holidayKey === 'yom_kippur' ||
    holidayKey === 'sukkot' ||
    holidayKey === 'shemini_atzeret' ||
    holidayKey === 'simchat_torah'
  ) {
    return 'bg-gold-500/12 text-petroleum-800 dark:text-parchment-100 ring-1 ring-gold-500/30'
  }
  if (
    holidayKey === 'tisha_beav' ||
    holidayKey === 'shiv_asar_tammuz' ||
    holidayKey === 'fast_of_esther' ||
    holidayKey === 'fast_of_gedaliah' ||
    holidayKey === 'tenth_of_tevet'
  ) {
    return 'bg-warmgray-500/10 text-warmgray-700 dark:text-warmgray-300 ring-1 ring-warmgray-500/25'
  }
  if (isShabbat) {
    return 'bg-petroleum-500/8 text-petroleum-700 dark:text-petroleum-200 ring-1 ring-petroleum-500/25'
  }
  if (omerDay > 0) {
    return 'bg-parchment-100/40 text-foreground dark:bg-petroleum-900/30 ring-1 ring-gold-500/15'
  }
  if (holidayKey === 'rosh_chodesh') {
    return 'bg-petroleum-500/8 text-petroleum-700 dark:text-petroleum-200 ring-1 ring-petroleum-500/20'
  }
  return 'bg-muted/40 text-foreground hover:bg-muted'
}
