/* ==========================================================================
   PINK & PAPER — SCRIPT.JS
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. STORE CONFIG
   -------------------------------------------------------------------------- */

const WHATSAPP_NUMBER = "201159627686";


/* --------------------------------------------------------------------------
   2. PRODUCT DATA
   -------------------------------------------------------------------------- */

const PRODUCTS = [
  {
    name: "كريكتور",
    description: "شكل باندا 4 مللي",
    price: 15,
    image: "images/pen/panda.jpg",
    category: "pens",
  },
  {
    name: "أستيكة Cake Roll ❤️",
    description: "يلا نحلي بالكيك 😍",
    price: 20,
    images: [
      "images/pen/earaser.jpg",
      "images/pen/photo_2026-08-15_22-08-20.jpg",
    ],
    category: "pens",
  },
    {
    name: "نوتة كرومي 4 فواصل 🎀",
    description: "مقاس 10*12 سم تقريباً ",
    price: 30,
    images: [
      "images/NOTES/photo_2026-08-15_22-45-22.jpg",

    ],
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
    description: "50+ cute stickers for journals, laptops & more.",
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
   3. SHOPPING CART
   -------------------------------------------------------------------------- */

let cart = [];


/* --------------------------------------------------------------------------
   4. FAVORITES
   -------------------------------------------------------------------------- */

let favorites = JSON.parse(
  localStorage.getItem("pinkPaperFavorites")
) || [];


/* --------------------------------------------------------------------------
   5. WHATSAPP LINK BUILDER
   -------------------------------------------------------------------------- */

function buildWhatsAppLink(message) {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}


/* --------------------------------------------------------------------------
   6. GENERAL PRODUCT WHATSAPP MESSAGE
   -------------------------------------------------------------------------- */

function buildProductMessage(product) {
  return `Hello Pink & Paper! 🎀
I'd like to order:
${product.name}
Price: ${product.price} EGP`;
}


/* --------------------------------------------------------------------------
   7. PRODUCT IMAGES HELPER
   -------------------------------------------------------------------------- */

function getProductImages(product) {
  if (product.images && product.images.length > 0) {
    return product.images;
  }

  return [product.image];
}


/* --------------------------------------------------------------------------
   8. UPDATE FAVORITES COUNT
   -------------------------------------------------------------------------- */

function updateFavoritesCount() {
  const favoritesCount =
    document.getElementById("favoritesCount");

  if (!favoritesCount) return;

  favoritesCount.textContent = favorites.length;
}


/* --------------------------------------------------------------------------
   9. RENDER FAVORITES
   -------------------------------------------------------------------------- */

function renderFavorites() {

  const favoritesItems =
    document.getElementById("favoritesItems");

  if (!favoritesItems) return;


  /* Remove invalid indexes just in case */

  favorites = favorites.filter(
    index => PRODUCTS[index]
  );


  /* Empty favorites */

  if (favorites.length === 0) {

    favoritesItems.innerHTML = `
      <div class="favorites__empty">

        <span>🤍</span>

        <h3>لا توجد منتجات مفضلة</h3>

        <p>
          اضغط على ❤️ بجانب أي منتج لإضافته إلى مفضلاتك.
        </p>

      </div>
    `;

    updateFavoritesCount();

    return;
  }


  /* Render favorite products */

  favoritesItems.innerHTML = favorites.map(index => {

    const product = PRODUCTS[index];

    const productImages =
      getProductImages(product);

    return `
      <div class="favorite-item">

        <div class="favorite-item__image">

          <img
            src="${productImages[0]}"
            alt="${product.name}"
          />

        </div>

        <div class="favorite-item__info">

          <h3 class="favorite-item__name">
            ${product.name}
          </h3>

          <p class="favorite-item__price">
            ${product.price} جنيه
          </p>

          <button
            class="favorite-item__remove"
            type="button"
            data-index="${index}"
          >
            إزالة من المفضلة
          </button>

        </div>

      </div>
    `;

  }).join("");


  /* Remove favorite buttons */

  favoritesItems
    .querySelectorAll(".favorite-item__remove")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.index);

        removeFromFavorites(index);

      });

    });


  updateFavoritesCount();
}


/* --------------------------------------------------------------------------
   10. ADD / REMOVE FAVORITE
   -------------------------------------------------------------------------- */

