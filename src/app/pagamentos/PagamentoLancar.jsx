import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Plus, X, Mail, Send, CheckCircle2, AlertCircle,
  Calculator, Building2, Calendar
} from 'lucide-react'
import { INSTITUICOES, getInstituicao } from '../../data/instituicoes'
import { MEDICOS_SEED, getMedico } from '../../data/medicos'
import { formatBRL, competenciaLabel } from '../../lib/storage'

export default function PagamentoLancar() {
  const navigate = useNavigate()
  const [instituicaoId, setInstituicaoId] = useState('')
  const [competencia, setCompetencia] = useState('2026-05')
  const [notaNumero, setNotaNumero] = useState('')
  const [lancamentos, setLancamentos] = useState([
    { medicoId: '', rendimento: '', percentImposto: '10', taxaAdm: '0' }
  ])
  const [emailModal, setEmailModal] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [confirmado, setConfirmado] = useState(false)

  const instituicao = getInstituicao(instituicaoId)

  const updateLanc = (i, field, value) => {
    const novos = [...lancamentos]
    novos[i] = { ...novos[i], [field]: value }
    setLancamentos(novos)
  }
  const addLanc = () => setLancamentos([...lancamentos, { medicoId: '', rendimento: '', percentImposto: '10', taxaAdm: '0' }])
  const removeLanc = (i) => setLancamentos(lancamentos.filter((_, idx) => idx !== i))

  const totais = useMemo(() => {
    let bruto = 0, desc = 0, taxa = 0
    lancamentos.forEach(l => {
      const r = Number(l.rendimento) || 0
      const p = Number(l.percentImposto) || 0
      const t = Number(l.taxaAdm) || 0
      bruto += r
      desc += r * (p / 100)
      taxa += t
    })
    return {
      bruto: Math.round(bruto * 100) / 100,
      desc: Math.round(desc * 100) / 100,
      liquido: Math.round((bruto - desc) * 100) / 100,
      taxa,
      aReceber: Math.round((bruto - desc - taxa) * 100) / 100
    }
  }, [lancamentos])

  const podeEnviar = instituicaoId && notaNumero && lancamentos.every(l => l.medicoId && Number(l.rendimento) > 0)

  const handleAbrirModal = (e) => {
    e.preventDefault()
    if (!podeEnviar) return
    setEmailModal(true)
  }

  const handleConfirmarEnvio = () => {
    setEnviando(true)
    setTimeout(() => {
      setEnviando(false)
      setConfirmado(true)
      setTimeout(() => {
        setEmailModal(false)
        navigate('/app/pagamentos')
      }, 1800)
    }, 1200)
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/app/pagamentos" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand">
          <ArrowLeft size={12} /> Voltar ao histórico
        </Link>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand">Lançar faturamento</h1>
        <p className="mt-1 text-sm text-slate-600">
          Registre uma nota recebida de uma instituição e notifique a contabilidade.
        </p>
      </div>

      <form onSubmit={handleAbrirModal} className="space-y-6">
        {/* Cabeçalho da nota */}
        <div className="card">
          <h2 className="mb-4 font-display text-lg font-bold text-brand">Identificação da nota</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Instituição <span className="text-accent">*</span>
              </label>
              <select
                value={instituicaoId}
                onChange={(e) => setInstituicaoId(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="">Selecione...</option>
                {INSTITUICOES.map(i => (
                  <option key={i.id} value={i.id}>{i.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Competência <span className="text-accent">*</span>
              </label>
              <input
                type="month"
                value={competencia}
                onChange={(e) => setCompetencia(e.target.value)}
                required
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Nº / Identificação <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={notaNumero}
                onChange={(e) => setNotaNumero(e.target.value)}
                required
                placeholder="Ex.: 128240187"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>
          {instituicao && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-50 p-3 text-xs">
              <Building2 size={14} className="text-brand" />
              <span className="text-slate-700">
                <strong>CNPJ tomador:</strong> {instituicao.cnpj} · {instituicao.razaoSocial}
              </span>
            </div>
          )}
        </div>

        {/* Lançamentos por médico */}
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-brand">Lançamentos por médico</h2>
            <button
              type="button"
              onClick={addLanc}
              className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand hover:bg-brand hover:text-white"
            >
              <Plus size={12} />
              Adicionar médico
            </button>
          </div>

          <div className="space-y-3">
            {lancamentos.map((l, i) => {
              const medico = getMedico(l.medicoId)
              const rendimento = Number(l.rendimento) || 0
              const percent = Number(l.percentImposto) || 0
              const taxa = Number(l.taxaAdm) || 0
              const desc = rendimento * (percent / 100)
              const liquido = rendimento - desc
              const aReceber = liquido - taxa
              return (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/30 p-4">
                  <div className="grid gap-3 sm:grid-cols-12">
                    <div className="sm:col-span-4">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Médico
                      </label>
                      <select
                        value={l.medicoId}
                        onChange={(e) => updateLanc(i, 'medicoId', e.target.value)}
                        required
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                      >
                        <option value="">Selecione...</option>
                        {MEDICOS_SEED.map(m => (
                          <option key={m.id} value={m.id}>{m.nome} ({m.crm})</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Bruto (R$)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={l.rendimento}
                        onChange={(e) => updateLanc(i, 'rendimento', e.target.value)}
                        required
                        placeholder="0,00"
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        IR %
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={l.percentImposto}
                        onChange={(e) => updateLanc(i, 'percentImposto', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Taxa Adm
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={l.taxaAdm}
                        onChange={(e) => updateLanc(i, 'taxaAdm', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-3 flex items-end gap-2">
                      <div className="flex-1">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          A receber
                        </label>
                        <div className="mt-1 rounded-lg bg-accent/10 px-3 py-2 text-sm font-bold text-accent">
                          {formatBRL(aReceber)}
                        </div>
                      </div>
                      {lancamentos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLanc(i)}
                          className="rounded-lg p-2 text-slate-400 hover:bg-red-100 hover:text-red-600"
                          aria-label="Remover lançamento"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  {medico && rendimento > 0 && (
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
                      <span>CPF: {medico.cpf}</span>
                      <span>·</span>
                      <span>Desc. impostos: {formatBRL(desc)}</span>
                      <span>·</span>
                      <span>Líquido: {formatBRL(liquido)}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Totais */}
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <Calculator size={18} className="text-brand" />
            <h2 className="font-display text-lg font-bold text-brand">Totais do lote</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <Total label="Faturamento bruto" valor={formatBRL(totais.bruto)} />
            <Total label="Desc. impostos" valor={formatBRL(totais.desc)} cor="text-red-600" />
            <Total label="Líquido" valor={formatBRL(totais.liquido)} />
            <Total label="Taxa adm" valor={formatBRL(totais.taxa)} />
            <Total label="A receber" valor={formatBRL(totais.aReceber)} destaque />
          </div>
        </div>

        {/* Ações */}
        <div className="sticky bottom-0 -mx-4 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Mail size={14} />
            <span>A contabilidade será notificada automaticamente</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/app/pagamentos" className="btn-ghost text-sm">Cancelar</Link>
            <button
              type="submit"
              disabled={!podeEnviar}
              className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />
              Lançar e notificar contabilidade
            </button>
          </div>
        </div>
      </form>

      {/* Modal de e-mail */}
      {emailModal && (
        <ModalEmail
          instituicao={instituicao}
          competencia={competencia}
          notaNumero={notaNumero}
          lancamentos={lancamentos}
          totais={totais}
          enviando={enviando}
          confirmado={confirmado}
          onConfirmar={handleConfirmarEnvio}
          onFechar={() => !enviando && !confirmado && setEmailModal(false)}
        />
      )}
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

function ModalEmail({ instituicao, competencia, notaNumero, lancamentos, totais, enviando, confirmado, onConfirmar, onFechar }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-brand to-brand-dark p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                {confirmado ? 'E-mail enviado!' : 'Preview do e-mail para contabilidade'}
              </h3>
              <p className="text-xs text-white/70">
                Pré-visualização antes do envio automático
              </p>
            </div>
          </div>
          <button
            onClick={onFechar}
            disabled={enviando || confirmado}
            className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {confirmado ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 size={40} className="text-emerald-600" />
              </div>
              <h4 className="mt-4 font-display text-xl font-bold text-brand">
                Notificação enviada com sucesso
              </h4>
              <p className="mt-2 max-w-md text-sm text-slate-600">
                A contabilidade recebeu os dados e iniciará a emissão da nota fiscal
                para a {instituicao?.nome}.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-sm">
              <div className="space-y-2 border-b border-slate-200 pb-3">
                <Linha label="Para" valor="contabilidade@vidamedgestao.com.br" />
                <Linha label="Cc" valor="financeiro@vidamedgestao.com.br" />
                <Linha
                  label="Assunto"
                  valor={`[Vidamed] Solicitação de NF - ${instituicao?.nome} - ${competenciaLabel(competencia)}`}
                  bold
                />
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-700">
                <p>Prezada equipe de contabilidade,</p>
                <p>
                  Solicito a emissão de nota fiscal referente ao faturamento recebido
                  da instituição abaixo:
                </p>

                <div className="rounded-lg bg-white p-3 ring-1 ring-slate-200">
                  <p><strong>Tomador:</strong> {instituicao?.razaoSocial}</p>
                  <p><strong>CNPJ:</strong> {instituicao?.cnpj}</p>
                  <p><strong>Competência:</strong> {competenciaLabel(competencia)}</p>
                  <p><strong>Nota / Identificação:</strong> {notaNumero}</p>
                </div>

                <p><strong>Discriminação por prestador físico:</strong></p>

                <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-slate-200">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-2 py-2 text-left">Médico</th>
                        <th className="px-2 py-2 text-right">Bruto</th>
                        <th className="px-2 py-2 text-right">Líquido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lancamentos.map((l, i) => {
                        const m = getMedico(l.medicoId)
                        const r = Number(l.rendimento) || 0
                        const p = Number(l.percentImposto) || 0
                        const liquido = r - r * (p / 100)
                        return (
                          <tr key={i} className="border-b border-slate-100 last:border-0">
                            <td className="px-2 py-1.5">
                              <p className="font-semibold">{m?.nome}</p>
                              <p className="text-slate-500">{m?.cpf}</p>
                            </td>
                            <td className="px-2 py-1.5 text-right">{formatBRL(r)}</td>
                            <td className="px-2 py-1.5 text-right">{formatBRL(liquido)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-brand-50 font-bold text-brand">
                        <td className="px-2 py-2">TOTAL</td>
                        <td className="px-2 py-2 text-right">{formatBRL(totais.bruto)}</td>
                        <td className="px-2 py-2 text-right">{formatBRL(totais.liquido)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <p className="text-xs text-slate-600">
                  Anexo: planilha PDF com discriminação completa (gerada automaticamente).
                </p>

                <p>Atenciosamente,<br />
                  <strong>Equipe Vidamed — Financeiro</strong><br />
                  relacionamentomedico@vidamedgestao.com.br</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!confirmado && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <AlertCircle size={14} />
              <span>Mockup: o e-mail não será realmente enviado.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onFechar}
                disabled={enviando}
                className="btn-ghost text-sm"
              >
                Revisar
              </button>
              <button
                onClick={onConfirmar}
                disabled={enviando}
                className="btn-accent text-sm"
              >
                {enviando ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Confirmar envio
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Linha({ label, valor, bold }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="w-16 flex-shrink-0 text-slate-500">{label}:</span>
      <span className={`flex-1 ${bold ? 'font-bold text-slate-900' : 'text-slate-700'}`}>{valor}</span>
    </div>
  )
}
