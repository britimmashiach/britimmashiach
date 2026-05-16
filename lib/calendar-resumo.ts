/**
 * Resumo diario do calendario: leituras, halachot, Tehilim haYom,
 * Pirke Avot enriquecido, ensinos rotativos por chachamin.
 */
import type { DayInfo, HolidayKey } from '@/lib/hebrew-date'

/** Divisao comum dos 150 Salmos em 30 dias (mes lunar pleno). */
const TEHILIM_HAYOM_DAY: Record<number, string> = {
  1: 'Salmos 1 a 9',
  2: 'Salmos 10 a 17',
  3: 'Salmos 18 a 22',
  4: 'Salmos 23 a 28',
  5: 'Salmos 29 a 34',
  6: 'Salmos 35 a 38',
  7: 'Salmos 39 a 43',
  8: 'Salmos 44 a 48',
  9: 'Salmos 49 a 54',
  10: 'Salmos 55 a 59',
  11: 'Salmos 60 a 65',
  12: 'Salmos 66 a 72',
  13: 'Salmos 73 a 76',
  14: 'Salmos 77 e 78',
  15: 'Salmos 79 a 82',
  16: 'Salmos 83 a 87',
  17: 'Salmos 88 e 89',
  18: 'Salmos 90 a 96',
  19: 'Salmos 97 a 103',
  20: 'Salmos 104 e 105',
  21: 'Salmos 106 e 107',
  22: 'Salmos 108 a 112',
  23: 'Salmos 113 a 118',
  24: 'Salmo 119 inteiro',
  25: 'Salmos 120 a 134',
  26: 'Salmos 135 a 139',
  27: 'Salmos 140 a 150',
  28: 'Salmos 1 a 9 (ate o proximo Rosh Chodesh)',
  29: 'Salmos 10 a 17',
  30: 'Salmos 18 a 22',
}

export type SodSnippet = {
  chacham: string
  tema: string
  texto: string
}

const SNIP_AVOT: SodSnippet[] = [
  {
    chacham: 'Tradicao luminosa ligada ao Zohar',
    tema: 'Middot e vestimenta espiritual da Toráh',
    texto:
      'A Toráh se faz morada onde o coração refina comportamento cotidiano. Mansidão, temor santificado e emet prática abrigam a Presenca santificadora no servico vivo.',
  },
  {
    chacham: 'Ramchal, Messilat Yesharim',
    tema: 'Escada ordenada ate a santidade',
    texto:
      'Ha degraus: vigilancia, zelo bem medido e abstencao proporcionada antes de grandes promessas interiores. Quem salta um nivel sem base fragiliza o tabuleiro inteiro.',
  },
  {
    chacham: 'Rabi Ishak Luria, via tradicao dos estudantes',
    tema: 'Kavaná firma fluxo ascendente',
    texto:
      'Mitsvá com direcao consciente abre fluxo ascendente mesmo quando a razao oculta ainda nao se revelou inteira aos sentidos externos.',
  },
  {
    chacham: 'Baal Shem Tov, linhas hassidicas classicas',
    tema: 'Pensamento puro bem colocado',
    texto:
      'Um pensamento sincero diante do Criador, ligado ao servico humilde do dia, pode elevar tal qual preparacao extensa, quando o coracao permanece presente.',
  },
  {
    chacham: 'Levi Ishaj de Berditchev',
    tema: 'Mérito do proximo e halachá comunitária',
    texto:
      'Quem busca mérito no outro sustenta tikun coletivo. A Toráh humana se confirma primeiro no encontro cara a cara santificado.',
  },
  {
    chacham: 'Raban Moshe Cordovero, Pardes Rimonim',
    tema: 'Sefirot e postura interior',
    texto:
      'Ordenar interiormente reflete harmonizacao nas emanacoes vestidas no dia. Corrigir um traco grosseiro abre retorno de luz na medida correspondente.',
  },
]

