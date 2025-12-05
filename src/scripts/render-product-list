import { addToCart } from "./cart.js";
import { removeFromCart } from "./cart.js";
import { cartItems } from "./cart.js";


export const renderProductList = (
  listContainer, //Container for the product list
  productArray, //Array of products to render
  verticalOrHorizontal //Vertical or horizontal layout
) => {
  const productList = listContainer.querySelector(".product-list");
  for (const product of productArray) {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    //Add an ID to make it can be reached from cart
    productItem.dataset.id = product.id;

    //Add class for vertical or horizontal layout
    productList.classList.add(verticalOrHorizontal);

    //Add class sale if the item is on sale
    if (product.sale) {
      productItem.classList.add("sale");
    }
    //Add product to product list
    productList.appendChild(productItem);

    //Check if item is already in cart to set initial value
    const cartItem = cartItems.find(item => item.id === product.id);
    let currentAmount = cartItem ? cartItem.amount : 0;

    //Determine initial visibility based on currentAmount
    const stepperDisplay = currentAmount > 0 ? "flex" : "none";
    const stepperOpacity = currentAmount > 0 ? "1" : "0";
    const btnDisplay = currentAmount > 0 ? "none" : "block";
    const btnOpacity = currentAmount > 0 ? "0" : "1";

    //Add HTML for each product
    productItem.innerHTML += `
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
                ${product.localProduced ? `<span class="meta-tag">Local</span>` : ""
                }
                <p class="description">${product.description}</p>
              </div>
            </div>
            <div class="product-footer">
              <div class="product-price-container">
                <p class="price active">${product.salePrice ? product.salePrice : product.price
                } kr/st</p>
                ${
                  product.salePrice ? `<p class="price old-price">${product.price} kr/st</p>` : ""
                }
              </div>
              <button class="compact-button add-product" style="display: ${btnDisplay}; opacity: ${btnOpacity};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div class="stepper" style="display: ${stepperDisplay}; opacity: ${stepperOpacity};">
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

    // Attach event listeners to the add buttons for this specific product
    const addButtons = productItem.querySelectorAll(".add-product");
    addButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        addToCart(product.id, event);

        const updatedItem = cartItems.find(item => item.id === product.id);
        const newAmount = updatedItem ? updatedItem.amount : 0;
        
        const stepperValue = productItem.querySelector(".stepper-value");
        if (stepperValue) stepperValue.textContent = newAmount;
      });
    });

    const removeButtons = productItem.querySelectorAll(".remove-product");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        removeFromCart(product.id, event);

        const updatedItem = cartItems.find(item => item.id === product.id);
        const newAmount = updatedItem ? updatedItem.amount : 0;

        const stepperValue = productItem.querySelector(".stepper-value");
        if (stepperValue) stepperValue.textContent = newAmount;
      }

      );
    });
  }
};





