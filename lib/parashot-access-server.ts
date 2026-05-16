import { userHasPremiumAccess } from '@/lib/premium-access'

/**
 * @deprecated Use userHasPremiumAccess de '@/lib/premium-access' diretamente.
 * Mantido como alias para não quebrar imports existentes.
 */
export async function userHasPremiumParashaAccess(): Promise<boolean> {
  return userHasPremiumAccess()
}
