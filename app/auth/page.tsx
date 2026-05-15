import type { Metadata } from 'next'
import { AuthForm } from '@/components/ui/AuthForm'
import { Star } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua conta na plataforma Brit Mashiach.',
}

export default function AuthPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">

        {/* Logo */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-petroleum-gradient flex items-center justify-center mx-auto shadow-petroleum-md">
            <Star className="w-6 h-6 text-gold-400 fill-gold-400" />
          </div>
          <div>
            <h1 className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100 tracking-wide">
              BRIT IM MASHIACH
            </h1>
            <p className="font-hebrew text-sm text-warmgray-500 dark:text-warmgray-400 mt-0.5" dir="rtl">
              ברית עם המשיח
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="glass-card p-8">
          <AuthForm />
        </div>

        <p className="text-center text-xs font-inter text-warmgray-500">
          Ao entrar, você concorda com os termos de uso da Congregação Brit Im Mashiach.
        </p>
      </div>
    </div>
  )
}
