const KEY = 'vidamed.theme'

export const getTheme = () => {
  try {
    return localStorage.getItem(KEY) || 'light'
  } catch { return 'light' }
}

export const applyTheme = (theme) => {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export const setTheme = (theme) => {
  try { localStorage.setItem(KEY, theme) } catch {}
  applyTheme(theme)
}

export const toggleTheme = () => {
  const next = getTheme() === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}
