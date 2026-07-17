export default function Footer() {
  return (
    <footer className="relative bg-[#010101] border-t border-white/10 py-12 sm:py-16">
      <div className="section-inner flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="max-w-sm">
          <div
            className="font-garamond text-white text-xl font-light uppercase mb-3"
            style={{ letterSpacing: '0.3em' }}
          >
            Llave Maestra
          </div>
          <p className="text-white/50 font-light text-sm leading-relaxed">
            Cerrajería 24 horas en Palermo y alrededores. Aperturas, cerraduras, llaves y alta
            seguridad.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-3">
          <a
            href="tel:+5491100000000"
            className="font-garamond text-white text-3xl sm:text-4xl font-normal hover:text-[#e8a34a] transition-colors duration-300"
          >
            11 0000-0000
          </a>
          <span
            className="text-white/40 text-[0.66rem] uppercase font-light"
            style={{ letterSpacing: '0.28em' }}
          >
            © 2026 Llave Maestra Cerrajería
          </span>
        </div>
      </div>
    </footer>
  )
}
