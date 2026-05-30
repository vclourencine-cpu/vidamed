import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Link, Navigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Wallet, LogOut, Menu, X, Bell, ChevronDown, Target, Building2
} from 'lucide-react'
import Logo from '../site/components/Logo'
import SwitcherContexto from '../components/SwitcherContexto'
import ThemeToggle from '../components/ThemeToggle'
import { getSession, logout, perms } from '../lib/auth'

const NAV = [
  { to: '/app/corporativo', icon: Building2, label: 'Corporativo', soAdmin: true },
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app/leads', icon: Target, label: 'Leads' },
  { to: '/app/medicos', icon: Users, label: 'Médicos' },
  { to: '/app/pagamentos', icon: Wallet, label: 'Pagamentos' }
]

export default function AppLayout() {
  const session = getSession()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Médico não acessa o painel interno — vai para o portal dele
  if (session?.perfil === 'medico') return <Navigate to="/portal" replace />

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-neutral-bg">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link to="/app/dashboard">
            <Logo size={32} />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {NAV.filter(item => !item.soAdmin || perms.verCorporativo(session?.perfil)).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand text-white shadow-soft'
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-3">
          <div className="rounded-xl bg-brand-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Perfil ativo
            </p>
            <p className="mt-1 font-display text-sm font-bold text-brand">
              {session?.perfil === 'admin' ? 'Sócio-Gestor' : 'Financeiro / Administrativo'}
            </p>
            <p className="mt-0.5 text-xs text-slate-600">{session?.nome}</p>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>

          <div className="flex flex-1 items-center justify-end gap-3">
            <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>

            <SwitcherContexto tema="claro" />
            <ThemeToggle />

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full bg-slate-50 py-1.5 pl-1.5 pr-3 hover:bg-slate-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-bold text-white">
                  {session?.avatar}
                </div>
                <div className="hidden text-left sm:block">
                  <div className="text-xs font-semibold leading-tight text-slate-800">{session?.nome}</div>
                  <div className="text-[10px] leading-tight text-slate-500">{session?.cargo}</div>
                </div>
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-card">
                  <div className="border-b border-slate-100 px-4 py-2">
                    <p className="text-xs font-semibold text-slate-800">{session?.nome}</p>
                    <p className="text-xs text-slate-500">{session?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={14} />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Conteúdo das rotas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
