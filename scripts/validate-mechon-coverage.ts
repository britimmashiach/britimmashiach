/**
 * Valida que todos os livros/capítulos do índice Tanach têm ID Mechon.
 * Uso: npx tsx scripts/validate-mechon-coverage.ts
 */
import { TANACH_BOOKS } from '../lib/tanach-books'
import { buildMechonChapterFileId } from '../lib/mechon-mamre-media'

let missing = 0
for (const book of TANACH_BOOKS) {
  for (let ch = 1; ch <= book.chapters; ch++) {
    const id = buildMechonChapterFileId(book.apiName, ch)
    if (!id) {
      console.error('MISSING', book.apiName, ch)
      missing++
    }
  }
}
if (missing === 0) {
  console.log('OK: todos os', TANACH_BOOKS.length, 'livros mapeados para Mechon.')
} else {
  console.error('Faltam', missing, 'capítulos.')
  process.exit(1)
}
