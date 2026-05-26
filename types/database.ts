export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'free' | 'premium' | 'admin'
          is_leader: boolean
          leader_since: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          mp_subscription_id: string | null
          asaas_customer_id: string | null
          asaas_pix_authorization_id: string | null
          asaas_subscription_id: string | null
          cpf_cnpj: string | null
          subscription_status: 'active' | 'canceled' | 'past_due' | null
          subscription_current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'free' | 'premium' | 'admin'
          is_leader?: boolean
          leader_since?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          mp_subscription_id?: string | null
          asaas_customer_id?: string | null
          asaas_pix_authorization_id?: string | null
          asaas_subscription_id?: string | null
          cpf_cnpj?: string | null
          subscription_status?: 'active' | 'canceled' | 'past_due' | null
          subscription_current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'free' | 'premium' | 'admin'
          is_leader?: boolean
          leader_since?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          mp_subscription_id?: string | null
          asaas_customer_id?: string | null
          asaas_pix_authorization_id?: string | null
          asaas_subscription_id?: string | null
          cpf_cnpj?: string | null
          subscription_status?: 'active' | 'canceled' | 'past_due' | null
          subscription_current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      shop_products: {
        Row: {
          id: string
          slug: string
          name: string
          description: string
          price_cents: number
          category: string
          image_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string
          price_cents: number
          category?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string
          price_cents?: number
          category?: string
          image_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      leader_modules: {
        Row: {
          id: string
          slug: string
          month_num: number
          stage: number
          stage_label: string
          title: string
          subtitle: string | null
          excerpt: string
          content: string
          is_published: boolean
          reading_time_minutes: number
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          month_num: number
          stage: number
          stage_label: string
          title: string
          subtitle?: string | null
          excerpt?: string
          content?: string
          is_published?: boolean
          reading_time_minutes?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          month_num?: number
          stage?: number
          stage_label?: string
          title?: string
          subtitle?: string | null
          excerpt?: string
          content?: string
          is_published?: boolean
          reading_time_minutes?: number
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      studies: {
        Row: {
          id: string
          slug: string
          title: string
          title_hebrew: string | null
          category: string
          content: string
          excerpt: string
          is_premium: boolean
          author: string
          reading_time_minutes: number
          tags: string[]
          published_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          title_hebrew?: string | null
          category: string
          content: string
          excerpt: string
          is_premium?: boolean
          author: string
          reading_time_minutes?: number
          tags?: string[]
          published_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          title_hebrew?: string | null
          category?: string
          content?: string
          excerpt?: string
          is_premium?: boolean
          author?: string
          reading_time_minutes?: number
          tags?: string[]
          published_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      parashot: {
        Row: {
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
          pdf_url: string | null
          pdf_premium_url: string | null
          pdf_kabbalah_url: string | null
          published_at: string
        }
        Insert: {
          id?: string
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
          is_premium?: boolean
          pdf_url?: string | null
          pdf_premium_url?: string | null
          pdf_kabbalah_url?: string | null
          published_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          name_hebrew?: string
          book?: string
          week_number?: number
          haftarah?: string
          haftarah_hebrew?: string
          summary?: string
          peshat?: string
          remez?: string
          drash?: string
          sod?: string
          is_premium?: boolean
          pdf_url?: string | null
          pdf_premium_url?: string | null
          pdf_kabbalah_url?: string | null
          published_at?: string
        }
        Relationships: []
      }
      aliyot: {
        Row: {
          id: string
          parasha_id: string
          aliyah_number: number
          day_of_week: number
          title: string
          content: string
          level_pardes: string[] | null
          pdf_url: string | null
          pdf_premium_url: string | null
          pdf_kabbalah_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          parasha_id: string
          aliyah_number: number
          day_of_week: number
          title: string
          content: string
          level_pardes?: string[] | null
          pdf_url?: string | null
          pdf_premium_url?: string | null
          pdf_kabbalah_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          parasha_id?: string
          aliyah_number?: number
          day_of_week?: number
          title?: string
          content?: string
          level_pardes?: string[] | null
          pdf_url?: string | null
          pdf_premium_url?: string | null
          pdf_kabbalah_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'aliyot_parasha_id_fkey'
            columns: ['parasha_id']
            referencedRelation: 'parashot'
            referencedColumns: ['id']
          }
        ]
      }
      chagim: {
        Row: {
          id: string
          slug: string
          name: string
          name_hebrew: string
          category: string
          month_hebrew: string | null
          day_start: number | null
          duration_days: number
          summary: string
          content: string
          level_pardes: string[] | null
          is_premium: boolean
          pdf_url: string | null
          pdf_premium_url: string | null
          pdf_kabbalah_url: string | null
          published_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          name_hebrew: string
          category: string
          month_hebrew?: string | null
          day_start?: number | null
          duration_days?: number
          summary: string
          content?: string
          level_pardes?: string[] | null
          is_premium?: boolean
          pdf_url?: string | null
          pdf_premium_url?: string | null
          pdf_kabbalah_url?: string | null
          published_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          name_hebrew?: string
          category?: string
          month_hebrew?: string | null
          day_start?: number | null
          duration_days?: number
          summary?: string
          content?: string
          level_pardes?: string[] | null
          is_premium?: boolean
          pdf_url?: string | null
          pdf_premium_url?: string | null
          pdf_kabbalah_url?: string | null
          published_at?: string
        }
        Relationships: []
      }
      chag_sections: {
        Row: {
          id: string
          chag_id: string
          order_num: number
          title: string
          content: string
          level_pardes: string[] | null
          is_premium: boolean
          pdf_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          chag_id: string
          order_num: number
          title: string
          content: string
          level_pardes?: string[] | null
          is_premium?: boolean
          pdf_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          chag_id?: string
          order_num?: number
          title?: string
          content?: string
          level_pardes?: string[] | null
          is_premium?: boolean
          pdf_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'chag_sections_chag_id_fkey'
            columns: ['chag_id']
            referencedRelation: 'chagim'
            referencedColumns: ['id']
          }
        ]
      }
      library_books: {
        Row: {
          id: string
          slug: string | null
          title: string
          title_hebrew: string | null
          author: string
          description: string
          category: string
          is_premium: boolean
          file_url: string | null
          cover_url: string | null
          published_year: number | null
          created_at: string
        }
        Insert: {
          id?: string
          slug?: string | null
          title: string
          title_hebrew?: string | null
          author: string
          description: string
          category: string
          is_premium?: boolean
          file_url?: string | null
          cover_url?: string | null
          published_year?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string | null
          title?: string
          title_hebrew?: string | null
          author?: string
          description?: string
          category?: string
          is_premium?: boolean
          file_url?: string | null
          cover_url?: string | null
          published_year?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
