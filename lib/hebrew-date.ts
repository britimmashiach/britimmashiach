import {
  HDate,
  HebrewCalendar,
  Location,
  Zmanim,
  flags,
  getHolidaysOnDate,
  type Event,
} from '@hebcal/core'

// =============================================================================
// FUSO E DATA CIVIL
// =============================================================================

/** Fuso da congregação (datas civis e “hoje” no calendário). */
export const SITE_CIVIL_TIMEZONE = 'America/Sao_Paulo'

/** Partes da data civil em um fuso (evita UTC implícito de `toISOString()`). */
export function getCivilDatePartsInTimeZone(
  d: Date = new Date(),
  timeZone: string = SITE_CIVIL_TIMEZONE,
): { year: number; monthIndex: number; day: number } {
  const s = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
  const [y, m, day] = s.split('-').map(Number)
  return { year: y, monthIndex: m - 1, day }
}

/** Meio-dia no fuso do Brasil — padrão seguro para @hebcal/core (evita borda de dia). */
export function dateAtNoonBrazil(
  year: number,
  monthIndex: number,
  day: number,
): Date {
  const mm = String(monthIndex + 1).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return new Date(`${year}-${mm}-${dd}T12:00:00-03:00`)
}

// =============================================================================
// LOCALIZAÇÃO PARA ZMANIM (São Paulo, sede da congregação)
// =============================================================================

/** São Paulo, lat/lon clássicos do Hebcal. Reuso em todas as chamadas. */
const SAO_PAULO_LOCATION = new Location(
  -23.5505,
  -46.6333,
  /* il */ false,
  SITE_CIVIL_TIMEZONE,
  'Sao Paulo',
  'BR',
  undefined,
  760,
)

// =============================================================================
// CONSTANTES E LABELS
// =============================================================================

const DAYS_PT = [
  'Yom Rishon',
  'Yom Sheni',
  'Yom Shlishi',
  "Yom Revi'i",
  'Yom Chamishi',
  'Yom Shishi',
  'Shabbat',
]

const MONTHS_PT: Record<string, string> = {
  Nisan: 'Nissan',
  Iyyar: 'Iyar',
  Sivan: 'Sivan',
  Tamuz: 'Tamuz',
  Av: 'Av',
  Elul: 'Elul',
  Tishrei: 'Tishrei',
  Cheshvan: 'Heshvan',
  Kislev: 'Kislev',
  Tevet: 'Tevet',
  Shvat: 'Shvat',
  Adar: 'Adar',
  'Adar I': 'Adar I',
  'Adar II': 'Adar II',
}

const SEFIROT = ['Chesed', 'Gevuráh', 'Tiferet', 'Netzach', 'Hod', 'Yesod', 'Malchut'] as const

// =============================================================================
// TIPOS PÚBLICOS
// =============================================================================

/** Estado litúrgico do dia — direciona paleta e tom visual. */
export type LiturgicalSeason =
  | 'shabbat'
  | 'chanukah'
  | 'yamim_noraim'
  | 'yom_tov'
  | 'chol_hamoed'
  | 'omer'
  | 'tishrei'
  | 'nissan'
  | 'fast'
  | 'default'

/** Chave interna para feriado (sefardita, slug estável). */
export type HolidayKey =
  | 'pesach'
  | 'chol_hamoed_pesach'
  | 'shavuot'
  | 'rosh_hashana'
  | 'yom_kippur'
  | 'sukkot'
  | 'chol_hamoed_sukkot'
  | 'shemini_atzeret'
  | 'simchat_torah'
  | 'chanukah'
  | 'purim'
  | 'shushan_purim'
  | 'tu_bishvat'
  | 'tu_beav'
  | 'lag_baomer'
  | 'tisha_beav'
  | 'shiv_asar_tammuz'
  | 'fast_of_gedaliah'
  | 'fast_of_esther'
  | 'tenth_of_tevet'
  | 'rosh_chodesh'
  | 'yom_haatzmaut'
  | 'yom_hashoah'
  | 'yom_hazikaron'
  | 'yom_yerushalayim'
  | null

export interface HebrewDateInfo {
  hebrewDate: string
  hebrewDateFull: string
  gregorianFormatted: string
  dayOfWeek: string
  parasha: string | null
  omerDay: number | null
  omerText: string | null
  holidays: string[]
}

