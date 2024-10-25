let   productsArray =[
{id: 1, name :`iphon2 16`,price:8000000,stock:16,image:`/assets/img/iphone 16.webp`},
{id:2,name:`iphone 12`,price:1400000,stock:20,image:`/assets/img/iphone 16.webp`}

]


function displayProducts() {
    const productsDiv = document.getElementById('container-items');
    productsDiv.innerHTML = '';
    productsArray.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('item');
        productDiv.innerHTML = `
            <figure>
                    <img src="${product.image} " alt ="${product.name}">
                </figure>
                <div class="inf-produc">
                    <h2>${product.name}</h2>
					<p class="price">$${product.price}</p>
                    <p class="price">stock: ${product.stock}</p>
					<button class="añadir-carrito">Añadir al carrito</button>
                </div>
        `;
        productsDiv.appendChild(productDiv);
    });
}
displayProducts()