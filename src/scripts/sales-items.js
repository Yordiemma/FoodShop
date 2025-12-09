import { productData } from "/src/scripts/product-data.js";
import { addToCart } from "/src/scripts/cart.js";
import { removeFromCart } from "/src/scripts/cart.js";
import { cartItems } from "./cart";
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

        const cartItem = cartItems.find(item => item.id === product.id);
        let currentAmount = cartItem ? cartItem.amount : 0;

        const currentPrice = product.salePrice || product.price || 0;
        const originalPrice = product.price || 0;
        const hasSalePrice = product.salePrice && product.price;

        saleItemsList.classList.add("horizontal");
        const productCard = document.createElement("div");
        productCard.className = "product-item";
        productCard.dataset.id = product.id;

        const stepperDisplay = currentAmount > 0 ? 'flex' : 'none';
        const stepperOpacity = currentAmount > 0 ? '1' : '0';
        const btnDisplay = currentAmount > 0 ? 'none' : 'block';

        productCard.innerHTML += `
        <div class="product-image-container">
          <span class="sale-tag">${product.sale ? product.sale.saleMessage : ""
          }</span>
          <img class="product-image"
            src="${product.photoUrl}"
            alt="" />
        </div>
        <div class="product-info">
          <div class="product-heading">
            <h3>${product.name}</h3>
            <div class="description">
              ${product.localProduced
            ? `<span class="meta-tag">Local</span>`
            : ""
          }
              <p class="description">${product.description}</p>
            </div>
          </div>
          <div class="product-footer">
            <div class="product-price-container">
              <p class="price active">${product.salePrice ? product.salePrice : product.price
          } kr/st</p>
              ${product.salePrice
            ? `<p class="price old-price">${product.price} kr/st</p>`
            : ""
          }
            </div>
            <button class="compact-button add-product" style='display: ${btnDisplay}'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
            <div class="stepper" style='display: ${stepperDisplay}; opacity: ${stepperOpacity}'>
              <button class="stepper-button-minus remove-product">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true">
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div class="stepper-value">${currentAmount}</div>
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

        //Update function to sync with the same products in other list.
        const updateAllProducts = () => {
          const updatedItem = cartItems.find(item => item.id === product.id);
          const newAmount = updatedItem ? updatedItem.amount : 0;

          const allProducts = document.querySelectorAll(`.product-item[data-id="${product.id}"]`)

          allProducts.forEach(card => {
            const stepperValueEl = card.querySelector('.stepper-value')
            const stepperEl = card.querySelector('.stepper')
            const btnEl = card.querySelector('.compact-button')

            if (stepperValueEl) stepperValueEl.textContent = newAmount;

            if (newAmount > 0) {
              if (stepperEl) {
                stepperEl.style.display = 'flex';
                stepperEl.style.opacity = '1';
              }
              if (btnEl) btnEl.style.display = 'none';
            } else {
              if (stepperEl) {
                stepperEl.style.display = 'none';
                stepperEl.style.opacity = '0';
              }
              if (btnEl) {
                btnEl.style.display = 'block';
                btnEl.style.opacity = '1';
              }
            }
          })
        }

        // Attach event listeners to the add buttons for this specific product
        const addButtons = productCard.querySelectorAll(".add-product");
        addButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            addToCart(product.id, event)
            updateAllProducts();


            // Update the displayed stepper value
            // const stepperValue = productCard.querySelector(".stepper-value");
            // if (stepperValue) stepperValue.textContent = currentAmount;

            // const stepperEl = productCard.querySelector('.stepper');
            // const btnEl = productCard.querySelector('.compact-button')

            // if (currentAmount > 0) {
            //   stepperEl.style.display = 'flex'
            //   stepperEl.style.opacity = '1'
            //   btnEl.style.display = 'none'
            // }

          });
        });

        const removeButtons = productCard.querySelectorAll(".remove-product");
        removeButtons.forEach((button) => {
          button.addEventListener("click", (event) => {
            removeFromCart(product.id, event)
            updateAllProducts();

            // const updatedItem = cartItems.find(item => item.id === product.id);
            // currentAmount = updatedItem ? updatedItem.amount : 0;

            // // Update the displayed stepper value
            // const stepperValue = productCard.querySelector(".stepper-value");
            // if (stepperValue) stepperValue.textContent = currentAmount;

            // const stepperEl = productCard.querySelector('.stepper');
            // const btnEl = productCard.querySelector('.compact-button')

            // if (currentAmount === 0) {
            //   stepperEl.style.display = 'none'
            //   stepperEl.style.opacity = '0'
            //   btnEl.style.display = 'block'
            // }


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
