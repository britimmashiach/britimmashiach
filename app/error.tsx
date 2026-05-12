'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Brit Mashiach] Erro global:', error)
  }, [error])

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="font-cinzel text-2xl font-semibold text-petroleum-800 dark:text-parchment-100">
            Algo deu errado
          </h1>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            Ocorreu um erro inesperado. Por favor, tente novamente.
          </p>
        </div>

        <button
          onClick={reset}
          className="btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
