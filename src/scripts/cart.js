import { productData } from "./product-data"

export let cartItems = []

function containsObject(cartItem) {
    var i;
    for (i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === cartItem.id) {
            return true;
        }
    }
    return false;
}

export const totalInCart = () => {
    const amountContainer = document.getElementById("total-in-cart")
    const totalItemsEl = document.querySelectorAll('.total-items')

    const totalInCart = cartItems.reduce((total, product) => total + product.amount, 0)
    if (totalInCart > 0) {
        amountContainer.style.opacity = 1;
        amountContainer.textContent = totalInCart;
        totalItemsEl.forEach((span) => {
            span.textContent = totalInCart;
        })
    } else if (totalInCart === 0) {
        amountContainer.style.opacity = 0;
    }
}

export const addToCart = (id, event) => {
    for (const product of productData) {
        if (id === product.id) {
            if (containsObject(product)) {
                const cartItem = cartItems.find(item => item.id === product.id);
                if (cartItem) {
                    cartItem.amount += 1;
                }
            } else {
                cartItems.push({
                    amount: 1,
                    category: product.category,
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    description: product.description,
                    photoUrl: product.photoUrl,
                    localProduced: product.localProduced,
                    link: product.link,
                    ...(product.salePrice && { salePrice: product.salePrice }),
                    price: product.price,
                    shortExpiryDate: false,
                });
            }


            const button = event.target.closest(".add-product")
            const productItem = button.closest('.product-item')
            const stepper = productItem.querySelector(".stepper")
            const compactButton = productItem.querySelector(".compact-button")

            if (totalInCart)
                if (stepper) {
                    stepper.style.display = "flex"
                    stepper.style.opacity = 1

                    compactButton.style.opacity = "0"
                    compactButton.style.display = "none"
                }
            totalInCart()
        }
    }

    console.log(cartItems)
}

export const removeFromCart = (id, event) => {

    const button = event.target.closest(".remove-product")
    const productItem = button.closest('.product-item')
    const stepper = productItem.querySelector(".stepper")
    const compactButton = productItem.querySelector(".compact-button")
    let productCount = 1;

    for (const product of productData) {
        if (id === product.id) {
            if (containsObject(product)) {
                const cartItem = cartItems.find(item => item.id === product.id);
                if (cartItem.amount === 1) {
                    cartItem.amount -= 1;
                    if (stepper) {
                        stepper.style.opacity = 0
                        stepper.style.display = "none"

                        compactButton.style.display = "block"
                        compactButton.style.opacity = 1
                    }

                    console.log("remove item")
                    //Remove item from cartItems
                } else {
                    cartItem.amount -= 1;
                }
            }
            totalInCart()
        }
    }
}