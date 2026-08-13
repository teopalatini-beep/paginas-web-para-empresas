import { motion } from 'framer-motion'
import { useLang } from '../i18n'

export default function Resenas() {
  const { t } = useLang()
  const reviews = t.resenas.reviews
  return (
    <section className="relative py-24 sm:py-32 bg-[#050505] border-t border-white/5">
      <div className="section-inner">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7 }}
          className="block text-center text-[0.7rem] text-[#e8a34a] uppercase font-light mb-5"
          style={{ letterSpacing: '0.35em' }}
        >
          {t.resenas.eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-center font-garamond text-white text-4xl sm:text-5xl font-normal mb-16 sm:mb-20"
          style={{ lineHeight: 1.06, textWrap: 'balance' as 'balance', letterSpacing: '-0.01em' }}
        >
          {t.resenas.title}
        </motion.h2>

        <ul className="grid md:grid-cols-3 gap-10 md:gap-14">
          {reviews.map((r, i) => (
            <motion.li
              key={r.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative"
            >
              <span
                className="font-garamond text-[#e8a34a]/40 text-6xl absolute -top-6 -left-2 select-none"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="font-garamond text-white/85 text-xl sm:text-[1.35rem] font-normal leading-snug mb-8 relative">
                {r.quote}
              </blockquote>
              <footer className="pt-5 border-t border-white/10">
                <div className="text-white/85 text-sm font-normal">{r.author}</div>
                <div
                  className="text-white/40 text-[0.68rem] uppercase font-light mt-1"
                  style={{ letterSpacing: '0.22em' }}
                >
                  {r.context}
                </div>
              </footer>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
