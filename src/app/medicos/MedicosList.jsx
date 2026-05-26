import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Filter, FileText, Phone, Mail, MoreVertical, CheckCircle2 } from 'lucide-react'
import { MEDICOS_SEED } from '../../data/medicos'
import { getSession } from '../../lib/auth'
import { formatDate } from '../../lib/storage'

export default function MedicosList() {
  const session = getSession()
  const isAdmin = session?.perfil === 'admin'
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroEspecialidade, setFiltroEspecialidade] = useState('todas')

  const especialidades = useMemo(
    () => [...new Set(MEDICOS_SEED.map(m => m.especialidade))],
    []
  )

  const medicosFiltrados = useMemo(() => {
    return MEDICOS_SEED.filter(m => {
      if (busca && !m.nome.toLowerCase().includes(busca.toLowerCase()) &&
          !m.crm.toLowerCase().includes(busca.toLowerCase()) &&
          !m.cpf.includes(busca)) return false
      if (filtroStatus !== 'todos' && m.status !== filtroStatus) return false
      if (filtroEspecialidade !== 'todas' && m.especialidade !== filtroEspecialidade) return false
      return true
    })
  }, [busca, filtroStatus, filtroEspecialidade])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Cadastros
          </p>
          <h1 className="font-display text-3xl font-bold text-brand">Médicos</h1>
          <p className="mt-1 text-sm text-slate-600">
            {medicosFiltrados.length} {medicosFiltrados.length === 1 ? 'médico' : 'médicos'} {busca || filtroStatus !== 'todos' || filtroEspecialidade !== 'todas' ? 'encontrados' : 'cadastrados'}
          </p>
        </div>
        {isAdmin && (
          <Link to="/app/medicos/novo" className="btn-primary text-sm">
            <Plus size={16} />
            Novo médico
          </Link>
        )}
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, CRM ou CPF..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter size={14} />
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            >
              <option value="todos">Todos os status</option>
              <option value="ativo">Ativo</option>
              <option value="pendente">Pendente</option>
              <option value="inativo">Inativo</option>
            </select>
            <select
              value={filtroEspecialidade}
              onChange={(e) => setFiltroEspecialidade(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            >
              <option value="todas">Todas as especialidades</option>
              {especialidades.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Médico</th>
                <th className="px-4 py-3">CRM</th>
                <th className="px-4 py-3">Especialidade</th>
                <th className="px-4 py-3">Contato</th>
                <th className="px-4 py-3">Cadastro</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {medicosFiltrados.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-slate-50 transition hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3">
                    <Link to={`/app/medicos/${m.id}`} className="flex items-center gap-3 hover:text-brand">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                        {m.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{m.nome}</p>
                        <p className="text-xs text-slate-500">{m.cpf}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{m.crm}</td>
                  <td className="px-4 py-3 text-slate-600">{m.especialidade}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5 text-xs">
                      <span className="flex items-center gap-1 text-slate-600">
                        <Phone size={11} /> {m.telefone}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Mail size={11} /> {m.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{formatDate(m.cadastradoEm)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      m.status === 'ativo'
                        ? 'bg-emerald-100 text-emerald-700'
                        : m.status === 'pendente'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {m.status === 'ativo' && <CheckCircle2 size={10} />}
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/app/medicos/${m.id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-brand hover:text-white"
                    >
                      <FileText size={12} />
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
              {medicosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
                    Nenhum médico encontrado com os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
