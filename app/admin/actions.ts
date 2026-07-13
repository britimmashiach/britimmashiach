'use server'

import { after } from 'next/server'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'
import { getSupabaseAdmin, hasServiceRoleEnv } from '@/lib/supabase-admin'
import {
  broadcastAnnouncementWhatsApp,
  countWhatsAppOptInMembers,
} from '@/lib/broadcast-announcement-whatsapp'
import { fetchLiveProfileCounts, type LiveProfileCounts } from '@/lib/site-public-stats'
import { getWhatsAppProvider } from '@/lib/whatsapp-notify'
import type { UserRole } from '@/types'
import type { Database } from '@/types/database'

type ShopProductUpdate = Database['public']['Tables']['shop_products']['Update']

type Gate = { ok: true } | { ok: false; message: string }

export type AdminMemberRow = {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  is_leader: boolean
  formacao_concluida: boolean
  is_mestre: boolean
  created_at: string
  banned_until: string | null
  last_sign_in_at: string | null
}

async function requireAdmin(): Promise<Gate> {
  if (!hasSupabaseServerEnv()) {
    return { ok: false, message: 'Supabase não configurado no servidor.' }
  }
  if (!hasServiceRoleEnv()) {
    return {
      ok: false,
      message:
        'SUPABASE_SERVICE_ROLE_KEY ausente na Vercel (Settings → Environment Variables). Necessária para operações de administração.',
    }
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, message: 'Sessão inválida. Entre novamente.' }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') {
    return { ok: false, message: 'Apenas administradores podem aceder a estas funções.' }
  }

  return { ok: true }
}

async function getCallerId(): Promise<string | null> {
  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user?.id ?? null
}

function selfActionBlocked(callerId: string | null, targetId: string, verb: string): string | null {
  if (callerId && callerId === targetId) {
    return `Não pode ${verb} a sua própria conta.`
  }
  return null
}

export async function listMembersAction(
  page = 1,
  perPage = 25,
): Promise<
  | { ok: true; members: AdminMemberRow[]; nextPage: number | null; total: number; page: number; perPage: number }
  | { ok: false; message: string }
> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data: listData, error: listErr } = await admin.auth.admin.listUsers({ page, perPage })
  if (listErr) return { ok: false, message: listErr.message }

  const users = listData.users ?? []
  const ids = users.map((u) => u.id)
  if (ids.length === 0) {
    return {
      ok: true,
      members: [],
      nextPage: null,
      total: listData.total ?? 0,
      page,
      perPage,
    }
  }

  const { data: profiles, error: profErr } = await admin
    .from('profiles')
    .select('id, email, full_name, role, is_leader, formacao_concluida, is_mestre')
    .in('id', ids)

  if (profErr) return { ok: false, message: profErr.message }

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]))

  const members: AdminMemberRow[] = users.map((u) => {
    const p = profileMap.get(u.id)
    const role = (p?.role as UserRole | undefined) ?? 'free'
    return {
      id: u.id,
      email: u.email ?? p?.email ?? '',
      full_name: p?.full_name ?? null,
      role,
      is_leader: Boolean(p?.is_leader),
      formacao_concluida: Boolean(p?.formacao_concluida),
      is_mestre: Boolean(p?.is_mestre),
      created_at: u.created_at,
      banned_until: u.banned_until ?? null,
      last_sign_in_at: u.last_sign_in_at ?? null,
    }
  })

  return {
    ok: true,
    members,
    nextPage: listData.nextPage ?? null,
    total: listData.total ?? members.length,
    page,
    perPage,
  }
}

