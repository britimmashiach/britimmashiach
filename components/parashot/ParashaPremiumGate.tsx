import { getParashaTitle } from '@/lib/parashot-registry'
import { PremiumGate } from '@/components/ui/PremiumGate'

interface ParashaPremiumGateProps {
  slug: string
}

/** Wrapper que reutiliza o PremiumGate genérico para a Parasháh. */
export function ParashaPremiumGate({ slug }: ParashaPremiumGateProps) {
  const title = getParashaTitle(slug)

  return (
    <PremiumGate
      title={title}
      description="O estudo completo desta Parasháh (incluindo aliyot e materiais reservados) é exclusivo para assinantes Premium. O link pelo calendário ou pela lista leva aqui até você ativar o plano."
      backHref="/parashot"
      backLabel="Todas as Parashot"
    />
  )
}
