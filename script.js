/* ==========================================================================
   PINK & PAPER — SCRIPT.JS
   Handles: WhatsApp number config, product data + rendering, dynamic
   WhatsApp order links, mobile menu, scroll reveal, back-to-top, favorites.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. STORE CONFIG
   Change your real WhatsApp number here. Use the FULL international format
   with no "+", no spaces, no leading 0 — e.g. Egypt number 010xxxxxxxx
   becomes 201xxxxxxxx.
   -------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = "201159627686"; // <-- replace with your real number

/* --------------------------------------------------------------------------
   2. PRODUCT DATA
   Add, remove, or edit products here. Each product needs:
   - name        : shown on the card and sent in the WhatsApp message
   - description : short one-line description
   - price       : number only (EGP is added automatically)
   - image       : image URL — swap for your own product photo later
   - category    : matches a category card's data-filter (optional use)
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    name: "Pastel Gel Pens Set (12pcs)",
    description: "Smooth gel ink pens in 12 dreamy pastel shades.",
    price: 120,
    image: "https://placehold.co/500x500/f6c9d4/5b4038?text=Pastel+Gel+Pens",
    category: "pens",
  },
  {
    name: "Kraft Cover Notebook A5",
    description: "120-page dotted notebook with a soft kraft cover.",
    price: 85,
    image: "https://placehold.co/500x500/fbe2e8/5b4038?text=Kraft+Notebook",
    category: "notebooks",
  },
  {
    name: "Sticky Notes Bundle (5 pads)",
    description: "Five pastel sticky note pads for study &amp; planning.",
    price: 60,
    image: "https://placehold.co/500x500/f6c9d4/5b4038?text=Sticky+Notes",
    category: "school",
  },
  {
    name: "Watercolor Paint Set (24 colors)",
    description: "Beginner-friendly watercolor palette with brush.",
    price: 150,
    image: "https://placehold.co/500x500/fbe2e8/5b4038?text=Watercolor+Set",
    category: "art",
  },
  {
    name: "Aesthetic Sticker Pack",
    description: "50+ cute stickers for journals, laptops &amp; more.",
    price: 45,
    image: "https://placehold.co/500x500/f6c9d4/5b4038?text=Sticker+Pack",
    category: "cute",
  },
  {
    name: "Washi Tape Set (6 rolls)",
    description: "Patterned washi tape rolls for decorating anything.",
    price: 95,
    image: "https://placehold.co/500x500/fbe2e8/5b4038?text=Washi+Tape",
    category: "cute",
  },
];

/* --------------------------------------------------------------------------
   3. WHATSAPP LINK BUILDER
   Builds a wa.me link with a pre-filled message. Works for both a general
   "hello" message and a specific product order message.
   -------------------------------------------------------------------------- */
function buildWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

function buildProductMessage(product) {
  return `Hello Pink & Paper! 🎀\nI'd like to order:\n${product.name}\nPrice: ${product.price} EGP`;
}

/* --------------------------------------------------------------------------
   4. RENDER PRODUCT CARDS
   -------------------------------------------------------------------------- */
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((product, index) => {
    const orderLink = buildWhatsAppLink(buildProductMessage(product));

    return `
      <article class="product-card reveal" data-category="${product.category}">
        <div class="product-card__image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <button class="favorite-btn" data-index="${index}" aria-label="Add to favorites">🤍</button>
        </div>
        <div class="product-card__body">
          <h3 class="product-card__name">${product.name}</h3>
          <p class="product-card__desc">${product.description}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${product.price} EGP</span>
            <a class="product-card__order" href="${orderLink}" target="_blank" rel="noopener">
              <svg class="icon-wa" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.6 6.32A8.86 8.86 0 0 0 12.03 4a8.94 8.94 0 0 0-7.75 13.4L4 20.5l3.2-.84a8.9 8.9 0 0 0 4.83 1.41h.01a8.94 8.94 0 0 0 6.32-15.05zm-5.57 13.7a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.24.59.6-2.18-.18-.28a7.44 7.44 0 1 1 13.83-3.9 7.4 7.4 0 0 1-8 6.97zm4.07-5.56c-.22-.11-1.31-.65-1.51-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.11-.94-.35-1.79-1.1-.66-.6-1.11-1.33-1.24-1.55-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.05-.11-.5-1.2-.68-1.65-.18-.43-.36-.37-.5-.38h-.43c-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.56 2.38 3.78 3.34.53.23.94.36 1.26.47.53.17 1.01.14 1.39.09.42-.06 1.31-.53 1.5-1.05.18-.51.18-.95.13-1.05-.05-.09-.2-.15-.42-.26z"/></svg>
              Order
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Favorite (heart) toggle — purely visual, no backend/storage required
  grid.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.toggle("is-active");
      btn.textContent = isActive ? "❤️" : "🤍";
      btn.setAttribute("aria-label", isActive ? "Remove from favorites" : "Add to favorites");
    });
  });

  // Re-observe newly created cards for the scroll-reveal animation
  observeReveals();
}

/* --------------------------------------------------------------------------
   5. WIRE UP GENERAL WHATSAPP LINKS (hero, contact, footer)
   -------------------------------------------------------------------------- */
function wireGeneralWhatsAppLinks() {
  const generalMessage = "Hello Pink & Paper! 🎀\nI'd like to know more about your products.";
  const link = buildWhatsAppLink(generalMessage);

  ["heroWhatsapp", "contactWhatsapp", "footerWhatsapp"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });
}

/* --------------------------------------------------------------------------
   6. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu whenever a link is tapped
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* --------------------------------------------------------------------------
   7. SCROLL REVEAL (subtle fade + rise on scroll into view)
   -------------------------------------------------------------------------- */
let revealObserver;

function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    revealObserver.observe(el);
  });
}

function setupScrollReveal() {
  // Mark section headings and cards for the reveal animation
  const selectors = [
    ".section__head",
    ".category-card",
    ".feature-card",
    ".contact-card",
    ".about__content",
    ".about__visual",
  ];
  document.querySelectorAll(selectors.join(",")).forEach((el) => {
    el.classList.add("reveal");
  });
  observeReveals();
}

/* --------------------------------------------------------------------------
   8. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 500);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   9. NAVBAR SHADOW ON SCROLL (subtle polish)
   -------------------------------------------------------------------------- */
function setupNavbarScrollState() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? "0 8px 20px -14px rgba(91, 64, 56, 0.25)"
      : "none";
  });
}

/* --------------------------------------------------------------------------
   10. FOOTER YEAR
   -------------------------------------------------------------------------- */
function setupFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   INIT — run everything once the DOM is ready
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  wireGeneralWhatsAppLinks();
  setupMobileMenu();
  setupScrollReveal();
  setupBackToTop();
  setupNavbarScrollState();
  setupFooterYear();
});