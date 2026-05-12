import type { Metadata } from 'next'
import { GraduationCap } from 'lucide-react'
import { StudiesClient } from '@/components/library/StudiesClient'
import { fetchStudies } from '@/lib/studies-supabase'

export const metadata: Metadata = {
  title: 'Estudos',
  description: 'Ensinos aprofundados de Kabaláh, Toráh, Moedim, Tehilim e Halacháh pelo Rav Eliahu Barzilay.',
  openGraph: {
    title: 'Estudos | Brit Mashiach',
    description: 'Beit Midrash digital: estudos de Kabaláh Luriana, Toráh e espiritualidade messiânica.',
  },
}

export default async function StudiesPage() {
  const studies = await fetchStudies()

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 space-y-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-gold-500" aria-hidden="true" />
          <span className="text-xs font-inter font-semibold text-warmgray-500 uppercase tracking-widest">
            Beit Midrash
          </span>
        </div>
        <h1 className="section-title">Estudos</h1>
        <p className="section-subtitle max-w-xl">
          Ensinos do Rav Eliahu Barzilay ben Yehoshua em Kabaláh Luriana, Toráh e espiritualidade messiânica.
        </p>
      </div>

      <StudiesClient studies={studies} />
    </div>
  )
}
