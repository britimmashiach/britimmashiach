'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, BookOpen, Calendar, Library, GraduationCap, Crown, Flame } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SiteLogo } from '@/components/layout/SiteLogo'

const navLinks = [
  { href: '/calendar', label: 'Calendário', icon: Calendar },
  { href: '/parashot', label: 'Parashot',   icon: BookOpen  },
  { href: '/chagim',   label: 'Chagim',     icon: Flame     },
  { href: '/studies',  label: 'Estudos',    icon: GraduationCap },
  { href: '/library',  label: 'Biblioteca', icon: Library   },
  { href: '/premium',  label: 'Premium',    icon: Crown, highlight: true },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm relative">
      {/* Borda inferior luminosa — gradiente dourado discreto */}
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent 0%, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Emblema / Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Sinagoga Brit Im Mashiach - Início">
            <SiteLogo />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-cinzel text-sm md:text-base font-semibold text-petroleum-800 dark:text-parchment-100 tracking-widest">
                Brit Mashiach
              </span>
              <span className="text-[10px] md:text-xs font-hebrew text-warmgray-500 tracking-widest" dir="rtl" lang="he">
                ברית משיח
              </span>
            </div>
          </Link>

          {/* Navegação Desktop — texto limpo, sem ícones */}
          <nav className="hidden md:flex items-center" aria-label="Navegação principal">
            {navLinks.map(({ href, label, highlight }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3.5 py-2 text-sm font-inter transition-colors duration-150 relative',
                    highlight
                      ? 'text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 font-medium'
                      : isActive
                        ? 'text-petroleum-800 dark:text-parchment-100 font-semibold'
                        : 'text-warmgray-500 dark:text-warmgray-400 hover:text-foreground dark:hover:text-parchment-100',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                  {/* Linha ativa sutil */}
                  {isActive && !highlight && (
                    <span
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-px bg-gold-500/50 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-1.5">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-warmgray-500 hover:text-foreground"
                aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {theme === 'dark'
                  ? <Sun className="w-4 h-4" aria-hidden="true" />
                  : <Moon className="w-4 h-4" aria-hidden="true" />
                }
              </button>
            )}

            {/* Entrar — estilo portal, não app */}
            <Link
              href="/auth"
              className="hidden md:inline-flex items-center text-sm font-inter font-medium text-warmgray-600 dark:text-warmgray-400 hover:text-petroleum-800 dark:hover:text-parchment-100 border border-border/50 hover:border-gold-500/30 transition-colors px-3 py-1.5 rounded-lg"
            >
              Entrar
            </Link>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Menu de navegação"
            >
              {mobileOpen
                ? <X className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>

        {/* Navegação Mobile — mantém ícones para reconhecimento */}
        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden border-t border-border/40 py-3 pb-4 space-y-0.5 animate-fade-in"
            aria-label="Navegação mobile"
          >
            {navLinks.map(({ href, label, icon: Icon, highlight }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-inter transition-colors w-full',
                    highlight
                      ? 'text-gold-600 dark:text-gold-400 font-medium'
                      : isActive
                        ? 'text-petroleum-800 dark:text-parchment-100 bg-muted font-semibold'
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {label}
                </Link>
              )
            })}
            <div className="pt-2.5 border-t border-border/40 mt-2">
              <Link href="/auth" className="btn-primary w-full text-center text-sm">
                Entrar na plataforma
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
