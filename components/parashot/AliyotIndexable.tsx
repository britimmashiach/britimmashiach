import type { Aliyah } from '@/lib/parashot-supabase'

const DAY_NAMES = [
  { pt: 'Domingo', trans: 'Yom Rishon' },
  { pt: 'Segunda-feira', trans: 'Yom Sheni' },
  { pt: 'Terça-feira', trans: 'Yom Shlishi' },
  { pt: 'Quarta-feira', trans: "Yom Revi'i" },
  { pt: 'Quinta-feira', trans: 'Yom Chamishi' },
  { pt: 'Sexta-feira', trans: 'Yom Shishi' },
  { pt: 'Shabat', trans: '' },
]

function renderParagraphs(text: string) {
  return text.split('\n').filter((line) => line.trim()).map((line, i) => (
    <p key={i} className="font-inter text-sm text-foreground leading-relaxed mb-3 last:mb-0">
      {line}
    </p>
  ))
}

type AliyotIndexableProps = {
  parashaTitle: string
  aliyot: Aliyah[]
}

/**
 * Índice semanal renderizado no servidor para SEO e kavanáh litúrgica.
 * Aliyáh 1: texto completo (acesso público). Demais: título e resumo estrutural.
 */
export function AliyotIndexable({ parashaTitle, aliyot }: AliyotIndexableProps) {
  return (
    <section
      aria-labelledby="aliyot-index-heading"
      className="mb-10 rounded-2xl border border-border/50 bg-card/40 p-5 md:p-6"
    >
      <h2
        id="aliyot-index-heading"
        className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100 mb-1"
      >
        As sete Aliyot de {parashaTitle}
      </h2>
      <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 mb-6 max-w-2xl leading-relaxed">
        Ciclo semanal da Toráh (Chok LeYisrael). Cada dia corresponde a uma Aliyáh. O estudo
        interativo com PDFs e níveis PaRDeS aparece abaixo; este índice preserva o conteúdo
        essencial para leitura e indexação respeitosa da Toráh.
      </p>

      <ol className="space-y-6 list-none m-0 p-0">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((num) => {
          const aliyah = aliyot.find((a) => a.aliyahNumber === num) ?? null
          const day = DAY_NAMES[num - 1]
          const isPublicAliyah = num === 1

          return (
            <li
              key={num}
              id={`aliyah-${num}`}
              className="border-b border-border/40 pb-6 last:border-0 last:pb-0"
            >
              <h3 className="font-cinzel text-base font-semibold text-petroleum-800 dark:text-parchment-100">
                Aliyáh {num}
                {num === 7 ? ' — Shabat' : ` — ${day.pt}`}
                {day.trans ? (
                  <span className="font-inter text-xs font-normal text-warmgray-500 ml-2">
                    ({day.trans})
                  </span>
                ) : null}
              </h3>

              {aliyah?.title && (
                <p className="font-cormorant text-base italic text-warmgray-600 dark:text-warmgray-400 mt-2">
                  {aliyah.title}
                </p>
              )}

              {isPublicAliyah && aliyah?.content ? (
                <article className="mt-3 prose prose-sm max-w-none dark:prose-invert">
                  {renderParagraphs(aliyah.content)}
                </article>
              ) : aliyah?.content ? (
                <p className="mt-3 text-xs font-inter text-warmgray-500 leading-relaxed">
                  Estudo completo desta Aliyáh disponível na plataforma (assinantes Premium para
                  aliyot 2 a 7). Use o painel interativo abaixo após entrar na conta.
                </p>
              ) : (
                <p className="mt-3 text-xs font-inter text-warmgray-500">
                  Conteúdo em preparação para este dia da semana.
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
