import { cartItems } from "./cart";
import { totalInCart } from "./cart";
import { removeFromCart } from "./cart";
import { updateLandingPage } from "./cart-overlay"

export const renderCart = () => {
  const cartContainerEl = document.querySelector('.cart-product-container')
  cartContainerEl.classList.add('product-list', 'vertical')
  const totalItemEl = document.querySelectorAll('.total-items')
  const oneItemEl = document.querySelectorAll('.one-item')
  const totalPriceEl = document.querySelector('#total-price')

  cartContainerEl.innerHTML = ''

  let totalCount = 0;
  let totalPrice = 0;

  cartItems.forEach((product) => {

    const productItemEl = document.createElement('div')
    productItemEl.classList.add('product-item')
    cartContainerEl.appendChild(productItemEl)

    let productCount = product.amount ? product.amount : 0;
    totalCount += productCount
    totalPrice += (product.price * product.amount)

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

      const plusButtonEl = productItemEl.querySelector('.add-product')
      const minusButtonEl = productItemEl.querySelector('.remove-product')

      plusButtonEl.addEventListener('click', () => {
        console.log("Clicked + for product:", product.id);
        let itemInCart = cartItems.find(item => item.id === product.id);

        if (itemInCart) {
          // If it's already in the cart, increase THAT amount
          itemInCart.amount += 1;
        } else {
          // If it's not in the cart (or was removed), add it fresh
          product.amount = 1;
          cartItems.push(product);
        }
        renderCart();
        totalInCart();
        console.log(cartItems)
      })

      minusButtonEl.addEventListener('click', () => {

        product.amount -= 1;

        renderCart();
        totalInCart();
        console.log(cartItems)
        // updateLandingPage();
      })


      // minusButtonEl.addEventListener('click', () => {
      //   if (product.amount !== 0) {
      //     product.amount -= 1
      //     console.log(cartItems)
      //     renderCart();
      //     totalInCart();
      //   } else {
      //     //remove product from cart item
      //   }

      // })
      // const allstepperEl = productItemEl.querySelectorAll('.stepper')
      // allstepperEl.forEach((stepper) => {

      //   const plusButtonEl = stepper.querySelector('.add-product')
      //   console.log(plusButtonEl)

      //   plusButtonEl.addEventListener('click', () => {
      //     let currentAmount = parseInt(stepp)
      //   })
      // })
    }
  })



  const renderTotalPrice = () => {
    totalPriceEl.textContent = totalPrice;
  }
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
  renderTotalPrice();
}
