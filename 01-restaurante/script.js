/* ============================================================
   LA PARRILLA DEL CENTRO – JavaScript
   ============================================================ */

/* ---- Botón de pago Mercado Pago (DEMO — no cobra) ----
   Muestra un aviso de demostración. Para activar pagos reales,
   usar la plantilla en ~/Dev/plantillas/mercadopago/ */
function mpDemo() {
  document.getElementById('mp-demo-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'mp-demo-toast';
  t.innerHTML = '<strong>🔒 Demo de pago</strong><br>En el sitio real, este botón abre el checkout seguro de <b>Mercado Pago</b> (tarjeta, débito, dinero en cuenta o efectivo).';
  Object.assign(t.style, {
    position: 'fixed', left: '50%', bottom: '28px', transform: 'translateX(-50%)',
    maxWidth: '360px', background: '#fff', color: '#1a1a2e',
    borderLeft: '5px solid #009EE3', borderRadius: '12px', padding: '16px 20px',
    boxShadow: '0 12px 40px rgba(0,0,0,.25)', font: '14px/1.55 system-ui, sans-serif',
    zIndex: '99999', opacity: '0', transition: 'opacity .3s ease',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 4500);
}

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Menu tabs ----
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

/* ============================================================
   CONFIGURACIÓN DEL NEGOCIO
   👉 EDITÁ estos datos por los del cliente real:
   - WHATSAPP_NUMERO: número en formato internacional, sin +, espacios ni guiones.
     Ej: Argentina +54 9 11 1234-5678  →  '5491112345678'
   ============================================================ */
const WHATSAPP_NUMERO = '5491151526104';

// ---- Reservation form → envía la reserva por WhatsApp ----
const form        = document.getElementById('reservas-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());

    const texto =
`*Nueva reserva — La Parrilla del Centro*

*Nombre:* ${d.nombre || ''} ${d.apellido || ''}
*Email:* ${d.email || '-'}
*Teléfono:* ${d.telefono || '-'}
*Fecha:* ${d.fecha || ''}   *Hora:* ${d.hora || ''}
*Personas:* ${d.personas || ''}
*Ocasión:* ${d.ocasion || '-'}
*Comentarios:* ${d.comentarios || '-'}`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    form.classList.add('hidden');
    formSuccess.classList.remove('hidden');
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Animate on scroll (simple intersection observer) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.menu-card, .feature-item, .contact-item, .galeria-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// ---- Set min date for date input ----
const fechaInput = document.getElementById('fecha');
if (fechaInput) {
  const today = new Date().toISOString().split('T')[0];
  fechaInput.min = today;
}