export interface DayInfo {
  /** Data civil, meio-dia no fuso de São Paulo. */
  date: Date
  /** Dia da semana civil 0–6 (0 = Domingo). */
  dayOfWeek: number
  /** Texto: "Yom Rishon", "Shabbat", ... */
  dayOfWeekName: string
  isShabbat: boolean

  /** Data hebraica: 28 Iyar 5786 */
  hebrewDay: number
  hebrewMonth: string
  hebrewYear: number
  hebrewDateLabel: string

  /** Parashá da semana (ou null no Yom Tov que “engole” a parashá). */
  parsha: string | null

  /** Omer: 0 quando fora do período. */
  omerDay: number
  /** "Chesed shebeChesed" (vazio se omerDay = 0). */
  sefiraLabel: string
  /** "3 semanas e 2 dias", "49 semanas completas"... */
  omerWeeksDaysLabel: string

  /** Chag/jejum/data especial deste dia (null = dia comum). */
  holidayKey: HolidayKey
  holidayName: string
  holidayDayNumber: number
  holidayTotalDays: number
  holidayDetail: string
  /** Texto específico de Chanukáh (qual vela acender etc.). */
  chanukahInfo: string
  /** Brachot do dia (Kiddush, Lehadlik Ner, etc.). */
  brachaInfo: string

  /** Estado litúrgico (para paleta). */
  season: LiturgicalSeason

  /** Pôr do sol em São Paulo: "HH:mm". */
  sunsetLabel: string

  /** Tehilim sugerido (rotação devocional simples). */
  tehilimSuggestion: string
  /** Frase rotativa de Pirkei Avot. */
  pirkeiFrase: string
}

// =============================================================================
// UTIL: meio-dia em SP a partir de Date qualquer
// =============================================================================

function toCivilNoon(date: Date): Date {
  const civil = new Date(date)
  if (
    civil.getHours() === 0 &&
    civil.getMinutes() === 0 &&
    civil.getSeconds() === 0 &&
    civil.getMilliseconds() === 0
  ) {
    civil.setHours(12, 0, 0, 0)
  }
  return civil
}

// =============================================================================
// API LEGADA (mantida — usada pelo widget HebrewDateDisplay)
// =============================================================================

export function getHebrewDateInfo(date: Date = new Date()): HebrewDateInfo {
  const civil = toCivilNoon(date)
  const hDate = new HDate(civil)
  const monthName = hDate.getMonthName()
  const monthPt = MONTHS_PT[monthName] ?? monthName
  const day = hDate.getDate()
  const year = hDate.getFullYear()

  const hebrewDate = `${day} ${monthPt} ${year}`
  const hebrewDateFull = hDate.renderGematriya()

  const gregorianFormatted = civil.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: SITE_CIVIL_TIMEZONE,
  })

  const dowStr = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE_CIVIL_TIMEZONE,
    weekday: 'short',
  }).format(civil)
  const dowMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }
  const dayOfWeek = DAYS_PT[dowMap[dowStr] ?? civil.getDay()] ?? ''

  const events = HebrewCalendar.calendar({
    start: hDate,
    end: hDate,
    isHebrewYear: false,
    sedrot: true,
    omer: true,
    il: false,
    locale: 'he',
  })

  let parasha: string | null = null
  let omerDay: number | null = null
  let omerText: string | null = null
  const holidays: string[] = []

  for (const ev of events) {
    const mask = ev.getFlags()
    if (mask & flags.PARSHA_HASHAVUA) {
      parasha = normalizeSephardicText(ev.render('en'))
    } else if (mask & flags.OMER_COUNT) {
      const desc = ev.render('en')
      const match = desc.match(/(\d+)/)
      if (match) {
        omerDay = parseInt(match[1], 10)
        omerText = buildOmerText(omerDay)
      }
    } else if (
      mask &
      (flags.MAJOR_FAST |
        flags.MINOR_FAST |
        flags.SPECIAL_SHABBAT |
        flags.YOM_TOV_ENDS |
        flags.CHAG)
    ) {
      holidays.push(normalizeSephardicText(ev.render('en')))
    }
  }

  return {
    hebrewDate,
    hebrewDateFull,
    gregorianFormatted,
    dayOfWeek,
    parasha,
    omerDay,
    omerText,
    holidays,
  }
}

