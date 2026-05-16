import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTehilimPerek, listTehilimPerakim } from '@/lib/tehilim-catalog'
import { TehilimPerekClient } from '@/components/tehilim/TehilimPerekClient'

export const dynamicParams = true

export async function generateStaticParams() {
  return listTehilimPerakim().map((p) => ({ perek: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ perek: string }>
}): Promise<Metadata> {
  const { perek: slug } = await params
  const perek = getTehilimPerek(slug)
  if (!perek) return { title: 'Perek não encontrado' }
  return {
    title: `${perek.label} | Tehilim`,
    description: `Passukim em PDF do ${perek.label}, análise PaRDeS Brit Im Mashiach.`,
  }
}

export default async function TehilimPerekPage({
  params,
}: {
  params: Promise<{ perek: string }>
}) {
  const { perek: slug } = await params
  const perek = getTehilimPerek(slug)
  if (!perek) notFound()

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <TehilimPerekClient perek={perek} />
    </div>
  )
}