export async function promoteUserByEmailAction(
  email: string,
  role: UserRole,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const normalized = email.trim().toLowerCase()
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, message: 'Indique um e-mail válido.' }
  }

  const admin = getSupabaseAdmin()
  const trimmed = email.trim()
  let target =
    (await admin.from('profiles').select('id, email, role').eq('email', trimmed).maybeSingle()).data ?? null
  if (!target) {
    target =
      (await admin.from('profiles').select('id, email, role').eq('email', normalized).maybeSingle()).data ?? null
  }
  if (!target) {
    return { ok: false, message: 'Nenhum perfil com este e-mail.' }
  }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', target.id)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = role === 'admin' ? 'Administrador' : role === 'premium' ? 'Premium' : 'Membro (gratuito)'
  return { ok: true, message: `${target.email} → ${label}` }
}

export async function promoteUserByIdAction(
  userId: string,
  role: UserRole,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data: target, error: findErr } = await admin
    .from('profiles')
    .select('id, email, role')
    .eq('id', userId)
    .maybeSingle()

  if (findErr) return { ok: false, message: findErr.message }
  if (!target) return { ok: false, message: 'Perfil não encontrado.' }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = role === 'admin' ? 'Administrador' : role === 'premium' ? 'Premium' : 'Membro'
  return { ok: true, message: `${target.email} → ${label}` }
}

