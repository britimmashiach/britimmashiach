/**
 * Magen David (estrela de seis pontas) — símbolo da marca Brit Im Mashiach.
 * Dois triângulos equiláteros sobrepostos, preenchidos com a cor atual
 * (`currentColor`), para combinar com `text-gold-400` etc.
 */
export function MagenDavidIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="24,2 43.05,35 4.95,35" />
      <polygon points="24,46 4.95,13 43.05,13" />
    </svg>
  )
}
