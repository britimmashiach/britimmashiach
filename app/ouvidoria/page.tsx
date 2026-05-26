import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquareHeart } from 'lucide-react'
import { connection } from 'next/server'
import { FeedbackForm } from '@/components/ui/FeedbackForm'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbJsonLd } from '@/lib/json-ld'
import { getPublicSiteOrigin } from '@/lib/public-site-url'
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase-server'

const origin = getPublicSiteOrigin()

export const metadata: Metadata = {
  title: 'Ouvidoria',
  description:
    'Envie sugestões, opiniões ou reclamações sobre a plataforma Brit Im Mashiach e a congregação em Franca SP.',
  alternates: { canonical: `${origin}/ouvidoria` },
  openGraph: {
    url: `${origin}/ouvidoria`,
    title: 'Ouvidoria | Brit Im Mashiach',
    description: 'Canal aberto para sugestões, opiniões e reclamações da comunidade.',
    locale: 'pt_BR',
  },
}

export default async function OuvidoriaPage() {
  await connection()

  let defaultEmail: string | null = null
  let defaultName: string | null = null

  if (hasSupabaseServerEnv()) {
    try {
      const supabase = await createServerSupabaseClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        defaultEmail = user.email ?? null
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', user.id)
          .maybeSingle()
        defaultName = profile?.full_name ?? null
        if (!defaultEmail && profile?.email) defaultEmail = profile.email
      }
    } catch {
      // página pública funciona sem sessão
    }
  }

  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Ouvidoria', path: '/ouvidoria' },
  ]

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />

      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquareHeart className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Comunidade
          </span>
        </div>
        <h1 className="section-title">Ouvidoria</h1>
        <p className="section-subtitle max-w-xl">
          Espaço aberto para sugestões, opiniões e reclamações sobre o site, os estudos e a vida da
          congregação. Sua voz ajuda a Brit Im Mashiach a crescer com escuta e respeito.
        </p>
      </div>

      <FeedbackForm defaultEmail={defaultEmail} defaultName={defaultName} />

      <p className="mt-8 text-sm font-inter text-warmgray-500 text-center leading-relaxed">
        Prefere falar pessoalmente? Converse com o Rav EBBY após os cultos ou veja{' '}
        <Link href="/sobre" className="text-gold-600 dark:text-gold-400 hover:underline">
          quem somos
        </Link>
        .
      </p>
    </div>
  )
}