export async function setLeaderByEmailAction(
  email: string,
  isLeader: boolean,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const normalized = email.trim().toLowerCase()
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, message: 'Indique um e-mail válido.' }
  }

  const admin = getSupabaseAdmin()
  const trimmed = email.trim()
  let target =
    (await admin.from('profiles').select('id, email').eq('email', trimmed).maybeSingle()).data ?? null
  if (!target) {
    target =
      (await admin.from('profiles').select('id, email').eq('email', normalized).maybeSingle()).data ?? null
  }
  if (!target) {
    return { ok: false, message: 'Nenhum perfil com este e-mail.' }
  }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({
      is_leader: isLeader,
      leader_since: isLeader ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', target.id)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = isLeader ? 'Líder aprovado' : 'Líder revogado'
  return { ok: true, message: `${target.email} → ${label}` }
}

export async function setLeaderByIdAction(
  userId: string,
  isLeader: boolean,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data: target, error: findErr } = await admin
    .from('profiles')
    .select('id, email')
    .eq('id', userId)
    .maybeSingle()

  if (findErr) return { ok: false, message: findErr.message }
  if (!target) return { ok: false, message: 'Perfil não encontrado.' }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({
      is_leader: isLeader,
      leader_since: isLeader ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = isLeader ? 'Líder aprovado' : 'Líder revogado'
  return { ok: true, message: `${target.email} → ${label}` }
}

/** Marca/desmarca conclusão da formação (libera material restrito das Imersões). */
export async function setFormacaoConcluidaByIdAction(
  userId: string,
  concluida: boolean,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data: target, error: findErr } = await admin
    .from('profiles')
    .select('id, email')
    .eq('id', userId)
    .maybeSingle()

  if (findErr) return { ok: false, message: findErr.message }
  if (!target) return { ok: false, message: 'Perfil não encontrado.' }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({
      formacao_concluida: concluida,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = concluida ? 'Formação concluída' : 'Formação não concluída'
  return { ok: true, message: `${target.email} → ${label}` }
}

/** Marca/desmarca Mestre (libera os métodos avançados da Gematria). */
export async function setMestreByIdAction(
  userId: string,
  isMestre: boolean,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { data: target, error: findErr } = await admin
    .from('profiles')
    .select('id, email')
    .eq('id', userId)
    .maybeSingle()

  if (findErr) return { ok: false, message: findErr.message }
  if (!target) return { ok: false, message: 'Perfil não encontrado.' }

  const { error: updateErr } = await admin
    .from('profiles')
    .update({
      is_mestre: isMestre,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)

  if (updateErr) return { ok: false, message: updateErr.message }

  const label = isMestre ? 'Mestre de Gematria' : 'Mestre revogado'
  return { ok: true, message: `${target.email} → ${label}` }
}

/** Banimento no Auth (não consegue iniciar sessão). ~100 anos. */
export async function banUserAction(
  userId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const block = selfActionBlocked(await getCallerId(), userId, 'banir')
  if (block) return { ok: false, message: block }

  const admin = getSupabaseAdmin()
  const { error } = await admin.auth.admin.updateUserById(userId, { ban_duration: '876000h' })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Utilizador banido.' }
}

export async function unbanUserAction(
  userId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const block = selfActionBlocked(await getCallerId(), userId, 'desbanir')
  if (block) return { ok: false, message: block }

  const admin = getSupabaseAdmin()
  const { error } = await admin.auth.admin.updateUserById(userId, { ban_duration: 'none' })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Banimento revogado.' }
}

/** Remove auth user (e linha em profiles por CASCADE, se configurado). */
export async function deleteUserAction(
  userId: string,
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const block = selfActionBlocked(await getCallerId(), userId, 'excluir')
  if (block) return { ok: false, message: block }

  const admin = getSupabaseAdmin()
  const { error } = await admin.auth.admin.deleteUser(userId)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Conta removida do sistema de autenticação.' }
}

// ── Portal de líderes: avisos do Rav e recursos exclusivos ──────────────────

type SimpleResult = { ok: true; message: string } | { ok: false; message: string }

export async function createLeaderAnnouncementAction(input: {
  title: string
  body: string
  pinned: boolean
  showOnHome?: boolean
  notifyWhatsapp?: boolean
}): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const title = input.title.trim()
  if (!title) return { ok: false, message: 'Informe um título para o aviso.' }

  const showOnHome = input.showOnHome ?? false
  const notifyWhatsapp = input.notifyWhatsapp ?? true

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('leader_announcements').insert({
    title,
    body: input.body.trim(),
    pinned: input.pinned,
    show_on_home: showOnHome,
    is_published: true,
    created_by: await getCallerId(),
  })

  if (error) return { ok: false, message: error.message }

  let whatsappNote = ''
  if (notifyWhatsapp) {
    const optInCount = await countWhatsAppOptInMembers()
    const provider = getWhatsAppProvider()
    if (provider === 'none') {
      whatsappNote =
        optInCount > 0
          ? ` ${optInCount} membro(s) com zap cadastrado; configure WHATSAPP_PROVIDER na Vercel para enviar.`
          : ''
    } else if (optInCount > 0) {
      whatsappNote = ` WhatsApp sera enviado em segundo plano para ${optInCount} membro(s).`
      after(async () => {
        await broadcastAnnouncementWhatsApp({ title, showOnHome })
      })
    } else {
      whatsappNote = ' Nenhum membro com zap cadastrado ainda.'
    }
  }

  return { ok: true, message: `Aviso publicado: ${title}.${whatsappNote}` }
}

export async function deleteLeaderAnnouncementAction(id: string): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('leader_announcements').delete().eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Aviso removido.' }
}

export async function createLeaderResourceAction(input: {
  title: string
  description: string
  category: string
  fileUrl: string
  sortOrder: number
}): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const title = input.title.trim()
  const fileUrl = input.fileUrl.trim()
  if (!title) return { ok: false, message: 'Informe um título para o material.' }
  if (!/^https?:\/\/.+/i.test(fileUrl)) {
    return { ok: false, message: 'Informe uma URL válida (http/https) para o arquivo.' }
  }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('leader_resources').insert({
    title,
    description: input.description.trim(),
    category: input.category.trim() || 'geral',
    file_url: fileUrl,
    is_published: true,
    sort_order: Number.isFinite(input.sortOrder) ? input.sortOrder : 0,
  })

  if (error) return { ok: false, message: error.message }
  return { ok: true, message: `Material publicado: ${title}` }
}

export async function deleteLeaderResourceAction(id: string): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('leader_resources').delete().eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Material removido.' }
}

// ── Loja Acqua Rios: produtos e imagens ─────────────────────────────────────

