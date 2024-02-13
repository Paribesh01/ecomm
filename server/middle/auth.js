const jwt = require("jsonwebtoken");
require("dotenv").config();
function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    console.log("token in auth " + token);
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;
