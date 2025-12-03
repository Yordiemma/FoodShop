import { productData } from "./product-data.js";

//Create array for often bought products
const oftenBoughtArray = productData.slice(4, 10);

//Render items when loaded
document.addEventListener("DOMContentLoaded", () => {
  const listContainerOftenBought = document.getElementById("often-bought-products");
  if (listContainerOftenBought) {
    createlistOfProducts(
      listContainerOftenBought,
      oftenBoughtArray,
      "vertical"
    );
  }
});





