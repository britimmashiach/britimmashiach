// =============================================================================
// LÉXICO DE GEMATRIA
// -----------------------------------------------------------------------------
// Corpus curado de palavras hebraicas para a "busca reversa" (número → palavras).
// Os VALORES não são armazenados: são calculados pelo motor (lib/gematria.ts),
// garantindo exatidão. Aqui guardamos apenas grafia, transliteração, significado
// e a origem (Tanach = termo/Nome bíblico; dicionário = vocabulário geral).
// O léxico é facilmente expansível: basta acrescentar entradas ao array.
// =============================================================================

export type LexiconSource = 'tanach' | 'dicionario'

export interface LexiconEntry {
  /** Grafia hebraica (consonantal). */
  he: string
  /** Transliteração. */
  translit: string
  /** Significado em português. */
  pt: string
  /** Origem do termo. */
  source: LexiconSource
  /** Referência opcional (ex.: "Bereshit 1:1"). */
  ref?: string
}

export const GEMATRIA_LEXICON: LexiconEntry[] = [
  // ---- Nomes e termos sagrados ------------------------------------------
  { he: 'אלוהים', translit: 'Elohim', pt: 'Deus', source: 'tanach', ref: 'Bereshit 1:1' },
  { he: 'אל', translit: 'El', pt: 'Deus, o Poderoso', source: 'tanach' },
  { he: 'שדי', translit: 'Shadai', pt: 'O Todo-Poderoso', source: 'tanach' },
  { he: 'צבאות', translit: 'Tzevaot', pt: 'dos Exércitos', source: 'tanach' },
  { he: 'קדוש', translit: 'Kadosh', pt: 'santo', source: 'tanach' },
  { he: 'ברוך', translit: 'Baruch', pt: 'bendito', source: 'tanach' },
  { he: 'הללויה', translit: 'Halleluyah', pt: 'louvai a Yah', source: 'tanach' },

  // ---- Conceitos centrais -----------------------------------------------
  { he: 'תורה', translit: 'Torah', pt: 'Lei, Instrução', source: 'tanach' },
  { he: 'שלום', translit: 'Shalom', pt: 'paz, plenitude', source: 'tanach' },
  { he: 'אהבה', translit: 'Ahavah', pt: 'amor', source: 'tanach' },
  { he: 'אחד', translit: 'Echad', pt: 'um, único', source: 'tanach', ref: 'Devarim 6:4' },
  { he: 'אמת', translit: 'Emet', pt: 'verdade', source: 'tanach' },
  { he: 'אמונה', translit: 'Emunah', pt: 'fé, fidelidade', source: 'tanach' },
  { he: 'חיים', translit: 'Chayim', pt: 'vida', source: 'tanach' },
  { he: 'חי', translit: 'Chai', pt: 'vivo', source: 'tanach' },
  { he: 'אור', translit: 'Or', pt: 'luz', source: 'tanach', ref: 'Bereshit 1:3' },
  { he: 'חושך', translit: 'Choshech', pt: 'escuridão', source: 'tanach' },
  { he: 'תשובה', translit: 'Teshuvah', pt: 'retorno, arrependimento', source: 'dicionario' },
  { he: 'צדק', translit: 'Tzedek', pt: 'justiça', source: 'tanach' },
  { he: 'צדקה', translit: 'Tzedakah', pt: 'caridade, retidão', source: 'dicionario' },
  { he: 'רחמים', translit: 'Rachamim', pt: 'misericórdia', source: 'tanach' },
  { he: 'ברכה', translit: 'Berachah', pt: 'bênção', source: 'tanach' },
  { he: 'גאולה', translit: 'Geulah', pt: 'redenção', source: 'tanach' },
  { he: 'קדושה', translit: 'Kedushah', pt: 'santidade', source: 'dicionario' },
  { he: 'תפילה', translit: 'Tefilah', pt: 'oração', source: 'dicionario' },
  { he: 'מצוה', translit: 'Mitzvah', pt: 'mandamento', source: 'tanach' },
  { he: 'ברית', translit: 'Brit', pt: 'aliança, pacto', source: 'tanach' },
  { he: 'שמחה', translit: 'Simchah', pt: 'alegria', source: 'tanach' },
  { he: 'רצון', translit: 'Ratzon', pt: 'vontade, desejo', source: 'tanach' },
  { he: 'עולם', translit: 'Olam', pt: 'mundo, eternidade', source: 'tanach' },
  { he: 'מזל', translit: 'Mazal', pt: 'constelação, sorte', source: 'dicionario' },
  { he: 'חן', translit: 'Chen', pt: 'graça, favor', source: 'tanach' },
  { he: 'טוב', translit: 'Tov', pt: 'bom', source: 'tanach', ref: 'Bereshit 1:4' },

  // ---- Alma e interioridade ---------------------------------------------
  { he: 'נשמה', translit: 'Neshamah', pt: 'alma (sopro divino)', source: 'tanach' },
  { he: 'רוח', translit: 'Ruach', pt: 'espírito, vento', source: 'tanach' },
  { he: 'נפש', translit: 'Nefesh', pt: 'alma, ser vivente', source: 'tanach' },
  { he: 'לב', translit: 'Lev', pt: 'coração', source: 'tanach' },
  { he: 'דעת', translit: "Da'at", pt: 'conhecimento', source: 'tanach' },
  { he: 'כח', translit: 'Koach', pt: 'força, potência', source: 'tanach' },
  { he: 'חלום', translit: 'Chalom', pt: 'sonho', source: 'tanach' },

  // ---- Sefirot -----------------------------------------------------------
  { he: 'כתר', translit: 'Keter', pt: 'Coroa (Sefirá)', source: 'dicionario' },
  { he: 'חכמה', translit: 'Chochmah', pt: 'Sabedoria (Sefirá)', source: 'tanach' },
  { he: 'בינה', translit: 'Binah', pt: 'Entendimento (Sefirá)', source: 'tanach' },
  { he: 'חסד', translit: 'Chesed', pt: 'Bondade (Sefirá)', source: 'tanach' },
  { he: 'גבורה', translit: 'Gevurah', pt: 'Força, Rigor (Sefirá)', source: 'tanach' },
  { he: 'תפארת', translit: 'Tiferet', pt: 'Beleza (Sefirá)', source: 'dicionario' },
  { he: 'נצח', translit: 'Netzach', pt: 'Eternidade, Vitória (Sefirá)', source: 'tanach' },
  { he: 'הוד', translit: 'Hod', pt: 'Esplendor (Sefirá)', source: 'tanach' },
  { he: 'יסוד', translit: 'Yesod', pt: 'Fundamento (Sefirá)', source: 'tanach' },
  { he: 'מלכות', translit: 'Malchut', pt: 'Reino (Sefirá)', source: 'tanach' },

  // ---- Messias e adversário ---------------------------------------------
  { he: 'משיח', translit: 'Mashiach', pt: 'Messias, ungido', source: 'tanach' },
  { he: 'נחש', translit: 'Nachash', pt: 'serpente', source: 'tanach' },
  { he: 'שטן', translit: 'Satan', pt: 'adversário', source: 'tanach' },
  { he: 'מלאך', translit: "Mal'ach", pt: 'anjo, mensageiro', source: 'tanach' },

  // ---- Cosmos e natureza -------------------------------------------------
  { he: 'שמים', translit: 'Shamayim', pt: 'céus', source: 'tanach', ref: 'Bereshit 1:1' },
  { he: 'ארץ', translit: 'Eretz', pt: 'terra', source: 'tanach', ref: 'Bereshit 1:1' },
  { he: 'מים', translit: 'Mayim', pt: 'água', source: 'tanach' },
  { he: 'אש', translit: 'Esh', pt: 'fogo', source: 'tanach' },
  { he: 'שמש', translit: 'Shemesh', pt: 'sol', source: 'tanach' },
  { he: 'ירח', translit: 'Yareach', pt: 'lua', source: 'tanach' },
  { he: 'כוכב', translit: 'Kochav', pt: 'estrela', source: 'tanach' },
  { he: 'עץ', translit: 'Etz', pt: 'árvore', source: 'tanach' },
  { he: 'פרי', translit: 'Pri', pt: 'fruto', source: 'tanach' },
  { he: 'ים', translit: 'Yam', pt: 'mar', source: 'tanach' },
  { he: 'הר', translit: 'Har', pt: 'montanha', source: 'tanach' },
  { he: 'אבן', translit: 'Even', pt: 'pedra', source: 'tanach' },

  // ---- Tempo -------------------------------------------------------------
  { he: 'יום', translit: 'Yom', pt: 'dia', source: 'tanach' },
  { he: 'לילה', translit: 'Laylah', pt: 'noite', source: 'tanach' },
  { he: 'בוקר', translit: 'Boker', pt: 'manhã', source: 'tanach' },
  { he: 'ערב', translit: 'Erev', pt: 'tarde, entardecer', source: 'tanach' },
  { he: 'שנה', translit: 'Shanah', pt: 'ano', source: 'tanach' },
  { he: 'שבת', translit: 'Shabat', pt: 'sábado, descanso', source: 'tanach' },
  { he: 'חג', translit: 'Chag', pt: 'festa, festival', source: 'tanach' },

  // ---- Culto e Templo ----------------------------------------------------
  { he: 'מקדש', translit: 'Mikdash', pt: 'santuário', source: 'tanach' },
  { he: 'משכן', translit: 'Mishkan', pt: 'tabernáculo', source: 'tanach' },
  { he: 'מנורה', translit: 'Menorah', pt: 'candelabro', source: 'tanach' },
  { he: 'כבוד', translit: 'Kavod', pt: 'glória, honra', source: 'tanach' },
  { he: 'נר', translit: 'Ner', pt: 'vela, lâmpada', source: 'tanach' },
  { he: 'קטורת', translit: 'Ketoret', pt: 'incenso', source: 'tanach' },
  { he: 'כהן', translit: 'Kohen', pt: 'sacerdote', source: 'tanach' },
  { he: 'נביא', translit: 'Navi', pt: 'profeta', source: 'tanach' },

  // ---- Pessoas (Tanach) --------------------------------------------------
  { he: 'אדם', translit: 'Adam', pt: 'Adão, ser humano', source: 'tanach' },
  { he: 'חוה', translit: 'Chavah', pt: 'Eva', source: 'tanach' },
  { he: 'נח', translit: 'Noach', pt: 'Noé', source: 'tanach' },
  { he: 'אברהם', translit: 'Avraham', pt: 'Abraão', source: 'tanach' },
  { he: 'שרה', translit: 'Sarah', pt: 'Sara', source: 'tanach' },
  { he: 'יצחק', translit: 'Yitzchak', pt: 'Isaque', source: 'tanach' },
  { he: 'רבקה', translit: 'Rivkah', pt: 'Rebeca', source: 'tanach' },
  { he: 'יעקב', translit: "Ya'akov", pt: 'Jacó', source: 'tanach' },
  { he: 'רחל', translit: 'Rachel', pt: 'Raquel', source: 'tanach' },
  { he: 'לאה', translit: 'Leah', pt: 'Lia', source: 'tanach' },
  { he: 'יוסף', translit: 'Yosef', pt: 'José', source: 'tanach' },
  { he: 'משה', translit: 'Moshe', pt: 'Moisés', source: 'tanach' },
  { he: 'אהרן', translit: 'Aharon', pt: 'Arão', source: 'tanach' },
  { he: 'מרים', translit: 'Miriam', pt: 'Miriã', source: 'tanach' },
  { he: 'דוד', translit: 'David', pt: 'Davi', source: 'tanach' },
  { he: 'שלמה', translit: 'Shlomo', pt: 'Salomão', source: 'tanach' },
  { he: 'אליהו', translit: 'Eliyahu', pt: 'Elias', source: 'tanach' },
  { he: 'יהושע', translit: 'Yehoshua', pt: 'Josué', source: 'tanach' },
  { he: 'חנה', translit: 'Chanah', pt: 'Ana', source: 'tanach' },
  { he: 'רות', translit: 'Rut', pt: 'Rute', source: 'tanach' },
  { he: 'אסתר', translit: 'Esther', pt: 'Ester', source: 'tanach' },

  // ---- Lugares (Tanach) --------------------------------------------------
  { he: 'ישראל', translit: 'Israel', pt: 'Israel', source: 'tanach' },
  { he: 'ירושלים', translit: 'Yerushalayim', pt: 'Jerusalém', source: 'tanach' },
  { he: 'ציון', translit: 'Tzion', pt: 'Sião', source: 'tanach' },
  { he: 'עדן', translit: 'Eden', pt: 'Éden', source: 'tanach' },
  { he: 'סיני', translit: 'Sinai', pt: 'Sinai', source: 'tanach' },

  // ---- Corpo e pessoas ---------------------------------------------------
  { he: 'איש', translit: 'Ish', pt: 'homem', source: 'tanach' },
  { he: 'אשה', translit: 'Ishah', pt: 'mulher', source: 'tanach' },
  { he: 'מלך', translit: 'Melech', pt: 'rei', source: 'tanach' },
  { he: 'עם', translit: 'Am', pt: 'povo', source: 'tanach' },
  { he: 'יד', translit: 'Yad', pt: 'mão', source: 'tanach' },
  { he: 'עין', translit: 'Ayin', pt: 'olho, fonte', source: 'tanach' },
  { he: 'ראש', translit: 'Rosh', pt: 'cabeça, início', source: 'tanach' },
  { he: 'פה', translit: 'Peh', pt: 'boca', source: 'tanach' },
  { he: 'דם', translit: 'Dam', pt: 'sangue', source: 'tanach' },
  { he: 'שם', translit: 'Shem', pt: 'nome', source: 'tanach' },
  { he: 'קול', translit: 'Kol', pt: 'voz, som', source: 'tanach' },
  { he: 'דבר', translit: 'Davar', pt: 'palavra, coisa', source: 'tanach' },

  // ---- Vocabulário geral (dicionário) -----------------------------------
  { he: 'בית', translit: 'Bayit', pt: 'casa', source: 'dicionario' },
  { he: 'ספר', translit: 'Sefer', pt: 'livro', source: 'dicionario' },
  { he: 'דרך', translit: 'Derech', pt: 'caminho', source: 'dicionario' },
  { he: 'עיר', translit: 'Ir', pt: 'cidade', source: 'dicionario' },
  { he: 'לחם', translit: 'Lechem', pt: 'pão', source: 'dicionario' },
  { he: 'יין', translit: 'Yayin', pt: 'vinho', source: 'dicionario' },
  { he: 'שמן', translit: 'Shemen', pt: 'óleo, azeite', source: 'dicionario' },
  { he: 'בן', translit: 'Ben', pt: 'filho', source: 'dicionario' },
  { he: 'בת', translit: 'Bat', pt: 'filha', source: 'dicionario' },
  { he: 'אבא', translit: 'Aba', pt: 'pai', source: 'dicionario' },
  { he: 'אמא', translit: 'Ima', pt: 'mãe', source: 'dicionario' },
  { he: 'אח', translit: 'Ach', pt: 'irmão', source: 'dicionario' },
  { he: 'ילד', translit: 'Yeled', pt: 'criança, menino', source: 'dicionario' },
  { he: 'חבר', translit: 'Chaver', pt: 'amigo, companheiro', source: 'dicionario' },
  { he: 'עבד', translit: 'Eved', pt: 'servo', source: 'dicionario' },
  { he: 'שיר', translit: 'Shir', pt: 'canção', source: 'dicionario' },
  { he: 'מלחמה', translit: 'Milchamah', pt: 'guerra', source: 'dicionario' },
  { he: 'חכם', translit: 'Chacham', pt: 'sábio', source: 'dicionario' },
  { he: 'טהור', translit: 'Tahor', pt: 'puro', source: 'dicionario' },
  { he: 'צום', translit: 'Tzom', pt: 'jejum', source: 'dicionario' },
]

/** Total de termos no léxico (para exibição). */
export const LEXICON_SIZE = GEMATRIA_LEXICON.length

/** Sugestões de valores "famosos" para a busca reversa. */
export const FAMOUS_VALUES: { value: number; note: string }[] = [
  { value: 13, note: 'אהבה (amor) = אחד (um)' },
  { value: 18, note: 'חי (vivo) — "Chai"' },
  { value: 26, note: 'Nome de quatro letras' },
  { value: 358, note: 'משיח (Messias) = נחש (serpente)' },
  { value: 541, note: 'ישראל (Israel)' },
  { value: 611, note: 'תורה (Torah)' },
]
