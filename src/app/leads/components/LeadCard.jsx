import { MessageSquare, Calendar } from 'lucide-react'
import { ORIGENS, getCaptador } from '../../../data/captadores'
import { getMedico } from '../../../data/medicos'
import { toTitleCase, formatDate } from '../../../lib/storage'

export default function LeadCard({ lead, onClick, onDragStart }) {
  const origem = ORIGENS[lead.origem]
  const captador = getCaptador(lead.captadorId)
  const indicadoPor = lead.indicadoPor ? getMedico(lead.indicadoPor) : null
  const primeiroNome = lead.nome.split(' ')[0]

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="group cursor-pointer rounded-xl bg-white p-2.5 shadow-soft ring-1 ring-slate-100 transition hover:shadow-card hover:ring-brand/30"
    >
      {/* Topo: nome + WhatsApp inline */}
      <div className="flex items-start justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-xs text-slate-800 leading-tight truncate">{toTitleCase(lead.nome)}</p>
          {lead.crm && (
            <p className="font-mono text-[9px] text-slate-500">CRM {lead.crm}</p>
          )}
        </div>
        <a
          href={`https://wa.me/55${(lead.telefone || '').replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(primeiroNome)}`}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.stopPropagation()}
          title="WhatsApp"
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent hover:bg-accent hover:text-white transition"
        >
          <MessageSquare size={11} />
        </a>
      </div>

      {/* Origem + indicação inline */}
      <div className="mt-1.5 flex flex-wrap items-center gap-1">
        <span
          className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
          style={{ backgroundColor: `${origem?.cor}15`, color: origem?.cor }}
          title={origem?.label}
        >
          {origem?.icon} {origem?.label}
        </span>
      </div>

      {/* Tags compactas */}
      {lead.tags && lead.tags.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {lead.tags.slice(0, 2).map(t => (
            <span key={t} className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-medium text-brand">
              {t}
            </span>
          ))}
          {lead.tags.length > 2 && (
            <span className="text-[9px] text-slate-400">+{lead.tags.length - 2}</span>
          )}
        </div>
      )}

      {/* Footer: indicador + captador + próximo contato */}
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-1.5 text-[9px] text-slate-500">
        <div className="flex items-center gap-1 min-w-0">
          {captador && (
            <div
              className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-bold text-white"
              style={{ backgroundColor: captador.cor }}
              title={`Captador: ${captador.nome}`}
            >
              {captador.avatar}
            </div>
          )}
          {indicadoPor && (
            <span className="truncate" title={`Indicado por ${toTitleCase(indicadoPor.nome)}`}>
              👤 {toTitleCase(indicadoPor.nome).split(' ')[0]}
            </span>
          )}
        </div>
        {lead.proximaAcao?.data && (
          <span className="inline-flex items-center gap-0.5 font-semibold text-amber-600 whitespace-nowrap">
            <Calendar size={9} />
            {formatDate(lead.proximaAcao.data)}
          </span>
        )}
      </div>
    </div>
  )
}
