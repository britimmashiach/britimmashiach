import type { EscolaQuestion, EscolaQuestionnaire } from '@/lib/escola-questionnaire'

/** Embaralha opções de forma estável (mesmo id = mesma ordem após seed). */
function stableShuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0
    const j = h % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function buildEscolaQuestion(
  id: string,
  prompt: string,
  correct: string,
  distractors: [string, string, string],
): EscolaQuestion {
  const labels = stableShuffle([correct, ...distractors], `escola-q-${id}`)
  const letters = ['a', 'b', 'c', 'd'] as const
  const options = labels.map((label, i) => ({ id: letters[i], label }))
  const correctOptionId = options.find((o) => o.label === correct)!.id
  return { id, prompt, options, correctOptionId }
}

export function questionnaire(passingScorePct: number, questions: EscolaQuestion[]): EscolaQuestionnaire {
  return { passingScorePct, questions }
}
