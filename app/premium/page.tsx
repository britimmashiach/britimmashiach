import type { Metadata } from 'next'
import Link from 'next/link'
import { Crown, Check, Star, Sparkles, BookOpen, Library, Layers, DoorClosed, ArrowRight } from 'lucide-react'
import { RAV_NAME } from '@/lib/site-brand'
import { PLANS, PREMIUM_ANNUAL_PIX, formatBrlCentavos, showStripePremium } from '@/lib/stripe'
import { PREMIUM_PIX_GRACE_DAYS } from '@/lib/premium-subscription'
import { hasMpEnv } from '@/lib/mercadopago'
import { hasAsaasEnv } from '@/lib/asaas'
import { CheckoutButton } from '@/components/ui/CheckoutButton'

export const metadata: Metadata = {
  title: 'Portões internos — Sod e caminho profundo',
  description:
    'A primeira Aliyáh é aberta. Aliyot completas, Sod, Modelo Netivot, 49 Portões da Alma e biblioteca do Rav Eliahu Barzilay — continuação natural do estudo na Brit Im Mashiach.',
}

const features = [
  { icon: BookOpen, title: 'Aliyot e estudos completos', desc: 'Do Peshat ao Sod: PDFs das sete Aliyot semanais e todo o acervo publicado do Rav EBBY.' },
  { icon: Library, title: 'Biblioteca dos portões', desc: 'Siddur, Machzor, Netivot, 49 Portões da Alma e obras reservadas para quem aprofunda o caminho.' },
  { icon: Layers, title: 'Modelo Netivot', desc: 'Os 32 caminhos proprietários do Rav com análise sefirótica — diferencial doutrinário da plataforma.' },
  { icon: Star, title: 'Sod e Kabaláh Luriana', desc: 'Etz Chaim, Olamot, Sefirot e Tzimtzum: o nível místico que não se expõe na primeira Aliyáh.' },
  { icon: Crown, title: 'Novos ensinamentos primeiro', desc: 'Quem entra no caminho recebe o material novo antes da divulgação ampla na kehilah.' },
]

const portoesAbertos = [
  'Introdução e 1ª Aliyáh de cada Parashá',
  'Calendário, Chagim públicos e estudos de entrada',
  'Método PaRDeS e páginas doutrinárias',
]

const portoesInternos = [
  'Aliyot 2 a 7 com PDF completo PaRDeS',
  'Seções Sod, Netivot e kavanot avançadas',
  'Biblioteca completa e cursos em lançamento',
]

