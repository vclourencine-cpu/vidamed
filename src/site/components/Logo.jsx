export default function Logo({ size = 36, variant = 'dark', showText = true }) {
  // Lado esquerdo do "V" é sempre VERDE.
  // Lado direito é AZUL sobre fundo claro, BRANCO sobre fundo escuro.
  const colorLeft = '#009E3D'
  const colorRight = variant === 'light' ? '#ffffff' : '#003869'
  const textColor = variant === 'light' ? '#ffffff' : '#003869'

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-label="Logotipo Vidamed"
      >
        {/* Lado esquerdo do V (verde) */}
        <path d="M 6 8 L 24 8 L 31 54 L 28 60 Z" fill={colorLeft} />
        {/* Lado direito do V (azul ou branco) */}
        <path d="M 40 8 L 58 8 L 36 60 L 33 54 Z" fill={colorRight} />
      </svg>
      {showText && (
        <span
          className="font-display text-xl font-extrabold tracking-tight"
          style={{ color: textColor, letterSpacing: '-0.02em' }}
        >
          Vidamed
        </span>
      )}
    </div>
  )
}
