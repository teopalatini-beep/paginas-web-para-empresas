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

// ---- Reservation form ----
const form        = document.getElementById('reservas-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      // Uncomment and replace TU_FORM_ID to use Formspree:
      // const response = await fetch(form.action, {
      //   method: 'POST',
      //   body: new FormData(form),
      //   headers: { 'Accept': 'application/json' }
      // });
      // if (!response.ok) throw new Error('Error en el envío');

      // Demo: simulate async submission
      await new Promise(r => setTimeout(r, 1200));

      form.classList.add('hidden');
      formSuccess.classList.remove('hidden');
    } catch {
      submitBtn.textContent = 'Error — Intentá de nuevo';
      submitBtn.disabled = false;
    }
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
