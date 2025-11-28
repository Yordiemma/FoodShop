import './scripts/offers'
import { renderShortExpiryProducts } from "./scripts/renderShortExpiry.js";

// The rendering logic stays inside 
// renderShortExpiryProducts.js and main.js controls when it runs.
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("short-expiry-list");
  renderShortExpiryProducts(container);
});
