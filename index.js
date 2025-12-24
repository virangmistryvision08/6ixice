require("dotenv").config();
require("./config/dbConnect");
const express = require("express");
const app = express();
const port = +process.env.PORT;
const productRoute = require("./routes/productRoute");

app.use(express.json());

app.use("/api", productRoute);

app.listen(port, () => {
  console.log("Server Started At PORT -", port);
});
