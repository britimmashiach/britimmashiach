/** Tipos e formatação — seguro para Client Components (sem next/headers). */

export type SitePublicStats = {
  members: number
  visitors: number
  leaders: number
  mestres: number
  updatedAt: string | null
}

export type LiveProfileCounts = {
  members: number
  leaders: number
  mestres: number
}

export type SitePublicStatsPayload = {
  members: number
  visitors: number
  leaders: number
  mestres: number
}

export function formatPublicStat(n: number): string {
  return new Intl.NumberFormat('pt-BR').format(Math.max(0, Math.floor(n)))
}
