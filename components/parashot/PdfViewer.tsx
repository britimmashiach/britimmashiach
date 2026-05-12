'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Download, ExternalLink, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PdfViewerProps {
  url: string
  title: string
  open: boolean
  onClose: () => void
}

// Linhas de manuscrito: simula texto velado enquanto o documento carrega
const MANUSCRIPT_LINES = [78, 62, 70, 0, 65, 55, 72, 0, 68, 60, 75]

export function PdfViewer({ url, title, open, onClose }: PdfViewerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      onClose()
      setLoading(true)
      setError(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 animate-drawer-overlay-in" />
        <Dialog.Content
          className={cn(
            'fixed inset-0 z-50 flex flex-col',
            'bg-petroleum-950 dark:bg-petroleum-950',
            'md:inset-3 md:rounded-2xl md:border md:border-petroleum-800/60',
          )}
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
          aria-describedby={undefined}
        >
          {/* Barra superior */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-petroleum-800/60 flex-shrink-0 md:rounded-t-2xl">
            <Dialog.Title className="flex-1 min-w-0 font-cinzel text-sm font-semibold text-parchment-200 truncate">
              {title}
            </Dialog.Title>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-inter text-warmgray-500 hover:text-parchment-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-petroleum-800/60"
              aria-label="Abrir em nova aba"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Nova aba</span>
            </a>
            <a
              href={url}
              download
              className="inline-flex items-center gap-1 text-xs font-inter text-warmgray-500 hover:text-parchment-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-petroleum-800/60"
              aria-label="Baixar PDF"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <Dialog.Close asChild>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-warmgray-500 hover:text-parchment-100 hover:bg-petroleum-800/60 transition-colors flex-shrink-0"
                aria-label="Fechar visualizador"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {/* Área do documento */}
          <div className="flex-1 relative overflow-hidden md:rounded-b-2xl">

            {/* Skeleton de manuscrito — linhas de texto velado */}
            {loading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-petroleum-950 gap-8">
                <div className="space-y-2.5 w-36 animate-pulse opacity-30" aria-hidden="true">
                  {MANUSCRIPT_LINES.map((w, i) =>
                    w === 0 ? (
                      <div key={i} className="h-2.5" />
                    ) : (
                      <div
                        key={i}
                        className="h-px rounded-full bg-parchment-300"
                        style={{ width: `${w}%` }}
                      />
                    )
                  )}
                </div>
                <div
                  className="w-1.5 h-1.5 rounded-full bg-gold-400/50 animate-pulse"
                  aria-label="Carregando documento"
                />
              </div>
            )}

            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center bg-petroleum-950">
                <AlertCircle className="w-8 h-8 text-warmgray-600" aria-hidden="true" />
                <div className="space-y-1.5">
                  <p className="font-cinzel text-sm font-semibold text-parchment-300">
                    Não foi possível exibir o PDF
                  </p>
                  <p className="text-xs font-inter text-warmgray-500 max-w-xs">
                    O navegador pode ter bloqueado a visualização embutida.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 btn-gold text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    Abrir em nova aba
                  </a>
                  <a
                    href={url}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-warmgray-400 hover:text-parchment-200 transition-colors px-3 py-1.5 rounded-lg border border-petroleum-700 hover:bg-petroleum-800/60"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                key={url}
                src={url}
                className={cn(
                  'w-full h-full border-0 transition-opacity duration-700',
                  loading ? 'opacity-0' : 'opacity-100',
                )}
                title={title}
                onLoad={() => setLoading(false)}
                onError={() => { setLoading(false); setError(true) }}
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
