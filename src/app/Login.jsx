import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { LogIn, AlertCircle, ArrowLeft } from 'lucide-react'
import Logo from '../site/components/Logo'
import { login, USUARIOS } from '../lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const from = location.state?.from?.pathname || '/app/dashboard'

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro('')
    const user = login(email)
    if (!user) {
      setErro('E-mail não reconhecido. Use um dos perfis de demonstração abaixo.')
      return
    }
    navigate(from, { replace: true })
  }

  const quickLogin = (e) => {
    setEmail(e)
    setSenha('demo')
    const user = login(e)
    if (user) navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen">
      {/* Lado visual */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-900 via-brand to-brand-dark p-12 text-white lg:flex lg:w-1/2">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-brand-light/30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>
        <div className="relative">
          <Logo size={44} variant="light" />
        </div>
        <div className="relative">
          <h2 className="font-display text-4xl font-extrabold leading-tight">
            Gestão inteligente <br />
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              para a medicina do futuro.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-white/75">
            Plataforma interna para gestão de médicos, lançamentos financeiros e
            acompanhamento estratégico da VIDAMED.
          </p>
        </div>
        <Link to="/" className="relative inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft size={16} />
          Voltar ao site
        </Link>
      </div>

      {/* Formulário */}
      <div className="flex flex-1 items-center justify-center bg-neutral-bg px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center justify-between">
            <Logo size={36} />
            <Link to="/" className="text-sm text-slate-600 hover:text-brand">
              ← Voltar
            </Link>
          </div>

          <h1 className="font-display text-3xl font-bold text-brand">Bem-vindo de volta</h1>
          <p className="mt-2 text-sm text-slate-600">
            Acesse a plataforma de gestão VIDAMED
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                E-mail corporativo
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@vidamedgestao.com.br"
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {erro && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{erro}</span>
              </div>
            )}

            <button type="submit" className="btn-primary w-full justify-center">
              <LogIn size={18} />
              Entrar
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Acesso rápido — Demonstração
            </p>
            <div className="mt-3 space-y-2">
              {USUARIOS.map(u => (
                <button
                  key={u.email}
                  onClick={() => quickLogin(u.email)}
                  className="flex w-full items-center gap-3 rounded-lg bg-white p-3 text-left transition hover:bg-brand-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-bold text-white">
                    {u.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-800">{u.nome}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    u.perfil === 'gestor' ? 'bg-brand/10 text-brand' : 'bg-accent/10 text-accent'
                  }`}>
                    {u.perfil === 'gestor' ? 'Gestor' : 'Financeiro'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
