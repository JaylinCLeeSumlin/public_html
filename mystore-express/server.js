const express = require('express');
const app = express();
const port = 3000;

const cart = require('./routes/cart.js');

app.use(express.json());
app.use(express.static("public"))

app.use("/cart", cart);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});