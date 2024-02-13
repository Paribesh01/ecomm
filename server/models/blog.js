const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: mongoose.Schema.Types.ObjectId,
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
