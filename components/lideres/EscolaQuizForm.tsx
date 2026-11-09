'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { submitEscolaQuizAction } from '@/app/lideres/escola/actions'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'
import type { EscolaStageUserStatus } from '@/lib/escola-stage-attempt-status'

export function EscolaQuizForm({
  courseSlug,
  stageSlug,
  questionnaire,
  userStatus,
}: {
  courseSlug: string
  stageSlug: string
  questionnaire: EscolaQuestionnaire
  userStatus: EscolaStageUserStatus
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [pending, startTransition] = useTransition()

  if (userStatus.kind === 'approved') {
    return (
      <div className="rounded-xl border border-green-600/40 bg-green-500/10 px-6 py-8 text-center space-y-2">
        <p className="font-cinzel text-2xl font-semibold text-green-800 dark:text-green-400 tracking-wide">
          APROVADO
        </p>
        <p className="text-sm text-warmgray-600 dark:text-warmgray-400">
          Colação assinada · nota {userStatus.scorePct}%. Esta etapa está concluída; avance para a próxima quando
          liberada.
        </p>
      </div>
    )
  }

  if (userStatus.kind === 'awaiting_colacao') {
    return (
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-6 py-8 text-center space-y-2">
        <p className="font-cinzel text-xl font-semibold text-amber-900 dark:text-amber-200">Apto · aguardando colação</p>
        <p className="text-sm text-warmgray-600 dark:text-warmgray-400">
          Você atingiu {userStatus.scorePct}% nesta etapa. O Rav assinará a colação no admin; não envie o questionário
          novamente até a decisão.
        </p>
      </div>
    )
  }

  function submit() {
    startTransition(async () => {
      const r = await submitEscolaQuizAction(courseSlug, stageSlug, answers)
      if (!r.ok) {
        toast.error('Questionário', { description: r.message })
        return
      }
      toast.success(r.apt ? 'Apto' : 'Refazer', { description: r.message })
      if (r.apt) window.location.reload()
    })
  }

  return (
    <div className="space-y-6">
      {userStatus.kind === 'rejected' && (
        <p className="text-sm text-amber-800 dark:text-amber-200 bg-amber-500/10 rounded-lg p-3">
          Última tentativa: {userStatus.scorePct}%. Nota mínima {questionnaire.passingScorePct}%. Leia o material e
          refaça.
        </p>
      )}
      {questionnaire.questions.map((q) => (
        <fieldset key={q.id} className="space-y-2 rounded-xl border border-border p-4">
          <legend className="text-sm font-inter font-medium text-foreground px-1">{q.prompt}</legend>
          {q.options.map((opt) => (
            <label key={opt.id} className="flex items-start gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt.id}
                checked={answers[q.id] === opt.id}
                onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.id }))}
                className="mt-1"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <p className="text-xs text-warmgray-500">
        Nota mínima: {questionnaire.passingScorePct}%. Cada etapa tem perguntas próprias; leia o módulo antes de marcar.
        Após aptidão, o Rav assina a colação no admin.
      </p>
      <button
        type="button"
        disabled={pending || questionnaire.questions.some((q) => !answers[q.id])}
        onClick={submit}
        className="btn-gold text-sm disabled:opacity-50"
      >
        {pending ? 'Enviando…' : 'Enviar avaliação'}
      </button>
    </div>
  )
}
