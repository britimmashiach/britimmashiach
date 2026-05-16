'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PdfViewer } from '@/components/parashot/PdfViewer'

interface PdfButtonProps {
  url: string
  title: string
  label?: string
  className?: string
}

/**
 * Botão que abre um PDF no visualizador interno (sem download, sem nova aba).
 * Para uso em Server Components que precisam de uma entrada simples ao viewer.
 */
export function PdfButton({ url, title, label = 'Ler PDF', className }: PdfButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex items-center gap-2 text-sm font-inter font-medium',
          'text-petroleum-700 dark:text-petroleum-300',
          'hover:text-gold-600 dark:hover:text-gold-400 transition-colors',
          'px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted',
          className,
        )}
      >
        <FileText className="w-4 h-4" aria-hidden="true" />
        {label}
      </button>
      <PdfViewer url={url} title={title} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
