import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const links = [
  { href: '#manifiesto', label: 'Manifiesto' },
  { href: '#coleccion', label: 'Colección' },
  { href: '#atelier', label: 'Atelier' },
  { href: '#cita', label: 'Cita' },
] as const

export default function Nav({ overRed = false }: { overRed?: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const inkColor = overRed ? 'text-white' : 'text-[#0A0A0A]'
  const softColor = overRed ? 'text-white/80 hover:text-white' : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'

  return (
    <>
      <nav
        aria-label="Principal"
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 py-6"
      >
        <a
          href="#top"
          className={`font-italiana ${inkColor} text-lg sm:text-xl tracking-[0.32em] uppercase`}
        >
          URBN<span className="opacity-70">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`font-manrope text-[0.7rem] uppercase font-medium transition-colors duration-300 ${softColor}`}
                style={{ letterSpacing: '0.24em' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`md:hidden ${inkColor} transition-colors`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="urbn-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="urbn-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden rounded-2xl py-8"
            style={{
              background: 'rgba(10,10,10,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <ul className="flex flex-col items-center gap-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.06, ease: 'easeOut' }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-white/90 uppercase font-manrope text-sm hover:text-white transition-colors"
                    style={{ letterSpacing: '0.28em' }}
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
