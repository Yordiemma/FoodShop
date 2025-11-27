import { productData } from './product-data'

const listContainer = document.getElementById('often-bought-products')
const productList = listContainer.querySelector(".product-list")
const productItem = productList.querySelector(".product-item")

const createOftenBought = (cardSize) => {
    const boughtProducts = productData.slice(4, 8)
    
    for (const product of boughtProducts) {
        const productItem = document.createElement("div")
        productItem.classList.add("product-item")

        if (product.sale) {
             productItem.classList.add("sale")
        }

        productList.appendChild(productItem)
        productItem.innerHTML += `
          <div class="product-image-container">
            <span class="sale-tag">${product.sale ? product.sale.saleMessage : ""}</span>
            <img class="product-image"
              src="${product.photoUrl}"
              alt="" />
          </div>
          <div class="product-info">
            <div class="product-heading">
              <h3>${product.name}</h3>
              <div class="description">
                ${product.localProduced ? `<span class="meta-tag">Local</span>` : ""}
                <p class="description">${product.description}</p>
              </div>
            </div>
            <div class="product-footer">
              <div class="product-price-container">
                <p class="price active">${product.salePrice ? product.salePrice : product.price} kr/st</p>
                ${product.salePrice ? `<p class="price old-price">${product.price} kr/st</p>` : ""}
              </div>
              <button class="compact-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <div class="stepper">
                <button class="stepper-button-minus">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
                <div class="stepper-value">1</div>
                <button class="stepper-button-plus">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        
        `

        // if (product.name) {
        //     productItem.classList.add("sale")
        // }
        console.log(productItem)

    }

    
}
createOftenBought()
console.log(productData)
