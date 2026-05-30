import { User, Phone, Mail, MapPin, CreditCard, Stethoscope, Calendar, FileCheck, AlertCircle } from 'lucide-react'
import { getSession } from '../lib/auth'
import { getMedico } from '../data/medicos'
import { toTitleCase, formatDate } from '../lib/storage'

export default function MeusDados() {
  const session = getSession()
  const medico = getMedico(session?.medicoId || 'm001')
  if (!medico) return null

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">Cadastro</p>
        <h1 className="font-display text-2xl font-bold text-slate-800 sm:text-3xl">Meus dados</h1>
        <p className="mt-1 text-sm text-slate-500">Seus dados cadastrais na Vidamed. Para alterar, fale com o relacionamento.</p>
      </div>

      {/* Header do médico */}
      <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 font-display text-2xl font-extrabold text-white">
          {medico.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800">{toTitleCase(medico.nome)}</h2>
          <p className="text-sm text-slate-500">{medico.especialidade} · CRM {medico.crm}</p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            ● Parceiro ativo
          </span>
        </div>
      </div>

      {/* Seções de dados */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Secao titulo="Dados pessoais" icon={User}>
          <Campo icon={User} label="CPF" valor={medico.cpf} />
          <Campo icon={FileCheck} label="RG" valor={medico.rg} />
          <Campo icon={Calendar} label="Nascimento" valor={formatDate(medico.nascimento)} />
        </Secao>
        <Secao titulo="Contato" icon={Phone}>
          <Campo icon={Phone} label="Telefone" valor={medico.telefone} />
          <Campo icon={Mail} label="E-mail" valor={medico.email} />
          <Campo icon={MapPin} label="Endereço" valor={medico.endereco} />
        </Secao>
        <Secao titulo="Profissional" icon={Stethoscope}>
          <Campo icon={Stethoscope} label="CRM" valor={medico.crm} />
          <Campo icon={Stethoscope} label="Especialidade" valor={medico.especialidade} />
        </Secao>
        <Secao titulo="Recebimento (PIX)" icon={CreditCard}>
          <Campo icon={CreditCard} label="Modalidade" valor={medico.modalidade} />
          <Campo icon={CreditCard} label="Chave PIX" valor={medico.chavePix} />
        </Secao>
      </div>

      <div className="flex items-start gap-2 rounded-xl bg-slate-100 p-3 text-xs text-slate-600">
        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
        <span>Para atualizar qualquer informação, entre em contato com o relacionamento Vidamed pelo WhatsApp.</span>
      </div>
    </div>
  )
}

function Secao({ titulo, icon: Icon, children }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600"><Icon size={16} /></div>
        <h3 className="font-display font-bold text-slate-800">{titulo}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Campo({ icon: Icon, label, valor }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={14} className="mt-0.5 flex-shrink-0 text-slate-300" />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-sm text-slate-700">{valor}</p>
      </div>
    </div>
  )
}
