import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type ChagRelatedLinksProps = {
  slug: string
  category: string
}

const CLUSTER_BY_CATEGORY: Record<string, { href: string; label: string }> = {
  shalosh_regalim: { href: '/chagim/shalosh-regalim', label: 'Guia Shalosh Regalim' },
  yamim_noraim: { href: '/chagim/yamim-noraim', label: 'Guia Yamim Noraim' },
  minor: { href: '/chagim/festividades', label: 'Festividades menores' },
}

const CHAG_SPECIFIC: Record<string, { href: string; label: string }[]> = {
  pesach: [{ href: '/calendar', label: 'Calendário hebraico' }],
  shavuot: [{ href: '/metodo-pardes', label: 'Método PaRDeS' }],
  sukkot: [{ href: '/parashot', label: 'Parashot semanais' }],
  'rosh-hashanah': [
    { href: '/chagim/yom-kippur', label: 'Yom Kippur' },
    { href: '/chagim/yamim-noraim', label: 'Guia Yamim Noraim' },
  ],
  chanukah: [{ href: '/chagim/festividades', label: 'Guia festividades menores' }],
  purim: [{ href: '/chagim/festividades', label: 'Guia festividades menores' }],
  'yom-kippur': [
    { href: '/chagim/rosh-hashanah', label: 'Rosh Hashanah' },
    { href: '/chagim/yamim-noraim', label: 'Guia Yamim Noraim' },
  ],
}

export function ChagRelatedLinks({ slug, category }: ChagRelatedLinksProps) {
  const links = [
    { href: '/chagim', label: 'Todos os Chagim' },
    { href: '/calendar', label: 'Calendário hebraico' },
    { href: '/judaismo-messianico', label: 'Judaísmo messiânico' },
    ...(CLUSTER_BY_CATEGORY[category] ? [CLUSTER_BY_CATEGORY[category]] : []),
    ...(CHAG_SPECIFIC[slug] ?? []),
  ]

  const unique = links.filter(
    (link, i, arr) => arr.findIndex((l) => l.href === link.href) === i,
  )

  return (
    <nav aria-label="Estudos relacionados" className="mt-8 rounded-xl border border-border/40 p-4">
      <h2 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 mb-3">
        Continue estudando
      </h2>
      <ul className="space-y-2">
        {unique.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-600 hover:text-gold-600 dark:text-warmgray-400 dark:hover:text-gold-400 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
