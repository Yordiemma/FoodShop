import { productData } from "./product-data.js";
export function renderShortExpiryProducts(container) {
  const shortExpiry = productData.filter(p => p.shortExpiryDate);
//   console.log(shortExpiry);
  container.innerHTML = "";

  shortExpiry.forEach(p => {
      const div = document.createElement("div");
      // temporary simple display
    div.textContent = p.name; 
    container.appendChild(div);
  });
}
