const express = require('express');
const path = require("path");
const cart = require('./routes/cart.js');

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.use("/cart", cart);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});