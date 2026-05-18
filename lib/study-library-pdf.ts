import { libraryBookPdfUrl } from '@/lib/pdf-urls'

/** Estudos que exibem PDF da biblioteca (slug em `library_books`). */
const STUDY_TO_LIBRARY_PDF: Record<string, string> = {
  'netivot-alef-keter': 'modelo-fixo-netivot',
}

export function libraryBookSlugForStudy(studySlug: string): string | null {
  return STUDY_TO_LIBRARY_PDF[studySlug] ?? null
}

export function studyLibraryPdfUrl(studySlug: string): string | null {
  return libraryBookPdfUrl(libraryBookSlugForStudy(studySlug))
}
