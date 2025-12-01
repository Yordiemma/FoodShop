const cartEl = document.querySelector('.cart-overlay')
const cartButtonEl = document.querySelector('.cart-wrap')

let shown = false;

const cartShow = () => {
    cartEl.style.display = 'block'
    document.body.style.overflow = 'hidden'
    shown = true;
}

const cartHide = () => {
    cartEl.style.display = 'none'
    document.body.style.overflow = 'auto'
    shown = false;
}

const cartFunctionality = () => {
    if (shown) {
        cartHide();
    } else {
        cartShow();
    }
}

cartButtonEl.addEventListener('click', cartFunctionality)

