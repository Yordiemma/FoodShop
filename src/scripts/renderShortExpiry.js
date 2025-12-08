import { productData } from "./product-data.js";
import { addToCart, removeFromCart } from "./cart.js";

export function renderShortExpiryProducts(container) {
  const allItems = productData.filter((p) => p.shortExpiryDate);

  if (!container) return;

  function render() {
    container.innerHTML = "";
    container.classList.add("product-list", "horizontal");

    // ALWAYS show first 3 items
    const itemsToShow = allItems.slice(0, 3);

    itemsToShow.forEach((product) => {
      let count = 0;

      const currentPrice = product.salePrice || product.price;
      const originalPrice = product.price;
      const hasSale = product.salePrice && originalPrice;

      const card = document.createElement("div");
      card.className = "product-item";

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

            <button class="compact-button add-product initial-btn">
              <svg width="24" height="24">
                <path d="M12 5V19" stroke="currentColor" stroke-width="2"/>
                <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>

            <div class="stepper">
              <button class="stepper-button-minus remove-product">
                <svg width="24" height="24">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>

              <div class="stepper-value">1</div>

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

      stepper.style.opacity = "0";

      initialButton.addEventListener("click", (e) => {
        count = 1;
        stepperValue.textContent = count;

        initialButton.style.display = "none";
        stepper.style.opacity = "1";

        addToCart(product.id, e);
      });

      const plusButton = card.querySelector(".stepper-button-plus");
      plusButton.addEventListener("click", (e) => {
        count++;
        stepperValue.textContent = count;
        addToCart(product.id, e);
      });

      minusButtons.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          if (count > 1) {
            count--;
            stepperValue.textContent = count;
            removeFromCart(product.id, e);
          } else {
            count = 0;
            stepper.style.opacity = "0";
            initialButton.style.display = "flex";
            removeFromCart(product.id, e);
          }
        })
      );
    });

    container.querySelectorAll(".product-item").forEach((card) => {
      const newPrice = parseFloat(card.querySelector(".price.active")?.textContent);
      const oldPrice = parseFloat(card.querySelector(".price.old-price")?.textContent);
      const saleTag = card.querySelector(".sale-tag");

      if (newPrice && oldPrice && saleTag) {
        const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
        saleTag.textContent = `-${discount}%`;
        card.classList.add("sale");
      }
    });
  }

  render();
}


