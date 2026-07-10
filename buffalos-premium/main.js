(function () {
  'use strict';
  /* BUFFALOS BARBERSHOP — main.js (IIFE, sin ES modules).
     WhatsApp/teléfono están en el HTML: 5491173611574 / 011 7361-1574
     (cambiar por el número real del local al cerrar la venta). */
  document.documentElement.classList.add('js');

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn('[buffalos] ' + name + ' error:', e); }
  }

  /* ---- Splash: red de seguridad JS (además del CSS) ---- */
  safe(function () {
    var splash = document.getElementById('splash');
    if (!splash) return;
    setTimeout(function () { splash.classList.add('hidden'); }, 3600);
  }, 'splash');

  /* ---- Nav scroll + menú mobile ---- */
  safe(function () {
    var nav = document.getElementById('nav');
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () { links.classList.toggle('open'); });
      links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); }); });
    }
  }, 'nav');

  /* ---- Reveal on scroll (threshold bajo + red de seguridad 6s) ---- */
  safe(function () {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 6 * 0.05) + 's'; io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 6000);
  }, 'reveal');

  /* ---- Count-up (rating) ---- */
  safe(function () {
    var run = function (el) {
      var to = parseFloat(el.getAttribute('data-count-to'));
      var dec = el.textContent.indexOf(',') > -1;
      var start = null, dur = 1500;
      function step(t) {
        if (!start) start = t;
        var p = Math.min((t - start) / dur, 1);
        var v = to * (1 - Math.pow(1 - p, 3));
        el.textContent = dec ? v.toFixed(1).replace('.', ',') : Math.round(v).toString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.05 });
    document.querySelectorAll('[data-count-to]').forEach(function (n) { io.observe(n); });
  }, 'countup');

  /* ---- Tilt 3D suave ---- */
  safe(function () {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }, 'tilt');

  /* ---- GSAP: parallax del hero + showcase horizontal fijado ---- */
  safe(function () {
    if (typeof gsap === 'undefined') return;
    var hasST = typeof ScrollTrigger !== 'undefined';
    if (hasST) gsap.registerPlugin(ScrollTrigger);

    var heroImg = document.querySelector('.hero-bg img');
    if (heroImg && hasST) {
      gsap.to(heroImg, { yPercent: 16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }

    var track = document.getElementById('showcaseTrack');
    var pin = document.getElementById('showcasePin');
    if (track && pin && hasST && window.matchMedia('(min-width: 861px)').matches) {
      var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.06); };
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top top', end: function () { return '+=' + dist(); },
          scrub: 0.6, pin: true, anticipatePin: 1, invalidateOnRefresh: true
        }
      });
    }
  }, 'gsap');

})();
