import { useMemo, useState } from 'react'
import { Building2, Filter, Download } from 'lucide-react'
import { getSession } from '../lib/auth'
import { extratoMedico } from '../lib/dre'
import { formatBRL, formatDate, competenciaLabel } from '../lib/storage'

export default function Extratos() {
  const session = getSession()
  const medicoId = session?.medicoId || 'm001'
  const [filtroStatus, setFiltroStatus] = useState('todos')

  const extrato = useMemo(() => extratoMedico(medicoId), [medicoId])
  const filtrado = extrato.filter(e => filtroStatus === 'todos' || e.status === filtroStatus)

  const totalRecebido = extrato.filter(e => e.status === 'pago').reduce((s, e) => s + e.aReceber, 0)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">Histórico completo</p>
        <h1 className="font-display text-2xl font-bold text-slate-800 sm:text-3xl">Extratos</h1>
        <p className="mt-1 text-sm text-slate-500">Todos os seus pagamentos, instituição por instituição.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 p-4 text-white shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/80">Total recebido</p>
          <p className="mt-1 font-display text-2xl font-bold tabular-nums">{formatBRL(totalRecebido)}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Lançamentos</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-800">{extrato.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Pendentes</p>
          <p className="mt-1 font-display text-2xl font-bold text-amber-600">{extrato.filter(e => e.status !== 'pago').length}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Filter size={14} className="text-slate-400" />
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:outline-none">
          <option value="todos">Todos os status</option>
          <option value="pago">Recebidos</option>
          <option value="nota_emitida">Nota emitida</option>
          <option value="lancado">Lançados</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Competência</th>
                <th className="px-4 py-3">Instituição</th>
                <th className="px-4 py-3 text-right">Bruto</th>
                <th className="px-4 py-3 text-right">Impostos</th>
                <th className="px-4 py-3 text-right">Recebido</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map(e => (
                <tr key={e.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 text-slate-600">{competenciaLabel(e.competencia)}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: e.instituicao.cor }} />
                      <span className="font-medium text-slate-800">{e.instituicao.nome}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-700">{formatBRL(e.rendimento)}</td>
                  <td className="px-4 py-3 text-right font-mono text-red-600">−{formatBRL(e.descImpostos)}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-teal-700">{formatBRL(e.aReceber)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                      e.status === 'pago' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>{e.status === 'pago' ? 'recebido' : 'pendente'}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded-lg p-1.5 text-slate-400 hover:bg-teal-50 hover:text-teal-600" title="Baixar comprovante">
                      <Download size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
