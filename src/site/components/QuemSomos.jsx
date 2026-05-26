import { Stethoscope, Brain, ShieldCheck } from 'lucide-react'

export default function QuemSomos() {
  return (
    <section id="quem-somos" className="bg-white py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Quem somos
          </span>
          <h2 className="section-title mt-3">
            Mais do que cuidar de números, cuidamos da estrutura que sustenta sua vida médica.
          </h2>
          <p className="section-subtitle">
            A Vidamed é uma empresa especializada em gestão administrativa, financeira
            e estratégica para médicos, criada para simplificar a rotina profissional,
            garantir segurança financeira e apoiar decisões conscientes ao longo da carreira.
          </p>
          <p className="mt-4 text-base text-slate-600">
            Acreditamos que o cuidado com a saúde começa com quem faz a saúde acontecer.
            Por isso, atuamos de forma personalizada — <strong className="text-brand">de médico para médico</strong> —
            com foco em resultados sustentáveis, eficiência operacional e suporte real à carreira.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Pilar
            icon={<Stethoscope className="text-accent" size={28} />}
            titulo="Cuidador"
            texto="Empatia para entender as dores do setor e cuidar de quem cuida."
          />
          <Pilar
            icon={<Brain className="text-accent" size={28} />}
            titulo="Sábio"
            texto="Inteligência, dados e análise para orientar decisões conscientes."
            highlight
          />
          <Pilar
            icon={<ShieldCheck className="text-accent" size={28} />}
            titulo="Governante"
            texto="Liderança confiável que conduz com firmeza, ética e clareza."
          />
          <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-6 text-white shadow-soft">
            <p className="font-display text-xl font-bold leading-snug">
              "Cuidamos de quem cuida, com visão, inteligência e proximidade."
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-wider text-accent-light">
              Manifesto Vidamed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pilar({ icon, titulo, texto, highlight }) {
  return (
    <div className={`rounded-2xl p-6 shadow-soft transition hover:shadow-card ${
      highlight ? 'bg-accent/5 ring-1 ring-accent/20' : 'bg-neutral-bg ring-1 ring-slate-100'
    }`}>
      <div className="mb-3">{icon}</div>
      <h3 className="font-display text-lg font-bold text-brand">{titulo}</h3>
      <p className="mt-2 text-sm text-slate-600">{texto}</p>
    </div>
  )
}
