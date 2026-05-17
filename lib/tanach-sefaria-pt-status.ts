import { TANACH_BOOKS } from '@/lib/tanach-books'

/**
 * Livros do Tanach sem tradução paralela completa em PT no Sefaria
 * (verificado via API: capítulo 1 + edições PT do site).
 * Bereshit (Genesis) já tem PT — não entra na fila de tradução customizada.
 */
export const TANACH_BOOKS_WITHOUT_SEFARIA_PT = TANACH_BOOKS.filter((b) => b.slug !== 'genesis').map(
  (b) => b.slug,
)

export function bookNeedsCustomPtTranslation(slug: string): boolean {
  return TANACH_BOOKS_WITHOUT_SEFARIA_PT.includes(slug.toLowerCase())
}
