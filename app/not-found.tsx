import Link from 'next/link'
import { Star, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-16 h-16 rounded-full bg-petroleum-gradient flex items-center justify-center mx-auto">
          <Star className="w-8 h-8 text-gold-400 fill-gold-400/30" />
        </div>

        <div className="space-y-2">
          <p className="font-hebrew text-3xl text-gold-600 dark:text-gold-400" dir="rtl">
            לֹא נִמְצָא
          </p>
          <h1 className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Página não encontrada
          </h1>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            O caminho que você buscou não existe neste espaço. Talvez ele esteja em outro nível do PaRDeS.
          </p>
        </div>

        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
