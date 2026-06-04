'use client'

import { useEffect, useState } from 'react'
import { User, Crown, LogOut, Settings, Mail, Shield, CalendarClock, CreditCard, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { createClient, supabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import type { Profile } from '@/types'
import {
  PREMIUM_PIX_GRACE_DAYS,
  getPremiumAccessState,
  profileHasActivePremium,
} from '@/lib/premium-subscription'
import { CheckoutButton } from '@/components/ui/CheckoutButton'
import { WhatsAppOptInCard } from '@/components/ui/WhatsAppOptInCard'

interface ProfileClientProps {
  profile: Profile | null
  successPayment: boolean
  asaasReady?: boolean
}

export function ProfileClient({ profile, successPayment, asaasReady = false }: ProfileClientProps) {
  const [portalLoading, setPortalLoading] = useState(false)

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

  async function handleBillingPortal() {
    setPortalLoading(true)
    try {
      const response = await fetch('/api/stripe/billing-portal', { method: 'POST' })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.error || 'Erro ao abrir portal')
      }
      window.location.href = data.url
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro desconhecido'
      toast.error('Não foi possível abrir o portal', { description: msg })
      setPortalLoading(false)
    }
  }

  if (!profile) {
    return (
      <div className="glass-card p-8 text-center space-y-2">
        <p className="text-sm font-inter text-warmgray-500">Perfil não encontrado.</p>
      </div>
    )
  }

  const accessState = getPremiumAccessState(profile)
  const isPremium = profileHasActivePremium(profile)
  const hasRecurringBilling =
    !!profile.stripe_subscription_id ||
    !!profile.mp_subscription_id ||
    !!profile.asaas_pix_authorization_id
  const isPixManual = !hasRecurringBilling

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
              {!isPremium && profile.role === 'premium' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-inter font-semibold">
                  Renovar
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
                profile.subscription_status === 'active' ? 'bg-green-500' :
                profile.subscription_status === 'past_due' ? 'bg-amber-500' :
                'bg-warmgray-400',
              )} />
              <p className="text-sm font-inter text-foreground">
                {accessState === 'grace'
                  ? `Período de tolerância (${PREMIUM_PIX_GRACE_DAYS} dias)`
                  : profile.subscription_status === 'active'
                    ? 'Ativa'
                    : profile.subscription_status === 'past_due'
                      ? 'Pagamento pendente'
                      : profile.subscription_status === 'canceled'
                        ? 'Cancelada'
                        : accessState === 'expired'
                          ? 'Vencida'
                          : 'Inativa'}
              </p>
            </div>
          </div>
        </div>

        {profile.subscription_current_period_end && (
          <div className="flex items-center gap-2 pt-2 text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
            <CalendarClock className="w-4 h-4 flex-shrink-0 text-gold-600 dark:text-gold-400" />
            <span>
              {accessState === 'grace' ? 'Renove até' : isPremium ? 'Válido até' : 'Venceu em'}{' '}
              <span className="font-medium text-foreground">
                {new Date(profile.subscription_current_period_end).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              {accessState === 'grace' && (
                <span className="text-amber-700 dark:text-amber-400">
                  {' '}
                  (+ {PREMIUM_PIX_GRACE_DAYS} dias de tolerância)
                </span>
              )}
            </span>
          </div>
        )}

        {accessState === 'grace' && (
          <p className="text-xs font-inter text-amber-700 dark:text-amber-400 leading-relaxed">
            Seu PIX mensal venceu. Renove agora para manter o acesso. Após {PREMIUM_PIX_GRACE_DAYS} dias
            do vencimento, o conteúdo Premium será bloqueado até novo pagamento.
          </p>
        )}

        {accessState === 'expired' && profile.role === 'premium' && (
          <p className="text-xs font-inter text-destructive leading-relaxed">
            Assinatura vencida. O acesso Premium está bloqueado até você pagar um novo PIX mensal ou anual.
          </p>
        )}
      </div>

      {/* Convite: WhatsApp para avisos da kehilah */}
      <WhatsAppOptInCard
        profileId={profile.id}
        initialWhatsapp={profile.whatsapp}
        initialNotify={profile.whatsapp_notify}
      />

      {/* Ações */}
      <div className="space-y-3">
        {!isPremium && profile.role !== 'premium' && (
          <a
            href="/premium"
            className="w-full btn-gold py-3 flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Assinar Premium - R$ 47/mês
          </a>
        )}

        {isPixManual && profile.role === 'premium' && (
          <>
            {asaasReady ? (
              <>
                <CheckoutButton mode="asaas-pix-monthly" />
                <CheckoutButton mode="asaas-pix-annual" />
              </>
            ) : (
              <CheckoutButton mode="pix-monthly" />
            )}
          </>
        )}

        {hasRecurringBilling && profile.asaas_pix_authorization_id && (
          <p className="text-xs font-inter text-warmgray-500 text-center leading-relaxed">
            PIX automático ativo via Asaas. O débito mensal ocorre no banco autorizado.
          </p>
        )}

        {isPremium && profile.stripe_subscription_id && (
          <button
            onClick={handleBillingPortal}
            disabled={portalLoading}
            className="w-full glass-card p-4 flex items-center justify-center gap-2 hover:shadow-petroleum-sm transition-shadow disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {portalLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-gold-600 dark:text-gold-400" />
            ) : (
              <CreditCard className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            )}
            <span className="text-sm font-inter font-medium text-foreground">
              {portalLoading ? 'Abrindo portal...' : 'Gerenciar Assinatura'}
            </span>
          </button>
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