function buildOmerText(day: number): string {
  const week = Math.floor((day - 1) / 7)
  const dayOfWeekInWeek = ((day - 1) % 7) + 1
  if (day === 49) return 'Dia 49 - Malchut de Malchut'
  const weekSefirah = SEFIROT[week] ?? 'Malchut'
  const daySefirah = SEFIROT[dayOfWeekInWeek - 1] ?? 'Chesed'
  return `Dia ${day} - ${daySefirah} de ${weekSefirah}`
}

/** Parasháh emitida pelo Hebcal nesse dia civil (muitas vezes só em Shabat na diáspora). */
function parshaFromHebcalDay(civil: Date): string | null {
  const hDate = new HDate(toCivilNoon(civil))
  const events = HebrewCalendar.calendar({
    start: hDate,
    end: hDate,
    sedrot: true,
    il: false,
    locale: 'en',
  })
  for (const ev of events) {
    if (ev.getFlags() & flags.PARSHA_HASHAVUA) {
      return normalizeSephardicText(ev.render('en'))
    }
  }
  return null
}

/** Shabat (meio-dia em SP) da mesma semana civil domingo–sábado da data. */
function saturdayNoonOfBrazilWeek(civilInput: Date): Date {
  const { year, monthIndex, day } = getCivilDatePartsInTimeZone(
    civilInput,
    SITE_CIVIL_TIMEZONE,
  )
  const anchor = dateAtNoonBrazil(year, monthIndex, day)
  const dow = getDayOfWeekInBrazil(anchor)
  const addDays = (6 - dow + 7) % 7
  return toCivilNoon(new Date(anchor.getTime() + addDays * 86_400_000))
}

/** Se o dia não tem leitura listada, usa o Shabat da mesma semana civil (dom–sáb, SP). */
function withWeeklyParshaFallback(civil: Date, direct: string | null): string | null {
  if (direct) return direct
  const sat = saturdayNoonOfBrazilWeek(civil)
  if (sat.getTime() === civil.getTime()) return null
  return parshaFromHebcalDay(sat)
}

export function getParashaName(date: Date = new Date()): string | null {
  const civil = toCivilNoon(date)
  return withWeeklyParshaFallback(civil, parshaFromHebcalDay(civil))
}

// =============================================================================
// API NOVA: tudo num retorno só (espelho de OmerInfo.fromDate do app Flutter)
// =============================================================================

export function getDayInfo(date: Date = new Date()): DayInfo {
  const civil = toCivilNoon(date)
  const hDate = new HDate(civil)
  const events = HebrewCalendar.calendar({
    start: hDate,
    end: hDate,
    sedrot: true,
    omer: true,
    il: false,
    locale: 'en',
  })

  const hebrewDay = hDate.getDate()
  const hebrewMonth = MONTHS_PT[hDate.getMonthName()] ?? hDate.getMonthName()
  const hebrewYear = hDate.getFullYear()
  const hebrewDateLabel = `${hebrewDay} ${hebrewMonth} ${hebrewYear}`

  let parsha: string | null = null
  let omerDay = 0
  for (const ev of events) {
    const m = ev.getFlags()
    if (m & flags.PARSHA_HASHAVUA) {
      parsha = normalizeSephardicText(ev.render('en'))
    } else if (m & flags.OMER_COUNT) {
      const match = ev.render('en').match(/(\d+)/)
      if (match) omerDay = parseInt(match[1], 10)
    }
  }
  parsha = withWeeklyParshaFallback(civil, parsha)

  const holidayEvent = pickPrimaryHolidayEvent(civil)
  const holidayKey = holidayEvent ? mapToHolidayKey(holidayEvent) : null
  const holidayName = holidayEvent
    ? holidayDisplayName(holidayKey, holidayEvent)
    : ''
  const { dayNumber, totalDays } = holidayEvent
    ? computeHolidaySpan(civil, holidayKey)
    : { dayNumber: 0, totalDays: 0 }

  const dayOfWeek = getDayOfWeekInBrazil(civil)
  const isShabbat = dayOfWeek === 6

  const season = computeSeason({
    isShabbat,
    holidayKey,
    omerDay,
    hebrewMonth: hDate.getMonth(),
    hebrewDay,
    holidayEvent,
  })

  const sefiraLabel = omerDay > 0 ? sefiraOfOmer(omerDay) : ''
  const omerWeeksDaysLabel = omerDay > 0 ? weeksDaysLabel(omerDay) : ''
  const chanukahInfo =
    holidayKey === 'chanukah' ? buildChanukahInfo(holidayEvent) : ''
  const brachaInfo = buildBrachaInfo(holidayKey, holidayEvent)
  const sunsetLabel = computeSunsetSaoPaulo(civil)
  const tehilimSuggestion = buildTehilimSuggestion(hDate)
  const pirkeiFrase = pickPirkeiFrase(hebrewDay)

  return {
    date: civil,
    dayOfWeek,
    dayOfWeekName: DAYS_PT[dayOfWeek] ?? '',
    isShabbat,
    hebrewDay,
    hebrewMonth,
    hebrewYear,
    hebrewDateLabel,
    parsha,
    omerDay,
    sefiraLabel,
    omerWeeksDaysLabel,
    holidayKey,
    holidayName,
    holidayDayNumber: dayNumber,
    holidayTotalDays: totalDays,
    holidayDetail: holidayKey ? holidayExplanation(holidayKey) : '',
    chanukahInfo,
    brachaInfo,
    season,
    sunsetLabel,
    tehilimSuggestion,
    pirkeiFrase,
  }
}

