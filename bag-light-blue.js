// Product information for Green Bag
const productInfo = {
    name: 'Premium Green Bag',
    color: 'Green',
    price: 39.99,
    folder: 'baggreen',
    imageCount: 4 // Adjust based on how many images you have
};

// Cart management functions
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
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count.toString();
    }
}

// Load thumbnail images
function loadThumbnails() {
    const thumbnailsContainer = document.getElementById('thumbnails');
    if (!thumbnailsContainer) return;

    for (let i = 1; i <= productInfo.imageCount; i++) {
        const img = document.createElement('img');
        img.src = `${productInfo.folder}/image${i}.jpeg`;
        img.alt = `${productInfo.name} - Image ${i}`;
        img.dataset.imageIndex = i.toString();
        
        if (i === 1) {
            img.classList.add('active');
        }
        
        img.addEventListener('click', () => {
            const mainImage = document.getElementById('main-image');
            if (mainImage) {
                mainImage.src = img.src;
            }
            
            // Update active thumbnail
            const allThumbnails = thumbnailsContainer.querySelectorAll('img');
            allThumbnails.forEach(thumb => thumb.classList.remove('active'));
            img.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(img);
    }
}

// Add to cart functionality
function addToCart() {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);
    
    const cart = getCart();
    const existingItem = cart.find(item => 
        item.name === productInfo.name && item.color === productInfo.color
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productInfo.name,
            color: productInfo.color,
            price: productInfo.price,
            quantity: quantity,
            image: `${productInfo.folder}/image1.jpeg`
        });
    }
    
    saveCart(cart);
    updateCartCount();
    
    // Show confirmation
    alert(`Added ${quantity} ${productInfo.name} to cart!`);
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
    loadThumbnails();
    updateCartCount();
    initMobileMenu();

    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }
});
