/* ============================================================
   DRA. VALENTINA TORRES — JavaScript
   IIFE — vanilla JS, no dependencies, works on file:// and any host.
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Navbar scroll state ----
  var navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // ---- Hamburger ----
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
    Array.prototype.forEach.call(navLinks.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Calendly: hide placeholder if a real widget URL is configured ----
  window.addEventListener("load", function () {
    var widget = document.querySelector(".calendly-inline-widget");
    var placeholder = document.getElementById("calendly-placeholder");
    if (!widget || !placeholder) return;
    var url = (widget.dataset && widget.dataset.url) || "";
    if (url.indexOf("TU_USUARIO_CALENDLY") !== -1) {
      widget.style.display = "none";
      placeholder.style.display = "block";
    } else {
      placeholder.style.display = "none";
      widget.style.display = "block";
    }
  });

  // ---- Contact form ----
  var form = document.getElementById("contacto-form");
  var success = document.getElementById("c-success");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var btn = form.querySelector('[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = "Enviando…";
      btn.disabled = true;

      // Uncomment to use Formspree:
      // fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
      //   .then(function (res) { if (!res.ok) throw new Error(); showSuccess(); })
      //   .catch(function () { btn.textContent = "Error — Intentá de nuevo"; btn.disabled = false; });

      window.setTimeout(function () {
        showSuccess();
      }, 1000);

      function showSuccess() {
        form.classList.add("hidden");
        if (success) success.classList.remove("hidden");
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  // ---- Smooth scroll with fixed-nav offset ----
  Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = (navbar ? navbar.offsetHeight : 0) + 20;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
      }
    });
  });

  // ---- Reveal on scroll (low threshold + safety timeout, per gotcha checklist) ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });

    // Safety net: force-reveal anything still hidden after 2.5s (fonts/layout edge cases)
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }, 2500);
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Magnetic buttons (signature effect) ----
  if (!reduced && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var magnets = document.querySelectorAll("[data-magnetic]");
    magnets.forEach(function (el) {
      var strength = parseFloat(el.getAttribute("data-magnetic-strength")) || 0.2;
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = "translate(" + (x * strength) + "px, " + (y * strength) + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  // ---- Signature: cursor-following soft light (only on hover-capable pointers) ----
  if (!reduced && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var light = document.createElement("div");
    light.className = "cursor-light";
    light.setAttribute("aria-hidden", "true");
    document.body.appendChild(light);

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var currentX = targetX;
    var currentY = targetY;
    var rafPending = false;

    document.addEventListener("mousemove", function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(loop);
      }
    }, { passive: true });

    function loop() {
      // Exponential ease: current chases target — organic "candle in the room" feel
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      light.style.transform = "translate3d(" + (currentX - 310) + "px, " + (currentY - 310) + "px, 0)";
      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        requestAnimationFrame(loop);
      } else {
        rafPending = false;
      }
    }
    // Fade out during scroll (feels less busy on long pages)
    var scrollFadeTimer = null;
    window.addEventListener("scroll", function () {
      light.style.opacity = "0.4";
      window.clearTimeout(scrollFadeTimer);
      scrollFadeTimer = window.setTimeout(function () { light.style.opacity = "1"; }, 260);
    }, { passive: true });
  }

  // ---- Demo turnos slots (visual only, non-functional booking) ----
  Array.prototype.forEach.call(document.querySelectorAll(".demo-slot.available"), function (slot) {
    slot.setAttribute("role", "button");
    slot.setAttribute("tabindex", "0");
    slot.addEventListener("click", function () {
      window.location.hash = "turnos";
      var contactSection = document.getElementById("contacto");
      if (contactSection) {
        var offset = (navbar ? navbar.offsetHeight : 0) + 20;
        var top = contactSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
      }
    });
    slot.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        slot.click();
      }
    });
  });

})();