// =============================================================================
// HELPERS — seleção do feriado principal do dia
// =============================================================================

function pickPrimaryHolidayEvent(civil: Date): Event | null {
  const events = getHolidaysOnDate(new HDate(civil), false) ?? []
  if (events.length === 0) return null

  const SCORED = events.map((ev) => ({ ev, score: scoreHolidayEvent(ev) }))
  SCORED.sort((a, b) => b.score - a.score)
  return SCORED[0]?.ev ?? null
}

function scoreHolidayEvent(ev: Event): number {
  const m = ev.getFlags()
  if (m & flags.CHAG) return 100
  if (m & flags.CHOL_HAMOED) return 80
  if (m & flags.MAJOR_FAST) return 70
  if (m & flags.MINOR_FAST) return 60
  if (m & flags.CHANUKAH_CANDLES) return 55
  if (m & flags.MODERN_HOLIDAY) return 50
  if (m & flags.MINOR_HOLIDAY) return 40
  if (m & flags.ROSH_CHODESH) return 30
  if (m & flags.SPECIAL_SHABBAT) return 20
  return 10
}

function mapToHolidayKey(ev: Event): HolidayKey {
  const base = (ev.basename() ?? ev.getDesc()).toLowerCase()
  const m = ev.getFlags()

  if (m & flags.ROSH_CHODESH) return 'rosh_chodesh'

  if (base.includes('pesach') || base.includes('passover')) {
    if (m & flags.CHOL_HAMOED) return 'chol_hamoed_pesach'
    return 'pesach'
  }
  if (base.includes('shavuot') || base.includes('shavuos')) return 'shavuot'
  if (base.includes('rosh hashana')) return 'rosh_hashana'
  if (base.includes('yom kippur')) return 'yom_kippur'
  if (base.includes('shmini atzeret') || base.includes('shemini atzeret'))
    return 'shemini_atzeret'
  if (base.includes('simchat torah') || base.includes('simchas torah'))
    return 'simchat_torah'
  if (base.includes('sukkot') || base.includes('sukkos') || base.includes('succos')) {
    if (m & flags.CHOL_HAMOED) return 'chol_hamoed_sukkot'
    return 'sukkot'
  }
  if (base.includes('chanukah') || base.includes('chanukkah')) return 'chanukah'
  if (base.includes('shushan purim')) return 'shushan_purim'
  if (base.includes('purim')) return 'purim'
  if (base.includes('tu bishvat') || base.includes("tu b'shvat")) return 'tu_bishvat'
  if (base.includes('tu b') && base.includes('av')) return 'tu_beav'
  if (base.includes('lag baomer') || base.includes("lag b'omer")) return 'lag_baomer'
  if (base.includes("tish'a") || base.includes('tisha b')) return 'tisha_beav'
  if (base.includes('17') && base.includes('tammuz')) return 'shiv_asar_tammuz'
  if (base.includes('gedaliah') || base.includes('gedalia')) return 'fast_of_gedaliah'
  if (base.includes('esther')) return 'fast_of_esther'
  if (base.includes('10') && base.includes('tevet')) return 'tenth_of_tevet'
  if (base.includes('yom haatzmaut') || base.includes("yom ha'atzma")) return 'yom_haatzmaut'
  if (base.includes('yom hashoah') || base.includes('hashoah')) return 'yom_hashoah'
  if (base.includes('yom hazikaron') || base.includes('hazikaron')) return 'yom_hazikaron'
  if (base.includes('yom yerushalayim')) return 'yom_yerushalayim'

  return null
}

