/* ============================================================
   LLAVE MAESTRA — Cerrajería 24hs — JavaScript
   👉 Teléfono/WhatsApp configurados: 5491151526104 (cambiar por el del
      cliente en index.html: los enlaces tel: y wa.me).
   ============================================================ */

/* ---- Menú mobile ---- */
const burger = document.getElementById('burger');
const links = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* ---- Reveal on scroll (rápido, sin demoras largas) ---- */
const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (i % 6 * 0.03) + 's';
  io.observe(el);
});

/* ---- Smooth scroll con offset por el masthead sticky ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href');
  if (id.length < 2) return;
  const t = document.querySelector(id);
  if (t) { e.preventDefault(); scrollTo({ top: t.getBoundingClientRect().top + scrollY - 96, behavior: 'smooth' }); }
}));
