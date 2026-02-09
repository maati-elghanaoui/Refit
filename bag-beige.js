const images = [
    "bagbeige/image1.jpeg",
    "bagbeige/image2.jpeg",
    "bagbeige/image3.jpeg",
    "bagbeige/image4.jpeg"
];

const thumbnailsContainer = document.getElementById("thumbnails");
const mainImage = document.getElementById("main-image");

images.forEach((src, index) => {
    const thumb = document.createElement("img");
    thumb.src = src;

    if (index === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
        mainImage.src = src;

        document
            .querySelectorAll(".thumbnail-images img")
            .forEach(img => img.classList.remove("active"));

        thumb.classList.add("active");
    });

    thumbnailsContainer.appendChild(thumb);
});

// Cart functionality
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
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

document.getElementById('add-to-cart').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    const product = {
        id: 'bag-beige',
        name: 'Premium Beige Bag',
        price: 39.99,
        quantity: quantity,
        image: 'bagbeige/image1.jpeg'
    };

    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push(product);
    }

    saveCart(cart);
    updateCartCount();
    alert('Product added to cart!');
});

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
    updateCartCount();
    initMobileMenu();
});
