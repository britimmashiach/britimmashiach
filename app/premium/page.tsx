import type { Metadata } from 'next'
import { Crown, Check, Star, Sparkles, BookOpen, Calendar, Library, Layers } from 'lucide-react'
import { PLANS } from '@/lib/stripe'
import { CheckoutButton } from '@/components/ui/CheckoutButton'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Premium',
  description: 'Acesso completo ao ecossistema Brit Mashiach: Kabaláh Luriana, Modelo Netivot, cursos e biblioteca completa.',
}

const features = [
  { icon: BookOpen, title: 'Estudos ilimitados', desc: 'Acesso completo a todos os ensinos do Rav EBBY sem restrição.' },
  { icon: Library, title: 'Biblioteca completa', desc: 'Download de todos os títulos: Siddur, Machzor, Netivot, 49 Portões.' },
  { icon: Layers, title: 'Modelo Netivot', desc: 'Os 32 caminhos proprietários do Rav EBBY com análise kabalística profunda.' },
  { icon: Star, title: 'Kabaláh Luriana', desc: 'Etz Chaim, Olamot, Sefirot, Tzimtzum - o sistema completo do Arizal.' },
  { icon: Calendar, title: 'Calendário premium', desc: 'Detalhes litúrgicos, Kavannot para cada Moed e Omer interativo.' },
  { icon: Crown, title: 'Cursos exclusivos', desc: 'Acesso antecipado a novos cursos e conteúdo do Rav antes do lançamento.' },
]

export default function PremiumPage() {
  const freePlan = PLANS.free
  const premiumPlan = PLANS.premium
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(premiumPlan.price / 100)

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-petroleum-gradient opacity-[0.04] dark:opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.gold.500/10),transparent_60%)]" />

        <div className="relative container mx-auto px-4 py-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/12 border border-gold-500/25">
            <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
            <span className="text-xs font-inter font-semibold text-gold-700 dark:text-gold-400 uppercase tracking-widest">
              Brit Mashiach Premium
            </span>
          </div>

          <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 max-w-2xl mx-auto leading-tight">
            Acesso completo ao ecossistema espiritual
          </h1>

          <p className="font-cormorant text-xl text-warmgray-600 dark:text-warmgray-400 italic max-w-xl mx-auto">
            Kabaláh Luriana profunda, Modelo Netivot proprietário, biblioteca completa e orientação direta do Rav EBBY.
          </p>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold-600 dark:text-gold-400" />
              </div>
              <div>
                <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">{title}</h3>
                <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Gratuito */}
          <div className="glass-card p-7 space-y-5">
            <div className="space-y-1">
              <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
                {freePlan.name}
              </h2>
              <p className="text-sm font-inter text-warmgray-500">{freePlan.description}</p>
            </div>

            <div>
              <span className="font-cinzel text-4xl font-bold text-petroleum-800 dark:text-parchment-100">R$ 0</span>
              <span className="text-sm font-inter text-warmgray-500 ml-2">/mês</span>
            </div>

            <ul className="space-y-2.5">
              {freePlan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm font-inter text-warmgray-700 dark:text-warmgray-300">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <button disabled className="w-full py-3 rounded-lg border border-border text-sm font-inter font-medium text-warmgray-500 cursor-not-allowed">
              Plano atual
            </button>
          </div>

          {/* Premium */}
          <div className="relative rounded-xl border-2 border-gold-500/50 bg-gradient-to-br from-petroleum-800/5 to-gold-500/5 dark:from-petroleum-800 dark:to-petroleum-700 p-7 space-y-5 shadow-gold-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="premium-badge px-4 py-1 text-xs">
                <Crown className="w-3 h-3" />
                Mais popular
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100">
                {premiumPlan.name}
              </h2>
              <p className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400">{premiumPlan.description}</p>
            </div>

            <div>
              <span className="font-cinzel text-4xl font-bold text-petroleum-800 dark:text-parchment-100">
                {priceFormatted}
              </span>
              <span className="text-sm font-inter text-warmgray-500 dark:text-warmgray-400 ml-2">/mês</span>
            </div>

            <ul className="space-y-2.5">
              {premiumPlan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm font-inter text-warmgray-700 dark:text-warmgray-300">
                  <Check className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <CheckoutButton />
          </div>
        </div>

        {/* Garantia */}
        <p className="text-center text-sm font-inter text-warmgray-500 mt-8">
          Cancele a qualquer momento. Sem fidelidade. Pagamento seguro via Stripe.
        </p>
      </section>

      {/* Testemunho */}
      <section className="container mx-auto px-4 pb-14">
        <hr className="divider-gold" />
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-petroleum-gradient flex items-center justify-center mx-auto">
            <Star className="w-6 h-6 text-gold-400 fill-gold-400" />
          </div>
          <blockquote className="font-cormorant text-2xl italic text-petroleum-800 dark:text-parchment-100 leading-relaxed">
            &ldquo;O ensino da Toráh é árbol de vida para os que a seguem, e quem a ela se agarra é afortunado.&rdquo;
          </blockquote>
          <p className="text-sm font-inter text-warmgray-500">
            Mishle 3:18
          </p>
        </div>
      </section>
    </div>
  )
}
