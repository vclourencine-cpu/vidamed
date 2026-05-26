import { useState } from 'react'
import {
  X, Phone, Mail, MapPin, Calendar, FileText, MessageSquare,
  ChevronRight, CheckCircle2, AlertCircle, User
} from 'lucide-react'
import { ESTAGIOS, ORIGENS, getCaptador } from '../../../data/captadores'
import { getMedico } from '../../../data/medicos'
import { toTitleCase, formatDate, formatDateTime } from '../../../lib/storage'

export default function LeadDetalhe({ lead, onClose, onMover }) {
  const [notas, setNotas] = useState(lead.notas || '')
  const origem = ORIGENS[lead.origem]
  const captador = getCaptador(lead.captadorId)
  const indicadoPor = lead.indicadoPor ? getMedico(lead.indicadoPor) : null
  const estagioAtual = ESTAGIOS.find(e => e.id === lead.estagio)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-brand to-brand-dark p-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: estagioAtual?.cor }}
              >
                {estagioAtual?.label}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold">{toTitleCase(lead.nome)}</h2>
              <p className="text-sm text-white/70">
                {lead.crm ? `CRM ${lead.crm}` : 'Sem CRM cadastrado'} · {origem?.icon} {origem?.label}
              </p>
            </div>
            <button onClick={onClose} className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Conteúdo rolável */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Contatos */}
          <div className="grid sm:grid-cols-2 gap-3">
            <InfoLinha icon={Phone} label="Telefone" valor={lead.telefone} link={`tel:${(lead.telefone || '').replace(/\D/g, '')}`} />
            <InfoLinha icon={Mail} label="E-mail" valor={lead.email} link={`mailto:${lead.email}`} />
            <InfoLinha icon={User} label="Captador" valor={captador?.nome} />
            {indicadoPor && (
              <InfoLinha icon={User} label="Indicado por" valor={toTitleCase(indicadoPor.nome)} />
            )}
          </div>

          {/* Tags */}
          {lead.tags && lead.tags.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {lead.tags.map(t => (
                  <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Próxima ação */}
          {lead.proximaAcao && (
            <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Calendar size={14} />
                Próxima ação
              </div>
              <p className="mt-2 text-sm font-semibold text-amber-900">{lead.proximaAcao.desc}</p>
              <p className="text-xs text-amber-700">📅 {formatDate(lead.proximaAcao.data)}</p>
            </div>
          )}

          {/* Notas */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Notas internas</p>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              placeholder="Adicione observações sobre o lead..."
            />
          </div>

          {/* Histórico / Timeline */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">Histórico de interações</p>
            <div className="space-y-2">
              {(lead.historico || []).map((h, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand text-[10px] font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 rounded-lg bg-slate-50 p-2.5">
                    <p className="text-xs font-semibold text-slate-800">{h.desc}</p>
                    <p className="text-[10px] text-slate-500">{formatDateTime(h.data)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Motivo perda (se houver) */}
          {lead.motivoPerda && (
            <div className="rounded-xl bg-slate-100 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">Motivo da perda</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{lead.motivoPerda}</p>
            </div>
          )}
        </div>

        {/* Footer: ações */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Mover para estágio</p>
          <div className="flex flex-wrap gap-2">
            {ESTAGIOS.filter(e => e.id !== lead.estagio).map(e => (
              <button
                key={e.id}
                onClick={() => onMover(e.id)}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold ring-1 ring-slate-200 hover:ring-brand hover:text-brand transition"
                style={{ color: e.cor }}
              >
                <ChevronRight size={12} />
                {e.label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={`https://wa.me/55${(lead.telefone || '').replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(lead.nome.split(' ')[0])}!%20Aqui%20é%20a%20equipe%20Vidamed.`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-light"
            >
              <MessageSquare size={12} /> Falar no WhatsApp
            </a>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <Calendar size={12} /> Agendar próximo contato
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoLinha({ icon: Icon, label, valor, link }) {
  if (!valor) return null
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
        <Icon size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
        {link ? (
          <a href={link} className="text-sm font-semibold text-slate-800 hover:text-brand">{valor}</a>
        ) : (
          <p className="text-sm font-semibold text-slate-800">{valor}</p>
        )}
      </div>
    </div>
  )
}
