export type KehilahEventType = 'culto' | 'estudo' | 'live' | 'moed' | 'outro'

export type KehilahEvent = {
  id: string
  title: string
  description: string
  eventType: KehilahEventType
  startsAt: string
  endsAt: string | null
  location: string
  liveUrl: string | null
}

export type KehilahTestimonial = {
  id: string
  authorDisplayName: string
  body: string
  city: string | null
  isFeatured: boolean
}
