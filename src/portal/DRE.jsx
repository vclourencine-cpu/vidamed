import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import { TrendingUp, TrendingDown, Wallet, Receipt, DollarSign, ArrowRight, Building2 } from 'lucide-react'
import { getSession } from '../lib/auth'
import { getMedico } from '../data/medicos'
import { dreMedico, evolucaoMedico, porInstituicaoMedico, extratoMedico, competenciasMedico } from '../lib/dre'
import { formatBRL, competenciaLabel, formatDate, toTitleCase } from '../lib/storage'
import WaterfallDRE from './components/WaterfallDRE'

export default function DRE() {
  const session = getSession()
  const medicoId = session?.medicoId || 'm001'
  const medico = getMedico(medicoId)

  const competencias = useMemo(() => competenciasMedico(medicoId), [medicoId])
  const [competencia, setCompetencia] = useState(competencias[0] || '2026-05')

  const dre = useMemo(() => dreMedico(medicoId, competencia), [medicoId, competencia])
  const evolucao = useMemo(() => evolucaoMedico(medicoId, 12), [medicoId])
  const porInst = useMemo(() => porInstituicaoMedico(medicoId, competencia), [medicoId, competencia])
  const extrato = useMemo(() => extratoMedico(medicoId, competencia), [medicoId, competencia])

  // variação vs mês anterior na série
  const idxAtual = evolucao.findIndex(e => e.ym === competencia)
  const anterior = idxAtual > 0 ? evolucao[idxAtual - 1] : null
  const varBruto = anterior && anterior.bruto > 0 ? ((dre.bruto - anterior.bruto) / anterior.bruto) * 100 : 0

  const semDados = dre.bruto === 0

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">Seu resultado financeiro</p>
          <h1 className="font-display text-2xl font-bold text-slate-800 sm:text-3xl">
            Olá, Dr. {toTitleCase(medico?.nome || '').split(' ')[0] || 'Doutor'} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">Veja como ficou o seu mês, do bruto ao que caiu na conta.</p>
        </div>
        <select
          value={competencia}
          onChange={(e) => setCompetencia(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          {competencias.map(c => <option key={c} value={c}>{competenciaLabel(c)}</option>)}
        </select>
      </div>

      {semDados ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Wallet size={26} />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-slate-700">Nenhum lançamento em {competenciaLabel(competencia)}</h3>
          <p className="mt-1 text-sm text-slate-500">Seus pagamentos aparecem aqui assim que forem processados.</p>
        </div>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <KPI titulo="Faturamento bruto" valor={formatBRL(dre.bruto)} icon={DollarSign}
                 extra={anterior && <Variacao v={varBruto} />} />
            <KPI titulo="Impostos retidos" valor={`−${formatBRL(dre.impostos)}`} icon={Receipt}
                 cor="text-red-600" extra={<span className="text-xs text-slate-400">{dre.percentImposto}% na fonte</span>} />
            <KPI titulo="Taxa administrativa" valor={dre.taxaAdm > 0 ? `−${formatBRL(dre.taxaAdm)}` : 'R$ 0,00'} icon={Building2}
                 cor="text-amber-600" extra={<span className="text-xs text-slate-400">gestão Vidamed</span>} />
            <KPI titulo="Você recebeu" valor={formatBRL(dre.resultado)} icon={Wallet} destaque />
          </div>

          {/* Waterfall + Tabela DRE */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h2 className="font-display text-base font-bold text-slate-800">Do bruto ao seu bolso</h2>
              <p className="text-xs text-slate-500">Cada etapa mostra o que foi descontado.</p>
              <WaterfallDRE dre={dre} />
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h2 className="font-display text-base font-bold text-slate-800">Demonstrativo (DRE)</h2>
              <p className="text-xs text-slate-500">O resultado linha a linha.</p>
              <table className="mt-4 w-full text-sm">
                <tbody className="[&_td]:py-2.5">
                  <LinhaDRE label="(+) Receita bruta" valor={dre.bruto} />
                  <LinhaDRE label="(−) Impostos retidos" valor={-dre.impostos} cor="text-red-600" />
                  <LinhaDRE label="(=) Receita líquida" valor={dre.liquida} sub />
                  <LinhaDRE label="(−) Taxa administrativa" valor={-dre.taxaAdm} cor="text-amber-600" />
                  <tr className="border-t-2 border-teal-500">
                    <td className="font-display font-bold text-slate-800">(=) Resultado líquido</td>
                    <td className="text-right font-mono text-lg font-bold text-teal-700">{formatBRL(dre.resultado)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Evolução */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-base font-bold text-slate-800">Sua evolução</h2>
                <p className="text-xs text-slate-500">Faturamento bruto e líquido nos últimos 12 meses.</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-brand-light" /> Bruto</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-full bg-teal-500" /> Líquido</span>
              </div>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucao} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                         tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
                  <Tooltip
                    formatter={(v, n) => [formatBRL(v), n === 'bruto' ? 'Bruto' : 'Líquido']}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="bruto" stroke="#1e5a8f" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="liquido" stroke="#14b8a6" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Por instituição + Extrato resumido */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <h2 className="font-display text-base font-bold text-slate-800">De onde veio seu faturamento</h2>
              <p className="text-xs text-slate-500">Distribuição por instituição em {competenciaLabel(competencia)}.</p>
              <div className="mt-4 space-y-3">
                {porInst.map(({ instituicao, valor, pct }) => (
                  <div key={instituicao.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: instituicao.cor }} />
                        <span className="font-medium text-slate-700">{instituicao.nome}</span>
                      </span>
                      <span className="font-mono font-semibold text-slate-800">{formatBRL(valor)}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: instituicao.cor }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-slate-800">Pagamentos do mês</h2>
                <Link to="/portal/extratos" className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700">
                  Ver extrato completo <ArrowRight size={12} />
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                {extrato.map(e => (
                  <div key={e.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ backgroundColor: e.instituicao.cor }}>
                        <Building2 size={14} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{e.instituicao.nome}</p>
                        <p className="text-[10px] text-slate-500">{e.dataPagamento ? `Pago em ${formatDate(e.dataPagamento)}` : 'Aguardando pagamento'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-bold text-teal-700">{formatBRL(e.aReceber)}</p>
                      <span className={`text-[9px] font-bold uppercase ${e.status === 'pago' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {e.status === 'pago' ? '✓ recebido' : 'pendente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function KPI({ titulo, valor, icon: Icon, cor, destaque, extra }) {
  return (
    <div className={`rounded-2xl p-4 shadow-sm ring-1 ${destaque ? 'bg-gradient-to-br from-teal-600 to-teal-700 text-white ring-teal-600' : 'bg-white ring-slate-100'}`}>
      <div className="flex items-center justify-between">
        <p className={`text-[11px] font-semibold uppercase tracking-wider ${destaque ? 'text-white/80' : 'text-slate-500'}`}>{titulo}</p>
        <Icon size={16} className={destaque ? 'text-white/80' : 'text-slate-300'} />
      </div>
      <p className={`mt-2 font-display text-2xl font-bold tabular-nums ${destaque ? 'text-white' : cor || 'text-slate-800'}`}>{valor}</p>
      <div className="mt-1">{extra}</div>
    </div>
  )
}

function Variacao({ v }) {
  const pos = v >= 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${pos ? 'text-emerald-600' : 'text-red-600'}`}>
      {pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {pos ? '+' : ''}{v.toFixed(1)}% vs mês anterior
    </span>
  )
}

function LinhaDRE({ label, valor, cor, sub }) {
  return (
    <tr className={sub ? 'border-t border-slate-100' : ''}>
      <td className={`${sub ? 'font-semibold text-slate-700' : 'text-slate-600'}`}>{label}</td>
      <td className={`text-right font-mono ${cor || (sub ? 'font-semibold text-slate-800' : 'text-slate-700')}`}>{formatBRL(Math.abs(valor))}</td>
    </tr>
  )
}
