const cartEl = document.querySelector('.cart-overlay')
const cartButtonEl = document.querySelector('.cart-wrap')
const closeButtonEl = document.querySelector('.top-wrap').lastElementChild

let shown = false;

const cartShow = () => {
    if (shown) {
    } else {
        cartEl.style.display = 'block'
        document.body.style.overflow = 'hidden'
        cartButtonEl.innerHTML = `<img src="/src/images/cart-view.svg" alt="">
          <span>0</span>`
        shown = true;
    }
}

const cartHide = () => {
    cartEl.style.display = 'none'
    document.body.style.overflow = 'auto'
    cartButtonEl.innerHTML = `<img src="/src/images/cart.svg" alt="">
          <span>0</span>`
    shown = false;
}

cartButtonEl.addEventListener('click', cartShow)
closeButtonEl.addEventListener('click', cartHide)
