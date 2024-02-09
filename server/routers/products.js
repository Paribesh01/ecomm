const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middle/auth");

router.post("/add", auth, async (req, res) => {
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

router.get("/showall", auth, async (req, res) => {
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

router.get("/get/:id", auth, async (req, res) => {
  await Product.findById(req.params.id)
    .then((pr) => {
      console.log("found the product " + pr.name);
      res.status(200).json(pr);
    })
    .catch((err) => {
      console.log("error while finding product by id " + err);
      res.status(500).json({ error: "error while finding product by id " });
    });
});

router.delete("/delete/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
    .then((pr) => {
      console.log(pr.name + " is deleted");
      res.status(200).json(pr.name + " Deleted success fully");
    })
    .catch((err) => {
      console.log("error while deleting product " + err);
      res.status(500).json({ error: "Error while deleting product." });
    });
});

module.exports = router;
