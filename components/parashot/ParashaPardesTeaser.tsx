import type { Parasha } from '@/lib/parashot-supabase'

const LEVELS = [
  { key: 'peshat' as const, label: 'Peshat', subtitle: 'Análise literal e halachica', color: 'text-green-700 dark:text-green-400' },
  { key: 'remez' as const, label: 'Remez', subtitle: 'O princípio velado', color: 'text-blue-700 dark:text-blue-400' },
  { key: 'drash' as const, label: 'Drash', subtitle: 'O ensino homilético', color: 'text-amber-800 dark:text-amber-400' },
  { key: 'sod' as const, label: 'Sod', subtitle: 'O segredo kabalístico', color: 'text-purple-700 dark:text-purple-400' },
]

type ParashaPardesTeaserProps = {
  parasha: Pick<Parasha, 'peshat' | 'remez' | 'drash' | 'sod'>
}

export function ParashaPardesTeaser({ parasha }: ParashaPardesTeaserProps) {
  const blocks = LEVELS.filter((l) => parasha[l.key]?.trim())
  if (blocks.length === 0) return null

  return (
    <section aria-labelledby="pardes-teaser-heading" className="mb-8 space-y-4">
      <div>
        <h2
          id="pardes-teaser-heading"
          className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100"
        >
          Visão PaRDeS desta Parasháh
        </h2>
        <p className="text-xs font-inter text-warmgray-500 mt-1 max-w-2xl leading-relaxed">
          Resumo público nos quatro níveis clássicos de estudo. O aprofundamento completo com fontes e PDFs
          está no estudo Premium.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {blocks.map(({ key, label, subtitle, color }) => (
          <article
            key={key}
            className="rounded-xl border border-border/50 bg-card/40 p-4"
          >
            <h3 className={`font-cinzel text-base font-semibold ${color}`}>
              {label}
            </h3>
            <p className="text-[11px] font-inter font-medium text-warmgray-500 uppercase tracking-wide mt-0.5 mb-2">
              {subtitle}
            </p>
            <p className="font-inter text-sm text-foreground leading-relaxed line-clamp-6">
              {parasha[key]}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
