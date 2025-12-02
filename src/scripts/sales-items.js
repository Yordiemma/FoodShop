import { productData } from "/src/scripts/product-data.js";

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
      if (product.sale) {
        saleItemArray.push(product);

        const currentPrice = product.salePrice || product.price || 0;
        const originalPrice = product.price || 0;
        const hasSalePrice = product.salePrice && product.price;

        const productCard = document.createElement("div");
        productCard.className = "product-item large";

        productCard.innerHTML = `
          <div class="product-image-container">
            <span class="sale-tag">${product.sale.saleMessage}</span>
            <img class="product-image" src="${product.photoUrl}" alt="${
          product.name
        }" />
          </div>
          <div class="product-info">
            <div class="product-heading">
              <h3>${product.name}</h3>
              <p class="description">${product.description}</p>
            </div>
            <div class="product-footer">
              <div class="product-price-container">
                <p class="price active sale-price">${currentPrice.toFixed(
                  2
                )} kr</p>
                ${
                  hasSalePrice
                    ? `<p class="price old-price">${originalPrice.toFixed(
                        2
                      )} kr</p>`
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
      }

    }
    

    console.log("Total sale items rendered:", saleItemArray.length);
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
