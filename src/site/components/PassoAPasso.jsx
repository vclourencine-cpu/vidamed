import { MessageCircle, User, FileCheck, CreditCard } from 'lucide-react'

const PASSOS = [
  {
    num: '01',
    icon: MessageCircle,
    titulo: 'Contato com o Relacionamento',
    texto: 'Entre em contato com a equipe Vidamed via WhatsApp ou e-mail.'
  },
  {
    num: '02',
    icon: User,
    titulo: 'Envio das informações',
    texto: 'Nome, CPF, RG, data de nascimento, e-mail, CRM, endereço + CEP, PIX e telefone.'
  },
  {
    num: '03',
    icon: FileCheck,
    titulo: 'Envio dos documentos',
    texto: 'CRM, Diploma e Comprovante de Residência.'
  },
  {
    num: '04',
    icon: CreditCard,
    titulo: 'Pagamento da taxa administrativa',
    texto: 'Taxa mensal de R$ 120,00 — e pronto, você está associado.'
  }
]

export default function PassoAPasso() {
  return (
    <section id="associar" className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-dark py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-brand-light/30 blur-3xl" />
      </div>

      <div className="container-x relative">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
            Como se associar
          </span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl mt-3">
            Em 4 passos simples você está dentro da Vidamed.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PASSOS.map((p, i) => (
            <div key={i} className="relative">
              {i < PASSOS.length - 1 && (
                <div className="absolute left-full top-8 hidden h-px w-full bg-gradient-to-r from-white/30 to-transparent lg:block" />
              )}
              <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
                    <p.icon size={22} />
                  </div>
                  <span className="font-display text-3xl font-extrabold text-white/30">{p.num}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{p.titulo}</h3>
                <p className="mt-2 text-sm text-white/75">{p.texto}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://wa.me/5582981908945?text=Olá!%20Quero%20iniciar%20meu%20cadastro%20na%20Vidamed"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent text-base"
          >
            <MessageCircle size={20} />
            Começar agora pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
