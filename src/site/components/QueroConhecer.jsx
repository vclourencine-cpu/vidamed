import { useState } from 'react'
import { Send, CheckCircle2, User, Phone, Mail, Stethoscope, Sparkles } from 'lucide-react'

export default function QueroConhecer() {
  const [form, setForm] = useState({
    nome: '', crm: '', email: '', telefone: '',
    situacao: 'atuante', origem: ''
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviando(true)
    // Mockup — apenas simula o envio (em produção: POST para o backend, cria lead na pipeline)
    setTimeout(() => {
      setEnviando(false)
      setEnviado(true)
    }, 900)
  }

  return (
    <section id="quero-conhecer" className="relative overflow-hidden py-20 bg-gradient-to-br from-brand-50 via-white to-accent/5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full" style={{ background: 'rgba(0,158,61,.12)', filter: 'blur(80px)' }} />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full" style={{ background: 'rgba(0,55,104,.08)', filter: 'blur(80px)' }} />
      </div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Lado texto */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              <Sparkles size={12} />
              Conheça a Vidamed
            </span>
            <h2 className="mt-4 section-title">
              Quer descobrir como simplificar sua vida médica?
            </h2>
            <p className="section-subtitle">
              Preencha o formulário e nossa equipe de relacionamento entra em contato em até <strong>24h úteis</strong> para uma conversa <strong>sem compromisso</strong>.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                Conversa rápida e direta (15 min no WhatsApp)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                Diagnóstico do seu caso — gratuito
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                Apresentação do plano que faz sentido para você
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-accent" />
                Sem pressão. Você decide no seu tempo.
              </li>
            </ul>
          </div>

          {/* Lado formulário */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card ring-1 ring-slate-200">
            {enviado ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-brand">Recebemos sua mensagem!</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Nossa equipe entrará em contato em até 24h úteis pelo telefone ou e-mail que você cadastrou.
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  Quer falar agora? <a href="https://wa.me/5582981908945" target="_blank" rel="noopener" className="font-bold text-accent hover:underline">WhatsApp direto →</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-brand">Conte um pouco sobre você</h3>

                <Field label="Nome completo" icon={User} required>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={update('nome')}
                    required
                    placeholder="Dr. Lucas Andrade"
                    className="input"
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="CRM (opcional)" icon={Stethoscope}>
                    <input
                      type="text"
                      value={form.crm}
                      onChange={update('crm')}
                      placeholder="12345/AL"
                      className="input"
                    />
                  </Field>
                  <Field label="WhatsApp" icon={Phone} required>
                    <input
                      type="tel"
                      value={form.telefone}
                      onChange={update('telefone')}
                      required
                      placeholder="(82) 99999-9999"
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="E-mail" icon={Mail} required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    required
                    placeholder="email@dominio.com"
                    className="input"
                  />
                </Field>

                <Field label="Você atua hoje?" required>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { v: 'atuante', l: 'Sim, já atuo' },
                      { v: 'recem', l: 'Recém-formado' }
                    ].map(opt => (
                      <button
                        key={opt.v}
                        type="button"
                        onClick={() => setForm({ ...form, situacao: opt.v })}
                        className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                          form.situacao === opt.v
                            ? 'border-brand bg-brand text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand'
                        }`}
                      >
                        {opt.l}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Como nos conheceu? (opcional)">
                  <select value={form.origem} onChange={update('origem')} className="input">
                    <option value="">Selecione...</option>
                    <option value="indicacao">Indicação de um colega</option>
                    <option value="instagram">Instagram</option>
                    <option value="google">Google</option>
                    <option value="evento">Evento médico</option>
                    <option value="outro">Outro</option>
                  </select>
                </Field>

                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full btn-accent disabled:opacity-50"
                >
                  {enviando ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Quero conhecer a Vidamed
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-500">
                  Seus dados são tratados conforme a LGPD e usados apenas para contato.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Estilo input compartilhado */}
      <style>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: white;
          padding: 10px 14px;
          font-size: 14px;
        }
        .input:focus { outline: none; border-color: #003768; box-shadow: 0 0 0 3px rgba(0,55,104,.1); }
      `}</style>
    </section>
  )
}

function Field({ label, icon: Icon, required, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
        {Icon && <Icon size={12} />}
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  )
}
