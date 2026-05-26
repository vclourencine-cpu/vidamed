import Header from './components/Header'
import Hero from './components/Hero'
import QuemSomos from './components/QuemSomos'
import ParaQuem from './components/ParaQuem'
import Solucoes from './components/Solucoes'
import Planos from './components/Planos'
import Treinamentos from './components/Treinamentos'
import PorQueEscolher from './components/PorQueEscolher'
import PassoAPasso from './components/PassoAPasso'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <QuemSomos />
        <ParaQuem />
        <Solucoes />
        <Planos />
        <Treinamentos />
        <PorQueEscolher />
        <PassoAPasso />
      </main>
      <Footer />
    </div>
  )
}
