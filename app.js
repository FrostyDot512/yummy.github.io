/* ============================================================
   YUMMY BAKERY — app.js
   All interactive features: loader, navbar, particles,
   menu, cake builder, gelato, reviews, cart, modal,
   countdown, confetti, scroll reveal, counters & more.
   ============================================================ */

'use strict';

// ============================================================
// DATA
// ============================================================

const menuItems = [
  { id:1, name:'Jams', emoji:'🍯', img:'jams.png', category:'bread', price:45000, desc:'Smooth, golden fruit jam sealed fresh for a naturally sweet spread', ingredients:['Fresh Fruits','Sugar','Pectin','Lemon Juice'], best:true },
  { id:2, name:'Tiramisu Cake', emoji:'🎂', img:'tiramisu.png', category:'cakes', price:55000, desc:'Classic Italian layers of mascarpone & espresso', ingredients:['Mascarpone','Espresso','Ladyfingers','Cocoa'], best:false },
  { id:3, name:'Chocolate Fudge Cake', emoji:'🍫', img:'chocolate fudge.png', category:'cakes', price:50000, desc:'Rich dark chocolate ganache, fudge-filled layers', ingredients:['Dark Chocolate','Ganache','Butter','Eggs'], best:true },
  { id:4, name:'White Forest Cake', emoji:'🎂', img:'white forest cake.png', category:'cakes', price:38000, desc:'Light vanilla sponge layered with whipped cream and white chocolate, finished with a delicate, airy sweetness', ingredients:['Flour','Sugar','Eggs','Butter','Milk','Whipped Cream','White Chocolate','Vanilla Extract'], best:false },
  { id:5, name:'Brownie Bites', emoji:'🍪', img:'brownie bites.png', category:'bread', price:18000, desc:'The perfect box of treats for any occasion', ingredients:['Chocolate','Butter','Sugar','Eggs','Flour','Cocoa Powder','Vanilla Extract'], best:true },
  { id:6, name:'KitKat Ice-Cream', emoji:'🍫', img:'kit kat ice-cream.png', category:'gelato', price:15000, desc:'Creamy chocolate ice cream loaded with crunchy KitKat pieces for the perfect mix of smooth and crispy indulgence', ingredients:['Milk','Cream','Sugar','Cocoa','KitKat Pieces','Vanilla Extract'], best:false },
  { id:7, name:'Pretzel', emoji:'🥨', img:'pretzel.png', category:'bread', price:16000, desc:'Soft golden pretzel with sea salt crust', ingredients:['Flour','Baking Soda','Butter','Sea Salt'], best:false },
  { id:8, name:'Butter Croissant', emoji:'🥐', img:'croissant .png', category:'pastries', price:8000, desc:'Flaky, golden, 72-hour laminated dough', ingredients:['Butter','Flour','Yeast','Milk'], best:true },
  { id:9, name:'Cinnamon Roll', emoji:'🥧', img:'Raisins and cinnamon Danish.png', category:'pastries', price:9000, desc:'Warm swirls drizzled with vanilla glaze', ingredients:['Cinnamon','Cream Cheese Glaze','Dough','Brown Sugar'], best:false },
  { id:10, name:'Fresh Donuts', emoji:'🍩', img:'Fresh Donuts.png', category:'pastries', price:10000, desc:'Fluffy glazed donuts topped with rich icing and colorful sprinkles', ingredients:['Dark Chocolate','Croissant Dough','Butter'], best:false },
  { id:11, name:'White Chocolate Ice-cream', emoji:'🍦', img:'white chocolate icecream.png', category:'gelato', price:12000, desc:'Creamy white chocolate ice cream with a smooth, velvety sweetness that melts in every bite', ingredients:['Milk','Cream','Sugar','White Chocolate','Vanilla Extract'], best:true },
  { id:12, name:'Oreo Ice Cream', emoji:'🍪', img:'Oreo flavor Icecream.png', category:'gelato', price:13000, desc:'Cookies & cream gelato with whole Oreos on top', ingredients:['Oreos','Vanilla Cream','Dark Chocolate','Milk'], best:true },
  { id:13, name:'Truffles', emoji:'🍫', img:'truffles.png', category:'bread', price:11000, desc:'Decadent chocolate truffles coated in sprinkles and coconut flakes', ingredients:['Chocolate','Cream','Butter','Cocoa Powder','Sprinkles/Coconut Flakes'], best:true },
  { id:14, name:'Ice-Cream Coffee', emoji:'🍦', img:'ICE CREAM COFFEE.png', category:'drinks', price:10000, desc:'Chilled espresso with a scoop of vanilla gelato', ingredients:['Espresso','Ice','Vanilla Gelato','Sugar Syrup'], best:true },
  { id:15, name:'Milkshake', emoji:'🥤', img:'milkshake.png', category:'drinks', price:14000, desc:'Thick creamy shake topped with a praline crisp', ingredients:['Milk','Ice Cream','Cream','Vanilla'], best:true },
  { id:16, name:'Latte Macchiato', emoji:'☕', img:'latte macchiato.png', category:'drinks', price:9000, desc:'Layered espresso and silky steamed milk', ingredients:['Espresso','Steamed Milk','Milk Foam'], best:false },
  { id:17, name:'Flavoured Coffee', emoji:'☕', img:'moreCoffee.png', category:'drinks', price:11000, desc:'Monin caramel or hazelnut syrup latte', ingredients:['Espresso','Monin Syrup','Steamed Milk','Cream'], best:false },
];

