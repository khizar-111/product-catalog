
        document.addEventListener("DOMContentLoaded", () => {
            const addToCartButtons = document.querySelectorAll(".add-to-cart");
            const cartItemsContainer = document.getElementById("cart_items");
            const totalPriceElement = document.getElementById("total-price");

            let cart = [];

            // Add event listener to each "Add to Cart" button
            addToCartButtons.forEach(button => {
                button.addEventListener("click", (event) => {
                    const productElement = event.target.closest(".product");
                    const name = productElement.dataset.name;
                    const price = parseFloat(productElement.dataset.price);
                    const quantity = parseInt(productElement.querySelector(".quantity").value);

                    // Check if product is already in the cart
                    const existingProduct = cart.find(item => item.name === name);
                    if (existingProduct) {
                        existingProduct.quantity += quantity;
                    } else {
                        cart.push({ name, price, quantity });
                    }

                    updateCart();
                });
            });

            // Update the cart and total price
            function updateCart() {
                // Clear the cart display
                cartItemsContainer.innerHTML = "";

                let total = 0;

                // Loop through cart items and display them
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;

                    const cartItemElement = document.createElement("div");
                    cartItemElement.className = "cart-item";
                    cartItemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity} x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}</span>
            `;
                    cartItemsContainer.appendChild(cartItemElement);
                });

                // Update total price display
                totalPriceElement.textContent = total.toFixed(2);
            }
        });

   