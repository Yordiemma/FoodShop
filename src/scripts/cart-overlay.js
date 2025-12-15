import { renderCart } from "./render-cart";

const cartEl = document.querySelector('.cart-overlay');
const cartButtonEl = document.querySelector('.cart-wrap');
const closeButtonEl = document.querySelector('.top-wrap').lastElementChild;

let shown = false;

const cartShow = () => {
    cartEl.style.display = 'block';
    document.body.style.overflow = 'hidden';
    shown = true;
};

const cartHide = () => {


    cartEl.style.display = 'none';
    document.body.style.overflow = 'auto';
    shown = false;
};

const switchView = () => {
    shown ? cartHide() : cartShow();
};


cartButtonEl.addEventListener('click', () => {
    switchView();
    renderCart();
});

closeButtonEl.addEventListener('click', cartHide);


window.addEventListener("load", () => {
    cartHide(); 
});

window.addEventListener('close-cart', cartHide);

