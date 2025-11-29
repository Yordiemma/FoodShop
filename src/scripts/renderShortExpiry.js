import { productData } from "./product-data.js";

export function renderShortExpiryProducts(container) {
  const shortExpiry = productData.filter(p => p.shortExpiryDate);

  container.innerHTML = "";

  shortExpiry.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("expiry-card");

    card.innerHTML = `
      <div class="expiry-card-image">
        <img src="${product.photoUrl}" alt="${product.name}">
      </div>

      <div class="expiry-card-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}