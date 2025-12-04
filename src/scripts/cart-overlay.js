import { renderCart } from "./render-cart";
import { cartItems } from "./cart";

const cartEl = document.querySelector('.cart-overlay')
const cartButtonEl = document.querySelector('.cart-wrap')
const closeButtonEl = document.querySelector('.top-wrap').lastElementChild

let shown = false;

const cartShow = () => {
    if (shown) {
    } else {
        cartEl.style.display = 'block'
        document.body.style.overflow = 'hidden'
        cartButtonEl.firstElementChild.src = '/src/images/cart-view.svg'
        shown = true;
    }
}

export function updateLandingPage() {
  const allSteppers = document.querySelectorAll('.stepper-value');

  allSteppers.forEach(stepperValueEl => {
    const productId = stepperValueEl.getAttribute('data-id');
    const cartItem = cartItems.find(item => item.id == productId);
    const currentAmount = cartItem ? cartItem.amount : 0;

    // 1. Update text
    stepperValueEl.textContent = currentAmount;

    // 2. Find siblings
    const productFooterEl = stepperValueEl.closest('.product-footer');
    const compactBtnEl = productFooterEl.querySelector('.compact-button');
    const stepperContainerEl = productFooterEl.querySelector('.stepper');

if (compactBtnEl && stepperContainerEl) {
      if (currentAmount > 0) {
        compactBtnEl.style.display = 'none';
        stepperContainerEl.style.display = 'flex';
      } else {
        compactBtnEl.style.display = 'flex';
        compactBtnEl.style.opacity = '1';
        stepperContainerEl.style.display = 'none';
      }
    }
    console.log(cartItems)
  });
}

const cartHide = () => {
    cartEl.style.display = 'none'
    document.body.style.overflow = 'auto'
    cartButtonEl.firstElementChild.src = '/src/images/cart.svg'
    shown = false;

    updateLandingPage();
}


cartButtonEl.addEventListener('click', cartShow)
cartButtonEl.addEventListener('click', renderCart)
closeButtonEl.addEventListener('click', cartHide)
