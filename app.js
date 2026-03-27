/* ============================================================
   PawsPlace – Pet Shop App Logic
   ============================================================ */

'use strict';

// ---------- Pet data ----------
const PETS = [
  {
    id: 1,
    name: 'Buddy',
    type: 'dog',
    breed: 'Golden Retriever',
    age: '2 years',
    price: 850,
    emoji: '🐕',
    status: 'available',
  },
  {
    id: 2,
    name: 'Luna',
    type: 'cat',
    breed: 'Persian',
    age: '1 year',
    price: 620,
    emoji: '🐈',
    status: 'available',
  },
  {
    id: 3,
    name: 'Thumper',
    type: 'rabbit',
    breed: 'Holland Lop',
    age: '8 months',
    price: 280,
    emoji: '🐇',
    status: 'available',
  },
  {
    id: 4,
    name: 'Sunny',
    type: 'bird',
    breed: 'Canary',
    age: '1 year',
    price: 180,
    emoji: '🐦',
    status: 'available',
  },
  {
    id: 5,
    name: 'Nemo',
    type: 'fish',
    breed: 'Clownfish',
    age: '6 months',
    price: 95,
    emoji: '🐠',
    status: 'available',
  },
  {
    id: 6,
    name: 'Max',
    type: 'dog',
    breed: 'German Shepherd',
    age: '3 years',
    price: 1100,
    emoji: '🐕‍🦺',
    status: 'available',
  },
  {
    id: 7,
    name: 'Whiskers',
    type: 'cat',
    breed: 'Siamese',
    age: '2 years',
    price: 720,
    emoji: '🐈‍⬛',
    status: 'reserved',
  },
  {
    id: 8,
    name: 'Tweety',
    type: 'bird',
    breed: 'Budgerigar',
    age: '5 months',
    price: 130,
    emoji: '🦜',
    status: 'available',
  },
  {
    id: 9,
    name: 'Goldie',
    type: 'fish',
    breed: 'Goldfish',
    age: '4 months',
    price: 25,
    emoji: '🐡',
    status: 'available',
  },
  {
    id: 10,
    name: 'Coco',
    type: 'rabbit',
    breed: 'Angora',
    age: '10 months',
    price: 320,
    emoji: '🐰',
    status: 'available',
  },
  {
    id: 11,
    name: 'Rocky',
    type: 'dog',
    breed: 'Bulldog',
    age: '4 years',
    price: 950,
    emoji: '🐶',
    status: 'available',
  },
  {
    id: 12,
    name: 'Bella',
    type: 'cat',
    breed: 'Maine Coon',
    age: '3 years',
    price: 880,
    emoji: '😺',
    status: 'reserved',
  },
];

// ---------- Cart state ----------
let cart = [];
let activeFilter = 'all';

// ---------- DOM references ----------
const petsGrid = document.getElementById('pets-grid');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartDialog = document.getElementById('cart-dialog');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const navToggle = document.querySelector('.nav-toggle');
const primaryNav = document.getElementById('primary-nav');
const categoryCards = document.querySelectorAll('.category-card');
const contactForm = document.querySelector('.contact-form');
const formSuccess = document.getElementById('form-success');
const yearSpan = document.getElementById('year');

// ---------- Init ----------
function init() {
  yearSpan.textContent = new Date().getFullYear();
  renderPets(PETS);
  bindEvents();
}

// ---------- Render pets ----------
function renderPets(list) {
  petsGrid.innerHTML = '';

  if (list.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'no-results';
    msg.textContent = 'No pets found in this category. Check back soon!';
    petsGrid.appendChild(msg);
    return;
  }

  list.forEach((pet) => {
    petsGrid.appendChild(createPetCard(pet));
  });
}

function createPetCard(pet) {
  const isReserved = pet.status === 'reserved';

  const article = document.createElement('article');
  article.className = 'pet-card';
  article.setAttribute('role', 'listitem');
  article.dataset.id = pet.id;

  article.innerHTML = `
    <div class="pet-card-image" aria-hidden="true">${pet.emoji}</div>
    <div class="pet-card-body">
      <h3 class="pet-card-name">${escapeHtml(pet.name)}</h3>
      <p class="pet-card-breed">${escapeHtml(pet.breed)}</p>
      <p class="pet-card-age">Age: ${escapeHtml(pet.age)}</p>
      <span class="pet-badge pet-badge--${pet.status}">${isReserved ? 'Reserved' : 'Available'}</span>
      <p class="pet-card-price">$${pet.price.toLocaleString()}</p>
    </div>
    <div class="pet-card-footer">
      <button
        class="btn btn-primary add-to-cart-btn"
        data-id="${pet.id}"
        aria-label="Add ${escapeHtml(pet.name)} the ${escapeHtml(pet.breed)} to cart for $${pet.price}"
        ${isReserved ? 'disabled aria-disabled="true"' : ''}
      >${isReserved ? 'Reserved' : 'Add to Cart'}</button>
    </div>
  `;

  if (isReserved) {
    const addBtn = article.querySelector('.add-to-cart-btn');
    addBtn.style.opacity = '0.5';
    addBtn.style.cursor = 'not-allowed';
  }

  return article;
}

