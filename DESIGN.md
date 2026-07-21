---
name: Teo Palatini · Portfolio
description: Vidriera editorial de webs a medida para comercios y pymes de Buenos Aires.
colors:
  paper: "#F3EEE4"
  paper-2: "#EBE4D6"
  ink: "#1A1612"
  ink-soft: "#5C5347"
  line: "#D8CFBE"
  bermellon: "#E5481F"
  bermellon-deep: "#B5360F"
  wsp: "#1FA855"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(3rem, 9.5vw, 8.2rem)"
    fontWeight: 560
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "\"opsz\" 144"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.2rem, 5vw, 4rem)"
    fontWeight: 560
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.5rem, 3vw, 2.2rem)"
    fontWeight: 560
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  hairline: "0px"
  soft: "8px"
  pill: "50px"
  full: "9999px"
spacing:
  hairline: "1px"
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  section: "clamp(60px, 9vw, 120px)"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-solid-hover:
    backgroundColor: "{colors.bermellon}"
    textColor: "{colors.paper}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-wsp:
    backgroundColor: "{colors.wsp}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "17px 32px"
  nav-cta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  chip-tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  work-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "34px 8px"
  work-row-hover:
    backgroundColor: "{colors.paper-2}"
    padding: "34px 24px"
---

# Design System: Teo Palatini · Portfolio

## 1. Overview

**Creative North Star: "El Diario del Barrio"**

Un diario editorial impreso en papel color hueso, hecho por alguien que aprendió imprenta de un tío tipógrafo y ahora diseña las webs de los comercios de su barrio. La vidriera de Teo Palatini se lee como una revista dominical: tipografía cuidada, columnas anchas, un solo rojo bermellón que aparece con reverencia, y suficiente aire para que cada trabajo respire. La cadencia es la de un editor que sabe que menos titulares gritan más fuerte.

El sistema es intencionalmente heterogéneo hacia adentro y coherente hacia afuera. La home carga la voz-madre (Fraunces italic + Hanken Grotesk sobre crema); los siete demos internos usan cada uno un archetype distinto, elegido por rubro (cinematic ember para parrilla, glassmorphism para consultorio, mouse-reactive gradient para streetwear, brutalist grid para ferretería, newspaper para cerrajería, glow para iluminación, editorial dark warm para barbería). Esa diversidad es el argumento de venta: cada demo defiende su rubro, no el gusto del diseñador. Lo que unifica es el nivel de craft, no la paleta.

El sistema rechaza explícitamente cuatro estéticas: la landing genérica de agencia digital (hero abstracto + 4 tarjetitas de servicios), el template SaaS Silicon Valley (hero-métrica clonado de Vercel / Linear), el perfil "freelancer barato" tipo Fiverr (5 estrellas gigantes, badges de "top rated"), y el portfolio de estudiante con partículas y "Hi I'm Teo".

**Key Characteristics:**
- Cream editorial paper + un único bermellón como rareza ceremonial
- Fraunces variable (opsz + SOFT) para display, con italic reservado para énfasis semántico
- Hairlines de 1px y bordes-pill de 50px conviven como decisión editorial
- Motion medido: fade+translate en scroll, hover-shift horizontal en filas de índice, cero parallax
- El WhatsApp es color-de-estado, no color-de-marca — vive apartado en su verde WhatsApp

## 2. Colors: La Paleta del Papel Hueso

Neutrales cálidos de imprenta, un rojo bermellón como voz única, y el verde de WhatsApp aislado como color operativo.

### Primary
- **Bermellón** (`#E5481F`): el único color de marca del sistema. Aparece en el `<em>` italic de los headlines, en la firma del kicker (`::before` hairline + texto), en el hover de arrows y filas de trabajo, y en la selección de texto. Nunca cubre superficies grandes ni se mezcla con otro acento cromático. Es rareza calculada.
- **Bermellón Profundo** (`#B5360F`): sub-tono para hovers de bermellón, texto sobre paper-2, y para dar peso al kicker en superficies claras. No es un color propio, es una versión de trabajo del bermellón.

### Neutral (fondo)
- **Papel Hueso** (`#F3EEE4`): el body background. Un crema cálido con tinte hacia amarillo tostado, no gris frío. Es el color de una hoja de diario recién impresa que respiró un rato.
- **Papel Ceniza** (`#EBE4D6`): superficie secundaria (marquee band, work-row hover, mobile nav drawer). Un tercio más oscuro que el papel, con la misma calidez.

