// =============================================================================
// GERADOR DO ÍNDICE DE GEMATRIA — CORPUS DO TANACH
// -----------------------------------------------------------------------------
// Baixa o texto hebraico de todo o Tanach (39 livros) da API pública do Sefaria,
// extrai as palavras consonantais únicas (sem nikud/te'amim) com sua frequência,
// e grava em data/gematria/tanach-words.json.
//
// Os VALORES de gematria NÃO são pré-calculados aqui: a API route os calcula em
// tempo de execução (mesma lógica de lib/gematria.ts), suportando todos os métodos.
//
// Uso:  node scripts/build-gematria-tanach.mjs
// =============================================================================

import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'data', 'gematria')
const OUT_FILE = join(OUT_DIR, 'tanach-words.json')

const BOOKS = [
  // Torah
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  // Nevi'im
  'Joshua', 'Judges', 'I Samuel', 'II Samuel', 'I Kings', 'II Kings',
  'Isaiah', 'Jeremiah', 'Ezekiel',
  'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum',
  'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  // Ketuvim
  'Psalms', 'Proverbs', 'Job', 'Song of Songs', 'Ruth', 'Lamentations',
  'Ecclesiastes', 'Esther', 'Daniel', 'Ezra', 'Nehemiah',
  'I Chronicles', 'II Chronicles',
]

const HEBREW_ONLY_RE = /[^\u05D0-\u05EA]/g

/** Achata recursivamente arrays aninhados de strings (capítulos/versículos). */
function flatten(node, acc) {
  if (Array.isArray(node)) {
    for (const child of node) flatten(child, acc)
  } else if (typeof node === 'string') {
    acc.push(node)
  }
  return acc
}

/** Limpa um versículo: remove HTML, nikud, te'amim; devolve lista de palavras. */
function extractWords(verse) {
  const noHtml = verse.replace(/<[^>]*>/g, ' ')
  // maqaf (־) e pontuação separam palavras
  const spaced = noHtml.replace(/[\u05BE\u05C0\u05C3\u05C6|]/g, ' ')
  const tokens = spaced.split(/\s+/)
  const words = []
  for (const tok of tokens) {
    const clean = tok.replace(HEBREW_ONLY_RE, '')
    if (clean.length > 0) words.push(clean)
  }
  return words
}

async function fetchBook(name) {
  const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(
    name,
  )}?context=0&pad=0&commentary=0`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${name}`)
  const json = await res.json()
  return flatten(json.he ?? [], [])
}

async function main() {
  const counts = new Map()
  let totalTokens = 0

  for (let i = 0; i < BOOKS.length; i++) {
    const book = BOOKS[i]
    process.stdout.write(`[${i + 1}/${BOOKS.length}] ${book} … `)
    try {
      const verses = await fetchBook(book)
      let bookTokens = 0
      for (const verse of verses) {
        for (const w of extractWords(verse)) {
          counts.set(w, (counts.get(w) ?? 0) + 1)
          bookTokens++
        }
      }
      totalTokens += bookTokens
      console.log(`${verses.length} versículos, ${bookTokens} palavras`)
    } catch (err) {
      console.log(`FALHOU: ${err.message}`)
    }
    // gentileza com a API pública
    await new Promise((r) => setTimeout(r, 350))
  }

  const words = [...counts.entries()]
    .map(([w, n]) => ({ w, n }))
    .sort((a, b) => b.n - a.n || a.w.localeCompare(b.w))

  await mkdir(OUT_DIR, { recursive: true })
  const payload = {
    source: 'Sefaria — Tanach (he)',
    generatedAt: new Date().toISOString(),
    uniqueWords: words.length,
    totalTokens,
    words,
  }
  await writeFile(OUT_FILE, JSON.stringify(payload), 'utf-8')

  console.log(
    `\n✅ ${words.length} palavras únicas (de ${totalTokens} ocorrências)\n   → ${OUT_FILE}`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