function computeHolidaySpan(
  civil: Date,
  key: HolidayKey,
): { dayNumber: number; totalDays: number } {
  if (!key) return { dayNumber: 0, totalDays: 0 }

  let dayNumber = 1
  let totalDays = 1

  let prev = new Date(civil)
  prev.setDate(prev.getDate() - 1)
  for (let i = 0; i < 10; i++) {
    const ev = pickPrimaryHolidayEvent(prev)
    if (ev && mapToHolidayKey(ev) === key) {
      dayNumber++
      prev = new Date(prev)
      prev.setDate(prev.getDate() - 1)
    } else break
  }

  let next = new Date(civil)
  next.setDate(next.getDate() + 1)
  for (let i = 0; i < 10; i++) {
    const ev = pickPrimaryHolidayEvent(next)
    if (ev && mapToHolidayKey(ev) === key) {
      totalDays++
      next = new Date(next)
      next.setDate(next.getDate() + 1)
    } else break
  }
  totalDays += dayNumber - 1
  return { dayNumber, totalDays }
}

function holidayDisplayName(key: HolidayKey, ev: Event): string {
  if (!key) return normalizeSephardicText(ev.render('en'))
  const MAP: Record<NonNullable<HolidayKey>, string> = {
    pesach: 'Pesach',
    chol_hamoed_pesach: 'Chol haMoed Pesach',
    shavuot: 'Shavuot',
    rosh_hashana: 'Rosh Hashanah',
    yom_kippur: 'Yom Kippur',
    sukkot: 'Sukkot',
    chol_hamoed_sukkot: 'Chol haMoed Sukkot',
    shemini_atzeret: 'Shemini Atzeret',
    simchat_torah: 'Simchat Toráh',
    chanukah: 'Chanukáh',
    purim: 'Purim',
    shushan_purim: 'Shushan Purim',
    tu_bishvat: "Tu BiShvat",
    tu_beav: "Tu B'Av",
    lag_baomer: "Lag BaOmer",
    tisha_beav: "Tisháh B'Av",
    shiv_asar_tammuz: 'Shiv\u2018ah Asar BeTamuz',
    fast_of_gedaliah: 'Tsom Gedalyah',
    fast_of_esther: 'Tsom Esther',
    tenth_of_tevet: 'Asaráh BeTevet',
    rosh_chodesh: 'Rosh Chódesh',
    yom_haatzmaut: "Yom Ha'atzmaut",
    yom_hashoah: 'Yom haShoah',
    yom_hazikaron: 'Yom haZikaron',
    yom_yerushalayim: 'Yom Yerushalayim',
  }
  return MAP[key]
}

