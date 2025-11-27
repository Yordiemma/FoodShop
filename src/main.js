document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".product-item").forEach((item) => {
    const newPriceEl = item.querySelector(".price.active");
    const oldPriceEl = item.querySelector(".price.old-price");
    const saleTag = item.querySelector(".sale-tag");

    if (newPriceEl && oldPriceEl && saleTag) {
      const newPrice = parseFloat(newPriceEl.textContent);
      const oldPrice = parseFloat(oldPriceEl.textContent);

      const discountPercentage = Math.round(
        ((oldPrice - newPrice) / oldPrice) * 100
      );

      saleTag.textContent = `-${discountPercentage}%`;

      item.classList.add("sale");
    }
  });
});
