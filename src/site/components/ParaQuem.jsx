import { Activity, GraduationCap, ClipboardX, TrendingUp } from 'lucide-react'

const PERFIS = [
  {
    icon: Activity,
    titulo: 'Atuam em plantões, emergências e UTIs',
    texto: 'Médicos que rodam por hospitais, consultórios e unidades de saúde e precisam de organização.'
  },
  {
    icon: GraduationCap,
    titulo: 'Estão iniciando a carreira',
    texto: 'Recém-formados que buscam mentoria, orientação e direcionamento para vagas.'
  },
  {
    icon: ClipboardX,
    titulo: 'Desejam menos burocracia',
    texto: 'Profissionais que querem previsibilidade financeira e fim das pendências administrativas.'
  },
  {
    icon: TrendingUp,
    titulo: 'Buscam evolução profissional',
    texto: 'Quem quer segurança, organização e crescimento contínuo na medicina.'
  }
]

export default function ParaQuem() {
  return (
    <section className="bg-neutral-bg py-20">
      <div className="container-x">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Para quem a Vidamed existe
          </span>
          <h2 className="section-title mt-3">
            Para médicos que querem viver a medicina com leveza e visão de futuro.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PERFIS.map((p, i) => (
            <div key={i} className="group rounded-2xl bg-white p-6 shadow-soft ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white transition group-hover:bg-accent">
                <p.icon size={24} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-brand">{p.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
