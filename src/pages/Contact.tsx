import { MapPin, Clock, MessageCircle } from 'lucide-react'
import { BUSINESS, WHATSAPP_URL } from '../config'

export default function Contact() {
  return (
    <>
      {/* Page header */}
      <section className="bg-surface-dark py-16 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-3 block">
            Estamos aquí
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Contacto
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            La forma más rápida de comunicarte con nosotros es por WhatsApp.
            Respondemos en minutos.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* WhatsApp CTA card */}
            <div className="bg-gradient-to-br from-[#25D366]/10 to-surface rounded-2xl border border-[#25D366]/20 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[#25D366]/15 rounded-2xl flex items-center justify-center mb-5">
                <MessageCircle size={32} className="text-[#25D366]" />
              </div>
              <h2 className="text-white font-bold text-xl mb-2">WhatsApp</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                La forma más rápida.<br />
                Te respondemos en minutos.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                Escribir ahora
              </a>
              <p className="text-slate-500 text-xs mt-3">{BUSINESS.phone}</p>
            </div>

            {/* Info card */}
            <div className="bg-surface rounded-2xl border border-slate-800 p-8 space-y-6">
              <h2 className="text-white font-bold text-xl">Información</h2>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-brand" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Ubicación</p>
                  <p className="text-slate-400 text-sm">{BUSINESS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-brand" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Horario de atención</p>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>{BUSINESS.hours.weekdays}</li>
                    <li>{BUSINESS.hours.saturday}</li>
                    <li className="text-slate-600">{BUSINESS.hours.sunday}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-8 bg-surface rounded-2xl border border-slate-800 overflow-hidden">
            <div className="h-64 flex items-center justify-center text-slate-600 text-sm">
              {/* TODO: reemplaza esto con un iframe de Google Maps */}
              <div className="text-center">
                <MapPin size={32} className="text-slate-700 mx-auto mb-2" />
                <p>Moniquirá, Boyacá, Colombia</p>
                <a
                  href="https://maps.google.com/?q=Moniquira,+Boyaca,+Colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-light text-xs mt-2 inline-block transition-colors"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
