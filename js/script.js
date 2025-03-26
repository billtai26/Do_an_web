// Dữ liệu sản phẩm mẫu
const products = [
    {
        id: 1,
        name: "Chó Golden Retriever",
        price: 15000000,
        image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "pets"
    },
    {
        id: 2,
        name: "Mèo Anh lông ngắn",
        price: 8000000,
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "pets"
    },
    {
        id: 3,
        name: "Rùa Sulcata",
        price: 5000000,
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "pets"
    },
    {
        id: 4,
        name: "Thức ăn cho chó Royal Canin",
        price: 500000,
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "food"
    },
    {
        id: 5,
        name: "Thức ăn cho mèo Whiskas",
        price: 300000,
        image: "https://images.unsplash.com/photo-1589923188909-6b6c0c0c0c0c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "food"
    },
    {
        id: 6,
        name: "Bóng tennis cho chó",
        price: 50000,
        image: "https://images.unsplash.com/photo-1589923188909-6b6c0c0c0c0c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "toys"
    },
    {
        id: 7,
        name: "Cần câu mèo",
        price: 30000,
        image: "https://images.unsplash.com/photo-1589923188909-6b6c0c0c0c0c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "toys"
    }
];

// Giỏ hàng
let cart = [];

// Hiển thị sản phẩm
function displayProducts(productsToShow = products) {
    const productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)} VNĐ</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Thêm vào giỏ hàng
                </button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Thêm vào giỏ hàng
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        showNotification('Đã thêm sản phẩm vào giỏ hàng!');
    }
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Hiển thị giỏ hàng
function displayCart() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.getElementById('totalAmount');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)} VNĐ x ${item.quantity}</p>
            </div>
            <div>
                <button onclick="removeFromCart(${item.id})">Xóa</button>
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalAmount.textContent = formatPrice(total);
}

// Xóa khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            updateCartCount();
            displayCart();
        }
    }
}

// Định dạng giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Hiển thị thông báo
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Hiển thị modal thêm sản phẩm
function showAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.style.display = 'block';
}

// Đóng modal thêm sản phẩm
function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.style.display = 'none';
}

// Xử lý thêm sản phẩm mới
function handleAddProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value;
    const category = document.getElementById('productCategory').value;

    // Tạo ID mới cho sản phẩm
    const newId = Math.max(...products.map(p => p.id)) + 1;

    // Thêm sản phẩm mới vào mảng products
    products.push({
        id: newId,
        name,
        price,
        image,
        category
    });

    // Hiển thị lại danh sách sản phẩm
    displayProducts();

    // Đóng modal và reset form
    closeAddProductModal();
    document.getElementById('addProductForm').reset();

    // Hiển thị thông báo thành công
    showNotification('Đã thêm sản phẩm mới thành công!');
}

// Xử lý sự kiện khi trang web được tải
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    // Xử lý sự kiện cho nút giỏ hàng
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close');

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        displayCart();
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === document.getElementById('addProductModal')) {
            closeAddProductModal();
        }
    });

    // Xử lý sự kiện cho nút trang chủ
    const homeLink = document.querySelector('.nav-items a.active');
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        displayProducts();
    });

    // Xử lý sự kiện cho danh mục
    const categoryLinks = document.querySelectorAll('.dropdown-content a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(product => product.category === category);
            displayProducts(filteredProducts);
        });
    });
});