function toggleFavorite(productIndex, button) {

  if (favorites.includes(productIndex)) {

    /* Remove */

    favorites = favorites.filter(
      index => index !== productIndex
    );

    if (button) {

      button.classList.remove("is-active");

      button.textContent = "🤍";

      button.setAttribute(
        "aria-label",
        "Add to favorites"
      );

    }

  } else {

    /* Add */

    favorites.push(productIndex);

    if (button) {

      button.classList.add("is-active");

      button.textContent = "❤️";

      button.setAttribute(
        "aria-label",
        "Remove from favorites"
      );

    }

  }


  /* Save */

  localStorage.setItem(
    "pinkPaperFavorites",
    JSON.stringify(favorites)
  );


  /* Update counter */

  updateFavoritesCount();


  /* Update favorites drawer */

  renderFavorites();

  /*
    IMPORTANT:
    We DO NOT open the favorites drawer here.
    It only opens when the user clicks the ❤️ counter/button.
  */
}


/* --------------------------------------------------------------------------
   11. REMOVE FROM FAVORITES
   -------------------------------------------------------------------------- */

function removeFromFavorites(productIndex) {

  favorites = favorites.filter(
    index => index !== productIndex
  );


  localStorage.setItem(
    "pinkPaperFavorites",
    JSON.stringify(favorites)
  );


  /* Update product card heart */

  const button = document.querySelector(
    `.favorite-btn[data-index="${productIndex}"]`
  );

  if (button) {

    button.classList.remove("is-active");

    button.textContent = "🤍";

    button.setAttribute(
      "aria-label",
      "Add to favorites"
    );

  }


  updateFavoritesCount();

  renderFavorites();
}


/* --------------------------------------------------------------------------
   12. OPEN FAVORITES
   -------------------------------------------------------------------------- */

function openFavorites() {

  const favoritesElement =
    document.getElementById("favorites");

  const overlay =
    document.getElementById("favoritesOverlay");

  const favoritesToggle =
    document.getElementById("favoritesToggle");


  if (!favoritesElement) return;


  renderFavorites();


  favoritesElement.classList.add("is-open");


  if (overlay) {

    overlay.classList.add("is-open");

  }


  if (favoritesToggle) {

    favoritesToggle.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}


/* --------------------------------------------------------------------------
   13. CLOSE FAVORITES
   -------------------------------------------------------------------------- */

function closeFavorites() {

  const favoritesElement =
    document.getElementById("favorites");

  const overlay =
    document.getElementById("favoritesOverlay");

  const favoritesToggle =
    document.getElementById("favoritesToggle");


  if (!favoritesElement) return;


  favoritesElement.classList.remove("is-open");


  if (overlay) {

    overlay.classList.remove("is-open");

  }


  if (favoritesToggle) {

    favoritesToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


/* --------------------------------------------------------------------------
   14. SETUP FAVORITES
   -------------------------------------------------------------------------- */

function setupFavorites() {

  const favoritesToggle =
    document.getElementById("favoritesToggle");

  const favoritesClose =
    document.getElementById("favoritesClose");

  const favoritesOverlay =
    document.getElementById("favoritesOverlay");


  /* Open / close favorites */

  if (favoritesToggle) {

    favoritesToggle.addEventListener(
      "click",
      () => {

        const favoritesElement =
          document.getElementById("favorites");


        if (
          favoritesElement?.classList.contains(
            "is-open"
          )
        ) {

          closeFavorites();

        } else {

          openFavorites();

        }

      }
    );

  }


  /* Close button */

  if (favoritesClose) {

    favoritesClose.addEventListener(
      "click",
      closeFavorites
    );

  }


  /* Close by clicking outside */

  if (favoritesOverlay) {

    favoritesOverlay.addEventListener(
      "click",
      closeFavorites
    );

  }


  /* Close with Escape */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeFavorites();

      }

    }
  );


  /* Initial count */

  updateFavoritesCount();

  renderFavorites();
}


/* --------------------------------------------------------------------------
   15. RENDER PRODUCT CARDS
   -------------------------------------------------------------------------- */

