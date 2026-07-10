(function () {
  'use strict';
  /* BUFFALOS BARBERSHOP — main.js v2 "Atmospheric Editorial" (IIFE, sin ES modules).
     WhatsApp/teléfono están en el HTML: 5491173611574 / 011 7361-1574
     (cambiar por el número real del local al cerrar la venta). */
  document.documentElement.classList.add('js');

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn('[buffalos] ' + name + ' error:', e); }
  }
  function escHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

  /* ---- Scroll progress bar ---- */
  safe(function () {
    var bar = document.querySelector('[data-scroll-progress]');
    if (!bar) return;
    var raf = null;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = 'scaleX(' + pct + ')';
      raf = null;
    }
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }, 'scrollProgress');

  /* ---- Split text (chars/words) — reveal robusto con ScrollTrigger o IO fallback ---- */
  safe(function () {
    function splitChars(el) {
      el.setAttribute('aria-label', el.textContent.trim());
      var html = Array.from(el.childNodes).map(function (node) {
        if (node.nodeType === 3) {
          return node.textContent.split('').map(function (ch) {
            return ch === ' ' ? ' ' : '<span class="split-char" aria-hidden="true">' + escHTML(ch) + '</span>';
          }).join('');
        }
        if (node.nodeName === 'BR') return '<br>';
        if (node.nodeType === 1) {
          var tag = node.tagName.toLowerCase();
          var inner = node.textContent.split('').map(function (ch) {
            return ch === ' ' ? ' ' : '<span class="split-char" aria-hidden="true">' + escHTML(ch) + '</span>';
          }).join('');
          return '<' + tag + '>' + inner + '</' + tag + '>';
        }
        return '';
      }).join('');
      el.innerHTML = html;
      return el.querySelectorAll('.split-char');
    }
    function splitWords(el) {
      el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
      function wrapWords(text) {
        return text.split(/(\s+)/).map(function (w) {
          return /^\s+$/.test(w) ? w : '<span class="split-word" aria-hidden="true">' + escHTML(w) + '</span>';
        }).join('');
      }
      var html = Array.from(el.childNodes).map(function (node) {
        if (node.nodeType === 3) return wrapWords(node.textContent);
        if (node.nodeName === 'BR') return '<br>';
        if (node.nodeType === 1) {
          var tag = node.tagName.toLowerCase();
          return '<' + tag + '>' + wrapWords(node.textContent) + '</' + tag + '>';
        }
        return '';
      }).join('');
      el.innerHTML = html;
      return el.querySelectorAll('.split-word');
    }

    var hasGSAP = typeof gsap !== 'undefined';
    var hasST = hasGSAP && typeof ScrollTrigger !== 'undefined';

    document.querySelectorAll('[data-split]').forEach(function (el) {
      var mode = el.dataset.split;
      var parts = mode === 'chars' ? splitChars(el) : splitWords(el);
      if (hasGSAP) {
        gsap.set(parts, { y: 24, opacity: 0 });
        var anim = {
          y: 0, opacity: 1,
          duration: mode === 'chars' ? 0.7 : 0.9,
          stagger: mode === 'chars' ? 0.018 : 0.04,
          ease: 'expo.out'
        };
        if (hasST) {
          anim.scrollTrigger = { trigger: el, start: 'top 88%', once: true };
          gsap.to(parts, anim);
        } else {
          gsap.to(parts, anim); // sin ScrollTrigger: anima al cargar
        }
      }
      // Red de seguridad: visible siempre a los 6s por si gsap/ST no cargaron
      setTimeout(function () { parts.forEach(function (p) { p.style.opacity = '1'; p.style.transform = 'none'; }); }, 6000);
    });
  }, 'splitText');

  /* ---- Reveal on scroll (elementos .reveal simples) ---- */
  safe(function () {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el, i) { el.style.transitionDelay = (i % 6 * 0.05) + 's'; io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 6000);
  }, 'reveal');

  /* ---- Clip-path image reveal (portrait) ---- */
  safe(function () {
    var els = document.querySelectorAll('[data-reveal-mask]');
    if (!els.length || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('is-revealed'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }, 'revealMask');

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

  /* ---- Halo hover (servicios) ---- */
  safe(function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.has-halo').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }, 'halo');

  /* ---- Magnetic buttons ---- */
  safe(function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var strength = parseFloat(el.dataset.magneticStrength || '0.3');
      var inner = document.createElement('span');
      inner.className = 'magnetic-inner';
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add('has-magnetic');
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        tx = ((e.clientX - r.left) - r.width / 2) * strength;
        ty = ((e.clientY - r.top) - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener('mouseleave', function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
      function loop() {
        cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
        inner.style.transform = 'translate3d(' + cx + 'px, ' + cy + 'px, 0)';
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }, 'magnetic');

  /* ---- Marquee infinito ---- */
  safe(function () {
    if (typeof gsap === 'undefined') return;
    document.querySelectorAll('[data-marquee]').forEach(function (track) {
      var clone = track.cloneNode(true);
      clone.removeAttribute('data-marquee');
      track.parentNode.appendChild(clone);
      var distance = track.scrollWidth;
      var speed = 55; // px/seg
      gsap.to([track, clone], {
        x: -distance, duration: distance / speed, ease: 'none', repeat: -1,
        modifiers: { x: gsap.utils.unitize(function (x) { return parseFloat(x) % distance; }) }
      });
    });
  }, 'marquee');

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

    // Giant number: leve escala de entrada
    var giant = document.querySelector('.giant-num');
    if (giant && hasST) {
      gsap.fromTo(giant, { scale: 0.85 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.giant', start: 'top bottom', end: 'top center', scrub: true } });
    }
  }, 'gsap');

})();