export default function PremiumPage() {
  const stripeReady = showStripePremium()
  const asaasReady = hasAsaasEnv()
  const mpReady = hasMpEnv()
  const freePlan = PLANS.free
  const premiumPlan = PLANS.premium
  const priceFormatted = formatBrlCentavos(premiumPlan.price)
  const annualPixFormatted = formatBrlCentavos(PREMIUM_ANNUAL_PIX.centavos)

  return (
    <div className="min-h-screen">

      {/* Hero — continuação do caminho, não “plano” */}
      <section className="relative overflow-hidden border-b border-border/40 bg-spiritual-depth bg-kabbalah-texture">
        <div className="relative container mx-auto px-4 py-16 text-center space-y-5 max-w-3xl">
          <p className="portal-eyebrow mx-auto">
            <DoorClosed className="w-3 h-3" aria-hidden="true" />
            Portões internos
          </p>

          <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-tight text-balance">
            A primeira Aliyáh é aberta. Os portões internos pertencem aos que entram no caminho
          </h1>

          <p className="font-cormorant text-xl text-warmgray-600 dark:text-warmgray-400 italic leading-relaxed">
            O que você já vê na Parashá semanal é o limiar. O Sod, as Aliyot seguintes e o Modelo Netivot do {RAV_NAME} são a continuação natural — não um produto à parte.
          </p>

          <Link
            href="/parashot"
            className="inline-flex items-center gap-1.5 text-sm font-inter text-warmgray-500 hover:text-foreground transition-colors"
          >
            Estudar a Aliyáh aberta primeiro
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* O que está aberto vs. o que fecha o ciclo */}
      <section className="container mx-auto px-4 pt-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="glass-card p-6 space-y-4">
            <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
              Já aberto a todos
            </h2>
            <ul className="space-y-2">
              {portoesAbertos.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 border-gold-500/35 bg-gradient-to-br from-gold-500/5 to-petroleum-800/5 dark:from-gold-500/10 dark:to-petroleum-900/40 p-6 space-y-4">
            <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400" aria-hidden="true" />
              Portões internos
            </h2>
            <ul className="space-y-2">
              {portoesInternos.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm font-inter text-warmgray-700 dark:text-warmgray-300">
                  <Crown className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
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
                Caminho profundo
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

            <div className="space-y-2.5">
              {asaasReady && (
                <>
                  <CheckoutButton mode="asaas-pix-monthly" />
                  <p className="text-xs font-inter text-gold-700 dark:text-gold-400 text-center leading-relaxed">
                    PIX mensal {priceFormatted}: pague o QR Code todo mês. Sem cartão.
                    Tolerância de {PREMIUM_PIX_GRACE_DAYS} dias antes do bloqueio.
                    Quando o Asaas liberar Pix Automático, o débito passará a ser automático.
                  </p>
                  <CheckoutButton mode="asaas-pix-annual" />
                  <p className="text-xs font-inter text-warmgray-500 text-center leading-relaxed">
                    PIX anual {annualPixFormatted} por 12 meses (~R$ 33/mês). Pagamento único,
                    renovação manual ao fim do ano.
                  </p>
                </>
              )}
              {mpReady && (
                <>
                  <CheckoutButton mode="mp-monthly" />
                  <p className="text-xs font-inter text-warmgray-500 text-center leading-relaxed">
                    Somente cartão de crédito. Exige conta MP ou cadastro de cartão no checkout.
                  </p>
                </>
              )}
              {stripeReady && (
                <>
                  <CheckoutButton mode="pix-monthly" />
                  <CheckoutButton mode="pix-annual" />
                  <CheckoutButton />
                </>
              )}
              {!asaasReady && !mpReady && !stripeReady && (
                <p className="text-xs font-inter text-warmgray-500 text-center py-2">
                  Configure o gateway de pagamento para assinar online.
                </p>
              )}
              <p className="text-xs font-inter text-warmgray-500 text-center pt-1 leading-relaxed">
                {asaasReady && mpReady
                  ? `PIX mensal ou anual via Asaas. Cartão ${priceFormatted}/mês via Mercado Pago.`
                  : asaasReady
                    ? `PIX mensal ou anual via Asaas.`
                    : mpReady
                      ? `${priceFormatted}/mês no cartão via Mercado Pago.`
                      : stripeReady
                        ? `PIX ou cartão via Stripe.`
                        : 'Pagamentos em configuração.'}
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm font-cormorant italic text-warmgray-600 dark:text-warmgray-400 max-w-lg mx-auto mt-6 leading-relaxed">
          Entrar nos portões é sustentar o Beit Midrash digital da kehilah — Toráh, impressão dos PDFs e o trabalho contínuo do Rav na Brit Im Mashiach.
        </p>

        {/* Garantia */}
        <p className="text-center text-sm font-inter text-warmgray-500 mt-6 leading-relaxed">
          Cancele a qualquer momento. Sem fidelidade.
          {mpReady && ' Valor fixo de R$ 47/mês debitado no cartão autorizado.'}
          {asaasReady && ' PIX mensal via QR Code (renovação manual até Pix Automático ser liberado).'}
          {' '}Pagamento seguro
          {asaasReady ? ' via Asaas' : ''}
          {mpReady ? `${asaasReady ? ' e' : ' via'} Mercado Pago` : ''}
          {stripeReady ? ' ou Stripe' : ''}.
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
            &ldquo;O ensino da Toráh é árvore de vida para os que a seguem, e quem a ela se agarra é afortunado.&rdquo;
          </blockquote>
          <p className="text-sm font-inter text-warmgray-500">
            Mishle 3:18
          </p>
        </div>
      </section>
    </div>
  )
}
