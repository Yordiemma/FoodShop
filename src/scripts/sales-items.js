import { productData } from "/src/scripts/product-data.js";
import { addToCart } from "/src/scripts/cart.js";
import { removeFromCart } from "/src/scripts/cart.js";
document.addEventListener("DOMContentLoaded", () => {
  const saleItemsContainer = document.getElementById("sale-items");
  const saleItemsList = saleItemsContainer?.querySelector(".product-list");

  if (!saleItemsContainer || !saleItemsList) {
    console.error("Sale items container not found");
    return;
  }

  const createSaleItemElement = () => {
    let saleItemArray = [];
    saleItemsList.innerHTML = "";

    for (const product of productData) {
      if (product.sale && saleItemArray.length < 6) {
        saleItemArray.push(product);

        const currentPrice = product.salePrice || product.price || 0;
        const originalPrice = product.price || 0;
        const hasSalePrice = product.salePrice && product.price;
        saleItemsList.classList.add("horizontal");
        const productCard = document.createElement("div");
        productCard.className = "product-item";
        let productCount = 0;
        productCard.innerHTML+= `
        <div class="product-image-container">
          <span class="sale-tag">${
            product.sale ? product.sale.saleMessage : ""
          }</span>
          <img class="product-image"
            src="${product.photoUrl}"
            alt="" />
        </div>
        <div class="product-info">
          <div class="product-heading">
            <h3>${product.name}</h3>
            <div class="description">
              ${
                product.localProduced
                  ? `<span class="meta-tag">Local</span>`
                  : ""
              }
              <p class="description">${product.description}</p>
            </div>
          </div>
          <div class="product-footer">
            <div class="product-price-container">
              <p class="price active">${
                product.salePrice ? product.salePrice : product.price
              } kr/st</p>
              ${
                product.salePrice
                  ? `<p class="price old-price">${product.price} kr/st</p>`
                  : ""
              }
            </div>
            <button class="compact-button add-product">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
            <div class="stepper">
              <button class="stepper-button-minus remove-product">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div class="stepper-value">1</div>
              <button class="stepper-button-plus add-product">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

        saleItemsList.appendChild(productCard);

            // Attach event listeners to the add buttons for this specific product
    const addButtons = productCard.querySelectorAll(".add-product");
    addButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        productCount += 1;

        // Update the displayed stepper value
        const stepperValue = productCard.querySelector(".stepper-value");
        if (stepperValue) {
          stepperValue.textContent = productCount;
        }
        addToCart(product.id, event)
      });
    });
    
    const removeButtons = productCard.querySelectorAll(".remove-product");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {

        productCount -= 1;

        // Update the displayed stepper value
        const stepperValue = productCard.querySelector(".stepper-value");
        if (stepperValue) {
          stepperValue.textContent = productCount;
        }
        removeFromCart(product.id, event)
      }

      );
    });

      }
    }

  };

  createSaleItemElement();

  // Calculate discount percentage
  document.querySelectorAll("#sale-items .product-item").forEach((item) => {
    const newPriceEl = item.querySelector(".price.active");
    const oldPriceEl = item.querySelector(".price.old-price");
    const saleTag = item.querySelector(".sale-tag");

    if (newPriceEl && oldPriceEl && saleTag) {
      const newPrice = parseFloat(newPriceEl.textContent);
      const oldPrice = parseFloat(oldPriceEl.textContent);
      const discountPercentage = Math.round(
        ((oldPrice - newPrice) / oldPrice) * 100
      );

      saleTag.textContent = `-${discountPercentage}%`;
      item.classList.add("sale");
    }
  });
});
