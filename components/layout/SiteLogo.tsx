'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Marca no header: logo oficial da Sinagoga Brit Im Mashiach.
 * Arquivo em `public/logo.png`. Fallback automático (monograma SVG dourado)
 * caso o arquivo não esteja disponível.
 */
export function SiteLogo() {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0 bg-petroleum-800 dark:bg-petroleum-700 flex items-center justify-center ring-1 ring-gold-500/25"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 text-gold-400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
          <path
            d="M16 7v18M11 11l5-4 5 4M11 21l5 4 5-4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 relative rounded-full overflow-hidden ring-1 ring-white/15 shadow-md bg-petroleum-950/25">
      <Image
        src="/logo.png"
        alt="Sinagoga Brit Im Mashiach"
        width={160}
        height={160}
        className="object-contain w-full h-full"
        onError={() => setImgError(true)}
        priority
        unoptimized
      />
    </div>
  )
}
