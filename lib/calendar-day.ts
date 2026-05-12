import { HDate, HebrewCalendar, flags } from '@hebcal/core'

export type HolidayCategory = 'chag' | 'fast' | 'rosh_chodesh' | 'special' | null

export interface DayInfo {
  date: Date
  hebrewDay: number
  hebrewMonth: string
  hebrewYear: number
  omerDay: number
  holidayName: string
  holidayCategory: HolidayCategory
  sefiraLabel: string
  parasha: string
  brachaInfo: string
  tehilimSuggestion: string
  pirkeiFrase: string
  isShabat: boolean
}

const MONTHS_PT: Record<string, string> = {
  Nisan: 'Nissan', Iyyar: 'Iyar', Sivan: 'Sivan', Tamuz: 'Tamuz',
  Av: 'Av', Elul: 'Elul', Tishrei: 'Tishrei', Cheshvan: 'Cheshvan',
  Kislev: 'Kislev', Tevet: 'Tevet', Shvat: 'Shvat', Adar: 'Adar',
  'Adar I': 'Adar I', 'Adar II': 'Adar II',
}

const SEFIROT = ['Chesed', 'Gevurah', 'Tiferet', 'Netzach', 'Hod', 'Yesod', 'Malchut']

const PIRKEI = [
  'Sobre três pilares o mundo permanece: a Toráh, o serviço e a gemilut chasadim (Avot 1:2).',
  'Quem é sábio? Aquele que aprende com toda pessoa (Avot 4:1).',
  'Não te separes da comunidade (Avot 2:4).',
  'Em lugar onde não há homens, esforça-te para ser homem (Avot 2:6).',
]

export function computeMonthDays(year: number, monthIndex: number): (DayInfo | null)[] {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, monthIndex, 1, 12).getDay()

  const firstHDate = new HDate(new Date(year, monthIndex, 1, 12))
  const lastHDate = new HDate(new Date(year, monthIndex, daysInMonth, 12))

  const events = HebrewCalendar.calendar({
    start: firstHDate,
    end: lastHDate,
    sedrot: true,
    omer: true,
    il: false,
    locale: 'en',
  })

  const byDay = new Map<number, typeof events>()
  for (const ev of events) {
    const g = ev.getDate().greg()
    if (g.getFullYear() === year && g.getMonth() === monthIndex) {
      const d = g.getDate()
      if (!byDay.has(d)) byDay.set(d, [])
      byDay.get(d)!.push(ev)
    }
  }

  const result: (DayInfo | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) result.push(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, monthIndex, d, 12)
    const hDate = new HDate(date)
    const hebrewDay = hDate.getDate()
    const hebrewMonth = MONTHS_PT[hDate.getMonthName()] ?? hDate.getMonthName()
    const hebrewYear = hDate.getFullYear()
    const isShabat = date.getDay() === 6

    let omerDay = 0
    let holidayName = ''
    let holidayCategory: HolidayCategory = null
    let parasha = ''

    for (const ev of byDay.get(d) ?? []) {
      const mask = ev.getFlags()
      if (mask & flags.PARSHA_HASHAVUA) {
        parasha = normalizeParasha(ev.render('en'))
      } else if (mask & flags.OMER_COUNT) {
        const m = ev.render('en').match(/(\d+)/)
        if (m) omerDay = parseInt(m[1])
      } else if (mask & flags.ROSH_CHODESH) {
        if (!holidayCategory) { holidayName = 'Rosh Chódesh'; holidayCategory = 'rosh_chodesh' }
      } else if (mask & (flags.MAJOR_FAST | flags.MINOR_FAST)) {
        holidayName = normalizeHoliday(ev.render('en')); holidayCategory = 'fast'
      } else if (mask & flags.CHAG) {
        if (!holidayCategory || holidayCategory === 'rosh_chodesh') {
          holidayName = normalizeHoliday(ev.render('en')); holidayCategory = 'chag'
        }
      } else if (mask & flags.MINOR_HOLIDAY) {
        if (!holidayCategory) {
          holidayName = normalizeHoliday(ev.render('en')); holidayCategory = 'special'
        }
      } else if (mask & flags.SPECIAL_SHABBAT) {
        if (!holidayName) { holidayName = normalizeHoliday(ev.render('en')); holidayCategory = 'special' }
      }
    }

    let sefiraLabel = ''
    if (omerDay >= 1 && omerDay <= 49) {
      const inner = (omerDay - 1) % 7
      const outer = Math.floor((omerDay - 1) / 7)
      sefiraLabel = `${SEFIROT[inner]} shebe${SEFIROT[outer]}`
    }

    const tehilimNum = ((hebrewDay * 13 + hDate.getMonth() * 7) % 150) + 1

    result.push({
      date,
      hebrewDay,
      hebrewMonth,
      hebrewYear,
      omerDay,
      holidayName,
      holidayCategory,
      sefiraLabel,
      parasha,
      brachaInfo: getBracha(holidayCategory, holidayName),
      tehilimSuggestion: `Tehilim: Salmo ${tehilimNum}`,
      pirkeiFrase: PIRKEI[hebrewDay % PIRKEI.length],
      isShabat,
    })
  }

  return result
}

export function getHebrewMonthLabel(year: number, monthIndex: number): string {
  const first = new HDate(new Date(year, monthIndex, 1, 12))
  const last = new HDate(new Date(year, monthIndex + 1, 0, 12))
  const fm = MONTHS_PT[first.getMonthName()] ?? first.getMonthName()
  const lm = MONTHS_PT[last.getMonthName()] ?? last.getMonthName()
  const fy = first.getFullYear()
  const ly = last.getFullYear()
  if (fm === lm && fy === ly) return `${fm} ${fy}`
  if (fy === ly) return `${fm} - ${lm} ${fy}`
  return `${fm} ${fy} - ${lm} ${ly}`
}

function normalizeHoliday(s: string): string {
  return s
    .replaceAll('Shavuos', 'Shavuot')
    .replaceAll('Shabbos', 'Shabat')
    .replaceAll('Succos', 'Sukkot')
    .replaceAll('Sukkos', 'Sukkot')
    .replaceAll('Tzom', 'Jejum')
    .replaceAll('Teves', 'Tevet')
}

function normalizeParasha(s: string): string {
  return s
    .replace(/^Parashat /, '')
    .replaceAll('Bereshis', 'Bereshit')
    .replaceAll('Shemos', 'Shemot')
    .replaceAll('Eikev', 'Ekev')
    .replaceAll('Ki Savo', 'Ki Tavo')
    .replaceAll('Ki Seitzei', 'Ki Tetze')
    .replaceAll('Achrei Mos', 'Acharei Mot')
    .replaceAll('Bechukosai', 'Bechukotai')
    .replaceAll('Matos', 'Matot')
}

function getBracha(category: HolidayCategory, name: string): string {
  if (!category) return ''
  if (category === 'fast') return 'Tefilot e selichot conforme o minhag.'
  if (category === 'chag') {
    if (name.includes('Chanuk')) return "Lehadlik ner shel Chanukáh e She'asá Nissim."
    return 'Kiddush de Yom Tov (com Shehecheyánu na primeira noite).'
  }
  return ''
}
