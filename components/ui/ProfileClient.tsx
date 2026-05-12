'use client'

import { useEffect } from 'react'
import { User, Crown, LogOut, Settings, Mail, Shield } from 'lucide-react'
import { toast } from 'sonner'
import { createClient, supabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import type { Profile } from '@/types'

interface ProfileClientProps {
  profile: Profile | null
  successPayment: boolean
}

export function ProfileClient({ profile, successPayment }: ProfileClientProps) {
  useEffect(() => {
    if (successPayment) {
      toast.success('Assinatura confirmada', {
        description: 'Bem-vindo ao Premium! Seu acesso completo está ativo.',
      })
    }
  }, [successPayment])

  async function handleLogout() {
    if (!supabaseConfigured) {
      toast.error('Supabase não configurado', {
        description: 'Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no ambiente (ex.: Vercel).',
      })
      return
    }
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (!profile) {
    return (
      <div className="glass-card p-8 text-center space-y-2">
        <p className="text-sm font-inter text-warmgray-500">Perfil não encontrado.</p>
      </div>
    )
  }

  const isPremium = profile.role === 'premium' || profile.role === 'admin'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title">Meu Perfil</h1>
        <p className="section-subtitle mt-1">Gerencie sua conta e assinatura</p>
      </div>

      {/* Card principal */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-petroleum-gradient flex items-center justify-center flex-shrink-0">
            <User className="w-7 h-7 text-parchment-100" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 truncate">
                {profile.full_name ?? 'Usuário'}
              </h2>
              {isPremium && (
                <span className="premium-badge flex-shrink-0">
                  <Crown className="w-3 h-3" />
                  Premium
                </span>
              )}
            </div>
            <p className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400 flex items-center gap-1 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              {profile.email}
            </p>
          </div>
        </div>

        <hr className="border-border/40" />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">Plano</p>
            <p className={cn(
              'text-sm font-inter font-medium capitalize',
              isPremium ? 'text-gold-600 dark:text-gold-400' : 'text-foreground',
            )}>
              {isPremium ? 'Premium' : 'Gratuito'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">Status</p>
            <div className="flex items-center gap-1.5">
              <div className={cn(
                'w-2 h-2 rounded-full',
                profile.subscription_status === 'active' ? 'bg-green-500' : 'bg-warmgray-400',
              )} />
              <p className="text-sm font-inter text-foreground capitalize">
                {profile.subscription_status === 'active' ? 'Ativa' : 'Inativa'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="space-y-3">
        {!isPremium && (
          <a
            href="/premium"
            className="w-full btn-gold py-3 flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Assinar Premium - R$ 47/mês
          </a>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button className="glass-card p-4 flex items-center gap-3 hover:shadow-petroleum-sm transition-shadow text-left">
            <Settings className="w-4 h-4 text-warmgray-500" />
            <span className="text-sm font-inter text-foreground">Configurações</span>
          </button>

          <button
            onClick={handleLogout}
            className="glass-card p-4 flex items-center gap-3 hover:shadow-petroleum-sm transition-shadow text-left hover:border-destructive/30"
          >
            <LogOut className="w-4 h-4 text-warmgray-500" />
            <span className="text-sm font-inter text-foreground">Sair</span>
          </button>
        </div>
      </div>

      {/* Membro desde */}
      <div className="flex items-center gap-2 text-xs font-inter text-warmgray-400 justify-center">
        <Shield className="w-3.5 h-3.5" />
        Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
      </div>
    </div>
  )
}
