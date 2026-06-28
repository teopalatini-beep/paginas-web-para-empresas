/* ============================================================
   DRA. VALENTINA TORRES – JavaScript
   ============================================================ */

// ---- Navbar scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Hamburger ----
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

// ---- Calendly: hide placeholder if widget loads ----
window.addEventListener('load', () => {
  const widget = document.querySelector('.calendly-inline-widget');
  const placeholder = document.getElementById('calendly-placeholder');
  // If the widget URL is still the placeholder text, keep the demo placeholder visible
  const url = widget?.dataset?.url || '';
  if (url.includes('TU_USUARIO_CALENDLY')) {
    widget.style.display = 'none';
    placeholder.style.display = 'block';
  } else {
    placeholder.style.display = 'none';
  }
});

// ---- Contact form ----
const form    = document.getElementById('contacto-form');
const success = document.getElementById('c-success');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      // Uncomment to use Formspree:
      // const res = await fetch(form.action, {
      //   method: 'POST',
      //   body: new FormData(form),
      //   headers: { 'Accept': 'application/json' }
      // });
      // if (!res.ok) throw new Error();

      await new Promise(r => setTimeout(r, 1200));
      form.classList.add('hidden');
      success.classList.remove('hidden');
    } catch {
      btn.textContent = 'Error — Intentá de nuevo';
      btn.disabled = false;
    }
  });
}

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

// ---- Animate on scroll ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.servicio-card, .testimonio-card, .credential, .contacto-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
