import path from 'path'
import { profileHasLeaderAccess, profileHasMestreAccess } from '@/lib/leader-access-policy'
import type { Profile } from '@/types'

export const SHLOMO_STAM_FONT_FILENAME = 'ShlomStam.ttf'
export const SHLOMO_STAM_DOWNLOAD_URL = '/api/fonts/shlomo-stam'

/** Caminho absoluto do TTF no servidor (public/fonts). */
export function getShlomoStamFontPath(): string {
  return path.join(process.cwd(), 'public', 'fonts', SHLOMO_STAM_FONT_FILENAME)
}

/** Líderes aprovados, Mestres de Gematria e admin podem baixar a fonte. */
export function profileCanDownloadShlomoStam(
  profile: Pick<Profile, 'role' | 'is_leader' | 'is_mestre'> | null | undefined,
): boolean {
  if (!profile) return false
  return profileHasLeaderAccess(profile) || profileHasMestreAccess(profile)
}
