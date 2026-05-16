/**
 * Geradores de URL do proxy /api/pdf. Funções puras e seguras pra cliente
 * (não importam supabase-admin/server). O resolvers do servidor (lib/pdf-access.ts)
 * é quem traduz essas URLs em paths concretos no storage.
 *
 * Convenção: se o path no banco for null → URL retorna null (assim os botões
 * de PDF somem na UI quando não há arquivo).
 */

export function aliyahPdfUrl(id: string, path: string | null, variant: '' | '/premium' | '/kabbalah' = ''): string | null {
  if (!path) return null
  return `/api/pdf/aliyah/${id}${variant}`
}

export function parashaPdfUrl(id: string, path: string | null): string | null {
  if (!path) return null
  return `/api/pdf/parasha/${id}`
}

export function chagPdfUrl(id: string, path: string | null, variant: '' | '/premium' | '/kabbalah' = ''): string | null {
  if (!path) return null
  return `/api/pdf/chag/${id}${variant}`
}

export function chagSectionPdfUrl(id: string, path: string | null): string | null {
  if (!path) return null
  return `/api/pdf/chag-section/${id}`
}
