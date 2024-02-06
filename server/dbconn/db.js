const mongoose = require("mongoose");
require("dotenv").config();
URL = process.env.URL;

const dbconn = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the db");
    })
    .catch((err) => {
      console.log("Error while connecting to the database!!" + err);
    });
};

module.exports = dbconn;
