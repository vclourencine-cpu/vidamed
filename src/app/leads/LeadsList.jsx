import { useMemo, useState } from 'react'
import {
  TrendingUp, TrendingDown, Users, Target, Award, Filter, Search,
  LayoutGrid, List, Plus, X
} from 'lucide-react'
import { LEADS_SEED, leadsPorEstagio, topIndicadores, conversao } from '../../data/leads'
import { CAPTADORES, ESTAGIOS, ORIGENS, getCaptador } from '../../data/captadores'
import { getMedico } from '../../data/medicos'
import { formatDate, formatPercent, toTitleCase, competenciaLabel } from '../../lib/storage'
import { getSession } from '../../lib/auth'
import LeadCard from './components/LeadCard'
import LeadDetalhe from './components/LeadDetalhe'

export default function LeadsList() {
  const session = getSession()
  const [view, setView] = useState('kanban') // 'kanban' | 'lista'
  const [showHistorico, setShowHistorico] = useState(false) // mostra colunas Convertido/Perdido
  const [leads, setLeads] = useState(LEADS_SEED)
  const [busca, setBusca] = useState('')
  const [filtroOrigem, setFiltroOrigem] = useState('todas')
  const [filtroCaptador, setFiltroCaptador] = useState('todos')
  const [leadAberto, setLeadAberto] = useState(null)
  const [draggedId, setDraggedId] = useState(null)

  const leadsFiltrados = useMemo(() => {
    return leads.filter(l => {
      if (busca && !l.nome.toLowerCase().includes(busca.toLowerCase()) &&
          !(l.crm || '').toLowerCase().includes(busca.toLowerCase()) &&
          !(l.email || '').toLowerCase().includes(busca.toLowerCase())) return false
      if (filtroOrigem !== 'todas' && l.origem !== filtroOrigem) return false
      if (filtroCaptador !== 'todos' && l.captadorId !== filtroCaptador) return false
      return true
    })
  }, [leads, busca, filtroOrigem, filtroCaptador])

  const porEstagio = useMemo(() => leadsPorEstagio(leadsFiltrados), [leadsFiltrados])
  const taxaConversao = useMemo(() => conversao(leads), [leads])
  const topIndic = useMemo(() => topIndicadores(leads).slice(0, 5), [leads])

  const kpis = {
    novos: porEstagio.novo.length,
    contato: porEstagio.qualificando.length,
    negociacao: porEstagio.negociando.length + porEstagio.onboarding.length,
    convertidos: porEstagio.convertido.length,
    perdidos: porEstagio.perdido.length
  }

  const handleDrop = (estagioDest) => {
    if (!draggedId) return
    setLeads(prev => prev.map(l =>
      l.id === draggedId
        ? {
            ...l,
            estagio: estagioDest,
            historico: [
              { data: new Date().toISOString(), tipo: 'estagio', desc: `Movido para ${ESTAGIOS.find(e => e.id === estagioDest)?.label}` },
              ...l.historico
            ]
          }
        : l
    ))
    setDraggedId(null)
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Captação · funil de vendas
          </p>
          <h1 className="font-display text-3xl font-bold text-brand">Leads</h1>
          <p className="mt-1 text-sm text-slate-600">
            {leadsFiltrados.length} leads ativos · {leads.filter(l => l.estagio === 'convertido').length} convertidos em 2024-2026
          </p>
        </div>
        <button className="btn-primary text-sm">
          <Plus size={16} />
          Novo lead
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <KPI titulo="Novos no mês" valor={kpis.novos} variacao={12.5} icon={Users} accent />
        <KPI titulo="Em contato" valor={kpis.contato} variacao={4} icon={Target} />
        <KPI titulo="Em negociação" valor={kpis.negociacao} variacao={0} icon={Target} />
        <KPI titulo="Convertidos" valor={kpis.convertidos} variacao={60} icon={Award} positiva />
        <KPI titulo="Taxa conversão" valor={`${taxaConversao.toFixed(0)}%`} variacao={3} icon={TrendingUp} sufixo="pp" />
      </div>

      {/* Top indicadores */}
      {topIndic.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-white p-5 shadow-soft ring-1 ring-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-accent" />
            <h3 className="font-display text-base font-bold text-brand">Top indicadores — protocolo de indicação</h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {topIndic.map((t, i) => {
              const m = getMedico(t.medicoId)
              if (!m) return null
              return (
                <div key={t.medicoId} className="flex items-center gap-2 rounded-xl bg-white p-2.5 ring-1 ring-slate-100">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white text-xs ${
                    i === 0 ? 'bg-accent' : i === 1 ? 'bg-brand' : 'bg-slate-400'
                  }`}>{i + 1}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-800">{toTitleCase(m.nome)}</p>
                    <p className="text-[10px] text-slate-500">{t.total} indic. · {t.convertidos} ✓</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar lead por nome, CRM, e-mail..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <Filter size={14} className="text-slate-400" />
          <select
            value={filtroOrigem}
            onChange={(e) => setFiltroOrigem(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="todas">Todas origens</option>
            {Object.entries(ORIGENS).map(([k, v]) => (
              <option key={k} value={k}>{v.icon} {v.label}</option>
            ))}
          </select>
          <select
            value={filtroCaptador}
            onChange={(e) => setFiltroCaptador(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="todos">Todos captadores</option>
            {CAPTADORES.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
          <div className="ml-auto flex rounded-lg bg-slate-100 p-1">
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                view === 'kanban' ? 'bg-white text-brand shadow-soft' : 'text-slate-500'
              }`}
            >
              <LayoutGrid size={14} /> Kanban
            </button>
            <button
              onClick={() => setView('lista')}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                view === 'lista' ? 'bg-white text-brand shadow-soft' : 'text-slate-500'
              }`}
            >
              <List size={14} /> Lista
            </button>
          </div>
        </div>
      </div>

      {/* KANBAN */}
      {view === 'kanban' && (
        <>
          {/* Tab funil ativo vs histórico */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setShowHistorico(false)}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  !showHistorico ? 'bg-white text-brand shadow-soft' : 'text-slate-500'
                }`}
              >
                <Target size={12} /> Funil ativo
                <span className="ml-1 rounded-full bg-slate-200 px-1.5 text-[10px] text-slate-600">
                  {porEstagio.novo.length + porEstagio.qualificando.length + porEstagio.negociando.length + porEstagio.onboarding.length}
                </span>
              </button>
              <button
                onClick={() => setShowHistorico(true)}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  showHistorico ? 'bg-white text-brand shadow-soft' : 'text-slate-500'
                }`}
              >
                <Award size={12} /> Histórico
                <span className="ml-1 rounded-full bg-slate-200 px-1.5 text-[10px] text-slate-600">
                  {porEstagio.convertido.length + porEstagio.perdido.length}
                </span>
              </button>
            </div>
            <p className="text-xs text-slate-500">
              💡 Arraste cards entre colunas para mover de estágio
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-4">
            {(showHistorico
              ? ESTAGIOS.filter(e => e.id === 'convertido' || e.id === 'perdido')
              : ESTAGIOS.filter(e => e.id !== 'convertido' && e.id !== 'perdido')
            ).map(estagio => (
              <KanbanColumn
                key={estagio.id}
                estagio={estagio}
                leads={porEstagio[estagio.id] || []}
                onDrop={() => handleDrop(estagio.id)}
                onDragStart={(id) => setDraggedId(id)}
                onLeadClick={(l) => setLeadAberto(l)}
              />
            ))}
          </div>
        </>
      )}

      {/* LISTA */}
      {view === 'lista' && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Lead</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Origem</th>
                  <th className="px-4 py-3">Captador</th>
                  <th className="px-4 py-3">Próximo contato</th>
                  <th className="px-4 py-3">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {leadsFiltrados.map(l => {
                  const estagio = ESTAGIOS.find(e => e.id === l.estagio)
                  const origem = ORIGENS[l.origem]
                  const captador = getCaptador(l.captadorId)
                  return (
                    <tr
                      key={l.id}
                      onClick={() => setLeadAberto(l)}
                      className="cursor-pointer border-b border-slate-50 transition hover:bg-slate-50/50"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-800">{toTitleCase(l.nome)}</p>
                        <p className="text-xs text-slate-500">{l.crm || 'sem CRM'} · {l.telefone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                          style={{ backgroundColor: estagio?.cor }}
                        >
                          {estagio?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-700">
                          {origem?.icon} {origem?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-700">{captador?.nome || '—'}</td>
                      <td className="px-4 py-3 text-xs text-slate-700">
                        {l.proximaAcao?.data ? formatDate(l.proximaAcao.data) : '—'}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{formatDate(l.criadoEm)}</td>
                    </tr>
                  )
                })}
                {leadsFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">
                      Nenhum lead encontrado com esses filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal de detalhe */}
      {leadAberto && (
        <LeadDetalhe
          lead={leadAberto}
          onClose={() => setLeadAberto(null)}
          onMover={(estagio) => {
            setLeads(prev => prev.map(l => l.id === leadAberto.id ? { ...l, estagio } : l))
            setLeadAberto(null)
          }}
        />
      )}
    </div>
  )
}

function KanbanColumn({ estagio, leads, onDrop, onDragStart, onLeadClick }) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="rounded-2xl bg-slate-50 p-2.5"
    >
      <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: estagio.cor }} />
          <h3 className="font-display text-sm font-bold text-brand">{estagio.label}</h3>
          <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500">{leads.length}</span>
        </div>
      </div>
      <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
        {leads.map(l => (
          <LeadCard
            key={l.id}
            lead={l}
            onClick={() => onLeadClick(l)}
            onDragStart={() => onDragStart(l.id)}
          />
        ))}
        {leads.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-4 text-center text-[10px] text-slate-400">
            Sem leads neste estágio
          </div>
        )}
      </div>
    </div>
  )
}

function KPI({ titulo, valor, variacao, icon: Icon, accent, positiva, sufixo }) {
  const isPos = variacao >= 0
  return (
    <div className={`rounded-2xl p-4 shadow-soft ring-1 ${
      accent ? 'bg-gradient-to-br from-brand to-brand-dark text-white ring-brand' : 'bg-white ring-slate-100'
    }`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wider ${accent ? 'text-white/80' : 'text-slate-500'}`}>
          {titulo}
        </p>
        <Icon size={16} className={accent ? 'text-accent-light' : 'text-brand/60'} />
      </div>
      <p className={`mt-2 font-display text-3xl font-bold ${accent ? 'text-white' : 'text-brand'}`}>{valor}</p>
      <div className="mt-1 flex items-center gap-1.5">
        <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
          isPos
            ? (accent ? 'bg-accent-light/20 text-accent-light' : 'bg-emerald-100 text-emerald-700')
            : (accent ? 'bg-red-500/20 text-red-200' : 'bg-red-100 text-red-700')
        }`}>
          {isPos ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPos ? '+' : ''}{variacao}{sufixo || '%'}
        </span>
        <span className={`text-[10px] ${accent ? 'text-white/60' : 'text-slate-500'}`}>vs Abr</span>
      </div>
    </div>
  )
}
