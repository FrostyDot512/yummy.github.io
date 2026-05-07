/* ============================================================
   YUMMY BAKERY — app.js  (refactored)
   Changes:
   - Removed particle canvas animation (performance)
   - Removed confetti canvas (rarely used, expensive)
   - Removed fake 2.2s loader delay → hides on actual load
   - Removed counter animation (plain values in HTML instead)
   - Menu cards now always show ingredients (no hover-only)
   - Modal shows total price (unit × qty) in real-time
   - Modal has direct "Order on WhatsApp" shortcut
   - WhatsApp messages improved: cleaner format, proper encoding
   - Cake builder WhatsApp message standardised
   - Review stars varied (not all 5★) for authenticity
   - Corner logo floating animation removed
   - Glow classes removed from non-critical buttons
   ============================================================ */

'use strict';

// ============================================================
// DATA
// ============================================================

const menuItems = [
  { id:1,  name:'Jams',                  emoji:'🍯', img:'jams.png',                   category:'bread',    price:45000, desc:'Smooth, golden fruit jam sealed fresh for a naturally sweet spread', ingredients:['Fresh Fruits','Sugar','Pectin','Lemon Juice'], best:true },
  { id:2,  name:'Tiramisu Cake',         emoji:'🎂', img:'tiramisu.png',               category:'cakes',    price:55000, desc:'Classic Italian layers of mascarpone & espresso', ingredients:['Mascarpone','Espresso','Ladyfingers','Cocoa'], best:false },
  { id:3,  name:'Chocolate Fudge Cake',  emoji:'🍫', img:'chocolate fudge.png',        category:'cakes',    price:50000, desc:'Rich dark chocolate ganache, fudge-filled layers', ingredients:['Dark Chocolate','Ganache','Butter','Eggs'], best:true },
  { id:4,  name:'White Forest Cake',     emoji:'🎂', img:'white forest cake.png',      category:'cakes',    price:38000, desc:'Light vanilla sponge layered with whipped cream and white chocolate', ingredients:['Flour','Eggs','Butter','Whipped Cream','White Chocolate'], best:false },
  { id:5,  name:'Brownie Bites',         emoji:'🍪', img:'brownie bites.png',          category:'bread',    price:18000, desc:'The perfect box of treats for any occasion', ingredients:['Chocolate','Butter','Sugar','Eggs','Flour','Cocoa'], best:true },
  { id:6,  name:'KitKat Ice-Cream',      emoji:'🍫', img:'kit kat ice-cream.png',      category:'gelato',   price:15000, desc:'Creamy chocolate ice cream loaded with crunchy KitKat pieces', ingredients:['Milk','Cream','Sugar','Cocoa','KitKat'], best:false },
  { id:7,  name:'Pretzel',               emoji:'🥨', img:'pretzel.png',                category:'bread',    price:16000, desc:'Soft golden pretzel with sea salt crust', ingredients:['Flour','Baking Soda','Butter','Sea Salt'], best:false },
  { id:8,  name:'Butter Croissant',      emoji:'🥐', img:'croissant .png',             category:'pastries', price:8000,  desc:'Flaky, golden, 72-hour laminated dough', ingredients:['Butter','Flour','Yeast','Milk'], best:true },
  { id:9,  name:'Cinnamon Roll',         emoji:'🥧', img:'Raisins and cinnamon Danish.png', category:'pastries', price:9000, desc:'Warm swirls drizzled with vanilla glaze', ingredients:['Cinnamon','Cream Cheese Glaze','Dough','Brown Sugar'], best:false },
  { id:10, name:'Fresh Donuts',          emoji:'🍩', img:'Fresh Donuts.png',           category:'pastries', price:10000, desc:'Fluffy glazed donuts topped with rich icing and sprinkles', ingredients:['Dark Chocolate','Croissant Dough','Butter'], best:false },
  { id:11, name:'White Chocolate Ice-cream', emoji:'🍦', img:'white chocolate icecream.png', category:'gelato', price:12000, desc:'Creamy white chocolate ice cream with a smooth, velvety sweetness', ingredients:['Milk','Cream','Sugar','White Chocolate','Vanilla'], best:true },
  { id:12, name:'Oreo Ice Cream',        emoji:'🍪', img:'Oreo flavor Icecream.png',  category:'gelato',   price:13000, desc:'Cookies & cream gelato with whole Oreos on top', ingredients:['Oreos','Vanilla Cream','Dark Chocolate','Milk'], best:true },
  { id:13, name:'Truffles',              emoji:'🍫', img:'truffles.png',               category:'bread',    price:11000, desc:'Decadent chocolate truffles coated in sprinkles and coconut flakes', ingredients:['Chocolate','Cream','Butter','Cocoa'], best:true },
  { id:14, name:'Ice-Cream Coffee',      emoji:'🍦', img:'ICE CREAM COFFEE.png',       category:'drinks',   price:10000, desc:'Chilled espresso with a scoop of vanilla gelato', ingredients:['Espresso','Ice','Vanilla Gelato','Sugar Syrup'], best:true },
  { id:15, name:'Milkshake',             emoji:'🥤', img:'milkshake.png',              category:'drinks',   price:14000, desc:'Thick creamy shake topped with a praline crisp', ingredients:['Milk','Ice Cream','Cream','Vanilla'], best:true },
  { id:16, name:'Latte Macchiato',       emoji:'☕', img:'latte macchiato.png',        category:'drinks',   price:9000,  desc:'Layered espresso and silky steamed milk', ingredients:['Espresso','Steamed Milk','Milk Foam'], best:false },
  { id:17, name:'Flavoured Coffee',      emoji:'☕', img:'moreCoffee.png',             category:'drinks',   price:11000, desc:'Monin caramel or hazelnut syrup latte', ingredients:['Espresso','Monin Syrup','Steamed Milk','Cream'], best:false },
];

