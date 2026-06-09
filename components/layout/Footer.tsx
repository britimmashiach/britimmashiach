import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'
import { MagenDavidIcon } from '@/components/ui/MagenDavidIcon'
import { SITE_ADDRESS_FULL, SITE_MAPS_URL, SITE_PHONE_DISPLAY, SITE_PHONE_TEL, SITE_WHATSAPP_URL } from '@/lib/site-brand'

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
                <MagenDavidIcon className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 tracking-wide">
                BRIT IM MASHIACH
              </span>
            </div>
            <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-xs">
              Plataforma de estudos judaico-messiânicos, Kabaláh Luriana e espiritualidade profunda sob a orientação do Rav Eliahu Barzilay ben Yehoshua.
            </p>
            <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed max-w-xs flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 text-gold-600 dark:text-gold-400 mt-0.5" aria-hidden="true" />
              <a
                href={SITE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-700 dark:hover:text-gold-400 transition-colors"
              >
                {SITE_ADDRESS_FULL}
              </a>
            </p>
            <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0 text-gold-600 dark:text-gold-400" aria-hidden="true" />
              <a href={`tel:${SITE_PHONE_TEL}`} className="hover:text-gold-700 dark:hover:text-gold-400 transition-colors">
                {SITE_PHONE_DISPLAY}
              </a>
              <span className="text-warmgray-400" aria-hidden="true">·</span>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-700 dark:hover:text-gold-400 transition-colors"
              >
                WhatsApp
              </a>
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
                { href: '/sobre', label: 'Quem somos' },
                { href: '/manifesto', label: 'Manifesto' },
                { href: '/rav', label: 'O Rav' },
                { href: '/ensinos', label: 'Ensinos e guias' },
                { href: '/judaismo-messianico', label: 'Judaísmo messiânico' },
                { href: '/metodo-pardes', label: 'Método PaRDeS' },
                { href: '/faq', label: 'Perguntas frequentes' },
                { href: '/ouvidoria', label: 'Ouvidoria' },
                { href: '/calendar', label: 'Calendário' },
                { href: '/parashot', label: 'Parashot' },
                { href: '/chagim', label: 'Chagim' },
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
                { href: '/comunidade', label: 'Comunidade viva' },
                { href: '/premium', label: 'Portões internos' },
                { href: '/loja', label: 'Acqua Rios' },
                { href: '/lideres', label: 'Área de Líderes' },
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
