/* ============================================================
   LUMINA — Casa de Iluminación — JavaScript
   👉 WhatsApp configurado: 5491151526104 (cambiar por el del cliente
      en index.html: enlaces wa.me y la constante de abajo).
   Classic script (no ES modules) — funciona también con file://
   ============================================================ */
(function () {
  "use strict";

  var WHATSAPP_NUMERO = "5491151526104";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, label) {
    try { fn(); } catch (err) {
      if (window.console && console.warn) console.warn("[Lumina] " + (label || "init") + " falló:", err);
    }
  }

  /* ---- Nav scroll + menú mobile ---- */
  function initNav() {
    var nav = document.getElementById("nav");
    var links = document.getElementById("links");
    var burger = document.getElementById("burger");
    if (!nav || !links || !burger) return;

    addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", scrollY > 20);
    }, { passive: true });

    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Pedido por WhatsApp ---- */
  window.pedir = function (nombre) {
    var texto = "Hola! Me interesa este producto de Lumina:\n\n*" + nombre + "*\n\n¿Tienen stock, colores y hacen envío?";
    window.open("https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(texto), "_blank");
  };

  /* ---- Product card glow pulse on consult click ----
     Delegated so it works regardless of inline onclick handlers. */
  function initProdPulse() {
    if (prefersReduced) return;
    var grid = document.querySelector(".prod-grid");
    if (!grid) return;
    grid.addEventListener("click", function (e) {
      var trigger = e.target.closest(".btn-wsp");
      if (!trigger) return;
      var card = trigger.closest(".prod");
      if (!card) return;
      card.classList.remove("glow-pulse");
      void card.offsetWidth;
      card.classList.add("glow-pulse");
      setTimeout(function () { card.classList.remove("glow-pulse"); }, 800);
    });
  }

  /* ---- Botón Mercado Pago (DEMO — no cobra) ----
     Para activar pagos reales, usar ~/Dev/plantillas/mercadopago/ */
  window.mpDemo = function () {
    var prev = document.getElementById("mp-demo-toast");
    if (prev) prev.remove();
    var t = document.createElement("div");
    t.id = "mp-demo-toast";
    t.className = "mp-toast";
    t.setAttribute("role", "status");
    var isEn = window.__luminaLang === "en";
    t.innerHTML = isEn
      ? '<div class="mp-toast-body"><strong>Payment demo</strong><br>' +
        'On the live site, this button opens the secure <b>Mercado Pago</b> checkout ' +
        '(card, debit, account balance or cash).</div>' +
        '<button type="button" class="mp-toast-close" aria-label="Close notice">×</button>'
      : '<div class="mp-toast-body"><strong>Demo de pago</strong><br>' +
        'En el sitio real, este botón abre el checkout seguro de <b>Mercado Pago</b> ' +
        '(tarjeta, débito, dinero en cuenta o efectivo).</div>' +
        '<button type="button" class="mp-toast-close" aria-label="Cerrar aviso">×</button>';
    document.body.appendChild(t);
    var close = function () {
      t.style.opacity = "0";
      setTimeout(function () { if (t.parentNode) t.remove(); }, 300);
    };
    t.querySelector(".mp-toast-close").addEventListener("click", close);
    // Escape key closes too — small quality-of-life for keyboard users.
    var onKey = function (e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); } };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(function () { t.style.opacity = "1"; });
  };

  /* ---- Signature: mouse-follow glow ----
     Radial spotlight that trails the cursor (global) + localized glow
     on product/category cards. Gated to fine pointers with hover. */
  function initCursorGlow() {
    if (!canHover) return;
    var glow = document.getElementById("cursorGlow");
    var root = document.documentElement;
    var raf = null;
    var mx = 0.5, my = 0.2;

    function apply() {
      root.style.setProperty("--mx", (mx * 100) + "%");
      root.style.setProperty("--my", (my * 100) + "%");
      raf = null;
    }
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX / innerWidth;
      my = e.clientY / innerHeight;
      if (glow) glow.classList.add("active");
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    window.addEventListener("mouseleave", function () {
      if (glow) glow.classList.remove("active");
    });

    var glowCards = document.querySelectorAll("[data-glow]");
    glowCards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var lx = ((e.clientX - rect.left) / rect.width) * 100;
        var ly = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", lx + "%");
        card.style.setProperty("--my", ly + "%");
      }, { passive: true });
    });
  }

  /* ---- Hero lamp: subtle "look at cursor" tilt (drag-to-rotate feel) ---- */
  function initLampTilt() {
    if (!canHover || prefersReduced) return;
    var hero = document.querySelector(".hero");
    var rig = document.getElementById("lampRig");
    if (!hero || !rig) return;
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var tilt = (relX * 14).toFixed(2) + "deg";
      rig.style.setProperty("--tiltY", tilt);
    }, { passive: true });
    hero.addEventListener("mouseleave", function () {
      rig.style.setProperty("--tiltY", "0deg");
    });
  }

  /* ---- Hero lamp: scroll-driven parallax. As user scrolls out of the hero,
     the cord extends and the whole rig sinks, giving the illusion that the
     ceiling stays fixed while the viewport moves away. GSAP ScrollTrigger only. */
  function initLampParallax() {
    if (prefersReduced) return;
    if (!window.gsap || !window.ScrollTrigger) return;
    var hero = document.querySelector(".hero");
    var rig = document.getElementById("lampRig");
    var cord = document.querySelector(".lamp-cord");
    var floor = document.querySelector(".lamp-floor-glow");
    if (!hero || !rig || !cord) return;
    // Wait a beat so the lights-on choreography reaches steady state
    // before we start pinning scroll transforms on top of it.
    // Parallax the wrapper (not .hero-lamp-rig which has the sway keyframe).
    // As the hero scrolls off, the whole lamp sinks — reads as "the ceiling
    // stays put while the viewport moves away".
    var lampWrap = document.querySelector(".hero-lamp");
    if (!lampWrap) return;
    setTimeout(function () {
      gsap.to(lampWrap, {
        y: 90,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6
        }
      });
      ScrollTrigger.refresh();
    }, 1500);
  }

  /* ---- Reveal on scroll: GSAP ScrollTrigger with IntersectionObserver fallback ---- */
  function initReveal() {
    var items = document.querySelectorAll(".rv");
    if (!items.length) return;

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      // Strip the CSS transition on .rv (meant for the IO fallback) so it doesn't
      // fight GSAP's per-frame inline style updates.
      items.forEach(function (el) { el.style.transition = "none"; });
      // Differentiate the reveal by element type — categorías slide from left,
      // products scale up from below, contact rows slide from right, everything
      // else keeps the default fade+up. Cuts the uniform-reveal AI tell.
      items.forEach(function (el, i) {
        var from = { opacity: 0 };
        var duration = prefersReduced ? 0.2 : 0.7;
        var ease = "power2.out";
        if (prefersReduced) {
          from.x = 0; from.y = 0; from.scale = 1;
        } else if (el.classList.contains("cat")) {
          from.x = -20; from.y = 0;
          ease = "power3.out";
        } else if (el.classList.contains("prod")) {
          from.y = 30; from.scale = 0.96;
          from.transformOrigin = "center bottom";
          duration = 0.8;
          ease = "power3.out";
        } else if (el.classList.contains("crow")) {
          from.x = 24; from.y = 0;
          ease = "power2.out";
        } else {
          from.y = 22;
        }
        var to = {
          opacity: 1, x: 0, y: 0, scale: 1,
          duration: duration,
          delay: (i % 5) * 0.05,
          ease: ease,
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        };
        gsap.fromTo(el, from, to);
      });
      // Safety net: if the rAF ticker stalls (backgrounded/prerendered tab),
      // force everything visible after 4s so content is never stuck hidden.
      // Reset all transform axes because the variants use x, y, and scale.
      setTimeout(function () {
        items.forEach(function (el) {
          var op = parseFloat(getComputedStyle(el).opacity);
          if (op < 1) { gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 }); }
        });
      }, 4000);
      return;
    }

    // Fallback: no GSAP available (offline / blocked) — plain IntersectionObserver
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = ((i % 5) * 0.05) + "s";
      io.observe(el);
    });
    // Safety net: reveal anything still hidden after 6s (fonts/assets slow to load)
    setTimeout(function () {
      items.forEach(function (el) { el.classList.add("in"); });
    }, 6000);
  }

  /* ---- Smooth scroll for in-page anchors ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var href = a.getAttribute("href");
        if (!href || href === "#") return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + scrollY - 70;
        scrollTo({ top: top, behavior: prefersReduced ? "auto" : "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    safe(initNav, "nav");
    safe(initCursorGlow, "cursorGlow");
    safe(initLampTilt, "lampTilt");
    safe(initLampParallax, "lampParallax");
    safe(initProdPulse, "prodPulse");
    safe(initReveal, "reveal");
    safe(initSmoothScroll, "smoothScroll");
  });
})();