const gelatoFlavours = [
  { name:'Vanilla',       emoji:'🍦', img:'ice-cream.png',             colour:'#FFF8B0', desc:'Madagascar vanilla bean',       ingredients:'Cream, Vanilla Bean, Sugar',     best:true  },
  { name:'Chocolate',     emoji:'🍫', img:null,                        colour:'#4A2C1A', desc:'Belgian dark chocolate',        ingredients:'Dark Chocolate, Cream, Cocoa',   best:false },
  { name:'Strawberry',    emoji:'🍓', img:'ice-cream.png',             colour:'#FFD6D6', desc:'Fresh seasonal berries',        ingredients:'Strawberries, Cream, Sugar',     best:true  },
  { name:'Salted Caramel',emoji:'🍮', img:null,                        colour:'#D4A843', desc:'Sea salt & caramel swirl',      ingredients:'Caramel, Sea Salt, Cream',       best:false },
  { name:'Pistachio',     emoji:'🌿', img:'ice-cream.png',             colour:'#C8E6C9', desc:'Sicilian pistachio paste',      ingredients:'Pistachios, Milk, Sugar',        best:true  },
  { name:'Mango',         emoji:'🥭', img:'ice-cream.png',             colour:'#FFE0A0', desc:'Tropical Ugandan mango',        ingredients:'Fresh Mango, Lemon, Sugar',      best:true  },
  { name:'Coffee',        emoji:'☕', img:'ICE_CREAM_COFFEE.png',      colour:'#8B5E3C', desc:'Double-shot espresso cream',    ingredients:'Espresso, Cream, Sugar',         best:false },
  { name:'Cookies & Cream',emoji:'🍪', img:'Oreo_flavor_Icecream.png', colour:'#F0EDE8', desc:'Crushed Oreos & vanilla',      ingredients:'Oreos, Vanilla Cream, Milk',     best:true  },
  { name:'Passion Fruit', emoji:'🌺', img:'ice-cream.png',             colour:'#FFC0CB', desc:'Tangy tropical sorbet',         ingredients:'Passion Fruit, Sugar, Lime',     best:false },
  { name:'Coconut',       emoji:'🥥', img:null,                        colour:'#F0F8E8', desc:'Creamy tropical coconut',       ingredients:'Coconut Milk, Cream, Sugar',     best:false },
];

