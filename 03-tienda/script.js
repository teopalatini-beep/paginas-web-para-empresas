/* ============================================================
   URBN STORE – JavaScript
   ============================================================ */

/* ---- Botón de pago Mercado Pago (DEMO — no cobra) ----
   Muestra un aviso de demostración. Para activar pagos reales,
   usar la plantilla en ~/Dev/plantillas/mercadopago/ */
function mpDemo() {
  document.getElementById('mp-demo-toast')?.remove();
  const t = document.createElement('div');
  t.id = 'mp-demo-toast';
  t.innerHTML = '<strong>🔒 Demo de pago</strong><br>En el sitio real, este botón abre el checkout seguro de <b>Mercado Pago</b> (tarjeta, débito, dinero en cuenta o efectivo).';
  Object.assign(t.style, {
    position: 'fixed', left: '50%', bottom: '28px', transform: 'translateX(-50%)',
    maxWidth: '360px', background: '#fff', color: '#1a1a2e',
    borderLeft: '5px solid #009EE3', borderRadius: '12px', padding: '16px 20px',
    boxShadow: '0 12px 40px rgba(0,0,0,.25)', font: '14px/1.55 system-ui, sans-serif',
    zIndex: '99999', opacity: '0', transition: 'opacity .3s ease',
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; });
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 4500);
}

// ---- Catalog data ----
const PRODUCTS = [
  { id: 1,  name: 'Hoodie Oversized Negro',   cat: 'hoodies',    price: 18500, img: '1556821840-3a63f95609a7', badge: 'new',  badgeText: 'Nuevo' },
  { id: 2,  name: 'Pantalón Cargo Kaki',       cat: 'pantalones', price: 22000, img: '1473966968600-fa801b869a1a', badge: 'new',  badgeText: 'Nuevo' },
  { id: 3,  name: 'Remera Básica Blanca',      cat: 'remeras',    price: 9800,  img: '1521572163474-6864f9cf17ab', badge: 'sale', badgeText: '-20%', oldPrice: 12200 },
  { id: 4,  name: 'Campera Bomber Azul',       cat: 'camperas',   price: 35000, img: '1551028719-00167b16eac5', badge: 'hot',  badgeText: '★ Hot' },
  { id: 5,  name: 'Remera Oversize Gris',      cat: 'remeras',    price: 11200, img: '1576566588028-4147f3842f27', badge: null },
  { id: 6,  name: 'Buzo Canguro Verde',        cat: 'hoodies',    price: 16800, img: '1620799140408-edc6dcb6d633', badge: null },
  { id: 7,  name: 'Jean Slim Azul',            cat: 'pantalones', price: 24500, img: '1542272604-787c3835535d', badge: 'sale', badgeText: '-15%', oldPrice: 28800 },
  { id: 8,  name: 'Campera Cortaviento',       cat: 'camperas',   price: 28000, img: '1591047139829-d91aecb6caea', badge: 'new',  badgeText: 'Nuevo' },
  { id: 9,  name: 'Gorra Snapback',            cat: 'accesorios', price: 7500,  img: '1588850561407-ed78c282e89b', badge: null },
  { id: 10, name: 'Riñonera Urbana',           cat: 'accesorios', price: 12000, img: '1553062407-98eeb64c6a62', badge: 'hot',  badgeText: '★ Hot' },
  { id: 11, name: 'Remera Gráfica Print',      cat: 'remeras',    price: 13500, img: '1503341504253-dff4815485f1', badge: null },
  { id: 12, name: 'Pantalón Jogger Negro',     cat: 'pantalones', price: 19800, img: '1552902865-b72c031ac5ea', badge: null },
];
const imgUrl = (id) => `https://images.unsplash.com/photo-${id}?w=600&q=80`;

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
        <div class="product-img-photo" style="background-image:url('${imgUrl(p.img)}')" role="img" aria-label="${p.name}"></div>
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
      <div class="cart-item-img" style="background-image:url('${imgUrl(item.img)}')"></div>
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
  const img = PRODUCTS.find(p => p.id === id)?.img || '';
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ id, name, price, qty: 1, img }); }
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
