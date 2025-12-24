const scrapeAndSave = require("../controllers/scrapeAndSave");

const router = require("express").Router();

router.post("/scrappedProductData", scrapeAndSave);

module.exports = router;