export type AdminShopProductRow = {
  id: string
  slug: string
  name: string
  description: string
  price_cents: number
  category: string
  image_url: string | null
  is_active: boolean
  sort_order: number
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Aceita vazio (limpar), URL http(s) ou caminho relativo iniciando em "/". */
function validImageUrl(url: string): boolean {
  if (!url) return true
  return /^(https?:\/\/|\/).+/i.test(url)
}

export async function createShopProductAction(input: {
  name: string
  slug?: string
  description: string
  priceCents: number
  category: string
  imageUrl: string
  sortOrder: number
}): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const name = input.name.trim()
  if (!name) return { ok: false, message: 'Informe o nome do produto.' }

  const slug = slugify(input.slug?.trim() || name)
  if (!slug) return { ok: false, message: 'Não foi possível gerar um slug válido a partir do nome.' }

  if (!Number.isFinite(input.priceCents) || input.priceCents < 0) {
    return { ok: false, message: 'Preço inválido.' }
  }
  const imageUrl = input.imageUrl.trim()
  if (!validImageUrl(imageUrl)) {
    return { ok: false, message: 'URL da imagem inválida (use http(s):// ou /caminho).' }
  }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('shop_products').insert({
    slug,
    name,
    description: input.description.trim(),
    price_cents: Math.round(input.priceCents),
    category: input.category.trim() || 'geral',
    image_url: imageUrl || null,
    is_active: true,
    sort_order: Number.isFinite(input.sortOrder) ? input.sortOrder : 0,
  })

  if (error) {
    if (error.code === '23505') {
      return { ok: false, message: `Já existe um produto com o slug "${slug}".` }
    }
    return { ok: false, message: error.message }
  }
  return { ok: true, message: `Produto adicionado: ${name}` }
}

export async function updateShopProductAction(
  id: string,
  input: {
    name?: string
    description?: string
    priceCents?: number
    category?: string
    imageUrl?: string | null
    isActive?: boolean
    sortOrder?: number
  },
): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const patch: ShopProductUpdate = { updated_at: new Date().toISOString() }
  if (input.name !== undefined) {
    const n = input.name.trim()
    if (!n) return { ok: false, message: 'O nome não pode ficar vazio.' }
    patch.name = n
  }
  if (input.description !== undefined) patch.description = input.description.trim()
  if (input.priceCents !== undefined) {
    if (!Number.isFinite(input.priceCents) || input.priceCents < 0) {
      return { ok: false, message: 'Preço inválido.' }
    }
    patch.price_cents = Math.round(input.priceCents)
  }
  if (input.category !== undefined) patch.category = input.category.trim() || 'geral'
  if (input.imageUrl !== undefined) {
    const u = (input.imageUrl ?? '').trim()
    if (!validImageUrl(u)) {
      return { ok: false, message: 'URL da imagem inválida (use http(s):// ou /caminho).' }
    }
    patch.image_url = u || null
  }
  if (input.isActive !== undefined) patch.is_active = input.isActive
  if (input.sortOrder !== undefined && Number.isFinite(input.sortOrder)) {
    patch.sort_order = input.sortOrder
  }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('shop_products').update(patch).eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Produto atualizado.' }
}

export async function deleteShopProductAction(id: string): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('shop_products').delete().eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Produto removido.' }
}

// Upload direto da imagem do produto para o Supabase Storage (bucket público).

const SHOP_BUCKET = 'loja'
const SHOP_IMAGE_MAX_BYTES = 4 * 1024 * 1024
const SHOP_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']

async function ensureShopBucket(admin: ReturnType<typeof getSupabaseAdmin>): Promise<string | null> {
  const { data } = await admin.storage.getBucket(SHOP_BUCKET)
  if (data) return null
  const { error } = await admin.storage.createBucket(SHOP_BUCKET, {
    public: true,
    fileSizeLimit: SHOP_IMAGE_MAX_BYTES,
    allowedMimeTypes: SHOP_IMAGE_TYPES,
  })
  if (error && !/already exists/i.test(error.message)) return error.message
  return null
}

