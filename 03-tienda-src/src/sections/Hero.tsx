import { motion } from 'motion/react'
import Nav from '../components/Nav'
import Marquee from '../components/Marquee'
import StaggeredWords from '../components/StaggeredWords'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex flex-col overflow-hidden"
      style={{ background: '#FF0000' }}
    >
      <Nav overRed />

      <div className="absolute top-16 left-0 right-0 z-30 border-y border-white/15 py-2 bg-black/10">
        <Marquee
          items={[
            'Atelier Editorial · Palermo Soho',
            'Piezas editadas, no producidas',
            'Cita presencial · Producción a medida',
            'Cortes hechos en Buenos Aires',
            'Colección Otoño · Series limitadas',
          ]}
          className="text-white"
        />
      </div>

      <div className="flex-1 flex flex-col items-center w-full pt-[140px] sm:pt-[180px] md:pt-[220px]">
        <div className="flex flex-col items-center w-full px-6 sm:px-8 text-center relative z-20 max-w-[900px] mx-auto">
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z"
              fill="white"
            />
          </motion.svg>

          <StaggeredWords
            as="p"
            text="Cortamos, unimos y editamos las piezas que se merecen tener nombre. Todo hecho en Buenos Aires, en series cortas, sin producción industrial."
            className="text-white text-[15px] sm:text-[16px] max-w-[440px] leading-[1.7] mb-[40px] uppercase mx-auto font-manrope"
            wordDelay={0.045}
            delayOffset={0.35}
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="font-marck text-white text-[96px] sm:text-[120px] md:text-[140px] leading-none mb-[32px]"
            style={{ letterSpacing: '-0.02em' }}
            aria-label="URBN. — firma del atelier"
          >
            urbn.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="text-white leading-[1.7] mb-[80px] md:mb-24 w-full flex flex-col items-center font-light font-manrope"
          >
            <p className="mb-[24px] text-[15px] sm:text-[16px] w-[420px] max-w-full text-center">
              Cansados De Comprar Ropa Que Se Rompe En Dos Lavados, Nos Sentamos A Cortar Nosotros Mismos. Cada Prenda Sale Del Taller Con Un Número De Serie Grabado Adentro.
            </p>
            <p className="text-[15px] sm:text-[16px] w-[420px] max-w-full text-center">
              Un Buzo No Debería Ser Un Objeto Desechable. Nuestras Series Son Cortas, Los Materiales Son Reales, Y Cada Prenda Está Pensada Para Durar Diez Inviernos.
            </p>
          </motion.div>
        </div>

        <div className="relative w-full shrink-0 mt-auto">
          <div
            className="absolute top-0 left-0 w-full h-[120px] z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #FF0000 0%, rgba(255,0,0,0) 100%)' }}
            aria-hidden="true"
          />

          <div className="relative w-full aspect-[16/6] sm:aspect-[16/5] bg-[#FF0000] flex items-end justify-center overflow-hidden">
            <svg
              viewBox="0 0 1600 500"
              preserveAspectRatio="xMidYEnd meet"
              className="hero-signature-draw w-full h-full block"
              style={{ ['--path-length' as never]: '4600' }}
              aria-label="Firma URBN dibujándose"
            >
              <path
                d="M180 400
                   C 220 280, 260 250, 300 260
                   C 340 270, 360 350, 380 400
                   C 400 340, 430 280, 470 270
                   C 510 260, 530 340, 540 400
                   C 555 320, 590 260, 630 260
                   C 670 260, 690 320, 700 400

                   M 780 400
                   C 820 300, 860 250, 900 260
                   C 940 270, 950 340, 940 400
                   C 940 340, 970 280, 1020 270
                   C 1070 260, 1090 320, 1080 400

                   M 1180 400
                   C 1210 300, 1250 260, 1300 270
                   C 1350 280, 1360 340, 1340 400

                   M 1420 400
                   L 1420 260
                   Q 1420 250, 1435 250
                   L 1440 250

                   M 1465 402
                   a 6 6 0 1 0 0.1 0"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
