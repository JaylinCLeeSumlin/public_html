let shoppingcart=[]

function displayProducts(elm){
    elm.innerHTML=""
    for (let p in products) {
      let pd = '<div class="card m-5">'+
                    '<img src="'+products[p].imgs[0]+'" class="card-img-top" alt="'+products[p].title+'">' +
                    '<div class="card-body">'+
                    '<h5 class="card-title">'+products[p].title+'</h5>'+
                    '<p class="card-text">There are many great options available here! Check them out.  </p>'+
                    '<p class="card-text">$'+products[p].price +'</p>'+
                    '<button type="button" class="btn btn-primary" data-id="'+p+'" onclick="displayDetails(this)">'+
                    'Details'+
                '</button>'+
                '<button type="button" class="btn btn-secondary m-5" data-id="'+p+'" onclick="addtoShoppingcart(this)">'+
                    'Add'+
                '</button>'+   
                    '<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>'+
                     '   </div>'+
                    '</div>'

               

                
                // '<div class="modal fade" id="modal'+p+'" tabindex="-1" aria-labelledby="#modal'+p+'lable" aria-hidden="true">'+
                // '<div class="modal-dialog">'+
                // '    <div class="modal-content">'+
                // '    <div class="modal-header">'+
                // '       <h1 class="modal-title fs-5" id="modal'+p+'lable">'+products[p].title+'</h1>'+
                // '       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
                // '   </div>'+
                // '   <div class="modal-body">'+
                //         products[p].title
                // '   </div>'+
                // '    <div class="modal-footer">'+
                // '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
                // '        <button type="button" class="btn btn-primary">Save changes</button>'+
                // '    </div>'+
                // '    </div>'+
                // '</div>'+
                // '</div>'
        elm.innerHTML += pd

    }
    
}

function addtoShoppingcart(e){
    let productID = e.dataset.id
    let price = products[productID].price
    let qty=1

    // let shoppingcart=[]
    if (Cookies.get('shoppingcart')){

        shoppingcart = JSON.parse(Cookies.get('shoppingcart'))
        let hasUpdated= false
        shoppingcart.forEach(p => {
            if(p.pid== productID){
                p.qty +=1
                hasUpdated= true
            }
        });
        
        if(hasUpdated){
            Cookies.set("shoppingcart", JSON.stringify(shoppingcart))
        }else{            
            shoppingcart.push({"pid":productID, "price": price, "qty":qty})
            Cookies.set("shoppingcart", JSON.stringify(shoppingcart))
        }
        
    }else{
        shoppingcart.push({"pid":productID, "price": price,"qty":qty})
        Cookies.set("shoppingcart", JSON.stringify(shoppingcart))
    }

    updateShoppingCartBadge(shoppingcart);
}

function updateShoppingCartBadge(shoppingcart) {
    const cartBadgeNum = document.querySelector(".badge");
    if (cartBadgeNum) {
        cartBadgeNum.textContent = JSON.parse(Cookies.get('shoppingcart')).length;
    }
}

function displayCart() {
    console.log("displayCart() called");
    shoppingcart = JSON.parse(Cookies.get('shoppingcart'));

    list = document.querySelector(".list-group");
    if (list) {
        shoppingcart.forEach(p => {
            listItem = document.createElement("li");
            listitem.className = "list-group-item d-flex justify-content-between align-items-start";
            
            outerDiv = document.createElement("div");
            innerDiv = document.createElement("div");
            innerDiv.textContent = p.name;
            outerDiv.appendChild(innerDiv);
            listItem.append(outerDiv);
    
            span = document.createElement("span");
            span.className ="badge text-bg-primary rounded-pill";
            span.textContent = p.qty;
            listItem.appendChild(outerDiv);
        })
    }
}

function init(){

    var pCat = document.getElementById("productsCat")
    displayProducts(pCat)
    $("#productDetails").hide()
    displayCart();
}

function toggleDetails(){
    $("#productDetails").toggle()
    $("#productsCat").toggle()
}

function displayDetails(e){
    $("#productDetails").show()
    $("#productsCat").hide()

    let details = '<div onclick="toggleDetails()">Close <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">'+
    '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>'+
    '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'+
    '</svg></div>'
    let p = e.dataset.id
    products[p].imgs.forEach(src => {
        details +=''+
            '<img src="'+src+'" class="card-img-top" style="width:50%;" alt="...">'
            ''
        });

    $("#productDetails").html(details)  
 
}

$(document).ready(()=>{
    init()

})


//window.addEventListener("load", init)
