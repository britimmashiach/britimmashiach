import { Download, Type } from 'lucide-react'
import { SHLOMO_STAM_DOWNLOAD_URL } from '@/lib/shlomo-stam-font'

interface Props {
  /** Texto curto de contexto (painel de líderes vs. Gematria vs. admin). */
  context?: 'lideres' | 'mestre' | 'admin'
}

/** Card para baixar e instalar a fonte hebraica oficial da congregação. */
export function ShlomoStamDownload({ context = 'lideres' }: Props) {
  const intro =
    context === 'mestre'
      ? 'Como Mestre de Gematria, você pode instalar a mesma fonte hebraica usada nos materiais do Rav EBBY e no site da Brit Im Mashiach.'
      : context === 'admin'
        ? 'Fonte hebraica oficial da congregação. Disponível para líderes e Mestres no Portal de Líderes; aqui você também pode baixar para testar ou instalar no seu computador.'
        : 'Instale a fonte hebraica oficial usada nas Aliyot, no Tehilim, no Siddur e nos documentos do Rav EBBY, para preparar estudos e materiais com o mesmo padrão tipográfico.'

  return (
    <div className="glass-card p-6 space-y-5 ring-1 ring-gold-500/30 bg-gold-500/5">
      <div className="flex items-start gap-3">
        <Type className="w-6 h-6 text-gold-600 dark:text-gold-400 shrink-0 mt-0.5" aria-hidden />
        <div className="space-y-1">
          <h2 className="font-cinzel text-lg font-semibold text-petroleum-800 dark:text-parchment-100">
            Fonte hebraica Shlomo Stam
          </h2>
          <p className="text-sm font-inter text-warmgray-600 dark:text-warmgray-400 leading-relaxed">
            {intro}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 px-4 py-3">
        <p
          className="font-hebrew text-2xl md:text-3xl text-petroleum-800 dark:text-parchment-100 text-right leading-loose"
          dir="rtl"
          lang="he"
        >
          בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ
        </p>
        <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-400 mt-2">
          Prévia com Shlomo Stam (nikud completo)
        </p>
      </div>

      <div className="space-y-2 text-sm font-inter text-warmgray-600 dark:text-warmgray-400">
        <p className="font-semibold text-petroleum-800 dark:text-parchment-100">Como instalar</p>
        <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
          <li>Baixe o arquivo <strong className="font-medium text-foreground">ShlomStam.ttf</strong>.</li>
          <li>
            <strong className="font-medium text-foreground">Windows:</strong> clique com o botão direito no arquivo e
            escolha Instalar, ou copie para Configurações → Fontes.
          </li>
          <li>
            <strong className="font-medium text-foreground">Mac:</strong> abra o arquivo no app Fontes e clique em
            Instalar fonte.
          </li>
          <li>
            No Word ou LibreOffice, selecione <strong className="font-medium text-foreground">Shlomo Stam</strong> para
            texto hebraico com nikud.
          </li>
        </ol>
      </div>

      <a
        href={SHLOMO_STAM_DOWNLOAD_URL}
        className="inline-flex items-center gap-2 rounded-lg bg-petroleum-800 dark:bg-gold-500 px-5 py-2.5 text-sm font-inter font-semibold text-parchment-50 dark:text-petroleum-950 hover:opacity-90 transition-opacity"
      >
        <Download className="w-4 h-4" aria-hidden />
        Baixar ShlomStam.ttf
      </a>

      <p className="text-xs font-inter text-warmgray-500 dark:text-warmgray-500 leading-relaxed">
        Uso reservado à comunidade Brit Im Mashiach. A fonte é necessária para reproduzir fielmente os materiais
        litúrgicos e de estudo da congregação.
      </p>
    </div>
  )
}
