import { productData } from "./product-data.js";
import { renderProductList } from "./render-product-list";

//Create array for often bought products
const oftenBoughtArray = productData.slice(4, 10);

//Grab list container ID
const listContainerOftenBought = document.getElementById("often-bought-products");

//Render items when loaded
document.addEventListener("DOMContentLoaded", () => {
  if (listContainerOftenBought) {
    renderProductList(
      listContainerOftenBought,
      oftenBoughtArray,
      "vertical"
    );
  }
});