function holidayExplanation(key: NonNullable<HolidayKey>): string {
  const MAP: Record<NonNullable<HolidayKey>, string> = {
    pesach: 'Festa da libertação do Egito. Noite do Seder, Matsot e relato do Êxodo.',
    chol_hamoed_pesach: 'Dias intermediários de Pesach. Continuam Matsot e leituras especiais.',
    shavuot: 'Entrega da Toráh no Sinai. Estudo noturno (Tikun Leil) e leitura de Rut.',
    rosh_hashana: 'Ano Novo. Sopro do Shofar, soberania divina e introspecção.',
    yom_kippur: 'Dia do Perdão. Jejum, oração contínua e teshuvah.',
    sukkot: 'Festa dos Tabernáculos. Sete dias na Sucá, alegria e hospitalidade.',
    chol_hamoed_sukkot: 'Dias intermediários de Sukkot. Sucá, lulav e arbaat haminim.',
    shemini_atzeret: 'Oitavo dia de assembleia. Pedido por chuvas (Tefilat Geshem).',
    simchat_torah: 'Encerramento e reinício do ciclo anual da Toráh. Hakafot.',
    chanukah: 'Festa das luzes. Acendimento da Chanukiá, agradecimento pelo milagre.',
    purim: 'Salvação no tempo de Mordechai e Ester. Meguiláh, mishloach manot.',
    shushan_purim: 'Purim em cidades muradas (Yerushalayim).',
    tu_bishvat: 'Ano novo das árvores. Frutos de Eretz Israel.',
    tu_beav: 'Dia de alegria, união e reconciliação em Israel.',
    lag_baomer: '33º dia do Omer. Hilulá de Rabi Shim‘on bar Yochai.',
    tisha_beav: 'Jejum e luto pela destruição dos Batei Mikdash.',
    shiv_asar_tammuz: 'Jejum que abre as três semanas de luto.',
    fast_of_gedaliah: 'Jejum em memória do assassinato de Gedalyah.',
    fast_of_esther: 'Jejum em memória do jejum decretado por Ester antes de Purim.',
    tenth_of_tevet: 'Jejum em memória do cerco de Yerushalayim.',
    rosh_chodesh: 'Início de um novo mês hebraico. Halel parcial e Mussaf especial.',
    yom_haatzmaut: 'Dia da Independência do Estado de Israel (1948).',
    yom_hashoah: 'Memória das vítimas da Sho‘ah.',
    yom_hazikaron: 'Memória dos caídos pela defesa de Israel.',
    yom_yerushalayim: 'Reunificação de Yerushalayim (1967).',
  }
  return MAP[key]
}

function buildChanukahInfo(ev: Event | null): string {
  // O @hebcal/core descreve cada dia como "Chanukah: N Candles".
  const m = ev?.getDesc()?.match(/(\d+)\s*Candle/i)
  if (m) return chanukahPhrase(Number(m[1]))
  return 'Chanukáh: acender as velas após o pôr do sol, da direita para a esquerda; a vela mais nova é acesa primeiro.'
}

function chanukahPhrase(day: number): string {
  const d = Math.min(Math.max(day, 1), 8)
  return `Dia ${d} de 8. Acender ${d} vela${d === 1 ? '' : 's'} mais o shamash. Posicionar da direita para a esquerda; acender da vela mais nova para a mais antiga.`
}

function buildBrachaInfo(key: HolidayKey, ev: Event | null): string {
  if (!key) return ''
  if (key === 'chanukah') {
    return ev?.basename()?.includes('1 Candle') || ev?.getDesc()?.includes('1 Candle')
      ? 'Lehadlik Ner shel Chanukáh · She’asá Nissim · Shehecheyánu.'
      : 'Lehadlik Ner shel Chanukáh · She’asá Nissim.'
  }
  if (
    key === 'pesach' ||
    key === 'shavuot' ||
    key === 'rosh_hashana' ||
    key === 'sukkot' ||
    key === 'shemini_atzeret' ||
    key === 'simchat_torah'
  ) {
    return 'Kiddush de Yom Tov (com Shehecheyánu na primeira noite).'
  }
  if (
    key === 'yom_kippur' ||
    key === 'tisha_beav' ||
    key === 'shiv_asar_tammuz' ||
    key === 'fast_of_esther' ||
    key === 'fast_of_gedaliah' ||
    key === 'tenth_of_tevet'
  ) {
    return 'Dia de jejum: tefilot e selichot conforme o minhag.'
  }
  return ''
}

// =============================================================================
// SEFIRÁ DO OMER, SEMANAS-DIAS, TEHILIM, PIRKEI
// =============================================================================

function sefiraOfOmer(day: number): string {
  if (day < 1 || day > 49) return ''
  const inner = (day - 1) % 7
  const outer = Math.floor((day - 1) / 7)
  return `${SEFIROT[inner]} shebe${SEFIROT[outer]}`
}

