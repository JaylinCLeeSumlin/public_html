const products = [
    { name: "Product 1", price: "$10", image: "images/product1.jpg" },
    { name: "Product 2", price: "$15", image: "images/product2.jpg" },
    { name: "Product 3", price: "$20", image: "images/product3.jpg" },
    { name: "Product 4", price: "$25", image: "images/product4.jpg" },
    { name: "Product 5", price: "$30", image: "images/product5.jpg" },
    { name: "Product 6", price: "$35", image: "images/product6.jpg" },
    { name: "Product 7", price: "$40", image: "images/product7.jpg" },
    { name: "Product 8", price: "$45", image: "images/product8.jpg" },
    { name: "Product 9", price: "$50", image: "images/product9.jpg" },
    { name: "Product 10", price: "$55", image: "images/product10.jpg" }
];

const productContainer = document.querySelector('.product-container');

if (productContainer) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%">
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <button onclick="alert('Added to cart')">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}