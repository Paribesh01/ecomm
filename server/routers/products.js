const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.post("/add", (req, res) => {
  const { name, price, description } = req.body;

  const newProduct = new Product({
    name: name,
    price: price,
    description: description,
  });

  newProduct
    .save()
    .then((pr) => {
      console.log(pr.name + " is created!!");
      res.status(201).json(pr);
    })
    .catch((err) => {
      console.log("Error while adding a product " + err);
      res.status(500).json({ error: "Error while adding a product" });
    });
});

module.exports = router;
