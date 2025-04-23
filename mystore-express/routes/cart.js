const express = require("express");
const router = express.Router()

router.get("/", (req, res) => {
    const cart = req.cookies.shoppingCart;
    res.json(cart);
})

router.post("/add", (req, res) => {
    const { pid, name, price } = req.body;
    var cart = req.cookie.shoppingCart;

    var item = cart.find(i => i.pid === pid);
    if (item) {
        item.amount += 1;
    } else {
        cart.push({ pid, name, price, amount: 1 })
    }

    res.cookie("shoppingCart", cart)
    res.json({ msg: `item od id ${pid} added to cart`, cart})
})

router.port("/clear")

module.exports = router;