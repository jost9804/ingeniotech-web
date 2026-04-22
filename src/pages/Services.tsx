import { Wrench, Monitor, Camera, CheckCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../config'

const services = [
  {
    icon: Wrench,
    title: 'Servicio Técnico',
    description:
      'Diagnosticamos y reparamos computadores y celulares de todas las marcas. Trabajamos con garantía y te mantenemos informado del proceso.',
    items: [
      'Diagnóstico de computadores y laptops',
      'Reparación de celulares (pantallas, batería, software)',
      'Formateo e instalación de sistemas operativos',
      'Limpieza interna y mantenimiento preventivo',
      'Recuperación de datos',
      'Instalación de programas y antivirus',
    ],
  },
  {
    icon: Monitor,
    title: 'Venta de Equipos',
    description:
      'Vendemos computadores, celulares y accesorios con asesoría incluida. Te ayudamos a elegir el equipo que se ajusta a tu presupuesto y necesidades.',
    items: [
      'Computadores de escritorio y laptops',
      'Celulares nuevos y usados revisados',
      'Accesorios: cables, cargadores, audífonos',
      'Memorias RAM, discos duros y SSDs',
      'Impresoras y periféricos',
      'Garantía en todos los productos',
    ],
  },
  {
    icon: Camera,
    title: 'Instalación de Cámaras',
    description:
      'Diseñamos e instalamos sistemas de videovigilancia para hogares y negocios. Monitorea en tiempo real desde tu celular.',
    items: [
      'Cámaras IP para interiores y exteriores',
      'Instalación y configuración completa',
      'Acceso remoto desde smartphone',
      'Grabación continua o por movimiento',
      'Asesoría para elegir el sistema ideal',
      'Soporte post-instalación',
    ],
  },
]

export default function Services() {
  return (
    <>
      {/* Page header */}
      <section className="bg-surface-dark py-16 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase mb-3 block">
            Lo que hacemos
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Nuestros servicios
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Soluciones tecnológicas completas para personas y negocios en Moniquirá y la región.
          </p>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {services.map(({ icon: Icon, title, description, items }) => (
            <div
              key={title}
              className="bg-surface rounded-2xl border border-slate-800 p-8 sm:p-10 hover:border-brand/30 transition-colors"
            >
              <div className="flex items-start gap-6 flex-col sm:flex-row">
                <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Icon size={28} className="text-brand" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                        <CheckCircle size={15} className="text-brand shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            ¿Tienes una consulta sobre algún servicio?
          </h2>
          <p className="text-slate-400 mb-7">
            Escríbenos y te respondemos sin compromiso.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
