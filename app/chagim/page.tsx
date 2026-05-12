import type { Metadata } from 'next'
import { fetchChagim } from '@/lib/chagim-supabase'
import { ChagimClient } from '@/components/chagim/ChagimClient'

export const metadata: Metadata = {
  title: 'Chagim',
  description: 'Festividades do calendário judaico com estudo estruturado, análise PaRDeS e PDFs.',
}

export default async function ChagimPage() {
  const chagim = await fetchChagim()
  return (
    <div className="container mx-auto px-4 py-10">
      <ChagimClient chagim={chagim} />
    </div>
  )
}
