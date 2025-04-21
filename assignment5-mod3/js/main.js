var cart = [];

var config ={
  current_cat:null,
  products:[]
}

const Categories= Object.freeze({
  CANDYSTRIPE: 100,
  CHEVRON:200,
  BRAID: 300,
  HEART: 400,
  SPECIALTY: 500
})

function init() {

  if(document.getElementById("cat"))
      loadProducts()    
}

document.addEventListener("DOMContentLoaded",()=>{
  init()
})

document.addEventListener("DOMContentLoaded",()=>{
  displayImages()
})

function loadProducts(){
  config.current_cat= document.getElementById("cat").value;
  fetch("./data/products.json")
      .then(response => response.json())
      .then(data =>{
          data.products.forEach(p => {
              if(p.category == config.current_cat){
                  config.products.push(p);
              }
          });
          displayProducts();
      })
}

function displayProducts() {    
    displayContainer = document.getElementById("productList");

    if (config.products.length < 1) {
      p = document.createElement("p");
      p.textContent = "No products for this style yet. Stay tooned!";
      displayContainer.appendChild(p);
      return;
    }

    config.products.forEach(p => {
      displayElement = document.createElement("div");
      displayElement.className = "card";
      displayElement.style.width = "18rem;"

      image = document.createElement("img");
      image.className = "card-img-top"
      image.src = `./images/${p.image}.png`;

      displayElement.appendChild(image);

      div = document.createElement("div");
      div.className = "card-body";

      title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = p.name;
      div.appendChild(title)

      bigImage = document.createElement("a");
      bigImage.href = `./images/designs/${p.image}.png`;
      bigImage.className = "btn btn-primary";
      bigImage.target = "_blank";
      bigImage.textContent = "Enlarged Image";
      div.appendChild(bigImage);

      addToCartBtn = document.createElement("button");
      addToCartBtn.type = "button";
      addToCartBtn.className = "btn btn-primary";
      addToCartBtn.addEventListener("click", () => updateCart(p));

      addToCartIcon = document.createElement("span");
      addToCartIcon.className = "material-symbols-outlined";
      addToCartIcon.textContent = "add_shopping_cart";
      addToCartBtn.appendChild(addToCartIcon);

      div.appendChild(addToCartBtn);

      displayElement.appendChild(div);

      displayContainer.appendChild(displayElement);
      // console.log(displayContainer.innerHTML);
     });
  }

function displayImages() {
  imageContainer = document.getElementsByClassName("carousel-inner")[0];
  // console.log(imageContainer.innerHTML);

  fetch("./data/products.json")
      .then(response => response.json())
      .then(data =>{
          data.products.forEach((p, index) => {
            div = document.createElement("div");
            div.className = "carousel-item" + (index === 0 ? " active" : "");

            image = document.createElement("img");
            image.src = `./images/${p.image}.png`;
            image.className = "d-block w-100";
            div.appendChild(image);

            imageContainer.appendChild(div);
          })
        })
}

function updateCart(p) {
  cart.push(p);

  const cartBtn = document.getElementById("cartBtn");
  const cartIcon = cartBtn.querySelector(".material-symbols-outlined");

  const existingCounter = cartBtn.querySelector(".cart-counter");
  if (existingCounter) {
    existingCounter.remove();
  }

  const counter = document.createElement("span");
  counter.className = "cart-counter";
  counter.textContent = cart.length;

  cartBtn.appendChild(counter);
}

function displayDesigns() {
  function displayImages() {
    imageContainer = document.getElementsByClassName("carousel-inner")[0];
    // console.log(imageContainer.innerHTML);
  
    fetch("./data/designs.json")
        .then(response => response.json())
        .then(data =>{
            data.designs.forEach(d => {
              displayElement = document.createElement("div");
              displayElement.className = "card";
              displayElement.style.width = "18rem;"

              image = document.createElement("img");
              image.className = "card-img-top"
              image.src = `./images/${d.image}.png`;

              displayElement.appendChild(image);

              div = document.createElement("div");
              div.className = "card-body";

              title = document.createElement("h5");
              title.className = "card-title";
              title.textContent = d.name;
              div.appendChild(title)

              bigImage = document.createElement("a");
              bigImage.href = `./images/designs/${d.image}.png`;
              bigImage.className = "btn btn-primary";
              bigImage.target = "_blank";
              bigImage.textContent = "Enlarged Image";
              div.appendChild(bigImage);

              displayElement.appendChild(div);

              displayContainer.appendChild(displayElement);
            });
          })
  }
}