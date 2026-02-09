// Product data
const products = [
    {
        id: 'bag-black',
        name: 'Premium Black Bag',
        price: 39.99,
        description: 'Size: Tall L\n\nLightweight, durable nylon with leather handles and flap\n\nSecure zip-top closure with snap button\n\nSpacious interior for daily essentials\n\nFoldable for easy storage\n\nClassic Longchamp design suitable for any occasion',
        folder: 'bagblack',
        link: 'bag-black.html'
    },
    {
        id: 'bag-lightblue',
        name: 'Premium Light Blue Bag',
        price: 39.99,
        description: 'Size: Tall L\n\nLightweight, durable nylon with leather handles and flap\n\nSecure zip-top closure with snap button\n\nSpacious interior for daily essentials\n\nFoldable for easy storage\n\nClassic Longchamp design suitable for any occasion',
        folder: 'baglightblue',
        link: 'bag-lightblue.html'
    },
    {
        id: 'bag-blue',
        name: 'Premium Blue Bag',
        price: 39.99,
        description: 'Size: Tall L\n\nLightweight, durable nylon with leather handles and flap\n\nSecure zip-top closure with snap button\n\nSpacious interior for daily essentials\n\nFoldable for easy storage\n\nClassic Longchamp design suitable for any occasion',
        folder: 'bagblue',
        link: 'bag-blue.html'
    },
    {
        id: 'bag-beige',
        name: 'Premium Beige Bag',
        price: 39.99,
        description: 'Size: Tall L\n\nLightweight, durable nylon with leather handles and flap\n\nSecure zip-top closure with snap button\n\nSpacious interior for daily essentials\n\nFoldable for easy storage\n\nClassic Longchamp design suitable for any occasion',
        folder: 'bagbeige',
        link: 'bag-beige.html'
    },
    {
        id: 'bag-fullblack',
        name: 'Premium Full Black Bag',
        price: 39.99,
        description: 'Size: Tall L\n\nLightweight, durable nylon with leather handles and flap\n\nSecure zip-top closure with snap button\n\nSpacious interior for daily essentials\n\nFoldable for easy storage\n\nClassic Longchamp design suitable for any occasion',
        folder: 'bagfullblack',
        link: 'bag-fullblack.html'
    }
];

// Cart management
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count.toString();
    }
}

// Display products on main page
function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    products.forEach(product => {
        const productCard = document.createElement('a');
        productCard.className = 'product-card';
        productCard.href = product.link;

        productCard.innerHTML = `
            <img src="${product.folder}/image1.jpeg" alt="${product.name}">
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <span class="view-details-btn">View Details</span>
            </div>
        `;

        productGrid.appendChild(productCard);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav');

    if (!header || !nav) return;

    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');

    // Insert toggle button after h1
    const h1 = header.querySelector('h1');
    if (h1) {
        h1.insertAdjacentElement('afterend', menuToggle);
    }

    // Toggle menu on click
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
        }
    });

    // Close menu when clicking on nav links
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    initMobileMenu();
});
