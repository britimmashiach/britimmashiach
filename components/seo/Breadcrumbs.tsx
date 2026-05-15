import Link from 'next/link'
import type { BreadcrumbItem } from '@/lib/json-ld'

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

/** Navegação estrutural visível + suporte a BreadcrumbList no JSON-LD (página pai). */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Trilha de navegação" className={className ?? 'mb-6'}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-inter text-warmgray-500 dark:text-warmgray-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.path} className="inline-flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-warmgray-400 dark:text-warmgray-600" aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span className="text-petroleum-800 dark:text-parchment-200 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
