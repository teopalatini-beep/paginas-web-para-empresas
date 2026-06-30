/* ============================================================
   FERRETERÍA SAN MARTÍN — JavaScript
   ============================================================ */

/* ---- CONFIGURACIÓN DEL NEGOCIO ----
   👉 EDITÁ el número por el del cliente (formato internacional, sin + ni espacios).
      Ej: +54 9 11 1234-5678  →  '5491112345678' */
const WHATSAPP_NUMERO = '5491151526104';

/* ---- Catálogo (precios orientativos de demo) ---- */
const PRODUCTOS = [
  { cat: 'Herramientas eléctricas', name: 'Taladro percutor 650W', price: 48900, badge: 'Más vendido', img: '1504148455328-c376907d081c' },
  { cat: 'Herramientas',            name: 'Set 40 piezas con maletín', price: 32500, badge: 'Oferta',     img: '1572981779307-38b8cabb2407' },
  { cat: 'Pinturería',              name: 'Látex interior 20L',        price: 27800, badge: null,          img: '1589939705384-5185137a7f0f' },
  { cat: 'Fijaciones',              name: 'Caja tornillos surtidos',   price: 8900,  badge: null,          img: '1530124566582-a618bc2615dc' },
  { cat: 'Electricidad',            name: 'Pack 6 lámparas LED 9W',    price: 11400, badge: 'Eco',         img: '1565608438257-fac3c27beb36' },
  { cat: 'Jardín',                  name: 'Kit herramientas de jardín',price: 19500, badge: null,          img: '1416879595882-3373a0480b5b' },
  { cat: 'Herramientas',            name: 'Martillo carpintero 27mm',  price: 6700,  badge: null,          img: '1426927308491-6380b6a9936f' },
  { cat: 'Herramientas',            name: 'Caja organizadora metálica',price: 23900, badge: 'Nuevo',       img: '1558618666-fcd25c85cd64' },
];

const ARS = (n) => '$' + n.toLocaleString('es-AR');

function renderProductos() {
  const grid = document.getElementById('prod-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTOS.map((p) => `
    <article class="prod-card reveal">
      <div class="prod-img" style="background-image:url('https://images.unsplash.com/photo-${p.img}?w=600&q=80')" role="img" aria-label="${p.name}">
        ${p.badge ? `<span class="prod-badge">${p.badge}</span>` : ''}
      </div>
      <div class="prod-body">
        <span class="prod-cat">${p.cat}</span>
        <h3 class="prod-name">${p.name}</h3>
        <div class="prod-foot">
          <span class="prod-price">${ARS(p.price)} <small>aprox.</small></span>
          <button class="btn-wsp" type="button"
            onclick="pedirPorWhatsApp('${p.name.replace(/'/g, '')}', ${p.price})">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </article>`).join('');
  // re-observar las cards nuevas para la animación
  document.querySelectorAll('#prod-grid .reveal').forEach((el) => revealObserver.observe(el));
}

/* ---- Pedido por WhatsApp ---- */
function pedirPorWhatsApp(nombre, precio) {
  const texto = `Hola! Quería consultar por este producto:\n\n*${nombre}*\nPrecio publicado: ${ARS(precio)}\n\n¿Tienen stock y hacen envío?`;
  window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`, '_blank');
}

/* ---- Botón Mercado Pago (DEMO — no cobra) ----
   Para activar pagos reales, usar ~/Dev/plantillas/mercadopago/ */
function mpDemo() {
  document.getElementById('mp-demo-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'mp-demo-toast';
  t.innerHTML = '<strong>🔒 Demo de pago</strong><br>En el sitio real, este botón abre el checkout seguro de <b>Mercado Pago</b> (tarjeta, débito, dinero en cuenta o efectivo).';
  Object.assign(t.style, {
    position: 'fixed', left: '50%', bottom: '28px', transform: 'translateX(-50%)',
    maxWidth: '360px', background: '#fff', color: '#1e293b',
    borderLeft: '5px solid #009EE3', borderRadius: '12px', padding: '16px 20px',
    boxShadow: '0 12px 40px rgba(0,0,0,.25)', font: '14px/1.55 system-ui, sans-serif',
    zIndex: '99999', opacity: '0', transition: 'opacity .3s ease',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 4500);
}

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 30));

/* ---- Hamburguesa ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---- Reveal on scroll ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });

/* ---- Init ---- */
renderProductos();
document.querySelectorAll('.cat-card, .trust-item, .nosotros-text, .contact-row').forEach((el) => {
  el.classList.add('reveal'); revealObserver.observe(el);
});
