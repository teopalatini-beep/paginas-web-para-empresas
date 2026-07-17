/* ============================================================
   LA PARRILLA DEL CENTRO – JavaScript
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Botón de pago Mercado Pago (DEMO — no cobra) ----
   Muestra un aviso de demostración. Para activar pagos reales,
   usar la plantilla en ~/Dev/plantillas/mercadopago/ */
function mpDemo() {
  document.getElementById('mp-demo-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'mp-demo-toast';
  t.setAttribute('role', 'status');
  t.innerHTML = '<strong>🔒 Demo de pago</strong><br>En el sitio real, este botón abre el checkout seguro de <b>Mercado Pago</b> (tarjeta, débito, dinero en cuenta o efectivo).';
  Object.assign(t.style, {
    position: 'fixed', left: '50%', bottom: 'calc(28px + env(safe-area-inset-bottom, 0px))', transform: 'translateX(-50%)',
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
}, { passive: true });

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
});
// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ---- Menu tabs ----
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
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
    formSuccess.setAttribute('tabindex', '-1');
    formSuccess.focus();
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  });
});

// ---- Reveal on scroll (intersection observer) ----
const revealTargets = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));
}

// ---- Set min date for date input ----
const fechaInput = document.getElementById('fecha');
if (fechaInput) {
  const today = new Date().toISOString().split('T')[0];
  fechaInput.min = today;
}

/* ============================================================
   HERO — parallax sutil de cámara + partículas de brasa
   Firma visual del archetype "Cinematic Storytelling" (CSS/JS,
   sin Three.js): la imagen del hero se mueve levemente al
   scrollear y pequeñas brasas flotan hacia arriba.
   ============================================================ */
const heroImg = document.getElementById('hero-img');
const heroSection = document.getElementById('hero');

if (heroImg && heroSection && !prefersReducedMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = heroSection.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress = Math.min(Math.max(-rect.top / heroSection.offsetHeight, 0), 1);
        heroImg.style.transform = `translateY(${progress * 60}px) scale(1.06)`;
      }
      ticking = false;
    });
  }, { passive: true });
}

/* ============================================================
   HERO — brasas en canvas (40 partículas con física real)
   Reemplaza el sistema de 6 spans CSS por un canvas más denso
   y expresivo. Deriva/velocidad/fade son por partícula, no
   sincronizados en keyframe — la firma respira como fuego real.
   ============================================================ */
const embersContainer = document.getElementById('embers');
if (embersContainer && !prefersReducedMotion) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  embersContainer.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  const resize = () => {
    const r = embersContainer.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PARTICLES = 42;
  const rand = (a, b) => a + Math.random() * (b - a);
  const spawn = (initial = false) => ({
    x: rand(0, W),
    y: initial ? rand(0, H) : H + rand(0, 40),
    r: rand(0.8, 2.6),
    vy: -rand(0.18, 0.55),
    vx: rand(-0.08, 0.08),
    drift: rand(0.002, 0.006),
    driftPhase: Math.random() * Math.PI * 2,
    life: 0,
    lifeMax: rand(340, 620),
    hue: rand(18, 34),
    lightness: rand(52, 68),
  });
  let particles = Array.from({ length: PARTICLES }, () => spawn(true));

  let inView = true;
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.02 })
    : null;
  if (io) io.observe(embersContainer);
  const onVis = () => { inView = !document.hidden; };
  document.addEventListener('visibilitychange', onVis);

  let rafId = 0;
  const tick = () => {
    rafId = requestAnimationFrame(tick);
    if (!inView) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.driftPhase += p.drift;
      p.x += p.vx + Math.sin(p.driftPhase) * 0.35;
      p.y += p.vy;
      p.life += 1;
      const t = p.life / p.lifeMax;
      const alpha = t < 0.15 ? t / 0.15 : t > 0.75 ? (1 - t) / 0.25 : 1;
      const glow = alpha * 0.85;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 92%, ${p.lightness}%, ${glow})`;
      ctx.shadowBlur = 8 * alpha;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${alpha * 0.9})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      if (p.life >= p.lifeMax || p.y < -10 || p.x < -10 || p.x > W + 10) {
        particles[i] = spawn(false);
      }
    }
    ctx.shadowBlur = 0;
  };
  tick();
}
