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

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/95 shadow-soft backdrop-blur' : 'bg-transparent'
    }`}>
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center">
          <Logo size={36} variant={scrolled ? 'dark' : 'light'} />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                scrolled ? 'text-slate-700 hover:text-brand' : 'text-white/85 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-soft transition ${
              scrolled
                ? 'bg-brand text-white hover:bg-brand-dark'
                : 'bg-accent text-white hover:bg-accent-light'
            }`}
          >
            <LogIn size={16} />
            Acessar plataforma
          </Link>
        </div>

        <button
          className={`lg:hidden ${scrolled ? 'text-slate-700' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-x flex flex-col gap-4 py-4">
            {NAV.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-slate-700"
              >
                {item.label}
              </a>
            ))}
            <Link to="/login" className="btn-primary w-full justify-center">
              <LogIn size={16} />
              Acessar plataforma
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
