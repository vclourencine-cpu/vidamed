import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronsUpDown, Check, ArrowRightLeft } from 'lucide-react'
import { getSession, trocarContexto, temMultiplosPerfis, PERFIL_INFO, rotaInicial } from '../lib/auth'

// Aparece só para quem tem mais de um perfil (ex.: sócio que também é médico).
// Permite alternar o "contexto ativo" e navega para a área correspondente.
export default function SwitcherContexto({ tema = 'claro' }) {
  const session = getSession()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!temMultiplosPerfis(session)) return null

  const ativo = session.perfil
  const trocar = (perfil) => {
    setOpen(false)
    if (perfil === ativo) return
    trocarContexto(perfil)
    navigate(rotaInicial(perfil))
  }

  const escuro = tema === 'escuro'

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
          escuro
            ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
        title="Trocar de contexto"
      >
        <ArrowRightLeft size={13} className={escuro ? 'text-teal-300' : 'text-teal-600'} />
        <span className="hidden sm:inline">{PERFIL_INFO[ativo]?.area}</span>
        <ChevronsUpDown size={13} className="opacity-60" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-card">
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Trocar para</p>
            {session.perfis.map(p => (
              <button
                key={p}
                onClick={() => trocar(p)}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                <span>
                  <span className="font-semibold text-slate-800">{PERFIL_INFO[p]?.area}</span>
                  <span className="block text-[11px] text-slate-500">{PERFIL_INFO[p]?.label}</span>
                </span>
                {p === ativo && <Check size={15} className="text-teal-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
