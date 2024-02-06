const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.post("/add", async (req, res) => {
  const { name, price, description } = req.body;

  const newProduct = new Product({
    name: name,
    price: price,
    description: description,
  });

  await newProduct
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

router.get("/showall", async (req, res) => {
  await Product.find({})
    .then((prr) => {
      console.log("found all the products");
      res.status(200).json(prr);
    })
    .catch((err) => {
      console.log("error while find all the products" + err);
      res.status(500).json({ error: "Error while find all products" });
    });
});

module.exports = router;
