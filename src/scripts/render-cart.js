import { cartItems } from "./cart";
import { totalInCart } from "./cart";

export const renderCart = () => {
  const cartContainerEl = document.querySelector('.cart-product-container');
  cartContainerEl.classList.add('product-list', 'vertical');
  const totalItemEl = document.querySelectorAll('.total-items');
  const oneItemEl = document.querySelectorAll('.one-item');
  const totalPriceEl = document.querySelector('#total-price');

  cartContainerEl.innerHTML = '';

  let totalCount = 0;
  let totalPrice = 0;

  cartItems.forEach((product) => {
    const productItemEl = document.createElement('div');
    productItemEl.classList.add('product-item');
    cartContainerEl.appendChild(productItemEl);

    let productCount = product.amount ? product.amount : 0;
    totalCount += productCount;

    if (product.sale) productItemEl.classList.add("sale");

    if (product.salePrice) {
      totalPrice += Math.round((product.salePrice * product.amount) * 100) / 100;
    }
    else {
      totalPrice += Math.round((product.price * product.amount) * 100) / 100;
    }

    if (product.amount === 0) {
      productItemEl.innerHTML = productItemEl.remove();
    } else {
      productItemEl.innerHTML += `
          <div class="product-image-container">
            <span class="sale-tag">${product.sale ? product.sale.saleMessage : ""
        }</span>
            <img class="product-image" src="${product.photoUrl}" alt="" />
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
                <p class="price active">${product.salePrice ? product.salePrice : product.price} kr/st</p>
                ${product.salePrice ? `<p class="price old-price">${product.price} kr/st</p>` : ""}
              </div>
              <div class="stepper" style="display: flex; opacity: 1;">
                <button class="stepper-button-minus remove-product">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <div class="stepper-value">${productCount}</div>
                <button class="stepper-button-plus add-product">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;

      const updateLandingPage = () => {
        const AllLandingProducts = document.querySelectorAll(`.product-item[data-id="${product.id}"]`);

        AllLandingProducts.forEach(landingProduct => {
          const stepperValueEl = landingProduct.querySelector('.stepper-value');
          const stepperEl = landingProduct.querySelector('.stepper');
          const compactButtonEl = landingProduct.querySelector('.compact-button');

          if (stepperValueEl) {
            stepperValueEl.textContent = product.amount;
          }
          if (product.amount > 0) {
            if (stepperEl) {
              stepperEl.style.display = 'flex';
              stepperEl.style.opacity = 1;
            }
            if (compactButtonEl) {
              compactButtonEl.style.display = 'none';
              compactButtonEl.style.opacity = 0;
            }
          } else {
            if (stepperEl) {
              stepperEl.style.display = 'none';
              stepperEl.style.opacity = 0;
            }
            if (compactButtonEl) {
              compactButtonEl.style.display = 'block';
              compactButtonEl.style.opacity = 1;
            }
          }
        });
      };

      const plusButtonEl = productItemEl.querySelector('.add-product');
      const minusButtonEl = productItemEl.querySelector('.remove-product');

      if (plusButtonEl) {
        plusButtonEl.addEventListener('click', () => {
          product.amount += 1;
          renderCart();
          totalInCart();
          updateLandingPage();
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          console.log(cartItems);
        });
      }

      if (minusButtonEl) {
        minusButtonEl.addEventListener('click', () => {
          product.amount -= 1;
          renderCart();
          totalInCart();
          updateLandingPage();
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          console.log(cartItems);
        });
      }
    }
  });

  const renderTotalPrice = () => {
    totalPriceEl.textContent = Math.round(totalPrice * 100) / 100;
  };

  const checkIfOne = () => {
    oneItemEl.forEach((span) => {
      if (totalCount === 1) {
        span.textContent = 'item';
      } else {
        span.textContent = 'items';
      }
    });
  };

  const renderTotalItems = () => {
    totalItemEl.forEach((span) => span.textContent = totalCount);
    checkIfOne();
  };

  renderTotalItems();
  renderTotalPrice();
};