import { Link } from 'react-router-dom'
import { Wrench, Monitor, Camera, ShieldCheck, Zap, Star, HeadphonesIcon, ShoppingBag } from 'lucide-react'
import { WHATSAPP_URL } from '../config'

const services = [
  {
    icon: Wrench,
    title: 'Servicio Técnico',
    description: 'Diagnóstico y reparación de computadores y celulares. Rápido, confiable y con garantía.',
  },
  {
    icon: Monitor,
    title: 'Venta de Equipos',
    description: 'Computadores, celulares y accesorios con asesoría personalizada para que elijas bien.',
  },
  {
    icon: Camera,
    title: 'Cámaras de Seguridad',
    description: 'Instalación de sistemas de vigilancia para tu hogar o negocio. Monitoreo en tiempo real.',
  },
]

const whyUs = [
  {
    icon: ShieldCheck,
    title: 'Garantía en todo',
    description: 'Respaldamos cada reparación y producto que sale de nuestras manos.',
  },
  {
    icon: Zap,
    title: 'Diagnóstico rápido',
    description: 'En la mayoría de casos tendrás respuesta el mismo día que traes tu equipo.',
  },
  {
    icon: Star,
    title: 'Experiencia comprobada',
    description: 'Técnicos con amplia trayectoria en Moniquirá y la región de Boyacá.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Atención personalizada',
    description: 'Te explicamos qué le pasa a tu equipo y qué vamos a hacer, sin tecnicismos.',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center bg-surface-dark overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <span className="inline-block text-brand text-sm font-semibold tracking-widest uppercase mb-4">
              Moniquirá, Boyacá
            </span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
              Soluciones tech que{' '}
              <span className="text-brand">funcionan</span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-10">
              Servicio técnico, venta de equipos e instalación de cámaras de seguridad.
              Reparamos lo que otros no pueden.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/productos"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm sm:text-base"
              >
                <ShoppingBag size={18} />
                Explora nuestros productos
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-700 hover:border-brand text-slate-300 hover:text-brand font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm sm:text-base"
              >
                Contáctanos por WhatsApp
              </a>
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 border border-slate-700 hover:border-brand text-slate-300 hover:text-brand font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm sm:text-base"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Nuestros servicios
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Todo lo que necesitas para que tu tecnología funcione al 100%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-surface rounded-2xl p-8 border border-slate-800 hover:border-brand/40 transition-colors group"
              >
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand/20 transition-colors">
                  <Icon size={24} className="text-brand" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/servicios"
              className="text-brand hover:text-brand-light text-sm font-medium transition-colors"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Por qué elegir Ingeniotech?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center px-4">
                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={26} className="text-brand" />
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand/20 to-surface rounded-3xl border border-brand/20 p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Tu equipo está fallando?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
              Escríbenos ahora y te damos una respuesta rápida.
              Sin rodeos, sin esperas innecesarias.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
