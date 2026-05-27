import type { KehilahEvent, KehilahTestimonial } from '@/lib/community-types'

function nextShabatAt(): Date {
  const now = new Date()
  const day = now.getDay()
  const daysUntilShabat = (6 - day + 7) % 7 || 7
  const shabat = new Date(now)
  shabat.setDate(now.getDate() + daysUntilShabat)
  shabat.setHours(9, 30, 0, 0)
  return shabat
}

function nextWednesdayStudy(): Date {
  const now = new Date()
  const day = now.getDay()
  const daysUntilWed = (3 - day + 7) % 7 || 7
  const wed = new Date(now)
  wed.setDate(now.getDate() + daysUntilWed)
  wed.setHours(19, 30, 0, 0)
  return wed
}

/** Dados estáticos quando Supabase ainda não tem a migration ou está vazio. */
export function getFallbackEvents(): KehilahEvent[] {
  const shabatStart = nextShabatAt()
  const shabatEnd = new Date(shabatStart)
  shabatEnd.setHours(12, 30, 0, 0)

  const studyStart = nextWednesdayStudy()
  const studyEnd = new Date(studyStart)
  studyEnd.setHours(21, 0, 0, 0)

  const liveStart = new Date()
  liveStart.setDate(liveStart.getDate() + 14)
  liveStart.setHours(20, 0, 0, 0)

  return [
    {
      id: 'fallback-shabat',
      title: 'Shabat — culto e kiddush',
      description:
        'Toráh, Musaf e comunhão após o culto. Visitantes bem-vindos com respeito ao dress code modesto.',
      eventType: 'culto',
      startsAt: shabatStart.toISOString(),
      endsAt: shabatEnd.toISOString(),
      location: 'Sinagoga Brit Im Mashiach — Franca, SP',
      liveUrl: null,
    },
    {
      id: 'fallback-estudo',
      title: 'Estudo da Parashá — Beit Midrash',
      description: 'Leitura da Aliyáh da semana com PaRDeS na congregação.',
      eventType: 'estudo',
      startsAt: studyStart.toISOString(),
      endsAt: studyEnd.toISOString(),
      location: 'Sinagoga Brit Im Mashiach — Franca, SP',
      liveUrl: null,
    },
    {
      id: 'fallback-live',
      title: 'Aula ao vivo — em breve',
      description:
        'Transmissões do Rav EBBY são anunciadas na kehilah e na plataforma. Cadastre-se para receber aviso.',
      eventType: 'live',
      startsAt: liveStart.toISOString(),
      endsAt: null,
      location: 'Online — Brit Im Mashiach',
      liveUrl: null,
    },
  ]
}

export const FALLBACK_TESTIMONIALS: KehilahTestimonial[] = [
  {
    id: 'fallback-1',
    authorDisplayName: 'Irmã M. — Franca',
    body: 'Encontrar a Brit Im Mashiach devolveu minha fé às raízes hebraicas. O estudo semanal da Parashá com PaRDeS mudou a forma como leio a Toráh e vivo o Shabat em família.',
    city: 'Franca, SP',
    isFeatured: true,
  },
  {
    id: 'fallback-2',
    authorDisplayName: 'Irmão R.',
    body: 'O calendário hebraico e os Chagim na plataforma ajudam quem está longe da sinagoga a permanecer no ciclo. Os portões internos abriram um nível de oração que eu não conhecia.',
    city: null,
    isFeatured: true,
  },
  {
    id: 'fallback-3',
    authorDisplayName: 'Casal D. & S.',
    body: 'Viemos de origem evangélica e fomos recebidos com respeito pastoral. Hoje guardamos kashrut comunitária, estudamos Netivot e servimos na obra com kavanáh.',
    city: 'Ribeirão Preto, SP',
    isFeatured: false,
  },
]
