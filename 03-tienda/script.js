/* ============================================================
   URBN STORE – JavaScript
   ============================================================ */

// ---- Catalog data ----
const PRODUCTS = [
  { id: 1,  name: 'Hoodie Oversized Negro',   cat: 'hoodies',    price: 18500, emoji: '👕', badge: 'new',  badgeText: 'Nuevo' },
  { id: 2,  name: 'Pantalón Cargo Kaki',       cat: 'pantalones', price: 22000, emoji: '👖', badge: 'new',  badgeText: 'Nuevo' },
  { id: 3,  name: 'Remera Básica Blanca',      cat: 'remeras',    price: 9800,  emoji: '👚', badge: 'sale', badgeText: '-20%', oldPrice: 12200 },
  { id: 4,  name: 'Campera Bomber Azul',       cat: 'camperas',   price: 35000, emoji: '🧥', badge: 'hot',  badgeText: '⭐ Hot' },
  { id: 5,  name: 'Remera Oversize Gris',      cat: 'remeras',    price: 11200, emoji: '👕', badge: null },
  { id: 6,  name: 'Buzo Canguro Verde',        cat: 'hoodies',    price: 16800, emoji: '🩱', badge: null },
  { id: 7,  name: 'Jean Slim Azul',            cat: 'pantalones', price: 24500, emoji: '👖', badge: 'sale', badgeText: '-15%', oldPrice: 28800 },
  { id: 8,  name: 'Campera Cortaviento',       cat: 'camperas',   price: 28000, emoji: '🧥', badge: 'new',  badgeText: 'Nuevo' },
  { id: 9,  name: 'Gorra Snapback',            cat: 'accesorios', price: 7500,  emoji: '🧢', badge: null },
  { id: 10, name: 'Riñonera Urbana',           cat: 'accesorios', price: 12000, emoji: '👜', badge: 'hot',  badgeText: '⭐ Hot' },
  { id: 11, name: 'Remera Gráfica Print',      cat: 'remeras',    price: 13500, emoji: '👕', badge: null },
  { id: 12, name: 'Pantalón Jogger Negro',     cat: 'pantalones', price: 19800, emoji: '👖', badge: null },
];

function formatPrice(n) {
  return '$' + n.toLocaleString('es-AR');
}

function buildProductCard(p) {
  const badge = p.badge
    ? `<div class="product-badges"><span class="badge ${p.badge}">${p.badgeText}</span></div>` : '';
  const oldPrice = p.oldPrice
    ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : '';
  return `
    <div class="product-card" data-id="${p.id}" data-cat="${p.cat}">
      <div class="product-img">
        <div class="product-img-placeholder">${p.emoji}</div>
        ${badge}
        <button class="quick-add" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">+ Agregar</button>
      </div>
      <div class="product-info">
        <p class="product-cat">${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</p>
        <h3>${p.name}</h3>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${oldPrice}
        </div>
      </div>
    </div>`;
}

function renderCatalog(filter = 'all') {
  const grid = document.getElementById('catalog-grid');
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(buildProductCard).join('');
  grid.querySelectorAll('.quick-add').forEach(btn => btn.addEventListener('click', onQuickAdd));
}

// ---- Cart State ----
let cart = [];

function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

function renderCart() {
  const itemsEl  = document.getElementById('cart-items');
  const emptyEl  = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  const countEl  = document.getElementById('cart-count');
  const totalEl  = document.getElementById('cart-total');
  const shippingEl = document.getElementById('cart-shipping');

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  countEl.textContent = totalItems;

  if (cart.length === 0) {
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)} × ${item.qty} = <strong>${formatPrice(item.price * item.qty)}</strong></div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" title="Eliminar">✕</button>
    </div>`).join('');

  itemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      cart = cart.filter(i => i.id !== +btn.dataset.id);
      renderCart();
    });
  });

  const total = getCartTotal();
  totalEl.textContent = formatPrice(total);
  shippingEl.textContent = total >= 15000
    ? '✅ ¡Envío gratis incluido!'
    : `Faltán ${formatPrice(15000 - total)} para envío gratis`;
}

function addToCart(id, name, price) {
  const emoji = PRODUCTS.find(p => p.id === id)?.emoji || '📦';
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ id, name, price, qty: 1, emoji }); }
  renderCart();
  openCart();
}

function onQuickAdd(e) {
  e.stopPropagation();
  const btn = e.currentTarget;
  addToCart(+btn.dataset.id, btn.dataset.name, +btn.dataset.price);
}

// ---- Cart open/close ----
function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('cart-btn').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

// ---- Filter tabs ----
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCatalog(btn.dataset.filter);
  });
});

// ---- Hamburger ----
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'));
});

// ---- Search ----
document.getElementById('search-toggle').addEventListener('click', () => {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) document.getElementById('search-input').focus();
});
document.getElementById('search-close').addEventListener('click', () => {
  document.getElementById('search-bar').classList.remove('open');
});

// ---- Newsletter ----
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  // Brevo: replace with actual API call or embed widget
  await new Promise(r => setTimeout(r, 1000));
  e.target.style.display = 'none';
  document.getElementById('nl-success').classList.remove('hidden');
});

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.querySelector('.navbar').offsetHeight + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

// ---- Animate on scroll ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.08 });

// ---- Init ----
renderCatalog();
renderCart();

// Animate new cards after render
setTimeout(() => {
  document.querySelectorAll('.product-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .4s ease ${i * 0.05}s, transform .4s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}, 50);
