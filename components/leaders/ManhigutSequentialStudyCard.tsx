import { ListOrdered, ShieldAlert } from 'lucide-react'

/**
 * Instrução rabínica: estudo mês a mês, sem pular etapas (preenchimento dos Kelim).
 */
export function ManhigutSequentialStudyCard() {
  return (
    <section
      className="glass-card p-6 md:p-8 space-y-5 border-petroleum-800/25 dark:border-gold-500/30 ring-1 ring-petroleum-800/10 dark:ring-gold-500/15"
      aria-labelledby="manhigut-sequential-heading"
    >
      <div className="flex gap-3 items-start">
        <ShieldAlert
          className="w-7 h-7 text-petroleum-700 dark:text-gold-400 shrink-0 mt-0.5"
          aria-hidden
        />
        <div className="space-y-3">
          <p className="text-xs font-inter font-semibold uppercase tracking-widest text-petroleum-700 dark:text-gold-400">
            Instrução para Talmidim
          </p>
          <h2
            id="manhigut-sequential-heading"
            className="font-cinzel text-xl font-semibold text-petroleum-800 dark:text-parchment-100 leading-snug"
          >
            Não pule meses: siga a ordem do Beit Midrash
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            O Programa Manhigut foi estruturado como jornada de vinte e quatro meses, não como biblioteca
            de temas soltos. Cada módulo prepara o <strong className="font-semibold text-foreground">Keli</strong>,
            o vaso interior, para receber a luz do módulo seguinte. Quando o Talmid Manhig salta etapas, a
            Or Ein Sof encontra vasos ainda vazios ou mal formados: o entendimento parece brilhante por
            instantes, mas não se integra, não permanece e pode gerar confusão teológica ou prática
            espiritual instável.
          </p>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            Na tradição luriânica transmitida pelo Ari haKadosh e sistematizada no Etz Chaim, o Shefa desce
            pelos níveis de forma graduada. Os Rabanim que guardam a Kabaláh autêntica desaconselham
            fortemente estudar Sod ou arquitetura avançada sem fundamentos, assim como desaconselham mitzvot
            sem base halachica. O mesmo princípio vale aqui:{' '}
            <strong className="font-semibold text-foreground">mês após mês, na ordem publicada</strong>,
            dentro de cada Estágio, até concluir o encerramento daquele ciclo antes de avançar além do que
            sua formação atual sustenta.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-muted/30 p-4 md:p-5 space-y-3">
        <div className="flex gap-2 items-center">
          <ListOrdered className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0" aria-hidden />
          <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
            Ordem de leitura obrigatória
          </h3>
        </div>
        <ol className="space-y-2 text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed list-decimal list-inside marker:font-semibold marker:text-gold-700 dark:marker:text-gold-400">
          <li>
            Estude o <strong className="font-semibold text-foreground">Mês 01</strong>, depois o{' '}
            <strong className="font-semibold text-foreground">02</strong>, o{' '}
            <strong className="font-semibold text-foreground">03</strong>, e assim por diante, sem inverter
            ou omitir módulos já publicados.
          </li>
          <li>
            Só abra o módulo de <strong className="font-semibold text-foreground">encerramento</strong> de
            cada Estágio (meses 06, 12, 18 e 24) depois de concluir os meses preparatórios daquele Estágio
            que já estiverem disponíveis.
          </li>
          <li>
            Se um mês ainda não foi publicado pelo Rav EBBY, aguarde. Não substitua o vazio pulando para um
            módulo posterior: isso enfraquece o Tikun do Keli e desrespeita o método do Beit Midrash.
          </li>
          <li>
            O portal acompanha automaticamente seu{' '}
            <strong className="font-semibold text-foreground">mês civil no ciclo</strong> desde a data em que
            você foi aprovado como líder. Se tentar abrir um módulo à frente do seu mês, verá um aviso e será
            orientado de volta ao módulo atual.
          </li>
          <li>
            Reserve tempo para as <strong className="font-semibold text-foreground">She'elot le-Iyun</strong>{' '}
            e para o encontro ao vivo mensal, integrando leitura, reflexão e aplicação pastoral.
          </li>
        </ol>
      </div>

      <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 leading-relaxed border-l-2 border-gold-500/40 pl-4">
        Palavra do Rav EBBY: a pressa espiritual que busca atalhos raramente produz Talmid Manhig maduro.
        A paciência da Toráh, mês a mês, é parte do preenchimento dos Kelim. Ken Yehi Ratzon que cada
        Talmid caminhe com fidelidade, humildade e kavanah.
      </p>
    </section>
  )
}
