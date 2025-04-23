document.addEventListener("DOMContentLoaded", displayRow)

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

function outputCartRow(item, total) {

    const tableBody = document.querySelector("tbody");
 
    let row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="images/${item.product.filename}" alt="${item.title}"></td>
        <td> ${item.product.title} </td>
        <td> ${item.quantity} </td>
        <td> $${item.product.price.toFixed(2)}</td>
        <td> $${total.toFixed(2)} </td>
    `;
 
    tableBody.insertBefore(row, document.querySelector(".totals"));
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
       subtotalRow.textContent = `$${subtotal.toFixed(2)}`;
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
       taxRow.textContent = `$${tax.toFixed(2)}`;
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
       shippingRow.textContent = `$${shipping.toFixed(2)}`;
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
       grandTotalRow.textContent = `$${grandTotal.toFixed(2)}`;
    } else {
       console.error("Grand Total row not found!");
    }
 }
 