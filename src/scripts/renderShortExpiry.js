import { productData } from "./product-data.js";
import { addToCart, removeFromCart } from "./cart.js";

export function renderShortExpiryProducts(container) {

  const shortExpiry = productData.filter((p) => p.shortExpiryDate);


  container.innerHTML = "";


  shortExpiry.forEach((product) => {
    let productCount = 0;
    const isOnSale = product.sale && product.salePrice != null;

    const card = document.createElement("div");
    card.classList.add("product-item", "large"); // same layout as big cards

    card.innerHTML = `
      <div class="product-image-container">
        ${isOnSale ? `<span class="sale-tag">${product.sale.saleMessage}</span>` : ""}
        <img
          class="product-image"
          src="${product.photoUrl}"
          alt="${product.name}"
        />
      </div>

      <div class="product-info">
        <div class="product-heading">
          <h3>${product.name}</h3>
          <p class="description">${product.description}</p>
        </div>

        <div class="product-footer">
          <div class="product-price-container">
            ${
              isOnSale
                ? `
                  <p class="price active sale-price">${product.salePrice.toFixed(2)} kr/st</p>
                  <p class="price old-price">${product.price.toFixed(2)} kr/st</p>
                `
                : `
                  <p class="price active">${product.price.toFixed(2)} kr/st</p>
                `
            }
          </div>

          <button class="compact-button full-width add-product">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5 12H19" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <div class="stepper">
            <button class="stepper-button-minus remove-product">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 12H19" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div class="stepper-value">${productCount}</div>

            <button class="stepper-button-plus add-product">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 12H19" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);

    const stepperValue = card.querySelector(".stepper-value");

    const addButtons = card.querySelectorAll(".add-product");
    addButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        productCount += 1;
        stepperValue.textContent = productCount;
        addToCart(product.id, event);
      });
    });

    const removeButtons = card.querySelectorAll(".remove-product");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        if (productCount > 0) {
          productCount -= 1;
          stepperValue.textContent = productCount;
          removeFromCart(product.id, event);
        }
      });
    });
  });
}
