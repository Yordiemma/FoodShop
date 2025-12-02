import { cartItems, totalInCart } from "./cart";

const cartEl = document.querySelector('.cart-overlay')
const cartButtonEl = document.querySelector('.cart-wrap')
const closeButtonEl = document.querySelector('.top-wrap').lastElementChild

console.log(cartButtonEl.firstElementChild)
console.log(cartButtonEl.firstElementChild.src)

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

const cartHide = () => {
    cartEl.style.display = 'none'
    document.body.style.overflow = 'auto'
    cartButtonEl.firstElementChild.src = '/src/images/cart.svg'
    shown = false;
}

cartButtonEl.addEventListener('click', cartShow)
closeButtonEl.addEventListener('click', cartHide)
