document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/inventory')
        .then(response => response.json())
        .then(data => {
            displayInventory(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching the JSON data:', error);
        });
});

let cart = []; // create the cart array to use to add the item into cart

function displayInventory(data) {

    try {
        // get the container: <div class="inventory-container">
        const inventoryContainer = document.querySelector('.inventory-container');

        data.forEach(item => {
            // Create item container
            const itemContainer = document.createElement('div');
            itemContainer.className = 'item-container';

            // Create item content element: <h3 class="content-item">${item.content}</h3>
            const content = document.createElement('h3');
            content.className = 'content-item';
            content.textContent = item.content;

            // Create decrease button: <button class="decrease-quantity-btn">-</button>
            const decreaseBtn = document.createElement('button');
            decreaseBtn.className = 'decrease-quantity-btn';
            decreaseBtn.textContent = '-';
            decreaseBtn.addEventListener('click', () => handleDecrease(quantity));

            // Create current quantity span: <span class="current-quantity">0</span>
            const quantity = document.createElement('span');
            quantity.className = 'current-quantity';
            quantity.textContent = '0'; // set default at 0

            // Create increase button: <button class="increase-quantity-btn">+</button>
            const increaseBtn = document.createElement('button');
            increaseBtn.className = 'increase-quantity-btn';
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener('click', () => handleIncrease(quantity));

            // Create add to cart button: <button class="add-to-cart-btn">Add to Cart</button>
            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart-btn';
            addToCartBtn.textContent = 'add to cart';
            addToCartBtn.addEventListener('click', () => handleAddToCart(item, quantity));

            // Append all elements to the item container
            itemContainer.appendChild(content);
            itemContainer.appendChild(decreaseBtn);
            itemContainer.appendChild(quantity);
            itemContainer.appendChild(increaseBtn);
            itemContainer.appendChild(addToCartBtn);

            // Append item to inventory container
            inventoryContainer.appendChild(itemContainer);

        });
    }
    catch (error) {
        console.error(error);
    }
}

// checkout button
const checkoutBtn = document.querySelector('checkout-btn');
checkoutBtn.addEventListener('click', handleCheckout);


// handler functions 
function handleIncrease(quantity) {

    // const quantity = document.querySelector('.current-quantity');
    let currentQuantity = parseInt(quantity.textContent, 10);
    quantity.textContent = currentQuantity + 1;

    console.log(quantity.textContent)
}

function handleDecrease(quantity) {

    let currentQuantity = parseInt(quantity.textContent, 10);
    if (currentQuantity > 0) {
        quantity.textContent = currentQuantity - 1;
    }

    console.log(quantity.textContent)
}

function handleAddToCart(item, quantity) {
    const quantityText = parseInt(quantity.textContent, 10);
    if (quantityText > 0) {
        console.log(`Added ${quantityText} of ${item.content} to cart.`);
        const cartItem = cart.find(cartItem => cartItem.id === item.id);
        if (cartItem) {
            cartItem.quantityText += quantityText;
        } else {
            cart.push({ ...item, quantityText });
        }

        updateCartDisplay();
        quantity.textContent = '0'; // Reset quantity after adding to cart

    } else {
        console.log(`No ${item.content} to add to cart.`);
    }
}

function updateCartDisplay() {
    const cartList = document.querySelector('.cart-items');
    cartList.innerHTML = ''; // empty
    console.log(cartList);

    cart.forEach(item => {
        const itemCheckout = document.createElement('h3');
        itemCheckout.className = 'item-checkout';
        itemCheckout.textContent = `${item.content} x ${item.quantityText}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'delete';
        deleteBtn.addEventListener('click', () => handleDelete(item));

        cartList.appendChild(itemCheckout);
        cartList.appendChild(deleteBtn);
    });
}

function handleDelete(itemDelete) {
    // Empty the cart array, cart = []
    cart = cart.filter(item => item.id !== itemDelete.id);
    updateCartDisplay() // then update the cart
}

function handleCheckout() {
    if (cart.length > 0) {
        cart = []; // cart has nothing in there
        updateCartDisplay(); // then update the cart
    }
}

