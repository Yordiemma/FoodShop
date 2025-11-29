import './scripts/offers'
import './scripts/cart-overlay'
import './scripts/render-often-bought.js'
import { renderShortExpiryProducts } from "./scripts/renderShortExpiry.js";

// i put the code in main.js because:
// main.js runs when the page opens
// It finds the <div> in the HTML

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("expiry-products-list");
  if (container) {
    renderShortExpiryProducts(container);
  }
});
