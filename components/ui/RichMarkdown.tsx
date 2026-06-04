import { cn } from '@/lib/utils'

type Props = { text: string; className?: string }

const HEB = /[֐-׿]/
const HEB_ONLY = /^[֐-׿\s.,:;!?\-()'"׃ׅׄ‎‏]+$/

function parseInline(text: string, baseKey: string) {
  const nodes: React.ReactNode[] = []
  const re = /\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|`([^`\n]+)`/g
  let last = 0
  let i = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={`${baseKey}-t${i++}`}>{text.slice(last, m.index)}</span>)
    }
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={`${baseKey}-b${i++}`} className="font-semibold text-petroleum-800 dark:text-parchment-100">
          {m[1]}
        </strong>,
      )
    } else if (m[2] !== undefined) {
      nodes.push(
        <em key={`${baseKey}-i${i++}`} className="font-cormorant italic text-petroleum-700 dark:text-gold-300">
          {m[2]}
        </em>,
      )
    } else if (m[3] !== undefined) {
      nodes.push(
        <code
          key={`${baseKey}-c${i++}`}
          className="font-mono text-xs px-1.5 py-0.5 rounded bg-petroleum-800/5 dark:bg-parchment-100/10"
        >
          {m[3]}
        </code>,
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) nodes.push(<span key={`${baseKey}-tail`}>{text.slice(last)}</span>)
  return nodes
}

function splitRow(line: string): string[] {
  const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|')
  return cells.map((c) => c.trim())
}

function isTableSeparator(line: string): boolean {
  const t = line.trim()
  return /^\|?[\s:|-]+\|?$/.test(t) && t.includes('-') && t.includes('|')
}

export function RichMarkdown({ text, className }: Props) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: React.ReactNode[] = []
  let bullets: string[] | null = null
  let key = 0

  const flushBullets = () => {
    if (!bullets) return
    const items = bullets
    bullets = null
    blocks.push(
      <ul key={`b${key++}`} className="my-3 space-y-1.5 list-none">
        {items.map((it, idx) => (
          <li
            key={idx}
            className="font-inter text-base text-foreground/90 leading-relaxed flex gap-2"
          >
            <span className="text-gold-600 dark:text-gold-400 select-none flex-shrink-0">▸</span>
            <span>{parseInline(it, `bi${idx}`)}</span>
          </li>
        ))}
      </ul>,
    )
  }

  for (let li = 0; li < lines.length; li++) {
    const raw = lines[li]
    const line = raw.trimEnd()
    const trimmed = line.trim()

    if (trimmed === '') {
      flushBullets()
      continue
    }

    // Tabela markdown: linha com | seguida de linha separadora |---|
    if (
      trimmed.startsWith('|') &&
      li + 1 < lines.length &&
      isTableSeparator(lines[li + 1])
    ) {
      flushBullets()
      const header = splitRow(trimmed)
      const rows: string[][] = []
      let j = li + 2
      while (j < lines.length && lines[j].trim().startsWith('|')) {
        rows.push(splitRow(lines[j]))
        j++
      }
      blocks.push(
        <div key={`tbl${key++}`} className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gold-500/30">
                {header.map((h, hi) => (
                  <th
                    key={hi}
                    className="text-left font-cinzel font-semibold text-petroleum-800 dark:text-parchment-100 px-3 py-2"
                  >
                    {parseInline(h, `th${key}-${hi}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri} className="border-b border-border/30 last:border-0">
                  {r.map((c, ci) => (
                    <td
                      key={ci}
                      className="align-top px-3 py-2 font-inter text-foreground/90 leading-relaxed"
                    >
                      {parseInline(c, `td${key}-${ri}-${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      )
      li = j - 1
      continue
    }

    if (trimmed === '---' || trimmed === '***') {
      flushBullets()
      blocks.push(<hr key={`hr${key++}`} className="divider-gold my-6" />)
      continue
    }

    if (trimmed.startsWith('▸ ')) {
      ;(bullets ??= []).push(trimmed.slice(2))
      continue
    }

    flushBullets()

    if (trimmed.startsWith('#### ')) {
      blocks.push(
        <h4
          key={`h4-${key++}`}
          className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 mt-5 mb-2"
        >
          {parseInline(trimmed.slice(5), `h4i${key}`)}
        </h4>,
      )
      continue
    }
    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3
          key={`h3-${key++}`}
          className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 mt-6 mb-2"
        >
          {parseInline(trimmed.slice(4), `h3i${key}`)}
        </h3>,
      )
      continue
    }
    if (trimmed.startsWith('## ')) {
      blocks.push(
        <h3
          key={`h2-${key++}`}
          className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100 mt-8 mb-3"
        >
          {parseInline(trimmed.slice(3), `h2i${key}`)}
        </h3>,
      )
      continue
    }
    if (trimmed.startsWith('# ')) {
      blocks.push(
        <h2
          key={`h1-${key++}`}
          className="font-cinzel text-2xl font-semibold text-petroleum-900 dark:text-parchment-100 mt-8 mb-4"
        >
          {parseInline(trimmed.slice(2), `h1i${key}`)}
        </h2>,
      )
      continue
    }

    if (HEB_ONLY.test(trimmed)) {
      blocks.push(
        <p
          key={`heb${key++}`}
          dir="rtl"
          lang="he"
          className="font-hebrew text-2xl md:text-3xl leading-loose text-right my-4 text-petroleum-900 dark:text-gold-300"
        >
          {trimmed}
        </p>,
      )
      continue
    }

    const isQuote =
      trimmed.startsWith('> ') ||
      (HEB.test(trimmed) && (trimmed.match(/[֐-׿]/g)?.length ?? 0) > 4)

    if (trimmed.startsWith('> ')) {
      blocks.push(
        <blockquote
          key={`q${key++}`}
          className="my-4 pl-4 border-l-2 border-gold-500/40 font-cormorant italic text-lg text-petroleum-700 dark:text-gold-200"
        >
          {parseInline(trimmed.slice(2), `qi${key}`)}
        </blockquote>,
      )
      continue
    }

    blocks.push(
      <p
        key={`p${key++}`}
        className={cn(
          'font-inter text-base text-foreground/90 leading-relaxed mb-4',
          isQuote && 'font-cormorant italic',
        )}
      >
        {parseInline(line, `pi${key}`)}
      </p>,
    )
  }

  flushBullets()
  return <div className={className}>{blocks}</div>
}
