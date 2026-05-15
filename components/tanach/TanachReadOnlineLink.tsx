'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { resolveTanachResumeHref, type TanachResumeScope } from '@/lib/tanach-reading-prefs'

type Props = {
  fallbackHref: string
  scope: TanachResumeScope
  label?: string
  bookTitle: string
}

export function TanachReadOnlineLink({ fallbackHref, scope, label = 'Ler online', bookTitle }: Props) {
  const [href, setHref] = useState(fallbackHref)

  useEffect(() => {
    setHref(resolveTanachResumeHref(fallbackHref, scope))
  }, [fallbackHref, scope])

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
      aria-label={`${label}: ${bookTitle}`}
    >
      <BookOpen className="w-3 h-3" aria-hidden="true" />
      {label}
    </Link>
  )
}
