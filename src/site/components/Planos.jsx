import { Check, ArrowRight } from 'lucide-react'

const PLANOS = [
  {
    nome: 'Médicos em atuação',
    badge: 'Mais procurado',
    badgeColor: 'accent',
    precoTaxa: '17%',
    precoTaxaLabel: 'sobre faturamento bruto',
    precoFixo: 'R$ 120',
    precoFixoLabel: 'taxa administrativa mensal',
    beneficios: [
      'Contabilidade médica completa',
      'Emissão de notas fiscais',
      'Pagamento de impostos',
      'Informes de rendimentos',
      'Apoio no Imposto de Renda',
      'Treinamentos médicos (Emergência e UTI)',
      'Parceria com Assessoria Financeira',
      'Parceria com Assessoria de Investimentos'
    ],
    destaque: true
  },
  {
    nome: 'Recém-formados',
    badge: 'Ainda não atuando',
    badgeColor: 'brand',
    precoTaxa: 'R$ 120',
    precoTaxaLabel: 'taxa administrativa mensal',
    precoFixo: null,
    beneficios: [
      'Mentoria de carreira médica',
      'Indicação e direcionamento para vagas',
      'Apoio no início da atuação profissional',
      'Estruturação segura para entrada no mercado',
      'Acesso ao Clube de Treinamentos',
      'Suporte da equipe Vidamed'
    ]
  }
]

export default function Planos() {
  return (
    <section id="planos" className="bg-neutral-bg py-20">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Modelo de contratação
          </span>
          <h2 className="section-title mt-3">
            Transparência total. Sem letras miúdas.
          </h2>
          <p className="section-subtitle">
            Você escolhe o plano que combina com o momento da sua carreira.
            Sem fidelidade enganosa, sem custos escondidos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PLANOS.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-3xl p-8 shadow-card ${
                p.destaque
                  ? 'bg-gradient-to-br from-brand to-brand-dark text-white ring-2 ring-accent'
                  : 'bg-white ring-1 ring-slate-200'
              }`}
            >
              {p.destaque && (
                <>
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
                  <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-light/30 blur-3xl" />
                </>
              )}

              <div className={`relative inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                p.destaque ? 'bg-accent text-white' : 'bg-brand-50 text-brand'
              }`}>
                {p.badge}
              </div>

              <h3 className={`relative mt-4 font-display text-2xl font-bold ${
                p.destaque ? 'text-white' : 'text-brand'
              }`}>
                {p.nome}
              </h3>

              <div className="relative mt-6 flex flex-wrap items-end gap-x-6 gap-y-2">
                <div>
                  <div className={`font-display text-5xl font-extrabold ${
                    p.destaque ? 'text-white' : 'text-brand'
                  }`}>
                    {p.precoTaxa}
                  </div>
                  <div className={`text-xs ${p.destaque ? 'text-white/70' : 'text-slate-500'}`}>
                    {p.precoTaxaLabel}
                  </div>
                </div>
                {p.precoFixo && (
                  <>
                    <div className={`mb-3 text-xl font-bold ${p.destaque ? 'text-white/60' : 'text-slate-300'}`}>+</div>
                    <div>
                      <div className={`font-display text-3xl font-extrabold ${
                        p.destaque ? 'text-accent-light' : 'text-accent'
                      }`}>
                        {p.precoFixo}
                      </div>
                      <div className={`text-xs ${p.destaque ? 'text-white/70' : 'text-slate-500'}`}>
                        {p.precoFixoLabel}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <ul className="relative mt-8 space-y-3">
                {p.beneficios.map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`mt-0.5 flex-shrink-0 ${p.destaque ? 'text-accent-light' : 'text-accent'}`}
                    />
                    <span className={`text-sm ${p.destaque ? 'text-white/90' : 'text-slate-700'}`}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/5582981908945?text=Olá!%20Tenho%20interesse%20no%20plano%20${encodeURIComponent(p.nome)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition ${
                  p.destaque
                    ? 'bg-accent text-white hover:bg-accent-light'
                    : 'border border-brand bg-white text-brand hover:bg-brand hover:text-white'
                }`}
              >
                Quero ser médico Vidamed
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