function weeksDaysLabel(day: number): string {
  const weeks = Math.floor(day / 7)
  const days = day % 7
  if (weeks === 0) return `${days} dia${days === 1 ? '' : 's'}`
  if (days === 0) return `${weeks} semana${weeks === 1 ? '' : 's'} completa${weeks === 1 ? '' : 's'}`
  return `${weeks} semana${weeks === 1 ? '' : 's'} e ${days} dia${days === 1 ? '' : 's'}`
}

function buildTehilimSuggestion(hDate: HDate): string {
  const cap =
    ((hDate.getDate() * 13 + hDate.getMonth() * 7) % 150) + 1
  return `Tehilim sugerido: Salmo ${cap} (rotação devocional simples).`
}

const PIRKEI_FRASES = [
  'Sobre três pilares o mundo permanece: a Toráh, o serviço e a gemilut chasadim (Pirkei Avot 1:2).',
  'Quem é sábio? Aquele que aprende com toda pessoa (Pirkei Avot 4:1).',
  'Não te separes da comunidade (Pirkei Avot 2:4).',
  'Em lugar onde não há homens, esforça-te para ser homem (Pirkei Avot 2:6).',
  'Faze da Toráh a tua ocupação permanente (Pirkei Avot 1:15).',
  'Quem honra os outros? Aquele que honra as criaturas (Pirkei Avot 4:1).',
]

function pickPirkeiFrase(hebrewDay: number): string {
  return PIRKEI_FRASES[hebrewDay % PIRKEI_FRASES.length]
}

// =============================================================================
// ZMANIM — PÔR DO SOL SP
// =============================================================================

function computeSunsetSaoPaulo(civil: Date): string {
  try {
    const z = new Zmanim(SAO_PAULO_LOCATION, civil, false)
    const sunset = z.sunset()
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: SITE_CIVIL_TIMEZONE,
      hour12: false,
    }).format(sunset)
  } catch {
    return 'indisponível'
  }
}

// =============================================================================
// SEASON — paleta sazonal
// =============================================================================

function computeSeason(args: {
  isShabbat: boolean
  holidayKey: HolidayKey
  omerDay: number
  hebrewMonth: number
  hebrewDay: number
  holidayEvent: Event | null
}): LiturgicalSeason {
  const { isShabbat, holidayKey, omerDay, hebrewMonth, hebrewDay, holidayEvent } = args

  if (isShabbat) return 'shabbat'

  if (holidayKey === 'chanukah') return 'chanukah'

  // Tishrei 1–10: Yamim Noraim (Rosh Hashanah até Yom Kippur)
  // Em @hebcal/hdate, Tishrei = month 7.
  if (hebrewMonth === 7 && hebrewDay >= 1 && hebrewDay <= 10) {
    return 'yamim_noraim'
  }

  // Yom Tov “forte” (Pesach 1/última, Shavuot, Sukkot 1ª, Shmini Atzeret, Simchat Toráh, Rosh Hashanah, Yom Kippur)
  if (
    holidayKey === 'pesach' ||
    holidayKey === 'shavuot' ||
    holidayKey === 'rosh_hashana' ||
    holidayKey === 'yom_kippur' ||
    holidayKey === 'sukkot' ||
    holidayKey === 'shemini_atzeret' ||
    holidayKey === 'simchat_torah'
  ) {
    return 'yom_tov'
  }

  if (holidayKey === 'chol_hamoed_pesach' || holidayKey === 'chol_hamoed_sukkot') {
    return 'chol_hamoed'
  }

  if (
    holidayKey === 'tisha_beav' ||
    holidayKey === 'shiv_asar_tammuz' ||
    holidayKey === 'fast_of_esther' ||
    holidayKey === 'fast_of_gedaliah' ||
    holidayKey === 'tenth_of_tevet'
  ) {
    return 'fast'
  }

  if (omerDay > 0) return 'omer'

  // Tishrei (fora do bloco 1–10): luz suave
  if (hebrewMonth === 7) return 'tishrei'

  // Nissan: vinho suave (memória do Êxodo)
  if (hebrewMonth === 1) return 'nissan'

  if (holidayEvent) {
    // qualquer outro chag/menor sem se encaixar acima
    return 'yom_tov'
  }

  return 'default'
}

// =============================================================================
// UPCOMING — gera próximas datas dinamicamente para o sidebar
// =============================================================================

