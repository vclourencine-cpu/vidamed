export default function Logo({ size = 36, variant = 'dark', iconOnly = false }) {
  // iconOnly: renderiza apenas o "V" em SVG (para usos compactos)
  if (iconOnly) {
    const colorRight = variant === 'light' ? '#FFFFFF' : '#003869'
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        aria-label="Vidamed"
      >
        <path d="M 8 12 L 30 12 L 53 82 L 45 88 Z" fill="#009E3D" />
        <path d="M 70 12 L 92 12 L 55 88 L 47 82 Z" fill={colorRight} />
      </svg>
    )
  }

  // Lockup completa: imagem PNG oficial (V + "Vidamed" sobre fundo azul).
  // Em fundos claros aparece como um badge azul (visual integrado da marca).
  return (
    <img
      src="/logo.png"
      alt="Vidamed"
      style={{ height: size, width: 'auto', display: 'block' }}
      className="rounded-md"
    />
  )
}