### Neutral (tinta)
- **Tinta Negra** (`#1A1612`): negro cálido (no `#000`, jamás). Sirve para display, body text, botón solid, y la marca `TP` en el nav. Su calidez lo empareja con el papel.
- **Tinta Suave** (`#5C5347`): grises editoriales para copy secundario, metadata, captions, kickers de sección. Testeado a 4.5:1 sobre `#F3EEE4`. Es el color de la letra chica.

### Neutral (estructura)
- **Hairline** (`#D8CFBE`): la única línea del sistema. 1px, hueso-más-oscuro, no gris. Delimita nav sticky, filas de trabajo, hairline del footer, y ninguna otra cosa.

### Operativo (fuera del sistema editorial)
- **Verde WhatsApp** (`#1FA855`): reservado para el CTA de WhatsApp del hero (button-wsp) y el FAB flotante donde exista. No es un color de marca, es la firma reconocible de la plataforma; convive con el bermellón porque no compite (verde vs rojo saturados de canales opuestos), pero jamás se mezcla en el mismo componente.

### Named Rules
**La Regla del Único Rojo.** El bermellón aparece en ≤10% de la superficie visible en cualquier scroll. Un `<em>` italic, un arrow-hover, la selección de texto. Nunca en un botón hero, jamás en un background de sección, nunca en dos elementos vecinos. Su rareza es el argumento.

**La Regla del No-Gris-Frío.** Todos los neutrales van hacia el hueso / warm-taupe / cálido. Nunca un `#F5F5F5` o `#E5E5E5` estándar. Si un color parece "neutral genérico", está mal calibrado. El calor del papel es lo que separa el sistema de un template.

**La Regla del Verde Aislado.** El verde WhatsApp `#1FA855` solo aparece en componentes que llevan a WhatsApp. No es color de marca. No se usa en badges, alerts, íconos de "éxito", ni en ningún estado que no sea literal-WhatsApp.

## 3. Typography

**Display Font:** Fraunces (con Georgia, serif como fallback). Variable font con ejes `opsz`, `wght`, y `SOFT`; el eje SOFT en `60` da la calidez italic característica.
**Body Font:** Hanken Grotesk (con `system-ui, sans-serif` como fallback). Grotesca humanista, pesos 300–800.

**Character:** Fraunces es serif editorial variable con la personalidad de una revista impresa; Hanken Grotesk es una grotesca con calidez humanista, no una sans genérica tipo Inter. La pareja funciona en contraste (serif italic vs sans neutra) y en calidez (ambas familias tienen tinte cálido, ninguna es fría), lo que unifica el sistema con el papel hueso.

### Hierarchy
- **Display** (weight 560, `clamp(3rem, 9.5vw, 8.2rem)`, line-height 1.02, letter-spacing -0.02em, `font-variation-settings: "opsz" 144`): titulares del hero. Un solo `<h1>` por página, con `<em>` italic para la palabra-ancla ("vender", "abrimos", "fuego"). El clamp máximo de 8.2rem (~131px) toca el techo del sistema; nada sobre eso.
- **Headline** (weight 560, `clamp(2.2rem, 5vw, 4rem)`, line-height 1.02, letter-spacing -0.02em): `<h2>` de secciones ("Trabajos seleccionados", "Cómo trabajamos"). Text-wrap: balance obligatorio.
- **Title** (weight 560, `clamp(1.5rem, 3vw, 2.5rem)`, letter-spacing -0.02em): `<h3>` de work rows y service cards. Cambia a bermellón en hover cuando está en una fila navegable.
- **Body** (weight 400, base 1rem, line-height 1.6, max 62ch en párrafos de work-main): copy de secciones. Sobre `#F3EEE4` usa `#5C5347` para copy secundario; nunca sub-`#5C5347` en cuerpo (rompería contraste AA).
- **Label / Kicker** (weight 700, 0.78–0.82rem, letter-spacing 0.14–0.16em, uppercase, color `#B5360F` sobre paper): el hairline-eyebrow con `::before` de 26px de línea, y las etiquetas de sección tipo `(01 — Portfolio)`. En superficies dark (services section) el kicker cambia a `#E5A88F` (bermellón desaturado sobre negro) para mantener contraste.

### Named Rules
**La Regla del Italic Semántico.** El italic en Fraunces solo se usa en la palabra que carga la promesa. "Sitios que te hacen *vender*" — el italic ES el argumento. Nunca italic decorativo, nunca en un párrafo, nunca en un subtítulo entero.

**La Regla del `opsz 144`.** El eje `opsz` de Fraunces cambia el dibujo tipográfico según el tamaño óptico. Titulares display llevan `"opsz" 144` (dibujo optimizado para tamaño grande, contraste más alto entre trazos). Body texto en Fraunces (raro, pero pasa en captions) usaría `"opsz" 14`. No mezclar.

