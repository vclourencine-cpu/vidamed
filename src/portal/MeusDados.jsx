/* MeusDados — portal do médico · campos editáveis + travados com cadeado */
import { useState } from 'react'
import { Lock, Phone, Mail, MapPin, CreditCard, Save, CheckCircle2 } from 'lucide-react'
import { getSession } from '../lib/auth'
import { getMedico } from '../data/medicos'
import { toTitleCase, formatDate } from '../lib/storage'

export default function MeusDados() {
  const session = getSession()
  const medico = getMedico(session?.medicoId || 'm001')

  const [form, setForm] = useState(() => ({
    telefone: medico?.telefone || '',
    email: medico?.email || '',
    cep: medico?.cep || '',
    endereco: medico?.endereco || '',
    modalidade: medico?.modalidade || 'CPF',
    chavePix: medico?.chavePix || ''
  }))
  const [salvando, setSalvando] = useState(false)
  const [salvo, setSalvo] = useState(false)

  const update = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setSalvo(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSalvando(true)
    setTimeout(() => { setSalvando(false); setSalvo(true) }, 700)
  }

  if (!medico) return null

  return (
    <div className="max-w-3xl space-y-6">
      {/* Cabeçalho */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">Cadastro</p>
        <h1 className="font-display text-2xl font-bold text-slate-800 sm:text-3xl">Meus dados</h1>
        <p className="mt-1 text-sm text-slate-500">
          Atualize seus dados de contato e recebimento. Para alterar CPF, CRM ou nome, fale com o relacionamento Vidamed.
        </p>
      </div>

      {/* Card de perfil */}
      <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl font-bold text-xl text-white"
             style={{ background: 'linear-gradient(135deg,#0d9488,#0f766e)' }}>
          {toTitleCase(medico.nome).split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-slate-800">{toTitleCase(medico.nome)}</h2>
          <p className="text-sm text-slate-500">{medico.especialidade} · CRM {medico.crm}</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            ● Parceiro ativo
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* ── DADOS DE IDENTIDADE (travados) ───────────────────────── */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-5 py-3">
            <Lock size={14} className="text-slate-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Dados de identidade</p>
            <span className="ml-auto text-[10px] text-slate-400">Não editáveis</span>
          </div>
          <div className="grid gap-5 p-5 sm:grid-cols-3">
            <CampoTravado label="CPF" valor={medico.cpf} />
            <CampoTravado label="RG" valor={medico.rg} />
            <CampoTravado label="Nascimento" valor={formatDate(medico.nascimento)} />
            <CampoTravado label="CRM" valor={medico.crm} />
            <CampoTravado label="Nome completo" valor={toTitleCase(medico.nome)} fullRow />
            <CampoTravado label="Especialidade" valor={medico.especialidade} />
          </div>
        </div>

        {/* ── CONTATO (editável) ───────────────────────────────────── */}
        <SecaoEditavel titulo="Contato" icon={Phone}>
          <div className="grid gap-4 sm:grid-cols-2">
            <CampoEditavel label="Telefone" type="tel" value={form.telefone} onChange={update('telefone')}
                           placeholder="(82) 99999-9999" icon={Phone} />
            <CampoEditavel label="E-mail" type="email" value={form.email} onChange={update('email')}
                           placeholder="email@dominio.com" icon={Mail} />
          </div>
        </SecaoEditavel>

        {/* ── ENDEREÇO (editável) ──────────────────────────────────── */}
        <SecaoEditavel titulo="Endereço" icon={MapPin}>
          <div className="grid gap-4 sm:grid-cols-3">
            <CampoEditavel label="CEP" type="text" value={form.cep} onChange={update('cep')}
                           placeholder="00000-000" icon={MapPin} />
            <div className="sm:col-span-2">
              <CampoEditavel label="Endereço completo" type="text" value={form.endereco} onChange={update('endereco')}
                             placeholder="Rua, número, bairro, cidade/UF" icon={MapPin} />
            </div>
          </div>
        </SecaoEditavel>

        {/* ── PIX (editável) ───────────────────────────────────────── */}
        <SecaoEditavel titulo="Recebimento (PIX)" icon={CreditCard}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <CreditCard size={10} className="text-teal-600" /> Modalidade da chave
              </label>
              <select value={form.modalidade} onChange={update('modalidade')}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
                {['CPF', 'Celular', 'E-mail', 'Aleatória'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <CampoEditavel label="Chave PIX" type="text" value={form.chavePix} onChange={update('chavePix')}
                           placeholder="Valor da chave" icon={CreditCard} />
          </div>
        </SecaoEditavel>

        {/* Salvar */}
        <div className="flex items-center justify-end gap-3">
          {salvo && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <CheckCircle2 size={16} /> Dados salvos com sucesso
            </span>
          )}
          <button type="submit" disabled={salvando}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition disabled:opacity-60"
                  style={{ background: salvando ? '#64748b' : '#0d9488' }}>
            {salvando ? (
              <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Salvando...</>
            ) : (
              <><Save size={16} /> Salvar alterações</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

function SecaoEditavel({ titulo, icon: Icon, children }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-5 py-3">
        <Icon size={14} className="text-teal-600" />
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{titulo}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function CampoTravado({ label, valor, fullRow }) {
  return (
    <div className={fullRow ? 'sm:col-span-2' : ''}>
      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
        <Lock size={9} /> {label}
      </p>
      <p className="mt-1 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-500 ring-1 ring-slate-100">
        {valor || '—'}
      </p>
    </div>
  )
}

function CampoEditavel({ label, type, value, onChange, placeholder, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        <Icon size={10} className="text-teal-600" /> {label}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
             className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20" />
    </div>
  )
}
