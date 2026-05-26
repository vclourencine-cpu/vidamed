// Lançamentos baseados nas prints da planilha Maio/2026 + dados sintéticos para Abril
// Estrutura: cada "nota" agrupa lançamentos da mesma instituição/competência
const calc = (rendimento, percentImposto, taxaAdm = 0) => {
  const desc = Math.round(rendimento * (percentImposto / 100) * 100) / 100
  const liquido = Math.round((rendimento - desc) * 100) / 100
  const aReceber = Math.round((liquido - taxaAdm) * 100) / 100
  return { rendimento, percentImposto, descImpostos: desc, caiuNaConta: liquido, taxaAdm, aReceber }
}

export const PAGAMENTOS_SEED = [
  // ============ MAIO/2026 ============
  {
    id: 'p001', instituicaoId: 'hapvida', competencia: '2026-05', notaNumero: '1',
    status: 'pago', dataPagamento: '2026-05-18', emailEnviado: true, emailEnviadoEm: '2026-05-15T14:30:00',
    lancamentos: [{ medicoId: 'm001', ...calc(29800, 10, 0) }]
  },
  {
    id: 'p002', instituicaoId: 'unimed_gruta', competencia: '2026-05', notaNumero: '2',
    status: 'pago', dataPagamento: '2026-05-20', emailEnviado: true, emailEnviadoEm: '2026-05-16T10:15:00',
    lancamentos: [{ medicoId: 'm002', ...calc(14880, 14, 0) }]
  },
  {
    id: 'p003', instituicaoId: 'unimed_farol', competencia: '2026-05', notaNumero: '3',
    status: 'pago', dataPagamento: '2026-05-21', emailEnviado: true, emailEnviadoEm: '2026-05-16T10:18:00',
    lancamentos: [{ medicoId: 'm002', ...calc(2790, 14, 0) }]
  },
  {
    id: 'p004', instituicaoId: 'clinica_medica', competencia: '2026-05', notaNumero: '4',
    status: 'pago', dataPagamento: '2026-05-19', emailEnviado: true, emailEnviadoEm: '2026-05-15T16:00:00',
    lancamentos: [{ medicoId: 'm003', ...calc(1088, 12, 0) }]
  },
  {
    id: 'p005', instituicaoId: 'telemedicina_hapvida', competencia: '2026-05', notaNumero: '5',
    status: 'nota_emitida', dataPagamento: null, emailEnviado: true, emailEnviadoEm: '2026-05-18T09:45:00',
    lancamentos: [
      { medicoId: 'm004', ...calc(447, 10, 0) },
      { medicoId: 'm005', ...calc(99, 16, 0) },
      { medicoId: 'm006', ...calc(929, 16, 0) },
      { medicoId: 'm007', ...calc(1266, 16, 0) }
    ]
  },
  {
    id: 'p006', instituicaoId: 'santa_casa', competencia: '2026-05', notaNumero: '6',
    status: 'nota_emitida', dataPagamento: null, emailEnviado: true, emailEnviadoEm: '2026-05-20T11:30:00',
    lancamentos: [{ medicoId: 'm008', ...calc(7020, 16, 0) }]
  },
  {
    id: 'p007', instituicaoId: 'aaz', competencia: '2026-05', notaNumero: '7',
    status: 'lancado', dataPagamento: null, emailEnviado: true, emailEnviadoEm: '2026-05-22T15:00:00',
    lancamentos: [
      { medicoId: 'm009', ...calc(2600, 16, 0) },
      { medicoId: 'm009', ...calc(2450, 16, 100) }
    ]
  },
  {
    id: 'p008', instituicaoId: 'clinica_medica', competencia: '2026-05', notaNumero: '8',
    status: 'lancado', dataPagamento: null, emailEnviado: false, emailEnviadoEm: null,
    lancamentos: [{ medicoId: 'm003', ...calc(1344, 12, 0) }]
  },
  {
    id: 'p009', instituicaoId: 'hapvida', competencia: '2026-05', notaNumero: 'Hapvida-Lote2',
    status: 'pago', dataPagamento: '2026-05-18', emailEnviado: true, emailEnviadoEm: '2026-05-12T08:30:00',
    lancamentos: [
      { medicoId: 'm014', ...calc(3689, 10, 0) },
      { medicoId: 'm005', ...calc(3469, 10, 0) },
      { medicoId: 'm007', ...calc(4773, 10, 0) },
      { medicoId: 'm006', ...calc(10456, 10, 0) },
      { medicoId: 'm010', ...calc(1649, 10, 0) },
      { medicoId: 'm004', ...calc(14863, 10, 0) },
      { medicoId: 'm011', ...calc(743, 10, 0) },
      { medicoId: 'm012', ...calc(4624, 10, 0) },
      { medicoId: 'm013', ...calc(5417, 10, 0) }
    ]
  },

  // ============ ABRIL/2026 (sintético para comparação) ============
  {
    id: 'p101', instituicaoId: 'hapvida', competencia: '2026-04', notaNumero: 'A1',
    status: 'pago', dataPagamento: '2026-04-18', emailEnviado: true, emailEnviadoEm: '2026-04-12T09:00:00',
    lancamentos: [{ medicoId: 'm001', ...calc(26500, 10, 0) }]
  },
  {
    id: 'p102', instituicaoId: 'unimed_gruta', competencia: '2026-04', notaNumero: 'A2',
    status: 'pago', dataPagamento: '2026-04-20', emailEnviado: true, emailEnviadoEm: '2026-04-15T10:00:00',
    lancamentos: [{ medicoId: 'm002', ...calc(13200, 14, 0) }]
  },
  {
    id: 'p103', instituicaoId: 'santa_casa', competencia: '2026-04', notaNumero: 'A3',
    status: 'pago', dataPagamento: '2026-04-22', emailEnviado: true, emailEnviadoEm: '2026-04-15T11:00:00',
    lancamentos: [{ medicoId: 'm008', ...calc(6540, 16, 0) }]
  },
  {
    id: 'p104', instituicaoId: 'aaz', competencia: '2026-04', notaNumero: 'A4',
    status: 'pago', dataPagamento: '2026-04-25', emailEnviado: true, emailEnviadoEm: '2026-04-18T14:00:00',
    lancamentos: [
      { medicoId: 'm009', ...calc(2400, 16, 0) },
      { medicoId: 'm009', ...calc(2200, 16, 100) }
    ]
  },
  {
    id: 'p105', instituicaoId: 'telemedicina_hapvida', competencia: '2026-04', notaNumero: 'A5',
    status: 'pago', dataPagamento: '2026-04-28', emailEnviado: true, emailEnviadoEm: '2026-04-20T16:00:00',
    lancamentos: [
      { medicoId: 'm004', ...calc(380, 10, 0) },
      { medicoId: 'm006', ...calc(820, 16, 0) },
      { medicoId: 'm007', ...calc(1100, 16, 0) }
    ]
  },
  {
    id: 'p106', instituicaoId: 'hapvida', competencia: '2026-04', notaNumero: 'A6',
    status: 'pago', dataPagamento: '2026-04-15', emailEnviado: true, emailEnviadoEm: '2026-04-10T08:00:00',
    lancamentos: [
      { medicoId: 'm014', ...calc(3200, 10, 0) },
      { medicoId: 'm005', ...calc(3100, 10, 0) },
      { medicoId: 'm004', ...calc(13200, 10, 0) },
      { medicoId: 'm012', ...calc(4100, 10, 0) },
      { medicoId: 'm013', ...calc(4800, 10, 0) }
    ]
  }
]

// Helpers de agregação
export const agregarPorCompetencia = (competencia, pagamentos = PAGAMENTOS_SEED) => {
  const list = pagamentos.filter(p => p.competencia === competencia)
  let bruto = 0, liquido = 0, taxaAdm = 0, aReceber = 0
  const medicosAtivos = new Set()
  const porMedico = {}
  list.forEach(p => {
    p.lancamentos.forEach(l => {
      bruto += l.rendimento
      liquido += l.caiuNaConta
      taxaAdm += l.taxaAdm
      aReceber += l.aReceber
      medicosAtivos.add(l.medicoId)
      porMedico[l.medicoId] = (porMedico[l.medicoId] || 0) + l.rendimento
    })
  })
  return {
    bruto: Math.round(bruto * 100) / 100,
    liquido: Math.round(liquido * 100) / 100,
    taxaAdm: Math.round(taxaAdm * 100) / 100,
    aReceber: Math.round(aReceber * 100) / 100,
    medicosAtivos: medicosAtivos.size,
    porMedico
  }
}

export const variacao = (atual, anterior) => {
  if (!anterior) return 0
  return ((atual - anterior) / anterior) * 100
}
