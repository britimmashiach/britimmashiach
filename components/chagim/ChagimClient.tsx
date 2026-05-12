'use client'

import { useState, useEffect, useCallback } from 'react'
import { Crown, ArrowRight, Flame, FileText, ExternalLink, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Drawer } from '@/components/ui/Drawer'
import { createClient } from '@/lib/supabase'
import { useProfile } from '@/hooks/useProfile'
import Link from 'next/link'
import type { Chag, ChagSection } from '@/lib/chagim-supabase'
import type { Database } from '@/types/database'

type ChagSectionRow = Database['public']['Tables']['chag_sections']['Row']

function normalizeSection(row: ChagSectionRow): ChagSection {
  return {
    id: row.id,
    chagId: row.chag_id,
    orderNum: row.order_num,
    title: row.title,
    content: row.content,
    levelPardes: row.level_pardes ?? [],
    isPremium: row.is_premium,
    pdfUrl: row.pdf_url ?? null,
  }
}

// Aproximação gregoriana: mês corrente → slugs prováveis do próximo Chag
function findNextChagSlug(chagim: Chag[]): string | null {
  const month = new Date().getMonth() + 1
  const upcomingByMonth: Record<number, string[]> = {
    1:  ['purim'],
    2:  ['purim'],
    3:  ['pesach'],
    4:  ['pesach', 'shavuot'],
    5:  ['shavuot'],
    6:  ['shavuot'],
    7:  ['rosh-hashanah'],
    8:  ['rosh-hashanah'],
    9:  ['yom-kippur', 'sukkot'],
    10: ['chanukah'],
    11: ['chanukah'],
    12: ['chanukah'],
  }
  const candidates = upcomingByMonth[month] ?? []
  for (const slug of candidates) {
    if (chagim.some((c) => c.slug === slug)) return slug
  }
  return null
}

const PARDES_COLORS: Record<string, string> = {
  peshat: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  remez:  'bg-green-500/10 text-green-700 dark:text-green-400',
  drash:  'bg-gold-500/10 text-gold-700 dark:text-gold-400',
  sod:    'bg-purple-500/10 text-purple-700 dark:text-purple-400',
}

const CATEGORY_LABELS: Record<string, { label: string; hebrew: string; order: number; color: string }> = {
  yamim_noraim: {
    label: 'Yamim Noraim',
    hebrew: 'יָמִים נוֹרָאִים',
    order: 1,
    color: 'text-red-600 dark:text-red-400 bg-red-500/10',
  },
  shalosh_regalim: {
    label: 'Shalosh Regalim',
    hebrew: 'שָׁלוֹשׁ רְגָלִים',
    order: 2,
    color: 'text-gold-600 dark:text-gold-400 bg-gold-500/10',
  },
  rosh_chodesh: {
    label: 'Rosh Chodesh',
    hebrew: 'רֹאשׁ חֹדֶשׁ',
    order: 3,
    color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
  },
  minor: {
    label: 'Festividades',
    hebrew: 'חַגִּים',
    order: 4,
    color: 'text-warmgray-600 dark:text-warmgray-400 bg-muted',
  },
}

