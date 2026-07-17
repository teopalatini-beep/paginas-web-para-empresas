import { motion } from 'framer-motion'
import { KeyRound, Lock, Copy, ShieldCheck, Car, DoorClosed } from 'lucide-react'

const services = [
  {
    icon: KeyRound,
    title: 'Apertura de puertas',
    body: 'Te quedaste afuera o se trabó la cerradura. Abrimos sin romper, en la enorme mayoría de los casos.',
    featured: true,
  },
  {
    icon: Lock,
    title: 'Cambio de cerraduras',
    body: 'Colocación y cambio de todas las marcas. Ideal al mudarte o después de un intento de robo.',
    featured: false,
  },
  {
    icon: Copy,
    title: 'Copias de llaves',
    body: 'Llaves comunes, de seguridad y codificadas. Al momento, con garantía de funcionamiento.',
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: 'Alta seguridad',
    body: 'Asesoramiento y colocación de cerraduras y sistemas antirrobo. Protegé lo que importa.',
    featured: true,
  },
  {
    icon: Car,
    title: 'Llaves de auto',
    body: 'Codificado y copia de llaves con chip. Perdiste la del auto — la resolvemos.',
    featured: false,
  },
  {
    icon: DoorClosed,
    title: 'Rejas y portones',
    body: 'Arreglo y colocación de rejas, portones, trabas y cerrojos. Trabajos a medida.',
    featured: false,
  },
]

export default function Servicios() {
  return (
    <section id="servicios" className="relative bg-[#0a0a0a] noise py-24 sm:py-32 border-t border-white/5">
      <div className="section-inner">
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="block text-[0.7rem] text-[#e8a34a] uppercase font-light mb-5"
            style={{ letterSpacing: '0.35em' }}
          >
            Lo que hacemos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-garamond text-white text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight"
            style={{ lineHeight: 1.05, textWrap: 'balance' as 'balance' }}
          >
            Oficio de cerrajería, resuelto en el día.
          </motion.h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-6 gap-px bg-white/5">
          {services.map((s, i) => {
            const Icon = s.icon
            const span = s.featured ? 'md:col-span-3' : 'md:col-span-2'
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                className={`${span} group relative bg-[#0a0a0a] p-8 sm:p-10 transition-colors duration-500 hover:bg-[#0f0e0c]`}
              >
                <Icon
                  size={s.featured ? 30 : 24}
                  strokeWidth={1.2}
                  className="text-[#e8a34a] mb-8 transition-transform duration-500 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <h3
                  className={`font-garamond text-white font-normal mb-3 ${
                    s.featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {s.title}
                </h3>
                <p className="text-white/60 font-light leading-relaxed max-w-md text-[0.94rem]">
                  {s.body}
                </p>
                <span
                  className="absolute inset-x-8 bottom-0 h-px ember-underline opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
