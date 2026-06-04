'use client'

import { useEffect, useState } from 'react'
import { ClipboardCheck, RotateCcw } from 'lucide-react'

interface ChecklistItem {
  id: string
  label: string
}

interface ChecklistGroup {
  group: string
  items: ChecklistItem[]
}

/** Roteiro pastoral de preparo. Marcação salva localmente no navegador do líder. */
const CHECKLIST: ChecklistGroup[] = [
  {
    group: 'Antes do Shabat',
    items: [
      { id: 'shabat-parasha', label: 'Estudar a Parashá da semana e separar a Aliyáh' },
      { id: 'shabat-zmanim', label: 'Conferir zmanim (acendimento e Havdalá)' },
      { id: 'shabat-mensagem', label: 'Preparar a mensagem ou Dvar Torá' },
      { id: 'shabat-acolhimento', label: 'Confirmar acolhimento de visitantes e novos' },
    ],
  },
  {
    group: 'Estudo e células',
    items: [
      { id: 'estudo-roteiro', label: 'Revisar o roteiro de estudo e fontes citadas' },
      { id: 'estudo-pardes', label: 'Conferir os níveis PaRDeS abordados' },
      { id: 'estudo-perguntas', label: 'Preparar perguntas para participação' },
    ],
  },
  {
    group: 'Cuidado pastoral',
    items: [
      { id: 'pastoral-orar', label: 'Orar pelos pedidos de oração da comunidade' },
      { id: 'pastoral-ausentes', label: 'Contatar irmãos ausentes ou enfermos' },
      { id: 'pastoral-novos', label: 'Acompanhar quem chegou de tradição evangélica, sem confronto' },
    ],
  },
]

const STORAGE_KEY = 'bim-ministry-checklist-v1'
const ALL_IDS = CHECKLIST.flatMap((g) => g.items.map((i) => i.id))

export function MinistryChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>)
    } catch {
      // ignora storage indisponível
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch {
      // ignora storage indisponível
    }
  }, [checked, hydrated])

  const doneCount = ALL_IDS.filter((id) => checked[id]).length

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function reset() {
    setChecked({})
  }

  return (
    <div className="glass-card p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <ClipboardCheck className="w-7 h-7 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden />
          <div>
            <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
              Checklist de ministério
            </h2>
            <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400">
              {doneCount} de {ALL_IDS.length} concluídos. Marcação guardada só neste dispositivo.
            </p>
          </div>
        </div>
        {doneCount > 0 && (
          <button
            type="button"
            onClick={reset}
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-inter text-warmgray-500 hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden />
            Limpar
          </button>
        )}
      </div>

      <div className="space-y-5">
        {CHECKLIST.map(({ group, items }) => (
          <div key={group} className="space-y-2">
            <p className="text-xs font-inter font-semibold uppercase tracking-widest text-petroleum-700 dark:text-gold-400/80">
              {group}
            </p>
            <ul className="space-y-1.5">
              {items.map((item) => {
                const isChecked = Boolean(checked[item.id])
                return (
                  <li key={item.id}>
                    <label className="flex items-start gap-3 cursor-pointer group py-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item.id)}
                        className="mt-0.5 h-4 w-4 rounded border-border text-gold-600 focus:ring-2 focus:ring-gold-500/30 accent-gold-600"
                      />
                      <span
                        className={`text-sm font-inter leading-relaxed transition-colors ${
                          isChecked
                            ? 'text-warmgray-400 line-through'
                            : 'text-warmgray-700 dark:text-warmgray-300 group-hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
