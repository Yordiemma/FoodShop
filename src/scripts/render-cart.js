import { cartItems } from "./cart";

const test = () => {
    cartItems.push(
        {
            amount: 1,
            category: "Beverages",
            id: self.crypto.randomUUID(),
            name: "New England Pale Ale 3.5%",
            brand: "Poppels Bryggeri",
            description: "330 ml",
            photoUrl: "https://res.cloudinary.com/coopsverige/images/e_sharpen,f_auto,fl_clip,fl_progressive,q_90,c_lpad,g_center,h_1000,w_1000/v1647878448/cloud/249792/New%20England%20Pale%20Ale%203.5%25.jpg",
            localProduced: true,
            link: "https://www.coop.se/handla/varor/dryck/ol-cider-vin/ol-35/new-england-pale-ale-35-7350068861536",
            price: 24.95,
            shortExpiryDate: false
        },
        {
            amount: 2,
            category: "Pantry",
            id: self.crypto.randomUUID(),
            name: "Dessert Sauce Chocolate",
            brand: "O'hoj",
            description: "350 g",
            sale: { saleMessage: "30% off" },
            photoUrl:
                "https://res.cloudinary.com/coopsverige/images/e_sharpen,f_auto,fl_clip,fl_progressive,q_90,c_lpad,g_center,h_1000,w_1000/v1637686903/cloud/239791/Desserts%C3%A5s%20Choklad.jpg",
            localProduced: false,
            link: "https://www.coop.se/handla/varor/skafferi/desserter/vaniljsas-dessertsas/dessertsas-choklad-8711327540903",
            price: 37.95,
            salePrice: 26.45,
            shortExpiryDate: false
        })
}

test();
console.log(cartItems)

const renderCart = () => {
    const cartContainerEl = document.querySelector('.cart-product-container')
    cartContainerEl.classList.add('product-list', 'vertical')

    cartItems.forEach((product) => {
        const productItemEl = document.createElement('div')
        productItemEl.classList.add('product-item')
        cartContainerEl.appendChild(productItemEl)

        let productCount = product.amount;

        productItemEl.innerHTML += `
          <div class="product-image-container">
            <span class="sale-tag">${product.sale ? product.sale.saleMessage : ""
            }</span>
            <img class="product-image"
              src="${product.photoUrl}"
              alt="" />
          </div>
          <div class="product-info">
            <div class="product-heading">
              <h3>${product.name}</h3>
              <div class="description">
                ${product.localProduced
                ? `<span class="meta-tag">Local</span>`
                : ""
            }
                <p class="description">${product.description}</p>
              </div>
            </div>
            <div class="product-footer">
              <div class="product-price-container">
                <p class="price active">${product.salePrice ? product.salePrice : product.price
            } kr/st</p>
                ${product.salePrice
                ? `<p class="price old-price">${product.price} kr/st</p>`
                : ""
            }
              </div>

              <div class="stepper" style="display: flex; opacity: 1;">
                <button class="stepper-button-minus remove-product">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true">
                    <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
                <div class="stepper-value">${productCount}</div>
                <button class="stepper-button-plus add-product">
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
        `;

        // imageEl.src = item.photoUrl
        // h3El.textContent = item.name
        // descriptionEl.textContent = item.description
        // pPriceEl.textContent = `${item.price} kr/st`




    })
}

renderCart();




// const checkAmount = () => {
//     console.log(cartItems)
//     cartItems.forEach((item) => {
//         if (item.amount > 0) {
//             console.log(item.name, item.amount)
//         } else {
//             console.log('no amounts')
//         }
//     })
// }

// test();
// checkAmount();
