import Link from 'next/link'
import type { EscolaManhigutAccess } from '@/lib/escola-manhigut-access'

export function EscolaManhigutStatus({ escola }: { escola: EscolaManhigutAccess }) {
  if (!escola.ready) {
    return (
      <div className="glass-card p-4 text-sm text-amber-800 dark:text-amber-200">
        O controle por etapas da Escola ainda não está ativo neste ambiente. Avise o Rav.
      </div>
    )
  }

  return (
    <div className="glass-card p-4 space-y-2 text-sm font-inter">
      <p>
        <strong>Etapa Manhigut liberada:</strong>{' '}
        {escola.manhigutCompleted
          ? 'Programa concluído'
          : escola.unlockedStage > 0
            ? `Mês ${String(escola.unlockedStage).padStart(2, '0')}`
            : 'Aguardando Avodat HaNefesh'}
      </p>
      {!escola.avodatCompleted && (
        <p className="text-warmgray-600 dark:text-warmgray-400">
          Pré-requisito:{' '}
          <Link href="/lideres/escola" className="text-gold-700 dark:text-gold-400 underline">
            Avodat HaNefesh em Cursos da Escola
          </Link>
        </p>
      )}
      {escola.pendingColacao && (
        <p className="text-amber-700 dark:text-amber-400">
          Há avaliação apta aguardando colação do Rav. A próxima etapa abre após aprovação.
        </p>
      )}
    </div>
  )
}
