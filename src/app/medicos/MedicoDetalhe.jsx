import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, Edit, Phone, Mail, MapPin, CreditCard, FileCheck, Calendar, Award, Wallet } from 'lucide-react'
import { getMedico } from '../../data/medicos'
import { PAGAMENTOS_SEED } from '../../data/pagamentos'
import { getInstituicao } from '../../data/instituicoes'
import { formatBRL, formatDate, competenciaLabel } from '../../lib/storage'
import { getSession } from '../../lib/auth'

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
  const isAdmin = session?.perfil === 'admin'

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
    (s, p) => s + p.lancamentos.reduce((ss, l) => ss + l.rendimento, 0),
    0
  )
  const totalLiquido = lancamentos.reduce(
    (s, p) => s + p.lancamentos.reduce((ss, l) => ss + l.caiuNaConta, 0),
    0
  )

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
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
                {medico.nome}
              </h1>
              <p className="text-sm text-slate-600">
                {medico.especialidade} · CRM {medico.crm}
              </p>
            </div>
          </div>
          {isAdmin && (
            <Link to={`/app/medicos/${medico.id}/editar`} className="btn-ghost text-sm">
              <Edit size={14} />
              Editar
            </Link>
          )}
        </div>
      </div>

      {/* Resumo financeiro */}
      <div className="grid gap-4 sm:grid-cols-3">
        <ResumoCard
          icon={Wallet}
          label="Total faturado"
          valor={formatBRL(totalFaturado)}
          sublabel={`em ${lancamentos.length} lançamentos`}
        />
        <ResumoCard
          icon={CreditCard}
          label="Total líquido recebido"
          valor={formatBRL(totalLiquido)}
          sublabel={`média ${formatBRL(totalLiquido / Math.max(lancamentos.length, 1))} por nota`}
          accent
        />
        <ResumoCard
          icon={Award}
          label="Cadastrado em"
          valor={formatDate(medico.cadastradoEm)}
          sublabel={`há ${Math.floor((Date.now() - new Date(medico.cadastradoEm).getTime()) / (1000 * 60 * 60 * 24 * 30))} meses`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Coluna esquerda — dados */}
        <div className="space-y-6 lg:col-span-2">
          {/* Histórico de pagamentos */}
          <div className="card">
            <h2 className="mb-4 font-display text-lg font-bold text-brand">
              Histórico de pagamentos
            </h2>
            <div className="space-y-3">
              {lancamentos.length === 0 && (
                <p className="text-sm text-slate-500">Nenhum pagamento registrado.</p>
              )}
              {lancamentos.map(p => {
                const inst = getInstituicao(p.instituicaoId)
                const totalBruto = p.lancamentos.reduce((s, l) => s + l.rendimento, 0)
                const totalLiquido = p.lancamentos.reduce((s, l) => s + l.caiuNaConta, 0)
                return (
                  <Link
                    key={p.id}
                    to={`/app/pagamentos/${p.id}`}
                    className="block rounded-xl border border-slate-100 p-4 transition hover:border-brand hover:bg-brand-50/30"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: inst?.cor }}
                        />
                        <span className="font-semibold text-slate-800">{inst?.nome}</span>
                        <span className="text-xs text-slate-500">· {competenciaLabel(p.competencia)}</span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'pago' ? 'bg-emerald-100 text-emerald-700' :
                        p.status === 'nota_emitida' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
                      <div className="text-xs text-slate-500">
                        {p.lancamentos.length} {p.lancamentos.length === 1 ? 'lançamento' : 'lançamentos'} · Bruto {formatBRL(totalBruto)}
                      </div>
                      <div className="font-display text-lg font-bold text-brand">
                        {formatBRL(totalLiquido)}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Coluna direita — ficha */}
        <div className="space-y-6">
          <FichaCard titulo="Contato">
            <FichaItem icon={Phone} label="Telefone" valor={medico.telefone} />
            <FichaItem icon={Mail} label="E-mail" valor={medico.email} />
          </FichaCard>

          <FichaCard titulo="Documentação">
            <FichaItem icon={Calendar} label="CPF" valor={medico.cpf} mono />
            <FichaItem icon={Calendar} label="RG" valor={medico.rg} mono />
            <FichaItem icon={Calendar} label="Nascimento" valor={formatDate(medico.nascimento)} />
          </FichaCard>

          <FichaCard titulo="Endereço">
            <FichaItem icon={MapPin} label="CEP" valor={medico.cep} mono />
            <FichaItem icon={MapPin} label="Endereço" valor={medico.endereco} />
          </FichaCard>

          <FichaCard titulo="Recebimento (PIX)">
            <FichaItem icon={CreditCard} label="Modalidade" valor={medico.modalidade} />
            <FichaItem icon={CreditCard} label="Chave PIX" valor={medico.chavePix} mono />
          </FichaCard>

          <FichaCard titulo="Documentos anexados">
            {Object.entries(medico.documentos).map(([key, ok]) => (
              <div key={key} className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-700">{DOCS_LABELS[key]}</span>
                {ok ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    <FileCheck size={10} />
                    Anexado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                    Pendente
                  </span>
                )}
              </div>
            ))}
          </FichaCard>
        </div>
      </div>
    </div>
  )
}

function ResumoCard({ icon: Icon, label, valor, sublabel, accent }) {
  return (
    <div className={`rounded-2xl p-5 shadow-soft ring-1 ${
      accent ? 'bg-gradient-to-br from-brand to-brand-dark text-white ring-brand' : 'bg-white ring-slate-100'
    }`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs font-semibold uppercase tracking-wider ${accent ? 'text-white/80' : 'text-slate-500'}`}>
          {label}
        </p>
        <Icon size={16} className={accent ? 'text-accent-light' : 'text-brand/60'} />
      </div>
      <p className={`mt-3 font-display text-2xl font-bold ${accent ? 'text-white' : 'text-brand'}`}>
        {valor}
      </p>
      <p className={`mt-1 text-xs ${accent ? 'text-white/70' : 'text-slate-500'}`}>{sublabel}</p>
    </div>
  )
}

function FichaCard({ titulo, children }) {
  return (
    <div className="card">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{titulo}</h3>
      <div className="divide-y divide-slate-100">{children}</div>
    </div>
  )
}

function FichaItem({ icon: Icon, label, valor, mono }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon size={14} className="mt-0.5 flex-shrink-0 text-slate-400" />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        <p className={`break-words text-sm font-medium text-slate-800 ${mono ? 'font-mono' : ''}`}>
          {valor || '—'}
        </p>
      </div>
    </div>
  )
}
