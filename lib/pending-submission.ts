/**
 * Guarda em localStorage um rascunho de envio (pedido de oração, testemunho...)
 * feito por um visitante ainda não autenticado, para reenviar automaticamente
 * depois que ele concluir o cadastro/login e voltar à página de origem.
 *
 * Usa localStorage (não sessionStorage) porque o link de confirmação de e-mail
 * pode abrir em uma aba/janela nova, e o rascunho precisa sobreviver a isso.
 */

export function savePendingDraft<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // localStorage indisponível (modo privado, cota excedida etc.) — ignora silenciosamente.
  }
}

export function readPendingDraft<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export function clearPendingDraft(key: string): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignora
  }
}
