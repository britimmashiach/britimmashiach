'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ShieldCheck, Crown, User } from 'lucide-react'
import { promoteUserByEmailAction } from '@/app/admin/actions'
import type { UserRole } from '@/types'
import { cn } from '@/lib/utils'

const roles: { value: UserRole; label: string; icon: typeof User; className: string }[] = [
  {
    value: 'free',
    label: 'Membro',
    icon: User,
    className: 'border-border hover:bg-muted',
  },
  {
    value: 'premium',
    label: 'Premium',
    icon: Crown,
    className: 'border-gold-500/40 hover:bg-gold-500/10 text-gold-700 dark:text-gold-400',
  },
  {
    value: 'admin',
    label: 'Admin',
    icon: ShieldCheck,
    className: 'border-petroleum-600/40 hover:bg-petroleum-900/10 dark:hover:bg-petroleum-800/30',
  },
]

export function PromoteUserPanel({ serviceRoleConfigured }: { serviceRoleConfigured: boolean }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState<UserRole | null>(null)
  const disabled = loading !== null || !serviceRoleConfigured

  async function promote(role: UserRole) {
    if (!email.trim()) {
      toast.error('E-mail', { description: 'Preencha o e-mail do utilizador.' })
      return
    }
    setLoading(role)
    try {
      const r = await promoteUserByEmailAction(email.trim(), role)
      if (!r.ok) {
        toast.error('Não foi possível atualizar', { description: r.message })
        return
      }
      toast.success('Perfil atualizado', { description: r.message })
      router.refresh()
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="glass-card p-6 md:p-8 space-y-6 max-w-lg">
      <div className="space-y-2">
        <label htmlFor="admin-promote-email" className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-wider">
          E-mail do utilizador
        </label>
        <input
          id="admin-promote-email"
          type="email"
          autoComplete="off"
          placeholder="nome@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30"
        />
        <p className="text-xs font-inter text-warmgray-500 leading-relaxed">
          O e-mail deve existir em <strong>profiles</strong> (utilizador já registado). A alteração usa a chave de serviço no
          servidor e não depende de RLS.
        </p>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-wider block">
          Definir papel
        </span>
        <div className="flex flex-col sm:flex-row gap-2">
          {roles.map(({ value, label, icon: Icon, className }) => (
            <button
              key={value}
              type="button"
              disabled={disabled}
              onClick={() => void promote(value)}
              className={cn(
                'flex-1 inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-inter font-medium transition-colors disabled:opacity-50',
                className,
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {loading === value ? '…' : label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
