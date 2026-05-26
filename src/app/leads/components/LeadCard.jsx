import { Phone, MessageSquare, Calendar } from 'lucide-react'
import { ORIGENS, getCaptador } from '../../../data/captadores'
import { getMedico } from '../../../data/medicos'
import { toTitleCase, formatDate } from '../../../lib/storage'

export default function LeadCard({ lead, onClick, onDragStart }) {
  const origem = ORIGENS[lead.origem]
  const captador = getCaptador(lead.captadorId)
  const indicadoPor = lead.indicadoPor ? getMedico(lead.indicadoPor) : null

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="cursor-pointer rounded-xl bg-white p-3 shadow-soft ring-1 ring-slate-100 transition hover:shadow-card hover:ring-brand/20"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-sm font-bold text-slate-800 leading-tight">{toTitleCase(lead.nome)}</p>
      </div>
      {lead.crm && (
        <p className="mt-0.5 font-mono text-[10px] text-slate-500">CRM {lead.crm}</p>
      )}

      {lead.tags && lead.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {lead.tags.map(t => (
            <span key={t} className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[9px] font-semibold text-brand">
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2.5 space-y-1 border-t border-slate-100 pt-2 text-[10px] text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-semibold"
            style={{ backgroundColor: `${origem?.cor}15`, color: origem?.cor }}
          >
            {origem?.icon} {origem?.label}
          </span>
        </div>
        {indicadoPor && (
          <div className="flex items-center gap-1 text-slate-600">
            <span>👤</span>
            <span>Indic. por {toTitleCase(indicadoPor.nome).split(' ').slice(0, 2).join(' ')}</span>
          </div>
        )}
        {captador && (
          <div className="flex items-center gap-1 text-slate-500">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[8px] font-bold text-white">
              {captador.avatar}
            </div>
            <span>{captador.nome}</span>
          </div>
        )}
        {lead.proximaAcao?.data && (
          <div className="flex items-center gap-1 text-amber-600 font-semibold">
            <Calendar size={9} />
            {formatDate(lead.proximaAcao.data)}
          </div>
        )}
      </div>

      <div className="mt-2 flex gap-1.5">
        <a
          href={`https://wa.me/55${(lead.telefone || '').replace(/\D/g, '')}?text=Olá%20${encodeURIComponent(lead.nome.split(' ')[0])}`}
          target="_blank"
          rel="noopener"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center gap-1 rounded-md bg-accent/10 px-2 py-1 text-[10px] font-semibold text-accent hover:bg-accent hover:text-white transition"
        >
          <MessageSquare size={10} /> WhatsApp
        </a>
      </div>
    </div>
  )
}
