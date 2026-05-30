import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowLeft, Edit, Phone, Mail, MapPin, CreditCard,
  FileCheck, Calendar, Award, Wallet, User, Lock, Download
} from 'lucide-react'
import { getMedico } from '../../data/medicos'
import { PAGAMENTOS_SEED } from '../../data/pagamentos'
import { getInstituicao } from '../../data/instituicoes'
import { formatBRL, formatDate, competenciaLabel, toTitleCase } from '../../lib/storage'
import { getSession, perms } from '../../lib/auth'

const DOCS_LABELS = {
  rg_cnh: 'RG ou CNH',
  comprovante_residencia: 'Comprovante de Residência',
  diploma: 'Diploma',
  crm: 'CRM'
}

export default function MedicoDetalhe() {
  const { id } = useParams()
  const medico = getMedico(id)
  const session = getSession()
  const isAdmin = perms.operar(session?.perfil)

  if (!medico) return <Navigate to="/app/medicos" replace />

  const lancamentos = PAGAMENTOS_SEED
    .map(p => {
      const seusLancamentos = p.lancamentos.filter(l => l.medicoId === medico.id)
      if (seusLancamentos.length === 0) return null
      return { ...p, lancamentos: seusLancamentos }
    })
    .filter(Boolean)
    .sort((a, b) => b.competencia.localeCompare(a.competencia))

  const totalFaturado = lancamentos.reduce(
    (s, p) => s + p.lancamentos.reduce((ss, l) => ss + l.rendimento, 0), 0
  )
  const totalLiquido = lancamentos.reduce(
    (s, p) => s + p.lancamentos.reduce((ss, l) => ss + l.caiuNaConta, 0), 0
  )

  const docsOk    = Object.values(medico.documentos || {}).filter(Boolean).length
  const docsTotal = Object.keys(medico.documentos || {}).length

  return (
    <div className="space-y-6">
      {/* ── CABEÇALHO ──────────────────────────────────────────────── */}
      <div>
        <Link to="/app/medicos" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand">
          <ArrowLeft size={12} /> Voltar à lista
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-white shadow-soft">
              {medico.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                medico.status === 'ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {medico.status}
              </span>
              <h1 className="mt-1 font-display text-2xl font-bold text-brand sm:text-3xl">
                {toTitleCase(medico.nome)}
              </h1>
              <p className="text-sm text-slate-600">
                {medico.especialidade} · CRM {medico.crm}
              </p>
            </div>
          </div>
          {isAdmin && (
            <Link to={`/app/medicos/${medico.id}/editar`} className="btn-ghost text-sm">
              <Edit size={14} /> Editar
            </Link>
          )}
        </div>
      </div>

      {/* ── KPIs FINANCEIROS ───────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-4">
        <KPICard icon={Wallet}   label="Total faturado"       valor={formatBRL(totalFaturado)}
                 sub={`${lancamentos.length} lançamentos`} />
        <KPICard icon={CreditCard} label="Total líquido recebido" valor={formatBRL(totalLiquido)}
                 sub={`média ${formatBRL(totalLiquido / Math.max(lancamentos.length,1))} por nota`} accent />
        <KPICard icon={Award}    label="A receber"            valor={formatBRL(0)} sub="em dia" />
        <KPICard icon={Calendar} label="Cadastrado em"        valor={formatDate(medico.cadastradoEm)}
                 sub={`há ${Math.floor((Date.now() - new Date(medico.cadastradoEm).getTime()) / (1000*60*60*24*30))} meses`} />
      </div>

      {/* ── BOX DADOS PESSOAIS (UNIFICADO) ─────────────────────────── */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-100">
        {/* Cabeçalho do box */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand">
            <User size={16} />
          </div>
          <h2 className="font-display text-base font-bold text-brand">Dados Pessoais</h2>
          <span className="ml-auto text-xs text-slate-400">{docsOk}/{docsTotal} documentos anexados</span>
        </div>

        {/* Grid de 3 colunas: Identificação | Contato + Endereço | PIX + Documentos */}
        <div className="grid gap-0 divide-y divide-slate-100 sm:divide-x sm:divide-y-0 sm:grid-cols-3">

          {/* Coluna 1: Identificação */}
          <div className="p-5 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Identificação</p>
            <Campo icon={Lock}     label="CPF"          valor={medico.cpf}           mono />
            <Campo icon={Lock}     label="RG"           valor={medico.rg}            mono />
            <Campo icon={Calendar} label="Nascimento"   valor={formatDate(medico.nascimento)} />
            <Campo icon={Lock}     label="CRM"          valor={medico.crm}           mono />
            <Campo icon={Lock}     label="Especialidade" valor={medico.especialidade} />
          </div>

          {/* Coluna 2: Contato + Endereço */}
          <div className="p-5 space-y-5">
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Contato</p>
              <Campo icon={Phone} label="Telefone" valor={medico.telefone} />
              <Campo icon={Mail}  label="E-mail"   valor={medico.email} />
            </div>
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Endereço</p>
              <Campo icon={MapPin} label="CEP"      valor={medico.cep}     mono />
              <Campo icon={MapPin} label="Endereço" valor={medico.endereco} />
            </div>
          </div>

          {/* Coluna 3: PIX + Documentos */}
          <div className="p-5 space-y-5">
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recebimento (PIX)</p>
              <Campo icon={CreditCard} label="Modalidade" valor={medico.modalidade} />
              <Campo icon={CreditCard} label="Chave PIX"  valor={medico.chavePix}   mono />
            </div>
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Documentos</p>
              {Object.entries(medico.documentos || {}).map(([key, ok]) => (
                <div key={key} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-slate-700">{DOCS_LABELS[key]}</span>
                  {ok ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      <FileCheck size={10} /> Anexado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                      Pendente
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── HISTÓRICO DE PAGAMENTOS ─────────────────────────────────── */}
      <div className="card">
        <h2 className="mb-4 font-display text-lg font-bold text-brand">Histórico de pagamentos</h2>
        <div className="space-y-3">
          {lancamentos.length === 0 && (
            <p className="text-sm text-slate-500">Nenhum pagamento registrado.</p>
          )}
          {lancamentos.map(p => {
            const inst = getInstituicao(p.instituicaoId)
            const bruto   = p.lancamentos.reduce((s, l) => s + l.rendimento, 0)
            const liquido = p.lancamentos.reduce((s, l) => s + l.caiuNaConta, 0)
            return (
              <Link key={p.id} to={`/app/pagamentos/${p.id}`}
                    className="block rounded-xl border border-slate-100 p-4 transition hover:border-brand hover:bg-brand-50/30">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: inst?.cor }} />
                    <span className="font-semibold text-slate-800">{inst?.nome}</span>
                    <span className="text-xs text-slate-500">· {competenciaLabel(p.competencia)}</span>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    p.status === 'pago'         ? 'bg-emerald-100 text-emerald-700' :
                    p.status === 'nota_emitida' ? 'bg-blue-100 text-blue-700' :
                                                  'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
                  <div className="text-xs text-slate-500">
                    {p.lancamentos.length} lançamento(s) · Bruto {formatBRL(bruto)}
                  </div>
                  <div className="font-display text-lg font-bold text-brand">
                    {formatBRL(liquido)}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function KPICard({ icon: Icon, label, valor, sub, accent }) {
  return (
    <div className={`rounded-2xl p-5 shadow-soft ring-1 ${
      accent ? 'bg-gradient-to-br from-brand to-brand-dark text-white ring-brand' : 'bg-white ring-slate-100'
    }`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wider ${accent ? 'text-white/80' : 'text-slate-500'}`}>{label}</p>
        <Icon size={16} className={accent ? 'text-accent-light' : 'text-brand/60'} />
      </div>
      <p className={`mt-3 font-display text-2xl font-bold ${accent ? 'text-white' : 'text-brand'}`}>{valor}</p>
      <p className={`mt-1 text-xs ${accent ? 'text-white/70' : 'text-slate-500'}`}>{sub}</p>
    </div>
  )
}

function Campo({ icon: Icon, label, valor, mono }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={13} className="mt-0.5 flex-shrink-0 text-slate-400" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
        <p className={`break-words text-sm font-medium text-slate-800 ${mono ? 'font-mono text-xs' : ''}`}>
          {valor || '—'}
        </p>
      </div>
    </div>
  )
}
