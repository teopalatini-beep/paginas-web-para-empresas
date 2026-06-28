# Guía de Integraciones

Pasos exactos para activar MercadoPago, Brevo (email), Formspree y Calendly en los 3 sitios demo.

---

## 1. Formspree (formularios de contacto – GRATIS)

Formspree es la manera más rápida de hacer que los formularios envíen emails sin backend.

### Pasos:
1. Ir a **https://formspree.io** → Crear cuenta (gratis)
2. Click en **"New Form"** → Dar un nombre (ej: "Restaurante - Reservas")
3. Copiar el endpoint que te dan: `https://formspree.io/f/XXXXXXXX`
4. En el HTML de cada sitio, buscar:
   ```html
   action="https://formspree.io/f/TU_FORM_ID"
   ```
   Reemplazar `TU_FORM_ID` con el ID real.
5. El formulario ya funciona. Cada envío llega al email que registraste.

### Personalizar el email de notificación:
- En Formspree Dashboard → Form Settings → Notification email
- Podés poner el email de tu cliente para que le lleguen las consultas directamente

---

## 2. MercadoPago (pagos – GRATIS hasta cobrar)

### Opción A: Botón de pago simple (sin código, ideal para empezar)

1. Crear cuenta en **https://mercadopago.com.ar** como vendedor
2. Ir a **Herramientas → Botones de pago**
3. Completar: nombre del producto, precio, foto
4. Copiar el snippet HTML que genera MP
5. Pegarlo en el HTML del sitio reemplazando el botón de demo

### Opción B: MercadoPago Checkout Pro (para tiendas reales)

Requiere un backend simple (Node.js o PHP). Código de ejemplo:

```javascript
// backend/checkout.js (Node.js)
const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ 
  accessToken: 'TU_ACCESS_TOKEN' // Dashboard MP → Developers → Credenciales
});

const preference = new Preference(client);

const result = await preference.create({
  body: {
    items: [{
      title: 'Pedido URBN Store',
      quantity: 1,
      unit_price: 18500  // total del carrito
    }],
    back_urls: {
      success: 'https://tusitio.com/gracias',
      failure: 'https://tusitio.com/error',
      pending: 'https://tusitio.com/pendiente'
    },
    auto_return: 'approved'
  }
});

// Redirigir al usuario a: result.init_point
```

Instalar SDK: `npm install mercadopago`

### Obtener Access Token:
1. **mercadopago.com.ar** → Menú → Tu negocio → Configuración → Gestión y administración → Credenciales
2. Copiar **Access Token de producción** (o el de prueba para testear)

---

## 3. Brevo / Sendinblue (emails transaccionales y newsletter – GRATIS 300/día)

### Para formularios de contacto:
1. Crear cuenta en **https://brevo.com** (gratis)
2. Ir a **Email Marketing → Forms → Create a form**
3. Diseñar el formulario con los campos que necesitás
4. Click en **"Share"** → Copiar el código "Embed"
5. Reemplazar el `<form>` actual en el HTML con ese código

### Para emails automáticos (confirmación de reserva, etc.):
1. En Brevo → **Automations → Create a workflow**
2. Trigger: "Contact submits a form"
3. Action: "Send an email" → Crear template con el mensaje de confirmación
4. El cliente recibe un email automático cada vez que alguien completa un formulario

### Para newsletter (tienda):
1. En Brevo → **Email Marketing → Lists** → Crear una lista
2. En el formulario embebido, asociarlo a esa lista
3. Configurar un email de bienvenida automático para los suscriptores

---

## 4. Stripe (pagos internacionales)

Para clientes que vendan a clientes fuera de Argentina o quieran cobrar en USD.

### Payment Link (sin código, más simple):
1. Crear cuenta en **https://stripe.com** → Dashboard → Payment Links
2. Click en **"+ New"** → Configurar el producto
3. Compartir el link o pegarlo como `href` en el botón del sitio

### Stripe Checkout (con código, igual que MP):
```javascript
// backend/stripe-checkout.js
const stripe = require('stripe')('TU_SECRET_KEY');

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{ price: 'price_XXXXXXX', quantity: 1 }],
  mode: 'payment',
  success_url: 'https://tusitio.com/gracias',
  cancel_url: 'https://tusitio.com/carrito',
});

// Redirigir al usuario a: session.url
```

---

## 5. Calendly (turnos online – GRATIS)

### Pasos:
1. Crear cuenta en **https://calendly.com** (gratis)
2. Crear un tipo de evento:
   - Nombre: "Consulta inicial – 30 min"
   - Duración: 30 minutos
   - Configurar disponibilidad horaria
3. Copiar tu username de Calendly (la parte de la URL)
4. En el HTML del sitio profesional (`02-profesional/index.html`), buscar:
   ```html
   data-url="https://calendly.com/TU_USUARIO_CALENDLY/consulta-inicial"
   ```
   Reemplazar `TU_USUARIO_CALENDLY` con tu usuario real.
5. El widget se carga automáticamente en la página.

---

## 6. Deployar los sitios (hosting gratuito)

### Netlify (recomendado):
1. Ir a **https://netlify.com** → Crear cuenta gratis
2. Arrastrar la carpeta del sitio (`01-restaurante/`) al dashboard
3. Netlify le asigna un URL automático (ej: `https://la-parrilla.netlify.app`)
4. Podés conectar un dominio propio si el cliente tiene uno

### Alternativa: GitHub Pages
1. Subir cada carpeta a un repositorio GitHub
2. Settings → Pages → Activar
3. URL: `https://tuusuario.github.io/01-restaurante`

---

## Resumen de cuentas a crear

| Servicio      | URL                        | Para qué se usa                         | Costo        |
|---------------|----------------------------|-----------------------------------------|--------------|
| Formspree     | formspree.io               | Formularios → email                     | Gratis       |
| MercadoPago   | mercadopago.com.ar         | Pagos Argentina                         | Gratis (comisión ~3.5%) |
| Brevo         | brevo.com                  | Email mktg + formularios + newsletter   | Gratis (300/día) |
| Calendly      | calendly.com               | Reserva de turnos embebida              | Gratis       |
| Netlify       | netlify.com                | Hosting estático gratuito               | Gratis       |
| Stripe        | stripe.com                 | Pagos internacionales / USD             | Gratis (2.9% + $0.30) |