const gelatoFlavours = [
  { name:'Vanilla', emoji:'🍦', img:'ice-cream.png', colour:'#FFF8B0', desc:'Madagascar vanilla bean', ingredients:'Cream, Vanilla Bean, Sugar', best:true },
  { name:'Chocolate', emoji:'🍫', img:null, colour:'#4A2C1A', desc:'Belgian dark chocolate', ingredients:'Dark Chocolate, Cream, Cocoa', best:false },
  { name:'Strawberry', emoji:'🍓', img:'ice-cream.png', colour:'#FFD6D6', desc:'Fresh seasonal berries', ingredients:'Strawberries, Cream, Sugar', best:true },
  { name:'Salted Caramel', emoji:'🍮', img:null, colour:'#D4A843', desc:'Sea salt & caramel swirl', ingredients:'Caramel, Sea Salt, Cream', best:false },
  { name:'Pistachio', emoji:'🌿', img:'ice-cream.png', colour:'#C8E6C9', desc:'Sicilian pistachio paste', ingredients:'Pistachios, Milk, Sugar', best:true },
  { name:'Mango', emoji:'🥭', img:'ice-cream.png', colour:'#FFE0A0', desc:'Tropical Ugandan mango', ingredients:'Fresh Mango, Lemon, Sugar', best:true },
  { name:'Coffee', emoji:'☕', img:'ICE_CREAM_COFFEE.png', colour:'#8B5E3C', desc:'Double-shot espresso cream', ingredients:'Espresso, Cream, Sugar', best:false },
  { name:'Cookies & Cream', emoji:'🍪', img:'Oreo_flavor_Icecream.png', colour:'#F0EDE8', desc:'Crushed Oreos & vanilla', ingredients:'Oreos, Vanilla Cream, Milk', best:true },
  { name:'Passion Fruit', emoji:'🌺', img:'ice-cream.png', colour:'#FFC0CB', desc:'Tangy tropical sorbet', ingredients:'Passion Fruit, Sugar, Lime', best:false },
  { name:'Coconut', emoji:'🥥', img:null, colour:'#F0F8E8', desc:'Creamy tropical coconut', ingredients:'Coconut Milk, Cream, Sugar', best:false },
];

