import { renderCart } from "./render-cart";
import { renderProductList } from "./render-product-list";

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

const cartHide = () => {
    cartEl.style.display = 'none'
    document.body.style.overflow = 'auto'
    cartButtonEl.firstElementChild.src = '/src/images/cart.svg'
    shown = false;
}

const updateLandingPage = () => {
    const productCards = document.querySelectorAll('.product-item')
    productCards.forEach((div) => console.log(div))
}

cartButtonEl.addEventListener('click', cartShow)
cartButtonEl.addEventListener('click', renderCart)
closeButtonEl.addEventListener('click', cartHide)
closeButtonEl.addEventListener('click', updateLandingPage)
