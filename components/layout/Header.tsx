'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import {
  Moon,
  Sun,
  Menu,
  X,
  BookOpen,
  Calendar,
  Library,
  GraduationCap,
  Crown,
  Flame,
  User,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SiteLogo } from '@/components/layout/SiteLogo'
import { useProfile } from '@/hooks/useProfile'
import type { SessionDisplay } from '@/hooks/useProfile'
import { createClient, supabaseConfigured } from '@/lib/supabase'

const navLinks = [
  { href: '/calendar', label: 'Calendário', icon: Calendar },
  { href: '/parashot', label: 'Parashot', icon: BookOpen },
  { href: '/chagim', label: 'Chagim', icon: Flame },
  { href: '/studies', label: 'Estudos', icon: GraduationCap },
  { href: '/library', label: 'Biblioteca', icon: Library },
  { href: '/premium', label: 'Premium', icon: Crown, highlight: true },
]

function RoleBadge({ role }: { role: string }) {
  if (role === 'admin')
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-inter font-semibold px-1.5 py-0.5 rounded-full bg-petroleum-800 text-gold-400">
        <ShieldCheck className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
        Admin
      </span>
    )
  if (role === 'premium')
    return (
      <span className="inline-flex items-center gap-0.5 text-[10px] font-inter font-semibold px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400">
        <Crown className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
        Premium
      </span>
    )
  return (
    <span className="inline-flex items-center text-[10px] font-inter font-medium px-1.5 py-0.5 rounded-full bg-muted text-warmgray-500 dark:text-warmgray-400">
      Membro
    </span>
  )
}

function AvatarCircle({ initials, className }: { initials: string; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-full bg-petroleum-gradient flex items-center justify-center shrink-0',
        className,
      )}
      aria-hidden="true"
    >
      <span className="font-cinzel font-semibold text-gold-400">{initials}</span>
    </div>
  )
}

function AccountTriggerContent({ session }: { session: SessionDisplay }) {
  return (
    <>
      <AvatarCircle initials={session.initials} className="h-8 w-8 text-[11px]" />
      <div className="flex flex-col items-start leading-none gap-0.5 min-w-0">
        <span className="text-xs font-inter font-medium text-foreground max-w-[120px] truncate">
          {session.firstName}
        </span>
        <RoleBadge role={session.role} />
      </div>
    </>
  )
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const { loading, sessionDisplay } = useProfile()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  async function handleSignOut() {
    if (!supabaseConfigured) return
    const supabase = createClient()
    await supabase.auth.signOut()
    setMobileOpen(false)
    router.refresh()
    router.push('/')
  }

  const authLoadingSlot = <div className="h-9 w-9 rounded-full bg-muted animate-pulse shrink-0" aria-hidden="true" />

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm relative">
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
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

          <div className="flex items-center gap-1.5 sm:gap-2">
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-warmgray-500 hover:text-foreground"
                aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            )}

            {/* Desktop: logado = dropdown Radix; deslogado = Entrar */}
            {loading ? (
              <div className="hidden md:block">{authLoadingSlot}</div>
            ) : sessionDisplay ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      'hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg',
                      'border border-transparent hover:border-border/60 hover:bg-muted/80 transition-colors',
                      'outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40',
                    )}
                    aria-label="Menu da conta"
                  >
                    <AccountTriggerContent session={sessionDisplay} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className={cn(
                      'z-[100] min-w-[11rem] overflow-hidden rounded-xl border border-border/60 bg-background p-1 shadow-lg',
                      'animate-fade-in data-[state=open]:animate-in data-[state=closed]:animate-out',
                    )}
                  >
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-0 focus:bg-muted">
                      <Link
                        href="/profile"
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm font-inter text-foreground"
                      >
                        <User className="h-3.5 w-3.5 text-warmgray-400 shrink-0" aria-hidden="true" />
                        Meu Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-0.5 h-px bg-border/60" />
                    <DropdownMenuItem
                      className="cursor-pointer rounded-lg px-3 py-2 text-sm font-inter text-warmgray-600 focus:text-foreground dark:text-warmgray-400"
                      onSelect={(e) => {
                        e.preventDefault()
                        void handleSignOut()
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <LogOut className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        Sair
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            ) : (
              <Link
                href="/auth"
                className="hidden md:inline-flex items-center gap-2 text-sm font-inter font-medium text-warmgray-600 dark:text-warmgray-400 hover:text-petroleum-800 dark:hover:text-parchment-100 border border-border/50 hover:border-gold-500/30 transition-colors px-3 py-2 rounded-lg"
              >
                <User className="h-4 w-4 shrink-0" aria-hidden="true" />
                Entrar
              </Link>
            )}

            {/* Mobile: barra superior — avatar (abre menu) ou Entrar */}
            {loading ? (
              <div className="md:hidden flex items-center">{authLoadingSlot}</div>
            ) : sessionDisplay ? (
              <button
                type="button"
                className="md:hidden flex h-9 w-9 items-center justify-center shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 rounded-full"
                aria-label="Abrir menu — sua conta"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <AvatarCircle initials={sessionDisplay.initials} className="h-9 w-9 text-[11px]" />
              </button>
            ) : (
              <Link
                href="/auth"
                className="md:hidden inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/50 px-2.5 text-xs sm:text-sm font-inter font-medium text-warmgray-600 dark:text-warmgray-400 hover:border-gold-500/30 hover:text-petroleum-800 dark:hover:text-parchment-100 transition-colors shrink-0"
              >
                <User className="h-4 w-4 shrink-0" aria-hidden="true" />
                Entrar
              </Link>
            )}

            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Menu de navegação"
            >
              {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

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
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {label}
                </Link>
              )
            })}
            <div className="pt-2.5 border-t border-border/40 mt-2 px-1 space-y-1">
              {sessionDisplay ? (
                <>
                  <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-muted/40">
                    <AvatarCircle initials={sessionDisplay.initials} className="h-10 w-10 text-xs" />
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-sm font-inter font-medium text-foreground truncate">
                        {sessionDisplay.firstName}
                      </span>
                      <RoleBadge role={sessionDisplay.role} />
                      <span className="text-[10px] font-inter text-warmgray-500 truncate">{sessionDisplay.email}</span>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-inter text-foreground hover:bg-muted w-full"
                  >
                    <User className="w-4 h-4 text-warmgray-400 shrink-0" aria-hidden="true" />
                    Meu Perfil
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleSignOut()}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-inter text-warmgray-600 hover:text-foreground hover:bg-muted w-full text-left"
                  >
                    <LogOut className="w-4 h-4 shrink-0" aria-hidden="true" />
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-center text-sm flex items-center gap-2 py-2.5"
                >
                  <User className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Entrar na plataforma
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
