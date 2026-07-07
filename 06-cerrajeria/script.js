/* ============================================================
   LLAVE MAESTRA — Cerrajería 24hs — JavaScript
   👉 Teléfono/WhatsApp configurados: 5491151526104 (cambiar por el del
      cliente en index.html: los enlaces tel: y wa.me).
   ============================================================ */

/* ---- Menú mobile ---- */
const links = document.getElementById('links');
document.getElementById('burger').addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

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
