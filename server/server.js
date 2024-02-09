const express = require("express");
const dbconn = require("./dbconn/db");
const productRouter = require("./routers/products");
const userRouter = require("./routers/users");
const authRouter = require("./middle/authfront");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

app.use("/verify", authRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(4000, (req, res) => {
  dbconn();
  console.log("Connected to the port 4000!!");
});
