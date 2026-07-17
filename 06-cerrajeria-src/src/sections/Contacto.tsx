import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react'

const rows = [
  {
    icon: Phone,
    label: 'Teléfono · Urgencias',
    value: '11 0000-0000',
    href: 'tel:+5491100000000',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Respondemos al toque',
    href: 'https://wa.me/5491100000000?text=Hola!%20Necesito%20un%20cerrajero',
  },
  {
    icon: MapPin,
    label: 'Zona',
    value: 'Palermo y alrededores · CABA',
    href: null,
  },
  {
    icon: Clock,
    label: 'Horario',
    value: '24 hs · Los 365 días',
    href: null,
  },
]

export default function Contacto() {
  return (
    <section id="contacto" className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/5">
      <div className="section-inner grid md:grid-cols-2 gap-16 md:gap-20 items-start">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7 }}
            className="block text-[0.7rem] text-[#e8a34a] uppercase font-light mb-5"
            style={{ letterSpacing: '0.35em' }}
          >
            Contacto
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-garamond text-white text-4xl sm:text-5xl md:text-6xl font-normal mb-8"
            style={{ lineHeight: 1.06, textWrap: 'balance' as 'balance', letterSpacing: '-0.01em' }}
          >
            Contanos qué te pasó.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            className="text-white/70 font-light leading-relaxed max-w-md mb-10"
          >
            Estamos las 24 horas, todos los días. Escribinos por WhatsApp o llamanos ahora —
            te pasamos el precio antes de ir.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/5491100000000?text=Hola!%20Necesito%20un%20cerrajero%20urgente"
            target="_blank"
            rel="noopener"
            className="liquid-glass rounded-full inline-flex items-center gap-3 px-8 py-4 text-white/90 uppercase text-[0.72rem] font-light"
            style={{ letterSpacing: '0.2em' }}
          >
            <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
            Pedir cerrajero por WhatsApp
          </motion.a>
        </div>

        <ul className="border-t border-white/10">
          {rows.map((r, i) => {
            const Icon = r.icon
            const Wrapper: 'a' | 'div' = r.href ? 'a' : 'div'
            const wrapperProps = r.href
              ? { href: r.href, target: r.href.startsWith('http') ? '_blank' : undefined, rel: 'noopener' }
              : {}
            return (
              <motion.li
                key={r.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                className="border-b border-white/10 group"
              >
                <Wrapper
                  {...wrapperProps}
                  className={`flex items-center gap-5 py-6 sm:py-7 transition-all duration-300 ${
                    r.href ? 'hover:pl-3 cursor-pointer' : ''
                  }`}
                >
                  <Icon
                    size={22}
                    strokeWidth={1.2}
                    className="text-[#e8a34a] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-white/45 text-[0.66rem] uppercase font-light mb-1"
                      style={{ letterSpacing: '0.22em' }}
                    >
                      {r.label}
                    </div>
                    <div className="font-garamond text-white text-xl sm:text-2xl font-normal">
                      {r.value}
                    </div>
                  </div>
                </Wrapper>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
