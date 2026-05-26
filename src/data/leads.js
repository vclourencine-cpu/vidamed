// Dados-semente de leads em diferentes estágios do funil
// Para o mockup; em produção viriam do banco com RLS por perfil.

export const LEADS_SEED = [
  // ===== NOVOS (recém-chegados) =====
  {
    id: 'l001', nome: 'Lucas Andrade Pereira', crm: '12450/AL', cpf: null,
    telefone: '(82) 99811-2233', email: 'lucas.andrade@gmail.com',
    estagio: 'novo', origem: 'indicacao', indicadoPor: 'm001', // Jackson Menezes
    captadorId: 'c001', tags: ['Plantonista', 'UTI'],
    proximaAcao: { tipo: 'primeiro_contato', data: '2026-05-28', desc: 'Ligar pela primeira vez' },
    notas: 'Indicado pelo Dr. Jackson. Trabalha em UTI da Hapvida e quer organizar tributos.',
    criadoEm: '2026-05-26T10:00:00',
    historico: [
      { data: '2026-05-26T10:00:00', tipo: 'criacao', desc: 'Lead criado · Indicação de Dr. Jackson Menezes' }
    ]
  },
  {
    id: 'l002', nome: 'Beatriz Cardoso Lima', crm: '11892/AL', cpf: null,
    telefone: '(82) 99655-4321', email: 'biacardoso@outlook.com',
    estagio: 'novo', origem: 'site', indicadoPor: null,
    captadorId: 'c003', tags: ['Recém-formada'],
    proximaAcao: { tipo: 'primeiro_contato', data: '2026-05-27', desc: 'WhatsApp inicial' },
    notas: 'Preencheu form no site, ainda sem atuação, busca mentoria.',
    criadoEm: '2026-05-25T16:30:00',
    historico: [
      { data: '2026-05-25T16:30:00', tipo: 'criacao', desc: 'Lead criado · Formulário do site' }
    ]
  },
  {
    id: 'l003', nome: 'Felipe Tavares Rocha', crm: '13110/PE', cpf: null,
    telefone: '(81) 98744-7890', email: 'fe.tavares@hotmail.com',
    estagio: 'novo', origem: 'instagram', indicadoPor: null,
    captadorId: 'c002', tags: ['Plantonista'],
    proximaAcao: { tipo: 'primeiro_contato', data: '2026-05-28', desc: 'Responder DM' },
    notas: 'Veio do Instagram, fez DM perguntando sobre como funciona o PIX líquido.',
    criadoEm: '2026-05-26T08:15:00',
    historico: [
      { data: '2026-05-26T08:15:00', tipo: 'criacao', desc: 'Lead criado · DM Instagram' }
    ]
  },
  {
    id: 'l004', nome: 'Mariana Souza Castro', crm: '12001/AL', cpf: null,
    telefone: '(82) 98123-5566', email: 'marianasouza@gmail.com',
    estagio: 'novo', origem: 'indicacao', indicadoPor: 'm002', // Vanessa Serejo
    captadorId: 'c001', tags: ['Ginecologia', 'Consultório'],
    proximaAcao: { tipo: 'primeiro_contato', data: '2026-05-29', desc: 'Ligar à tarde' },
    notas: 'Indicada pela Dra. Vanessa. Tem consultório próprio + plantão na Santa Casa.',
    criadoEm: '2026-05-26T11:00:00',
    historico: [
      { data: '2026-05-26T11:00:00', tipo: 'criacao', desc: 'Lead criado · Indicação de Dra. Vanessa Serejo' }
    ]
  },
  {
    id: 'l005', nome: 'Ricardo Mendes Albuquerque', crm: null, cpf: null,
    telefone: '(82) 99432-1100', email: 'ricardomendes@hotmail.com',
    estagio: 'novo', origem: 'evento', indicadoPor: null,
    captadorId: 'c002', tags: ['Recém-formado'],
    proximaAcao: { tipo: 'primeiro_contato', data: '2026-05-27', desc: 'Mensagem de follow-up pós-evento' },
    notas: 'Conhecido no congresso de Emergência. Acabou de fazer residência.',
    criadoEm: '2026-05-24T18:00:00',
    historico: [
      { data: '2026-05-24T18:00:00', tipo: 'criacao', desc: 'Lead criado · Congresso de Emergência AL' }
    ]
  },

  // ===== QUALIFICANDO (primeiro contato feito) =====
  {
    id: 'l010', nome: 'Tiago Pinheiro Macedo', crm: '11567/AL', cpf: null,
    telefone: '(82) 99800-1234', email: 'tiagopinheiro@yahoo.com',
    estagio: 'qualificando', origem: 'indicacao', indicadoPor: 'm003', // Andre Costa
    captadorId: 'c001', tags: ['Emergência', 'UNIMED'],
    proximaAcao: { tipo: 'apresentacao', data: '2026-05-29', desc: 'Enviar apresentação comercial' },
    notas: 'Conversamos 22/05. Interessado mas quer ver os números antes.',
    criadoEm: '2026-05-20T09:00:00',
    historico: [
      { data: '2026-05-20T09:00:00', tipo: 'criacao', desc: 'Lead criado · Indicação Dr. Andre' },
      { data: '2026-05-22T14:30:00', tipo: 'contato', desc: 'Primeiro contato via WhatsApp · respondeu interessado' }
    ]
  },
  {
    id: 'l011', nome: 'Ana Paula Veras', crm: '10876/AL', cpf: null,
    telefone: '(82) 98677-3300', email: 'anaveras@gmail.com',
    estagio: 'qualificando', origem: 'site', indicadoPor: null,
    captadorId: 'c003', tags: ['Pediatria'],
    proximaAcao: { tipo: 'qualificacao', data: '2026-05-28', desc: 'Confirmar atuação atual' },
    notas: 'Preencheu form. Conversamos por mensagem. Não atua em plantão.',
    criadoEm: '2026-05-21T11:00:00',
    historico: [
      { data: '2026-05-21T11:00:00', tipo: 'criacao', desc: 'Lead criado · Formulário do site' },
      { data: '2026-05-23T10:00:00', tipo: 'contato', desc: 'Primeira troca de mensagens' }
    ]
  },
  {
    id: 'l012', nome: 'Rodrigo Vasconcelos Sá', crm: '13201/AL', cpf: null,
    telefone: '(82) 99411-2200', email: 'rodrigo.sa@yahoo.com',
    estagio: 'qualificando', origem: 'parceria', indicadoPor: null,
    captadorId: 'c002', tags: ['Plantonista', 'Hapvida'],
    proximaAcao: { tipo: 'reuniao', data: '2026-05-30', desc: 'Reunião online para apresentação' },
    notas: 'Veio via diretoria clínica da Hapvida. Quer entender taxas.',
    criadoEm: '2026-05-19T15:00:00',
    historico: [
      { data: '2026-05-19T15:00:00', tipo: 'criacao', desc: 'Lead criado · Parceria Hapvida' },
      { data: '2026-05-21T16:00:00', tipo: 'contato', desc: 'Conversa inicial · pediu mais detalhes' }
    ]
  },
  {
    id: 'l013', nome: 'Júlia Ramos Oliveira', crm: '12930/AL', cpf: null,
    telefone: '(82) 99066-7788', email: 'juliaramos@gmail.com',
    estagio: 'qualificando', origem: 'indicacao', indicadoPor: 'm004', // Camila Carvalho
    captadorId: 'c001', tags: ['Anestesiologia'],
    proximaAcao: { tipo: 'apresentacao', data: '2026-05-28', desc: 'Mandar PDF do portfólio' },
    notas: 'Indicada pela Camila. Já tem contador, mas insatisfeita.',
    criadoEm: '2026-05-22T09:30:00',
    historico: [
      { data: '2026-05-22T09:30:00', tipo: 'criacao', desc: 'Lead criado · Indicação Dra. Camila Carvalho' },
      { data: '2026-05-24T11:00:00', tipo: 'contato', desc: 'Conversamos · comparando com contador atual' }
    ]
  },

  // ===== NEGOCIANDO (apresentou plano, em decisão) =====
  {
    id: 'l020', nome: 'Eduardo Castro Lopes', crm: '11200/AL', cpf: null,
    telefone: '(82) 99700-1500', email: 'edu.castro@hotmail.com',
    estagio: 'negociando', origem: 'indicacao', indicadoPor: 'm001', // Jackson
    captadorId: 'c001', tags: ['Cirurgia Geral', 'Plantão'],
    proximaAcao: { tipo: 'fechamento', data: '2026-05-28', desc: 'Cobrar resposta sobre proposta' },
    notas: 'Recebeu proposta dia 23. Disse que ia decidir até sexta. Promissor.',
    criadoEm: '2026-05-15T10:00:00',
    historico: [
      { data: '2026-05-15T10:00:00', tipo: 'criacao', desc: 'Lead criado · Indicação Dr. Jackson' },
      { data: '2026-05-18T14:00:00', tipo: 'contato', desc: 'Primeira conversa' },
      { data: '2026-05-23T16:00:00', tipo: 'proposta', desc: 'Apresentação completa enviada' }
    ]
  },
  {
    id: 'l021', nome: 'Letícia Brandão Gomes', crm: '12640/AL', cpf: null,
    telefone: '(82) 98955-4400', email: 'leticia.brandao@gmail.com',
    estagio: 'negociando', origem: 'site', indicadoPor: null,
    captadorId: 'c003', tags: ['UTI', 'Recém-formada'],
    proximaAcao: { tipo: 'fechamento', data: '2026-05-29', desc: 'Esclarecer dúvida sobre taxa adm' },
    notas: 'Apresentação foi bem. Tem dúvida específica sobre como funciona em meses sem plantão.',
    criadoEm: '2026-05-18T15:00:00',
    historico: [
      { data: '2026-05-18T15:00:00', tipo: 'criacao', desc: 'Lead criado · Formulário do site' },
      { data: '2026-05-20T11:00:00', tipo: 'reuniao', desc: 'Reunião de apresentação online (45min)' },
      { data: '2026-05-24T09:00:00', tipo: 'duvida', desc: 'Mandou pergunta sobre taxa em mês sem plantão' }
    ]
  },
  {
    id: 'l022', nome: 'Henrique Vilela Cunha', crm: '11440/AL', cpf: null,
    telefone: '(82) 99300-1122', email: 'henrique.vilela@yahoo.com',
    estagio: 'negociando', origem: 'parceria', indicadoPor: null,
    captadorId: 'c002', tags: ['Cardiologia'],
    proximaAcao: { tipo: 'fechamento', data: '2026-05-30', desc: 'Marcar reunião final com sócio' },
    notas: 'Tem clínica em sociedade. Quer alinhar com o sócio antes de fechar.',
    criadoEm: '2026-05-16T13:00:00',
    historico: [
      { data: '2026-05-16T13:00:00', tipo: 'criacao', desc: 'Lead criado · Parceria Santa Casa' },
      { data: '2026-05-20T15:00:00', tipo: 'reuniao', desc: 'Apresentação inicial' },
      { data: '2026-05-25T10:00:00', tipo: 'proposta', desc: 'Proposta personalizada enviada' }
    ]
  },

  // ===== ONBOARDING (aceitou, enviando docs) =====
  {
    id: 'l030', nome: 'Fernanda Bezerra Costa', crm: '12800/AL', cpf: '098.765.432-11',
    telefone: '(82) 98700-5544', email: 'fernanda.bc@gmail.com',
    estagio: 'onboarding', origem: 'indicacao', indicadoPor: 'm007', // Igor Lins
    captadorId: 'c001', tags: ['Emergência'],
    proximaAcao: { tipo: 'documentos', data: '2026-05-27', desc: 'Cobrar comprovante de residência' },
    notas: 'Aceitou! Já enviou CRM e diploma. Falta comprovante de residência.',
    criadoEm: '2026-05-10T10:00:00',
    historico: [
      { data: '2026-05-10T10:00:00', tipo: 'criacao', desc: 'Lead criado · Indicação Dr. Igor Lins' },
      { data: '2026-05-15T14:00:00', tipo: 'reuniao', desc: 'Apresentação' },
      { data: '2026-05-22T11:00:00', tipo: 'fechamento', desc: 'Aceitou a proposta · iniciou onboarding' },
      { data: '2026-05-24T09:30:00', tipo: 'documentos', desc: 'CRM + diploma recebidos' }
    ]
  },

  // ===== CONVERTIDOS (já são médicos Vidamed) =====
  {
    id: 'l040', nome: 'Camila Maria Vieira de Carvalho', crm: '9648/AL', cpf: '077.670.504-08',
    telefone: '(82) 9 9650-3545', email: 'camila.carvalho@vidamed.com',
    estagio: 'convertido', origem: 'evento', indicadoPor: null,
    captadorId: 'c001', tags: ['Plantonista'],
    proximaAcao: null,
    notas: 'Convertida em jun/2024. Hoje é uma das nossas top indicadoras.',
    criadoEm: '2024-05-15T10:00:00', convertidoEm: '2024-06-05T14:00:00',
    medicoId: 'm004',
    historico: [
      { data: '2024-05-15T10:00:00', tipo: 'criacao', desc: 'Lead criado · Congresso médico AL' },
      { data: '2024-06-05T14:00:00', tipo: 'conversao', desc: '✅ Convertida em médica Vidamed' }
    ]
  },
  {
    id: 'l041', nome: 'Igor do Nascimento Lins', crm: '6193-AL', cpf: '077.106.704-66',
    telefone: '(82) 99912-1404', email: 'igor.lins@vidamed.com',
    estagio: 'convertido', origem: 'outbound', indicadoPor: null,
    captadorId: 'c002', tags: ['Emergência'],
    proximaAcao: null,
    notas: 'Veio por cold outreach, virou médico e já indicou 3 leads convertidos.',
    criadoEm: '2023-11-01T09:00:00', convertidoEm: '2023-11-22T15:00:00',
    medicoId: 'm007',
    historico: [
      { data: '2023-11-01T09:00:00', tipo: 'criacao', desc: 'Lead criado · Outbound' },
      { data: '2023-11-22T15:00:00', tipo: 'conversao', desc: '✅ Convertido em médico Vidamed' }
    ]
  },

  // ===== PERDIDOS =====
  {
    id: 'l050', nome: 'Marcos Vinícius Tavares', crm: '11122/AL', cpf: null,
    telefone: '(82) 99811-9988', email: 'marcosvt@gmail.com',
    estagio: 'perdido', origem: 'site', indicadoPor: null,
    captadorId: 'c003', tags: [],
    motivoPerda: 'Já tem contador',
    proximaAcao: null,
    notas: 'Já trabalha com contador de família há 8 anos, não quer mudar.',
    criadoEm: '2026-04-12T10:00:00', perdidoEm: '2026-04-28T16:00:00',
    historico: [
      { data: '2026-04-12T10:00:00', tipo: 'criacao', desc: 'Lead criado · Formulário do site' },
      { data: '2026-04-15T11:00:00', tipo: 'contato', desc: 'Primeira conversa' },
      { data: '2026-04-28T16:00:00', tipo: 'perda', desc: '❌ Perdido · Motivo: Já tem contador' }
    ]
  },
  {
    id: 'l051', nome: 'Diana Albuquerque Melo', crm: null, cpf: null,
    telefone: '(82) 99744-3322', email: 'dianaalbu@gmail.com',
    estagio: 'perdido', origem: 'instagram', indicadoPor: null,
    captadorId: 'c002', tags: ['Recém-formada'],
    motivoPerda: 'Sem retorno após várias tentativas',
    proximaAcao: null,
    notas: 'Demonstrou interesse no Insta, mas não respondeu mais.',
    criadoEm: '2026-04-20T14:00:00', perdidoEm: '2026-05-05T10:00:00',
    historico: [
      { data: '2026-04-20T14:00:00', tipo: 'criacao', desc: 'Lead criado · DM Instagram' },
      { data: '2026-05-05T10:00:00', tipo: 'perda', desc: '❌ Perdido · Motivo: Sem retorno' }
    ]
  }
]

export const getLead = (id) => LEADS_SEED.find(l => l.id === id)

// Agregações úteis
export const leadsPorEstagio = (leads = LEADS_SEED) => {
  const r = { novo: [], qualificando: [], negociando: [], onboarding: [], convertido: [], perdido: [] }
  leads.forEach(l => { if (r[l.estagio]) r[l.estagio].push(l) })
  return r
}

export const topIndicadores = (leads = LEADS_SEED) => {
  const map = {}
  leads.forEach(l => {
    if (l.indicadoPor) {
      if (!map[l.indicadoPor]) map[l.indicadoPor] = { total: 0, convertidos: 0 }
      map[l.indicadoPor].total++
      if (l.estagio === 'convertido') map[l.indicadoPor].convertidos++
    }
  })
  return Object.entries(map)
    .map(([medicoId, stats]) => ({ medicoId, ...stats }))
    .sort((a, b) => b.convertidos - a.convertidos || b.total - a.total)
}

export const conversao = (leads = LEADS_SEED) => {
  const total = leads.filter(l => l.estagio !== 'novo').length
  const convertidos = leads.filter(l => l.estagio === 'convertido').length
  return total > 0 ? (convertidos / total) * 100 : 0
}
