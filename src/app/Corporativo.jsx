import { useMemo, useState } from 'react'
import {
  BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { Building2, TrendingDown, TrendingUp, Wallet, PieChart, Users, Percent } from 'lucide-react'
import { dreCorporativo, evolucaoCorporativa, competenciasCorp } from '../lib/corporativo'
import { formatBRL, competenciaLabel, formatPercent } from '../lib/storage'

export default function Corporativo() {
  const competencias = useMemo(() => competenciasCorp(), [])
  const [competencia, setCompetencia] = useState(competencias[0] || '2026-05')

  const dre = useMemo(() => dreCorporativo(competencia), [competencia])
  const evolucao = useMemo(() => evolucaoCorporativa(competencia, 12), [competencia])

  const idx = evolucao.findIndex(e => e.ym === competencia)
  const ant = idx > 0 ? evolucao[idx - 1] : null
  const varLucro = ant && ant.lucro > 0 ? ((dre.lucro - ant.lucro) / ant.lucro) * 100 : 0

  const waterfall = [
    { nome: 'Receita', base: 0, valor: dre.receitaTotal, cor: '#003768' },
    { nome: 'Despesas', base: dre.lucro, valor: dre.despesas, cor: '#DC2626' },
    { nome: 'Lucro', base: 0, valor: dre.lucro, cor: '#009E3D' }
  ]

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600">
            <Building2 size={13} /> Visão dos sócios · confidencial
          </p>
          <h1 className="font-display text-3xl font-bold text-brand">Resultado da Vidamed</h1>
          <p className="mt-1 text-sm text-slate-600">O que a empresa fatura, gasta e distribui — {competenciaLabel(competencia)}.</p>
        </div>
        <select value={competencia} onChange={(e) => setCompetencia(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
          {competencias.map(c => <option key={c} value={c}>{competenciaLabel(c)}</option>)}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <KPI titulo="Receita Vidamed" valor={formatBRL(dre.receitaTotal)} icon={Wallet} accent
             extra={<span className="text-xs text-white/70">17% + R$120/médico</span>} />
        <KPI titulo="Despesas" valor={`−${formatBRL(dre.despesas)}`} icon={TrendingDown} cor="text-red-600"
             extra={<span className="text-xs text-slate-400">operação da empresa</span>} />
        <KPI titulo="Lucro líquido" valor={formatBRL(dre.lucro)} icon={TrendingUp} cor="text-emerald-600"
             extra={ant && <span className={`text-xs font-bold ${varLucro >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatPercent(varLucro)} vs mês ant.</span>} />
        <KPI titulo="Margem líquida" valor={`${dre.margem.toFixed(0)}%`} icon={Percent}
             extra={<span className="text-xs text-slate-400">{dre.medicosAtivos} médicos ativos</span>} />
      </div>

      {/* Waterfall + composição da receita */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-base font-bold text-brand">Da receita ao lucro</h2>
          <p className="text-xs text-slate-500">Receita da empresa menos despesas operacionais.</p>
          <div className="mt-2 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfall} margin={{ top: 16, right: 8, left: 8, bottom: 0 }}>
                <XAxis dataKey="nome" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,.03)' }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const d = payload.find(p => p.dataKey === 'valor')?.payload
                    return d ? <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-white"><p className="font-semibold">{d.nome}</p><p className="font-mono">{formatBRL(d.valor)}</p></div> : null
                  }} />
                <Bar dataKey="base" stackId="a" fill="transparent" />
                <Bar dataKey="valor" stackId="a" radius={[6, 6, 0, 0]} isAnimationActive={false}>
                  {waterfall.map((d, i) => <Cell key={i} fill={d.cor} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="font-display text-base font-bold text-brand">Composição da receita</h2>
          <p className="text-xs text-slate-500">De onde vem o faturamento da Vidamed.</p>
          <div className="mt-5 space-y-4">
            <Composicao label="17% sobre faturamento dos médicos" valor={dre.receitaPercentual} total={dre.receitaTotal} cor="#003768" />
            <Composicao label="Taxa fixa (R$120 × médicos)" valor={dre.receitaFixa} total={dre.receitaTotal} cor="#1e5a8f" />
            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Faturamento gerido dos médicos</span>
                <span className="font-mono text-sm font-bold text-slate-800">{formatBRL(dre.faturamentoMedicos)}</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">A Vidamed administra esse volume e fica com a taxa.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divisão entre sócios */}
      <div className="card">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-brand" />
          <h2 className="font-display text-base font-bold text-brand">Divisão do lucro entre os sócios</h2>
        </div>
        <p className="text-xs text-slate-500">Distribuição de {formatBRL(dre.lucro)} conforme participação societária.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {dre.socios.map(s => (
            <div key={s.id} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl font-bold text-white" style={{ backgroundColor: s.cor }}>{s.avatar}</div>
                <div>
                  <p className="font-display font-bold text-slate-800">{s.nome}</p>
                  <p className="text-[11px] text-slate-500">{s.cargo}</p>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="font-display text-2xl font-bold text-brand">{formatBRL(s.valor)}</p>
                  <p className="text-[11px] text-slate-500">{s.pct}% de participação</p>
                </div>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.cor }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evolução */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-brand">Evolução da empresa</h2>
            <p className="text-xs text-slate-500">Receita e lucro nos últimos 12 meses.</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-brand" /> Receita</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-accent" /> Lucro</span>
          </div>
        </div>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolucao} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
              <Tooltip formatter={(v, n) => [formatBRL(v), n === 'receita' ? 'Receita' : 'Lucro']}
                       contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Line type="monotone" dataKey="receita" stroke="#003768" strokeWidth={2.5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="lucro" stroke="#009E3D" strokeWidth={2.5} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function KPI({ titulo, valor, icon: Icon, accent, cor, extra }) {
  return (
    <div className={`rounded-2xl p-4 shadow-soft ring-1 ${accent ? 'bg-gradient-to-br from-brand to-brand-dark text-white ring-brand' : 'bg-white ring-slate-100'}`}>
      <div className="flex items-center justify-between">
        <p className={`text-[11px] font-semibold uppercase tracking-wider ${accent ? 'text-white/80' : 'text-slate-500'}`}>{titulo}</p>
        <Icon size={16} className={accent ? 'text-accent-light' : 'text-slate-300'} />
      </div>
      <p className={`mt-2 font-display text-2xl font-bold tabular-nums ${accent ? 'text-white' : cor || 'text-brand'}`}>{valor}</p>
      <div className="mt-1">{extra}</div>
    </div>
  )
}

function Composicao({ label, valor, total, cor }) {
  const pct = total > 0 ? (valor / total) * 100 : 0
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-mono font-semibold text-slate-800">{formatBRL(valor)}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: cor }} />
      </div>
    </div>
  )
}
