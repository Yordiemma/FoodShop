const cartEl = document.querySelector('.cart-overlay')
const cartButtonEl = document.querySelector('.cart-wrap')

let shown = false;

const cartShow = () => {
    cartEl.style.display = 'block'
    shown = true;
}

const cartHide = () => {
    cartEl.style.display = 'none'
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

