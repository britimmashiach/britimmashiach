'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  Calculator,
  Search,
  Delete,
  Eraser,
  ArrowRight,
  ScrollText,
  BookText,
  Loader2,
  Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  computeAllGematria,
  GEMATRIA_METHODS,
  isPublicMethod,
  type GematriaMethodId,
} from '@/lib/gematria'
import { FAMOUS_VALUES, LEXICON_SIZE } from '@/lib/gematria-lexicon'
import { useProfile } from '@/hooks/useProfile'

type Tab = 'calc' | 'reverse'
type SourceFilter = 'todos' | 'tanach' | 'dicionario'

interface ReverseResult {
  he: string
  value: number
  count: number | null
  translit: string | null
  pt: string | null
  ref: string | null
  inTanach: boolean
}

interface ReverseResponse {
  value: number
  total: number
  shown: number
  corpusSize: number
  results: ReverseResult[]
}

// Teclado hebraico: linhas lógicas + formas finais.
const KEY_ROWS: string[][] = [
  ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'],
  ['כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר'],
  ['ש', 'ת', 'ך', 'ם', 'ן', 'ף', 'ץ'],
]

const SOURCE_LABELS: Record<SourceFilter, string> = {
  todos: 'Todos',
  tanach: 'Tanach',
  dicionario: 'Dicionário',
}

