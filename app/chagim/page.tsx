import type { Metadata } from 'next'
import { fetchChagim } from '@/lib/chagim-supabase'
import { ChagimClient } from '@/components/chagim/ChagimClient'

export const metadata: Metadata = {
  title: 'Chagim',
  description: 'Festividades do calendário judaico com estudo estruturado, análise PaRDeS e PDFs.',
}

// Evita pré-render estático no `next build` quando as env vars do Supabase
// ainda não estão disponíveis no CI (o cliente @supabase/ssr exige URL e key).
export const dynamic = 'force-dynamic'

export default async function ChagimPage() {
  const chagim = await fetchChagim()
  return (
    <div className="container mx-auto px-4 py-10">
      <ChagimClient chagim={chagim} />
    </div>
  )
}
