const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please enter all fields." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log(existingUser.email + " User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ email: email, password: password });
    await newUser.save();
    console.log(newUser.email + " is created!!");
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error while creating a user", error);
    res.status(500).json({ error: "Error while creating a user" });
  }
});

module.exports = router;
