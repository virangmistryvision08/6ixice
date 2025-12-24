const express = require("express");
const {
  scrape6ixiceProduct,
} = require("../controllers/6ixiceScrappingController");
const router = express.Router();

router.get("/6ixice-product", scrape6ixiceProduct);

module.exports = router;