// Reviews with varied star ratings for authenticity (not all 5★)
const reviews = [
  { text:'The best sourdough bread in Kampala, hands down. That crust! Perfectly chewy inside. I come every Saturday morning.', stars:5, name:'Amara K.', location:'Ggaba, Kampala', avatar:'A', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Ordered a custom Red Velvet birthday cake and it was absolutely stunning. Everyone at the party loved it! Will order again.', stars:5, name:'James O.', location:'Ntinda, Kampala', avatar:'J', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'The gelato selection is insane. Salted Caramel is my go-to. Super creamy, not too sweet. Love this place!', stars:5, name:'Priya M.', location:'Kololo, Kampala', avatar:'P', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Great variety of pastries. The croissants are buttery and flaky — just like in Paris. Nice spot to work from too.', stars:4, name:'David N.', location:'Bugolobi, Kampala', avatar:'D', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Yummy is my weekend ritual. Coffee + cinnamon roll = perfect morning. Friendly staff, beautiful ambiance.', stars:5, name:'Sarah W.', location:'Ggaba, Kampala', avatar:'S', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'The Tiramisu cake was heavenly. Rich, perfectly balanced, and the custom message was beautifully piped. 10/10!', stars:5, name:'Ibrahim T.', location:'Makindye, Kampala', avatar:'I', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Cookies & Cream gelato is dangerously good. The whole Oreo on top is such a nice touch. My kids love it!', stars:5, name:'Grace N.', location:'Naguru, Kampala', avatar:'G', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Stopped in for coffee and ended up buying bread, pretzels and a cake slice. The flavoured lattes are excellent.', stars:4, name:'Michael A.', location:'Muyenga, Kampala', avatar:'M', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'The milkshake at Yummy is one of the best I have had. Thick, creamy and beautifully presented. Highly recommend.', stars:5, name:'Fatuma R.', location:'Bukoto, Kampala', avatar:'F', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Palm Village Mall location has a great vibe. Perfect spot for a date or catching up with friends over pastries.', stars:5, name:'Brian K.', location:'Kisugu, Kampala', avatar:'B', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
];

const spinOptions = [
  { emoji:'🍰', name:'Jams', desc:'Smooth, golden fruit jam sealed fresh for a naturally sweet spread', img:'jams.png' },
  { emoji:'🥐', name:'Butter Croissant', desc:'Golden, flaky, and absolutely worth it.', img:'croissant .png' },
  { emoji:'🍦', name:'Coffee and Coconut', desc:'Sweet meets salty in the best way.', img:'Coffee and Coconut.png' },
  { emoji:'☕', name:'Latte Macchiato', desc:'The perfect afternoon pick-me-up.', img:'latte macchiato.png' },
  { emoji:'🎂', name:'Tiramisu Cake Slice', desc:'Italy meets Kampala in one bite.', img:'tiramisu.png' },
  { emoji:'🍫', name:'Chocolate Fudge Cake', desc:'Chocolate therapy — highly recommended.', img:'chocolate fudge.png' },
  { emoji:'🥨', name:'Pretzel', desc:'Warm, salty, and dangerously good.', img:'pretzel.png' },
  { emoji:'🥭', name:'Fresh Baked Bread', desc:'Fresh out the oven, and ready to enjoy', img:'more bread.png' },
  { emoji:'🍦', name:'Gelato', desc:'Rich, slow-churned Italian-style gelato in every scoop', img:'galato.png' },
  { emoji:'🍪', name:'Oreo Ice Cream', desc:'Cookies & cream heaven in a tub.', img:'Oreo flavor Icecream.png' },
];

// ============================================================
// GLOBAL STATE
// ============================================================
// Cart uses sessionStorage so it resets automatically when the browser is closed.
// Favorites and saved cake still persist in localStorage.
let cart = [];
try { cart = JSON.parse(sessionStorage.getItem('yummy_cart') || '[]'); } catch(_) { cart = []; }
let favorites = JSON.parse(localStorage.getItem('yummy_favorites') || '[]');
let savedCake = JSON.parse(localStorage.getItem('yummy_cake') || 'null');
let currentModal = null;
let modalQty = 1;
let reviewIdx = 0;
let reviewAutoTimer;

const builderState = {
  flavour:  { val: 'Red Velvet',   price: 5000  },
  size:     { val: '6"',           price: 30000 },
  layers:   { val: '1 Layer',      price: 0     },
  frosting: { val: 'Buttercream',  price: 0     },
  toppings: [],
  addons:   [],
  message:  '',
  date:     '',
};

// ============================================================
// LOADER — hide as soon as the DOM is interactive, with two
// safety nets so the loader NEVER gets stuck on first visit.
//
// Why the old code broke:
//   window 'load' fires only after ALL sub-resources (images,
//   fonts, etc.) finish downloading.  On a first visit nothing
//   is cached, so a single slow/failed image can block 'load'
//   indefinitely — the user sees a frozen loading screen.
//   Refreshing works because assets are now cached.
//
// Fix strategy (three layers):
//   1. DOMContentLoaded  — hide as soon as HTML is parsed &
//      scripts are ready (~instant, no image dependency).
//   2. window 'load'     — kept as a belt-and-suspenders call
//      in case DOMContentLoaded somehow races.
//   3. Hard 3 s timeout  — absolute last resort; if neither
//      event has fired the loader is force-hidden so the user
//      is never permanently stuck.
// ============================================================
(function () {
  const HARD_TIMEOUT_MS = 3000; // max ms before force-hide

  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
    }
  }

  // Layer 1 — fire as soon as the DOM is ready (no image wait)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideLoader);
  } else {
    // readyState is already 'interactive' or 'complete'
    hideLoader();
  }

  // Layer 2 — also hook window load (covers edge-cases)
  window.addEventListener('load', hideLoader);

  // Layer 3 — hard timeout safety net
  setTimeout(hideLoader, HARD_TIMEOUT_MS);
})();

