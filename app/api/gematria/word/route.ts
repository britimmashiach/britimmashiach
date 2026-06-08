// =============================================================================
// API: DETALHE DE UMA PALAVRA HEBRAICA
// -----------------------------------------------------------------------------
// GET /api/gematria/word?he=ברא
// Retorna, via API pública do Sefaria:
//   - significado: entradas de dicionário (Klein, BDB, Jastrow…)
//   - ocorrencias: referências no Tanach onde a palavra aparece, com trecho
// Usado pelo modal "ver significado e onde aparece" da ferramenta de Gematria.
// =============================================================================

import { NextResponse } from 'next/server'

interface Definition {
  dict: string
  headword: string
  text: string
}

interface Occurrence {
  ref: string
  heRef: string
  snippet: string
  url: string
}

interface WordDetail {
  he: string
  definitions: Definition[]
  occurrences: Occurrence[]
  occurrencesTotal: number
}

// Cache simples em memória (a Sefaria é uma API pública; evita repetir chamadas).
const cache = new Map<string, WordDetail>()
const HEBREW_RE = /[\u05D0-\u05EA]/

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Coleta recursivamente as definições (campo "definition") de um content. */
function collectDefs(content: unknown, out: string[]): void {
  if (!content || typeof content !== 'object') return
  const senses = (content as { senses?: unknown }).senses
  if (Array.isArray(senses)) {
    for (const s of senses) {
      if (s && typeof s === 'object') {
        const def = (s as { definition?: unknown }).definition
        if (typeof def === 'string') {
          const clean = stripHtml(def)
          if (clean) out.push(clean)
        }
        collectDefs(s, out)
      }
    }
  }
}

async function fetchDefinitions(word: string): Promise<Definition[]> {
  try {
    const url = `https://www.sefaria.org/api/words/${encodeURIComponent(word)}`
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86_400 },
    })
    if (!res.ok) return []
    const entries = (await res.json()) as unknown
    if (!Array.isArray(entries)) return []

    const out: Definition[] = []
    for (const entry of entries) {
      if (!entry || typeof entry !== 'object') continue
      const e = entry as {
        headword?: string
        parent_lexicon?: string
        content?: unknown
      }
      const defs: string[] = []
      collectDefs(e.content, defs)
      const text = defs.slice(0, 3).join(' · ')
      if (!text) continue
      out.push({
        dict: e.parent_lexicon ?? 'Dicionário',
        headword: e.headword ?? word,
        text,
      })
      if (out.length >= 5) break
    }
    return out
  } catch {
    return []
  }
}

async function fetchOccurrences(
  word: string,
): Promise<{ list: Occurrence[]; total: number }> {
  try {
    const res = await fetch('https://www.sefaria.org/api/search-wrapper', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        query: word,
        type: 'text',
        field: 'exact',
        filters: ['Tanakh'],
        filter_fields: ['path'],
        size: 12,
        sort_method: 'score',
      }),
    })
    if (!res.ok) return { list: [], total: 0 }
    const json = (await res.json()) as {
      hits?: {
        total?: number | { value?: number }
        hits?: Array<{
          _source?: { ref?: string; heRef?: string; exact?: string }
          highlight?: { exact?: string[] }
        }>
      }
    }

    const rawTotal = json.hits?.total
    const total =
      typeof rawTotal === 'number' ? rawTotal : (rawTotal?.value ?? 0)

    const list: Occurrence[] = []
    for (const hit of json.hits?.hits ?? []) {
      const ref = hit._source?.ref
      if (!ref) continue
      const highlight = hit.highlight?.exact?.[0]
      const snippet = stripHtml(highlight ?? hit._source?.exact ?? '')
      list.push({
        ref,
        heRef: hit._source?.heRef ?? ref,
        snippet: snippet.length > 220 ? snippet.slice(0, 220) + '…' : snippet,
        url: `https://www.sefaria.org/${encodeURIComponent(ref.replace(/\s/g, '_'))}?lang=he`,
      })
    }
    return { list, total }
  } catch {
    return { list: [], total: 0 }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const he = (searchParams.get('he') ?? '').trim()

  if (!he || !HEBREW_RE.test(he)) {
    return NextResponse.json({ error: 'palavra inválida' }, { status: 400 })
  }

  const cached = cache.get(he)
  if (cached) return NextResponse.json(cached)

  const [definitions, occ] = await Promise.all([
    fetchDefinitions(he),
    fetchOccurrences(he),
  ])

  const detail: WordDetail = {
    he,
    definitions,
    occurrences: occ.list,
    occurrencesTotal: occ.total,
  }
  cache.set(he, detail)
  return NextResponse.json(detail)
}
