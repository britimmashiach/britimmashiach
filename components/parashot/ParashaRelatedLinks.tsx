import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type ParashaRelatedLinksProps = {
  book: string
}

const BOOK_LINKS: Record<string, { href: string; label: string }[]> = {
  Bereshit: [
    { href: '/parashot/bereshit', label: 'Parasháh Bereshit' },
    { href: '/studies', label: 'Estudos do Beit Midrash' },
  ],
  Shemot: [
    { href: '/parashot/shemot', label: 'Parasháh Shemot' },
    { href: '/chagim', label: 'Moedim e Chagim' },
  ],
  Vayikra: [
    { href: '/parashot/vayikra', label: 'Parasháh Vayikra' },
    { href: '/metodo-pardes', label: 'Método PaRDeS' },
  ],
  Bamidbar: [
    { href: '/parashot/bamidbar', label: 'Parasháh Bamidbar' },
    { href: '/metodo-pardes', label: 'Método PaRDeS' },
    { href: '/library', label: 'Biblioteca espiritual' },
  ],
  Devarim: [
    { href: '/parashot/devarim', label: 'Parasháh Devarim' },
    { href: '/tanach', label: 'Tanach bilíngue' },
  ],
}

export function ParashaRelatedLinks({ book }: ParashaRelatedLinksProps) {
  const links = [
    { href: '/parashot', label: 'Todas as Parashot' },
    { href: '/metodo-pardes', label: 'Método PaRDeS' },
    { href: '/calendar', label: 'Calendário hebraico' },
    ...(BOOK_LINKS[book] ?? []),
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
