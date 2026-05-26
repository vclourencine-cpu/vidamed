import { MapPin, Phone, Mail, Instagram, Globe } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer id="contato" className="bg-brand-900 text-white">
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo size={44} variant="light" />
            <p className="mt-4 max-w-md text-sm text-white/70">
              A Vidamed existe para facilitar, proteger e estruturar a vida médica.
              Cuidamos de quem cuida, com visão, inteligência e proximidade.
            </p>
            <p className="mt-6 font-display text-lg italic text-accent-light">
              "Porque a saúde começa com o valor de quem faz a saúde acontecer."
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contato
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-accent-light" />
                <span>Av. Dr. Antônio Gomes de Barros • 1246<br />Jatiúca • Maceió • AL • 57036-001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0 text-accent-light" />
                <a href="tel:+5582981908945" className="hover:text-white">(82) 98190-8945</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0 text-accent-light" />
                <a href="mailto:relacionamentomedico@vidamedgestao.com.br" className="hover:text-white">
                  relacionamentomedico@vidamedgestao.com.br
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Conecte-se
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-center gap-2">
                <Globe size={16} className="flex-shrink-0 text-accent-light" />
                <a
                  href="https://www.vidamedgestao.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  www.vidamedgestao.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={16} className="flex-shrink-0 text-accent-light" />
                <a
                  href="https://instagram.com/vidamed.gestao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  @vidamed.gestao
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/5582981908945"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-light"
            >
              <Phone size={14} />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Vidamed Gestão. Todos os direitos reservados.</p>
          <p className="mt-2 sm:mt-0">Gestão Inteligente para a Medicina do Futuro</p>
        </div>
      </div>

      {/* WhatsApp flutuante */}
      <a
        href="https://wa.me/5582981908945"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-card transition hover:scale-110 hover:bg-accent-light"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C4 14.9 3.7 13.5 3.7 12c0-4.6 3.7-8.3 8.3-8.3 2.2 0 4.3.9 5.9 2.4 1.6 1.6 2.4 3.7 2.4 5.9 0 4.6-3.7 8.3-8.3 8.3z"/>
        </svg>
      </a>
    </footer>
  )
}
