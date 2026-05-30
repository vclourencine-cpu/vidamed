import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { LayoutDashboard, Receipt, FileText, User, LogOut, Menu, X, Bell } from 'lucide-react'
import Logo from '../site/components/Logo'
import SwitcherContexto from '../components/SwitcherContexto'
import ThemeToggle from '../components/ThemeToggle'
import { getSession, logout } from '../lib/auth'

const NAV = [
  { to: '/portal', icon: LayoutDashboard, label: 'Início / DRE', end: true },
  { to: '/portal/extratos', icon: Receipt, label: 'Extratos' },
  { to: '/portal/documentos', icon: FileText, label: 'Documentos' },
  { to: '/portal/perfil', icon: User, label: 'Meus dados' }
]

export default function PortalLayout() {
  const session = getSession()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // Só médicos acessam o portal
  if (!session) return <Navigate to="/login" replace />
  if (session.perfil !== 'medico') return <Navigate to="/app/dashboard" replace />

  const sair = () => { logout(); navigate('/login') }
  const primeiroNome = session.nome?.replace('Dr. ', '').split(' ')[0]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar — pele clara, mais respiro que o painel interno */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-sm transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-5">
          <Logo size={30} />
          <button onClick={() => setOpen(false)} className="lg:hidden"><X size={20} /></button>
        </div>
        <nav className="space-y-1 px-3 py-2">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 inset-x-0 p-3">
          <div className="rounded-xl bg-teal-50 p-4 ring-1 ring-teal-100">
            <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Portal do médico</p>
            <p className="mt-1 font-display text-sm font-bold text-slate-800">{session.nome}</p>
            <p className="text-xs text-slate-500">CRM · parceiro Vidamed</p>
          </div>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/40 lg:hidden" />}

      <div className="lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-100 bg-white/80 px-4 backdrop-blur sm:px-6">
          <button onClick={() => setOpen(true)} className="lg:hidden"><Menu size={24} /></button>
          <p className="hidden text-sm text-slate-500 sm:block">Olá, <strong className="text-slate-800">{primeiroNome}</strong> 👋</p>
          <div className="flex items-center gap-3">
            <SwitcherContexto tema="claro" />
            <ThemeToggle />
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-500" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-slate-50 py-1.5 pl-1.5 pr-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                {session.avatar}
              </div>
              <span className="hidden text-xs font-semibold text-slate-700 sm:block">{session.nome}</span>
            </div>
            <button onClick={sair} title="Sair" className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