## 4. Elevation

Sistema flat por default. La profundidad se comunica por cambio de fondo (paper → paper-2), no por sombras. No hay `box-shadow` en botones, cards, o filas de trabajo. Las únicas sombras del sistema son ambientales para overlays: el `box-shadow: -20px 0 60px rgba(0,0,0,.1)` del mobile nav drawer, y ninguna otra.

### Named Rules
**La Regla del Flat-Por-Default.** Ninguna superficie tiene sombra en reposo. La jerarquía vertical se lee por tipografía y espaciado, no por sombras acumulándose. Si una card "necesita" sombra para leerse, la jerarquía está mal.

**La Regla del Estado-Cambia-Fondo.** El hover no eleva; corre. Una work-row hover cambia de `paper` a `paper-2` y se desplaza 16px hacia adentro (padding-left 24px). Un botón solid hover cambia de `ink` a `bermellón` y sube 2px (`translateY(-2px)`) — el 2px es afordancia táctil, no sombra.

## 5. Components

### Buttons
- **Shape:** pill de 50px (`--rounded.pill`). El sistema tiene UNA forma de botón; no hay cuadrados ni squircles.
- **Solid (`.btn-solid`):** fondo `#1A1612`, texto `#F3EEE4`, borde 1.5px del mismo `#1A1612`, padding 15px 26px, weight 600. Hover: fondo pasa a `#E5481F` (bermellón), borde también, `translateY(-2px)`. Transición 0.4s cubic-bezier(.2,.7,.2,1) en transform + background.
- **Line (`.btn-line`):** transparente, texto `#1A1612`, borde 1.5px `#1A1612`. Hover: fondo pasa a `#1A1612`, texto a `#F3EEE4`, `translateY(-2px)`. Es el negativo exacto del solid; se usa como CTA secundario al lado del solid.
- **WhatsApp (`.btn-wsp`):** fondo `#1FA855`, texto blanco, borde del mismo verde, padding 17px 32px (una talla más grande que solid/line — es el CTA-de-conversión). Solo en secciones donde el CTA primario es WhatsApp; en el nav va la variante compacta.
- **Nav CTA (`.nav-cta`):** solid mini: fondo ink, padding 10px 18px, 0.86rem. Hover pasa a bermellón. Nunca dos nav-cta juntos.
- **Focus:** `:focus-visible` con outline 2px bermellón + offset 3px. `outline: none` prohibido en cualquier interactivo.

### Chips (`.tag`)
- **Style:** transparente con borde 1px `#D8CFBE`, texto `#5C5347`, weight 600, 0.74rem, padding 5px 11px, pill radius.
- **State:** hover levantaría el borde a bermellón, pero por default los chips son informativos, no interactivos.

### Cards / Containers
No hay cards propiamente dichas en la home; el sistema usa **filas de índice editorial** (`.work`) como patrón dominante en vez de card grids. Ver "Signature: Work Row Index" abajo.

Cuando aparecen cards (services section, con fondo `ink`):
- **Corner Style:** hairline (0px) — no radius. Las cards son bloques recortados por 1px de línea sobre `rgba(255,255,255,.12)`.
- **Background:** `#1A1612` (ink), hover `#241E18` (levísimo lift tonal).
- **Border:** implícito por gap-de-1px sobre grid con fondo `rgba(255,255,255,.12)`.
- **Padding:** 34px 28px.
- **Shadow:** ninguna. La jerarquía se lee por el grid-line + el ic + el pricing italic.

### Inputs / Fields
No hay inputs en la home. Los demos los tienen (formularios de reserva, contacto, turnos), cada uno con su propio sistema. Cuando el home sume un formulario, la baseline será: input con border-bottom hairline (`#D8CFBE`), fondo transparente, padding 12px 0, focus con border-bottom pasando a bermellón sin sombra. Nunca inputs con fondo gris o border-box con radius grande — eso es de admin-panel, no de vidriera editorial.

### Navigation
- **Style:** `<nav>` sticky con `backdrop-filter: blur(12px)` y fondo `rgba(243,238,228,.82)`. La border-bottom pasa de `transparent` a `#D8CFBE` cuando `.scrolled` (activada por JS a partir de scrollY > 40).
- **Typography:** brand en Fraunces 600 1.4rem con letter-spacing -0.02em, prefijado por un círculo bermellón `TP` de 30px. Links en Hanken 500 0.9rem, color `#5C5347`; hover pasa a `#1A1612`.
- **Mobile:** hamburger + drawer que se desliza desde derecha, 78% de viewport, fondo `#EBE4D6`, ítems apilados 22px de gap. `aria-expanded` obligatorio en el toggle.
- **Active state:** no hay indicador de sección activa (el home es scroll-a-anchors); se confía en la posición scroll + el nav-cta permanente como ancla.

