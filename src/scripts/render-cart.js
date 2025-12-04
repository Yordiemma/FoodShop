import { cartItems } from "./cart";

export const renderCart = () => {
  const cartContainerEl = document.querySelector('.cart-product-container')
  cartContainerEl.classList.add('product-list', 'vertical')
  const totalItemEl = document.querySelectorAll('.total-items')
  const oneItemEl = document.querySelectorAll('.one-item')

  cartContainerEl.innerHTML = ''

  let totalCount = 0;
  let totalPrice = 0;

  cartItems.forEach((product) => {
    const productItemEl = document.createElement('div')
    productItemEl.classList.add('product-item')
    cartContainerEl.appendChild(productItemEl)

    let productCount = product.amount;
    totalCount = totalCount + productCount

    let productPrice = product.price;
    totalPrice = totalPrice + productPrice

    if (product.amount === 0) {
      productItemEl.innerHTML = ''
    } else {
      productItemEl.innerHTML += `
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
              <div class="stepper" style="display: flex; opacity: 1;">
                <button class="stepper-button-minus remove-product">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
                <div class="stepper-value">${productCount}</div>
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
    }
  })

  const checkIfOne = () => {
    oneItemEl.forEach((span) => {
      if (totalCount === 1) {
        span.textContent = 'item'
      } else {
        span.textContent = 'items'
      }
    })
  }
  const renderTotalItems = () => {
    totalItemEl.forEach((span) =>
      span.textContent = totalCount)

    checkIfOne();
  }
  renderTotalItems();
}

// const addItem = () => {

//     cartItems.forEach((product) => {
//         const stepperEl = document.querySelector('.stepper')
//         console.log(stepperEl)
//     })
// }

// addItem();





// const checkAmount = () => {
//     console.log(cartItems)
//     cartItems.forEach((item) => {
//         if (item.amount > 0) {
//             console.log(item.name, item.amount)
//         } else {
//             console.log('no amounts')
//         }
//     })
// }

// test();
// checkAmount();
