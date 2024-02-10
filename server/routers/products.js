const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const User = require("../models/user");
const auth = require("../middle/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/add", auth, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const token = req.cookies.token;

    const verified = jwt.verify(token, process.env.SECRET);
    const userId = verified.user; // Access the decoded user ID from the token payload

    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const newProduct = new Product({
      name: name,
      price: price,
      description: description,
      userId: userId, // Assign the user ID to the product
    });

    await newProduct.save();

    // Append the new product to the user's products array
    user.products.push(newProduct);
    await user.save();
    console.log(user);
    console.log(newProduct);

    console.log(
      `${newProduct.name} is created and added to user ${user.email}!!`
    );
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
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
