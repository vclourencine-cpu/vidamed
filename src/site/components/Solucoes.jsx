import { Receipt, Wallet, GraduationCap, BadgePercent, Building2, FileText, Zap } from 'lucide-react'

const SOLUCOES = [
  {
    icon: Receipt,
    titulo: 'Gestão completa de tributos',
    texto: 'Retenção na fonte, emissão de notas, pagamento de impostos e informes de rendimentos.'
  },
  {
    icon: Wallet,
    titulo: 'Pagamento líquido via PIX',
    texto: 'O valor líquido cai diretamente na conta do médico, sem complicações.'
  },
  {
    icon: GraduationCap,
    titulo: 'Clube de Treinamentos VIDAMED',
    texto: 'Acesso exclusivo a cronograma anual de treinamentos presenciais em Urgência, Emergência e UTI.',
    destaque: true
  },
  {
    icon: BadgePercent,
    titulo: 'Descontos em cursos oficiais',
    texto: 'ACLS, ATLS, AMLS e PALS com condições especiais para associados.'
  },
  {
    icon: Building2,
    titulo: 'Comunicação com instituições',
    texto: 'Interface direta e eficiente com setores financeiro, administrativo e jurídico.'
  },
  {
    icon: FileText,
    titulo: 'Cadastro e acompanhamento',
    texto: 'Cadastro em unidades de saúde e acompanhamento de recebíveis sem burocracia.'
  },
  {
    icon: Zap,
    titulo: 'Antecipação de recebíveis',
    texto: 'Sempre que necessário, antecipamos seus recebíveis com transparência total.'
  }
]

export default function Solucoes() {
  return (
    <section id="solucoes" className="bg-white py-20">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Nossas soluções
          </span>
          <h2 className="section-title mt-3">
            Tudo o que o médico precisa para focar na medicina.
          </h2>
          <p className="section-subtitle">
            Um portfólio completo para tirar a carga administrativa, financeira e estratégica
            das costas do médico — com clareza, ética e proximidade.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUCOES.map((s, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card ${
                s.destaque
                  ? 'bg-gradient-to-br from-brand to-brand-dark text-white'
                  : 'bg-white ring-1 ring-slate-100'
              }`}
            >
              {s.destaque && (
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
              )}
              <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${
                s.destaque ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
              }`}>
                <s.icon size={24} />
              </div>
              <h3 className={`relative mt-4 font-display text-lg font-bold ${
                s.destaque ? 'text-white' : 'text-brand'
              }`}>
                {s.titulo}
              </h3>
              <p className={`relative mt-2 text-sm ${
                s.destaque ? 'text-white/85' : 'text-slate-600'
              }`}>
                {s.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
