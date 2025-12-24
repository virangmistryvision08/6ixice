const Product = require("../models/scraper");
const scrapeFullProduct = require("./scrapeFullProduct");

async function scrapeAndSave() {
  const productData = await scrapeFullProduct();

  await Product.findOneAndUpdate(
    { productHandleGroup: productData.productHandleGroup },
    productData,
    { upsert: true, new: true, overwrite: true }
  );

  console.log(" Product scraped & saved successfully");
}

module.exports = scrapeAndSave;
