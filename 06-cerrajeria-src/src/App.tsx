import Hero from './sections/Hero'
import Servicios from './sections/Servicios'
import Confianza from './sections/Confianza'
import Zonas from './sections/Zonas'
import Resenas from './sections/Resenas'
import FAQ from './sections/FAQ'
import Contacto from './sections/Contacto'
import Footer from './sections/Footer'
import FloatingActions from './components/FloatingActions'
import { useLang } from './i18n'

export default function App() {
  const { t } = useLang()
  return (
    <div className="min-h-screen bg-[#010101] text-white">
      <a href="#servicios" className="skip-link">{t.skipLink}</a>
      <Hero />
      <main>
        <Servicios />
        <Confianza />
        <Zonas />
        <Resenas />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
