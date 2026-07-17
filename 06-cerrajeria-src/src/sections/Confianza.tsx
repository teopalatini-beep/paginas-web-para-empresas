import { motion } from 'framer-motion'
import { CircleDollarSign, Clock, ShieldCheck, FileText } from 'lucide-react'

const pillars = [
  {
    icon: CircleDollarSign,
    title: 'Precio cerrado',
    body: 'Lo sabés antes de que toquemos nada. No hay sorpresas al final del trabajo.',
  },
  {
    icon: FileText,
    title: 'Presupuesto sin cargo',
    body: 'Consultás sin compromiso por WhatsApp o teléfono. Presupuestamos, después decidís.',
  },
  {
    icon: Clock,
    title: 'Llegamos rápido',
    body: '20–40 minutos promedio en Palermo y zonas linderas. Trabajamos 24 hs los 365 días.',
  },
  {
    icon: ShieldCheck,
    title: 'Trabajo con garantía',
    body: 'Matrícula habilitante y quince años de oficio en el barrio. Técnicos con experiencia real.',
  },
]

const brands = ['Trabex', 'Kallay', 'Prive', 'Acytra', 'Roto']

export default function Confianza() {
  return (
    <section id="confianza" className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/5">
      <div className="section-inner grid md:grid-cols-[0.9fr_1.1fr] gap-16 md:gap-24 items-start">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7 }}
            className="block text-[0.7rem] text-[#e8a34a] uppercase font-light mb-5"
            style={{ letterSpacing: '0.35em' }}
          >
            Por qué elegirnos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-garamond text-white text-4xl sm:text-5xl font-normal mb-8"
            style={{ lineHeight: 1.06, textWrap: 'balance' as 'balance', letterSpacing: '-0.01em' }}
          >
            Cerrajería seria, <em className="text-[#e8a34a] not-italic">sin sorpresas</em>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="text-white/70 font-light leading-relaxed max-w-md mb-10 text-[0.98rem]"
          >
            <strong className="text-white font-normal">Más de 15 años</strong> resolviendo emergencias
            en el barrio, con matrícula habilitante y transparencia en cada trabajo. Te decimos el
            precio antes de empezar y no arrancamos hasta que estés de acuerdo.
          </motion.p>

          <div>
            <span
              className="block text-[0.66rem] text-white/40 uppercase font-light mb-4"
              style={{ letterSpacing: '0.28em' }}
            >
              Trabajamos con
            </span>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {brands.map((b) => (
                <li
                  key={b}
                  className="font-garamond text-white/70 text-xl sm:text-2xl font-normal"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                className="bg-[#050505] p-8 relative"
              >
                <Icon
                  size={22}
                  strokeWidth={1.2}
                  className="text-[#e8a34a] mb-6"
                  aria-hidden="true"
                />
                <h3
                  className="font-garamond text-white text-2xl font-normal mb-2"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {p.title}
                </h3>
                <p className="text-white/55 font-light leading-relaxed text-[0.92rem]">{p.body}</p>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
