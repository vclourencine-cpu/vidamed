import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus, Search, Filter, ArrowRight, Mail, CheckCircle2, Clock, FileText
} from 'lucide-react'
import { PAGAMENTOS_SEED } from '../../data/pagamentos'
import { INSTITUICOES, getInstituicao } from '../../data/instituicoes'
import { formatBRL, formatDate, competenciaLabel } from '../../lib/storage'
import { getSession, perms } from '../../lib/auth'

const STATUS_LABEL = {
  lancado: { label: 'Lançado', cor: 'bg-amber-100 text-amber-700', icon: Clock },
  nota_emitida: { label: 'Nota emitida', cor: 'bg-blue-100 text-blue-700', icon: FileText },
  pago: { label: 'Pago', cor: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 }
}

export default function PagamentoHistorico() {
  const session = getSession()
  const isAdmin = perms.operar(session?.perfil)
  const [busca, setBusca] = useState('')
  const [filtroCompetencia, setFiltroCompetencia] = useState('todas')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [filtroInstituicao, setFiltroInstituicao] = useState('todas')

  const competencias = useMemo(
    () => [...new Set(PAGAMENTOS_SEED.map(p => p.competencia))].sort().reverse(),
    []
  )

  const pagamentosFiltrados = useMemo(() => {
    return PAGAMENTOS_SEED
      .filter(p => {
        const inst = getInstituicao(p.instituicaoId)
        if (busca && !inst?.nome.toLowerCase().includes(busca.toLowerCase()) &&
            !p.notaNumero?.toLowerCase().includes(busca.toLowerCase())) return false
        if (filtroCompetencia !== 'todas' && p.competencia !== filtroCompetencia) return false
        if (filtroStatus !== 'todos' && p.status !== filtroStatus) return false
        if (filtroInstituicao !== 'todas' && p.instituicaoId !== filtroInstituicao) return false
        return true
      })
      .sort((a, b) => b.competencia.localeCompare(a.competencia) || b.notaNumero?.localeCompare(a.notaNumero))
  }, [busca, filtroCompetencia, filtroStatus, filtroInstituicao])

  const totalBruto = pagamentosFiltrados.reduce(
    (s, p) => s + p.lancamentos.reduce((ss, l) => ss + l.rendimento, 0),
    0
  )

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Faturamento
          </p>
          <h1 className="font-display text-3xl font-bold text-brand">Pagamentos</h1>
          <p className="mt-1 text-sm text-slate-600">
            {pagamentosFiltrados.length} {pagamentosFiltrados.length === 1 ? 'lançamento' : 'lançamentos'} · Total bruto {formatBRL(totalBruto)}
          </p>
        </div>
        {isAdmin && (
          <Link to="/app/pagamentos/lancar" className="btn-primary text-sm">
            <Plus size={16} />
            Lançar faturamento
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
              placeholder="Buscar por instituição ou número da nota..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <Filter size={14} className="text-slate-400" />
          <select
            value={filtroCompetencia}
            onChange={(e) => setFiltroCompetencia(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="todas">Todas as competências</option>
            {competencias.map(c => (
              <option key={c} value={c}>{competenciaLabel(c)}</option>
            ))}
          </select>
          <select
            value={filtroInstituicao}
            onChange={(e) => setFiltroInstituicao(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="todas">Todas instituições</option>
            {INSTITUICOES.map(i => (
              <option key={i.id} value={i.id}>{i.nome}</option>
            ))}
          </select>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="todos">Todos os status</option>
            <option value="lancado">Lançado</option>
            <option value="nota_emitida">Nota emitida</option>
            <option value="pago">Pago</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {pagamentosFiltrados.map(p => {
          const inst = getInstituicao(p.instituicaoId)
          const statusInfo = STATUS_LABEL[p.status]
          const totalBruto = p.lancamentos.reduce((s, l) => s + l.rendimento, 0)
          const totalLiquido = p.lancamentos.reduce((s, l) => s + l.caiuNaConta, 0)
          return (
            <Link
              key={p.id}
              to={`/app/pagamentos/${p.id}`}
              className="block rounded-2xl bg-white p-4 shadow-soft ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: inst?.cor }}
                  >
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2">
                      <h3 className="font-display text-base font-bold text-brand">{inst?.nome}</h3>
                      <span className="text-xs text-slate-500">· Nota {p.notaNumero}</span>
                      <span className="text-xs text-slate-500">· {competenciaLabel(p.competencia)}</span>
                      <span className="text-xs text-slate-500">· {p.lancamentos.length} {p.lancamentos.length === 1 ? 'médico' : 'médicos'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Bruto</p>
                    <p className="font-mono text-sm font-bold text-slate-700">{formatBRL(totalBruto)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Líquido</p>
                    <p className="font-mono text-sm font-bold text-emerald-700">{formatBRL(totalLiquido)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 border-l border-slate-100 pl-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusInfo.cor}`}>
                      <statusInfo.icon size={10} />
                      {statusInfo.label}
                    </span>
                    {p.emailEnviado && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
                        <Mail size={10} />
                        Notificada
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                {p.dataPagamento && (
                  <span>Pago em {formatDate(p.dataPagamento)} · </span>
                )}
                <span className="inline-flex items-center gap-1 font-semibold text-brand">
                  Ver detalhes
                  <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          )
        })}

        {pagamentosFiltrados.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-soft">
            <p className="text-sm text-slate-500">Nenhum lançamento encontrado com os filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