// ============================================================
// NAVBAR
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // stop watching once revealed
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// MENU GRID
// ============================================================
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? menuItems : menuItems.filter(m => m.category === filter);

  filtered.forEach((item) => {
    const isFav = favorites.includes(item.id);
    const div = document.createElement('div');
    div.className = 'menu-card reveal visible'; // start visible — no stagger animation
    div.dataset.category = item.category;

    // Ingredients always visible (shortened to first 3) — no hover required
    const shortIngredients = item.ingredients.slice(0, 3).join(' · ');

    div.innerHTML = `
      <div class="card-img-wrap">
        ${item.img
          ? `<img src="${item.img}" alt="${item.name}" class="card-photo" loading="lazy" />`
          : `<span>${item.emoji}</span>`}
        ${item.best ? '<div class="best-tag">⭐ Best Seller</div>' : ''}
        <button class="card-heart ${isFav ? 'liked' : ''}" data-id="${item.id}"
          title="${isFav ? 'Remove favourite' : 'Add to favourites'}"
          onclick="toggleFav(event,${item.id})">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-ingredients">🧂 ${shortIngredients}</div>
      </div>
      <div class="card-footer">
        <span class="card-price">UGX ${item.price.toLocaleString()}</span>
        <button class="card-add" onclick="openModal(event,${item.id})">Order</button>
      </div>
    `;

    // Entire card is tappable → opens modal
    div.addEventListener('click', (e) => {
      if (!e.target.classList.contains('card-heart') && !e.target.classList.contains('card-add')) {
        openModal(e, item.id);
      }
    });

    grid.appendChild(div);
  });
}
renderMenu();

// Filter tabs
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.filter);
  });
});

// ============================================================
// FAVOURITES
// ============================================================
function toggleFav(e, id) {
  e.stopPropagation();
  const btn = e.currentTarget;
  const idx = favorites.indexOf(id);
  if (idx === -1) {
    favorites.push(id);
    btn.textContent = '❤️';
    btn.classList.add('liked');
  } else {
    favorites.splice(idx, 1);
    btn.textContent = '🤍';
    btn.classList.remove('liked');
  }
  localStorage.setItem('yummy_favorites', JSON.stringify(favorites));
}

