const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId }],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
