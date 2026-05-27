import Link from 'next/link'
import { Quote } from 'lucide-react'
import type { KehilahTestimonial } from '@/lib/community-types'
import { cn } from '@/lib/utils'

type TestimonialsListProps = {
  testimonials: KehilahTestimonial[]
}

export function TestimonialsList({ testimonials }: TestimonialsListProps) {
  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="testemunhos-titulo" className="space-y-6">
      <h2 id="testemunhos-titulo" className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
        Testemunhos da kehilah
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className={cn(
              'glass-card p-6 space-y-3',
              t.isFeatured && 'border-gold-500/25 bg-gold-500/[0.02]',
            )}
          >
            <Quote className="w-8 h-8 text-gold-500/30" aria-hidden="true" />
            <blockquote className="font-cormorant text-lg italic text-petroleum-800 dark:text-parchment-100 leading-relaxed">
              {t.body}
            </blockquote>
            <figcaption className="text-sm font-inter font-medium text-warmgray-600 dark:text-warmgray-400">
              {t.authorDisplayName}
              {t.city ? <span className="font-normal text-warmgray-500"> · {t.city}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="text-xs font-inter text-warmgray-500 leading-relaxed">
        Testemunhos publicados com autorização. Para compartilhar o seu, fale com o Rav após o culto ou use a{' '}
        <Link href="/ouvidoria" className="text-gold-700 dark:text-gold-400 hover:underline">
          ouvidoria
        </Link>
        .
      </p>
    </section>
  )
}
