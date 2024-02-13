const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const auth = require("../middle/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/add", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const token = req.cookies.token;

    const verified = jwt.verify(token, process.env.SECRET);
    const userId = verified.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const newBlog = new Blog({
      title: title,
      description: description,
      userId: userId,
    });

    await newBlog.save();

    user.blogs.push(newBlog);
    await user.save();

    console.log(
      `${newBlog.title} is created and added to user ${user.email}!!`
    );
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/showall", auth, async (req, res) => {
  const token = req.cookies.token;
  const verified = jwt.verify(token, process.env.SECRET);
  const userId = verified.user;
  await Blog.find({ userId: userId })
    .then((blogs) => {
      console.log("found all the blogs");
      res.status(200).json(blogs);
    })
    .catch((err) => {
      console.log("error while find all the blogs" + err);
      res.status(500).json({ error: "Error while find all blogs" });
    });
});

router.get("/get/:id", auth, async (req, res) => {
  await Blog.findById(req.params.id)
    .then((blog) => {
      console.log("found the blog " + blog.title);
      res.status(200).json(blog);
    })
    .catch((err) => {
      console.log("error while finding blog by id " + err);
      res.status(500).json({ error: "error while finding blog by id " });
    });
});

router.delete("/delete/:id", auth, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
    .then((blog) => {
      console.log(blog.title + " is deleted");
      res.status(200).json(blog.title + " Deleted success fully");
    })
    .catch((err) => {
      console.log("error while deleting blog " + err);
      res.status(500).json({ error: "Error while deleting blog." });
    });
});

router.delete("/deleteall", async (req, res) => {
  try {
    // Delete all documents from the Blog collection
    await Blog.deleteMany({});
    res.send("All documents deleted from the Blog collection.");
  } catch (error) {
    console.error("Error occurred while deleting documents:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
