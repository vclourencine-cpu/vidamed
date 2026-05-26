import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, LogIn } from 'lucide-react'
import Logo from './Logo'

const NAV = [
  { href: '#quem-somos', label: 'Quem Somos' },
  { href: '#solucoes', label: 'Soluções' },
  { href: '#planos', label: 'Planos' },
  { href: '#treinamentos', label: 'Treinamentos' },
  { href: '#associar', label: 'Associe-se' },
  { href: '#contato', label: 'Contato' }
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Header sempre na cor exata do fundo do logo (#003768) — apenas sombra ao rolar
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'shadow-card' : ''
      }`}
      style={{ backgroundColor: '#003768' }}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center">
          <Logo size={36} variant="light" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/85 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accent-light"
          >
            <LogIn size={16} />
            Acessar plataforma
          </Link>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-brand-dark lg:hidden">
          <div className="container-x flex flex-col gap-4 py-4">
            {NAV.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/90 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <Link to="/login" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
              <LogIn size={16} />
              Acessar plataforma
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
