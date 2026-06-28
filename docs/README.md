# Freelance Portfolio – Sitios Demo

3 sitios web demo listos para mostrar como portfolio en Fiverr y a clientes locales.

---

## Estructura

```
freelance-portfolio/
├── 01-restaurante/        ← La Parrilla del Centro
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── 02-profesional/        ← Dra. Valentina Torres (Psicóloga)
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── 03-tienda/             ← URBN Store (Ropa)
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── INTEGRACIONES.md       ← Guía paso a paso para conectar MercadoPago, Brevo, Calendly, etc.
├── FIVERR.md              ← Template de perfil + gig + estrategia para primeras ventas
└── README.md              ← Este archivo
```

---

## Cómo abrir los demos

Cada sitio es HTML puro — abrilo directo en el navegador:
1. Doble click en `01-restaurante/index.html`
2. Se abre en el browser y funciona al 100% localmente

Para verlos online (demos públicos):
- Arrastrar la carpeta a **https://netlify.com** (gratis, sin cuenta requerida para drops temporales)
- O crear cuenta y deployar para tener un link permanente

---

## Qué incluye cada demo

### 01 – Restaurante (`La Parrilla del Centro`)
- Navbar con scroll effect
- Hero con foto de fondo
- Sección "Nosotros"
- Menú con tabs por categoría
- Galería de imágenes
- Formulario de reservas (listo para Formspree)
- Google Maps embed
- Footer completo
- Botón WhatsApp flotante

### 02 – Profesional (`Dra. Valentina Torres`)
- Navbar
- Hero con foto + tarjetas flotantes animadas
- Sección de servicios con pricing
- Sobre mí + credenciales
- Testimonios
- **Embed de Calendly** (listo, solo poner username)
- Formulario de contacto (listo para Formspree/Brevo)
- Footer

### 03 – Tienda (`URBN Store`)
- Barra de anuncio
- Navbar con buscador + carrito
- Hero oscuro con call to action
- Sección "Nuevos ingresos"
- Banner promocional
- Catálogo filtrable por categoría (12 productos)
- **Carrito lateral funcional** (agrega/elimina productos, calcula total)
- Detección de envío gratis
- **Botón de MercadoPago** (listo para conectar)
- Newsletter (listo para Brevo)
- Horarios + contacto
- Footer con medios de pago

---

## Activar las integraciones

Ver `INTEGRACIONES.md` para pasos detallados de:
- Formspree (formularios → email)
- MercadoPago (pagos Argentina)
- Brevo (email marketing + newsletter)
- Calendly (turnos online)
- Stripe (pagos internacionales)
- Netlify (hosting gratuito)

---

## Para usar con un cliente real

1. Duplicar la carpeta del demo correspondiente
2. Cambiar: nombre del negocio, colores (variables CSS al principio del .css), textos, precios
3. Reemplazar emojis por fotos reales del negocio
4. Activar las integraciones con las cuentas del cliente
5. Deployar en Netlify con el dominio del cliente
