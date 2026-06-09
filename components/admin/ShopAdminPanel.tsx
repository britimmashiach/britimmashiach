'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash2, ImageIcon, Plus, Check, Upload } from 'lucide-react'
import {
  createShopProductAction,
  updateShopProductAction,
  deleteShopProductAction,
  uploadShopImageAction,
  type AdminShopProductRow,
} from '@/app/admin/actions'

const inputClass =
  'w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-gold-500/30'

function reais(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function parseReais(value: string): number {
  const normalized = value.replace(/\./g, '').replace(',', '.').trim()
  const n = Number(normalized)
  return Number.isFinite(n) ? Math.round(n * 100) : NaN
}

export function ShopAdminPanel({
  serviceRoleConfigured,
  products,
}: {
  serviceRoleConfigured: boolean
  products: AdminShopProductRow[]
}) {
  const router = useRouter()
  const disabled = !serviceRoleConfigured

  // Formulário de novo produto
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [desc, setDesc] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [adding, setAdding] = useState(false)
  const [uploadingNew, setUploadingNew] = useState(false)

  // Edição de imagem por produto (campo local)
  const [imageEdits, setImageEdits] = useState<Record<string, string>>({})
  const [rowBusy, setRowBusy] = useState<string | null>(null)

  async function uploadFile(file: File): Promise<string | null> {
    const fd = new FormData()
    fd.append('file', file)
    const r = await uploadShopImageAction(fd)
    if (!r.ok || !r.url) {
      toast.error('Upload da imagem', { description: r.message })
      return null
    }
    return r.url
  }

  async function onPickNewImage(file: File | undefined) {
    if (!file) return
    setUploadingNew(true)
    try {
      const url = await uploadFile(file)
      if (url) {
        setImageUrl(url)
        toast.success('Imagem enviada', { description: 'URL preenchida automaticamente.' })
      }
    } finally {
      setUploadingNew(false)
    }
  }

  async function onPickRowImage(p: AdminShopProductRow, file: File | undefined) {
    if (!file) return
    setRowBusy(p.id)
    try {
      const url = await uploadFile(file)
      if (!url) return
      const r = await updateShopProductAction(p.id, { imageUrl: url })
      if (!r.ok) {
        toast.error('Imagem', { description: r.message })
        return
      }
      toast.success('Imagem atualizada', { description: p.name })
      router.refresh()
    } finally {
      setRowBusy(null)
    }
  }

  async function addProduct() {
    if (!name.trim()) {
      toast.error('Produto', { description: 'Informe o nome.' })
      return
    }
    const cents = price.trim() ? parseReais(price) : 0
    if (Number.isNaN(cents)) {
      toast.error('Produto', { description: 'Preço inválido. Use algo como 45,00.' })
      return
    }
    setAdding(true)
    try {
      const r = await createShopProductAction({
        name,
        description: desc,
        priceCents: cents,
        category,
        imageUrl,
        sortOrder: products.length + 1,
      })
      if (!r.ok) {
        toast.error('Não foi possível adicionar', { description: r.message })
        return
      }
      toast.success('Produto adicionado', { description: r.message })
      setName('')
      setCategory('')
      setPrice('')
      setDesc('')
      setImageUrl('')
      router.refresh()
    } finally {
      setAdding(false)
    }
  }

  async function saveImage(p: AdminShopProductRow) {
    const next = imageEdits[p.id] ?? p.image_url ?? ''
    setRowBusy(p.id)
    try {
      const r = await updateShopProductAction(p.id, { imageUrl: next })
      if (!r.ok) {
        toast.error('Imagem', { description: r.message })
        return
      }
      toast.success('Imagem atualizada', { description: p.name })
      router.refresh()
    } finally {
      setRowBusy(null)
    }
  }

  async function toggleActive(p: AdminShopProductRow) {
    setRowBusy(p.id)
    try {
      const r = await updateShopProductAction(p.id, { isActive: !p.is_active })
      if (!r.ok) {
        toast.error('Visibilidade', { description: r.message })
        return
      }
      toast.success(!p.is_active ? 'Produto ativado' : 'Produto ocultado', { description: p.name })
      router.refresh()
    } finally {
      setRowBusy(null)
    }
  }

  async function removeProduct(p: AdminShopProductRow) {
    if (!confirm(`Remover "${p.name}" da loja? Esta ação não pode ser desfeita.`)) return
    setRowBusy(p.id)
    try {
      const r = await deleteShopProductAction(p.id)
      if (!r.ok) {
        toast.error('Remover', { description: r.message })
        return
      }
      toast.success('Produto removido', { description: p.name })
      router.refresh()
    } finally {
      setRowBusy(null)
    }
  }

  if (disabled) {
    return (
      <div className="glass-card p-6 text-sm font-inter text-warmgray-500">
        Ative a chave de serviço no servidor para gerir os produtos da loja.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="section-subtitle max-w-2xl">
        Use <strong>Enviar</strong> para subir a foto direto do seu computador (vai para o Supabase
        Storage e a URL é preenchida sozinha), ou cole uma <strong>URL</strong> já hospedada. Formatos:
        JPG, PNG, WebP, AVIF ou GIF, até 4 MB. Produtos inativos não aparecem na{' '}
        <code className="text-xs bg-muted px-1 rounded">/loja</code>.
      </p>

      {/* Novo produto */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-gold-500 shrink-0" aria-hidden="true" />
          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Adicionar produto
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Categoria (ex.: velas)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          />
          <input
            type="text"
            inputMode="decimal"
            placeholder="Preço em R$ (ex.: 45,00)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={inputClass}
          />
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="URL da imagem (ou envie ao lado)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass}
            />
            <label className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-sm font-inter cursor-pointer hover:bg-muted transition-colors">
              <Upload className="w-4 h-4" aria-hidden="true" />
              {uploadingNew ? 'Enviando…' : 'Enviar'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploadingNew}
                onChange={(e) => void onPickNewImage(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Prévia"
            className="h-24 w-24 rounded-lg object-cover border border-border/40"
          />
        )}
        <textarea
          placeholder="Descrição do produto"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={2}
          className={inputClass + ' resize-y'}
        />
        <button
          type="button"
          disabled={adding}
          onClick={() => void addProduct()}
          className="rounded-lg bg-petroleum-800 dark:bg-gold-500 px-4 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {adding ? 'Adicionando…' : 'Adicionar produto'}
        </button>
      </div>

      {/* Lista de produtos */}
      {products.length === 0 ? (
        <div className="glass-card p-6 text-sm font-inter text-warmgray-500">
          Nenhum produto cadastrado no banco ainda. Use o formulário acima para adicionar o primeiro.
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => {
            const busy = rowBusy === p.id
            const editValue = imageEdits[p.id] ?? p.image_url ?? ''
            return (
              <li key={p.id} className="glass-card p-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-28 h-28 shrink-0 rounded-lg overflow-hidden border border-border/40 bg-muted/40 flex items-center justify-center">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-warmgray-400" aria-hidden="true" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                      {p.name}
                    </span>
                    <span className="text-[10px] font-inter uppercase tracking-wider text-gold-700 dark:text-gold-400">
                      {p.category}
                    </span>
                    <span className="text-xs font-inter text-warmgray-500">R$ {reais(p.price_cents)}</span>
                    {!p.is_active && (
                      <span className="text-[10px] font-inter font-semibold px-1.5 py-0.5 rounded-full bg-muted text-warmgray-500">
                        Oculto
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      placeholder="URL da imagem (https://… ou /caminho)"
                      value={editValue}
                      onChange={(e) =>
                        setImageEdits((prev) => ({ ...prev, [p.id]: e.target.value }))
                      }
                      className={inputClass}
                    />
                    <div className="flex gap-2 shrink-0">
                      <label className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-sm font-inter cursor-pointer hover:bg-muted transition-colors">
                        <Upload className="w-4 h-4" aria-hidden="true" />
                        Enviar
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={busy}
                          onChange={(e) => void onPickRowImage(p, e.target.files?.[0])}
                        />
                      </label>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void saveImage(p)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-petroleum-800 dark:bg-gold-500 px-4 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" aria-hidden="true" />
                        Salvar URL
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 text-xs font-inter text-warmgray-600 dark:text-warmgray-400">
                      <input
                        type="checkbox"
                        checked={p.is_active}
                        disabled={busy}
                        onChange={() => void toggleActive(p)}
                        className="h-4 w-4 rounded border-border accent-gold-600"
                      />
                      Ativo na loja
                    </label>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void removeProduct(p)}
                      className="inline-flex items-center gap-1 text-xs font-inter text-warmgray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
