// =============================================================================
// API: BUSCA REVERSA DE GEMATRIA
// -----------------------------------------------------------------------------
// GET /api/gematria/reverse?value=358&method=hechrachi&source=todos
// Retorna palavras hebraicas cujo valor (no método dado) é igual a `value`,
// mesclando o corpus do Tanach (data/gematria/tanach-words.json) com o léxico
// curado (traduções e referências em lib/gematria-lexicon.ts).
// =============================================================================

import { NextResponse } from 'next/server'
import tanachData from '@/data/gematria/tanach-words.json'
import {
  computeMethod,
  GEMATRIA_METHOD_BY_ID,
  isPublicMethod,
  type GematriaMethodId,
} from '@/lib/gematria'
import { GEMATRIA_LEXICON } from '@/lib/gematria-lexicon'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { profileHasMestreAccess } from '@/lib/leader-access-policy'

/** Confere no servidor se o utilizador atual é Mestre (ou admin). */
async function callerIsMestre(): Promise<boolean> {
  if (!hasSupabaseServerEnv()) return false
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return false
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_mestre')
      .eq('id', user.id)
      .single()
    return profileHasMestreAccess(profile)
  } catch {
    return false
  }
}

interface TanachWord {
  w: string
  n: number
}

const WORDS = (tanachData as { words: TanachWord[] }).words
const UNIQUE_WORDS = (tanachData as { uniqueWords: number }).uniqueWords

const MAX_RESULTS = 400

// Índice por método (value → palavras), construído sob demanda e cacheado.
const methodIndexCache = new Map<GematriaMethodId, Map<number, TanachWord[]>>()

function getMethodIndex(method: GematriaMethodId): Map<number, TanachWord[]> {
  const cached = methodIndexCache.get(method)
  if (cached) return cached
  const index = new Map<number, TanachWord[]>()
  for (const word of WORDS) {
    const value = computeMethod(word.w, method)
    const bucket = index.get(value)
    if (bucket) bucket.push(word)
    else index.set(value, [word])
  }
  methodIndexCache.set(method, index)
  return index
}

interface ResultEntry {
  he: string
  value: number
  count: number | null
  translit: string | null
  pt: string | null
  ref: string | null
  inTanach: boolean
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const value = Number(searchParams.get('value'))
  const method = (searchParams.get('method') ?? 'hechrachi') as GematriaMethodId
  const source = (searchParams.get('source') ?? 'todos') as
    | 'todos'
    | 'tanach'
    | 'dicionario'

  if (!GEMATRIA_METHOD_BY_ID[method]) {
    return NextResponse.json({ error: 'método inválido' }, { status: 400 })
  }

  // Métodos avançados são restritos a Mestres (e admin). O público só usa o
  // Mispar Hechrachi. Validação no servidor — não confiar apenas na UI.
  if (!isPublicMethod(method) && !(await callerIsMestre())) {
    return NextResponse.json(
      { error: 'Método restrito a Mestres.', restricted: true },
      { status: 403 },
    )
  }
  if (!Number.isFinite(value) || value <= 0) {
    return NextResponse.json({ value, total: 0, shown: 0, results: [] })
  }

  const byHe = new Map<string, ResultEntry>()

  // 1) Corpus do Tanach (exceto quando o filtro é "dicionário").
  if (source !== 'dicionario') {
    const matches = getMethodIndex(method).get(value) ?? []
    for (const word of matches) {
      byHe.set(word.w, {
        he: word.w,
        value,
        count: word.n,
        translit: null,
        pt: null,
        ref: null,
        inTanach: true,
      })
    }
  }

  // 2) Léxico curado (traz tradução/transliteração/referência).
  for (const entry of GEMATRIA_LEXICON) {
    if (source === 'tanach' && entry.source !== 'tanach') continue
    if (source === 'dicionario' && entry.source !== 'dicionario') continue
    if (computeMethod(entry.he, method) !== value) continue

    const existing = byHe.get(entry.he)
    if (existing) {
      existing.translit = entry.translit
      existing.pt = entry.pt
      existing.ref = entry.ref ?? null
    } else {
      byHe.set(entry.he, {
        he: entry.he,
        value,
        count: null,
        translit: entry.translit,
        pt: entry.pt,
        ref: entry.ref ?? null,
        inTanach: entry.source === 'tanach',
      })
    }
  }

  const all = [...byHe.values()].sort((a, b) => {
    // 1º: com significado (léxico) vêm antes
    const am = a.pt ? 1 : 0
    const bm = b.pt ? 1 : 0
    if (am !== bm) return bm - am
    // 2º: maior frequência no Tanach
    const an = a.count ?? 0
    const bn = b.count ?? 0
    if (an !== bn) return bn - an
    // 3º: ordem alfabética hebraica
    return a.he.localeCompare(b.he)
  })

  return NextResponse.json({
    value,
    method,
    source,
    total: all.length,
    shown: Math.min(all.length, MAX_RESULTS),
    corpusSize: UNIQUE_WORDS,
    results: all.slice(0, MAX_RESULTS),
  })
}