const reviews = [
  { text:'The best sourdough bread in Kampala, hands down. That crust! Perfectly chewy inside. I come every Saturday morning.', stars:5, name:'Amara K.', location:'Ggaba, Kampala', avatar:'A', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Ordered a custom Red Velvet birthday cake and it was absolutely stunning. Everyone at the party loved it! Will order again.', stars:5, name:'James O.', location:'Ntinda, Kampala', avatar:'J', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'The gelato selection is insane. Salted Caramel is my go-to. Super creamy, not too sweet. Love this place!', stars:5, name:'Priya M.', location:'Kololo, Kampala', avatar:'P', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Great variety of pastries. The croissants are buttery and flaky — just like in Paris. Cozy spot to work from.', stars:5, name:'David N.', location:'Bugolobi, Kampala', avatar:'D', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Yummy is my weekend ritual. Coffee + cinnamon roll = perfect morning. Friendly staff, beautiful ambiance.', stars:5, name:'Sarah W.', location:'Ggaba, Kampala', avatar:'S', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'The Tiramisu cake was heavenly. Rich, perfectly balanced, and the custom message was beautifully piped. 10/10!', stars:5, name:'Ibrahim T.', location:'Makindye, Kampala', avatar:'I', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Cookies & Cream gelato is dangerously good. The whole Oreo on top is such a nice touch. My kids go crazy for it!', stars:5, name:'Grace N.', location:'Naguru, Kampala', avatar:'G', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Stopped in for coffee and ended up buying bread, pretzels and a cake slice. The flavoured lattes with Monin syrups are excellent.', stars:5, name:'Michael A.', location:'Muyenga, Kampala', avatar:'M', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'The milkshake at Yummy is one of the best I have had anywhere. Thick, creamy and beautifully presented. Highly recommend.', stars:5, name:'Fatuma R.', location:'Bukoto, Kampala', avatar:'F', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
  { text:'Palm Village Mall location has the best ambiance. Perfect spot for a date or catching up with friends over coffee and pastries.', stars:5, name:'Brian K.', location:'Kisugu, Kampala', avatar:'B', link:'https://www.google.com/maps/place/Yummy+A+Tasteful+Moment/@0.2902,32.5893,17z' },
];

const spinOptions = [
  { emoji:'🍰', name:'Red Velvet Cake', desc:'Because life needs more velvet.', img:'Nutella_crunch_and_our_Croissant_cake.png' },
  { emoji:'🥐', name:'Butter Croissant', desc:'Golden, flaky, and absolutely worth it.', img:'Nutella_crunch_and_our_Croissant_cake.png' },
  { emoji:'🍦', name:'Salted Caramel Gelato', desc:'Sweet meets salty in the best way.', img:'ice-cream.png' },
  { emoji:'☕', name:'Latte Macchiato', desc:'The perfect afternoon pick-me-up.', img:'latte_macchiato.png' },
  { emoji:'🎂', name:'Tiramisu Cake Slice', desc:'Italy meets Kampala in one bite.', img:'Nutella_crunch_and_our_Croissant_cake.png' },
  { emoji:'🍫', name:'Chocolate Fudge Cake', desc:'Chocolate therapy — highly recommended.', img:'Nutella_crunch_and_our_Croissant_cake.png' },
  { emoji:'🥨', name:'Pretzel', desc:'Warm, salty, and dangerously good.', img:'pretzel.png' },
  { emoji:'🥭', name:'Mango Sorbet', desc:'Fresh, tropical, and guilt-free joy.', img:'ice-cream.png' },
  { emoji:'🍞', name:'Sourdough Loaf', desc:'The bread that started it all.', img:'more_bread.png' },
  { emoji:'🍪', name:'Oreo Ice Cream', desc:'Cookies & cream heaven in a tub.', img:'Oreo_flavor_Icecream.png' },
];

// ============================================================
// GLOBAL STATE
// ============================================================
let cart = JSON.parse(localStorage.getItem('yummy_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('yummy_favorites') || '[]');
let savedCake = JSON.parse(localStorage.getItem('yummy_cake') || 'null');
let currentModal = null;
let modalQty = 1;
let reviewIdx = 0;
let reviewAutoTimer;

// Builder state
const builderState = {
  flavour: { val: 'Red Velvet', price: 5000 },
  size:    { val: '6"',         price: 30000 },
  layers:  { val: '1 Layer',   price: 0 },
  frosting:{ val: 'Buttercream',price: 0 },
  toppings: [],
  addons:   [],
  message:  '',
  date:     '',
};

// ============================================================
// LOADER
// ============================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    initCounters();
  }, 2200);
});

