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
    price: 10,
    image: "images/pen/panda.jpg",
    category: "pens",
  },
  {
    name: "أستيكة Cake Roll ❤️",
    description: "يلا نحلي بالكيك 😍",
    price: 20,
    images: [
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
    name: "أستيكة ايس كريم 😍",
    description: "",
    price: 15,
    image: "images/pen/photo_2026-08-15_23-17-17.jpg",
    category: "art",
  },
  {
    name: "استكية قلم سوستة ♥️ ",
    description: "استيكة حجم كبير",
    price: 45,
    image: "images/pen/photo_2026-08-15_23-21-08.jpg",
    category: "cute",
  },
  {
    name: "ستيكي نوتس دبدوب ❤️",
    description: "ورقها ناعم وكريمي جدا🤍 فيها 70 ورقة",
    price: 95,
    images: [
      "images/NOTES/photo_2026-08-15_23-31-33.jpg",
      "images/NOTES/photo_2026-08-15_23-31-35.jpg",
      "images/NOTES/photo_2026-08-15_23-31-37 (2).jpg",
      "images/NOTES/photo_2026-08-15_23-31-37.jpg"
    ],
    category: "cute",
  },
  {
    name: "كشكول سلك فواصل بلاستيك – حجم A5 ✨",
    description: `✔️ عدد 124 ورقة
✔️ متقسم .. ألوانه كلها باستيل ♥️
✔️ حجم A5 عملي يدخل الشنطة
✔️ خامة ورق ممتازة`,
    price: 150,
    image: "images/NOTES/photo_2026-08-16_00-00-14.jpg",
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


  favorites = favorites.filter(
    index => PRODUCTS[index]
  );


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

          <div class="favorite-item__actions">

            <button
              class="favorite-item__add-cart"
              type="button"
              data-index="${index}"
            >
              🛒 أضف إلى السلة
            </button>

            <button
              class="favorite-item__remove"
              type="button"
              data-index="${index}"
              title="إزالة من المفضلة"
            >
              إزالة من المفضلة 🗑️
            </button>

          </div>

        </div>

      </div>
    `;

  }).join("");


  favoritesItems
    .querySelectorAll(".favorite-item__remove")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.index);

        removeFromFavorites(index);

      });

    });


  favoritesItems
    .querySelectorAll(".favorite-item__add-cart")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.index);

        addToCart(index);

        button.textContent =
          "✓ تمت الإضافة";

        setTimeout(() => {

          button.textContent =
            "🛒 أضف إلى السلة";

        }, 900);

      });

    });


  updateFavoritesCount();
}


/* --------------------------------------------------------------------------
   10. ADD / REMOVE FAVORITE
   -------------------------------------------------------------------------- */

function toggleFavorite(productIndex, button) {

  if (favorites.includes(productIndex)) {

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


  localStorage.setItem(
    "pinkPaperFavorites",
    JSON.stringify(favorites)
  );


  updateFavoritesCount();

  renderFavorites();

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


  if (favoritesClose) {

    favoritesClose.addEventListener(
      "click",
      closeFavorites
    );

  }


  if (favoritesOverlay) {

    favoritesOverlay.addEventListener(
      "click",
      closeFavorites
    );

  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeFavorites();

      }

    }
  );


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

  const floatingCartCount =
    document.getElementById("floatingCartCount");


  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  if (cartCount) {
    cartCount.textContent = totalItems;
  }


  if (floatingCartCount) {
    floatingCartCount.textContent = totalItems;
  }

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


  const total =
    calculateCartTotal();


  if (cartTotal) {

    cartTotal.textContent =
      `${total} جنيه`;

  }


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
   24. VALIDATE CHECKOUT FORM
   -------------------------------------------------------------------------- */

function validateCheckoutForm() {

  let isValid = true;

  const fields = [
    {
      inputId: "customerName",
      errorId: "errorName",
      message: "من فضلك اكتبي الاسم ❤️",
      validate: (value) => value.trim().length > 0,
    },
    {
      inputId: "customerPhone",
      errorId: "errorPhone",
      message: "من فضلك اكتبي رقم صحيح (11 رقم) 📞",
      validate: (value) => /^01[0125][0-9]{8}$/.test(value.trim()),
    },
    {
      inputId: "customerAddress",
      errorId: "errorAddress",
      message: "من فضلك اكتبي عنوان التوصيل 📍",
      validate: (value) => value.trim().length > 0,
    },
  ];

  fields.forEach(({ inputId, errorId, message, validate }) => {

    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);

    if (!input || !errorEl) return;

    const field = input.closest(".form-field");

    if (!validate(input.value)) {

      field.classList.add("has-error");
      errorEl.textContent = message;
      isValid = false;

    } else {

      field.classList.remove("has-error");
      errorEl.textContent = "";

    }

  });

  return isValid;
}


/* --------------------------------------------------------------------------
   25. SEND CART TO WHATSAPP
   -------------------------------------------------------------------------- */

function sendCartToWhatsApp() {

  if (cart.length === 0) {

    alert(
      "السلة فارغة. أضف منتجًا واحدًا على الأقل أولًا 🛍️"
    );

    return;
  }


  if (!validateCheckoutForm()) {

    document
      .getElementById("checkoutForm")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    return;
  }


  const customerName =
    document.getElementById("customerName").value.trim();

  const customerPhone =
    document.getElementById("customerPhone").value.trim();

  const customerAddress =
    document.getElementById("customerAddress").value.trim();


  /* Order Message */

  let message = `Hello Pink & Paper! 🎀

🛍️ طلب جديد

👤 الاسم: ${customerName}
📞 رقم التواصل: ${customerPhone}
📍 العنوان: ${customerAddress}

المنتجات:

`;


  cart.forEach((item, index) => {

    const product =
      PRODUCTS[item.index];

    const itemTotal =
      product.price * item.quantity;


    message += `${index + 1}. ${product.name}
الكمية: ${item.quantity}
السعر: ${itemTotal} EGP

`;

  });


  const total =
    calculateCartTotal();


  message += `💰 الإجمالي: ${total} EGP

Thank you! 💕`;


  /* Open WhatsApp in a new tab, so the store stays open behind it */

  const whatsappLink =
    buildWhatsAppLink(message);


  window.open(whatsappLink, "_blank", "noopener");


  /* Reset the cart + form, close the cart drawer,
     then show the thank-you confirmation */

  cart = [];

  renderCart();

  updateCartCount();


  const checkoutForm =
    document.getElementById("checkoutForm");

  if (checkoutForm) {

    checkoutForm
      .querySelectorAll("input, textarea")
      .forEach((field) => {

        field.value = "";

        const wrapper =
          field.closest(".form-field");

        if (wrapper) {

          wrapper.classList.remove("has-error");

        }

      });

    checkoutForm
      .querySelectorAll(".form-error")
      .forEach((errorEl) => {

        errorEl.textContent = "";

      });

  }


  closeCart();

  openThankYou();

}


/* --------------------------------------------------------------------------
   26. SETUP SHOPPING CART
   -------------------------------------------------------------------------- */

function setupCart() {

  const cartToggle =
    document.getElementById("cartToggle");

  const floatingCartToggle =
    document.getElementById("floatingCartToggle");

  const cartClose =
    document.getElementById("cartClose");

  const cartOverlay =
    document.getElementById("cartOverlay");

  const cartWhatsapp =
    document.getElementById("cartWhatsapp");

  const cartClear =
    document.getElementById("cartClear");


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


  /* Floating Cart Button */

  if (floatingCartToggle) {

    floatingCartToggle.addEventListener(
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


  if (cartClose) {

    cartClose.addEventListener(
      "click",
      closeCart
    );

  }


  if (cartOverlay) {

    cartOverlay.addEventListener(
      "click",
      closeCart
    );

  }


  if (cartWhatsapp) {

    cartWhatsapp.addEventListener(
      "click",
      sendCartToWhatsApp
    );

  }


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
   26B. OPEN / CLOSE THANK YOU MODAL
   -------------------------------------------------------------------------- */

function openThankYou() {

  const thankyouModal =
    document.getElementById("thankyouModal");

  const thankyouOverlay =
    document.getElementById("thankyouOverlay");


  if (!thankyouModal) return;


  thankyouModal.classList.add("is-open");


  if (thankyouOverlay) {

    thankyouOverlay.classList.add("is-open");

  }

}


function closeThankYou() {

  const thankyouModal =
    document.getElementById("thankyouModal");

  const thankyouOverlay =
    document.getElementById("thankyouOverlay");


  if (!thankyouModal) return;


  thankyouModal.classList.remove("is-open");


  if (thankyouOverlay) {

    thankyouOverlay.classList.remove("is-open");

  }

}


/* --------------------------------------------------------------------------
   26C. SETUP THANK YOU MODAL
   -------------------------------------------------------------------------- */

function setupThankYou() {

  const thankyouClose =
    document.getElementById("thankyouClose");

  const thankyouOverlay =
    document.getElementById("thankyouOverlay");


  if (thankyouClose) {

    thankyouClose.addEventListener(
      "click",
      closeThankYou
    );

  }


  if (thankyouOverlay) {

    thankyouOverlay.addEventListener(
      "click",
      closeThankYou
    );

  }


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeThankYou();

      }

    }
  );

}


/* --------------------------------------------------------------------------
   27. WIRE UP GENERAL WHATSAPP LINKS
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
   28. MOBILE MENU TOGGLE
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
   29. SCROLL REVEAL
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
   30. SETUP SCROLL REVEAL
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
   31. BACK TO TOP BUTTON
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
   32. NAVBAR SHADOW ON SCROLL
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
   33. FOOTER YEAR
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
   CATEGORY FILTER
   -------------------------------------------------------------------------- */

function setupCategoryFilters() {

  const categoryCards =
    document.querySelectorAll(".category-card");

  const productCards =
    document.querySelectorAll(".product-card");


  categoryCards.forEach((card) => {

    card.addEventListener("click", (event) => {

      event.preventDefault();


      const selectedCategory =
        card.dataset.filter;


      productCards.forEach((product) => {

        const productCategory =
          product.dataset.category;


        if (
          productCategory === selectedCategory
        ) {

          product.style.display = "flex";

        } else {

          product.style.display = "none";

        }

      });


      document
        .getElementById("products")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    });

  });

}


/* --------------------------------------------------------------------------
   34. INIT
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

    setupThankYou();

    setupCategoryFilters();

    setupScrollReveal();

    setupBackToTop();

    setupNavbarScrollState();

    setupFooterYear();

  }
);