export function GematriaClient() {
  const { isMestre } = useProfile()
  const [tab, setTab] = useState<Tab>('calc')

  // Calculadora
  const [text, setText] = useState('שלום')
  const inputRef = useRef<HTMLInputElement>(null)

  // Busca reversa
  const [reverseValue, setReverseValue] = useState('')
  const [reverseMethod, setReverseMethod] = useState<GematriaMethodId>('hechrachi')
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('todos')
  const [data, setData] = useState<ReverseResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const calc = useMemo(() => computeAllGematria(text), [text])
  const targetNumber = Number(reverseValue)

  // Público só usa o Mispar Hechrachi; métodos avançados são para Mestres.
  // Se um não-Mestre estiver com método restrito selecionado, volta ao Hechrachi.
  useEffect(() => {
    if (!isMestre && !isPublicMethod(reverseMethod)) {
      setReverseMethod('hechrachi')
    }
  }, [isMestre, reverseMethod])

  // Busca na API (debounced, cancelável).
  useEffect(() => {
    if (!reverseValue || !Number.isFinite(targetNumber) || targetNumber <= 0) {
      setData(null)
      setError(false)
      setLoading(false)
      return
    }
    const controller = new AbortController()
    setLoading(true)
    setError(false)
    const t = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/gematria/reverse?value=${targetNumber}&method=${reverseMethod}&source=${sourceFilter}`,
          { signal: controller.signal },
        )
        if (!res.ok) throw new Error('falha')
        const json = (await res.json()) as ReverseResponse
        setData(json)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(true)
          setData(null)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 250)
    return () => {
      controller.abort()
      clearTimeout(t)
    }
  }, [targetNumber, reverseValue, reverseMethod, sourceFilter])

  function insert(ch: string) {
    setText((t) => t + ch)
    inputRef.current?.focus()
  }
  function backspace() {
    setText((t) => Array.from(t).slice(0, -1).join(''))
    inputRef.current?.focus()
  }

  function seeWordsWithValue(value: number) {
    setReverseValue(String(value))
    setReverseMethod('hechrachi')
    setSourceFilter('todos')
    setTab('reverse')
  }

  return (
    <div>
      {/* Abas */}
      <div
        className="inline-flex rounded-xl border border-border/60 bg-muted/40 p-1 mb-8"
        role="tablist"
        aria-label="Ferramentas de gematria"
      >
        <TabButton active={tab === 'calc'} onClick={() => setTab('calc')} icon={Calculator}>
          Calculadora
        </TabButton>
        <TabButton active={tab === 'reverse'} onClick={() => setTab('reverse')} icon={Search}>
          Busca reversa
        </TabButton>
      </div>

      {tab === 'calc' ? (
        <section aria-label="Calculadora de gematria" className="space-y-6">
          {/* Entrada */}
          <div className="rounded-2xl border border-border/50 bg-card/80 p-5 sm:p-6">
            <label
              htmlFor="gem-input"
              className="block text-xs font-inter font-semibold uppercase tracking-[0.2em] text-warmgray-500 mb-3"
            >
              Palavra ou frase em hebraico
            </label>
            <input
              id="gem-input"
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              dir="rtl"
              lang="he"
              placeholder="הקלד כאן…"
              className="w-full font-hebrew text-3xl sm:text-4xl bg-transparent border-b-2 border-gold-500/30 focus:border-gold-500 outline-none py-2 text-petroleum-800 dark:text-parchment-100 placeholder:text-warmgray-400/50 transition-colors"
            />
            <div className="mt-2 flex items-center justify-between text-xs font-inter text-warmgray-500">
              <span>{calc.letterCount} letra(s)</span>
              <span className="font-hebrew" dir="rtl">
                {calc.letters || '—'}
              </span>
            </div>

            {/* Teclado hebraico */}
            <div className="mt-5 space-y-1.5">
              {KEY_ROWS.map((row, i) => (
                <div key={i} className="flex flex-wrap gap-1.5 justify-center">
                  {row.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => insert(ch)}
                      className="font-hebrew text-lg h-10 w-9 rounded-lg border border-border/50 bg-background hover:border-gold-500/40 hover:bg-gold-500/5 transition-colors text-petroleum-800 dark:text-parchment-100"
                      aria-label={`Inserir ${ch}`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              ))}
              <div className="flex gap-1.5 justify-center pt-1">
                <button
                  type="button"
                  onClick={() => insert(' ')}
                  className="h-10 px-6 rounded-lg border border-border/50 bg-background hover:bg-muted text-xs font-inter text-warmgray-600 dark:text-warmgray-400 transition-colors"
                >
                  espaço
                </button>
                <button
                  type="button"
                  onClick={backspace}
                  className="h-10 px-4 rounded-lg border border-border/50 bg-background hover:bg-muted inline-flex items-center gap-1.5 text-xs font-inter text-warmgray-600 dark:text-warmgray-400 transition-colors"
                >
                  <Delete className="w-3.5 h-3.5" aria-hidden="true" /> apagar
                </button>
                <button
                  type="button"
                  onClick={() => setText('')}
                  className="h-10 px-4 rounded-lg border border-border/50 bg-background hover:bg-muted inline-flex items-center gap-1.5 text-xs font-inter text-warmgray-600 dark:text-warmgray-400 transition-colors"
                >
                  <Eraser className="w-3.5 h-3.5" aria-hidden="true" /> limpar
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="grid gap-3 sm:grid-cols-2">
            {calc.results.map(({ method, value }) => {
              const locked = method.tier === 'mestre' && !isMestre
              return (
                <div
                  key={method.id}
                  className={cn(
                    'rounded-xl border p-4 flex items-start justify-between gap-3',
                    locked
                      ? 'border-dashed border-border/60 bg-muted/20'
                      : 'border-border/50 bg-card/60',
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100">
                        {method.name}
                      </h3>
                      <span className="font-hebrew text-sm text-warmgray-500" dir="rtl" lang="he">
                        {method.he}
                      </span>
                    </div>
                    <p className="text-xs font-inter text-warmgray-500 mt-1 leading-snug">{method.desc}</p>
                    {locked && (
                      <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-inter font-medium text-warmgray-500">
                        <Lock className="w-3 h-3" aria-hidden="true" />
                        Exclusivo para Mestres
                      </p>
                    )}
                    {!locked && method.id === 'hechrachi' && value > 0 && (
                      <button
                        type="button"
                        onClick={() => seeWordsWithValue(value)}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-inter font-medium text-gold-600 dark:text-gold-400 hover:underline"
                      >
                        Palavras com este valor
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  {locked ? (
                    <Lock className="w-5 h-5 text-warmgray-400 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <span className="font-cinzel text-2xl font-bold text-gold-600 dark:text-gold-400 tabular-nums shrink-0">
                      {value}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {!isMestre && (
            <p className="text-center text-xs font-inter text-warmgray-400">
              <Lock className="inline w-3 h-3 mr-1 -mt-0.5" aria-hidden="true" />
              O público acessa o <strong>Mispar Hechrachi</strong>. Os demais métodos são
              liberados a Mestres pelo administrador.
            </p>
          )}
        </section>
      ) : (
        <section aria-label="Busca reversa de gematria" className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card/80 p-5 sm:p-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="rev-value"
                  className="block text-xs font-inter font-semibold uppercase tracking-[0.2em] text-warmgray-500 mb-2"
                >
                  Valor numérico
                </label>
                <input
                  id="rev-value"
                  type="number"
                  min={1}
                  inputMode="numeric"
                  value={reverseValue}
                  onChange={(e) => setReverseValue(e.target.value)}
                  placeholder="ex.: 358"
                  className="w-full font-cinzel text-2xl bg-transparent border-b-2 border-gold-500/30 focus:border-gold-500 outline-none py-2 text-petroleum-800 dark:text-parchment-100 placeholder:text-warmgray-400/50 transition-colors tabular-nums"
                />
              </div>
              <div>
                <label
                  htmlFor="rev-method"
                  className="block text-xs font-inter font-semibold uppercase tracking-[0.2em] text-warmgray-500 mb-2"
                >
                  Método de cálculo
                </label>
                {isMestre ? (
                  <select
                    id="rev-method"
                    value={reverseMethod}
                    onChange={(e) => setReverseMethod(e.target.value as GematriaMethodId)}
                    className="w-full rounded-lg border border-border/50 bg-background px-3 py-2.5 text-sm font-inter text-foreground focus:border-gold-500 outline-none"
                  >
                    {GEMATRIA_METHODS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div
                    className="w-full rounded-lg border border-dashed border-border/60 bg-muted/20 px-3 py-2.5 text-sm font-inter text-warmgray-600 dark:text-warmgray-400 flex items-center justify-between gap-2"
                    title="Métodos avançados são exclusivos para Mestres"
                  >
                    <span>Mispar Hechrachi</span>
                    <Lock className="w-3.5 h-3.5 text-warmgray-400 shrink-0" aria-hidden="true" />
                  </div>
                )}
              </div>
            </div>

            {/* Filtro de origem */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-inter text-warmgray-500 mr-1">Origem:</span>
              {(['todos', 'tanach', 'dicionario'] as SourceFilter[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSourceFilter(s)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-inter font-medium border transition-colors',
                    sourceFilter === s
                      ? 'border-gold-500/50 bg-gold-500/10 text-gold-700 dark:text-gold-300'
                      : 'border-border/50 text-warmgray-500 hover:text-foreground hover:bg-muted',
                  )}
                >
                  {SOURCE_LABELS[s]}
                </button>
              ))}
            </div>

            {/* Valores famosos */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {FAMOUS_VALUES.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => {
                    setReverseValue(String(f.value))
                    setReverseMethod('hechrachi')
                  }}
                  title={f.note}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/50 bg-background hover:border-gold-500/40 text-xs font-inter text-warmgray-600 dark:text-warmgray-400 transition-colors"
                >
                  <span className="font-cinzel font-semibold text-gold-600 dark:text-gold-400 tabular-nums">
                    {f.value}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Resultados da busca */}
          <div>
            {!reverseValue || targetNumber <= 0 ? (
              <div className="rounded-xl border border-dashed border-border/60 p-8 text-center">
                <p className="font-inter text-sm text-warmgray-500">
                  Digite um número para encontrar palavras com aquele valor.
                </p>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center gap-2 p-8 text-warmgray-500">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                <span className="font-inter text-sm">Buscando…</span>
              </div>
            ) : error ? (
              <div className="rounded-xl border border-dashed border-red-400/40 p-8 text-center">
                <p className="font-inter text-sm text-red-500">
                  Não foi possível buscar agora. Tente novamente.
                </p>
              </div>
            ) : data && data.results.length > 0 ? (
              <>
                <p className="text-sm font-inter text-warmgray-500 mb-3">
                  {data.total} resultado(s) com valor{' '}
                  <span className="font-cinzel font-semibold text-gold-600 dark:text-gold-400">
                    {data.value}
                  </span>
                  {data.total > data.shown && (
                    <span className="text-warmgray-400"> · exibindo os {data.shown} primeiros</span>
                  )}
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {data.results.map((r) => (
                    <li
                      key={`${r.he}-${r.translit ?? ''}`}
                      className="rounded-xl border border-border/50 bg-card/60 p-4 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-hebrew text-2xl text-petroleum-800 dark:text-parchment-100"
                            dir="rtl"
                            lang="he"
                          >
                            {r.he}
                          </span>
                          {r.translit && (
                            <span className="text-xs font-inter italic text-warmgray-500">{r.translit}</span>
                          )}
                        </div>
                        {r.pt && <p className="text-sm font-inter text-foreground/80 mt-1">{r.pt}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          {r.ref && <span className="text-[11px] font-inter text-warmgray-400">{r.ref}</span>}
                          {r.count != null && (
                            <span className="text-[11px] font-inter text-warmgray-400">
                              {r.count}× no Tanach
                            </span>
                          )}
                        </div>
                      </div>
                      <SourceBadge inTanach={r.inTanach} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-border/60 p-8 text-center">
                <p className="font-inter text-sm text-warmgray-500">
                  Nenhuma palavra com valor{' '}
                  <span className="font-cinzel font-semibold">{targetNumber}</span> neste método/origem.
                </p>
                <p className="font-inter text-xs text-warmgray-400 mt-1">Tente outro método ou número.</p>
              </div>
            )}
          </div>
        </section>
      )}

      <p className="mt-8 text-center text-xs font-inter text-warmgray-400">
        Corpus: {(data?.corpusSize ?? 40140).toLocaleString('pt-BR')} palavras do Tanach +{' '}
        {LEXICON_SIZE} termos curados com tradução.
      </p>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Calculator
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-inter font-medium transition-colors',
        active
          ? 'bg-background text-petroleum-800 dark:text-parchment-100 shadow-sm'
          : 'text-warmgray-500 hover:text-foreground',
      )}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      {children}
    </button>
  )
}

function SourceBadge({ inTanach }: { inTanach: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 shrink-0 text-[10px] font-inter font-semibold px-2 py-0.5 rounded-full',
        inTanach
          ? 'bg-petroleum-800/10 text-petroleum-800 dark:text-gold-400'
          : 'bg-muted text-warmgray-500 dark:text-warmgray-400',
      )}
    >
      {inTanach ? (
        <ScrollText className="w-2.5 h-2.5" aria-hidden="true" />
      ) : (
        <BookText className="w-2.5 h-2.5" aria-hidden="true" />
      )}
      {inTanach ? 'Tanach' : 'Dicionário'}
    </span>
  )
}