const SNIP_TEHILIM: SodSnippet[] = [
  {
    chacham: 'Tradicao zohárica (linha oral)',
    tema: 'Salmos como instrumento de elevacao',
    texto:
      'Palavras de louvor ditas com intencao e compaixao ativa ordenam letras segundo medida superior, ate que o clamor terreno vire veiculo da Shechináh.',
  },
  {
    chacham: 'Escola luriana compilada',
    tema: 'Nitzotzot e murmurio devoto',
    texto:
      'Até voz baixa bem direcionada recolhe faiscas dispersas. Tehilim diario atua sobre nitzotzot perdidos até reintegrá-los ao serviço atual vestido segundo halachá.',
  },
  {
    chacham: 'Rambam, hilchot tefilah',
    tema: 'Ideias claras ante Aquele que tudo vé',
    texto:
      'Coração e significado conscientes ante o Diante de Quem ora preparam habitacao íntima para a Presenca na prática seguinte do mesmo dia.',
  },
  {
    chacham: 'Aggadá sobre David haMelech',
    tema: 'Esperanca desde profundezas',
    texto:
      'Projeta esperanca consciente mesmo em ruptura: cria ponte entre mundo quebrado e raiz primeira, ensinamento tradicional do ciclo davidico dos salmos.',
  },
  {
    chacham: 'Sefer haBahir, leitura cabalística posterior',
    tema: 'Middot antes da medida verbal',
    texto:
      'Nao basta acumular versiculos: qualidade moral ordenada permite que estruturas interiores alinhem com o ciclo luminoso do trecho recitado hoje.',
  },
]

const SNIP_EXTRA: SodSnippet[] = [
  {
    chacham: 'Mussar classico',
    tema: 'Emet e tempo santificado',
    texto:
      'Honrar horarios combinados de estudo brit e retorno humilde quando a halachá pede correcao vestem o tempo com santidade prática coletiva.',
  },
  {
    chacham: 'Temas do Sfat Emet (compilacao moderna)',
    tema: 'Cada dia, proporcao propria de tikun',
    texto:
      'Dia simples tambem traz medida celeste especifica. Atenção santificadora revela qual serviço comum, bem intencionado, sobe naquela janela.',
  },
  {
    chacham: 'Ramban, leitura cabalística tradicional',
    tema: 'Porta humilde e segunda luz',
    texto:
      'Revelacao busca entrada humilde: pequenos retornos bem colocados fazem brotar proporcao maior de luz segundo o comportamento consciente publico seguinte.',
  },
]

function pickMod(parts: number[], modulo: number): number {
  if (modulo <= 0) return 0
  let h = 0
  for (const p of parts) {
    h = (h * 31 + Math.abs(p | 0)) % 1_000_000_007
  }
  return h % modulo
}

function snippet(pool: SodSnippet[], seed: number): SodSnippet {
  return pool[pickMod([seed], pool.length)]!
}

/** Dia do mes hebreu: clamp 1-30 para tabela corta completa mes. */
export function tehilimHaYomRange(hebrewDay: number): string {
  const d = Math.min(Math.max(hebrewDay, 1), 30)
  return (
    TEHILIM_HAYOM_DAY[d] ??
    `Reparticao do dia ${d} conforme minhague da comunidade junto ao Rav`
  )
}

/** Domingo primeira aliyah ate sexta sexta (ciclo semanal comum). */
const ALIYAH_DOW: Record<number, { pt: string; n: number }> = {
  0: { pt: 'Domingo, Yom Rishon', n: 1 },
  1: { pt: 'Segunda, Yom Sheni', n: 2 },
  2: { pt: 'Terca, Yom Shlishi', n: 3 },
  3: { pt: 'Quarta, Yom Revií', n: 4 },
  4: { pt: 'Quinta, Yom Chamishi', n: 5 },
  5: { pt: 'Sexta, Yom Shishi', n: 6 },
}

const FAST = new Set<HolidayKey>([
  'yom_kippur',
  'tisha_beav',
  'shiv_asar_tammuz',
  'fast_of_esther',
  'fast_of_gedaliah',
  'tenth_of_tevet',
])

const YOM_TOV = new Set<HolidayKey>([
  'pesach',
  'shavuot',
  'rosh_hashana',
  'sukkot',
  'shemini_atzeret',
  'simchat_torah',
])

