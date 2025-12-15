import { productData } from "/src/scripts/product-data.js";

const menuNav = document.querySelector(".menu-nav");
const menuContainer = document.querySelector(".menu-container");
const menuSpan = document.querySelector(".menu-span");

menuNav.addEventListener("click", (event) => {
  event.preventDefault();

 window.dispatchEvent(new Event('close-cart'));

  menuContainer.classList.toggle("active");
  menuNav.classList.toggle("active");
});

menuSpan.addEventListener("click", (event) => {
  event.preventDefault();
  menuContainer.classList.remove("active");
  menuNav.classList.remove("active");
});

// Optional: Dynamically update product counts in menu buttons

const categories = productData.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {});

const categoriesContainer = document.querySelector(".dynamic-categories");

categoriesContainer.innerHTML = "";

Object.entries(categories).forEach(([catName, count], index, array) => {
  const item = document.createElement("div");
  item.classList.add("menu-item", "title");

  item.innerHTML = `
    <h3>${catName}</h3>
    <button class="menu-button">${count}</button>
  `;

  categoriesContainer.appendChild(item);

  if (index !== array.length - 1) {
    const hr = document.createElement("hr");
    categoriesContainer.appendChild(hr);
  }
});
