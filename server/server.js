const express = require("express");
const dbconn = require("./dbconn/db");
const productRouter = require("./routers/products");

const app = express();
app.use(express.json());

app.use("/product", productRouter);

app.listen(4000, (req, res) => {
  dbconn();
  console.log("Connected to the port 4000!!");
});
