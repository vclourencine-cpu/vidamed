import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts'
import {
  TrendingUp, TrendingDown, DollarSign, Wallet, Receipt,
  Users, AlertCircle, ChevronDown, ChevronUp, ArrowRight,
  Plus, Building2, Percent
} from 'lucide-react'
import { PAGAMENTOS_SEED, agregarPorCompetencia, variacao } from '../data/pagamentos'
import { MEDICOS_SEED, getMedico } from '../data/medicos'
import { INSTITUICOES, getInstituicao } from '../data/instituicoes'
import { dreCorporativo, evolucaoCorporativa, competenciasCorp } from '../lib/corporativo'
import { formatBRL, formatPercent, competenciaLabel, toTitleCase } from '../lib/storage'
import { getSession, perms } from '../lib/auth'

const COMPETENCIA_ATUAL = '2026-05'
const COMPETENCIA_ANTERIOR = '2026-04'

export default function Dashboard() {
  const session = getSession()
  const isAdmin = perms.operar(session?.perfil)
  const isCorpAdmin = perms.verCorporativo(session?.perfil)
  const [topExpandido, setTopExpandido] = useState(false)

  // ── dados operacionais ──────────────────────────────────────────
  const atual = useMemo(() => agregarPorCompetencia(COMPETENCIA_ATUAL), [])
  const anterior = useMemo(() => agregarPorCompetencia(COMPETENCIA_ANTERIOR), [])

  const variacoes = {
    bruto:   variacao(atual.bruto,          anterior.bruto),
    liquido: variacao(atual.liquido,         anterior.liquido),
    taxaAdm: variacao(atual.taxaAdm,         anterior.taxaAdm),
    medicos: variacao(atual.medicosAtivos,   anterior.medicosAtivos),
    aReceber:variacao(atual.aReceber,        anterior.aReceber)
  }

  const topMedicos = useMemo(() => Object.entries(atual.porMedico)
    .map(([id, total]) => ({ medico: getMedico(id), total }))
    .filter(t => t.medico)
    .sort((a, b) => b.total - a.total), [atual])

  const top5 = topMedicos.slice(0, 5)
  const restante = topMedicos.slice(5)
  const maiorTotal = top5[0]?.total || 1

  const lancamentosPendentes = PAGAMENTOS_SEED.filter(
    p => p.competencia === COMPETENCIA_ATUAL && (p.status === 'lancado' || !p.emailEnviado)
  )

  const porInstituicaoAtual = useMemo(() => {
    const map = {}
    PAGAMENTOS_SEED.filter(p => p.competencia === COMPETENCIA_ATUAL).forEach(p => {
      const total = p.lancamentos.reduce((s, l) => s + l.rendimento, 0)
      map[p.instituicaoId] = (map[p.instituicaoId] || 0) + total
    })
    return Object.entries(map)
      .map(([id, total]) => ({ instituicao: getInstituicao(id), total }))
      .sort((a, b) => b.total - a.total)
  }, [])

  // ── dados corporativos (só para admin) ──────────────────────────
  const competenciasCorporativo = useMemo(() => competenciasCorp(), [])
  const [compCorp, setCompCorp] = useState(competenciasCorporativo[0] || '2026-05')
  const dre = useMemo(() => dreCorporativo(compCorp), [compCorp])
  const evolucao = useMemo(() => evolucaoCorporativa(compCorp, 12), [compCorp])
  const idxCorp = evolucao.findIndex(e => e.ym === compCorp)
  const antCorp = idxCorp > 0 ? evolucao[idxCorp - 1] : null
  const varLucro = antCorp && antCorp.lucro > 0 ? ((dre.lucro - antCorp.lucro) / antCorp.lucro) * 100 : 0
  const waterfall = [
    { nome: 'Receita', base: 0,         valor: dre.receitaTotal, cor: '#003768' },
    { nome: 'Despesas',base: dre.lucro, valor: dre.despesas,     cor: '#DC2626' },
    { nome: 'Lucro',   base: 0,         valor: dre.lucro,        cor: '#009E3D' }
  ]

  const primeiroNome = session?.nome?.replace('Dr. ','').replace('Dra. ','').split(' ')[0]

  return (
    <div className="space-y-8">
      {/* ── CABEÇALHO ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Visão geral · {competenciaLabel(COMPETENCIA_ATUAL)}
          </p>
          <h1 className="font-display text-3xl font-bold text-brand">
            Bem-vindo, {primeiroNome}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Comparativo com {competenciaLabel(COMPETENCIA_ANTERIOR)}
          </p>
        </div>
        {isAdmin && (
          <Link to="/app/pagamentos/lancar" className="btn-primary text-sm">
            <Plus size={16} /> Lançar faturamento
          </Link>
        )}
      </div>

      {/* ── BLOCO 1: RESULTADO DA EMPRESA (só admin) ──────────────── */}
      {isCorpAdmin && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Building2 size={16} />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-brand">Resultado da empresa</h2>
                <p className="text-xs text-slate-500">O que a Vidamed fatura e gera de lucro</p>
              </div>
            </div>
            <select value={compCorp} onChange={e => setCompCorp(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20">
              {competenciasCorporativo.map(c => <option key={c} value={c}>{competenciaLabel(c)}</option>)}
            </select>
          </div>

          {/* KPIs corporativos */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <KPICard titulo="Receita Vidamed" valor={formatBRL(dre.receitaTotal)} icon={Wallet} accent
                     extra={<span className="text-xs text-white/70">17% + R$120/médico</span>} />
            <KPICard titulo="Despesas" valor={`−${formatBRL(dre.despesas)}`} icon={TrendingDown} cor="text-red-600"
                     extra={<span className="text-xs text-slate-400">operação da empresa</span>} />
            <KPICard titulo="Lucro líquido" valor={formatBRL(dre.lucro)} icon={TrendingUp} cor="text-emerald-600"
                     extra={antCorp && <span className={`text-xs font-bold ${varLucro >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{formatPercent(varLucro)} vs mês ant.</span>} />
            <KPICard titulo="Margem líquida" valor={`${dre.margem.toFixed(0)}%`} icon={Percent}
                     extra={<span className="text-xs text-slate-400">{dre.medicosAtivos} médicos ativos</span>} />
          </div>

          {/* DRE waterfall + composição */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card">
              <h3 className="font-display text-base font-bold text-brand">Da receita ao lucro</h3>
              <p className="text-xs text-slate-500">Receita menos despesas operacionais.</p>
              <div className="mt-2 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterfall} margin={{ top: 12, right: 8, left: 8, bottom: 0 }}>
                    <XAxis dataKey="nome" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,.03)' }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null
                        const d = payload.find(p => p.dataKey === 'valor')?.payload
                        return d ? <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-white"><p className="font-semibold">{d.nome}</p><p className="font-mono">{formatBRL(d.valor)}</p></div> : null
                      }} />
                    <Bar dataKey="base" stackId="a" fill="transparent" />
                    <Bar dataKey="valor" stackId="a" radius={[6,6,0,0]} isAnimationActive={false}>
                      {waterfall.map((d, i) => <Cell key={i} fill={d.cor} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-base font-bold text-brand">Composição da receita</h3>
              <p className="text-xs text-slate-500">De onde vem o faturamento da Vidamed.</p>
              <div className="mt-5 space-y-4">
                <Composicao label="17% sobre faturamento dos médicos" valor={dre.receitaPercentual} total={dre.receitaTotal} cor="#003768" />
                <Composicao label="Taxa fixa (R$120 × médicos)" valor={dre.receitaFixa} total={dre.receitaTotal} cor="#1e5a8f" />
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">Volume gerido dos médicos</span>
                    <span className="font-mono text-sm font-bold text-slate-800">{formatBRL(dre.faturamentoMedicos)}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">A Vidamed administra esse volume e fica com a taxa.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Evolução da empresa */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-brand">Evolução da empresa</h3>
                <p className="text-xs text-slate-500">Receita e lucro nos últimos 12 meses.</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-brand" /> Receita</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-accent" /> Lucro</span>
              </div>
            </div>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucao} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} width={36} />
                  <Tooltip formatter={(v, n) => [formatBRL(v), n === 'receita' ? 'Receita' : 'Lucro']}
                           contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Line type="monotone" dataKey="receita" stroke="#003768" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="lucro"   stroke="#009E3D" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Divisor visual entre os dois blocos */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-slate-200" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Operação dos médicos</span>
            <div className="flex-1 border-t border-slate-200" />
          </div>
        </section>
      )}

      {/* ── BLOCO 2: OPERAÇÃO DOS MÉDICOS ──────────────────────────── */}
      <section className="space-y-4">
        {/* Pendências */}
        {lancamentosPendentes.length > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Pendências</p>
                <p className="text-sm font-semibold text-amber-900">
                  {lancamentosPendentes.length} {lancamentosPendentes.length === 1 ? 'lançamento aguardando' : 'lançamentos aguardando'} emissão de nota
                </p>
              </div>
            </div>
            {isAdmin && (
              <Link to="/app/pagamentos" className="inline-flex items-center gap-1 rounded-full bg-amber-700 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-800">
                Resolver agora <ArrowRight size={12} />
              </Link>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Tudo em dia</p>
              <p className="text-sm font-semibold text-emerald-900">Nenhuma pendência operacional no momento.</p>
            </div>
          </div>
        )}

        {/* KPIs operacionais */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <KPICard titulo="Faturamento bruto" valor={formatBRL(atual.bruto)} variacao={variacoes.bruto}
                   referencia={formatBRL(anterior.bruto)} icon={DollarSign} accent />
          <KPICard titulo="Valor líquido pago" valor={formatBRL(atual.liquido)} variacao={variacoes.liquido}
                   referencia={formatBRL(anterior.liquido)} icon={Wallet} />
          <KPICard titulo="Taxa adm. arrecadada" valor={formatBRL(atual.taxaAdm)} variacao={variacoes.taxaAdm}
                   referencia={formatBRL(anterior.taxaAdm)} icon={Receipt} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <KPICard titulo="Médicos ativos no mês" valor={atual.medicosAtivos.toString()} variacao={variacoes.medicos}
                   referencia={`${anterior.medicosAtivos} em ${competenciaLabel(COMPETENCIA_ANTERIOR).split('/')[0]}`} icon={Users} />
          <KPICard titulo="A receber no mês" valor={formatBRL(atual.aReceber)} variacao={variacoes.aReceber}
                   referencia={`${PAGAMENTOS_SEED.filter(p => p.competencia === COMPETENCIA_ATUAL).length} lançamentos`} icon={AlertCircle} />
        </div>

        {/* Top médicos */}
        <div className="card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold text-brand">Top 5 médicos — faturamento do mês</h2>
              <p className="text-xs text-slate-500">Ranking por valor bruto em {competenciaLabel(COMPETENCIA_ATUAL)}</p>
            </div>
            {restante.length > 0 && (
              <button onClick={() => setTopExpandido(!topExpandido)}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand hover:bg-brand hover:text-white">
                {topExpandido ? <>Ver apenas top 5 <ChevronUp size={14} /></> : <>Ver todos ({topMedicos.length}) <ChevronDown size={14} /></>}
              </button>
            )}
          </div>
          <div className="mt-6 space-y-3">
            {(topExpandido ? topMedicos : top5).map((item, i) => (
              <RankItem key={item.medico.id} posicao={i + 1} medico={item.medico} total={item.total} maior={maiorTotal} />
            ))}
          </div>
        </div>

        {/* Faturamento por instituição */}
        <div className="card">
          <h2 className="font-display text-lg font-bold text-brand">Faturamento por instituição</h2>
          <p className="text-xs text-slate-500">Distribuição em {competenciaLabel(COMPETENCIA_ATUAL)}</p>
          <div className="mt-6 space-y-3">
            {porInstituicaoAtual.map(({ instituicao, total }) => {
              const pct = (total / atual.bruto) * 100
              return (
                <div key={instituicao.id}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: instituicao.cor }} />
                      <span className="font-medium text-slate-800">{instituicao.nome}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{pct.toFixed(1)}%</span>
                      <span className="font-semibold text-brand">{formatBRL(total)}</span>
                    </div>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: instituicao.cor }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Componentes auxiliares ────────────────────────────────────────────

function KPICard({ titulo, valor, variacao, referencia, icon: Icon, accent, isNumero, cor, extra }) {
  const positiva = variacao === undefined ? true : variacao >= 0
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 shadow-soft ring-1 ${
      accent ? 'bg-gradient-to-br from-brand to-brand-dark text-white ring-brand' : 'bg-white ring-slate-100'
    }`}>
      {accent && <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />}
      <div className="relative flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wider ${accent ? 'text-white/80' : 'text-slate-500'}`}>{titulo}</p>
        <Icon size={18} className={accent ? 'text-accent-light' : 'text-brand/60'} />
      </div>
      <p className={`relative mt-3 font-display text-3xl font-bold ${accent ? 'text-white' : cor || 'text-brand'}`}>{valor}</p>
      {variacao !== undefined && (
        <div className="relative mt-3 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold ${
            positiva
              ? (accent ? 'bg-accent-light/20 text-accent-light' : 'bg-emerald-100 text-emerald-700')
              : (accent ? 'bg-red-500/20 text-red-200' : 'bg-red-100 text-red-700')
          }`}>
            {positiva ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatPercent(variacao)}
          </span>
          <span className={`text-xs ${accent ? 'text-white/60' : 'text-slate-500'}`}>vs {referencia}</span>
        </div>
      )}
      {extra && <div className="relative mt-1">{extra}</div>}
    </div>
  )
}

function RankItem({ posicao, medico, total, maior }) {
  const pct = (total / maior) * 100
  return (
    <Link to={`/app/medicos/${medico.id}`} className="block rounded-xl p-3 transition hover:bg-slate-50">
      <div className="flex items-center gap-4">
        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-display font-bold ${
          posicao === 1 ? 'bg-accent text-white' : posicao === 2 ? 'bg-brand text-white' : posicao === 3 ? 'bg-brand-light text-white' : 'bg-slate-100 text-slate-600'
        }`}>{posicao}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-slate-800">{toTitleCase(medico.nome)}</p>
            <p className="font-mono text-sm font-bold text-brand">{formatBRL(total)}</p>
          </div>
          <p className="text-xs text-slate-500">{medico.especialidade} · CRM {medico.crm}</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </Link>
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