export async function uploadShopImageAction(
  formData: FormData,
): Promise<{ ok: boolean; url?: string; message?: string }> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: 'Nenhum arquivo recebido.' }
  }
  if (!SHOP_IMAGE_TYPES.includes(file.type)) {
    return { ok: false, message: 'Formato inválido. Use JPG, PNG, WebP, AVIF ou GIF.' }
  }
  if (file.size > SHOP_IMAGE_MAX_BYTES) {
    return { ok: false, message: 'Imagem muito grande (máx. 4 MB).' }
  }

  const admin = getSupabaseAdmin()
  const bucketErr = await ensureShopBucket(admin)
  if (bucketErr) return { ok: false, message: `Storage: ${bucketErr}` }

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const path = `produtos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const bytes = Buffer.from(await file.arrayBuffer())

  const { error } = await admin.storage
    .from(SHOP_BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false })
  if (error) return { ok: false, message: error.message }

  const { data } = admin.storage.from(SHOP_BUCKET).getPublicUrl(path)
  return { ok: true, url: data.publicUrl }
}

// ---- Caixa de entrada: pedidos de oração e ouvidoria --------------------

export type AdminPrayerRow = {
  id: string
  contact_name: string | null
  contact_email: string | null
  message: string
  is_anonymous: boolean
  status: string
  created_at: string
}

export type AdminFeedbackRow = {
  id: string
  category: string
  subject: string
  message: string
  contact_name: string | null
  contact_email: string | null
  status: string
  created_at: string
}

const PRAYER_STATUSES = new Set(['novo', 'em_oracao', 'respondido', 'arquivado'])
const FEEDBACK_STATUSES = new Set(['novo', 'lido', 'respondido', 'arquivado'])

export async function updatePrayerStatusAction(id: string, status: string): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }
  if (!PRAYER_STATUSES.has(status)) return { ok: false, message: 'Status inválido.' }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('prayer_requests').update({ status }).eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Status atualizado.' }
}

export async function deletePrayerRequestAction(id: string): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('prayer_requests').delete().eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Pedido removido.' }
}

export async function updateFeedbackStatusAction(id: string, status: string): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }
  if (!FEEDBACK_STATUSES.has(status)) return { ok: false, message: 'Status inválido.' }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('site_feedback').update({ status }).eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Status atualizado.' }
}

export async function deleteFeedbackAction(id: string): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('site_feedback').delete().eq('id', id)
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Mensagem removida.' }
}

export type SitePublicStatsPayload = {
  members: number
  visitors: number
  leaders: number
  mestres: number
}

function sanitizeStat(n: number): number {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.floor(n))
}

export async function updateSitePublicStatsAction(
  payload: SitePublicStatsPayload,
): Promise<SimpleResult> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const row = {
    id: 1,
    members_count: sanitizeStat(payload.members),
    visitors_count: sanitizeStat(payload.visitors),
    leaders_count: sanitizeStat(payload.leaders),
    mestres_count: sanitizeStat(payload.mestres),
    updated_at: new Date().toISOString(),
  }

  const admin = getSupabaseAdmin()
  const { error } = await admin.from('site_public_stats').upsert(row, { onConflict: 'id' })
  if (error) return { ok: false, message: error.message }
  return { ok: true, message: 'Contadores da página inicial salvos.' }
}

export async function getLiveProfileCountsAction(): Promise<
  { ok: true; counts: LiveProfileCounts } | { ok: false; message: string }
> {
  const gate = await requireAdmin()
  if (!gate.ok) return { ok: false, message: gate.message }

  const counts = await fetchLiveProfileCounts()
  if (!counts) {
    return { ok: false, message: 'Não foi possível ler profiles (service role ausente).' }
  }
  return { ok: true, counts }
}

