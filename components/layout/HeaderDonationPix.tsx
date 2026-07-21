'use client'

import { useState } from 'react'
import { Check, Copy, Heart } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

/** QR oficial da doação (arquivo em public/). */
const QR_SRC = '/images/doacao-pix-qr.png'
const BENEFICIARY =
  (process.env.NEXT_PUBLIC_DONATION_PIX_BENEFICIARY ?? '').trim() ||
  'Sinagoga Brit Im Mashiach'
/** Opcional: se houver PIX copia e cola, mostra botão de copiar. */
const PAYLOAD = (process.env.NEXT_PUBLIC_DONATION_PIX_PAYLOAD ?? '').trim()

/**
 * Doação no header, alinhada a Acqua Rios / Premium.
 * Usa o QR oficial da sinagoga.
 */
export function HeaderDonationPix() {
  const [copied, setCopied] = useState(false)

  async function copyPix() {
    if (!PAYLOAD) return
    try {
      await navigator.clipboard.writeText(PAYLOAD)
      setCopied(true)
      toast.success('Código PIX copiado')
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error('Não foi possível copiar o código PIX')
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'whitespace-nowrap shrink-0 py-2 text-[13px] font-inter transition-colors duration-150',
            'inline-flex items-center gap-1.5 px-2 lg:px-2.5 rounded-lg',
            'text-petroleum-700 dark:text-parchment-200 hover:text-gold-700 dark:hover:text-gold-400',
            'hover:bg-gold-500/10 font-medium',
            'outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40',
          )}
          aria-label="Apoie nosso ministério"
        >
          <Heart className="w-3.5 h-3.5 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
          <span className="hidden lg:inline">Apoie nosso ministério</span>
          <span className="lg:hidden">Doar</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className={cn(
            'z-[100] w-[min(92vw,20rem)] overflow-hidden rounded-xl border border-border/60 bg-background p-4 shadow-lg',
            'animate-fade-in',
          )}
        >
          <p className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 leading-snug text-center tracking-wide mb-1">
            APOIE NOSSO MINISTÉRIO
          </p>
          <p className="font-inter text-xs text-warmgray-500 dark:text-warmgray-400 leading-relaxed text-center mb-3">
            Desde já Obrigado pela sua contribuição.
          </p>

          <div className="mx-auto mb-3 w-fit rounded-lg border border-border/50 bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={QR_SRC}
              alt={`QR Code PIX para doação à ${BENEFICIARY}`}
              width={200}
              height={200}
              className="h-[200px] w-[200px] object-contain"
            />
          </div>

          <p className="text-[11px] font-inter text-warmgray-400 text-center mb-3">
            {BENEFICIARY}
          </p>

          {PAYLOAD ? (
            <button
              type="button"
              onClick={() => void copyPix()}
              className="btn-gold w-full text-sm inline-flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {copied ? 'Copiado' : 'Copiar código PIX'}
            </button>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
