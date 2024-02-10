const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

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

    // Hash the password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error while hashing password." });
      }

      try {
        // Create a new user with hashed password
        const newUser = new User({ email: email, password: hash });
        const savedUser = await newUser.save();

        // token for signin

        const token = jwt.sign(
          {
            user: savedUser._id,
          },
          SECRET
        );
        console.log(newUser.email + " is created!!");

        res.cookie("token", token).status(200).json({ success: true });
      } catch (error) {
        console.error("Error while creating a user", error);
        res.status(500).json({ error: "Error while creating a user" });
      }
    });
  } catch (error) {
    console.error("Error while creating a user", error);
    res.status(500).json({ error: "Error while creating a user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("No user found");
      return res.status(404).json({ error: "User does not exist" });
    }

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error while comparing passwords", err);
        return res
          .status(500)
          .json({ error: "Error while comparing passwords" });
      }
      if (result) {
        console.log("Password matched, login!!");
        const token = jwt.sign(
          {
            user: user._id,
          },
          SECRET
        );

        return res.cookie("token", token).status(200).json({ success: true });
      } else {
        console.log("Wrong password!!");
        return res.status(401).json({ error: "Incorrect password" });
      }
    });
  } catch (err) {
    console.error("Error while logging in the user", err);
    res.status(500).json({ error: "Error while logging in a user." });
  }
});

router.get("/logout", (req, res) => {
  console.log("Logouted");
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ message: "Logouted" });
});

module.exports = router;
