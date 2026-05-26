import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import {
  ArrowLeft, Mail, CheckCircle2, Clock, FileText, Building2, Calendar,
  Send, Edit, AlertCircle
} from 'lucide-react'
import { PAGAMENTOS_SEED } from '../../data/pagamentos'
import { getInstituicao } from '../../data/instituicoes'
import { getMedico } from '../../data/medicos'
import { formatBRL, formatDate, formatDateTime, competenciaLabel, toTitleCase } from '../../lib/storage'
import { getSession } from '../../lib/auth'

const STATUS_LABEL = {
  lancado: { label: 'Lançado', cor: 'bg-amber-100 text-amber-700', icon: Clock },
  nota_emitida: { label: 'Nota emitida', cor: 'bg-blue-100 text-blue-700', icon: FileText },
  pago: { label: 'Pago', cor: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 }
}

export default function PagamentoDetalhe() {
  const { id } = useParams()
  const pagamento = PAGAMENTOS_SEED.find(p => p.id === id)
  const session = getSession()
  const isAdmin = session?.perfil === 'admin'
  const [emailReenviado, setEmailReenviado] = useState(false)

  if (!pagamento) return <Navigate to="/app/pagamentos" replace />

  const instituicao = getInstituicao(pagamento.instituicaoId)
  const statusInfo = STATUS_LABEL[pagamento.status]

  const totais = pagamento.lancamentos.reduce(
    (acc, l) => ({
      bruto: acc.bruto + l.rendimento,
      desc: acc.desc + l.descImpostos,
      liquido: acc.liquido + l.caiuNaConta,
      taxa: acc.taxa + l.taxaAdm,
      aReceber: acc.aReceber + l.aReceber
    }),
    { bruto: 0, desc: 0, liquido: 0, taxa: 0, aReceber: 0 }
  )

  const reenviarEmail = () => {
    setEmailReenviado(true)
    setTimeout(() => setEmailReenviado(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/app/pagamentos" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand">
          <ArrowLeft size={12} /> Voltar ao histórico
        </Link>

        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-soft"
              style={{ backgroundColor: instituicao?.cor }}
            >
              <FileText size={26} />
            </div>
            <div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusInfo.cor}`}>
                <statusInfo.icon size={10} />
                {statusInfo.label}
              </span>
              <h1 className="mt-1 font-display text-2xl font-bold text-brand sm:text-3xl">
                {instituicao?.nome}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
                <span>Nota {pagamento.notaNumero}</span>
                <span>·</span>
                <span>{competenciaLabel(pagamento.competencia)}</span>
                <span>·</span>
                <span>{pagamento.lancamentos.length} {pagamento.lancamentos.length === 1 ? 'médico' : 'médicos'}</span>
              </div>
            </div>
          </div>
          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={reenviarEmail}
                className="btn-ghost text-sm"
                disabled={emailReenviado}
              >
                {emailReenviado ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    Reenviado
                  </>
                ) : (
                  <>
                    <Mail size={14} />
                    Reenviar e-mail
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Resumo */}
      <div className="card">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Total label="Faturamento bruto" valor={formatBRL(totais.bruto)} />
          <Total label="Desc. impostos" valor={formatBRL(totais.desc)} cor="text-red-600" />
          <Total label="Líquido pago" valor={formatBRL(totais.liquido)} />
          <Total label="Taxa adm" valor={formatBRL(totais.taxa)} />
          <Total label="A receber Vidamed" valor={formatBRL(totais.aReceber)} destaque />
        </div>
      </div>

      {/* Metadados */}
      <div className="grid gap-4 lg:grid-cols-3">
        <MetaCard icon={Building2} titulo="Tomador">
          <p className="text-sm font-semibold text-slate-800">{instituicao?.razaoSocial}</p>
          <p className="font-mono text-xs text-slate-500">CNPJ: {instituicao?.cnpj}</p>
        </MetaCard>
        <MetaCard icon={Calendar} titulo="Datas">
          {pagamento.dataPagamento ? (
            <>
              <p className="text-xs text-slate-500">Pagamento recebido em</p>
              <p className="text-sm font-semibold text-slate-800">{formatDate(pagamento.dataPagamento)}</p>
            </>
          ) : (
            <>
              <p className="text-xs text-slate-500">Status</p>
              <p className="text-sm font-semibold text-amber-600">Aguardando pagamento</p>
            </>
          )}
        </MetaCard>
        <MetaCard icon={Mail} titulo="Contabilidade">
          {pagamento.emailEnviado ? (
            <>
              <p className="text-xs text-slate-500">E-mail enviado em</p>
              <p className="text-sm font-semibold text-slate-800">{formatDateTime(pagamento.emailEnviadoEm)}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 size={10} />
                Notificada
              </span>
            </>
          ) : (
            <>
              <p className="text-xs text-slate-500">Status do e-mail</p>
              <p className="text-sm font-semibold text-amber-600">Pendente</p>
            </>
          )}
        </MetaCard>
      </div>

      {/* Detalhamento médicos — replicando layout da planilha */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-slate-100">
        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
          <h2 className="font-display text-lg font-bold text-brand">
            Detalhamento por médico
          </h2>
          <p className="text-xs text-slate-500">
            Replica o layout da planilha: Rendimentos / Caiu na conta / Desc Impostos / Taxa Adm / A receber
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Médico</th>
                <th className="px-4 py-3 text-right">%</th>
                <th className="px-4 py-3 text-right">Rendimentos</th>
                <th className="px-4 py-3 text-right">Caiu na conta</th>
                <th className="px-4 py-3 text-right">Desc Impostos</th>
                <th className="px-4 py-3 text-right">Taxa Adm</th>
                <th className="px-4 py-3 text-right">A receber</th>
              </tr>
            </thead>
            <tbody>
              {pagamento.lancamentos.map((l, i) => {
                const m = getMedico(l.medicoId)
                return (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link to={`/app/medicos/${m?.id}`} className="font-semibold text-slate-800 hover:text-brand">
                        {toTitleCase(m?.nome)}
                      </Link>
                      <p className="text-xs text-slate-500">CRM {m?.crm} · {m?.cpf}</p>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-slate-600">{l.percentImposto}%</td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-slate-800">{formatBRL(l.rendimento)}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-slate-800">{formatBRL(l.caiuNaConta)}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-red-600">{formatBRL(l.descImpostos)}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm text-slate-700">{formatBRL(l.taxaAdm)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-sm font-bold text-emerald-700">
                        {formatBRL(l.aReceber)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-brand bg-brand-50/50 font-bold text-brand">
                <td className="px-4 py-3" colSpan={3}>TOTAL</td>
                <td className="px-4 py-3 text-right font-mono">{formatBRL(totais.bruto)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatBRL(totais.liquido)}</td>
                <td className="px-4 py-3 text-right font-mono text-red-700">{formatBRL(totais.desc)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatBRL(totais.taxa)}</td>
                <td className="px-4 py-3 text-right font-mono">{formatBRL(totais.aReceber)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-brand-50 p-3 text-xs text-brand">
        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
        <span>
          <strong>Mockup:</strong> alterações neste lote não são persistidas. Em produção, este lote seria editável
          com histórico de auditoria mostrando quem modificou cada campo.
        </span>
      </div>
    </div>
  )
}

function Total({ label, valor, cor, destaque }) {
  return (
    <div className={`rounded-xl p-3 ${destaque ? 'bg-accent/10 ring-1 ring-accent/30' : 'bg-slate-50'}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-1 font-mono text-base font-bold ${destaque ? 'text-accent' : cor || 'text-brand'}`}>
        {valor}
      </p>
    </div>
  )
}

function MetaCard({ icon: Icon, titulo, children }) {
  return (
    <div className="card">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <Icon size={14} />
        {titulo}
      </div>
      {children}
    </div>
  )
}
