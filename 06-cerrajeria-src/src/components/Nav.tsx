import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n'

export default function Nav() {
  const { lang, setLang, t } = useLang()
  const links = t.nav.links
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav className="relative z-20 flex items-center justify-between md:justify-center gap-6 md:gap-14 px-5 sm:px-8 pt-6 sm:pt-8">
        <a
          href="#top"
          className="font-garamond text-lg sm:text-xl text-white font-light uppercase"
          style={{ letterSpacing: '0.25em' }}
        >
          <span className="hidden sm:inline" style={{ letterSpacing: '0.3em' }}>Llave Maestra</span>
          <span className="sm:hidden">Llave Maestra</span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.72rem] text-white/80 uppercase font-light hover:text-white transition-colors duration-300"
                style={{ letterSpacing: '0.2em' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden text-white/90 hover:text-white transition-colors"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className="absolute top-6 sm:top-8 right-16 sm:right-8 z-30 flex border border-white/20 rounded-full overflow-hidden"
        role="group"
        aria-label="Idioma / Language"
      >
        <button
          type="button"
          onClick={() => setLang('es')}
          className={`px-3 py-1.5 text-[0.68rem] font-light uppercase transition-colors ${
            lang === 'es' ? 'bg-[#e8a34a] text-[#010101]' : 'text-white/70 hover:text-white'
          }`}
          style={{ letterSpacing: '0.08em' }}
          aria-pressed={lang === 'es'}
        >
          ES
        </button>
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-3 py-1.5 text-[0.68rem] font-light uppercase transition-colors ${
            lang === 'en' ? 'bg-[#e8a34a] text-[#010101]' : 'text-white/70 hover:text-white'
          }`}
          style={{ letterSpacing: '0.08em' }}
          aria-pressed={lang === 'en'}
        >
          EN
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed top-16 left-4 right-4 z-50 md:hidden mobile-menu-glass rounded-2xl py-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ul className="flex flex-col items-center gap-5">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.06, ease: 'easeOut' }}
                >
                  <a
                    href={l.href}
                    className="text-white/90 uppercase font-light hover:text-white transition-colors text-sm"
                    style={{ letterSpacing: '0.25em' }}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
