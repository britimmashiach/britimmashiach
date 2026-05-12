/**
 * Identidade visual sutil por livro da Toráh.
 * Nuances quase imperceptíveis — sentidas, não vistas.
 */

export interface BookTheme {
  glow: string     // CSS radial-gradient para o fundo da página
  accentClass: string  // Tailwind classes para o badge/label do livro
  label: string
}

const BOOK_THEMES: Record<string, BookTheme> = {
  Bereshit: {
    // Profundidade cósmica: azul primordial, escuridão antes da luz
    glow: 'radial-gradient(ellipse 80% 60% at 85% 0%, rgba(14,29,37,0.065) 0%, transparent 70%)',
    accentClass: 'bg-petroleum-800/8 text-petroleum-700 dark:bg-petroleum-700/20 dark:text-petroleum-300',
    label: 'Bereshit',
  },
  Shemot: {
    // Fogo e libertação: âmbar queimado, ouro refundido no deserto
    glow: 'radial-gradient(ellipse 80% 60% at 85% 0%, rgba(114,96,10,0.07) 0%, transparent 70%)',
    accentClass: 'bg-gold-800/8 text-gold-800 dark:bg-gold-700/20 dark:text-gold-300',
    label: 'Shemot',
  },
  Vayikra: {
    // Sacerdócio e santidade: incenso, leveza do Mishkan, ouro claro
    glow: 'radial-gradient(ellipse 80% 60% at 85% 0%, rgba(201,168,76,0.055) 0%, transparent 70%)',
    accentClass: 'bg-gold-500/10 text-gold-600 dark:bg-gold-500/15 dark:text-gold-400',
    label: 'Vayikra',
  },
  Bamidbar: {
    // Deserto e contemplação: areia fria, silêncio aberto, céu pálido
    glow: 'radial-gradient(ellipse 80% 60% at 85% 0%, rgba(200,185,142,0.085) 0%, transparent 70%)',
    accentClass: 'bg-parchment-400/15 text-parchment-700 dark:bg-parchment-600/20 dark:text-parchment-400',
    label: 'Bamidbar',
  },
  Devarim: {
    // Maturidade e memória: cobre antigo, ouro envelhecido, peso das palavras
    glow: 'radial-gradient(ellipse 80% 60% at 85% 0%, rgba(149,122,8,0.07) 0%, transparent 70%)',
    accentClass: 'bg-gold-700/8 text-gold-700 dark:bg-gold-700/20 dark:text-gold-400',
    label: 'Devarim',
  },
}

export function getBookTheme(book: string): BookTheme {
  return BOOK_THEMES[book] ?? {
    glow: '',
    accentClass: 'bg-muted text-warmgray-600 dark:text-warmgray-400',
    label: book,
  }
}
