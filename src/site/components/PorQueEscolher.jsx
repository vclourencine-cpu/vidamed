import { ShieldCheck, Eye, Globe, Sparkles } from 'lucide-react'

const PILARES = [
  {
    num: '01',
    icon: ShieldCheck,
    titulo: 'Organização e Segurança',
    texto: 'Tudo centralizado, organizado e acompanhado por especialistas.'
  },
  {
    num: '02',
    icon: Eye,
    titulo: 'Visão de Futuro',
    texto: 'Gestão, capacitação e planejamento para uma carreira médica sustentável.'
  },
  {
    num: '03',
    icon: Globe,
    titulo: 'Flexibilidade e Praticidade',
    texto: 'Atue em qualquer unidade de saúde, em qualquer lugar do país.'
  },
  {
    num: '04',
    icon: Sparkles,
    titulo: 'Transparência e Simplicidade',
    texto: '17% sobre o faturamento bruto + taxa administrativa fixa de R$ 120,00.'
  }
]

export default function PorQueEscolher() {
  return (
    <section className="bg-neutral-bg py-20">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Por que escolher a VIDAMED
          </span>
          <h2 className="section-title mt-3">
            Quatro pilares que sustentam a sua tranquilidade.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((p, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="absolute right-4 top-4 font-display text-5xl font-extrabold text-brand-50 transition group-hover:text-accent/15">
                {p.num}
              </div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                <p.icon size={24} />
              </div>
              <h3 className="relative mt-4 font-display text-lg font-bold text-brand">
                {p.titulo}
              </h3>
              <p className="relative mt-2 text-sm text-slate-600">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
