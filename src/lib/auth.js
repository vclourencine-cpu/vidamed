import { storage } from './storage'

const KEY = 'vidamed.session'

// 3 perfis:
//  • admin     → sócios gestores. Visão total (corporativo + gerencial + operacional)
//  • financeiro→ equipe operacional. Opera médico-a-médico + capta leads. Sem consolidado corporativo
//  • medico    → portal pessoal, read-only do próprio financeiro + DRE
export const USUARIOS = [
  {
    email: 'admin@vidamedgestao.com.br',
    nome: 'Victor Chastinet',
    cargo: 'Sócio-Gestor',
    perfil: 'admin',
    avatar: 'VC'
  },
  {
    email: 'financeiro@vidamedgestao.com.br',
    nome: 'Equipe Financeira',
    cargo: 'Analista Administrativo-Financeiro',
    perfil: 'financeiro',
    avatar: 'EF'
  },
  {
    email: 'medico@vidamedgestao.com.br',
    nome: 'Dr. Jackson Menezes',
    cargo: 'Médico parceiro',
    perfil: 'medico',
    medicoId: 'm001',
    avatar: 'JM'
  }
]

// ===== Permissões centralizadas (RBAC) =====
// Em vez de espalhar `perfil === 'x'`, use estes helpers — uma fonte de verdade.
export const perms = {
  // Ações operacionais: lançar pagamento, cadastrar/editar médico
  operar: (p) => p === 'admin' || p === 'financeiro',
  // Visão consolidada/gerencial (dashboard com soma de todos)
  verGerencial: (p) => p === 'admin',
  // Visão corporativa (DRE da empresa, lucro dos sócios, config, usuários)
  verCorporativo: (p) => p === 'admin',
  // Captação de leads (Kanban)
  captarLeads: (p) => p === 'admin' || p === 'financeiro',
  // Portal pessoal do médico
  portalMedico: (p) => p === 'medico'
}

export const login = (email) => {
  const usuario = USUARIOS.find(u => u.email.toLowerCase() === email.toLowerCase().trim())
  if (!usuario) return null
  storage.set(KEY, usuario)
  return usuario
}

export const logout = () => storage.remove(KEY)

export const getSession = () => storage.get(KEY)

// Rota inicial conforme o perfil
export const rotaInicial = (perfil) =>
  perfil === 'medico' ? '/portal' : '/app/dashboard'