function renderProducts() {

  const grid =
    document.getElementById("productGrid");

  if (!grid) return;


  grid.innerHTML = PRODUCTS.map(
    (product, index) => {

      const isFavorite =
        favorites.includes(index);


      const productImages =
        getProductImages(product);


      const mainImage =
        productImages[0];


      return `
        <article
          class="product-card reveal"
          data-category="${product.category}"
        >

          <div class="product-card__image-wrap">

            <img
              class="product-main-image"
              src="${mainImage}"
              alt="${product.name}"
              loading="lazy"
            />

            <button
              class="favorite-btn ${
                isFavorite ? "is-active" : ""
              }"
              data-index="${index}"
              aria-label="${
                isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }"
              type="button"
            >
              ${isFavorite ? "❤️" : "🤍"}
            </button>

          </div>


          ${
            productImages.length > 1
              ? `
                <div class="product-thumbnails">

                  ${productImages.map(
                    (image, imageIndex) => `
                      <button
                        class="product-thumbnail ${
                          imageIndex === 0
                            ? "is-active"
                            : ""
                        }"
                        type="button"
                        data-image="${image}"
                      >

                        <img
                          src="${image}"
                          alt="${product.name}"
                        />

                      </button>
                    `
                  ).join("")}

                </div>
              `
              : ""
          }


          <div class="product-card__body">

            <h3 class="product-card__name">
              ${product.name}
            </h3>

            <p class="product-card__desc">
              ${product.description}
            </p>


            <div class="product-card__footer">

              <span class="product-card__price">
                ${product.price} EGP
              </span>


              <button
                class="product-card__order add-to-cart"
                data-index="${index}"
                type="button"
              >
                🛒 Add to cart
              </button>

            </div>

          </div>

        </article>
      `;

    }
  ).join("");


  /* ------------------------------------------------------------------------
     PRODUCT IMAGE THUMBNAILS
     ------------------------------------------------------------------------ */

  grid
    .querySelectorAll(".product-thumbnail")
    .forEach((thumbnail) => {

      thumbnail.addEventListener(
        "click",
        () => {

          const image =
            thumbnail.dataset.image;


          const card =
            thumbnail.closest(
              ".product-card"
            );


          const mainImage =
            card.querySelector(
              ".product-main-image"
            );


          if (mainImage) {

            mainImage.src = image;

          }


          card
            .querySelectorAll(
              ".product-thumbnail"
            )
            .forEach((item) => {

              item.classList.remove(
                "is-active"
              );

            });


          thumbnail.classList.add(
            "is-active"
          );

        }
      );

    });


  /* ------------------------------------------------------------------------
     FAVORITE BUTTONS
     ------------------------------------------------------------------------ */

  grid
    .querySelectorAll(".favorite-btn")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(button.dataset.index);

          toggleFavorite(
            index,
            button
          );

        }
      );

    });


  /* ------------------------------------------------------------------------
     ADD TO CART BUTTONS
     ------------------------------------------------------------------------ */

  grid
    .querySelectorAll(".add-to-cart")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const productIndex =
            Number(button.dataset.index);

          addToCart(productIndex);

        }
      );

    });


  /* Re-observe cards */

  observeReveals();
}


/* --------------------------------------------------------------------------
   16. ADD PRODUCT TO CART
   -------------------------------------------------------------------------- */

function addToCart(productIndex) {

  const existingItem =
    cart.find(
      item => item.index === productIndex
    );


  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cart.push({
      index: productIndex,
      quantity: 1
    });

  }


  renderCart();

  updateCartCount();


  /* Small visual feedback */

  const addButton =
    document.querySelector(
      `.add-to-cart[data-index="${productIndex}"]`
    );


  if (addButton) {

    const originalText =
      addButton.innerHTML;

    addButton.innerHTML = "✓ Added";


    setTimeout(() => {

      addButton.innerHTML =
        originalText;

    }, 900);

  }

}


/* --------------------------------------------------------------------------
   17. REMOVE PRODUCT FROM CART
   -------------------------------------------------------------------------- */

function removeFromCart(productIndex) {

  cart = cart.filter(
    item => item.index !== productIndex
  );

  renderCart();

  updateCartCount();
}


/* --------------------------------------------------------------------------
   18. CHANGE PRODUCT QUANTITY
   -------------------------------------------------------------------------- */

function changeQuantity(productIndex, amount) {

  const item =
    cart.find(
      item => item.index === productIndex
    );


  if (!item) return;


  item.quantity += amount;


  if (item.quantity <= 0) {

    removeFromCart(productIndex);

    return;

  }


  renderCart();

  updateCartCount();
}


/* --------------------------------------------------------------------------
   19. UPDATE CART COUNT
   -------------------------------------------------------------------------- */

function updateCartCount() {

  const cartCount =
    document.getElementById("cartCount");

  if (!cartCount) return;


  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  cartCount.textContent =
    totalItems;
}


/* --------------------------------------------------------------------------
   20. CALCULATE CART TOTAL
   -------------------------------------------------------------------------- */

function calculateCartTotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        PRODUCTS[item.index];

      return total +
        (product.price * item.quantity);

    },
    0
  );

}


/* --------------------------------------------------------------------------
   21. RENDER CART
   -------------------------------------------------------------------------- */

