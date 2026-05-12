'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Loader2, User } from 'lucide-react'
import { toast } from 'sonner'
import { signInWithPasswordAction, signUpAction } from '@/app/auth/actions'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'register'

function AuthFormInner() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<Mode>('login')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', name: '' })

  useEffect(() => {
    const err = searchParams.get('error')
    if (!err) return
    toast.error('Acesso', { description: err })
    const path = window.location.pathname + window.location.hash
    window.history.replaceState(null, '', path)
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'login') {
        const err = await signInWithPasswordAction(form.email, form.password)
        if (err) {
          toast.error('Erro', { description: err.error })
          return
        }
      } else {
        const r = await signUpAction(form.email, form.password, form.name)
        if (!r.ok) {
          toast.error('Erro', { description: r.message })
          return
        }
        toast.success('Conta criada', { description: r.message })
      }
    } catch {
      // `redirect('/')` na Server Action pode lançar no cliente — navegação segue normalmente.
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <div className="flex rounded-lg overflow-hidden border border-border" role="group" aria-label="Modo de acesso">
        {(['login', 'register'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={cn(
              'flex-1 py-2.5 text-sm font-inter font-medium transition-all duration-200',
              mode === m
                ? 'bg-petroleum-800 text-parchment-100 dark:bg-gold-500 dark:text-petroleum-950'
                : 'text-warmgray-600 hover:text-foreground',
            )}
          >
            {m === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div className="space-y-1.5">
            <label htmlFor="auth-name" className="text-xs font-inter font-semibold text-warmgray-600 dark:text-warmgray-400 uppercase tracking-wider">
              Nome completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray-400" aria-hidden="true" />
              <input
                id="auth-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/50"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="auth-email" className="text-xs font-inter font-semibold text-warmgray-600 dark:text-warmgray-400 uppercase tracking-wider">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray-400" aria-hidden="true" />
            <input
              id="auth-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="auth-password" className="text-xs font-inter font-semibold text-warmgray-600 dark:text-warmgray-400 uppercase tracking-wider">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray-400" aria-hidden="true" />
            <input
              id="auth-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={8}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              aria-controls="auth-password"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warmgray-400 hover:text-warmgray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
        </button>
      </form>
    </div>
  )
}

export function AuthForm() {
  return (
    <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-muted/40" aria-hidden="true" />}>
      <AuthFormInner />
    </Suspense>
  )
}