const PLACEHOLDER_CHAGIM: Chag[] = [
  { id: 'ph-pesach', slug: 'pesach', name: 'Pesach', nameHebrew: 'פֶּסַח', category: 'shalosh_regalim', monthHebrew: 'Nissan', dayStart: 15, durationDays: 7, summary: 'Libertação do Egito. A noite do Seder, os sete dias de Matsot e a saída da escravidão espiritual.', content: 'Pesach é o eixo da memória de Israel: saída do Egito, tempo da primavera e renovação do pacto.\n\nNesta plataforma, o estudo completo reunirá visão literal (Peshat), alusões (Remez), homiletica (Drash) e dimensão cabalística (Sod), com PDFs para acompanhar o Seder e os sete dias de Matsot.', levelPardes: ['peshat', 'sod'], isPremium: false, pdfUrl: null, pdfPremiumUrl: null, pdfKabbalahUrl: null, publishedAt: '' },
  { id: 'ph-shavuot', slug: 'shavuot', name: 'Shavuot', nameHebrew: 'שָׁבוּעוֹת', category: 'shalosh_regalim', monthHebrew: 'Sivan', dayStart: 6, durationDays: 2, summary: 'Entrega da Toráh no Monte Sinai. Colheita das primícias e revelação dos Dez Mandamentos.', content: 'Shavuot une agricultura e revelação: primícias do trigo e Matan Toráh.\n\nOs estudos em preparação tratarão da preparação interior (49 dias), da noite de Tikun e da leitura de Rut.', levelPardes: ['peshat', 'remez'], isPremium: false, pdfUrl: null, pdfPremiumUrl: null, pdfKabbalahUrl: null, publishedAt: '' },
  { id: 'ph-sukkot', slug: 'sukkot', name: 'Sukkot', nameHebrew: 'סֻכּוֹת', category: 'shalosh_regalim', monthHebrew: 'Tishri', dayStart: 15, durationDays: 7, summary: 'Festa dos Tabernáculos. Sete dias na Sucá, alegria plena e hospitalidade espiritual.', content: 'Sukkot celebra confiança na Providência: saída das "paredes seguras" para a fragilidade da Sucá.\n\nHoshanot, Arbaat Haminim e Simchat Toráh serão organizados em seções claras para o calendário litúrgico da plataforma.', levelPardes: ['peshat', 'drash'], isPremium: false, pdfUrl: null, pdfPremiumUrl: null, pdfKabbalahUrl: null, publishedAt: '' },
  { id: 'ph-rosh-hashanah', slug: 'rosh-hashanah', name: 'Rosh Hashanah', nameHebrew: 'רֹאשׁ הַשָּׁנָה', category: 'yamim_noraim', monthHebrew: 'Tishri', dayStart: 1, durationDays: 2, summary: 'Ano Novo judaico. Dias de julgamento, Teshuvah e renovação espiritual profunda.', content: 'Rosh Hashanah inaugura os Yamim Noraim: cornetas (Shofar), soberania divina e introspecção.\n\nConteúdo premium em preparação incluirá meditações cabalísticas e guia de Teshuvah segundo a tradição.', levelPardes: ['sod'], isPremium: true, pdfUrl: null, pdfPremiumUrl: null, pdfKabbalahUrl: null, publishedAt: '' },
  { id: 'ph-yom-kippur', slug: 'yom-kippur', name: 'Yom Kippur', nameHebrew: 'יוֹם כִּפּוּר', category: 'yamim_noraim', monthHebrew: 'Tishri', dayStart: 10, durationDays: 1, summary: 'O Dia do Perdão. O dia mais sagrado do calendário judaico. Jejum e oração contínua.', content: 'Yom Kippur é Shabat Shabaton: cessar do trabalho físico para aprofundar o trabalho espiritual.\n\nA liturgia do dia (vidui, avodah) será estudada em camadas, com material reservado a assinantes Premium.', levelPardes: ['sod'], isPremium: true, pdfUrl: null, pdfPremiumUrl: null, pdfKabbalahUrl: null, publishedAt: '' },
  { id: 'ph-chanukah', slug: 'chanukah', name: 'Chanukah', nameHebrew: 'חֲנוּכָּה', category: 'minor', monthHebrew: 'Kislev', dayStart: 25, durationDays: 8, summary: 'Festa das Luzes. Oito dias de acendimento do Chanukiá e vitória da luz sobre a escuridão.', content: 'Chanukah lembra a dedicação do Beit HaMikdash e a continuidade da chama interior.\n\nOs oito dias, a ordem do acendimento e a halacháh prática serão tratados em seções acessíveis a todos.', levelPardes: ['peshat', 'remez'], isPremium: false, pdfUrl: null, pdfPremiumUrl: null, pdfKabbalahUrl: null, publishedAt: '' },
  { id: 'ph-purim', slug: 'purim', name: 'Purim', nameHebrew: 'פּוּרִים', category: 'minor', monthHebrew: 'Adar', dayStart: 14, durationDays: 1, summary: 'Alegria e inversão. Salvação no tempo de Mordechai e Ester. Meguiláh, mishloach manot e festejo.', content: 'Purim oculta a mão divina na história — "Esther" e o segredo (Sod) do livro sem nome de D\'us.\n\nEstudos sobre Meguiláh, matanot laevyonim e o espírito de alegria contida serão acrescentados ao acervo.', levelPardes: ['drash', 'sod'], isPremium: false, pdfUrl: null, pdfPremiumUrl: null, pdfKabbalahUrl: null, publishedAt: '' },
]

interface ChagimClientProps {
  chagim: Chag[]
}

