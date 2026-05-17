/**
 * Preferências de tradução PT-BR — Tanach customizado (Brit Im Mashiach).
 * Usar em todos os ficheiros em data/traducoes-pt/.
 */

/** Termos fixos (não substituir por sinónimos). */
export const TANACH_TRANSLATION_TERMS = {
  torah: 'Toráh',
  moshe: 'Moshê',
  kabbalah: 'Kabaláh',
} as const

/**
 * Nomes e vocábulos hebraicos terminados em ה (he):
 * transliterar com -áh ou -êh conforme a vogal da terminação.
 * Ex.: חוה → Haváh; צלה → Ziláh; עדה → Adáh; נעמה → Naamáh.
 */
export const TANACH_HEH_ENDING_RULE =
  'Palavras hebraicas terminadas em ה: transliterar com áh ou êh (ex.: Haváh, Ziláh, Adáh).'

export const TANACH_CUSTOM_PT_TITLE = 'Tradução Brit Im Mashiach (revisada)'
