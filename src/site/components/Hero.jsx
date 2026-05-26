import { Link } from 'react-router-dom'
import {
  ArrowRight, MessageCircle, ShieldCheck, TrendingUp, MapPin,
  CheckCircle2, Wallet, Sparkles
} from 'lucide-react'

// Foto profissional do Unsplash — licença livre (médica jovem em jaleco)
const FOTO_HERO = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-20 text-white"
      style={{ backgroundColor: '#003768' }}
    >
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

      <div className="container-x relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-12 lg:py-20">
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
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-brand"
            >
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

        {/* Coluna foto */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            {/* Moldura decorativa atrás */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-accent/30 to-transparent blur-2xl" />
            <div className="absolute -bottom-4 -right-4 hidden h-32 w-32 rounded-3xl bg-accent/30 blur-xl lg:block" />

            {/* Foto principal */}
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10">
              <div className="aspect-[4/5] w-full overflow-hidden bg-brand-dark">
                <img
                  src={FOTO_HERO}
                  alt="Médica VIDAMED em ambiente profissional"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                {/* Overlay sutil com cor da marca */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 via-transparent to-accent/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Card flutuante: PIX caiu */}
            <div className="absolute -left-4 top-8 hidden w-56 rounded-2xl bg-white p-3 shadow-2xl sm:flex">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                  <Wallet size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    PIX recebido
                  </p>
                  <p className="font-display text-base font-bold text-brand">
                    R$ 26.820,00
                  </p>
                  <p className="text-[10px] text-slate-500">há poucos minutos</p>
                </div>
              </div>
            </div>

            {/* Card flutuante: tributos OK */}
            <div className="absolute -right-4 top-1/3 hidden w-52 rounded-2xl bg-white p-3 shadow-2xl sm:flex">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Tributos do mês
                  </p>
                  <p className="font-display text-sm font-bold text-brand">
                    100% pagos
                  </p>
                  <p className="text-[10px] text-emerald-600">
                    <CheckCircle2 size={9} className="-mt-0.5 mr-0.5 inline" />
                    em dia
                  </p>
                </div>
              </div>
            </div>

            {/* Card flutuante: KPI */}
            <div className="absolute -bottom-6 left-6 hidden w-60 rounded-2xl bg-white p-3 shadow-2xl sm:flex">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <TrendingUp size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Faturamento maio
                  </p>
                  <p className="font-display text-base font-bold text-brand">
                    R$ 114.396
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <Sparkles size={9} />
                    +40,3% vs abril
                  </div>
                </div>
              </div>
            </div>
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
