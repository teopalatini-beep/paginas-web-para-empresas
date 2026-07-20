import { motion } from 'motion/react'

export default function Cita() {
  return (
    <section
      id="cita"
      className="relative bg-[#FF0000] text-white py-32 sm:py-40 px-6 sm:px-10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7 }}
          className="block font-manrope text-[0.7rem] uppercase font-medium mb-10 text-white/70"
          style={{ letterSpacing: '0.35em' }}
        >
          Cita presencial
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-italiana text-[2.6rem] sm:text-[3.6rem] md:text-[5rem] leading-[1.02] mb-12"
          style={{ letterSpacing: '-0.02em', textWrap: 'balance' as 'balance' }}
        >
          Venís al atelier y elegís tu pieza en persona.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-manrope text-[1rem] sm:text-[1.08rem] leading-[1.75] max-w-[520px] mx-auto mb-14 text-white/85 font-light"
        >
          No vendemos por catálogo online. Las piezas se prueban en el taller, se ajustan a tu cuerpo, y se te entregan con la firma adentro. Si vivís lejos, coordinamos videollamada previa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a
            href="https://wa.me/5491100000000?text=Hola!%20Quiero%20reservar%20una%20cita%20en%20el%20atelier"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 bg-white text-[#0A0A0A] px-9 py-4 font-manrope text-[0.74rem] uppercase font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors duration-500"
            style={{ letterSpacing: '0.22em' }}
          >
            Reservar por WhatsApp
            <span aria-hidden="true">→</span>
          </a>
          <a
            href="mailto:atelier@urbn.studio"
            className="inline-flex items-center gap-3 border border-white/40 text-white px-9 py-4 font-manrope text-[0.74rem] uppercase font-medium hover:bg-white hover:text-[#0A0A0A] transition-colors duration-500"
            style={{ letterSpacing: '0.22em' }}
          >
            Escribir al atelier
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-20 pt-12 border-t border-white/15 flex flex-wrap gap-x-10 gap-y-4 justify-center font-manrope text-[0.7rem] uppercase font-medium text-white/60"
          style={{ letterSpacing: '0.28em' }}
        >
          <span>Guatemala 4900 · Palermo Soho</span>
          <span aria-hidden="true">·</span>
          <span>Cita Lun–Sáb</span>
          <span aria-hidden="true">·</span>
          <span>+54 11 0000-0000</span>
        </motion.div>
      </div>
    </section>
  )
}
