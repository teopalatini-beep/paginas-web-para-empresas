import { motion } from 'motion/react'

const pieces = [
  {
    n: 'N.º 01',
    name: 'Buzo Oversize · Lino',
    year: 'S/S 26',
    img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80',
    series: 'Serie de 8',
  },
  {
    n: 'N.º 02',
    name: 'Pantalón Ancho · Wool',
    year: 'F/W 25',
    img: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=1200&q=80',
    series: 'Serie de 5',
  },
  {
    n: 'N.º 03',
    name: 'Camisa Editorial · Popelín',
    year: 'S/S 26',
    img: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=1200&q=80',
    series: 'Serie de 12',
  },
  {
    n: 'N.º 04',
    name: 'Sobre-abrigo Estructurado',
    year: 'F/W 25',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80',
    series: 'Serie de 6',
  },
]

export default function Coleccion() {
  return (
    <section id="coleccion" className="relative bg-[#EDE7DC] text-[#0A0A0A] py-24 sm:py-32 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <span
              className="block font-manrope text-[0.7rem] uppercase font-medium mb-4 text-[#0A0A0A]/60"
              style={{ letterSpacing: '0.35em' }}
            >
              Colección — Otoño 2026
            </span>
            <h2
              className="font-italiana text-[2.2rem] sm:text-[3rem] md:text-[4rem] leading-[1.05]"
              style={{ letterSpacing: '-0.01em' }}
            >
              Piezas con nombre.
            </h2>
          </div>
          <a
            href="#cita"
            className="font-manrope text-[0.7rem] uppercase font-medium text-[#FF0000] hover:text-[#C60000] transition-colors self-start md:self-end"
            style={{ letterSpacing: '0.24em' }}
          >
            Reservar cita →
          </a>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
          {pieces.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0A0A0A]/5 mb-5">
                <motion.img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.05 }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span
                  className="absolute top-4 left-4 font-manrope text-[0.66rem] uppercase font-medium text-white bg-[#0A0A0A]/60 backdrop-blur px-2.5 py-1"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {p.series}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div
                    className="font-manrope text-[0.66rem] uppercase font-medium text-[#0A0A0A]/50 mb-1"
                    style={{ letterSpacing: '0.28em' }}
                  >
                    {p.n} · {p.year}
                  </div>
                  <h3 className="font-italiana text-xl sm:text-2xl leading-tight">{p.name}</h3>
                </div>
                <span className="font-marck text-[#FF0000] text-2xl leading-none group-hover:scale-110 transition-transform duration-500">→</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
