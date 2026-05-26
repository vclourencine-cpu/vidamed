import { storage } from './storage'

const KEY = 'vidamed.session'

export const USUARIOS = [
  {
    email: 'gestor@vidamedgestao.com.br',
    nome: 'Vinicius Lourenço',
    cargo: 'Diretor',
    perfil: 'gestor',
    avatar: 'VL'
  },
  {
    email: 'financeiro@vidamedgestao.com.br',
    nome: 'Equipe Financeira',
    cargo: 'Analista Administrativo-Financeiro',
    perfil: 'admin',
    avatar: 'EF'
  }
]

export const login = (email) => {
  const usuario = USUARIOS.find(u => u.email.toLowerCase() === email.toLowerCase().trim())
  if (!usuario) return null
  storage.set(KEY, usuario)
  return usuario
}

export const logout = () => storage.remove(KEY)

export const getSession = () => storage.get(KEY)
