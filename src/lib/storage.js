// Wrapper localStorage com fallback in-memory para o mockup
const MEM = {}
const isBrowser = typeof window !== 'undefined' && !!window.localStorage

export const storage = {
  get(key, fallback = null) {
    if (!isBrowser) return MEM[key] ?? fallback
    try {
      const v = window.localStorage.getItem(key)
      return v == null ? fallback : JSON.parse(v)
    } catch { return fallback }
  },
  set(key, value) {
    if (!isBrowser) { MEM[key] = value; return }
    try { window.localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
  remove(key) {
    if (!isBrowser) { delete MEM[key]; return }
    try { window.localStorage.removeItem(key) } catch {}
  }
}

export const formatBRL = (v) =>
  (v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatNumber = (v) =>
  (v || 0).toLocaleString('pt-BR')

export const formatPercent = (v, digits = 1) =>
  `${v >= 0 ? '+' : ''}${v.toFixed(digits)}%`

export const formatDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR')
}

export const formatDateTime = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString('pt-BR')
}

export const competenciaLabel = (c) => {
  if (!c) return ''
  const [ano, mes] = c.split('-')
  const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  return `${meses[Number(mes) - 1]}/${ano}`
}
