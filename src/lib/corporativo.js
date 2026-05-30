// Resultado da própria Vidamed (visão dos sócios).
// Receita da empresa = 17% sobre o faturamento bruto dos médicos + R$120 fixo por médico ativo.
import { agregarPorCompetencia, PAGAMENTOS_SEED } from '../data/pagamentos'

const ALIQUOTA = 0.17
const TAXA_FIXA = 120
const round2 = (n) => Math.round(n * 100) / 100

// Os 3 sócios e a divisão de lucro
export const SOCIOS = [
  { id: 's1', nome: 'Victor Chastinet', cargo: 'Gestão & Produto', pct: 40, avatar: 'VC', cor: '#003768' },
  { id: 's2', nome: 'Dr. Jackson Menezes', cargo: 'Relacionamento Médico', pct: 35, avatar: 'JM', cor: '#009E3D' },
  { id: 's3', nome: 'Marina Albuquerque', cargo: 'Financeiro & Jurídico', pct: 25, avatar: 'MA', cor: '#7c3aed' }
]

const seed = (str) => { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h }

// DRE corporativo de uma competência
export const dreCorporativo = (competencia) => {
  const ag = agregarPorCompetencia(competencia)
  const receitaPercentual = round2(ag.bruto * ALIQUOTA)
  const receitaFixa = ag.medicosAtivos * TAXA_FIXA
  const receitaTotal = round2(receitaPercentual + receitaFixa)
  // despesas operacionais sintéticas (~42% da receita) — folha, ferramentas, escritório
  const despesas = round2(receitaTotal * 0.42)
  const lucro = round2(receitaTotal - despesas)
  const socios = SOCIOS.map(s => ({ ...s, valor: round2(lucro * (s.pct / 100)) }))
  return {
    medicosAtivos: ag.medicosAtivos,
    faturamentoMedicos: ag.bruto,
    receitaPercentual,
    receitaFixa,
    receitaTotal,
    despesas,
    lucro,
    margem: receitaTotal > 0 ? round2((lucro / receitaTotal) * 100) : 0,
    socios
  }
}

// Competências disponíveis
export const competenciasCorp = () =>
  [...new Set(PAGAMENTOS_SEED.map(p => p.competencia))].sort().reverse()

// Evolução do lucro/receita nos últimos 12 meses (reais onde existem, sintéticos no resto)
export const evolucaoCorporativa = (competenciaAtual, meses = 12) => {
  const nomesMes = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
  const base = dreCorporativo(competenciaAtual)
  const [anoA, mesA] = competenciaAtual.split('-').map(Number)
  const disponiveis = new Set(competenciasCorp())
  const serie = []
  for (let i = meses - 1; i >= 0; i--) {
    let ano = anoA, mes = mesA - i
    while (mes <= 0) { mes += 12; ano -= 1 }
    const ym = `${ano}-${String(mes).padStart(2, '0')}`
    let receita, lucro
    if (disponiveis.has(ym)) {
      const d = dreCorporativo(ym)
      receita = d.receitaTotal; lucro = d.lucro
    } else {
      const f = 0.6 + ((seed('corp' + ym) % 1000) / 1000) * 0.6 // 0.6–1.2
      receita = round2(base.receitaTotal * f)
      lucro = round2(receita * 0.58)
    }
    serie.push({ ym, label: nomesMes[mes - 1], receita, lucro })
  }
  return serie
}
