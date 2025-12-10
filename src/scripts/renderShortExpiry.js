import { productData } from "./product-data.js";
import { addToCart, cartItems, removeFromCart } from "./cart.js";

export function renderShortExpiryProducts(container) {
  const allItems = productData.filter((p) => p.shortExpiryDate);

  if (!container) return;

  function render() {
    container.innerHTML = "";
    container.classList.add("product-list", "horizontal");

    // ALWAYS show first 3 items
    const itemsToShow = allItems.slice(0, 3);

    itemsToShow.forEach((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      const currentAmount = cartItem ? cartItem.amount : 0;

      const currentPrice = product.salePrice || product.price;
      const originalPrice = product.price;
      const hasSale = product.salePrice && originalPrice;

      const card = document.createElement("div");
      card.className = "product-item";
      card.dataset.id = product.id;

      const stepperDisplay = currentAmount > 0 ? "flex" : "none";
      const stepperOpacity = currentAmount > 0 ? "1" : "0";
      const btnDisplay = currentAmount > 0 ? "none" : "block";

      card.innerHTML = `
        <div class="product-image-container">
          <span class="sale-tag">${product.sale ? product.sale.saleMessage : ""}</span>
          <img class="product-image" src="${product.photoUrl}" alt="${product.name}">
        </div>

        <div class="product-info">
          <div class="product-heading">
            <h3>${product.name}</h3>
            <div class="description">
              ${product.localProduced ? `<span class="meta-tag">Local</span>` : ""}
              <p class="description">${product.description}</p>
            </div>
          </div>

          <div class="product-footer">
            <div class="product-price-container">
              <p class="price active">${currentPrice} kr/st</p>
              ${hasSale ? `<p class="price old-price">${originalPrice} kr/st</p>` : ""}
            </div>

            <button class="compact-button add-product initial-btn" style="display:${btnDisplay}">
              <svg width="24" height="24">
                <path d="M12 5V19" stroke="currentColor" stroke-width="2"/>
                <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>

            <div class="stepper" style="display: ${stepperDisplay}; opacity: ${stepperOpacity}">
              <button class="stepper-button-minus remove-product">
                <svg width="24" height="24">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>

              <div class="stepper-value">${currentAmount}</div>

              <button class="stepper-button-plus add-product">
                <svg width="24" height="24">
                  <path d="M12 5V19" stroke="currentColor" stroke-width="2"/>
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);

      const initialButton = card.querySelector(".initial-btn");
      const stepper = card.querySelector(".stepper");
      const stepperValue = card.querySelector(".stepper-value");
      const minusButtons = card.querySelectorAll(".remove-product");

      initialButton.addEventListener("click", (e) => {

        addToCart(product.id, e);

        stepperValue.textContent = 1;
        initialButton.style.display = 'none';
        stepper.style.display = 'flex';
        stepper.style.opacity = '1';

      });

      const plusButton = card.querySelector(".stepper-button-plus");
      plusButton.addEventListener("click", (e) => {
        addToCart(product.id, e);
        const item = cartItems.find(i => i.id === product.id);
        if (item) stepperValue.textContent = item.amount;
      });

      minusButtons.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          removeFromCart(product.id, e);
          const item = cartItems.find(i => i.id === product.id);
          const newAmount = item ? item.amount : 0;

          stepperValue.textContent = newAmount;

          if (newAmount === 0) {
            stepper.style.opacity = '0';
            stepper.style.display = 'none'; 
            initialButton.style.display = 'block';
          }
        })
      );
    });

    container.querySelectorAll(".product-item").forEach((card) => {
      const newPrice = parseFloat(card.querySelector(".price.active")?.textContent);
      const oldPrice = parseFloat(card.querySelector(".price.old-price")?.textContent);
      const saleTag = card.querySelector(".sale-tag");

      if (newPrice && oldPrice && saleTag) {
        card.classList.add("sale");
      }
    });
  }

  render();
}