// ============================================================
// PRODUCT MODAL
// ============================================================
function openModal(e, id) {
  e.stopPropagation();
  const item = menuItems.find(m => m.id === id);
  if (!item) return;
  currentModal = item;
  modalQty = 1;

  document.getElementById('modalEmoji').textContent = item.emoji;
  document.getElementById('modalName').textContent = item.name;
  document.getElementById('modalDesc').textContent = item.desc;
  document.getElementById('modalPrice').textContent = `UGX ${item.price.toLocaleString()}`;

  const ingDiv = document.getElementById('modalIngredients');
  ingDiv.innerHTML = item.ingredients.map(ing => `<span class="ing-tag">${ing}</span>`).join('');

  document.getElementById('modalQty').textContent = '1';
  updateModalTotal();

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModalTotal() {
  if (!currentModal) return;
  const total = currentModal.price * modalQty;
  document.getElementById('modalTotal').textContent = `UGX ${total.toLocaleString()}`;
}

function changeQty(delta) {
  modalQty = Math.max(1, Math.min(10, modalQty + delta));
  document.getElementById('modalQty').textContent = modalQty;
  updateModalTotal();
}

function addFromModal() {
  if (!currentModal) return;
  addToCart(currentModal, modalQty);
  closeModal();
  // Brief visual feedback on cart button
  const btn = document.getElementById('cartBtn');
  btn.style.background = 'var(--teal)';
  btn.style.color = '#fff';
  setTimeout(() => { btn.style.background = ''; btn.style.color = ''; }, 700);
}

// Direct WhatsApp order from modal — skips cart for speed
function orderDirectWhatsApp() {
  if (!currentModal) return;
  const item = currentModal;
  const total = item.price * modalQty;
  const msg =
    `Hi Yummy! I'd like to order:%0A%0A` +
    `• ${item.name}%0A` +
    `• Quantity: ${modalQty}%0A` +
    `• Total: UGX ${total.toLocaleString()}%0A%0A` +
    `Please confirm my order. Thank you! 🙏`;
  window.open(`https://wa.me/256708526671?text=${msg}`, '_blank');
  closeModal();
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  currentModal = null;
}

// ============================================================
// CART
// ============================================================
function addToCart(item, qty = 1) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty += qty;
  else cart.push({ ...item, qty });
  saveCart();
  renderCart();
  updateCartCount();
}

function removeFromCart(id) {
  const numId = Number(id);
  cart = cart.filter(c => Number(c.id) !== numId);
  saveCart();
  renderCart();
  updateCartCount();
}

function changeCartQty(id, delta) {
  const numId = Number(id);
  const item = cart.find(c => Number(c.id) === numId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
  updateCartCount();
}

function saveCart() {
  try { sessionStorage.setItem('yummy_cart', JSON.stringify(cart)); } catch(_) {}
}

function updateCartCount() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cartCount').textContent = total;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart">Your cart is empty 🍰<br/><small>Add some delicious treats!</small></p>';
    document.getElementById('cartTotal').textContent = 'UGX 0';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">UGX ${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <div class="ci-controls">
        <button class="ci-dec" data-id="${item.id}" aria-label="Remove one">−</button>
        <span class="ci-qty">${item.qty}</span>
        <button class="ci-inc" data-id="${item.id}" aria-label="Add one">+</button>
        <button class="ci-del" data-id="${item.id}" style="color:#e53935;" aria-label="Remove item">✕</button>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById('cartTotal').textContent = `UGX ${total.toLocaleString()}`;
}

// Event delegation for cart buttons — avoids stale inline onclick issues
document.getElementById('cartItems').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (btn.classList.contains('ci-dec'))  changeCartQty(id, -1);
  else if (btn.classList.contains('ci-inc')) changeCartQty(id, 1);
  else if (btn.classList.contains('ci-del')) removeFromCart(id);
});

// Improved WhatsApp checkout message
function checkoutWhatsApp() {
  if (cart.length === 0) return;
  const lines = cart
    .map(c => `• ${c.name} x${c.qty} = UGX ${(c.price * c.qty).toLocaleString()}`)
    .join('%0A');
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const msg =
    `Hi Yummy! I'd like to order:%0A%0A` +
    `${lines}%0A%0A` +
    `Total: UGX ${total.toLocaleString()}%0A%0A` +
    `Pickup%2FDelivery date: [please add date]%0A%0A` +
    `Please confirm my order. Thank you! 🙏`;
  window.open(`https://wa.me/256708526671?text=${msg}`, '_blank');
}

// Cart sidebar
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}
function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
updateCartCount();
renderCart();

// ============================================================
// CAKE BUILDER
// ============================================================
function calcBuilderTotal() {
  return builderState.flavour.price +
    builderState.size.price +
    builderState.layers.price +
    builderState.frosting.price +
    builderState.toppings.reduce((s, t) => s + t.price, 0) +
    builderState.addons.reduce((s, a) => s + a.price, 0);
}

