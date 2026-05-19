import type { ChagHeroProps } from '@/lib/chag-hero-props'

const PARTICLES: { cx: number; r: number; dur: number; delay: number }[] = [
  { cx: 8, r: 1.2, dur: 7.5, delay: 0.0 },
  { cx: 18, r: 1.0, dur: 6.0, delay: 1.2 },
  { cx: 25, r: 1.4, dur: 8.5, delay: 0.5 },
  { cx: 32, r: 1.1, dur: 5.5, delay: 2.0 },
  { cx: 42, r: 1.3, dur: 9.0, delay: 0.8 },
  { cx: 48, r: 1.0, dur: 6.8, delay: 1.5 },
  { cx: 55, r: 1.5, dur: 7.0, delay: 3.0 },
  { cx: 62, r: 1.1, dur: 5.8, delay: 0.3 },
  { cx: 70, r: 1.2, dur: 8.0, delay: 2.5 },
  { cx: 78, r: 1.0, dur: 6.5, delay: 1.0 },
  { cx: 85, r: 1.4, dur: 9.5, delay: 4.0 },
  { cx: 92, r: 1.3, dur: 7.2, delay: 1.8 },
]

function Candle({ side }: { side: 'L' | 'R' }) {
  const s = side
  const glowDur = side === 'L' ? '3s' : '3.8s'
  const flameOuterDur = side === 'L' ? '3.5s' : '4.2s'
  const flameInnerDur = side === 'L' ? '2.8s' : '3.2s'
  const flameOuterName = side === 'L' ? 'shabat-flame-outer' : 'shabat-flame-outer-rev'
  const flameInnerName = side === 'L' ? 'shabat-flame-inner' : 'shabat-flame-inner-rev'
  const waxPath =
    side === 'L'
      ? 'M22 84 Q20 95 21 106 Q22 117 23 128'
      : 'M42 84 Q44 95 43 106 Q42 117 41 128'

  return (
    <svg
      width="64"
      height="210"
      viewBox="0 0 64 210"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <radialGradient id={`glow-${s}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe066" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffe066" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`flameOuter-${s}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8b0" />
          <stop offset="50%" stopColor="#ffc200" />
          <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`flameInner-${s}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fff0a0" />
          <stop offset="100%" stopColor="#ffcc00" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`body-${s}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8904a" />
          <stop offset="30%" stopColor="#eedfa0" />
          <stop offset="60%" stopColor="#f8f0cc" />
          <stop offset="100%" stopColor="#9a7030" />
        </linearGradient>
        <linearGradient id={`top-${s}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6a4520" />
          <stop offset="50%" stopColor="#c8a060" />
          <stop offset="100%" stopColor="#5a3818" />
        </linearGradient>
        <linearGradient id={`cup-${s}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6a4810" />
          <stop offset="30%" stopColor="#c89830" />
          <stop offset="50%" stopColor="#e8c060" />
          <stop offset="70%" stopColor="#c89830" />
          <stop offset="100%" stopColor="#6a4810" />
        </linearGradient>
      </defs>

      {/* a) Glow */}
      <ellipse
        cx="32"
        cy="30"
        rx="22"
        ry="26"
        fill={`url(#glow-${s})`}
        style={{
          animation: `shabat-glow ${glowDur} ease-in-out infinite`,
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      />

      {/* b) Pavio */}
      <path d="M32 76 Q31 70 32 62" stroke="#2a1a08" strokeWidth="1.3" fill="none" />

      {/* c) Chama externa */}
      <path
        d="M32 76 Q24 60 26 44 Q28 30 32 24 Q36 30 38 44 Q40 60 32 76Z"
        fill={`url(#flameOuter-${s})`}
        style={{
          animation: `${flameOuterName} ${flameOuterDur} ease-in-out infinite`,
          transformBox: 'fill-box',
          transformOrigin: 'center bottom',
        }}
      />

      {/* d) Chama interna */}
      <path
        d="M32 74 Q28 62 29 50 Q30 38 32 32 Q34 38 35 50 Q36 62 32 74Z"
        fill={`url(#flameInner-${s})`}
        style={{
          animation: `${flameInnerName} ${flameInnerDur} ease-in-out infinite`,
          transformBox: 'fill-box',
          transformOrigin: 'center bottom',
        }}
      />

      {/* e) Corpo da vela */}
      <rect x="22" y="76" width="20" height="70" rx="2" fill={`url(#body-${s})`} />
      <ellipse cx="32" cy="76" rx="10" ry="3.5" fill={`url(#top-${s})`} />
      <path
        d={waxPath}
        stroke="#dfc070"
        strokeWidth="2"
        fill="none"
        opacity="0.55"
        strokeLinecap="round"
      />
      <rect x="35" y="80" width="3.5" height="58" rx="1.5" fill="white" opacity="0.08" />

      {/* f) Castiçal (taça) */}
      <path
        d="M22 146 Q20 150 18 154 Q22 158 32 159 Q42 158 46 154 Q44 150 42 146 Z"
        fill={`url(#cup-${s})`}
      />
      <ellipse cx="32" cy="146" rx="11" ry="1.5" fill={`url(#top-${s})`} />

      {/* g) Haste com nó */}
      <rect x="29" y="159" width="6" height="22" rx="3" fill={`url(#cup-${s})`} />
      <ellipse cx="32" cy="170" rx="5" ry="2.4" fill={`url(#cup-${s})`} />
      <ellipse cx="32" cy="170" rx="3.5" ry="1.4" fill="#e8c060" opacity="0.7" />

      {/* h) Prato base + sombra */}
      <ellipse cx="32" cy="181" rx="18" ry="2.4" fill={`url(#cup-${s})`} />
      <ellipse cx="32" cy="183" rx="18" ry="2.0" fill={`url(#cup-${s})`} />
      <ellipse cx="32" cy="185" rx="14" ry="1.6" fill={`url(#cup-${s})`} />
      <ellipse cx="32" cy="190" rx="22" ry="1.6" fill="#000" opacity="0.25" />
    </svg>
  )
}

function MagenDavid({ side }: { side: 'L' | 'R' }) {
  // Hexagrama formado por dois triângulos equiláteros sobrepostos.
  // Centro em (24,24), raio 22 num viewBox 48x48.
  // Triângulo apontando para cima (vértice superior em norte).
  // Triângulo apontando para baixo (vértice inferior em sul).
  const up = '24,2 43.05,35 4.95,35'
  const down = '24,46 4.95,13 43.05,13'
  const pos =
    side === 'L'
      ? { bottom: 18, left: 22 }
      : { bottom: 18, right: 22 }
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      style={{ position: 'absolute', ...pos, opacity: 0.22 }}
      aria-hidden="true"
    >
      <polygon points={up} fill="none" stroke="#d4af6a" strokeWidth="0.9" strokeLinejoin="round" />
      <polygon points={down} fill="none" stroke="#d4af6a" strokeWidth="0.9" strokeLinejoin="round" />
    </svg>
  )
}

export function ChagHero(props: ChagHeroProps) {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(0,0,0,0.35)',
      }}
    >
      {/* === HERO === */}
      <section
        style={{
          position: 'relative',
          minHeight: 620,
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, #1a2830 0%, #0d1a20 40%, #000 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem 2rem',
        }}
        aria-label={`${props.latin} — capa`}
      >
        {/* Camada de fundo: versículos hebraicos */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.13,
            color: '#d4af6a',
            fontFamily: '"Shlomo Stam", "Times New Roman", serif',
            fontSize: 14,
            lineHeight: 2.4,
            direction: 'rtl',
            textAlign: 'center',
            pointerEvents: 'none',
            padding: '2rem',
          }}
        >
          {props.backgroundVerses.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>

        {/* Partículas douradas */}
        <svg
          width="100%"
          height="100%"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          {PARTICLES.map((p, i) => (
            <circle
              key={i}
              cx={`${p.cx}%`}
              cy="-10"
              r={p.r}
              fill="#d4af6a"
              style={{
                animation: `shabat-fall ${p.dur}s ${p.delay}s infinite linear`,
                opacity: 0,
              }}
            />
          ))}
        </svg>

        {/* Velas — simétricas, base alinhada */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 50,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 55px',
            pointerEvents: 'none',
          }}
        >
          <Candle side="L" />
          <Candle side="R" />
        </div>

        {/* Conteúdo central */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
            textAlign: 'center',
          }}
        >
          <div
            lang="he"
            dir="rtl"
            style={{
              fontFamily: '"Shlomo Stam", "Times New Roman", serif',
              fontSize: 88,
              fontWeight: 700,
              color: '#d4af6a',
              lineHeight: 1,
              filter: 'drop-shadow(0 0 18px rgba(212, 175, 106, 0.25))',
            }}
          >
            {props.hebrew}
          </div>

          <div
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: 22,
              fontWeight: 600,
              color: '#d4af6a',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              opacity: 0.92,
            }}
          >
            {props.latin}
          </div>

          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: 16,
              color: '#d4af6a',
              opacity: 0.6,
              letterSpacing: '0.08em',
            }}
          >
            {props.subtitle}
          </div>

          <div
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: 18,
              color: '#f5f0e8',
              opacity: 0.88,
              marginTop: '1.2rem',
              letterSpacing: '0.04em',
              maxWidth: 480,
            }}
          >
            {props.verseTransliteration}
          </div>

          <div
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 13,
              fontWeight: 300,
              color: '#f5f0e8',
              opacity: 0.45,
              letterSpacing: '0.06em',
              maxWidth: 420,
            }}
          >
            {props.verseTranslation}
          </div>
        </div>

        <MagenDavid side="L" />
        <MagenDavid side="R" />

        {/* Linha dourada */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, #d4af6a, transparent)',
            opacity: 0.4,
          }}
        />
      </section>

      {/* === ÂNCORA === */}
      <section
        style={{
          background: '#050c10',
          padding: '2rem 2.5rem',
        }}
      >
        <p
          style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 14,
            fontWeight: 300,
            color: '#c9bfa8',
            opacity: 0.75,
            lineHeight: 1.85,
            maxWidth: 560,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {props.anchorText}
        </p>
      </section>
    </div>
  )
}
