/* define your functions here */
function calculateTotal(quantity, price) {
   return price * quantity;
}

function calculateTax(subtotal, tax_rate) {
   return subtotal * tax_rate;
}

function outputCartRow(item, total) {

   const tableBody = document.querySelector("tbody");

   document.write(`
      <tr>
          <td><img src="images/${item.product.filename}" alt="${item.product.title}"></td>
          <td>${item.product.title}</td>
          <td>${item.quantity}</td>
          <td>$${item.product.price.toFixed(2)}</td>
          <td>$${total.toFixed(2)}</td>
      </tr>
  `);

}

function outputSubtotal(subtotal) {

   const rows = document.querySelectorAll(".totals");
   var subtotalRow = null;

   rows.forEach(row => {
      if (row.cells[0].textContent.includes("Subtotal")) {
         subtotalRow = row.cells[1];
      }
   });

   // console.log(`subtotalRow found: ${subtotalRow ? "Yes" : "No"}`);

   if (subtotalRow) {
      document.write(`
         <tr class="totals">
            <td colspan="4">Subtotal</td>
            <td>$${subtotal.toFixed(2)}</td>
        </tr>
     `);
   } else {
      console.error("Subtotal row not found!");
   }

   return subtotal;
}

function outputTax(subtotal, tax_rate) {
   const rows = document.querySelectorAll(".totals");
   var taxRow = null;

   rows.forEach(row => {
      if (row.cells[0].textContent.includes("Tax")) {
         taxRow = row.cells[1];
      }
   });

   // console.log(`taxRow found: ${taxRow ? "Yes" : "No"}`);

   var tax = calculateTax(subtotal, tax_rate);

   if (taxRow) {
      document.write(`
         <tr class="totals">
            <td colspan="4">Tax</td>
            <td>$${tax.toFixed(2)}</td>
        </tr>
     `);
   } else {
      console.error("Tax row not found!");
   }

   return tax;
}

function outputShipping(subtotal, shipping_threshold) {
   const rows = document.querySelectorAll(".totals");
   var shippingRow = null;

   rows.forEach(row => {
      if (row.cells[0].textContent.includes("Shipping")) {
         shippingRow = row.cells[1];
      }
   });

   // console.log(`shippingRow found: ${shippingRow ? "Yes" : "No"}`);

   var shipping = 40;
   if (subtotal > shipping_threshold) {
      shipping = 0;
   }

   if (shippingRow) {
      document.write(`
         <tr class="totals">
            <td colspan="4">Shipping</td>
            <td>$${shipping.toFixed(2)}</td>
        </tr>
     `);
   } else {
      console.error("Shipping row not found!");
   }

   return shipping;
}

function outputGrandTotal(subtotal, tax, shipping) {
   const rows = document.querySelectorAll(".totals");
   var grandTotalRow = null;

   rows.forEach(row => {
      if (row.cells[0].textContent.includes("Grand Total")) {
         grandTotalRow = row.cells[1];
      }
   });

   // console.log(`grandTotalRow found: ${grandTotalRow ? "Yes" : "No"}`);

   var grandTotal = subtotal + tax + shipping;

   if (grandTotalRow) {
      document.write(`
         <tr class="totals">
            <td colspan="4">Grand Total</td>
            <td>$${grandTotal.toFixed(2)}</td>
        </tr>
     `);
   } else {
      console.error("Grand Total row not found!");
   }
}



        