function updateBuilder() {
  document.getElementById('s-flavour').textContent  = builderState.flavour.val;
  document.getElementById('s-size').textContent     = builderState.size.val;
  document.getElementById('s-layers').textContent   = builderState.layers.val;
  document.getElementById('s-frosting').textContent = builderState.frosting.val;
  document.getElementById('s-toppings').textContent = builderState.toppings.map(t => t.val).join(', ') || 'None';
  document.getElementById('s-addons').textContent   = builderState.addons.map(a => a.val).join(', ')   || 'None';
  document.getElementById('s-date').textContent     = builderState.date || 'TBD';
  document.getElementById('s-total').textContent    = `UGX ${calcBuilderTotal().toLocaleString()}`;
  document.getElementById('cakeMsgPreview').textContent = builderState.message || 'Your message here';

  const flavEmojis = { 'Red Velvet':'🍰', 'Chocolate Fudge':'🍫', 'Vanilla':'🎂', 'Lemon Zest':'🍋', 'Tiramisu':'🎂', 'Carrot':'🥕' };
  document.getElementById('cakeVisual').textContent = flavEmojis[builderState.flavour.val] || '🎂';
}

// Single-select pill groups
document.querySelectorAll('.option-pills:not(.multi)').forEach(group => {
  const key = group.dataset.group;
  group.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (builderState[key] !== undefined) {
        builderState[key] = { val: pill.dataset.val, price: parseInt(pill.dataset.price) };
      }
      updateBuilder();
    });
  });
});

// Multi-select toggle pill groups
document.querySelectorAll('.option-pills.multi').forEach(group => {
  const key = group.dataset.group;
  group.querySelectorAll('.pill.toggle').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      const item = { val: pill.dataset.val, price: parseInt(pill.dataset.price) };
      const arr = builderState[key];
      const idx = arr.findIndex(a => a.val === item.val);
      if (idx === -1) arr.push(item);
      else arr.splice(idx, 1);
      updateBuilder();
    });
  });
});

document.getElementById('cakeMessage').addEventListener('input', (e) => {
  builderState.message = e.target.value;
  updateBuilder();
});
document.getElementById('cakeDate').addEventListener('change', (e) => {
  builderState.date = e.target.value;
  updateBuilder();
});

// Cake builder WhatsApp order — clean standardised message
document.getElementById('orderCakeBtn').addEventListener('click', () => {
  const toppings = builderState.toppings.map(t => t.val).join(', ') || 'None';
  const addons   = builderState.addons.map(a => a.val).join(', ')   || 'None';
  const total    = calcBuilderTotal();

  // Format date nicely if provided
  let dateStr = builderState.date || 'TBD';
  if (builderState.date) {
    try { dateStr = new Date(builderState.date).toLocaleDateString('en-UG', { weekday:'long', year:'numeric', month:'long', day:'numeric' }); } catch(_) {}
  }

  const msg =
    `Hi Yummy! I'd like to order a custom cake:%0A%0A` +
    `🎂 Flavour: ${builderState.flavour.val}%0A` +
    `📏 Size: ${builderState.size.val}%0A` +
    `🎚️ Layers: ${builderState.layers.val}%0A` +
    `🎨 Frosting: ${builderState.frosting.val}%0A` +
    `🍓 Toppings: ${toppings}%0A` +
    `🎁 Add-ons: ${addons}%0A` +
    `✍️ Message on cake: "${builderState.message || 'None'}"` + `%0A` +
    `📅 Pickup%2FDelivery date: ${dateStr}%0A%0A` +
    `Total: UGX ${total.toLocaleString()}%0A%0A` +
    `Please confirm. Thank you! 🙏`;

  window.open(`https://wa.me/256708526671?text=${msg}`, '_blank');
});

document.getElementById('saveCakeBtn').addEventListener('click', () => {
  localStorage.setItem('yummy_cake', JSON.stringify(builderState));
  const msg = document.getElementById('savedMsg');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 3000);
});

updateBuilder();

