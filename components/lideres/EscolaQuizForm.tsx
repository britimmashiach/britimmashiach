'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { submitEscolaQuizAction } from '@/app/lideres/escola/actions'
import type { EscolaQuestionnaire } from '@/lib/escola-questionnaire'

export function EscolaQuizForm({
  courseSlug,
  stageSlug,
  questionnaire,
}: {
  courseSlug: string
  stageSlug: string
  questionnaire: EscolaQuestionnaire
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [pending, startTransition] = useTransition()

  function submit() {
    startTransition(async () => {
      const r = await submitEscolaQuizAction(courseSlug, stageSlug, answers)
      if (!r.ok) {
        toast.error('Questionário', { description: r.message })
        return
      }
      toast.success(r.apt ? 'Apto' : 'Refazer', { description: r.message })
    })
  }

  return (
    <div className="space-y-6">
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
        Nota mínima: {questionnaire.passingScorePct}%. Após aptidão, o Rav assina a colação no admin.
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
