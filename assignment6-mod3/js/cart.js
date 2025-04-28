function displayCart() {
    shoppingcart = JSON.parse(Cookies.get('shoppingcart'));
    shoppingcart.forEach(p => {
        console.log(p.qty);
    })
}