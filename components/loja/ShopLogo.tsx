'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SHOP_LOGO, SHOP_LOGO_BG, SHOP_NAME } from '@/lib/shop-brand'
import { cn } from '@/lib/utils'

const LOGO_W = 725
const LOGO_H = 544

export function ShopLogo({ className, priority }: { className?: string; priority?: boolean }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <p
        className={cn(
          'font-cinzel text-2xl md:text-3xl font-semibold tracking-[0.2em] text-[#0e7490] dark:text-cyan-400',
          className,
        )}
      >
        ACQUA RIOS
      </p>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 md:px-7 md:py-4',
        className,
      )}
      style={{ backgroundColor: SHOP_LOGO_BG }}
    >
      <Image
        src={SHOP_LOGO}
        alt={SHOP_NAME}
        width={LOGO_W}
        height={LOGO_H}
        sizes="(max-width: 768px) 280px, 400px"
        className="h-auto w-[min(100%,280px)] md:w-[min(100%,400px)] object-contain"
        onError={() => setImgError(true)}
        priority={priority}
        quality={100}
        unoptimized
      />
    </span>
  )
}
