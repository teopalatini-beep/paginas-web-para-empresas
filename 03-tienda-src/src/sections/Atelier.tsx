import { motion } from 'motion/react'

export default function Atelier() {
  return (
    <section
      id="atelier"
      className="relative bg-[#0A0A0A] text-[#F4F1EB] py-24 sm:py-40 px-6 sm:px-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.05fr_0.95fr] gap-14 md:gap-24 items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7 }}
            className="block font-manrope text-[0.7rem] uppercase font-medium mb-6 text-[#F4F1EB]/50"
            style={{ letterSpacing: '0.35em' }}
          >
            Atelier · Palermo Soho
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-italiana text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] leading-[1.05] mb-10"
            style={{ letterSpacing: '-0.01em', textWrap: 'balance' as 'balance' }}
          >
            Un taller pequeño donde cada prenda pasa por dos manos.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-manrope text-[1rem] sm:text-[1.06rem] leading-[1.75] max-w-[52ch] text-[#F4F1EB]/72 font-light mb-8"
          >
            No hacemos moda rápida. Diseñamos cinco piezas por temporada, cortamos los moldes en el taller de Guatemala y Malabia, y unimos con dos costureras que trabajan con nosotros hace diez años. Si te llevás una prenda, sabés dónde nació.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="flex flex-wrap gap-x-10 gap-y-4 font-manrope text-[0.74rem] uppercase font-medium text-[#F4F1EB]/45"
            style={{ letterSpacing: '0.28em' }}
          >
            <span>Est. 2018</span>
            <span>Palermo · CABA</span>
            <span>3 talleres asociados</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="mt-14"
          >
            <div className="font-marck text-[#FF0000] text-5xl sm:text-6xl leading-none">urbn.</div>
            <div
              className="font-manrope text-[0.7rem] uppercase font-medium text-[#F4F1EB]/40 mt-2"
              style={{ letterSpacing: '0.28em' }}
            >
              — Firma del taller
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=80"
            alt="Interior del atelier URBN en Palermo Soho, moldes y máquinas de coser"
            loading="lazy"
            className="w-full h-full object-cover grayscale contrast-[1.05]"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0) 60%, rgba(10,10,10,0.7) 100%)' }}
          />
          <span
            className="absolute bottom-6 left-6 font-manrope text-[0.66rem] uppercase font-medium text-[#F4F1EB]/70"
            style={{ letterSpacing: '0.28em' }}
          >
            Interior · Guatemala 4900
          </span>
        </motion.div>
      </div>
    </section>
  )
}
