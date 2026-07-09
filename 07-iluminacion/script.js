/* ============================================================
   LUMINA — Casa de Iluminación — JavaScript
   👉 WhatsApp configurado: 5491151526104 (cambiar por el del cliente
      en index.html: enlaces wa.me y la constante de abajo).
   ============================================================ */
const WHATSAPP_NUMERO = '5491151526104';

/* ---- Nav scroll + menú mobile ---- */
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));
const links = document.getElementById('links');
document.getElementById('burger').addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* ---- Pedido por WhatsApp ---- */
function pedir(nombre) {
  const texto = `Hola! Me interesa este producto de Lumina:\n\n*${nombre}*\n\n¿Tienen stock, colores y hacen envío?`;
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
    maxWidth: '360px', background: '#fff', color: '#16110c',
    borderLeft: '5px solid #009EE3', borderRadius: '12px', padding: '16px 20px',
    boxShadow: '0 12px 40px rgba(0,0,0,.35)', font: '14px/1.55 system-ui, sans-serif',
    zIndex: '99999', opacity: '0', transition: 'opacity .3s ease',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 4500);
}

/* ---- Reveal on scroll ---- */
const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (i % 5 * 0.05) + 's';
  io.observe(el);
});

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }); }
}));
