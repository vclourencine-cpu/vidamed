export const INSTITUICOES = [
  { id: 'hapvida', nome: 'HAPVIDA', cnpj: '63.554.067/0001-98', razaoSocial: 'HAPVIDA ASSISTENCIA MEDICA LTDA', cor: '#e11d48' },
  { id: 'telemedicina_hapvida', nome: 'TELEMEDICINA HAPVIDA', cnpj: '63.554.067/0001-98', razaoSocial: 'HAPVIDA ASSISTENCIA MEDICA LTDA', cor: '#f43f5e' },
  { id: 'unimed_gruta', nome: 'UNIMED GRUTA', cnpj: '12.345.678/0001-00', razaoSocial: 'UNIMED MACEIO COOPERATIVA DE TRABALHO MEDICO', cor: '#16a34a' },
  { id: 'unimed_farol', nome: 'UNIMED FAROL', cnpj: '12.345.678/0001-00', razaoSocial: 'UNIMED MACEIO COOPERATIVA DE TRABALHO MEDICO', cor: '#22c55e' },
  { id: 'santa_casa', nome: 'HOSPITAL SANTA CASA MACEIO', cnpj: '98.765.432/0001-00', razaoSocial: 'SANTA CASA DE MISERICORDIA DE MACEIO', cor: '#ea580c' },
  { id: 'clinica_medica', nome: 'CLINICA MEDICA E ODONTOLOGIA', cnpj: '11.222.333/0001-44', razaoSocial: 'CLINICA MEDICA E ODONTOLOGIA LTDA', cor: '#7c3aed' },
  { id: 'aaz', nome: 'AAZ PRESTAÇÃO DE SERVIÇO MÉDICOS', cnpj: '55.666.777/0001-88', razaoSocial: 'AAZ PRESTACAO DE SERVICOS MEDICOS LTDA', cor: '#0891b2' }
]

export const getInstituicao = (id) => INSTITUICOES.find(i => i.id === id)
