import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { getTheme, toggleTheme } from '../lib/theme'

// Botão sol/lua para alternar tema. Persiste no localStorage.
export default function ThemeToggle({ tema = 'claro' }) {
  const [dark, setDark] = useState(false)

  useEffect(() => { setDark(getTheme() === 'dark') }, [])

  const onToggle = () => setDark(toggleTheme() === 'dark')

  const escuro = tema === 'escuro'
  return (
    <button
      onClick={onToggle}
      title={dark ? 'Modo claro' : 'Modo escuro'}
      aria-label="Alternar tema"
      className={`rounded-full p-2 transition ${
        escuro
          ? 'text-white/80 hover:bg-white/10'
          : 'text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'
      }`}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
