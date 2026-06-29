/* ============================================================
   LA PARRILLA DEL CENTRO – JavaScript
   ============================================================ */

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
const WHATSAPP_NUMERO = '5491145678910';

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
