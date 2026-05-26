import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, ShieldCheck, TrendingUp, MapPin } from 'lucide-react'

const GloboBrasil = lazy(() => import('./GloboBrasil'))

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand to-brand-dark pt-20 text-white">
      {/* Brilho de fundo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-brand-light/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container-x relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-8 lg:py-20">
        {/* Coluna texto */}
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Gestão inteligente para a medicina do futuro
          </div>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            De médico para médico.{' '}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Com estratégia e empatia, de verdade.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">
            Organização, segurança e evolução para a vida médica. Cuidamos da estrutura
            que sustenta sua carreira para você focar no que importa: exercer a medicina.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/5581986563840?text=Olá!%20Quero%20me%20associar%20à%20VIDAMED"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              <MessageCircle size={18} />
              Quero me associar
            </a>
            <Link to="/login" className="btn-ghost border-white/30 bg-white/10 !text-white hover:bg-white hover:!text-brand">
              Acessar plataforma
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:max-w-md">
            <Stat icon={<TrendingUp size={20} />} label="Faturamento" value="+previsibilidade" />
            <Stat icon={<ShieldCheck size={20} />} label="Tributos" value="100% gerido" />
            <Stat icon={<MapPin size={20} />} label="Cobertura" value="Brasil todo" />
          </div>
        </div>

        {/* Coluna 3D */}
        <div className="relative h-[380px] sm:h-[460px] lg:h-[560px]">
          <Suspense fallback={<GloboPlaceholder />}>
            <GloboBrasil />
          </Suspense>
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur">
            Médicos VIDAMED conectados em todo o Brasil
          </div>
        </div>
      </div>

      {/* Divisor inferior em onda */}
      <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none">
        <path d="M0,80 L0,32 Q360,80 720,32 T1440,32 L1440,80 Z" fill="white" />
      </svg>
    </section>
  )
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-accent-light">{icon}</div>
      <div className="mt-2 text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  )
}

function GloboPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-48 w-48 animate-pulse rounded-full bg-white/5" />
    </div>
  )
}