// ---------- Filter ----------
function filterPets(type) {
  activeFilter = type;
  const filtered = type === 'all' ? PETS : PETS.filter((p) => p.type === type);
  renderPets(filtered);
}

// ---------- Cart ----------
function addToCart(petId) {
  const pet = PETS.find((p) => p.id === petId);
  if (!pet || pet.status === 'reserved') return;

  const existing = cart.find((i) => i.id === petId);
  if (existing) {
    announce(`${pet.name} is already in your cart.`);
    return;
  }

  cart.push({ ...pet });
  updateCartUI();
  announce(`${pet.name} added to cart.`);
}

function removeFromCart(petId) {
  const pet = cart.find((i) => i.id === petId);
  if (pet) {
    cart = cart.filter((i) => i.id !== petId);
    updateCartUI();
    renderCartItems();
    announce(`${pet.name} removed from cart.`);
  }
}

function updateCartUI() {
  const count = cart.length;
  cartCount.textContent = count;
  cartBtn.setAttribute('aria-label', `Shopping cart, ${count} item${count !== 1 ? 's' : ''}`);
}

function renderCartItems() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'cart-empty';
    empty.textContent = 'Your cart is empty.';
    cartItems.appendChild(empty);
    cartTotal.textContent = '$0.00';
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
      <span class="cart-item-emoji" aria-hidden="true">${item.emoji}</span>
      <div class="cart-item-info">
        <p class="cart-item-name">${escapeHtml(item.name)}</p>
        <p class="cart-item-price">$${item.price.toLocaleString()}</p>
      </div>
      <button
        class="cart-item-remove"
        data-id="${item.id}"
        aria-label="Remove ${escapeHtml(item.name)} from cart"
      >Remove</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function openCart() {
  renderCartItems();
  cartDialog.classList.remove('hidden');
  cartDialog.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  cartCloseBtn.focus();
}

function closeCart() {
  cartDialog.classList.add('hidden');
  cartDialog.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  cartBtn.focus();
}

// ---------- Accessibility helpers ----------
function announce(message) {
  const announcer = document.getElementById('a11y-announcer');
  if (announcer) {
    announcer.textContent = '';
    // Small delay to ensure screen readers pick up the change
    setTimeout(() => { announcer.textContent = message; }, 50);
  }
}

function createAnnouncer() {
  const el = document.createElement('div');
  el.id = 'a11y-announcer';
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-atomic', 'true');
  el.className = 'sr-only';
  document.body.appendChild(el);
}

// ---------- Events ----------
function bindEvents() {
  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  primaryNav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      primaryNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Category filters
  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      categoryCards.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-pressed', 'true');
      filterPets(card.dataset.filter);
    });
  });

  // Add to cart (delegated)
  petsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    addToCart(id);
  });

  // Open cart
  cartBtn.addEventListener('click', openCart);

  // Close cart
  cartCloseBtn.addEventListener('click', closeCart);

  // Close cart on overlay click
  cartDialog.addEventListener('click', (e) => {
    if (e.target === cartDialog) closeCart();
  });

  // Close cart on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !cartDialog.classList.contains('hidden')) {
      closeCart();
    }
  });

  // Remove from cart (delegated)
  cartItems.addEventListener('click', (e) => {
    const btn = e.target.closest('.cart-item-remove');
    if (!btn) return;
    removeFromCart(parseInt(btn.dataset.id, 10));
  });

  // Checkout
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      announce('Your cart is empty. Please add items before checking out.');
      return;
    }
    cart = [];
    updateCartUI();
    closeCart();
    announce('Thank you for your order! We will contact you shortly.');
  });

  // Contact form
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = document.getElementById('name').value.trim();
    const emailVal = document.getElementById('email').value.trim();
    const msgVal = document.getElementById('message').value.trim();

    if (!nameVal || !emailVal || !msgVal) {
      announce('Please fill in all required fields.');
      return;
    }

    // Simulate submission
    formSuccess.hidden = false;
    contactForm.reset();
    announce('Your message has been sent successfully.');

    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  });
}

// ---------- Simple HTML escaping ----------
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ---------- Kick off ----------
createAnnouncer();
init();
