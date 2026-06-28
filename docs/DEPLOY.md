# Deploy en Netlify – Guía paso a paso

En 10 minutos tenés tu portfolio y los 3 demos online con links públicos para compartir.

---

## Paso 1: Subir el portfolio completo a Netlify

Esta es la forma más rápida — sin cuenta, sin configuración.

1. Ir a **https://netlify.com/drop** (no hace falta crear cuenta)
2. Arrastrar la carpeta **completa** `freelance-portfolio/` al área de drop
3. Netlify te da un link automático tipo: `https://amazing-tesla-abc123.netlify.app`
4. **Ese link es tu portfolio** — tiene el index.html con los 3 demos linkados

> ⚠️ Los links internos entre el portfolio y los demos van a funcionar porque están en la misma carpeta.

---

## Paso 2 (recomendado): Crear cuenta para tener links permanentes

Sin cuenta, Netlify borra los deploys después de un tiempo.

1. Ir a **https://netlify.com** → Sign up (con GitHub o Google)
2. En el Dashboard → **"Add new site" → "Deploy manually"**
3. Arrastrar la carpeta `freelance-portfolio/`
4. El site queda guardado y el link es permanente

---

## Paso 3: Personalizar la URL (gratis)

Por defecto el link es feo (`amazing-tesla-abc123.netlify.app`). Podés cambiarlo:

1. En Netlify Dashboard → tu sitio → **"Site configuration" → "Change site name"**
2. Poner algo como: `miportfolio-web.netlify.app` o `tuapellido-web.netlify.app`
3. Queda: `https://tuapellido-web.netlify.app`

---

## Paso 4 (opcional): Dominio propio

Si querés un dominio propio como `tunombre.com.ar`:

1. Comprar el dominio en **NIC.ar** (~$10 USD/año para .com.ar) o en **GoDaddy/Namecheap** (~$10 USD/año para .com)
2. En Netlify → Site Configuration → Domain management → "Add a domain"
3. Netlify te dice qué nameservers apuntar en NIC.ar
4. En 24-48hs el dominio ya apunta a tu portfolio

---

## Lo que tenés online después del deploy

```
https://tuapellido-web.netlify.app/                  ← Portfolio principal
https://tuapellido-web.netlify.app/01-restaurante/   ← Demo restaurante
https://tuapellido-web.netlify.app/02-profesional/   ← Demo psicóloga
https://tuapellido-web.netlify.app/03-tienda/        ← Demo tienda
```

**Estos 4 links son los que mandás a cada cliente.**

---

## Antes de deployar: personalizar el portfolio

Abrí `index.html` con un editor de texto y cambiá:

```html
<!-- Tu número de WhatsApp en el botón CTA: -->
href="https://wa.me/5491100000000?text=..."
             ^^^^^^^^^^^^ reemplazá por tu número

<!-- Tu email en el botón de email: -->
href="mailto:tu@email.com"
              ^^^^^^^^^^^^ tu email real
```

También podés cambiar el nombre en la navbar:
```html
<span class="nav-logo">tu<span>.</span>web</span>
```
Por algo como:
```html
<span class="nav-logo">teo<span>.</span>web</span>
```

---

## Actualizar el sitio después del deploy

Si cambiás algo en los archivos:
1. Netlify Dashboard → tu sitio → Deploys
2. Arrastrar la carpeta actualizada al área de drop
3. En 30 segundos el sitio se actualiza con los cambios

---

## Resultado final

Después de seguir estos pasos tenés:

- ✅ **1 portfolio online** con diseño profesional oscuro, animaciones y mouse tracking
- ✅ **3 demos en vivo** linkados desde el portfolio
- ✅ **Un link único** para compartir por WhatsApp, Instagram, email, LinkedIn
- ✅ **Todo gratis** (Netlify free tier es suficiente para esto)