// ============================================================
// NAVBAR
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});


// ============================================================
// HERO PARTICLES
// ============================================================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const icons = ['🍰','🥐','🍦','🎂','☕','🧁','🍫','🍮','🥐','🍓'];

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 18; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 20 + Math.random() * 20,
      speed: 0.3 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 0.3,
      icon: icons[Math.floor(Math.random() * icons.length)],
      opacity: 0.3 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.5,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      p.rotation += p.rotSpeed;
      if (p.y < -60) { p.y = canvas.height + 60; p.x = Math.random() * canvas.width; }
      if (p.x < -60) p.x = canvas.width + 60;
      if (p.x > canvas.width + 60) p.x = -60;
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.icon, 0, 0);
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ============================================================
// HERO STATS COUNTER ANIMATION
// ============================================================
function initCounters() {
  const animate = (el) => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  };
  document.querySelectorAll('.stat-num, .count-num').forEach(el => {
    animate(el);
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counters when about section comes into view
      if (entry.target.classList.contains('counter') || entry.target.closest('#about')) {
        entry.target.querySelectorAll('.count-num').forEach(el => {
          if (el.textContent === '0') initCounters();
        });
      }
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
  filtered.forEach((item, i) => {
    const isFav = favorites.includes(item.id);
    const div = document.createElement('div');
    div.className = 'menu-card reveal';
    div.style.animationDelay = `${i * 0.05}s`;
    div.dataset.category = item.category;
    div.innerHTML = `
      <div class="card-img-wrap">
        ${item.img ? `<img src="${item.img}" alt="${item.name}" class="card-photo" />` : `<span>${item.emoji}</span>`}
        ${item.best ? '<div class="best-tag">⭐ Best Seller</div>' : ''}
        <button class="card-heart ${isFav ? 'liked' : ''}" data-id="${item.id}" title="${isFav ? 'Remove favourite':'Add to favourites'}" onclick="toggleFav(event,${item.id})">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-name">${item.name}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-hover-info">🧂 ${item.ingredients.join(' · ')}</div>
      </div>
      <div class="card-footer">
        <span class="card-price">UGX ${item.price.toLocaleString()}</span>
        <button class="card-add" onclick="openModal(event,${item.id})">Quick View</button>
      </div>
    `;
    div.addEventListener('click', (e) => {
      if (!e.target.classList.contains('card-heart') && !e.target.classList.contains('card-add')) {
        openModal(e, item.id);
      }
    });
    grid.appendChild(div);
    setTimeout(() => div.classList.add('visible'), i * 60);
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
  document.getElementById('modalQty').textContent = '1';
  const ingDiv = document.getElementById('modalIngredients');
  ingDiv.innerHTML = item.ingredients.map(ing => `<span class="ing-tag">${ing}</span>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function changeQty(delta) {
  modalQty = Math.max(1, Math.min(10, modalQty + delta));
  document.getElementById('modalQty').textContent = modalQty;
}

function addFromModal() {
  if (!currentModal) return;
  addToCart(currentModal, modalQty);
  closeModal();
  showAddedAnimation();
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

function showAddedAnimation() {
  const btn = document.getElementById('cartBtn');
  btn.style.transform = 'scale(1.3)';
  btn.style.background = '#4caf50';
  btn.style.color = 'white';
  setTimeout(() => {
    btn.style.transform = '';
    btn.style.background = '';
    btn.style.color = '';
  }, 600);
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
  cart = cart.filter(c => c.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
}

function changeCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
  updateCartCount();
}

function saveCart() { localStorage.setItem('yummy_cart', JSON.stringify(cart)); }

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
    <div class="cart-item">
      <div class="ci-emoji">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">UGX ${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <div class="ci-controls">
        <button onclick="changeCartQty(${item.id},-1)">−</button>
        <span class="ci-qty">${item.qty}</span>
        <button onclick="changeCartQty(${item.id},1)">+</button>
        <button onclick="removeFromCart(${item.id})" style="color:#e53935;">✕</button>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById('cartTotal').textContent = `UGX ${total.toLocaleString()}`;
}

function checkoutWhatsApp() {
  if (cart.length === 0) return;
  const lines = cart.map(c => `• ${c.name} x${c.qty} = UGX ${(c.price*c.qty).toLocaleString()}`).join('%0A');
  const total = cart.reduce((sum,c) => sum + c.price * c.qty, 0);
  const msg = `Hi Yummy!%0AI'd like to order from Palm Village Mall, Ggaba:%0A%0A${lines}%0A%0ATotal: UGX ${total.toLocaleString()}%0A%0APlease confirm my order. Thank you! 🙏`;
  window.open(`https://wa.me/256708526671?text=${msg}`, '_blank');
}

// Cart sidebar toggle
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
function updateBuilder() {
  document.getElementById('s-flavour').textContent = builderState.flavour.val;
  document.getElementById('s-size').textContent = builderState.size.val;
  document.getElementById('s-layers').textContent = builderState.layers.val;
  document.getElementById('s-frosting').textContent = builderState.frosting.val;
  document.getElementById('s-toppings').textContent = builderState.toppings.map(t=>t.val).join(', ') || 'None';
  document.getElementById('s-addons').textContent = builderState.addons.map(a=>a.val).join(', ') || 'None';
  document.getElementById('s-date').textContent = builderState.date || 'TBD';
  const total = builderState.flavour.price + builderState.size.price + builderState.layers.price +
    builderState.frosting.price + builderState.toppings.reduce((s,t)=>s+t.price,0) +
    builderState.addons.reduce((s,a)=>s+a.price,0);
  document.getElementById('s-total').textContent = `UGX ${total.toLocaleString()}`;
  const msg = document.getElementById('cakeMessage').value;
  document.getElementById('cakeMsgPreview').textContent = msg || 'Your message here';
  // Update cake visual emoji based on flavour
  const flavEmojis = { 'Red Velvet':'🍰','Chocolate Fudge':'🍫','Vanilla':'🎂','Lemon Zest':'🍋','Tiramisu':'🎂','Carrot':'🥕' };
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

document.getElementById('orderCakeBtn').addEventListener('click', () => {
  const toppings = builderState.toppings.map(t=>t.val).join(', ') || 'None';
  const addons = builderState.addons.map(a=>a.val).join(', ') || 'None';
  const total = builderState.flavour.price + builderState.size.price + builderState.layers.price +
    builderState.frosting.price + builderState.toppings.reduce((s,t)=>s+t.price,0) +
    builderState.addons.reduce((s,a)=>s+a.price,0);
  const msg = `Hi Yummy! I'd like to order a custom cake from Palm Village Mall, Ggaba:%0A%0A🎂 Flavour: ${builderState.flavour.val}%0A📏 Size: ${builderState.size.val}%0A🎚️ Layers: ${builderState.layers.val}%0A🎨 Frosting: ${builderState.frosting.val}%0A🍓 Toppings: ${toppings}%0A🎁 Add-ons: ${addons}%0A✍️ Message: "${builderState.message || 'None'}" %0A📅 Date: ${builderState.date || 'TBD'}%0A%0ATOTAL: UGX ${total.toLocaleString()}%0A%0APlease confirm. Thank you! 🙏`;
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
// GELATO TRACK
// ============================================================
(function renderGelato() {
  const track = document.getElementById('gelatoTrack');
  gelatoFlavours.forEach(fl => {
    const card = document.createElement('div');
    card.className = 'gelato-card';
    card.innerHTML = `
      ${fl.best ? '<div class="gelato-best">⭐ Popular</div>' : ''}
      ${fl.img ? `<img src="${fl.img}" alt="${fl.name}" class="gelato-img" />` : `<span class="gelato-scoop">${fl.emoji}</span>`}
      <div class="gelato-name">${fl.name}</div>
      <div class="gelato-desc">${fl.desc}</div>
      <div class="gelato-pop">🧂 ${fl.ingredients}</div>
    `;
    card.style.background = `linear-gradient(135deg, ${fl.colour}33, #FFFDF0)`;
    track.appendChild(card);
  });
})();

// Drag scroll
(function initDragScroll() {
  const wrap = document.querySelector('.gelato-track-wrap');
  const track = document.getElementById('gelatoTrack');
  let isDown = false, startX, scrollLeft;
  wrap.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - wrap.offsetLeft; scrollLeft = wrap.scrollLeft; wrap.style.cursor='grabbing'; });
  wrap.addEventListener('mouseleave', () => { isDown = false; wrap.style.cursor='grab'; });
  wrap.addEventListener('mouseup', () => { isDown = false; wrap.style.cursor='grab'; });
  wrap.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - wrap.offsetLeft; wrap.scrollLeft = scrollLeft - (x - startX); });
  wrap.addEventListener('touchstart', e => { startX = e.touches[0].pageX - wrap.offsetLeft; scrollLeft = wrap.scrollLeft; }, {passive:true});
  wrap.addEventListener('touchmove', e => { const x = e.touches[0].pageX - wrap.offsetLeft; wrap.scrollLeft = scrollLeft - (x - startX); }, {passive:true});
})();

// ============================================================
// REVIEWS CAROUSEL — 2 cards visible at a time
// ============================================================
(function initReviews() {
  const track = document.getElementById('reviewTrack');
  const dotsWrap = document.getElementById('reviewDots');
  const isMobile = () => window.innerWidth <= 768;

  // Build cards
  reviews.forEach((r) => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-quote">"</div>
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
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

  // Number of dots = steps needed to cycle through all reviews 2-at-a-time
  // On desktop: step by 2; on mobile: step by 1
  function getStep() { return isMobile() ? 1 : 2; }
  function getNumSteps() { return Math.ceil(reviews.length / getStep()); }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const steps = getNumSteps();
    for (let i = 0; i < steps; i++) {
      const dot = document.createElement('button');
      dot.className = 'review-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToStep(i));
      dotsWrap.appendChild(dot);
    }
  }

  function getCardWidth() {
    const card = track.querySelector('.review-card');
    if (!card) return 340;
    return card.offsetWidth + 24; // card width + gap
  }

  function goToStep(stepIdx) {
    const steps = getNumSteps();
    reviewIdx = ((stepIdx % steps) + steps) % steps;
    const cardStep = getStep();
    const offset = reviewIdx * cardStep * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;
    document.querySelectorAll('.review-dot').forEach((d, i) => d.classList.toggle('active', i === reviewIdx));
    resetAuto();
  }

  document.getElementById('reviewPrev').addEventListener('click', () => goToStep(reviewIdx - 1));
  document.getElementById('reviewNext').addEventListener('click', () => goToStep(reviewIdx + 1));

  // Touch swipe
  let touchStart = 0;
  track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToStep(reviewIdx + (diff > 0 ? 1 : -1));
  });

  // Rebuild dots on resize (desktop ↔ mobile)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      reviewIdx = 0;
      track.style.transform = 'translateX(0)';
    }, 200);
  });

  function resetAuto() {
    clearInterval(reviewAutoTimer);
    reviewAutoTimer = setInterval(() => goToStep(reviewIdx + 1), 5000);
  }

  buildDots();
  resetAuto();
})();