// ============================================================
// GELATO — Auto-sliding infinite conveyor belt carousel
// ============================================================
(function initGelatoConveyor() {
  const conveyor = document.getElementById('gelatoConveyor');
  if (!conveyor) return;

  const slides = [
    { img:'ice-cream.png',                name:'Classic Gelato',     desc:'Silky Italian-style scoops',       best:true  },
    { img:'galato.png',                   name:'Gelato Bar',          desc:'Pick your flavour at the counter', best:false },
    { img:'Oreo flavor Icecream.png',     name:'Cookies & Cream',     desc:'Crushed Oreos & vanilla cream',    best:true  },
    { img:'white chocolate icecream.png', name:'White Chocolate',     desc:'Velvety smooth white chocolate',   best:false },
    { img:'kit kat ice-cream.png',        name:'KitKat Crunch',       desc:'Crispy chocolate in every bite',   best:true  },
    { img:'ICE CREAM COFFEE.png',         name:'Affogato Dream',      desc:'Espresso meets vanilla gelato',    best:false },
    { img:'MoreFlavours.png',             name:'More Flavours',       desc:'Over 20 flavours to explore',      best:false },
    { img:'milkshake.png',                name:'Gelato Milkshake',    desc:'Thick, dreamy, irresistible',      best:true  },
  ];

  function buildSlide(item) {
    const div = document.createElement('div');
    div.className = 'gel-slide';
    div.innerHTML = `
      ${item.best ? '<span class="gel-slide-best">⭐ Fan Fave</span>' : ''}
      <img src="${item.img}" alt="${item.name}" class="gel-slide-img" loading="lazy" />
      <div class="gel-slide-body">
        <div class="gel-slide-name">${item.name}</div>
        <div class="gel-slide-desc">${item.desc}</div>
      </div>
    `;
    return div;
  }

  slides.forEach(s => conveyor.appendChild(buildSlide(s)));
  // Clone for seamless loop
  Array.from(conveyor.children).forEach(child => conveyor.appendChild(child.cloneNode(true)));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const originals = Array.from(conveyor.children).slice(0, slides.length);
      const totalWidth = originals.reduce((w, el) => {
        return w + el.offsetWidth + 22;
      }, 0);
      const dur = Math.max(30, totalWidth / 60);
      const styleTag = document.createElement('style');
      styleTag.textContent = `
        @keyframes conveyorScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
        #gelatoConveyor { animation: conveyorScroll ${dur}s linear infinite; }
      `;
      document.head.appendChild(styleTag);
    });
  });

  const outer = document.querySelector('.gelato-conveyor-outer');
  if (outer) {
    outer.addEventListener('mouseenter', () => conveyor.style.animationPlayState = 'paused');
    outer.addEventListener('mouseleave', () => conveyor.style.animationPlayState = 'running');
  }

  // Touch: pause on touch, resume after
  conveyor.addEventListener('touchstart', () => { conveyor.style.animationPlayState = 'paused'; }, { passive: true });
  conveyor.addEventListener('touchend',   () => { setTimeout(() => { conveyor.style.animationPlayState = 'running'; }, 1000); }, { passive: true });

  // Decorative dots
  const dotsWrap = document.getElementById('gelatoDots');
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'gel-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `Gelato flavour ${i + 1}`);
      btn.addEventListener('click', () => {
        dotsWrap.querySelectorAll('.gel-dot').forEach((d, j) => d.classList.toggle('active', j === i));
      });
      dotsWrap.appendChild(btn);
    });
  }
})();

