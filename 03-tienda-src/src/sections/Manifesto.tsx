import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <section
      id="manifiesto"
      ref={ref}
      className="relative bg-[#F4F1EB] text-[#0A0A0A] py-32 sm:py-40 px-6 sm:px-10"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="block font-manrope text-[0.7rem] uppercase font-medium mb-10 text-[#0A0A0A]/60"
          style={{ letterSpacing: '0.35em' }}
        >
          Manifiesto — 2026
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-italiana text-[2.4rem] sm:text-[3.4rem] md:text-[4.6rem] leading-[1.05] text-[#0A0A0A]"
          style={{ letterSpacing: '-0.01em', textWrap: 'balance' as 'balance' }}
        >
          Editamos ropa,
          <br />
          no la <em className="text-[#FF0000] not-italic italic">producimos</em>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-manrope text-[1rem] sm:text-[1.1rem] leading-[1.7] max-w-[540px] mx-auto mt-10 text-[#0A0A0A]/72 font-light"
        >
          Cada colección son cinco piezas máximo. Trabajamos con tres talleres del sur de la ciudad, cortamos los moldes con nosotros al lado, y cerramos la producción cuando el número es el correcto — no cuando se agota el stock del proveedor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-x-14 gap-y-6 font-manrope text-[0.72rem] uppercase font-medium text-[#0A0A0A]/50"
          style={{ letterSpacing: '0.28em' }}
        >
          <span>Palermo Soho</span>
          <span aria-hidden="true">·</span>
          <span>Series de 5–12 piezas</span>
          <span aria-hidden="true">·</span>
          <span>Nº Serie grabado</span>
          <span aria-hidden="true">·</span>
          <span>Producción a medida</span>
        </motion.div>
      </div>
    </section>
  )
}
