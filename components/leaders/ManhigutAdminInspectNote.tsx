import { Eye } from 'lucide-react'

/** Admin: restricao de mes civil desativada para inspecao do portal. */
export function ManhigutAdminInspectNote() {
  return (
    <div className="rounded-lg border border-petroleum-800/20 bg-petroleum-800/5 dark:border-gold-500/25 dark:bg-gold-500/5 px-4 py-3 flex gap-3 items-start">
      <Eye className="w-5 h-5 text-petroleum-700 dark:text-gold-400 shrink-0 mt-0.5" aria-hidden />
      <p className="text-xs font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
        <strong className="font-semibold text-foreground">Modo inspeção (admin):</strong> o bloqueio por
        mês civil está desativado para você. Todos os módulos publicados permanecem abertos para revisão.
      </p>
    </div>
  )
}
