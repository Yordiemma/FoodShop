import "/src/scripts/offers.js";
import "/src/scripts/sales-items.js";
import "/src/scripts/cart-overlay.js";
import "/src/scripts/render-often-bought.js";
import { renderShortExpiryProducts } from "/src/scripts/renderShortExpiry.js";
import "./scripts/render-cart.js";
import "/src/scripts/menu.js";

// i put the code in main.js because:
// main.js runs when the page opens
// It finds the <div> in the HTML
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("expiry-products-list");
  if (container) {
    renderShortExpiryProducts(container);
  }
});
