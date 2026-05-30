import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatBRL } from '../../lib/storage'

// Waterfall do DRE: Bruto → (−)Impostos → (−)Taxa → Você recebe.
// Técnica: barra "base" transparente empilhada com a barra "valor" colorida.
export default function WaterfallDRE({ dre }) {
  const { bruto, impostos, liquida, taxaAdm, resultado } = dre

  const data = [
    { nome: 'Bruto', base: 0, valor: bruto, cor: '#1e5a8f', sinal: '' },
    { nome: 'Impostos', base: Math.max(0, bruto - impostos), valor: impostos, cor: '#DC2626', sinal: '−' },
    { nome: 'Taxa Adm', base: Math.max(0, liquida - taxaAdm), valor: taxaAdm, cor: '#F59E0B', sinal: '−' },
    { nome: 'Você recebe', base: 0, valor: resultado, cor: '#009E3D', sinal: '' }
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const d = payload.find(p => p.dataKey === 'valor')?.payload
    if (!d) return null
    return (
      <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
        <p className="font-semibold">{d.nome}</p>
        <p className="font-mono">{d.sinal}{formatBRL(d.valor)}</p>
      </div>
    )
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 8, left: 8, bottom: 0 }}>
          <XAxis dataKey="nome" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
          <Bar dataKey="base" stackId="a" fill="transparent" />
          <Bar dataKey="valor" stackId="a" radius={[6, 6, 0, 0]} isAnimationActive={false}>
            {data.map((d, i) => <Cell key={i} fill={d.cor} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
