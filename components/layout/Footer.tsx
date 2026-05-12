import Link from 'next/link'
import { Star } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60 bg-petroleum-800/5 dark:bg-petroleum-950/50 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Identidade */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-petroleum-gradient flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
              </div>
              <span className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                Brit Mashiach
              </span>
            </div>
            <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-xs">
              Plataforma de estudos judaico-messiânicos, Kabaláh Luriana e espiritualidade profunda sob a orientação do Rav Eliahu Barzilay ben Yehoshua.
            </p>
            <p className="text-xs font-hebrew text-warmgray-500 dark:text-warmgray-500 text-right" dir="rtl">
              ברית עם המשיח
            </p>
          </div>

          {/* Plataforma */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-200 uppercase tracking-wider">
              Plataforma
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/calendar', label: 'Calendário' },
                { href: '/parashot', label: 'Parashot' },
                { href: '/studies', label: 'Estudos' },
                { href: '/library', label: 'Biblioteca' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-inter text-warmgray-600 hover:text-petroleum-800 dark:text-warmgray-400 dark:hover:text-parchment-100 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comunidade */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-200 uppercase tracking-wider">
              Comunidade
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/premium', label: 'Plano Premium' },
                { href: '/profile', label: 'Meu Perfil' },
                { href: '/auth', label: 'Entrar' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-inter text-warmgray-600 hover:text-petroleum-800 dark:text-warmgray-400 dark:hover:text-parchment-100 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="divider-gold" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-600 text-center md:text-left">
            © {year} Rav Eliahu Barzilay ben Yehoshua. Brit Im Mashiach, Franca, São Paulo.
          </p>
          <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-600">
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
