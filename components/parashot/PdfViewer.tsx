'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, AlertCircle, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Worker do PDF.js: hospedado no próprio bundle (Vercel/Next serve de /).
// Mantemos versão fixa do pdfjs-dist no package.json para coincidir com o build.
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString()
}

interface PdfViewerProps {
  url: string
  title: string
  open: boolean
  onClose: () => void
}

const LINES = [78, 62, 70, 0, 65, 55, 72, 0, 68, 60, 75]

export function PdfViewer({ url, title, open, onClose }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.1)
  const [containerWidth, setContainerWidth] = useState(0)
  const [error, setError] = useState<'forbidden' | 'unauth' | 'notfound' | 'generic' | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pageWrapperRef = useRef<HTMLDivElement | null>(null)

  // Reset ao trocar de URL ou fechar
  useEffect(() => {
    if (!open) return
    setPageNumber(1)
    setNumPages(null)
    setError(null)
  }, [url, open])

  // Mede largura do container para encaixar a página
  useEffect(() => {
    if (!open) return
    const el = containerRef.current
    if (!el) return
    const measure = () => setContainerWidth(el.clientWidth - 32) // -padding
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  // Bloqueia atalhos perigosos enquanto o viewer está aberto
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase()
      if ((e.ctrlKey || e.metaKey) && (k === 's' || k === 'p')) {
        e.preventDefault()
        e.stopPropagation()
      }
      if (e.key === 'ArrowLeft') setPageNumber((n) => Math.max(1, n - 1))
      if (e.key === 'ArrowRight') setPageNumber((n) => Math.min(numPages ?? n, n + 1))
    }
    window.addEventListener('keydown', onKey, { capture: true })
    return () => window.removeEventListener('keydown', onKey, { capture: true })
  }, [open, numPages])

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) onClose()
  }

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n)
    setError(null)
  }, [])

  const onLoadError = useCallback(async (err: Error) => {
    // Tenta detectar 401/403/404 fazendo HEAD na URL
    try {
      const res = await fetch(url, { method: 'GET', cache: 'no-store' })
      if (res.status === 401) setError('unauth')
      else if (res.status === 403) setError('forbidden')
      else if (res.status === 404) setError('notfound')
      else setError('generic')
    } catch {
      setError('generic')
    }
    console.warn('[PdfViewer] load error:', err)
  }, [url])

  const file = useMemo(() => (url ? { url, withCredentials: true } : null), [url])

  const errorContent = error && (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center bg-petroleum-950 z-20">
      {error === 'unauth' || error === 'forbidden' ? (
        <Lock className="w-9 h-9 text-warmgray-500" aria-hidden="true" />
      ) : (
        <AlertCircle className="w-9 h-9 text-warmgray-500" aria-hidden="true" />
      )}
      <div className="space-y-2 max-w-sm">
        <p className="font-cinzel text-base font-semibold text-parchment-200">
          {error === 'unauth' && 'Faça login para ler este PDF'}
          {error === 'forbidden' && 'Acesso restrito a este conteúdo'}
          {error === 'notfound' && 'PDF não encontrado'}
          {error === 'generic' && 'Não foi possível abrir o PDF'}
        </p>
        <p className="text-xs font-inter text-warmgray-500">
          {error === 'unauth' && 'O conteúdo é exclusivo para membros autenticados da congregação.'}
          {error === 'forbidden' && 'Seu plano atual não cobre este material. Considere o Premium.'}
          {error === 'notfound' && 'O arquivo pode ter sido movido ou removido.'}
          {error === 'generic' && 'Tente novamente em instantes. Se persistir, fale com a congregação.'}
        </p>
      </div>
    </div>
  )

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 animate-drawer-overlay-in" />
        <Dialog.Content
          className={cn(
            'fixed inset-0 z-50 flex flex-col',
            'bg-petroleum-950 dark:bg-petroleum-950',
            'md:inset-3 md:rounded-2xl md:border md:border-petroleum-800/60',
            'select-none',
            'no-print',
          )}
          style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
          aria-describedby={undefined}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Barra superior — somente título e fechar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-petroleum-800/60 flex-shrink-0 md:rounded-t-2xl">
            <Dialog.Title className="flex-1 min-w-0 font-cinzel text-sm font-semibold text-parchment-200 truncate">
              {title}
            </Dialog.Title>
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
          <div
            ref={containerRef}
            className="flex-1 relative overflow-auto md:rounded-b-2xl p-4 flex flex-col items-center"
            style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
          >
            {errorContent}

            {/* Skeleton enquanto numPages = null e sem erro */}
            {!numPages && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-petroleum-950 gap-8 pointer-events-none">
                <div className="space-y-2.5 w-36 animate-pulse opacity-30" aria-hidden="true">
                  {LINES.map((w, i) =>
                    w === 0 ? (
                      <div key={i} className="h-2.5" />
                    ) : (
                      <div
                        key={i}
                        className="h-px rounded-full bg-parchment-300"
                        style={{ width: `${w}%` }}
                      />
                    ),
                  )}
                </div>
                <div
                  className="w-1.5 h-1.5 rounded-full bg-gold-400/50 animate-pulse"
                  aria-label="Carregando documento"
                />
              </div>
            )}

            <div ref={pageWrapperRef} className="my-auto">
              {file && (
                <Document
                  file={file}
                  onLoadSuccess={onLoadSuccess}
                  onLoadError={onLoadError}
                  loading=""
                  error=""
                  noData=""
                >
                  {numPages ? (
                    <Page
                      pageNumber={pageNumber}
                      width={containerWidth > 0 ? containerWidth * scale : undefined}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      loading=""
                    />
                  ) : null}
                </Document>
              )}
            </div>
          </div>

          {/* Controles de navegação inferiores */}
          {numPages && !error && (
            <div className="flex items-center justify-center gap-3 px-4 py-3 border-t border-petroleum-800/60 flex-shrink-0 md:rounded-b-2xl bg-petroleum-950">
              <button
                onClick={() => setPageNumber((n) => Math.max(1, n - 1))}
                disabled={pageNumber <= 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-warmgray-500 hover:text-parchment-100 hover:bg-petroleum-800/60 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="font-inter text-xs text-warmgray-400 tabular-nums">
                {pageNumber} / {numPages}
              </span>
              <button
                onClick={() => setPageNumber((n) => Math.min(numPages, n + 1))}
                disabled={pageNumber >= numPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-warmgray-500 hover:text-parchment-100 hover:bg-petroleum-800/60 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Próxima página"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <span className="w-px h-5 bg-petroleum-800/60 mx-2" aria-hidden="true" />

              <button
                onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-warmgray-500 hover:text-parchment-100 hover:bg-petroleum-800/60 transition-colors"
                aria-label="Reduzir zoom"
              >
                <ZoomOut className="w-4 h-4" aria-hidden="true" />
              </button>
              <span className="font-inter text-xs text-warmgray-400 tabular-nums w-10 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(2.5, s + 0.1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-warmgray-500 hover:text-parchment-100 hover:bg-petroleum-800/60 transition-colors"
                aria-label="Aumentar zoom"
              >
                <ZoomIn className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
