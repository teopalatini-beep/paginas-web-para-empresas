import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Coleccion from './sections/Coleccion'
import Atelier from './sections/Atelier'
import Cita from './sections/Cita'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#0A0A0A]">
      <a href="#manifiesto" className="skip-link">Saltar al contenido</a>
      <Hero />
      <main>
        <Manifesto />
        <Coleccion />
        <Atelier />
        <Cita />
      </main>
      <Footer />
    </div>
  )
}
