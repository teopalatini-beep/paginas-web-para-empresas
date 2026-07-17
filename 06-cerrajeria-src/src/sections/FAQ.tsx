import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: '¿Rompen la puerta o la cerradura para abrir?',
    a: 'No. En la enorme mayoría de los casos abrimos sin dañar nada, con herramienta profesional. Si la cerradura ya viene forzada o rota, te lo avisamos antes de tocar nada.',
  },
  {
    q: '¿Atienden de noche y los fines de semana?',
    a: 'Sí, trabajamos las 24 horas los 365 días. En horario nocturno o feriado puede haber un adicional, que siempre te informamos antes de salir hacia tu casa.',
  },
  {
    q: '¿Cuánto tardan en llegar?',
    a: 'Entre 20 y 40 minutos según la zona y el momento del día. Al llamar te damos un tiempo estimado real, sin vueltas.',
  },
  {
    q: '¿Me dicen el precio antes de empezar?',
    a: 'Siempre. Te pasamos el precio cerrado por teléfono o WhatsApp y no arrancamos hasta que estés de acuerdo. Sin sorpresas al final del trabajo.',
  },
  {
    q: '¿Qué medios de pago aceptan?',
    a: 'Efectivo, débito, crédito, transferencia y Mercado Pago. Emitimos comprobante del trabajo realizado.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/5">
      <div className="section-inner max-w-4xl">
        <div className="mb-16 sm:mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7 }}
            className="block text-[0.7rem] text-[#e8a34a] uppercase font-light mb-5"
            style={{ letterSpacing: '0.35em' }}
          >
            Antes de llamar
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-garamond text-white text-4xl sm:text-5xl font-normal"
            style={{ lineHeight: 1.06, textWrap: 'balance' as 'balance', letterSpacing: '-0.01em' }}
          >
            Preguntas frecuentes.
          </motion.h2>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <button
                  type="button"
                  className="w-full flex items-start justify-between gap-6 py-6 sm:py-7 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span
                    className="font-garamond text-white text-xl sm:text-2xl font-normal pr-4"
                    style={{ letterSpacing: '-0.005em' }}
                  >
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                    className="flex-shrink-0 text-[#e8a34a] mt-1"
                    aria-hidden="true"
                  >
                    <Plus size={22} strokeWidth={1.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/65 font-light leading-relaxed pb-7 max-w-3xl">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