export function ChagimClient({ chagim }: ChagimClientProps) {
  const displayChagim = chagim.length > 0 ? chagim : PLACEHOLDER_CHAGIM
  const [selected, setSelected] = useState<Chag | null>(null)
  const [sections, setSections] = useState<ChagSection[]>([])
  const [loadingSections, setLoadingSections] = useState(false)
  const [nextChagSlug, setNextChagSlug] = useState<string | null>(null)
  const { isPremium, isAdmin } = useProfile()

  useEffect(() => {
    setNextChagSlug(findNextChagSlug(displayChagim))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchSections = useCallback(async (chagId: string) => {
    setLoadingSections(true)
    setSections([])
    if (chagId.startsWith('ph-')) {
      setLoadingSections(false)
      return
    }
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('chag_sections')
        .select('*')
        .eq('chag_id', chagId)
        .order('order_num', { ascending: true })
      if (!error && data) {
        setSections((data as ChagSectionRow[]).map(normalizeSection))
      }
    } finally {
      setLoadingSections(false)
    }
  }, [])

  useEffect(() => {
    if (selected) fetchSections(selected.id)
  }, [selected, fetchSections])

  function handleOpen(chag: Chag) { setSelected(chag)  }
  function handleClose()          { setSelected(null) }

  const categories = Object.keys(CATEGORY_LABELS).sort(
    (a, b) => CATEGORY_LABELS[a].order - CATEGORY_LABELS[b].order,
  )

  return (
    <>
      {/* Cabeçalho */}
      <div className="mb-10 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Calendário Espiritual
          </span>
        </div>
        <h1 className="section-title">Chagim</h1>
        <p className="section-subtitle max-w-xl">
          Festividades do calendário judaico com estudo estruturado: visão geral, subdivisões e
          análise PaRDeS.
        </p>
      </div>

      {/* Lista por categoria */}
      {categories.map((cat) => {
        const group = displayChagim.filter((c) => c.category === cat)
        if (group.length === 0) return null
        const catInfo = CATEGORY_LABELS[cat]
        return (
          <div key={cat} className="mb-12">

            {/* Separador de categoria */}
            <div className="flex items-center gap-3 mb-6">
              <span className={cn('text-xs font-inter font-semibold px-2.5 py-1 rounded-full flex-shrink-0', catInfo.color)}>
                {catInfo.label}
              </span>
              <span
                className="font-hebrew text-base text-warmgray-400/50 dark:text-warmgray-600/50 flex-shrink-0"
                dir="rtl"
                lang="he"
                aria-hidden="true"
              >
                {catInfo.hebrew}
              </span>
              <hr className="flex-1 border-border/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map((chag: Chag) => {
                const isSelected = selected?.id === chag.id
                const isNextChag = nextChagSlug === chag.slug
                return (
                  <button
                    key={chag.slug}
                    onClick={() => handleOpen(chag)}
                    className={cn(
                      'glass-card p-5 group text-left w-full',
                      'hover:shadow-petroleum-sm hover:-translate-y-0.5 transition-all duration-200',
                      isSelected && 'ring-2 ring-gold-500/50 shadow-gold-sm',
                      isNextChag && !isSelected && 'ring-1 ring-gold-500/30',
                    )}
                    aria-pressed={isSelected}
                    aria-label={`Abrir ${chag.name}`}
                  >
                    {/* Título + badges de estado */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-tight">
                            {chag.name}
                          </h3>
                          {isNextChag && (
                            <span className="text-[10px] font-inter font-medium text-gold-600 dark:text-gold-400 bg-gold-500/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              em breve
                            </span>
                          )}
                        </div>
                        {chag.monthHebrew && (
                          <p className="text-xs font-inter text-warmgray-500 mt-0.5">
                            {chag.monthHebrew}
                            {chag.durationDays > 1 ? ` · ${chag.durationDays} dias` : ''}
                          </p>
                        )}
                      </div>
                      {chag.isPremium && (
                        <span className="premium-badge flex-shrink-0">
                          <Crown className="w-3 h-3" aria-hidden="true" />
                        </span>
                      )}
                    </div>

                    {/* Nome hebraico */}
                    <p
                      className="font-hebrew text-2xl text-warmgray-600 dark:text-warmgray-400 text-right mb-3 leading-loose"
                      dir="rtl"
                      lang="he"
                    >
                      {chag.nameHebrew}
                    </p>

                    {/* Badges PaRDeS */}
                    {chag.levelPardes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {chag.levelPardes.map((lvl) => (
                          <span
                            key={lvl}
                            className={cn(
                              'text-[10px] font-inter font-medium px-1.5 py-0.5 rounded-full capitalize',
                              PARDES_COLORS[lvl] ?? 'bg-muted text-warmgray-500',
                            )}
                          >
                            {lvl}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Resumo + seta */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-inter text-warmgray-500 line-clamp-2 flex-1 pr-1">
                        {chag.summary}
                      </p>
                      <ArrowRight
                        className="w-4 h-4 text-warmgray-400 group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Drawer */}
      <Drawer
        open={selected !== null}
        onClose={handleClose}
        title={selected?.name ?? ''}
        subtitle={selected ? (CATEGORY_LABELS[selected.category]?.label ?? selected.category) : undefined}
      >
        {selected && (
          <div className="space-y-6">
            {/* Cabeçalho do Chag */}
            <div className="space-y-3 pb-5 border-b border-border/40">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  {selected.monthHebrew && (
                    <p className="text-xs font-inter text-warmgray-500">
                      {selected.monthHebrew}
                      {selected.dayStart ? `, ${selected.dayStart}` : ''}
                      {selected.durationDays > 1 ? ` (${selected.durationDays} dias)` : ''}
                    </p>
                  )}
                  {selected.isPremium && (
                    <span className="premium-badge inline-flex">
                      <Crown className="w-3 h-3" aria-hidden="true" />
                      Premium
                    </span>
                  )}
                </div>
                <p
                  className="font-hebrew text-3xl text-warmgray-500 dark:text-warmgray-400 flex-shrink-0 leading-none mt-1"
                  dir="rtl"
                  lang="he"
                >
                  {selected.nameHebrew}
                </p>
              </div>

              {selected.summary && (
                <p className="font-cormorant text-base italic text-petroleum-800 dark:text-parchment-200 leading-relaxed">
                  {selected.summary}
                </p>
              )}

              {/* PDFs do Chag */}
              {(selected.pdfUrl || (isPremium && selected.pdfPremiumUrl) || (isAdmin && selected.pdfKabbalahUrl)) && (
                <div className="flex flex-wrap gap-3 pt-1">
                  {selected.pdfUrl && (
                    <a href={selected.pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      PDF Geral
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                  {isPremium && selected.pdfPremiumUrl && (
                    <a href={selected.pdfPremiumUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-gold-600 dark:text-gold-400 hover:text-gold-500 transition-colors">
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      PDF Premium
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                  {isAdmin && selected.pdfKabbalahUrl && (
                    <a href={selected.pdfKabbalahUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors">
                      <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      PDF Cabalístico
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Conteúdo geral */}
            {selected.content && (
              <div className="space-y-3">
                <h3 className="font-cinzel text-xs font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider">
                  Visão Geral
                </h3>
                <div className="space-y-3">
                  {selected.content.split('\n').map((line, i) => {
                    if (line.trim() === '') return null
                    return (
                      <p key={i} className="font-inter text-sm text-foreground leading-relaxed">
                        {line}
                      </p>
                    )
                  })}
                </div>
                {selected.levelPardes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selected.levelPardes.map((lvl) => (
                      <span key={lvl} className={cn('text-xs font-inter font-medium px-2 py-0.5 rounded-full capitalize', PARDES_COLORS[lvl] ?? 'bg-muted text-warmgray-500')}>
                        {lvl}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Seções */}
            {loadingSections ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border border-border/40 p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-2/5" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                ))}
              </div>
            ) : sections.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-cinzel text-xs font-semibold text-petroleum-800 dark:text-parchment-100 uppercase tracking-wider">
                  Subdivisões
                </h3>
                {sections.map((section) => {
                  const canRead = !section.isPremium || isPremium || isAdmin
                  return (
                    <div
                      key={section.id}
                      className={cn(
                        'rounded-xl border p-4 space-y-2',
                        section.isPremium
                          ? 'border-gold-500/20 bg-gold-500/3'
                          : 'border-border/40 bg-muted/30',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-cinzel text-sm font-semibold text-petroleum-800 dark:text-parchment-100">
                          {section.title}
                        </h4>
                        {section.isPremium && !canRead && (
                          <Lock className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" aria-hidden="true" />
                        )}
                      </div>
                      {canRead ? (
                        <>
                          <div className="space-y-2">
                            {section.content.split('\n').map((line, i) => {
                              if (line.trim() === '') return null
                              return (
                                <p key={i} className="font-inter text-sm text-foreground leading-relaxed">
                                  {line}
                                </p>
                              )
                            })}
                          </div>
                          {section.levelPardes.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {section.levelPardes.map((lvl) => (
                                <span key={lvl} className={cn('text-xs font-inter font-medium px-2 py-0.5 rounded-full capitalize', PARDES_COLORS[lvl] ?? 'bg-muted text-warmgray-500')}>
                                  {lvl}
                                </span>
                              ))}
                            </div>
                          )}
                          {section.pdfUrl && (
                            <a href={section.pdfUrl} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-petroleum-700 dark:text-petroleum-300 hover:text-gold-600 transition-colors pt-1">
                              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                              PDF
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                            </a>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-inter text-warmgray-500">Conteúdo Premium</p>
                          <Link href="/premium" className="text-xs font-inter font-medium text-gold-600 dark:text-gold-400 hover:underline">
                            Assinar
                          </Link>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-border/40 bg-muted/20 p-4">
                <p className="font-cormorant text-base italic text-warmgray-500 leading-relaxed">
                  {selected.id.startsWith('ph-')
                    ? 'Subdivisões detalhadas e PDFs deste Chag serão publicados em breve no acervo digital.'
                    : 'Ainda não há subdivisões cadastradas para este Chag.'}
                </p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </>
  )
}
