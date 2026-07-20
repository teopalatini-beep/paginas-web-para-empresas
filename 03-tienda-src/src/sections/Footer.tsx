export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] text-[#F4F1EB] py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div>
          <div
            className="font-italiana text-2xl uppercase mb-4"
            style={{ letterSpacing: '0.32em' }}
          >
            URBN<span className="opacity-60">.</span>
          </div>
          <p className="font-manrope text-sm leading-relaxed text-[#F4F1EB]/55 font-light max-w-[340px]">
            Atelier boutique en Palermo Soho. Piezas editadas, no producidas. Serie limitada, hecho a mano, firmado adentro.
          </p>
        </div>

        <div className="text-right md:text-right">
          <div className="font-marck text-[#FF0000] text-4xl leading-none mb-3">urbn.</div>
          <div
            className="font-manrope text-[0.7rem] uppercase font-medium text-[#F4F1EB]/45"
            style={{ letterSpacing: '0.28em' }}
          >
            © 2026 · Buenos Aires
          </div>
        </div>
      </div>
    </footer>
  )
}
