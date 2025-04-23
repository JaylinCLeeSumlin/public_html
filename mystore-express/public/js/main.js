var config ={
    current_cat:null,
    products:[]
}

const Categories= Object.freeze({
    MEN: 100,
    WOMEN:200,
    KIDS: 300
})

function init() {

    if(document.getElementById("cat"))
        loadProducts()    
}

document.addEventListener("DOMContentLoaded",()=>{
    init()
})

function loadProducts(){
    config.current_cat= document.getElementById("cat").value;
    fetch("/mystore-express/data/products.json")
        .then(response => response.json())
        .then(data =>{
            data.products.forEach(p => {
                if(p.category == config.current_cat){
                    config.products.push(p);
                }
            });

            displayProducts()
            updateAddCartBtnHandler();
        })
}

function displayProducts() {    
       displayElement = document.getElementById("productList");

       displayContent = ""
       config.products.forEach(p => {
        displayContent  +=""
        +'<div class="col">'
        +'<div class="card h-100">'
          +'<img src="'+ p.images[0] +'" class="card-img-top" alt="...">'
          +'<div class="card-body">'
          +'<h5 class="card-title">'+p.name+'</h5>'
          +'<p class="card-text">';
            let description = p.descriptions
          for(let key in description){
            displayContent += '<strong>'+ key +'</strong>: '+ description[key] +'<br>'
          }
          displayContent += ' </p>'
          +'</div>'
          +'<div class="card-footer">'
           + '<div class="row">'
           +   '<div class="col-6">'
               + '<strong class="text-body-secondary ">Price: $'+ p.price +'</strong>'
            + '</div>'
            +'<div class="col text-end">'
            +'<a href="#" data-id="'+ p.id+'" class="btn btn-warning me-4 addCart" >Add</a>'
            +'<a href="#details" data-id="'+ p.id+'" class="btn btn-primary">more...</a>'
              +'</div></div></div></div></div>'
        displayElement.innerHTML = displayContent
       });
    }


function updateAddCartBtnHandler() {
    
    let listOfAddbtn = document.getElementsByClassName("addCart");

    for(let i = 0; i < listOfAddbtn.length; i++){
        listOfAddbtn[i].addEventListener("click", (e)=> {
            let pid = listOfAddbtn[i].dataset.id;

            let product = config.products.find(p => p.id === pid);
            if (product) {
                let price = product.price;
                let name = product.name;
                console.log(`price: ${price}`);
                console.log(`name: ${name}`);
                addToCart(pid, price, name);
            } else {
                console.log("Product not found.");
            }
            addToCart(pid, price, name);
        })
    }
    
    function addToCart(pid, price, name) {
        console.log("addToCart() called")

        fetch("/cart/add", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pid, price, name })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            updateCartBadge();
        });
    }
}

function updateCartBadge() {
    fetch("/cart")
        .then(res => res.json())
        .then(cart => {
            let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            let badge = document.querySelector(".cart-badge");

            if (totalQty > 0) {
                badge.textContent = totalQty;
                badge.style.display = "inline-block";
            } else {
                badge.style.display = "none";
            }
        });
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
});

function displayCartItems() {
    fetch("/cart")
        .then(res => res.json())
        .then(cart => {
            let tableBody = document.querySelector("tbody");
            let subtotal = 0;
            tableBody.innerHTML = "";

            cart.forEach(p => {
                let total = p.qty * p.price;
                subtotal += total;
                let row = `<tr>
                    <td><img src="${p.image || 'placeholder.jpg'}" alt="${p.name}" width="50"></td>
                    <td>${p.name}</td>
                    <td>${p.qty}</td>
                    <td>$${p.price.toFixed(2)}</td>
                    <td>$${total.toFixed(2)}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });

            document.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
        });
}

document.addEventListener("DOMContentLoaded", displayCartItems);