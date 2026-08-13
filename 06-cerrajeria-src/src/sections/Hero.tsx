import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import StaggeredFade from '../components/StaggeredFade'
import Nav from '../components/Nav'
import { useLang } from '../i18n'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4'

export default function Hero() {
  const { t } = useLang()
  return (
    <header id="top" className="relative h-screen w-full overflow-hidden bg-[#010101]">
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'brightness(0.42) saturate(0.72) contrast(1.05)' }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(1,1,1,0.15) 0%, rgba(1,1,1,0.55) 55%, rgba(1,1,1,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, rgba(1,1,1,0), #010101 92%)' }}
      />

      <div className="relative z-20">
        <Nav />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 pt-12 sm:pt-16 md:pt-24">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-6 sm:mb-8 text-[0.68rem] sm:text-[0.72rem] text-[#e8a34a] uppercase font-light"
          style={{ letterSpacing: '0.4em' }}
        >
          {t.hero.eyebrow}
        </motion.span>

        <h1
          className="w-full font-garamond text-white font-normal mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] text-center"
          style={{ lineHeight: 1.06, letterSpacing: '-0.02em' }}
        >
          <StaggeredFade text={t.hero.titleLine1} as="div" className="block" delayOffset={0.35} />
          <StaggeredFade text={t.hero.titleLine2} as="div" className="block" delayOffset={0.75} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-sm sm:text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-xs sm:max-w-md mb-8 sm:mb-10"
        >
          {t.hero.body1}
          <br className="hidden sm:inline" /> {t.hero.body2}
        </motion.p>

        <motion.a
          href="tel:+5491100000000"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: [0.2, 0.7, 0.2, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="liquid-glass rounded-full inline-flex items-center gap-3 px-7 sm:px-10 py-3.5 sm:py-4 text-white/90 uppercase text-[0.72rem] sm:text-[0.78rem] font-light"
          style={{ letterSpacing: '0.2em' }}
        >
          <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
          {t.hero.cta}
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span
            className="text-[0.62rem] text-white/40 uppercase font-light"
            style={{ letterSpacing: '0.35em' }}
          >
            {t.hero.scroll}
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </header>
  )
}
