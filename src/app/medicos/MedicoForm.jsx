import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, User, MapPin, Briefcase, CreditCard, FileUp,
  CheckCircle2, X, Save, FileCheck, AlertCircle
} from 'lucide-react'
import { getMedico } from '../../data/medicos'
import { toTitleCase } from '../../lib/storage'

const DOCS = [
  { key: 'rg_cnh', label: 'RG ou CNH', aceito: 'PDF, JPG, PNG (máx. 5MB)' },
  { key: 'comprovante_residencia', label: 'Comprovante de Residência', aceito: 'PDF (máx. 5MB)' },
  { key: 'diploma', label: 'Diploma de Medicina', aceito: 'PDF (máx. 10MB)' },
  { key: 'crm', label: 'CRM', aceito: 'PDF, JPG, PNG (máx. 5MB)' }
]

export default function MedicoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const medicoExistente = id ? getMedico(id) : null
  const isEdicao = !!medicoExistente

  const [form, setForm] = useState(() => ({
    nome: medicoExistente?.nome || '',
    cpf: medicoExistente?.cpf || '',
    rg: medicoExistente?.rg || '',
    nascimento: medicoExistente?.nascimento || '',
    telefone: medicoExistente?.telefone || '',
    email: medicoExistente?.email || '',
    crm: medicoExistente?.crm || '',
    especialidade: medicoExistente?.especialidade || '',
    cep: medicoExistente?.cep || '',
    endereco: medicoExistente?.endereco || '',
    modalidade: medicoExistente?.modalidade || 'CPF',
    chavePix: medicoExistente?.chavePix || ''
  }))

  const [docs, setDocs] = useState(() => {
    if (medicoExistente?.documentos) {
      return Object.fromEntries(DOCS.map(d => [
        d.key,
        medicoExistente.documentos[d.key] ? { nome: `${d.label.toLowerCase().replace(/\s/g, '_')}.pdf`, tamanho: 1.2 } : null
      ]))
    }
    return Object.fromEntries(DOCS.map(d => [d.key, null]))
  })

  const [salvando, setSalvando] = useState(false)
  const [salvo, setSalvo] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const onUpload = (key, file) => {
    if (!file) return
    setDocs({ ...docs, [key]: { nome: file.name, tamanho: file.size / 1024 / 1024 } })
  }

  const removeDoc = (key) => setDocs({ ...docs, [key]: null })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSalvando(true)
    setTimeout(() => {
      setSalvando(false)
      setSalvo(true)
      setTimeout(() => navigate(isEdicao ? `/app/medicos/${id}` : '/app/medicos'), 1500)
    }, 800)
  }

  const docsCount = Object.values(docs).filter(Boolean).length
  const progresso = Math.round((docsCount / DOCS.length) * 100)

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link to="/app/medicos" className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand">
            <ArrowLeft size={12} /> Voltar à lista
          </Link>
          <h1 className="mt-2 font-display text-3xl font-bold text-brand">
            {isEdicao ? 'Editar médico' : 'Novo médico'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {isEdicao
              ? `Atualizando o cadastro de ${toTitleCase(medicoExistente.nome)}`
              : 'Preencha os dados do médico para cadastrá-lo na Vidamed'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados pessoais */}
        <Section icon={User} titulo="Dados pessoais">
          <Grid>
            <Field label="Nome completo" required>
              <Input value={form.nome} onChange={update('nome')} required placeholder="Nome completo do médico" />
            </Field>
            <Field label="CPF" required>
              <Input value={form.cpf} onChange={update('cpf')} required placeholder="000.000.000-00" />
            </Field>
            <Field label="RG">
              <Input value={form.rg} onChange={update('rg')} placeholder="0.000.000 SSP/UF" />
            </Field>
            <Field label="Data de nascimento" required>
              <Input type="date" value={form.nascimento} onChange={update('nascimento')} required />
            </Field>
            <Field label="Telefone" required>
              <Input value={form.telefone} onChange={update('telefone')} required placeholder="(00) 0 0000-0000" />
            </Field>
            <Field label="E-mail" required>
              <Input type="email" value={form.email} onChange={update('email')} required placeholder="email@dominio.com" />
            </Field>
          </Grid>
        </Section>

        {/* Profissionais */}
        <Section icon={Briefcase} titulo="Dados profissionais">
          <Grid>
            <Field label="CRM" required>
              <Input value={form.crm} onChange={update('crm')} required placeholder="00000/AL" />
            </Field>
            <Field label="Especialidade">
              <Input value={form.especialidade} onChange={update('especialidade')} placeholder="Ex.: Clínica Médica, UTI, Plantonista..." />
            </Field>
          </Grid>
        </Section>

        {/* Endereço */}
        <Section icon={MapPin} titulo="Endereço">
          <Grid>
            <Field label="CEP" required>
              <Input value={form.cep} onChange={update('cep')} required placeholder="00000-000" />
            </Field>
            <Field label="Endereço completo" required full>
              <Input value={form.endereco} onChange={update('endereco')} required placeholder="Rua, número, bairro, cidade/UF" />
            </Field>
          </Grid>
        </Section>

        {/* Financeiro */}
        <Section icon={CreditCard} titulo="Dados financeiros (PIX)">
          <Grid>
            <Field label="Modalidade da chave" required>
              <select
                value={form.modalidade}
                onChange={update('modalidade')}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="CPF">CPF</option>
                <option value="Celular">Celular</option>
                <option value="E-mail">E-mail</option>
                <option value="Aleatória">Aleatória</option>
              </select>
            </Field>
            <Field label="Chave PIX" required>
              <Input value={form.chavePix} onChange={update('chavePix')} required placeholder="Valor da chave PIX" />
            </Field>
          </Grid>
        </Section>

        {/* Documentos */}
        <Section icon={FileUp} titulo="Documentos">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-brand-50 p-3 text-sm">
            <div className="flex-1">
              <p className="font-semibold text-brand">Progresso dos documentos</p>
              <p className="text-xs text-slate-600">
                {docsCount} de {DOCS.length} documentos anexados
              </p>
            </div>
            <div className="font-display text-2xl font-bold text-brand">{progresso}%</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {DOCS.map(d => (
              <DocUploader
                key={d.key}
                label={d.label}
                aceito={d.aceito}
                value={docs[d.key]}
                onUpload={(file) => onUpload(d.key, file)}
                onRemove={() => removeDoc(d.key)}
              />
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              <strong>Mockup:</strong> os arquivos são exibidos como anexados, mas não são realmente persistidos.
              Na versão final, o upload irá para um storage seguro com criptografia.
            </span>
          </div>
        </Section>

        {/* Ações */}
        <div className="sticky bottom-0 -mx-4 flex items-center justify-end gap-3 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <Link
            to={isEdicao ? `/app/medicos/${id}` : '/app/medicos'}
            className="btn-ghost text-sm"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={salvando || salvo}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {salvo ? (
              <>
                <CheckCircle2 size={16} />
                Salvo com sucesso
              </>
            ) : salvando ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Salvando...
              </>
            ) : (
              <>
                <Save size={16} />
                {isEdicao ? 'Salvar alterações' : 'Cadastrar médico'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

function Section({ icon: Icon, titulo, children }) {
  return (
    <div className="card">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <Icon size={18} />
        </div>
        <h2 className="font-display text-lg font-bold text-brand">{titulo}</h2>
      </div>
      {children}
    </div>
  )
}

function Grid({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}

function Field({ label, required, full, children }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
    />
  )
}

function DocUploader({ label, aceito, value, onUpload, onRemove }) {
  const inputId = `doc-${label.replace(/\s/g, '-')}`
  return (
    <div className={`rounded-xl border-2 border-dashed p-4 transition ${
      value ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200 bg-slate-50/50 hover:border-brand/30 hover:bg-brand-50/30'
    }`}>
      {value ? (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <FileCheck size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500">{label}</p>
            <p className="truncate text-sm font-semibold text-slate-800">{value.nome}</p>
            <p className="text-xs text-slate-500">{value.tamanho.toFixed(2)} MB · Anexado</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full p-1.5 text-slate-400 hover:bg-red-100 hover:text-red-600"
            aria-label="Remover documento"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label htmlFor={inputId} className="flex cursor-pointer items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-brand ring-1 ring-slate-200">
            <FileUp size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-700">{label}</p>
            <p className="text-xs text-slate-500">{aceito}</p>
            <p className="mt-0.5 text-xs font-semibold text-brand">Clique para escolher arquivo</p>
          </div>
          <input
            id={inputId}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => onUpload(e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  )
}
