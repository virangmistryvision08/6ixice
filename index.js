require("dotenv").config();

require("./config/dbConnect.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const router = require("./routes/index.js");
const productRoute = require("./routes/productRoute");

app.use("/api", router);
app.use("/api/product", productRoute);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
