export const CAPTADORES = [
  { id: 'c001', nome: 'Camila Souza', cargo: 'Relacionamento', avatar: 'CS', cor: '#003768' },
  { id: 'c002', nome: 'Bruno Lima', cargo: 'Comercial', avatar: 'BL', cor: '#009E3D' },
  { id: 'c003', nome: 'Equipe Comercial', cargo: 'Atendimento geral', avatar: 'EC', cor: '#7c3aed' }
]

export const getCaptador = (id) => CAPTADORES.find(c => c.id === id)

export const ORIGENS = {
  indicacao: { label: 'Indicação', cor: '#009E3D', icon: '🤝' },
  site: { label: 'Formulário do site', cor: '#0891b2', icon: '🌐' },
  instagram: { label: 'Instagram', cor: '#e11d48', icon: '📸' },
  whatsapp: { label: 'WhatsApp direto', cor: '#16a34a', icon: '💬' },
  evento: { label: 'Evento médico', cor: '#7c3aed', icon: '🎪' },
  parceria: { label: 'Parceria/Hospital', cor: '#ea580c', icon: '🏥' },
  outbound: { label: 'Outbound', cor: '#64748b', icon: '📞' },
  google_ads: { label: 'Google Ads', cor: '#f59e0b', icon: '🔍' }
}

export const ESTAGIOS = [
  { id: 'novo', label: 'Novo', cor: '#0891b2', descricao: 'Entrou agora, ainda sem contato' },
  { id: 'qualificando', label: 'Qualificando', cor: '#f59e0b', descricao: 'Primeiro contato feito' },
  { id: 'negociando', label: 'Negociando', cor: '#7c3aed', descricao: 'Apresentou plano, em decisão' },
  { id: 'onboarding', label: 'Onboarding', cor: '#003768', descricao: 'Aceitou, enviando documentos' },
  { id: 'convertido', label: 'Convertido', cor: '#16a34a', descricao: 'Já é médico Vidamed' },
  { id: 'perdido', label: 'Perdido', cor: '#94a3b8', descricao: 'Não converteu' }
]

export const MOTIVOS_PERDA = [
  'Preço',
  'Já tem contador',
  'Sem interesse no momento',
  'Não atua mais (aposentadoria)',
  'Sem retorno após várias tentativas',
  'Outro'
]
