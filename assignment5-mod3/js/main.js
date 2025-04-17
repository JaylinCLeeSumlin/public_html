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

function loadProducts(){
  config.current_cat= document.getElementById("cat").value;
  fetch("data/products.json")
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
    displayElement = document.getElementById("productList");

    config.products.forEach(p => {

      console.log(p);

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
      a.href = `./images/designs/${image.src}`;
      a.className = "btn btn-primary";
      a.target = "_blank";
      a.textContent = "Enlarged Image";
      div.appendChild(bigImage);

      displayElement.appendChild(div);


     });
  }