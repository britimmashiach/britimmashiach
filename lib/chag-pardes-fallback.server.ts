import type { Chag } from '@/lib/chagim-supabase'
import fallbackJson from '../data/chagim/pardes-fallback.json'

type PardesFields = { peshat: string; remez: string; drash: string; sod: string }

const FALLBACK = fallbackJson as Record<string, PardesFields>

/** Mescla PaRDeS do repo quando o Supabase ainda não tem as colunas preenchidas. */
export function mergeChagPardesFromRepo(chag: Chag): Chag {
  const fb = FALLBACK[chag.slug]
  if (!fb) return chag
  return {
    ...chag,
    peshat: chag.peshat?.trim() || fb.peshat || '',
    remez: chag.remez?.trim() || fb.remez || '',
    drash: chag.drash?.trim() || fb.drash || '',
    sod: chag.sod?.trim() || fb.sod || '',
  }
}