// ============================================================
// CONSOLE LOG
// ============================================================

// ============================================================
// CONFETTI
// ============================================================
function confettiPop(e) {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const pieces = [];
  const colours = ['#F2E04A','#3B2A1A','#D4A843','#FFF8E7','#7B5C3E','#FF6B8A','#4CAF50','#2196F3'];
  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 8 + Math.random() * 10,
      h: 6 + Math.random() * 8,
      speed: 3 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      colour: colours[Math.floor(Math.random() * colours.length)],
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      p.x += p.drift;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.colour;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else { ctx.clearRect(0,0,canvas.width,canvas.height); canvas.style.display='none'; }
  }
  draw();
  e.target.textContent = '✅ Claimed!';
  setTimeout(() => { e.target.textContent = e.target.textContent.includes('Claimed') ? 'Grab Deal 🎉' : e.target.textContent; }, 3000);
}

// ============================================================
// DESSERT PICKER / SPIN
// ============================================================
document.getElementById('spinBtn').addEventListener('click', () => {
  const btn = document.getElementById('spinBtn');
  const result = document.getElementById('spinResult');
  btn.classList.add('spinning');
  btn.disabled = true;
  result.style.display = 'none';

  let count = 0;
  const interval = setInterval(() => {
    btn.textContent = ['🎲','🎰','🎡','⭐','✨'][count % 5] + ' Spinning...';
    count++;
    if (count >= 12) {
      clearInterval(interval);
      btn.classList.remove('spinning');
      btn.disabled = false;
      btn.textContent = '🎲 Spin Again!';
      const pick = spinOptions[Math.floor(Math.random() * spinOptions.length)];
      result.style.display = 'block';
      result.innerHTML = `
        <img src="${pick.img}" alt="${pick.name}" class="spin-result-img" />
        <h3>Today, you should try...</h3>
        <h2 style="font-family:var(--font-heading);color:var(--brown);font-size:1.8rem;margin:12px 0">${pick.name}</h2>
        <p style="color:var(--text-light)">${pick.desc}</p>
        <br/>
        <a href="#menu" style="display:inline-block;margin-top:8px;" class="btn-primary glow">Find it in our Menu 🍴</a>
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

// Lugogo Mall hours toggle
document.getElementById('hoursBtn2').addEventListener('click', () => {
  const drop = document.getElementById('hoursDrop2');
  const btn = document.getElementById('hoursBtn2');
  drop.classList.toggle('open');
  btn.textContent = drop.classList.contains('open') ? 'Close Hours ▲' : 'View Hours ▼';
});

// ============================================================
// NEWSLETTER
// ============================================================
function subscribeNewsletter() {
  const input = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsMsg');
  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = '#e53935';
    setTimeout(() => input.style.borderColor = '', 2000);
    return;
  }
  msg.style.display = 'block';
  input.value = '';
  setTimeout(() => msg.style.display = 'none', 5000);
}

// ============================================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================================================
// LAZY IMAGE LOADING (Observer for any future imgs)
// ============================================================
const imgObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting && e.target.dataset.src) { e.target.src = e.target.dataset.src; imgObserver.unobserve(e.target); } });
});
document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));

// ============================================================
// RESTORE SAVED CAKE ORDER
// ============================================================
if (savedCake) {
  try {
    const c = savedCake;
    if (c.flavour) { builderState.flavour = c.flavour; document.querySelectorAll('[data-group="flavour"] .pill').forEach(p => { p.classList.toggle('active', p.dataset.val === c.flavour.val); }); }
    if (c.size) { builderState.size = c.size; document.querySelectorAll('[data-group="size"] .pill').forEach(p => { p.classList.toggle('active', p.dataset.val === c.size.val); }); }
    if (c.message) { document.getElementById('cakeMessage').value = c.message; builderState.message = c.message; }
    updateBuilder();
  } catch(ex) { /* ignore */ }
}

console.log('🍰 Yummy Bakery – app.js loaded. Palm Village Mall, Ggaba, Kampala.');
