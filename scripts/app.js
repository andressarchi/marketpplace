// app.js

// Array de productos
let productsArray = [
    {id: 1, name: 'iphone 16', price: 8000000, stock: 16, image: '/assets/img/iphone 16.webp'},
    {id: 2, name: 'iphone 16 por max', price: 1400000, stock: 20, image: '/assets/img/16 pro max.webp'},
    {id: 3, name: 'iphone 16 pro', price: 1400000, stock: 20, image: '/assets/img/233695-233703-iphone-16-pro-black.webp'},
    {id: 4, name: 'iphone 16 plus', price: 1400000, stock: 20, image: '/assets/img/iphone-16-plus-rosa.webp'},
    {id: 5, name: 'iphone 15 pro max ', price: 1400000, stock: 20, image: '/assets/img/15promax-pro.webp'},
    {id: 6, name: 'iphone 15 pro', price: 1400000, stock: 20, image: '/assets/img/iphone-15-pro-blanco-titanio-ambos-lados.webp'},
    {id: 7, name: 'iphone 15', price: 1400000, stock: 20, image: '/assets/img/iphone-15-azul-ambas-caras.webp'},
    {id: 8, name: 'iphone 14 pro max', price: 1400000, stock: 20, image: '/assets/img/14 pro max.webp'},
    {id: 9, name: 'iphone 14 pro', price: 1400000, stock: 20, image: '/assets/img/14 pro.webp'},
    {id: 10, name: 'iphone 14', price: 1400000, stock: 20, image: '/assets/img/iphone 14.webp'},
    {id: 11, name: 'MacBook Pro', price: 1400000, stock: 20, image: '/assets/img/MacBook Pro.png'},
    {id: 12, name: 'MacBook Air ', price: 1400000, stock: 20, image: '/assets/img/MacBook Air.png'},
    {id: 13, name: 'AirPods 4', price: 1400000, stock: 20, image: '/assets/img/AirPods 4.png'},
    {id: 14, name: 'AirPods Pro 2', price: 1400000, stock: 20, image: '/assets/img/AirPods Pro 2.png'},
    {id: 15, name: 'AirPods Max', price: 1400000, stock: 20, image: '/assets/img/AirPods Max.webp'},
    {id: 16, name: 'Apple Watch SE', price: 1400000, stock: 20, image: '/assets/img/Apple Watch SE.webp'},
    {id: 17, name: 'Apple Watch Series 10', price: 1400000, stock: 20, image: '/assets/img/Apple Watch Series 10.webp'},
    {id: 18, name: 'Apple Watch Ultra 2', price: 1400000, stock: 20, image: '/assets/img/Apple Watch Ultra 2.webp'},
    {id: 19, name: 'iPad Pro', price: 1400000, stock: 20, image: '/assets/img/iPad Pro.webp'},
    {id: 20, name: 'iPad Air', price: 1400000, stock: 20, image: '/assets/img/iPad Air.webp'},
    {id: 21, name: 'iPad', price: 1400000, stock: 20, image: '/assets/img/iPad.png'}
];

let cart = [];

// Función para mostrar productos
function displayProducts() {
    const productsDiv = document.getElementById('container-items');
    productsDiv.innerHTML = '';
    productsArray.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('item');
        productDiv.innerHTML = `
            <figure>
                <img src="${product.image}" alt="${product.name}">
            </figure>
            <div class="inf-produc">
                <h2>${product.name}</h2>
                <p class="price">$${product.price}</p>
                <p class="stock">Stock: ${product.stock}</p>
                <button class="añadir-carrito" onclick="addToCart(${product.id})">Añadir al carrito</button>
            </div>
        `;
        productsDiv.appendChild(productDiv);
    });
}

// Función para añadir productos al carrito
function addToCart(productId) {
    const product = productsArray.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        alert('Producto fuera de stock');
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    product.stock--;
    updateCart();
    displayProducts();
}

// Función para mostrar el carrito
function displayCart() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    
    cartItemsDiv.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 5rem; height: 5rem;">
                <h3>${item.name}</h3>
                <p>Precio: $${item.price}</p>
                <p>Cantidad: ${item.quantity}</p>
                <p>Total: $${itemTotal}</p>
                <button onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
    });

    cartTotalSpan.innerText = total;
    cartModal.style.display = 'block';
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    const product = productsArray.find(p => p.id === productId);

    if (cartItem) {
        cartItem.quantity--; 
        product.stock++; 

        if (cartItem.quantity === 0) {
            const cartItemIndex = cart.indexOf(cartItem);
            cart.splice(cartItemIndex, 1);
        }
    }
    
    updateCart();
    displayProducts();
    displayCart(); 
}

// Función para vaciar el carrito
function clearCart() {
    cart.forEach(item => {
        const product = productsArray.find(p => p.id === item.id);
        if (product) {
            product.stock += item.quantity; 
        }
    });
    cart = [];
    
    updateCart();
    displayProducts();
    displayCart();
}

// Función para cerrar el carrito
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Función para actualizar el contador del carrito
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.reduce((count, item) => count + item.quantity, 0);
}

// Función para completar la compra
function completePurchase() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    alert("¡Compra realizada con éxito! Gracias por su compra.");
    cart = []; 
    updateCart(); 
    displayProducts(); 
    location.reload();
}

// Inicializa la visualización de productos
displayProducts();