### Signature: Work Row Index (`.works > .work`)
El componente que define el sistema. Cada trabajo es una FILA de tres columnas (`grid-template-columns: 90px 1fr auto`) con border-top hairline:
- **Columna 1 (90px):** el número italic en Fraunces 1.5rem color bermellón (`01`, `02`, ...).
- **Columna 2 (`1fr`):** kicker uppercase con el rubro, h3 title, párrafo descriptivo (max 62ch), y tags-chips debajo.
- **Columna 3 (`auto`):** el CTA "Ver demo →" con un arrow circle de 38px, borde 1.5px ink.

Hover: la fila entera se desplaza (padding-left 24px, padding-right 24px), fondo pasa a `paper-2`, el h3 pasa a bermellón, y el arrow circle rota -45° al bermellón sobre fondo bermellón (`background`, `border-color`, `color` cambian simultáneamente). Es una micro-interacción cinemática — es lo que hace que un scroll por el índice se sienta como pasar páginas de una revista.

Mobile (≤860px): la grid colapsa a 2 columnas (número + main), y el CTA "Ver demo →" cae debajo del contenido, alineado al inicio. Nunca se convierte en una card apilada; la lectura de fila se preserva.

## 6. Do's and Don'ts

### Do:
- **Do** usar `<em>` italic en Fraunces solo en la palabra-argumento del titular ("Sitios que te hacen *vender*"). El italic es semántico, no decorativo.
- **Do** mantener el bermellón `#E5481F` como voz única, aparición ≤10% de la superficie, jamás como fondo de sección.
- **Do** usar hairlines de 1px en `#D8CFBE` como el único delimitador estructural. Un 2px es un error del sistema.
- **Do** partir del papel hueso `#F3EEE4` para cualquier vista clara del sistema. Si un tono blanco parece frío, está mal calibrado.
- **Do** aislar el verde WhatsApp `#1FA855` a componentes que van a WhatsApp. En cualquier otro lugar, es contaminación.
- **Do** presentar los siete demos con la voz honesta de `BRIEF-PORTFOLIO.md`: seis como demos representativos por rubro, Buffalos como caso real en curso. Nunca como "clientes cerrados".
- **Do** mantener el work-row-hover con desplazamiento horizontal (padding-left/right shift) — es la firma cinética del sistema.
- **Do** respetar `prefers-reduced-motion` en marquees, reveals de scroll y el hover-shift de filas de trabajo.

### Don't:
- **Don't** usar gradiente en texto (`background-clip: text`) — el gradient text es cliché AI y decorativo. Emphasis va por weight, size, o el `<em>` bermellón.
- **Don't** montar un bloque hero-métrica ("+50 clientes felices" con stats grid). Es el template SaaS Silicon Valley clonado. Portfolio anti-referencia explícita.
- **Don't** usar side-stripe borders (`border-left: 4px solid var(--accent)`) en cards, callouts, o list items. Nunca. Rewrite con full border o cambio de fondo.
- **Don't** usar sombras decorativas en cards o botones. El sistema es flat-por-default. Sombras solo para overlays (drawer, modal).
- **Don't** usar `#000` puro para texto. Toda tinta es cálida (`#1A1612` como piso).
- **Don't** usar `#FFF` puro o `#F5F5F5` genérico para fondos claros. La única superficie clara es `#F3EEE4` o `#EBE4D6`.
- **Don't** poner icons emoji como decoración de sección (`🎨 Diseño`, `🚀 Rápido`). Portfolio anti-referencia — es de estudiante o freelancer barato. SVG inline o nada.
- **Don't** clonar hero-shape del template Vercel / Linear (big number + gradient orb detrás + stats). Portfolio anti-referencia explícita.
- **Don't** poner testimonios stock ("María — Emprendedora"), 5-estrellas gigantes, badges de "top rated seller", o "desde $X USD". Portfolio anti-referencia.
- **Don't** agregar particles.js, starfield, o "Hi I'm Teo" — es portfolio de junior. La vidriera de Teo es un diario editorial, no una CV interactiva.
- **Don't** unificar la paleta de los siete demos con la del home. Cada demo defiende su rubro; la coherencia es de nivel de craft, no de color.
