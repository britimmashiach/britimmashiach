'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Megaphone, FileText, Trash2, Pin } from 'lucide-react'
import {
  createLeaderAnnouncementAction,
  deleteLeaderAnnouncementAction,
  createLeaderResourceAction,
  deleteLeaderResourceAction,
} from '@/app/admin/actions'

export interface AdminAnnouncementRow {
  id: string
  title: string
  pinned: boolean
  created_at: string
}

export interface AdminResourceRow {
  id: string
  title: string
  category: string
  file_url: string
}

interface Props {
  serviceRoleConfigured: boolean
  announcements: AdminAnnouncementRow[]
  resources: AdminResourceRow[]
}

const inputClass =
  'w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30'

export function LeaderPortalAdminPanel({ serviceRoleConfigured, announcements, resources }: Props) {
  const router = useRouter()

  const [annTitle, setAnnTitle] = useState('')
  const [annBody, setAnnBody] = useState('')
  const [annPinned, setAnnPinned] = useState(false)
  const [annLoading, setAnnLoading] = useState(false)

  const [resTitle, setResTitle] = useState('')
  const [resDesc, setResDesc] = useState('')
  const [resCategory, setResCategory] = useState('')
  const [resUrl, setResUrl] = useState('')
  const [resLoading, setResLoading] = useState(false)

  const [deleting, setDeleting] = useState<string | null>(null)
  const disabled = !serviceRoleConfigured

  async function publishAnnouncement() {
    if (!annTitle.trim()) {
      toast.error('Aviso', { description: 'Preencha o título.' })
      return
    }
    setAnnLoading(true)
    try {
      const r = await createLeaderAnnouncementAction({ title: annTitle, body: annBody, pinned: annPinned })
      if (!r.ok) {
        toast.error('Não foi possível publicar', { description: r.message })
        return
      }
      toast.success('Aviso publicado', { description: r.message })
      setAnnTitle('')
      setAnnBody('')
      setAnnPinned(false)
      router.refresh()
    } finally {
      setAnnLoading(false)
    }
  }

  async function removeAnnouncement(id: string) {
    setDeleting(id)
    try {
      const r = await deleteLeaderAnnouncementAction(id)
      if (!r.ok) {
        toast.error('Remover aviso', { description: r.message })
        return
      }
      toast.success('Aviso removido')
      router.refresh()
    } finally {
      setDeleting(null)
    }
  }

  async function publishResource() {
    if (!resTitle.trim() || !resUrl.trim()) {
      toast.error('Material', { description: 'Preencha título e URL do arquivo.' })
      return
    }
    setResLoading(true)
    try {
      const r = await createLeaderResourceAction({
        title: resTitle,
        description: resDesc,
        category: resCategory,
        fileUrl: resUrl,
        sortOrder: 0,
      })
      if (!r.ok) {
        toast.error('Não foi possível publicar', { description: r.message })
        return
      }
      toast.success('Material publicado', { description: r.message })
      setResTitle('')
      setResDesc('')
      setResCategory('')
      setResUrl('')
      router.refresh()
    } finally {
      setResLoading(false)
    }
  }

  async function removeResource(id: string) {
    setDeleting(id)
    try {
      const r = await deleteLeaderResourceAction(id)
      if (!r.ok) {
        toast.error('Remover material', { description: r.message })
        return
      }
      toast.success('Material removido')
      router.refresh()
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Avisos do Rav */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-gold-500 shrink-0" aria-hidden="true" />
          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Avisos do Rav
          </h3>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título do aviso"
            value={annTitle}
            onChange={(e) => setAnnTitle(e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Texto do aviso (aceita **negrito** e *itálico*)"
            value={annBody}
            onChange={(e) => setAnnBody(e.target.value)}
            rows={4}
            className={inputClass + ' resize-y'}
          />
          <label className="flex items-center gap-2 text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
            <input
              type="checkbox"
              checked={annPinned}
              onChange={(e) => setAnnPinned(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-gold-600"
            />
            <Pin className="h-3.5 w-3.5" aria-hidden="true" />
            Fixar no topo
          </label>
          <button
            type="button"
            disabled={disabled || annLoading}
            onClick={() => void publishAnnouncement()}
            className="w-full rounded-lg bg-petroleum-800 dark:bg-gold-500 px-4 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {annLoading ? 'Publicando…' : 'Publicar aviso'}
          </button>
        </div>

        {announcements.length > 0 && (
          <ul className="space-y-2 pt-2 border-t border-border/50">
            {announcements.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 text-sm font-inter">
                <span className="flex items-center gap-1.5 truncate">
                  {a.pinned && <Pin className="h-3 w-3 text-gold-500 shrink-0" aria-hidden="true" />}
                  <span className="truncate text-warmgray-700 dark:text-warmgray-300">{a.title}</span>
                </span>
                <button
                  type="button"
                  disabled={deleting === a.id}
                  onClick={() => void removeAnnouncement(a.id)}
                  className="shrink-0 text-warmgray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  aria-label={`Remover aviso ${a.title}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recursos / PDFs */}
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gold-500 shrink-0" aria-hidden="true" />
          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            PDFs e materiais
          </h3>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título do material"
            value={resTitle}
            onChange={(e) => setResTitle(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Categoria (ex.: Roteiros, Aliyot)"
            value={resCategory}
            onChange={(e) => setResCategory(e.target.value)}
            className={inputClass}
          />
          <textarea
            placeholder="Descrição breve (opcional)"
            value={resDesc}
            onChange={(e) => setResDesc(e.target.value)}
            rows={2}
            className={inputClass + ' resize-y'}
          />
          <input
            type="url"
            placeholder="https://… (URL do PDF)"
            value={resUrl}
            onChange={(e) => setResUrl(e.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            disabled={disabled || resLoading}
            onClick={() => void publishResource()}
            className="w-full rounded-lg bg-petroleum-800 dark:bg-gold-500 px-4 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {resLoading ? 'Publicando…' : 'Publicar material'}
          </button>
        </div>

        {resources.length > 0 && (
          <ul className="space-y-2 pt-2 border-t border-border/50">
            {resources.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 text-sm font-inter">
                <span className="truncate text-warmgray-700 dark:text-warmgray-300">
                  <span className="text-warmgray-400">{r.category} · </span>
                  {r.title}
                </span>
                <button
                  type="button"
                  disabled={deleting === r.id}
                  onClick={() => void removeResource(r.id)}
                  className="shrink-0 text-warmgray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                  aria-label={`Remover material ${r.title}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
