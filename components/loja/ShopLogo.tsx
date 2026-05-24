'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SHOP_LOGO, SHOP_NAME } from '@/lib/shop-brand'
import { cn } from '@/lib/utils'

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
    <Image
      src={SHOP_LOGO}
      alt={SHOP_NAME}
      width={320}
      height={120}
      className={cn('h-auto w-[min(100%,280px)] md:w-[min(100%,320px)] object-contain mx-auto', className)}
      onError={() => setImgError(true)}
      priority={priority}
      unoptimized
    />
  )
}
