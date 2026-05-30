// Cálculo do DRE (Demonstração de Resultado) por médico.
// Deriva dos pagamentos reais (PAGAMENTOS_SEED) e completa a série
// histórica de 12 meses com valores sintéticos determinísticos
// (mesmo médico+mês = sempre o mesmo valor, sem Math.random).

import { PAGAMENTOS_SEED } from '../data/pagamentos'
import { getInstituicao } from '../data/instituicoes'

const COMPETENCIA_ATUAL = '2026-05'

// hash determinístico simples → fator de variação por médico/mês
const seed = (str) => {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}
const fatorMes = (medicoId, ym) => 0.65 + ((seed(medicoId + ym) % 1000) / 1000) * 0.7 // 0.65–1.35

const round2 = (n) => Math.round(n * 100) / 100

// Lista de lançamentos de um médico numa competência (dos pagamentos reais)
const lancamentosDoMedico = (medicoId, competencia) => {
  const out = []
  PAGAMENTOS_SEED
    .filter(p => p.competencia === competencia)
    .forEach(p => {
      p.lancamentos
        .filter(l => l.medicoId === medicoId)
        .forEach(l => out.push({ ...l, pagamento: p }))
    })
  return out
}

// DRE de um médico numa competência — a partir dos dados reais
export const dreMedico = (medicoId, competencia = COMPETENCIA_ATUAL) => {
  const lancs = lancamentosDoMedico(medicoId, competencia)
  const dre = lancs.reduce((acc, l) => ({
    bruto: acc.bruto + l.rendimento,
    impostos: acc.impostos + l.descImpostos,
    liquida: acc.liquida + l.caiuNaConta,
    taxaAdm: acc.taxaAdm + l.taxaAdm,
    resultado: acc.resultado + l.aReceber
  }), { bruto: 0, impostos: 0, liquida: 0, taxaAdm: 0, resultado: 0 })
  Object.keys(dre).forEach(k => { dre[k] = round2(dre[k]) })
  dre.percentImposto = dre.bruto > 0 ? round2((dre.impostos / dre.bruto) * 100) : 0
  return dre
}

// Distribuição por instituição numa competência
export const porInstituicaoMedico = (medicoId, competencia = COMPETENCIA_ATUAL) => {
  const map = {}
  lancamentosDoMedico(medicoId, competencia).forEach(l => {
    const id = l.pagamento.instituicaoId
    map[id] = (map[id] || 0) + l.rendimento
  })
  const total = Object.values(map).reduce((s, v) => s + v, 0)
  return Object.entries(map)
    .map(([id, valor]) => ({
      instituicao: getInstituicao(id),
      valor: round2(valor),
      pct: total > 0 ? round2((valor / total) * 100) : 0
    }))
    .sort((a, b) => b.valor - a.valor)
}

// Extrato de pagamentos do médico (todos, ou de uma competência)
export const extratoMedico = (medicoId, competencia = null) => {
  const out = []
  PAGAMENTOS_SEED
    .filter(p => !competencia || p.competencia === competencia)
    .forEach(p => {
      p.lancamentos
        .filter(l => l.medicoId === medicoId)
        .forEach(l => out.push({
          id: `${p.id}-${medicoId}`,
          competencia: p.competencia,
          instituicao: getInstituicao(p.instituicaoId),
          notaNumero: p.notaNumero,
          status: p.status,
          dataPagamento: p.dataPagamento,
          ...l
        }))
    })
  return out.sort((a, b) => b.competencia.localeCompare(a.competencia))
}

// Competências em que o médico teve algum lançamento
export const competenciasMedico = (medicoId) => {
  const set = new Set()
  PAGAMENTOS_SEED.forEach(p => {
    if (p.lancamentos.some(l => l.medicoId === medicoId)) set.add(p.competencia)
  })
  return [...set].sort().reverse()
}

// Série de 12 meses para o line chart (reais onde existem, sintéticos no resto)
export const evolucaoMedico = (medicoId, meses = 12) => {
  const nomesMes = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
  // base = bruto da competência atual (ou referência fixa se médico não tem dado)
  const base = dreMedico(medicoId, COMPETENCIA_ATUAL).bruto || 8000

  const [anoA, mesA] = COMPETENCIA_ATUAL.split('-').map(Number)
  const serie = []
  for (let i = meses - 1; i >= 0; i--) {
    let ano = anoA
    let mes = mesA - i
    while (mes <= 0) { mes += 12; ano -= 1 }
    const ym = `${ano}-${String(mes).padStart(2, '0')}`
    const real = dreMedico(medicoId, ym)
    let bruto, liquido
    if (real.bruto > 0) {
      bruto = real.bruto
      liquido = real.resultado
    } else {
      // sintético determinístico em torno da base
      bruto = round2(base * fatorMes(medicoId, ym))
      liquido = round2(bruto * 0.88) // ~12% médio entre impostos/taxa
    }
    serie.push({
      ym,
      label: nomesMes[mes - 1],
      bruto,
      liquido,
      real: real.bruto > 0
    })
  }
  return serie
}
