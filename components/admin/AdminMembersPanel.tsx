'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Crown,
  Loader2,
  ShieldCheck,
  User,
  Ban,
  Trash2,
  Unlock,
  ChevronDown,
} from 'lucide-react'
import type { AdminMemberRow } from '@/app/admin/actions'
import {
  listMembersAction,
  promoteUserByIdAction,
  banUserAction,
  unbanUserAction,
  deleteUserAction,
} from '@/app/admin/actions'
import type { UserRole } from '@/types'
import { cn } from '@/lib/utils'

function roleLabel(role: UserRole) {
  if (role === 'admin') return 'Admin'
  if (role === 'premium') return 'Premium'
  return 'Membro'
}

function roleClass(role: UserRole) {
  if (role === 'admin') return 'bg-petroleum-800 text-gold-400'
  if (role === 'premium') return 'bg-gold-500/20 text-gold-700 dark:text-gold-400'
  return 'bg-muted text-warmgray-600 dark:text-warmgray-400'
}

function isBanned(m: AdminMemberRow) {
  if (!m.banned_until) return false
  return new Date(m.banned_until) > new Date()
}

type Snapshot = {
  members: AdminMemberRow[]
  nextPage: number | null
  total: number
  perPage: number
}

export function AdminMembersPanel({
  serviceRoleConfigured,
  currentUserId,
  initialSnapshot,
}: {
  serviceRoleConfigured: boolean
  currentUserId: string
  initialSnapshot: Snapshot | null
}) {
  const router = useRouter()
  const [members, setMembers] = useState<AdminMemberRow[]>(initialSnapshot?.members ?? [])
  const [nextPage, setNextPage] = useState<number | null>(initialSnapshot?.nextPage ?? null)
  const [total, setTotal] = useState(initialSnapshot?.total ?? 0)
  const perPage = initialSnapshot?.perPage ?? 25
  const [loadingMore, setLoadingMore] = useState(false)
  const [rowBusy, setRowBusy] = useState<string | null>(null)
  const [openPromote, setOpenPromote] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminMemberRow | null>(null)

  useEffect(() => {
    setMembers(initialSnapshot?.members ?? [])
    setNextPage(initialSnapshot?.nextPage ?? null)
    setTotal(initialSnapshot?.total ?? 0)
  }, [initialSnapshot])

  function refreshFromServer() {
    router.refresh()
  }

  async function loadMore() {
    if (!serviceRoleConfigured || nextPage == null || loadingMore) return
    setLoadingMore(true)
    try {
      const r = await listMembersAction(nextPage, perPage)
      if (!r.ok) {
        toast.error('Lista', { description: r.message })
        return
      }
      setMembers((prev) => {
        const seen = new Set(prev.map((m) => m.id))
        const add = r.members.filter((m) => !seen.has(m.id))
        return [...prev, ...add]
      })
      setNextPage(r.nextPage)
      setTotal(r.total)
    } finally {
      setLoadingMore(false)
    }
  }

  async function promote(id: string, role: UserRole) {
    setRowBusy(id)
    setOpenPromote(null)
    try {
      const r = await promoteUserByIdAction(id, role)
      if (!r.ok) {
        toast.error('Papel', { description: r.message })
        return
      }
      toast.success('Atualizado', { description: r.message })
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
      refreshFromServer()
    } finally {
      setRowBusy(null)
    }
  }

  async function ban(id: string) {
    if (!confirm('Banir este utilizador? Não poderá iniciar sessão até ser desbanido.')) return
    setRowBusy(id)
    try {
      const r = await banUserAction(id)
      if (!r.ok) {
        toast.error('Banir', { description: r.message })
        return
      }
      toast.success(r.message)
      const far = new Date()
      far.setFullYear(far.getFullYear() + 50)
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, banned_until: far.toISOString() } : m)),
      )
      refreshFromServer()
    } finally {
      setRowBusy(null)
    }
  }

  async function unban(id: string) {
    setRowBusy(id)
    try {
      const r = await unbanUserAction(id)
      if (!r.ok) {
        toast.error('Desbanir', { description: r.message })
        return
      }
      toast.success(r.message)
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, banned_until: null } : m)))
      refreshFromServer()
    } finally {
      setRowBusy(null)
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setRowBusy(id)
    try {
      const r = await deleteUserAction(id)
      if (!r.ok) {
        toast.error('Excluir', { description: r.message })
        return
      }
      toast.success(r.message)
      setMembers((prev) => prev.filter((m) => m.id !== id))
      setDeleteTarget(null)
      refreshFromServer()
    } finally {
      setRowBusy(null)
    }
  }

  if (!serviceRoleConfigured) {
    return (
      <div className="glass-card p-6 text-sm font-inter text-warmgray-500">
        Ative a chave de serviço no servidor para listar e gerir membros.
      </div>
    )
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-border/50 px-4 py-3 md:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            Membros
          </h2>
          <p className="text-xs font-inter text-warmgray-500 mt-0.5">
            {total} conta(s) no Auth · promoção altera <code className="text-[10px] bg-muted px-1 rounded">profiles.role</code>
            ; banir bloqueia login; excluir remove a conta (e o perfil se houver CASCADE).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-inter">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-warmgray-500">
            <tr>
              <th className="px-3 md:px-4 py-3 font-semibold">Utilizador</th>
              <th className="px-3 md:px-4 py-3 font-semibold hidden sm:table-cell">Entrada</th>
              <th className="px-3 md:px-4 py-3 font-semibold">Estado</th>
              <th className="px-3 md:px-4 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {members.map((m) => {
              const busy = rowBusy === m.id
              const self = m.id === currentUserId
              const banned = isBanned(m)
              return (
                <tr key={m.id} className="hover:bg-muted/20">
                  <td className="px-3 md:px-4 py-3 align-top">
                    <div className="font-medium text-foreground truncate max-w-[200px] md:max-w-xs">
                      {m.full_name || '—'}
                    </div>
                    <div className="text-xs text-warmgray-500 truncate max-w-[200px] md:max-w-xs">{m.email}</div>
                    <div className="text-[10px] text-warmgray-400 font-mono mt-0.5">{m.id.slice(0, 8)}…</div>
                  </td>
                  <td className="px-3 md:px-4 py-3 align-top text-xs text-warmgray-500 hidden sm:table-cell whitespace-nowrap">
                    {m.last_sign_in_at
                      ? new Date(m.last_sign_in_at).toLocaleString('pt-BR', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })
                      : '—'}
                  </td>
                  <td className="px-3 md:px-4 py-3 align-top">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold',
                        roleClass(m.role),
                      )}
                    >
                      {roleLabel(m.role)}
                    </span>
                    {banned && (
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400 px-2 py-0.5 text-[10px] font-semibold">
                        Banido
                      </span>
                    )}
                  </td>
                  <td className="px-3 md:px-4 py-3 align-top text-right">
                    <div className="flex flex-wrap items-center justify-end gap-1">
                      {!self && (
                        <>
                          <div className="relative inline-block">
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setOpenPromote((v) => (v === m.id ? null : m.id))}
                              className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:bg-muted disabled:opacity-50"
                            >
                              Papel
                              <ChevronDown className="h-3 w-3" aria-hidden="true" />
                            </button>
                            {openPromote === m.id && (
                              <>
                                <button
                                  type="button"
                                  className="fixed inset-0 z-10 cursor-default"
                                  aria-label="Fechar"
                                  onClick={() => setOpenPromote(null)}
                                />
                                <div className="absolute right-0 top-full z-20 mt-1 min-w-[9rem] rounded-lg border border-border bg-background py-1 shadow-lg">
                                  {(
                                    [
                                      { r: 'free' as const, Icon: User, lab: 'Membro' },
                                      { r: 'premium' as const, Icon: Crown, lab: 'Premium' },
                                      { r: 'admin' as const, Icon: ShieldCheck, lab: 'Admin' },
                                    ] as const
                                  ).map(({ r, Icon, lab }) => (
                                    <button
                                      key={r}
                                      type="button"
                                      disabled={busy || m.role === r}
                                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-muted disabled:opacity-40"
                                      onClick={() => void promote(m.id, r)}
                                    >
                                      <Icon className="h-3.5 w-3.5" />
                                      {lab}
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                          {banned ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void unban(m.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs hover:bg-muted disabled:opacity-50"
                              title="Desbanir"
                            >
                              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Unlock className="h-3.5 w-3.5" />}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void ban(m.id)}
                              className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 text-red-600 dark:text-red-400 px-2 py-1 text-xs hover:bg-red-500/10 disabled:opacity-50"
                              title="Banir"
                            >
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => setDeleteTarget(m)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 text-red-700 dark:text-red-400 px-2 py-1 text-xs hover:bg-red-500/10 disabled:opacity-50"
                            title="Excluir conta"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                      {self && (
                        <span className="text-[10px] text-warmgray-400 px-1">Você</span>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {nextPage != null && (
        <div className="border-t border-border/50 p-3 flex justify-center">
          <button
            type="button"
            disabled={loadingMore}
            onClick={() => void loadMore()}
            className="text-xs font-inter font-medium text-gold-600 hover:underline disabled:opacity-50"
          >
            {loadingMore ? 'A carregar…' : 'Carregar mais'}
          </button>
        </div>
      )}

      <Dialog.Root open={deleteTarget !== null} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/50 data-[state=open]:animate-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[201] w-[min(90vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-xl">
            <Dialog.Title className="font-cinzel text-lg font-semibold text-foreground">
              Excluir conta
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm font-inter text-warmgray-500">
              Isto remove o utilizador do <strong>Auth</strong>. Se existir <strong>profiles</strong> ligado com ON DELETE CASCADE, a
              linha do perfil também desaparece. Não dá para anular aqui.
            </Dialog.Description>
            {deleteTarget && (
              <p className="mt-3 text-sm font-inter text-foreground truncate">{deleteTarget.email}</p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-lg border border-border px-3 py-2 text-sm font-inter hover:bg-muted"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                type="button"
                disabled={rowBusy === deleteTarget?.id}
                onClick={() => void confirmDelete()}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-inter font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {rowBusy === deleteTarget?.id ? 'A excluir…' : 'Excluir definitivamente'}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