export interface UpcomingEvent {
  isoDate: string // YYYY-MM-DD (data civil em SP)
  dateLabel: string // "13 Iyar 5786"
  title: string
  hebrew: string
  category: 'chag' | 'fast' | 'rosh_chodesh' | 'modern' | 'minor'
  daysUntil: number
}

export function getUpcomingEvents(
  fromDate: Date = new Date(),
  count = 8,
  monthsAhead = 6,
): UpcomingEvent[] {
  const from = toCivilNoon(fromDate)
  const to = new Date(from)
  to.setMonth(to.getMonth() + monthsAhead)

  const events = HebrewCalendar.calendar({
    start: new HDate(from),
    end: new HDate(to),
    isHebrewYear: false,
    sedrot: false,
    omer: false,
    candlelighting: false,
    il: false,
    locale: 'en',
  })

  const seenKeys = new Set<string>()
  const upcoming: UpcomingEvent[] = []

  for (const ev of events) {
    const mask = ev.getFlags()
    const isInteresting =
      mask & flags.CHAG ||
      mask & flags.MAJOR_FAST ||
      mask & flags.MINOR_FAST ||
      mask & flags.MODERN_HOLIDAY ||
      mask & flags.MINOR_HOLIDAY ||
      mask & flags.ROSH_CHODESH
    if (!isInteresting) continue

    const hd = ev.getDate()
    const greg = hd.greg()

    // Ignora eventos no passado
    if (greg.getTime() < from.getTime()) continue

    // Dedup por dia + basename (Pesach 8 dias → 1 entrada)
    const base = ev.basename()
    const key = `${greg.toISOString().slice(0, 10)}_${base}`
    if (seenKeys.has(`${base}__${monthsTag(greg)}`)) continue

    let category: UpcomingEvent['category'] = 'minor'
    if (mask & flags.CHAG) category = 'chag'
    else if (mask & (flags.MAJOR_FAST | flags.MINOR_FAST)) category = 'fast'
    else if (mask & flags.ROSH_CHODESH) category = 'rosh_chodesh'
    else if (mask & flags.MODERN_HOLIDAY) category = 'modern'

    const monthPt = MONTHS_PT[hd.getMonthName()] ?? hd.getMonthName()

    const msPerDay = 1000 * 60 * 60 * 24
    const daysUntil = Math.round((greg.getTime() - from.getTime()) / msPerDay)

    upcoming.push({
      isoDate: greg.toISOString().slice(0, 10),
      dateLabel: `${hd.getDate()} ${monthPt} ${hd.getFullYear()}`,
      title: normalizeSephardicText(ev.render('en')),
      hebrew: ev.render('he'),
      category,
      daysUntil,
    })

    seenKeys.add(key)
    seenKeys.add(`${base}__${monthsTag(greg)}`)
    if (upcoming.length >= count) break
  }

  return upcoming
}

function monthsTag(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}`
}

// =============================================================================
// UTILIDADES
// =============================================================================

function getDayOfWeekInBrazil(d: Date): number {
  const s = new Intl.DateTimeFormat('en-US', {
    timeZone: SITE_CIVIL_TIMEZONE,
    weekday: 'short',
  }).format(d)
  const map: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }
  return map[s] ?? d.getDay()
}

function normalizeSephardicText(value: string): string {
  return value
    .replaceAll('Shavuos', 'Shavuot')
    .replaceAll('Shabbos', 'Shabbat')
    .replaceAll('Succos', 'Sukkot')
    .replaceAll('Sukkos', 'Sukkot')
    .replaceAll('Tzom', 'Jejum')
    .replaceAll('Teves', 'Tevet')
    .replaceAll('Cheshvan', 'Heshvan')
    .replaceAll('Shevat', 'Shvat')
    .replaceAll('Bereshis', 'Bereshit')
    .replaceAll('Shemos', 'Shemot')
    .replaceAll('Eikev', 'Ekev')
    .replaceAll('Ki Savo', 'Ki Tavo')
    .replaceAll('Ki Seitzei', 'Ki Tetze')
    .replaceAll('Achrei Mos', 'Acharei Mot')
    .replaceAll('Bechukosai', 'Bechukotai')
    .replaceAll('Matos', 'Matot')
}
