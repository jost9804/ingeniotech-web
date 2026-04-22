import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'
import { BUSINESS, WHATSAPP_URL } from '../../config'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/logo.jpg"
                alt={BUSINESS.name}
                className="h-8 w-auto"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span className="font-bold text-white">{BUSINESS.name}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {BUSINESS.tagline} — tu aliado tecnológico en Moniquirá.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/servicios', label: 'Servicios' },
                { to: '/contacto', label: 'Contacto' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-brand text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin size={15} className="text-brand mt-0.5 shrink-0" />
                {BUSINESS.address}
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <Clock size={15} className="text-brand mt-0.5 shrink-0" />
                <span>
                  {BUSINESS.hours.weekdays}<br />
                  {BUSINESS.hours.saturday}
                </span>
              </li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-brand hover:text-brand-light font-medium transition-colors"
            >
              Escribir por WhatsApp →
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
