/* ============================================================
   URBN STORE — JavaScript
   Archetype 05 (Mouse-Reactive Gradient): mouse gradient mesh,
   vertical expandable product rows, count-up stats, cart drawer.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Botón de pago Mercado Pago (DEMO — no cobra) ----
     Muestra un aviso de demostración. Para activar pagos reales,
     usar la plantilla en ~/Dev/plantillas/mercadopago/ */
  window.mpDemo = function mpDemo() {
    var existing = document.getElementById('mp-demo-toast');
    if (existing) existing.remove();
    var t = document.createElement('div');
    t.id = 'mp-demo-toast';
    t.setAttribute('role', 'status');
    t.innerHTML = '<strong>Demo de pago</strong><br>En el sitio real, este botón abre el checkout seguro de <b>Mercado Pago</b> (tarjeta, débito, dinero en cuenta o efectivo).';
    Object.assign(t.style, {
      position: 'fixed', left: '50%', bottom: '28px', transform: 'translateX(-50%)',
      maxWidth: '360px', background: '#f5f4f0', color: '#0a0a0a',
      borderLeft: '5px solid #009EE3', borderRadius: '10px', padding: '16px 20px',
      boxShadow: '0 14px 46px rgba(0,0,0,.5)', font: "14px/1.55 'JetBrains Mono', monospace",
      zIndex: '99999', opacity: '0', transition: 'opacity .3s ease',
    });
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; });
    setTimeout(function () {
      t.style.opacity = '0';
      setTimeout(function () { t.remove(); }, 300);
    }, 4500);
  };

  /* ---- Mouse-reactive gradient (hero) ---- */
  (function initMouseGradient() {
    if (!hasFinePointer || reduceMotion) return;
    var root = document.documentElement;
    var hero = document.getElementById('hero');
    if (!hero) return;
    var ticking = false;
    var lastX = 50, lastY = 40;

    function apply() {
      root.style.setProperty('--mx', lastX + '%');
      root.style.setProperty('--my', lastY + '%');
      ticking = false;
    }

    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      lastX = ((e.clientX - rect.left) / rect.width) * 100;
      lastY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    });
  })();

  /* ---- Catalog data (contenido real preservado) ---- */
  var PRODUCTS = [
    { id: 1, name: 'Hoodie Oversized Negro', cat: 'hoodies', price: 18500, badge: 'new', badgeText: 'Nuevo', colors: ['#111111', '#6b6b80'], desc: 'Algodón pesado 350gsm, capucha forrada, calce oversized.' },
    { id: 2, name: 'Pantalón Cargo Kaki', cat: 'pantalones', price: 22000, badge: 'new', badgeText: 'Nuevo', colors: ['#8b7355', '#111111'], desc: 'Cargo de gabardina resistente con bolsillos utilitarios.' },
    { id: 3, name: 'Remera Básica Blanca', cat: 'remeras', price: 9800, badge: 'sale', badgeText: '-20%', oldPrice: 12200, desc: 'Algodón peinado 100%, corte recto, básico infaltable.' },
    { id: 4, name: 'Campera Bomber Azul', cat: 'camperas', price: 35000, badge: 'hot', badgeText: 'Hot', desc: 'Bomber con forro acolchado y puños elastizados.' },
    { id: 5, name: 'Remera Oversize Gris', cat: 'remeras', price: 11200, badge: null, desc: 'Calce oversize, cuello reforzado, tela premium.' },
    { id: 6, name: 'Buzo Canguro Verde', cat: 'hoodies', price: 16800, badge: null, desc: 'Buzo canguro con bolsillo frontal y puños rib.' },
    { id: 7, name: 'Jean Slim Azul', cat: 'pantalones', price: 24500, badge: 'sale', badgeText: '-15%', oldPrice: 28800, desc: 'Denim stretch, calce slim, lavado medio.' },
    { id: 8, name: 'Campera Cortaviento', cat: 'camperas', price: 28000, badge: 'new', badgeText: 'Nuevo', desc: 'Impermeable liviana, ideal para media estación.' },
    { id: 9, name: 'Gorra Snapback', cat: 'accesorios', price: 7500, badge: null, desc: 'Gorra plana ajustable, bordado frontal URBN.' },
    { id: 10, name: 'Riñonera Urbana', cat: 'accesorios', price: 12000, badge: 'hot', badgeText: 'Hot', desc: 'Riñonera resistente al agua con compartimentos.' },
    { id: 11, name: 'Remera Gráfica Print', cat: 'remeras', price: 13500, badge: null, desc: 'Estampado a gran escala, algodón grueso.' },
    { id: 12, name: 'Pantalón Jogger Negro', cat: 'pantalones', price: 19800, badge: null, desc: 'Jogger con puño elastizado y bolsillos laterales.' },
  ];

  function formatPrice(n) {
    return '$' + n.toLocaleString('es-AR');
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  var expandedCounter = 0;

  function buildRow(p, index) {
    var badge = p.badge
      ? '<span class="badge ' + p.badge + '">' + p.badgeText + '</span>' : '';
    var oldPrice = p.oldPrice
      ? '<span class="old tnum">' + formatPrice(p.oldPrice) + '</span>' : '';
    var colors = (p.colors || []).map(function (c) {
      return '<span class="color-dot" style="background:' + c + '"></span>';
    }).join('');
    var uid = 'row-' + p.id + '-' + (expandedCounter++);
    var toggleId = 'toggle-' + uid;
    var detailId = 'detail-' + uid;

    var li = document.createElement('li');
    li.className = 'product-row';
    li.dataset.cat = p.cat;
    li.dataset.price = p.price;
    li.dataset.id = p.id;
    li.innerHTML =
      '<button class="product-row-toggle" id="' + toggleId + '" aria-expanded="false" aria-controls="' + detailId + '">' +
        '<span class="product-row-index tnum">' + pad(index + 1) + '</span>' +
        '<span class="product-row-name-wrap">' +
          '<span class="product-row-name">' + p.name + '</span>' +
          '<span class="product-row-cat">' + p.cat.charAt(0).toUpperCase() + p.cat.slice(1) + '</span>' +
        '</span>' +
        '<span class="product-row-badges">' + badge + '</span>' +
        '<span class="product-row-price"><span class="price tnum">' + formatPrice(p.price) + '</span>' + oldPrice + '</span>' +
        '<span class="product-row-icon" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></span>' +
      '</button>' +
      '<div class="product-row-detail-wrap" id="' + detailId + '-wrap">' +
        '<div class="product-row-detail" id="' + detailId + '" role="region" aria-labelledby="' + toggleId + '">' +
          '<div class="product-row-detail-inner">' +
            '<p class="product-row-desc">' + p.desc + '</p>' +
            '<div class="product-row-actions">' +
              (colors ? '<div class="product-colors">' + colors + '</div>' : '') +
              '<button class="quick-add" type="button" data-id="' + p.id + '" data-name="' + p.name + '" data-price="' + p.price + '">Agregar al carrito</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var toggle = li.querySelector('.product-row-toggle');
    var wrap = li.querySelector('.product-row-detail-wrap');
    if ('inert' in wrap) wrap.inert = true;

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      wrap.classList.toggle('open', !isOpen);
      if ('inert' in wrap) wrap.inert = isOpen;
    });

    li.querySelector('.quick-add').addEventListener('click', function (e) {
      e.stopPropagation();
      addToCart(p.id, p.name, p.price);
    });

    return li;
  }

  function renderList(container, products) {
    container.innerHTML = '';
    var frag = document.createDocumentFragment();
    products.forEach(function (p, i) { frag.appendChild(buildRow(p, i)); });
    container.appendChild(frag);
  }

  function renderCatalog(filter, sort) {
    var grid = document.getElementById('catalog-list');
    if (!grid) return;
    var list = filter === 'all' || !filter ? PRODUCTS.slice() : PRODUCTS.filter(function (p) { return p.cat === filter; });

    if (sort === 'price-asc') list.sort(function (a, b) { return a.price - b.price; });
    else if (sort === 'price-desc') list.sort(function (a, b) { return b.price - a.price; });
    else if (sort === 'new') list.sort(function (a, b) { return (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0); });

    renderList(grid, list);
  }

  function renderNuevos() {
    var el = document.getElementById('nuevos-list');
    if (!el) return;
    var nuevos = PRODUCTS.filter(function (p) { return p.badge === 'new' || p.badge === 'hot'; }).slice(0, 4);
    renderList(el, nuevos);
  }

  /* ---- Cart State ---- */
  var cart = [];

  function getCartTotal() { return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0); }

  function renderCart() {
    var itemsEl = document.getElementById('cart-items');
    var emptyEl = document.getElementById('cart-empty');
    var footerEl = document.getElementById('cart-footer');
    var countEl = document.getElementById('cart-count');
    var totalEl = document.getElementById('cart-total');
    var shippingEl = document.getElementById('cart-shipping');
    var cartBtn = document.getElementById('cart-btn');

    var totalItems = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    countEl.textContent = totalItems;
    if (cartBtn) cartBtn.setAttribute('aria-label', 'Abrir carrito, ' + totalItems + ' productos');

    if (cart.length === 0) {
      emptyEl.style.display = 'flex';
      footerEl.style.display = 'none';
      itemsEl.innerHTML = '';
      itemsEl.appendChild(emptyEl);
      return;
    }

    emptyEl.style.display = 'none';
    footerEl.style.display = 'block';

    itemsEl.innerHTML = cart.map(function (item) {
      return (
        '<div class="cart-item">' +
          '<div class="cart-item-swatch" aria-hidden="true">' + item.name.charAt(0) + '</div>' +
          '<div class="cart-item-info">' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-price tnum">' + formatPrice(item.price) + ' × ' + item.qty + ' = <strong>' + formatPrice(item.price * item.qty) + '</strong></div>' +
          '</div>' +
          '<button class="cart-item-remove" data-id="' + item.id + '" aria-label="Eliminar ' + item.name + ' del carrito">✕</button>' +
        '</div>'
      );
    }).join('');

    itemsEl.querySelectorAll('.cart-item-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        cart = cart.filter(function (i) { return i.id !== +btn.dataset.id; });
        renderCart();
      });
    });

    var total = getCartTotal();
    totalEl.textContent = formatPrice(total);
    shippingEl.textContent = total >= 15000
      ? 'Envío gratis incluido'
      : 'Faltan ' + formatPrice(15000 - total) + ' para envío gratis';
  }

  function addToCart(id, name, price) {
    var existing = cart.find(function (i) { return i.id === id; });
    if (existing) existing.qty++;
    else cart.push({ id: id, name: name, price: price, qty: 1 });
    renderCart();
    openCart();
  }

  function openCart() {
    document.getElementById('cart-drawer').classList.add('open');
    document.getElementById('cart-drawer').setAttribute('aria-hidden', 'false');
    document.getElementById('cart-overlay').classList.add('open');
    document.getElementById('cart-btn').setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-drawer').setAttribute('aria-hidden', 'true');
    document.getElementById('cart-overlay').classList.remove('open');
    document.getElementById('cart-btn').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCart();
  });

  /* ---- Filter tabs + sort ---- */
  var currentFilter = 'all';
  var currentSort = 'default';
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); b.removeAttribute('aria-current'); });
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'true');
      currentFilter = btn.dataset.filter;
      renderCatalog(currentFilter, currentSort);
    });
  });
  var sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      currentSort = sortSelect.value;
      renderCatalog(currentFilter, currentSort);
    });
  }

  /* ---- Hamburger ---- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  hamburger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Search ---- */
  var searchToggle = document.getElementById('search-toggle');
  var searchBar = document.getElementById('search-bar');
  searchToggle.addEventListener('click', function () {
    var open = searchBar.classList.toggle('open');
    searchToggle.setAttribute('aria-expanded', String(open));
    if (open) document.getElementById('search-input').focus();
  });
  document.getElementById('search-close').addEventListener('click', function () {
    searchBar.classList.remove('open');
    searchToggle.setAttribute('aria-expanded', 'false');
  });

  /* ---- Newsletter ---- */
  var nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = e.target.querySelector('button');
      btn.textContent = 'Enviando…';
      btn.disabled = true;
      // Brevo: replace with actual API call or embed widget
      setTimeout(function () {
        e.target.style.display = 'none';
        document.getElementById('nl-success').classList.remove('hidden');
      }, 900);
    });
  }

  /* ---- Smooth scroll offset for sticky nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length < 2) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = document.querySelector('.navbar').offsetHeight + document.querySelector('.announcement-bar').offsetHeight + 8;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ---- Count-up stats ---- */
  function initCountUp() {
    var nodes = document.querySelectorAll('[data-count-to]');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window) || reduceMotion) {
      nodes.forEach(function (n) { n.textContent = n.getAttribute('data-count-to'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var to = parseFloat(el.getAttribute('data-count-to'));
        var start = null;
        var duration = 1100;
        function step(ts) {
          if (start === null) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * to);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = to;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.05 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    document.documentElement.classList.add('js-anim');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
    // Safety net: ensure everything is visible even if IO misfires
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
    }, 4500);
  }

  /* ---- Init ---- */
  renderNuevos();
  renderCatalog();
  renderCart();
  initCountUp();
  initReveal();
})();
