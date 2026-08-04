# Páginas Web para Empresas

Portfolio de sitios web demo — diseño y desarrollo frontend para restaurantes, comercios y profesionales independientes, listos para vender desde el día uno.

## Qué es

Colección de landing pages y sitios completos construidos como material de portfolio para conseguir clientes freelance (Fiverr, Workana, prospección directa). Cada sitio simula un negocio real de un rubro distinto — restaurante, consultorio, tienda de ropa, ferretería, barbería, cerrajería, iluminación — y está pensado para mostrarse tal cual a un cliente potencial o adaptarse rápido a uno real.

## Para quién

Pequeños comercios, profesionales independientes y pymes que necesitan una web moderna con foco en conversión: reservas, pedidos por WhatsApp y cobros online, sin depender de redes sociales.

## Características

- Diseños a medida por rubro (restaurante, salud/profesional, e-commerce, ferretería, barbería, cerrajería, iluminación), cada uno con identidad visual propia.
- Botón de contacto por WhatsApp con mensaje prearmado.
- Formularios de contacto/reservas listos para conectar con Formspree.
- Integración de pagos (Mercado Pago) y agenda de turnos (Calendly) en los sitios que lo requieren.
- Animaciones e interacciones con scroll (GSAP + ScrollTrigger + Lenis en los sitios HTML/CSS/JS; Framer Motion / Motion en los construidos con React).
- Catálogo filtrable y carrito de compra funcional en la tienda de ropa.
- Sitios optimizados para mobile-first, ya que gran parte del tráfico de estos negocios llega desde el celular.
- Configuración de cache y headers de seguridad vía `.htaccess` para hosting compartido (Hostinger/Apache).

## Stack técnico

- **HTML / CSS / JavaScript vanilla** para la mayoría de los demos (restaurante, profesional, ferretería, barbería, iluminación), con GSAP, ScrollTrigger y Lenis para animaciones y scroll suave.
- **React + TypeScript + Vite** para los proyectos más complejos (tienda de ropa y cerrajería), con Tailwind CSS para estilos, y Framer Motion / Motion para transiciones.
- Sin backend: los formularios y pagos se integran vía servicios externos (Formspree, Mercado Pago, Brevo, Calendly, Stripe).

## Estructura

```
paginas-web-para-empresas/
├── index.html              → Portfolio principal
├── 01-restaurante/          → Demo restaurante (HTML/CSS/JS)
├── 02-profesional/          → Demo consultorio profesional (HTML/CSS/JS)
├── 03-tienda-src/           → Demo e-commerce, código fuente (React + Vite)
├── 03-tienda/                → Build compilado de la tienda
├── 04-ferreteria/            → Demo ferretería (HTML/CSS/JS)
├── 05-barberia/              → Demo barbería (HTML/CSS/JS)
├── 06-cerrajeria-src/        → Demo cerrajería, código fuente (React + Vite)
├── 06-cerrajeria/             → Build compilado de la cerrajería
├── 07-iluminacion/            → Demo tienda de iluminación (HTML/CSS/JS)
├── 08-air-cover/              → Demo cubiertas premium para aire acondicionado (HTML/CSS/JS)
├── buffalos-premium/          → Variante de la demo de barbería
├── _archive/                  → Versiones descartadas / en desuso
└── docs/                      → Guías de deploy, integraciones y estrategia comercial
```

Cada demo es independiente y puede abrirse directamente en el navegador (los HTML puros) o correrse localmente con `npm run dev` (los proyectos React).