function leiturasBullets(info: DayInfo): string[] {
  const r: string[] = []
  if (info.parsha) {
    if (info.isShabbat) {
      r.push(
        `Shabat: leitura publica completa da sedrá ${info.parsha} em sete aliyot, segundo o ciclo fixado pelo calendario comunitario e orientacao do Rav da Brit Im Mashiach.`,
      )
      r.push(
        `Haftaráh do Shabat segue a sedrá do ciclo; detalhes na pagina da parashá na plataforma quando publicada.`,
      )
    } else {
      const m = ALIYAH_DOW[info.dayOfWeek]
      if (m) {
        r.push(
          `${m.pt}: costuma corresponder ao trecho da ${m.n}ª aliyah da sedrá semanal ${info.parsha} antes do proximo Shabat (ordem da sinagoga).`,
        )
      } else {
        r.push(`Sedrá da semana: ${info.parsha}. Confirme aliyah do dia com o ciclo impresso ou com o Rav.`)
      }
    }
  } else if (info.isShabbat) {
    r.push(
      `Shabat sem sedrá listada pelo Hebcal para esta data (parashá especial ou transicao). Confirme com o calendario fisico da congregacao.`,
    )
  } else {
    r.push(`Consulte o material impresso da Brit Im Mashiach para aliyot e leituras extras desta data.`)
  }
  if (info.holidayKey && info.holidayName) {
    r.push(`Leitura propria de ${info.holidayName} na ordem do humash e machzor segundo o minhague autorizado.`)
  }
  return r
}

function halachotBullets(info: DayInfo): string[] {
  const h: string[] = []
  if (info.isShabbat) {
    h.push(
      `Shabat: abstencao das trinta e nove categorias de melachot. Kiddush e refeicao santificada conforme minhague. Saida apos tres estrelas visiveis e Havdalá.`,
    )
    return h
  }
  if (info.holidayKey && FAST.has(info.holidayKey)) {
    h.push(
      `Jejum: do amanhecer (hanetz) ate a noite clara. Use os horarios de nascer e por do sol deste painel como referencia local.`,
    )
    h.push(`Tefilah com penitencias e leituras proprias do dia de jejum segundo o minhague sefaradita da Brit Im Mashiach.`)
    return h
  }
  if (info.holidayKey && YOM_TOV.has(info.holidayKey)) {
    h.push(
      `Yom Tov: em muitos aspectos como Shabat quanto a melachot; cozinha e fogo tem regras proprias ensinadas em aula com o Rav.`,
    )
    return h
  }
  if (info.holidayKey === 'chanukah') {
    h.push(`Acenda a menorá apos a saida das estrelas na localidade; brachot Lehadlik Ner shel Chanucá conforme o dia.`)
    return h
  }
  if (info.holidayKey === 'rosh_chodesh') {
    h.push(`Rosh Chodesh: Halel parcial, Musaf proprio, costume de refeicao reforcada leve segundo minhague.`)
    return h
  }
  if (info.omerDay > 0) {
    h.push(
      `Sefirat haOmer: contar apos a noite estabelecida, em pe, com brachá anterior. Respeite restricoes comunitárias do periodo conforme aviso do Rav.`,
    )
  }
  if (h.length === 0) {
    h.push(`Dia hol: trabalho permitido; ore Shacharit, Minchá e Arvit com kavaná. Estudo diario de Toráh sustenta tikun pessoal e coletivo.`)
  }
  return h
}

export type CalendarResumoBundle = {
  leituras: string[]
  halachot: string[]
  tehilimHaYom: string
  pirkeiTexto: string
  sodPirkei: SodSnippet
  sodTehilim: SodSnippet
  sodExtra: SodSnippet
}

export function buildCalendarResumo(info: DayInfo): CalendarResumoBundle {
  const seed =
    info.hebrewDay * 997 +
    info.hebrewYear * 3 +
    info.omerDay * 61 +
    info.dayOfWeek * 17 +
    (info.hebrewMonth?.length ?? 0)
  return {
    leituras: leiturasBullets(info),
    halachot: halachotBullets(info),
    tehilimHaYom: tehilimHaYomRange(info.hebrewDay),
    pirkeiTexto: info.pirkeiFrase,
    sodPirkei: snippet(SNIP_AVOT, seed),
    sodTehilim: snippet(SNIP_TEHILIM, seed + 19),
    sodExtra: snippet(SNIP_EXTRA, seed + 41),
  }
}
