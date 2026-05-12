export type UserRole = 'free' | 'premium' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: 'active' | 'canceled' | 'past_due' | null
  created_at: string
  updated_at: string
}

export interface Parasha {
  id: string
  slug: string
  name: string
  name_hebrew: string
  book: string
  week_number: number
  haftarah: string
  haftarah_hebrew: string
  summary: string
  peshat: string
  remez: string
  drash: string
  sod: string
  is_premium: boolean
  published_at: string
}

export interface Study {
  id: string
  slug: string
  title: string
  title_hebrew: string | null
  category: StudyCategory
  content: string
  excerpt: string
  is_premium: boolean
  author: string
  reading_time_minutes: number
  tags: string[]
  published_at: string
  updated_at: string
}

export type StudyCategory =
  | 'kabalah'
  | 'parasha'
  | 'halacha'
  | 'moedim'
  | 'tehilim'
  | 'alef-beit'
  | 'netivot'
  | 'shiur'

export interface HebrewCalendarEvent {
  date: string
  hebrew_date: string
  title: string
  title_hebrew: string
  category: 'moed' | 'shabbat' | 'rosh_chodesh' | 'fast' | 'other'
  description?: string
  is_major: boolean
}

export interface LibraryBook {
  id: string
  title: string
  title_hebrew: string | null
  author: string
  description: string
  category: LibraryCategory
  is_premium: boolean
  file_url: string | null
  cover_url: string | null
  published_year: number | null
}

export type LibraryCategory =
  | 'toráh'
  | 'talmud'
  | 'kabaláh'
  | 'mussar'
  | 'responsa'
  | 'machzor'
  | 'siddur'
  | 'comentário'

export interface OmerDay {
  day: number
  week: number
  day_of_week: number
  sefirah: string
  sefirah_hebrew: string
  combination: string
  meditation: string
}

export interface DailyInspiration {
  id: string
  content: string
  source: string
  source_hebrew: string | null
  category: string
  date: string
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  instructor: string
  thumbnail_url: string | null
  is_premium: boolean
  lessons_count: number
  duration_hours: number
  category: StudyCategory
  published_at: string
}

export interface NavItem {
  label: string
  href: string
  icon?: string
  isPremium?: boolean
  children?: NavItem[]
}
