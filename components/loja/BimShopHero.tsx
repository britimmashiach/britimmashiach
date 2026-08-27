import Image from 'next/image'
import { BIM_SHOP_NAME, BIM_SHOP_TAGLINE } from '@/lib/bim-shop-brand'

export function BimShopHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-parchment-50 dark:bg-petroleum-950">
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.16]"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.45) 0%, rgba(15,40,60,0.18) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative container mx-auto px-4 py-12 md:py-16 max-w-3xl text-center space-y-5">
        <div className="flex justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden ring-1 ring-gold-500/30 shadow-md bg-petroleum-950/20">
            <Image
              src="/logo.png"
              alt=""
              width={192}
              height={192}
              className="object-contain w-full h-full"
              priority
              unoptimized
            />
          </div>
        </div>
        <h1 className="font-cinzel text-3xl md:text-4xl font-semibold tracking-[0.12em] text-petroleum-800 dark:text-parchment-100">
          {BIM_SHOP_NAME}
        </h1>
        <p className="font-cormorant text-lg md:text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-prose mx-auto leading-relaxed">
          {BIM_SHOP_TAGLINE}
        </p>
        <p className="text-[11px] font-inter font-medium text-warmgray-500 uppercase tracking-[0.18em]">
          Camisetas e acessórios · Franca SP
        </p>
      </div>
    </section>
  )
}
