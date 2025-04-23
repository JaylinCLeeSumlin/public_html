var products = [];
var designs = [];

document.addEventListener("DOMContentLoaded",()=>{
    loadProducts()
  })

function loadProducts(){
    fetch("./data/products.json")
        .then(response => response.json())
        .then(data =>{
            data.products.forEach(p => {
                products.push(p);
            });
            displayProducts();
        })
}

function displayProducts() {
    productContainer = document.getElementById("productList");

    products.forEach(p => {
        item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-start";

        div = document.createElement("div");
        div.className = "ms-2 me-auto";

        subDiv = document.createElement("div");
        subDiv.className = "fw-bold";
        subDiv.textContent = `${p.title}`;
        div.appendChild(subDiv);
        item.appendChild(div);

        span = document.createElement("span");
        span.className = "badge text-bg-primary rounded-pill";
        span.textContent = `${getRandomInt(100)}`;
        item.appendChild(span);

    }) 
}

function loadDesigns(){
    config.current_cat= document.getElementById("cat").value;
    fetch("./data/designs.json")
        .then(response => response.json())
        .then(data =>{
            data.products.forEach(p => {
                designs.push(p);
            });
            displayDesigns();
        })
}