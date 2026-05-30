import { storage } from './storage'

const KEY = 'vidamed.session'

// Cada usuário tem um ou mais perfis. Quem tem >1 alterna o "contexto ativo"
// por um seletor (ex.: Dr. Jackson é sócio-gestor E médico).
//  • admin     → sócios gestores. Visão total (corporativo + gerencial + operacional)
//  • financeiro→ operação médico-a-médico + capta leads. Sem consolidado corporativo
//  • medico    → portal pessoal, read-only do próprio financeiro + DRE
export const USUARIOS = [
  {
    email: 'admin@vidamedgestao.com.br',
    nome: 'Victor Chastinet',
    cargo: 'Sócio-Gestor',
    perfis: ['admin'],
    avatar: 'VC'
  },
  {
    email: 'financeiro@vidamedgestao.com.br',
    nome: 'Equipe Financeira',
    cargo: 'Analista Administrativo-Financeiro',
    perfis: ['financeiro'],
    avatar: 'EF'
  },
  {
    // Sócio-gestor que também é médico parceiro → 2 perfis, alterna contexto
    email: 'jackson@vidamedgestao.com.br',
    nome: 'Dr. Jackson Menezes',
    cargo: 'Sócio-Gestor & Médico',
    perfis: ['admin', 'medico'],
    medicoId: 'm001',
    avatar: 'JM'
  }
]

export const PERFIL_INFO = {
  admin:      { label: 'Sócio-Gestor', area: 'Painel de Gestão', rota: '/app/dashboard', cls: 'bg-amber-100 text-amber-700' },
  financeiro: { label: 'Financeiro',   area: 'Operação',         rota: '/app/dashboard', cls: 'bg-accent/10 text-accent' },
  medico:     { label: 'Médico',       area: 'Meu Portal',       rota: '/portal',         cls: 'bg-teal-100 text-teal-700' }
}

// Prioridade para definir o contexto inicial de quem tem múltiplos perfis
const PRIORIDADE = ['admin', 'financeiro', 'medico']
const perfilPrincipal = (perfis) => PRIORIDADE.find(p => perfis.includes(p)) || perfis[0]

// ===== Permissões centralizadas (operam sobre o contexto ativo) =====
export const perms = {
  operar: (p) => p === 'admin' || p === 'financeiro',
  verGerencial: (p) => p === 'admin',
  verCorporativo: (p) => p === 'admin',
  captarLeads: (p) => p === 'admin' || p === 'financeiro',
  portalMedico: (p) => p === 'medico'
}

export const login = (email) => {
  const u = USUARIOS.find(x => x.email.toLowerCase() === email.toLowerCase().trim())
  if (!u) return null
  const sessao = { ...u, perfil: perfilPrincipal(u.perfis) } // perfil = contexto ativo
  storage.set(KEY, sessao)
  return sessao
}

export const logout = () => storage.remove(KEY)

export const getSession = () => storage.get(KEY)

// Troca o contexto ativo (para quem tem múltiplos perfis) e persiste
export const trocarContexto = (novoPerfil) => {
  const s = getSession()
  if (!s || !s.perfis?.includes(novoPerfil)) return s
  const atualizada = { ...s, perfil: novoPerfil }
  storage.set(KEY, atualizada)
  return atualizada
}

export const temMultiplosPerfis = (session) => (session?.perfis?.length || 0) > 1

// Rota inicial conforme o contexto ativo
export const rotaInicial = (perfil) => PERFIL_INFO[perfil]?.rota || '/app/dashboard'
