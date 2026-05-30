import { FileText, Download, FileCheck, Receipt, FileSpreadsheet, AlertCircle } from 'lucide-react'

const DOCS = [
  { id: 1, nome: 'Informe de Rendimentos 2025', tipo: 'IRPF', icon: FileSpreadsheet, cor: 'bg-blue-100 text-blue-600', data: 'Fev/2026', tamanho: '180 KB' },
  { id: 2, nome: 'Comprovante de pagamento — Maio/2026', tipo: 'Comprovante', icon: Receipt, cor: 'bg-teal-100 text-teal-600', data: 'Mai/2026', tamanho: '92 KB' },
  { id: 3, nome: 'Comprovante de pagamento — Abril/2026', tipo: 'Comprovante', icon: Receipt, cor: 'bg-teal-100 text-teal-600', data: 'Abr/2026', tamanho: '88 KB' },
  { id: 4, nome: 'Nota Fiscal — Hapvida — Maio/2026', tipo: 'NF', icon: FileText, cor: 'bg-violet-100 text-violet-600', data: 'Mai/2026', tamanho: '120 KB' },
  { id: 5, nome: 'Contrato de prestação de serviços', tipo: 'Contrato', icon: FileCheck, cor: 'bg-amber-100 text-amber-600', data: 'Mar/2024', tamanho: '340 KB' }
]

export default function Documentos() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">Autoatendimento</p>
        <h1 className="font-display text-2xl font-bold text-slate-800 sm:text-3xl">Documentos</h1>
        <p className="mt-1 text-sm text-slate-500">Seus comprovantes, informes e notas — baixe quando precisar, sem pedir a ninguém.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {DOCS.map(d => (
          <div key={d.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${d.cor}`}>
              <d.icon size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-slate-800">{d.nome}</p>
              <p className="text-xs text-slate-500">{d.tipo} · {d.data} · {d.tamanho}</p>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-600 hover:text-white transition">
              <Download size={14} /> Baixar
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-teal-50 p-3 text-xs text-teal-800">
        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
        <span><strong>Mockup:</strong> os downloads são simulados. Na versão final, cada documento será gerado/armazenado com segurança e disponibilizado aqui automaticamente.</span>
      </div>
    </div>
  )
}
