const express = require("express");
const dbconn = require("./dbconn/db");
const productRouter = require("./routers/products");
const userRouter = require("./routers/users");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(4000, (req, res) => {
  dbconn();
  console.log("Connected to the port 4000!!");
});
