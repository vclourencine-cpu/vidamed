import { AlertCircle, HeartPulse, Activity, BadgePercent } from 'lucide-react'

const TREINAMENTOS = [
  { icon: AlertCircle, titulo: 'Urgência', texto: 'Atendimento rápido em situações críticas' },
  { icon: HeartPulse, titulo: 'Emergência', texto: 'Protocolos de salvamento e estabilização' },
  { icon: Activity, titulo: 'UTI', texto: 'Cuidado intensivo e manejo avançado' }
]

const CURSOS = ['ACLS', 'ATLS', 'AMLS', 'PALS']

export default function Treinamentos() {
  return (
    <section id="treinamentos" className="bg-white py-20">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Clube de Treinamentos VIDAMED
            </span>
            <h2 className="section-title mt-3">
              Cronograma anual exclusivo. Encontros mensais. Médico melhor preparado.
            </h2>
            <p className="section-subtitle">
              Todos os médicos associados têm acesso a um cronograma anual exclusivo de
              treinamentos presenciais, com encontros mensais voltados ao desenvolvimento técnico.
            </p>

            <div className="mt-8 rounded-2xl bg-accent/5 p-6 ring-1 ring-accent/20">
              <div className="flex items-center gap-3">
                <BadgePercent className="text-accent" size={24} />
                <p className="text-sm font-semibold text-brand">
                  Descontos exclusivos em cursos de suporte avançado à vida
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {CURSOS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-brand shadow-soft ring-1 ring-brand-50"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {TREINAMENTOS.map((t, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 rounded-2xl bg-gradient-to-br from-brand-50 to-white p-5 shadow-soft ring-1 ring-brand-50 transition hover:from-brand hover:to-brand-dark hover:text-white"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-accent shadow-soft transition group-hover:bg-accent group-hover:text-white">
                  <t.icon size={26} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand group-hover:text-white">
                    {t.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 group-hover:text-white/80">
                    {t.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