function renderCart() {

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");


  if (!cartItems) return;


  /* Empty cart */

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="cart__empty">

        <span>🛍️</span>

        <h3>السلة فارغة</h3>

        <p>
          أضف المنتجات التي تعجبك وسنجهز طلبك لك.
        </p>

      </div>
    `;


    if (cartTotal) {

      cartTotal.textContent =
        "0 جنيه";

    }

    return;

  }


  /* Cart products */

  cartItems.innerHTML =
    cart.map(item => {

      const product =
        PRODUCTS[item.index];

      const productImages =
        getProductImages(product);


      const itemTotal =
        product.price *
        item.quantity;


      return `
        <div class="cart-item">

          <div class="cart-item__image">

            <img
              src="${productImages[0]}"
              alt="${product.name}"
            />

          </div>


          <div class="cart-item__info">

            <div class="cart-item__name">
              ${product.name}
            </div>

            <div class="cart-item__price">
              ${itemTotal} EGP
            </div>


            <div class="cart-item__quantity">

              <button
                class="quantity-btn"
                type="button"
                data-action="decrease"
                data-index="${item.index}"
                aria-label="تقليل الكمية"
              >
                −
              </button>


              <span class="quantity-value">
                ${item.quantity}
              </span>


              <button
                class="quantity-btn"
                type="button"
                data-action="increase"
                data-index="${item.index}"
                aria-label="زيادة الكمية"
              >
                +
              </button>

            </div>

          </div>


          <button
            class="cart-item__remove"
            type="button"
            data-action="remove"
            data-index="${item.index}"
            aria-label="حذف المنتج"
          >
            🗑️
          </button>

        </div>
      `;

    }).join("");


  /* Update total */

  const total =
    calculateCartTotal();


  if (cartTotal) {

    cartTotal.textContent =
      `${total} جنيه`;

  }


  /* Cart buttons */

  cartItems
    .querySelectorAll(
      ".quantity-btn, .cart-item__remove"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(button.dataset.index);

          const action =
            button.dataset.action;


          if (action === "increase") {

            changeQuantity(
              index,
              1
            );

          }


          if (action === "decrease") {

            changeQuantity(
              index,
              -1
            );

          }


          if (action === "remove") {

            removeFromCart(index);

          }

        }
      );

    });

}


/* --------------------------------------------------------------------------
   22. OPEN CART
   -------------------------------------------------------------------------- */

function openCart() {

  const cartElement =
    document.getElementById("cart");

  const overlay =
    document.getElementById("cartOverlay");

  const cartToggle =
    document.getElementById("cartToggle");


  if (!cartElement) return;


  cartElement.classList.add(
    "is-open"
  );


  if (overlay) {

    overlay.classList.add(
      "is-open"
    );

  }


  if (cartToggle) {

    cartToggle.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}


/* --------------------------------------------------------------------------
   23. CLOSE CART
   -------------------------------------------------------------------------- */

function closeCart() {

  const cartElement =
    document.getElementById("cart");

  const overlay =
    document.getElementById("cartOverlay");

  const cartToggle =
    document.getElementById("cartToggle");


  if (!cartElement) return;


  cartElement.classList.remove(
    "is-open"
  );


  if (overlay) {

    overlay.classList.remove(
      "is-open"
    );

  }


  if (cartToggle) {

    cartToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


/* --------------------------------------------------------------------------
   24. SEND CART TO WHATSAPP
   -------------------------------------------------------------------------- */

function sendCartToWhatsApp() {

  if (cart.length === 0) {

    alert(
      "السلة فارغة. أضف منتجًا واحدًا على الأقل أولًا 🛍️"
    );

    return;

  }


  let message = `Hello Pink & Paper! 🎀

I'd like to place an order:

`;


  cart.forEach((item, index) => {

    const product =
      PRODUCTS[item.index];

    const itemTotal =
      product.price *
      item.quantity;


    message += `${index + 1}. ${product.name}
Quantity: ${item.quantity}
Price: ${itemTotal} EGP

`;

  });


  const total =
    calculateCartTotal();


  message += `Total: ${total} EGP

Thank you! 💕`;


  const whatsappLink =
    buildWhatsAppLink(message);


  window.open(
    whatsappLink,
    "_blank",
    "noopener,noreferrer"
  );

}


/* --------------------------------------------------------------------------
   25. SETUP SHOPPING CART
   -------------------------------------------------------------------------- */

function setupCart() {

  const cartToggle =
    document.getElementById("cartToggle");

  const cartClose =
    document.getElementById("cartClose");

  const cartOverlay =
    document.getElementById("cartOverlay");

  const cartWhatsapp =
    document.getElementById("cartWhatsapp");

  const cartClear =
    document.getElementById("cartClear");


  /* Cart toggle */

  if (cartToggle) {

    cartToggle.addEventListener(
      "click",
      () => {

        const cartElement =
          document.getElementById("cart");


        if (
          cartElement?.classList.contains(
            "is-open"
          )
        ) {

          closeCart();

        } else {

          openCart();

        }

      }
    );

  }


  /* Close */

  if (cartClose) {

    cartClose.addEventListener(
      "click",
      closeCart
    );

  }


  /* Overlay */

  if (cartOverlay) {

    cartOverlay.addEventListener(
      "click",
      closeCart
    );

  }


  /* WhatsApp */

  if (cartWhatsapp) {

    cartWhatsapp.addEventListener(
      "click",
      sendCartToWhatsApp
    );

  }


  /* Clear */

  if (cartClear) {

    cartClear.addEventListener(
      "click",
      () => {

        if (cart.length === 0) return;


        cart = [];

        renderCart();

        updateCartCount();

      }
    );

  }


  /* Escape */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeCart();

      }

    }
  );


  renderCart();

  updateCartCount();

}


/* --------------------------------------------------------------------------
   26. WIRE UP GENERAL WHATSAPP LINKS
   -------------------------------------------------------------------------- */

function wireGeneralWhatsAppLinks() {

  const generalMessage =
    "Hello Pink & Paper! 🎀\nI'd like to know more about your products.";


  const link =
    buildWhatsAppLink(
      generalMessage
    );


  [
    "heroWhatsapp",
    "contactWhatsapp",
    "footerWhatsapp"
  ].forEach((id) => {

    const el =
      document.getElementById(id);


    if (el) {

      el.href = link;

    }

  });

}


/* --------------------------------------------------------------------------
   27. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */

function setupMobileMenu() {

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");


  if (!menuToggle || !navLinks)
    return;


  menuToggle.addEventListener(
    "click",
    () => {

      const isOpen =
        navLinks.classList.toggle(
          "is-open"
        );


      menuToggle.classList.toggle(
        "is-open",
        isOpen
      );


      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  navLinks
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove(
            "is-open"
          );

          menuToggle.classList.remove(
            "is-open"
          );

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* --------------------------------------------------------------------------
   28. SCROLL REVEAL
   -------------------------------------------------------------------------- */

let revealObserver;


function observeReveals() {

  if (!revealObserver) {

    revealObserver =
      new IntersectionObserver(

        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: 0.15
        }

      );

  }


  document
    .querySelectorAll(
      ".reveal:not(.is-visible)"
    )
    .forEach((el) => {

      revealObserver.observe(el);

    });

}


/* --------------------------------------------------------------------------
   29. SETUP SCROLL REVEAL
   -------------------------------------------------------------------------- */

function setupScrollReveal() {

  const selectors = [

    ".section__head",
    ".category-card",
    ".feature-card",
    ".contact-card",
    ".about__content",
    ".about__visual"

  ];


  document
    .querySelectorAll(
      selectors.join(",")
    )
    .forEach((el) => {

      el.classList.add(
        "reveal"
      );

    });


  observeReveals();

}


/* --------------------------------------------------------------------------
   30. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */

function setupBackToTop() {

  const btn =
    document.getElementById(
      "backToTop"
    );


  if (!btn) return;


  window.addEventListener(
    "scroll",
    () => {

      btn.classList.toggle(
        "is-visible",
        window.scrollY > 500
      );

    }
  );


  btn.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}


/* --------------------------------------------------------------------------
   31. NAVBAR SHADOW ON SCROLL
   -------------------------------------------------------------------------- */

function setupNavbarScrollState() {

  const navbar =
    document.getElementById(
      "navbar"
    );


  if (!navbar) return;


  window.addEventListener(
    "scroll",
    () => {

      navbar.style.boxShadow =
        window.scrollY > 10

          ? "0 8px 20px -14px rgba(91, 64, 56, 0.25)"

          : "none";

    }
  );

}


/* --------------------------------------------------------------------------
   32. FOOTER YEAR
   -------------------------------------------------------------------------- */

function setupFooterYear() {

  const yearEl =
    document.getElementById(
      "year"
    );


  if (yearEl) {

    yearEl.textContent =
      new Date().getFullYear();

  }

}


/* --------------------------------------------------------------------------
   33. INIT
   -------------------------------------------------------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderProducts();

    renderFavorites();

    updateFavoritesCount();

    wireGeneralWhatsAppLinks();

    setupMobileMenu();

    setupCart();

    setupFavorites();

    setupScrollReveal();

    setupBackToTop();

    setupNavbarScrollState();

    setupFooterYear();

  }
);