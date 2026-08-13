import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'es' | 'en'

interface Dict {
  skipLink: string
  title: string
  nav: {
    links: { href: string; label: string }[]
    openMenu: string
    closeMenu: string
  }
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    body1: string
    body2: string
    cta: string
    scroll: string
  }
  servicios: {
    eyebrow: string
    title: string
    items: { title: string; body: string }[]
  }
  confianza: {
    eyebrow: string
    titlePre: string
    titleEm: string
    titlePost: string
    bodyStrong: string
    bodyRest: string
    workWith: string
    pillars: { title: string; body: string }[]
  }
  zonas: {
    eyebrow: string
    title: string
    more: string
    note: string
  }
  resenas: {
    eyebrow: string
    title: string
    reviews: { quote: string; author: string; context: string }[]
  }
  faq: {
    eyebrow: string
    title: string
    items: { q: string; a: string }[]
  }
  contacto: {
    eyebrow: string
    title: string
    body: string
    cta: string
    rows: { label: string; value: string }[]
  }
  footer: {
    body: string
    copyright: string
  }
  floating: {
    whatsapp: string
    call: string
  }
}

const dict: Record<Lang, Dict> = {
  es: {
    skipLink: 'Saltar al contenido',
    title: 'Llave Maestra — Cerrajería 24 hs en Palermo',
    nav: {
      links: [
        { href: '#servicios', label: 'Servicios' },
        { href: '#confianza', label: 'Confianza' },
        { href: '#zonas', label: 'Zonas' },
        { href: '#contacto', label: 'Contacto' },
      ],
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      eyebrow: 'Palermo · 24 hs · Desde 2010',
      titleLine1: 'CUANDO NADIE',
      titleLine2: 'ATIENDE, LLEGAMOS',
      body1: 'Cerrajería 24 horas en Palermo y alrededores.',
      body2: 'Aperturas sin romper, precio cerrado antes de empezar.',
      cta: 'Llamar 24 hs',
      scroll: 'Explorá',
    },
    servicios: {
      eyebrow: 'Lo que hacemos',
      title: 'Oficio de cerrajería, resuelto en el día.',
      items: [
        {
          title: 'Apertura de puertas',
          body: 'Te quedaste afuera o se trabó la cerradura. Abrimos sin romper, en la enorme mayoría de los casos.',
        },
        {
          title: 'Cambio de cerraduras',
          body: 'Colocación y cambio de todas las marcas. Ideal al mudarte o después de un intento de robo.',
        },
        {
          title: 'Copias de llaves',
          body: 'Llaves comunes, de seguridad y codificadas. Al momento, con garantía de funcionamiento.',
        },
        {
          title: 'Alta seguridad',
          body: 'Asesoramiento y colocación de cerraduras y sistemas antirrobo. Protegé lo que importa.',
        },
        {
          title: 'Llaves de auto',
          body: 'Codificado y copia de llaves con chip. Perdiste la del auto — la resolvemos.',
        },
        {
          title: 'Rejas y portones',
          body: 'Arreglo y colocación de rejas, portones, trabas y cerrojos. Trabajos a medida.',
        },
      ],
    },
    confianza: {
      eyebrow: 'Por qué elegirnos',
      titlePre: 'Cerrajería seria, ',
      titleEm: 'sin sorpresas',
      titlePost: '.',
      bodyStrong: 'Más de 15 años',
      bodyRest:
        ' resolviendo emergencias en el barrio, con matrícula habilitante y transparencia en cada trabajo. Te decimos el precio antes de empezar y no arrancamos hasta que estés de acuerdo.',
      workWith: 'Trabajamos con',
      pillars: [
        { title: 'Precio cerrado', body: 'Lo sabés antes de que toquemos nada. No hay sorpresas al final del trabajo.' },
        { title: 'Presupuesto sin cargo', body: 'Consultás sin compromiso por WhatsApp o teléfono. Presupuestamos, después decidís.' },
        { title: 'Llegamos rápido', body: '20–40 minutos promedio en Palermo y zonas linderas. Trabajamos 24 hs los 365 días.' },
        { title: 'Trabajo con garantía', body: 'Matrícula habilitante y quince años de oficio en el barrio. Técnicos con experiencia real.' },
      ],
    },
    zonas: {
      eyebrow: 'Cobertura',
      title: 'Estamos cerca tuyo.',
      more: 'Y más…',
      note: '¿Tu barrio no está en la lista? Preguntanos igual — cubrimos toda CABA.',
    },
    resenas: {
      eyebrow: 'Nos recomiendan',
      title: 'Historias reales, del barrio.',
      reviews: [
        {
          quote: 'Se me cerró la puerta con el bebé adentro. Llamé llorando y en 20 minutos lo tenían resuelto, sin romper nada.',
          author: 'Carla M.',
          context: 'Palermo · Apertura urgente',
        },
        {
          quote: 'Me mudé y cambié las dos cerraduras. Me pasaron el precio por WhatsApp antes de venir y fue exactamente eso.',
          author: 'Diego F.',
          context: 'Colegiales · Cambio de cerraduras',
        },
        {
          quote: 'Perdí la única llave del auto un domingo. La copiaron con el chip ahí mismo y salió bastante menos que en la concesionaria.',
          author: 'Sofía R.',
          context: 'Villa Crespo · Llave codificada',
        },
      ],
    },
    faq: {
      eyebrow: 'Antes de llamar',
      title: 'Preguntas frecuentes.',
      items: [
        {
          q: '¿Rompen la puerta o la cerradura para abrir?',
          a: 'No. En la enorme mayoría de los casos abrimos sin dañar nada, con herramienta profesional. Si la cerradura ya viene forzada o rota, te lo avisamos antes de tocar nada.',
        },
        {
          q: '¿Atienden de noche y los fines de semana?',
          a: 'Sí, trabajamos las 24 horas los 365 días. En horario nocturno o feriado puede haber un adicional, que siempre te informamos antes de salir hacia tu casa.',
        },
        {
          q: '¿Cuánto tardan en llegar?',
          a: 'Entre 20 y 40 minutos según la zona y el momento del día. Al llamar te damos un tiempo estimado real, sin vueltas.',
        },
        {
          q: '¿Me dicen el precio antes de empezar?',
          a: 'Siempre. Te pasamos el precio cerrado por teléfono o WhatsApp y no arrancamos hasta que estés de acuerdo. Sin sorpresas al final del trabajo.',
        },
        {
          q: '¿Qué medios de pago aceptan?',
          a: 'Efectivo, débito, crédito, transferencia y Mercado Pago. Emitimos comprobante del trabajo realizado.',
        },
      ],
    },
    contacto: {
      eyebrow: 'Contacto',
      title: 'Contanos qué te pasó.',
      body: 'Estamos las 24 horas, todos los días. Escribinos por WhatsApp o llamanos ahora — te pasamos el precio antes de ir.',
      cta: 'Pedir cerrajero por WhatsApp',
      rows: [
        { label: 'Teléfono · Urgencias', value: '11 0000-0000' },
        { label: 'WhatsApp', value: 'Respondemos al toque' },
        { label: 'Zona', value: 'Palermo y alrededores · CABA' },
        { label: 'Horario', value: '24 hs · Los 365 días' },
      ],
    },
    footer: {
      body: 'Cerrajería 24 horas en Palermo y alrededores. Aperturas, cerraduras, llaves y alta seguridad.',
      copyright: '© 2026 Llave Maestra Cerrajería',
    },
    floating: {
      whatsapp: 'Contactar por WhatsApp',
      call: 'Llamar al cerrajero 24 hs',
    },
  },
  en: {
    skipLink: 'Skip to content',
    title: 'Llave Maestra — 24hr Locksmith in Palermo',
    nav: {
      links: [
        { href: '#servicios', label: 'Services' },
        { href: '#confianza', label: 'Why us' },
        { href: '#zonas', label: 'Areas' },
        { href: '#contacto', label: 'Contact' },
      ],
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      eyebrow: 'Palermo · 24/7 · Since 2010',
      titleLine1: 'WHEN NO ONE',
      titleLine2: 'ANSWERS, WE SHOW UP',
      body1: '24-hour locksmith in Palermo and surrounding areas.',
      body2: 'Lockouts solved without breaking anything, fixed price before we start.',
      cta: 'Call 24/7',
      scroll: 'Explore',
    },
    servicios: {
      eyebrow: 'What we do',
      title: 'Locksmith craft, solved the same day.',
      items: [
        {
          title: 'Door lockouts',
          body: "Locked out or a jammed lock. We open it without breaking anything, in the vast majority of cases.",
        },
        {
          title: 'Lock changes',
          body: 'Installation and replacement of every brand. Ideal after moving in or a break-in attempt.',
        },
        {
          title: 'Key copies',
          body: 'Standard, security and chip keys. Made on the spot, with a working guarantee.',
        },
        {
          title: 'High security',
          body: 'Advice and installation of locks and anti-theft systems. Protect what matters.',
        },
        {
          title: 'Car keys',
          body: 'Chip key coding and copying. Lost your car key — we sort it out.',
        },
        {
          title: 'Gates & grilles',
          body: 'Repair and installation of grilles, gates, latches and bolts. Custom work.',
        },
      ],
    },
    confianza: {
      eyebrow: 'Why choose us',
      titlePre: 'Serious locksmith work, ',
      titleEm: 'no surprises',
      titlePost: '.',
      bodyStrong: 'Over 15 years',
      bodyRest:
        " solving emergencies in the neighborhood, with a valid license and transparency in every job. We tell you the price before we start and don't begin until you agree.",
      workWith: 'We work with',
      pillars: [
        { title: 'Fixed price', body: "You know it before we touch anything. No surprises at the end of the job." },
        { title: 'Free quote', body: 'Ask with no commitment via WhatsApp or phone. We quote, then you decide.' },
        { title: 'We arrive fast', body: '20–40 minutes on average in Palermo and nearby areas. We work 24/7, 365 days a year.' },
        { title: 'Guaranteed work', body: 'Valid license and fifteen years of craft in the neighborhood. Technicians with real experience.' },
      ],
    },
    zonas: {
      eyebrow: 'Coverage',
      title: "We're close to you.",
      more: 'And more…',
      note: "Your neighborhood isn't on the list? Ask us anyway — we cover all of CABA.",
    },
    resenas: {
      eyebrow: 'They recommend us',
      title: 'Real stories, from the neighborhood.',
      reviews: [
        {
          quote: "The door locked with my baby inside. I called crying and in 20 minutes it was solved, without breaking anything.",
          author: 'Carla M.',
          context: 'Palermo · Emergency lockout',
        },
        {
          quote: 'I moved and changed both locks. They sent me the price on WhatsApp before coming and it was exactly that.',
          author: 'Diego F.',
          context: 'Colegiales · Lock change',
        },
        {
          quote: 'I lost my only car key on a Sunday. They copied it with the chip right there, for a lot less than the dealership.',
          author: 'Sofía R.',
          context: 'Villa Crespo · Chip key',
        },
      ],
    },
    faq: {
      eyebrow: 'Before you call',
      title: 'Frequently asked questions.',
      items: [
        {
          q: 'Do you break the door or lock to get in?',
          a: "No. In the vast majority of cases we open it without damaging anything, using professional tools. If the lock is already forced or broken, we tell you before touching anything.",
        },
        {
          q: 'Do you work nights and weekends?',
          a: "Yes, we work 24 hours, 365 days a year. There may be a surcharge at night or on holidays, which we always tell you before heading to your place.",
        },
        {
          q: 'How long until you arrive?',
          a: 'Between 20 and 40 minutes depending on the area and time of day. When you call, we give you a real estimate, no runaround.',
        },
        {
          q: 'Do you tell me the price before starting?',
          a: "Always. We give you the fixed price by phone or WhatsApp and don't start until you agree. No surprises at the end of the job.",
        },
        {
          q: 'What payment methods do you accept?',
          a: 'Cash, debit, credit, bank transfer and Mercado Pago. We issue a receipt for the work done.',
        },
      ],
    },
    contacto: {
      eyebrow: 'Contact',
      title: 'Tell us what happened.',
      body: "We're here 24 hours, every day. Message us on WhatsApp or call now — we give you the price before heading over.",
      cta: 'Request a locksmith on WhatsApp',
      rows: [
        { label: 'Phone · Emergencies', value: '11 0000-0000' },
        { label: 'WhatsApp', value: 'We reply right away' },
        { label: 'Area', value: 'Palermo and surrounding areas · CABA' },
        { label: 'Hours', value: '24/7 · 365 days a year' },
      ],
    },
    footer: {
      body: '24-hour locksmith in Palermo and surrounding areas. Lockouts, locks, keys and high security.',
      copyright: '© 2026 Llave Maestra Locksmith',
    },
    floating: {
      whatsapp: 'Contact via WhatsApp',
      call: 'Call the 24hr locksmith',
    },
  },
}

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Dict
}

const LangContext = createContext<LangContextValue | null>(null)

const LANG_KEY = 'llave_lang'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'es'
    } catch {
      return 'es'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = dict[lang].title
  }, [lang])

  function setLang(l: Lang) {
    setLangState(l)
    try {
      localStorage.setItem(LANG_KEY, l)
    } catch {
      /* ignore */
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
