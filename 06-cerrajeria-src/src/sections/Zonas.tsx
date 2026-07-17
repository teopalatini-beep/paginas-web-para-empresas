import { motion } from 'framer-motion'

const zonas = [
  'Palermo',
  'Villa Crespo',
  'Colegiales',
  'Chacarita',
  'Belgrano',
  'Almagro',
  'Caballito',
  'Recoleta',
  'Núñez',
  'Villa Urquiza',
  'Paternal',
  'Y más…',
]

export default function Zonas() {
  return (
    <section id="zonas" className="relative py-24 sm:py-32 bg-[#0a0a0a] noise border-t border-white/5">
      <div className="section-inner text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7 }}
          className="block text-[0.7rem] text-[#e8a34a] uppercase font-light mb-5"
          style={{ letterSpacing: '0.35em' }}
        >
          Cobertura
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-garamond text-white text-4xl sm:text-5xl md:text-6xl font-normal mb-16"
          style={{ lineHeight: 1.06, textWrap: 'balance' as 'balance', letterSpacing: '-0.01em' }}
        >
          Estamos cerca tuyo.
        </motion.h2>

        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4 max-w-3xl mx-auto">
          {zonas.map((z, i) => (
            <motion.li
              key={z}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
              className="font-garamond text-white/80 text-2xl sm:text-3xl font-normal hover:text-[#e8a34a] transition-colors duration-300"
              style={{ letterSpacing: '-0.005em' }}
            >
              <a href="tel:+5491100000000">{z}</a>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-white/50 font-light text-sm max-w-md mx-auto"
        >
          ¿Tu barrio no está en la lista? Preguntanos igual — cubrimos toda CABA.
        </motion.p>
      </div>
    </section>
  )
}
