import type { LucideIcon } from 'lucide-react'
import {
  Flame,
  BookOpen,
  Sparkles,
  Heart,
  Trees,
  Droplet,
  Moon,
  PartyPopper,
  Wheat,
  Wind,
  Stars,
  Sunrise,
  Snowflake,
  Crown,
} from 'lucide-react'
import type { HolidayKey } from '@/lib/hebrew-date'

/**
 * Ícone e cor dourada/petroleum sutil para cada chag.
 * Equivalente ao `_HolidayVisual` do app Flutter, mas em paleta Brit Mashiach.
 */
export const HOLIDAY_ICON: Record<NonNullable<HolidayKey>, LucideIcon> = {
  pesach: Wheat,
  chol_hamoed_pesach: Wheat,
  shavuot: BookOpen,
  rosh_hashana: Sparkles,
  yom_kippur: Heart,
  sukkot: Trees,
  chol_hamoed_sukkot: Trees,
  shemini_atzeret: Stars,
  simchat_torah: PartyPopper,
  chanukah: Flame,
  purim: PartyPopper,
  shushan_purim: PartyPopper,
  tu_bishvat: Trees,
  tu_beav: Heart,
  lag_baomer: Flame,
  tisha_beav: Droplet,
  shiv_asar_tammuz: Droplet,
  fast_of_gedaliah: Droplet,
  fast_of_esther: Droplet,
  tenth_of_tevet: Snowflake,
  rosh_chodesh: Moon,
  yom_haatzmaut: Crown,
  yom_hashoah: Wind,
  yom_hazikaron: Wind,
  yom_yerushalayim: Sunrise,
}

/** Classe Tailwind para o pequeno selo no canto da célula. */
export const HOLIDAY_BADGE_COLOR: Record<NonNullable<HolidayKey>, string> = {
  pesach: 'bg-gold-500 text-petroleum-950',
  chol_hamoed_pesach: 'bg-gold-400 text-petroleum-950',
  shavuot: 'bg-gold-500 text-petroleum-950',
  rosh_hashana: 'bg-gold-600 text-parchment-50',
  yom_kippur: 'bg-petroleum-800 text-parchment-50',
  sukkot: 'bg-gold-500 text-petroleum-950',
  chol_hamoed_sukkot: 'bg-gold-400 text-petroleum-950',
  shemini_atzeret: 'bg-gold-500 text-petroleum-950',
  simchat_torah: 'bg-gold-500 text-petroleum-950',
  chanukah: 'bg-gold-400 text-petroleum-950',
  purim: 'bg-gold-500 text-petroleum-950',
  shushan_purim: 'bg-gold-500 text-petroleum-950',
  tu_bishvat: 'bg-gold-500 text-petroleum-950',
  tu_beav: 'bg-gold-500 text-petroleum-950',
  lag_baomer: 'bg-gold-500 text-petroleum-950',
  tisha_beav: 'bg-warmgray-700 text-parchment-50',
  shiv_asar_tammuz: 'bg-warmgray-600 text-parchment-50',
  fast_of_gedaliah: 'bg-warmgray-600 text-parchment-50',
  fast_of_esther: 'bg-warmgray-600 text-parchment-50',
  tenth_of_tevet: 'bg-warmgray-600 text-parchment-50',
  rosh_chodesh: 'bg-petroleum-500 text-parchment-50',
  yom_haatzmaut: 'bg-gold-500 text-petroleum-950',
  yom_hashoah: 'bg-warmgray-700 text-parchment-50',
  yom_hazikaron: 'bg-warmgray-700 text-parchment-50',
  yom_yerushalayim: 'bg-gold-500 text-petroleum-950',
}
