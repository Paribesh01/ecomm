const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = userVerify = (req, res) => {
  const token = req.cookies.token;
  // console.log(token + " from verifyyyy");
  if (!token) {
    return res.status(401).json({ error: "unauthorized user" });
  }

  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(401).json({ error: "Token did not match" });
    }

    try {
      const user = await User.findById(data.user);
      if (user) {
        return res.json({ user: user });
      } else {
        return res.status(401).json({ error: "User not found saiiii" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
