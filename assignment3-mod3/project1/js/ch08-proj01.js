
const tax_rate = prompt('Enter tax rate (0.10)');
const shipping_threshold = prompt('Enter shipping threshold (1000)');

/* add loop and other code here ... in this simple exercise we are not
   going to concern ourselves with minimizing globals, etc */
// import { outputCartRow } from "./functions";
// import { cart } from "./data";

function displayRow() {
   var subtotal = 0;
   var total;
   cart.forEach(item => {
      // total = calculateTotal(item.quantity, item.product.price);
      total = calculateTotal(item.quantity, item.product.price);
      outputCartRow(item, total);
      subtotal += total;
});
   subtotal = outputSubtotal(subtotal);
   tax = outputTax(subtotal, tax_rate);
   shipping = outputShipping(subtotal, shipping_threshold);
   outputGrandTotal(subtotal, tax, shipping);
}

document.addEventListener("DOMContentLoaded", displayRow);