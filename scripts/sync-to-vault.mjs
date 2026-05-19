#!/usr/bin/env node
/**
 * sync-to-vault.mjs — espelha o conteudo de data/chagim/<slug> para o
 * vault Obsidian do Rav EBBY, sob 04-Projetos-Ativos/Chagim-Web/<slug>.
 *
 * Cada arquivo .md ganha frontmatter Obsidian (tags, aliases, fontes,
 * link publico do site). O cabecalho local (linhas **title:**, **order_num:**
 * etc.) e movido para o YAML frontmatter, deixando o corpo limpo.
 *
 * Cria tambem um Index.md (dashboard) por chag e atualiza a pagina
 * agregadora Chagim-Web/_README.md com todos os chags conhecidos.
 *
 * Uso:
 *   node scripts/sync-to-vault.mjs shabat
 *   node scripts/sync-to-vault.mjs --all
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const dataRoot = join(repoRoot, 'data', 'chagim')

const VAULT_ROOT =
  process.env.VAULT_RAV_EBBY ||
  'C:/Sinagoga/Sinagoga/vault-rav-ebby/vault-rav-ebby'

const PUBLIC_SITE = 'https://britimmashiach.com'

const targetBase = join(VAULT_ROOT, '04-Projetos-Ativos', 'Chagim-Web')

if (!existsSync(VAULT_ROOT)) {
  console.error(`Vault nao encontrado: ${VAULT_ROOT}`)
  console.error('Define VAULT_RAV_EBBY no env se o caminho mudou.')
  process.exit(1)
}

mkdirSync(targetBase, { recursive: true })

function listChagSlugs() {
  return readdirSync(dataRoot)
    .filter((n) => statSync(join(dataRoot, n)).isDirectory())
    .sort()
}

function parseHeaderAndBody(raw) {
  const sepIdx = raw.indexOf('\n---\n')
  if (sepIdx === -1) return { meta: {}, body: raw.trim() }
  const header = raw.slice(0, sepIdx)
  const body = raw.slice(sepIdx + 5).trim()
  const meta = {}
  for (const line of header.split('\n')) {
    const m = line.match(/^\*\*([a-z_]+):\*\*\s*(.+)$/)
    if (!m) continue
    const key = m[1]
    let val = m[2].trim()
    if (key === 'level_pardes') val = JSON.parse(val)
    else if (key === 'is_premium') val = val === 'true'
    else if (key === 'order_num') val = parseInt(val, 10)
    meta[key] = val
  }
  return { meta, body }
}

function toYaml(obj) {
  const lines = ['---']
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) continue
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(', ')}]`)
    } else if (typeof v === 'string') {
      lines.push(`${k}: ${JSON.stringify(v)}`)
    } else {
      lines.push(`${k}: ${v}`)
    }
  }
  lines.push('---')
  return lines.join('\n')
}

function renderSectionFile(slug, chagName, file, meta, body) {
  const fm = {
    title: meta.title || file,
    chag: chagName,
    slug,
    order: meta.order_num ?? 0,
    pardes: meta.level_pardes ?? [],
    premium: !!meta.is_premium,
    source: 'data/chagim/' + slug + '/' + file,
    public_url: `${PUBLIC_SITE}/chagim/${slug}`,
    tags: [
      'chagim',
      slug,
      'rav-ebby',
      'brit-im-mashiach',
      ...(meta.level_pardes ?? []).map((p) => `pardes/${p}`),
      ...(meta.is_premium ? ['premium'] : []),
    ],
    aliases: meta.title ? [meta.title] : [],
    updated: new Date().toISOString().slice(0, 10),
  }
  const footer =
    '\n\n---\n\n' +
    `*Versão web publicada em [${PUBLIC_SITE}/chagim/${slug}](${PUBLIC_SITE}/chagim/${slug}).* ` +
    'Esta é uma cópia espelhada do Supabase para uso interno do Rav EBBY ' +
    'no vault de conhecimento.'
  return `${toYaml(fm)}\n\n# ${meta.title || file}\n\n${body}${footer}\n`
}

function renderChagIndex(slug, metadata, sections) {
  const fm = {
    title: metadata.name,
    name_hebrew: metadata.name_hebrew,
    slug,
    category: metadata.category,
    duration_days: metadata.duration_days,
    month_hebrew: metadata.month_hebrew,
    day_start: metadata.day_start,
    public_url: `${PUBLIC_SITE}/chagim/${slug}`,
    sections_count: sections.length,
    estimated_reading_time_minutes: metadata.estimated_reading_time_minutes,
    tags: [
      'chagim',
      'chag-index',
      slug,
      'rav-ebby',
      'brit-im-mashiach',
      ...(metadata.tags ?? []),
    ],
    aliases: [metadata.name, metadata.name_hebrew],
    updated: new Date().toISOString().slice(0, 10),
  }
  const list = sections
    .map((s) => {
      const fname = s.fileBase
      const premium = s.premium ? ' 🔒' : ''
      return `- ${String(s.order).padStart(2, '0')}. [[${fname}|${s.title}]]${premium}`
    })
    .join('\n')

  const body = `
# ${metadata.name} — ${metadata.name_hebrew}

> ${metadata.summary}

**Categoria:** \`${metadata.category}\`
**Duração:** ${metadata.duration_days} dia(s)
**Mês hebraico:** ${metadata.month_hebrew || '—'}
**Dia de início:** ${metadata.day_start || '—'} de ${metadata.month_hebrew || '—'}
**Versão pública:** ${PUBLIC_SITE}/chagim/${slug}

## Estrutura (16 seções)

${list}

## Conexões úteis no vault

- [[_INDEX-MESTRE]] — entrada do vault
- [[Linha-Teologica]] — base messiânica não-trinitária
- [[Metodo-PaRDeS]] — base hermenêutica das seções
- [[Modelo-Netivot-Completo]] — Sefirot e caminhos
- [[Padroes-Linguisticos]] — regras de produção
- [[Transliteracoes-Fixas]] — Toráh, Mashiach, Kabaláh

## Sobre

Esta pasta é uma cópia espelhada do conteúdo web de ${metadata.name},
publicado em ${PUBLIC_SITE}/chagim/${slug}. A fonte canônica é o
diretório \`data/chagim/${slug}/\` no repositório \`brit-mashiach\`.
Edições devem ser feitas lá; rodar \`node scripts/sync-to-vault.mjs ${slug}\`
para repropagar ao vault.
`
  return `${toYaml(fm)}\n${body}\n`
}

function renderWebReadme(allChags) {
  const fm = {
    title: 'Chagim-Web — Índice do canal Web',
    public_site: PUBLIC_SITE,
    tags: ['chagim', 'chagim-web', 'rav-ebby', 'index'],
    updated: new Date().toISOString().slice(0, 10),
  }
  const list = allChags
    .map(
      (c) =>
        `- [[${c.slug}/_Index|${c.name}]] (${c.name_hebrew}) — ${c.category}, ${c.duration_days}d — [web](${PUBLIC_SITE}/chagim/${c.slug})`,
    )
    .join('\n')
  return `${toYaml(fm)}

# Chagim-Web — canal Web do Brit Im Mashiach

Conteúdo dos Chagim publicado em ${PUBLIC_SITE}/chagim. Esta pasta é a
cópia espelhada (read-only para humanos; sincronizada via script) do
que está no Supabase de produção.

## Chags publicados

${list}

## Como sincronizar

\`\`\`bash
cd C:/Sinagoga/Claude/projetos/brit-mashiach
node scripts/sync-to-vault.mjs <slug>      # um chag
node scripts/sync-to-vault.mjs --all       # todos
\`\`\`

A fonte canônica é o repositório (\`data/chagim/<slug>/\`) e o banco
Supabase (tabelas \`chagim\` + \`chag_sections\`). Este espelho serve
para estudo no Obsidian, anotações em wikilinks privadas do Rav EBBY,
e como referência fora do navegador.
`
}

function syncOne(slug) {
  const dir = join(dataRoot, slug)
  if (!existsSync(dir)) {
    console.error(`[${slug}] data/chagim/${slug}/ não existe — pulando.`)
    return null
  }
  const metaPath = join(dir, '00-metadata.json')
  if (!existsSync(metaPath)) {
    console.error(`[${slug}] sem 00-metadata.json — pulando.`)
    return null
  }
  const metadata = JSON.parse(readFileSync(metaPath, 'utf8'))

  const sectionFiles = readdirSync(dir)
    .filter((f) => /^\d{2}-.+\.md$/.test(f) && f !== '00-metadata.json')
    .sort()

  const targetDir = join(targetBase, slug)
  mkdirSync(targetDir, { recursive: true })

  const sections = []
  for (const f of sectionFiles) {
    const raw = readFileSync(join(dir, f), 'utf8')
    const { meta, body } = parseHeaderAndBody(raw)
    const fileBase = f.replace(/\.md$/, '')
    const rendered = renderSectionFile(slug, metadata.name, f, meta, body)
    writeFileSync(join(targetDir, f), rendered, 'utf8')
    sections.push({
      order: meta.order_num ?? 0,
      title: meta.title || fileBase,
      fileBase,
      premium: !!meta.is_premium,
    })
  }
  sections.sort((a, b) => a.order - b.order)

  // Index do chag dentro da pasta dele
  const indexContent = renderChagIndex(slug, metadata, sections)
  writeFileSync(join(targetDir, '_Index.md'), indexContent, 'utf8')

  console.log(`[${slug}] OK — ${sections.length} seções + _Index.md`)
  return { slug, ...metadata }
}

function syncAll() {
  const slugs = listChagSlugs()
  const synced = []
  for (const slug of slugs) {
    const r = syncOne(slug)
    if (r) synced.push(r)
  }
  // _README.md agregador
  const readme = renderWebReadme(synced)
  writeFileSync(join(targetBase, '_README.md'), readme, 'utf8')
  console.log(`\nAtualizado: ${targetBase}/_README.md (${synced.length} chags)`)
}

const arg = process.argv[2]
if (!arg) {
  console.error('Uso: node scripts/sync-to-vault.mjs <slug> | --all')
  process.exit(1)
}
if (arg === '--all') {
  syncAll()
} else {
  syncOne(arg)
  // Atualiza tambem o _README.md agregador para refletir o estado completo
  const all = listChagSlugs()
    .map((s) => {
      const p = join(dataRoot, s, '00-metadata.json')
      if (!existsSync(p)) return null
      return { slug: s, ...JSON.parse(readFileSync(p, 'utf8')) }
    })
    .filter(Boolean)
  writeFileSync(join(targetBase, '_README.md'), renderWebReadme(all), 'utf8')
  console.log(`Atualizado: ${targetBase}/_README.md (${all.length} chags)`)
}