// ============================================================
// REVIEWS CAROUSEL
// ============================================================
(function initReviews() {
  const track = document.getElementById('reviewTrack');
  const dotsWrap = document.getElementById('reviewDots');
  const isMobile = () => window.innerWidth <= 768;

  reviews.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'review-card';
    const filledStars = '★'.repeat(r.stars);
    const emptyStars  = '☆'.repeat(5 - r.stars);
    card.innerHTML = `
      <div class="review-quote">"</div>
      <div class="review-stars">${filledStars}${emptyStars}</div>
      <div class="review-text">${r.text}</div>
      <div class="review-author">
        <div class="review-avatar">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-location">📍 ${r.location}</div>
        </div>
        <a href="${r.link}" target="_blank" rel="noopener" class="review-google-link" title="See on Google">
          <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        </a>
      </div>
    `;
    track.appendChild(card);
  });

  function getStep()     { return isMobile() ? 1 : 2; }
  function getNumSteps() { return Math.ceil(reviews.length / getStep()); }
  function getCardWidth() {
    const card = track.querySelector('.review-card');
    return card ? card.offsetWidth + 24 : 340;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < getNumSteps(); i++) {
      const dot = document.createElement('button');
      dot.className = 'review-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Review page ${i + 1}`);
      dot.addEventListener('click', () => goToStep(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goToStep(stepIdx) {
    const steps = getNumSteps();
    reviewIdx = ((stepIdx % steps) + steps) % steps;
    const offset = reviewIdx * getStep() * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;
    document.querySelectorAll('.review-dot').forEach((d, i) => d.classList.toggle('active', i === reviewIdx));
    resetAuto();
  }

  document.getElementById('reviewPrev').addEventListener('click', () => goToStep(reviewIdx - 1));
  document.getElementById('reviewNext').addEventListener('click', () => goToStep(reviewIdx + 1));

  let touchStart = 0;
  track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToStep(reviewIdx + (diff > 0 ? 1 : -1));
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      reviewIdx = 0;
      track.style.transform = 'translateX(0)';
    }, 200);
  }, { passive: true });

  function resetAuto() {
    clearInterval(reviewAutoTimer);
    reviewAutoTimer = setInterval(() => goToStep(reviewIdx + 1), 5000);
  }

  buildDots();
  resetAuto();
})();

// ============================================================
// DESSERT PICKER / SPIN
// ============================================================
document.getElementById('spinBtn').addEventListener('click', () => {
  const btn = document.getElementById('spinBtn');
  const result = document.getElementById('spinResult');
  btn.disabled = true;
  result.style.display = 'none';

  let count = 0;
  const frames = ['🎲', '🎰', '🎡', '⭐', '✨'];
  const interval = setInterval(() => {
    btn.textContent = frames[count % frames.length] + ' Picking...';
    count++;
    if (count >= 10) {
      clearInterval(interval);
      btn.disabled = false;
      btn.textContent = '🎲 Spin Again!';
      const pick = spinOptions[Math.floor(Math.random() * spinOptions.length)];
      result.style.display = 'block';
      result.innerHTML = `
        <img src="${pick.img}" alt="${pick.name}" class="spin-result-img" loading="lazy" />
        <h3>Today, you should try...</h3>
        <h2 style="font-family:var(--font-heading);color:var(--brown);font-size:1.8rem;margin:12px 0">${pick.name}</h2>
        <p style="color:var(--text-light)">${pick.desc}</p>
        <br/>
        <a href="#menu" style="display:inline-block;margin-top:8px;" class="btn-primary">Find it in our Menu 🍴</a>
      `;
    }
  }, 120);
});

// ============================================================
// HOURS TOGGLE
// ============================================================
document.getElementById('hoursBtn').addEventListener('click', () => {
  const drop = document.getElementById('hoursDrop');
  const btn = document.getElementById('hoursBtn');
  drop.classList.toggle('open');
  btn.textContent = drop.classList.contains('open') ? 'Close Hours ▲' : 'View Hours ▼';
});

document.getElementById('hoursBtn2').addEventListener('click', () => {
  const drop = document.getElementById('hoursDrop2');
  const btn = document.getElementById('hoursBtn2');
  drop.classList.toggle('open');
  btn.textContent = drop.classList.contains('open') ? 'Close Hours ▲' : 'View Hours ▼';
});

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================================================
// RESTORE SAVED CAKE
// ============================================================
if (savedCake) {
  try {
    const c = savedCake;
    if (c.flavour) { builderState.flavour = c.flavour; document.querySelectorAll('[data-group="flavour"] .pill').forEach(p => p.classList.toggle('active', p.dataset.val === c.flavour.val)); }
    if (c.size)    { builderState.size = c.size;       document.querySelectorAll('[data-group="size"] .pill').forEach(p => p.classList.toggle('active', p.dataset.val === c.size.val)); }
    if (c.message) { document.getElementById('cakeMessage').value = c.message; builderState.message = c.message; }
    updateBuilder();
  } catch (_) { /* ignore */ }
}

console.log('🍰 Yummy Bakery – app.js loaded. Palm Village Mall, Ggaba & Lugogo Mall, Kampala.');
