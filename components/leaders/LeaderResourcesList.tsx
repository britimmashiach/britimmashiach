import { FileText, Download } from 'lucide-react'
import type { LeaderResource } from '@/lib/leader-portal-supabase'

interface Props {
  resources: LeaderResource[]
}

/** Biblioteca de PDFs e materiais exclusivos para líderes. */
export function LeaderResourcesList({ resources }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-gold-600 dark:text-gold-400" aria-hidden />
        <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
          PDFs e materiais exclusivos
        </h2>
      </div>

      {resources.length === 0 ? (
        <div className="glass-card p-6">
          <p className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400">
            Nenhum material publicado por enquanto. Roteiros, modelos de Aliyáh e apostilas do Rav EBBY
            aparecerão aqui assim que forem disponibilizados.
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {resources.map((r) => (
            <li key={r.id} className="glass-card p-5 flex flex-col gap-2">
              <span className="text-[10px] font-inter font-semibold uppercase tracking-wider text-petroleum-700 dark:text-gold-400/80">
                {r.category}
              </span>
              <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                {r.title}
              </h3>
              {r.description.trim() && (
                <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed flex-1">
                  {r.description}
                </p>
              )}
              <a
                href={r.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-sm font-inter font-semibold text-petroleum-700 dark:text-gold-400 hover:underline"
              >
                <Download className="w-4 h-4" aria-hidden />
                Abrir material
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
