'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
}

export function Drawer({ open, onClose, title, subtitle, children }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-drawer-overlay-in"
        />
        <Dialog.Content
          className={cn(
            'fixed right-0 top-0 h-screen w-full max-w-xl',
            'bg-background border-l border-border shadow-petroleum-md',
            'z-50 flex flex-col animate-drawer-in',
          )}
          aria-describedby={undefined}
        >
          {/* Header fixo */}
          <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border/60 flex-shrink-0 bg-background/95 backdrop-blur-sm">
            <div className="space-y-0.5 min-w-0">
              <Dialog.Title className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight">
                {title}
              </Dialog.Title>
              {subtitle && (
                <p className="text-xs font-inter text-warmgray-500 truncate">{subtitle}</p>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-warmgray-500 hover:text-foreground hover:bg-muted transition-colors mt-0.5"
                aria-label="Fechar painel"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {/* Conteúdo rolável */}
          <div className="flex-1 overflow-y-auto p-5">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
