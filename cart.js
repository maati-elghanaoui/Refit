// Cart functionality for cart page
function getCart() {
    const cart = localStorage.getItem('cart');
    let cartItems = cart ? JSON.parse(cart) : [];

    // Update prices for existing items if they are incorrect
    cartItems = cartItems.map(item => {
        if (item.price === 99.99) {
            item.price = 39.99;
        }
        return item;
    });

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    return cartItems;
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count.toString();
    });
}

function displayCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: $${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                    <span>Quantity: ${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                </div>
                <p>Total: $${itemTotal.toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = total.toFixed(2);
}

function updateQuantity(index, action) {
    const cart = getCart();
    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    saveCart(cart);
    displayCart();
    updateCartCount();
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
    updateCartCount();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const index = parseInt(e.target.dataset.index);
            const action = e.target.dataset.action;
            updateQuantity(index, action);
        } else if (e.target.classList.contains('remove-btn')) {
            const index = parseInt(e.target.dataset.index);
            removeItem(index);
        }
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Checkout functionality would be implemented here. Total: $' + document.getElementById('cart-total').textContent);
    });
});
