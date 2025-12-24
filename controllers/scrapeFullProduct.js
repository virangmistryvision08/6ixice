const puppeteer = require("puppeteer");
const scrapeColorVariant = require("./scrapeColorVariant");

async function scrapeFullProduct() {
  const whiteGold = await scrapeColorVariant(
    "3mm-round-cut-diamond-tennis-bracelet-white-gold-1",
    "White Gold"
  );

  const yellowGold = await scrapeColorVariant(
    "3mm-round-cut-diamond-tennis-bracelet-18k-gold-1",
    "Yellow Gold"
  );

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  const page = await browser.newPage();


  await page.goto(
    "https://6ixice.com/products/3mm-round-cut-diamond-tennis-bracelet-white-gold-1",
    { waitUntil: "networkidle2" }
  );

  const ratings = await page.evaluate(() => {
    const ratingText = document.querySelector(
      ".okeReviews-a11yText"
    )?.innerText;

    const reviewText = document.querySelector(
      ".okeReviews-reviewsSummary-ratingCount span[aria-hidden='true']"
    )?.innerText;

    const average = ratingText
      ? Number(ratingText.match(/Rated ([\d.]+)/)?.[1])
      : 0;

    const reviewCount = reviewText
      ? Number(reviewText.match(/\d+/)?.[0])
      : 0;

    return { average, reviewCount };
  });


  await page.goto(
    "https://6ixice.com/products/3mm-round-cut-diamond-tennis-bracelet-white-gold-1.js",
    { waitUntil: "networkidle2" }
  );

  const rawData = await page.evaluate(() =>
    JSON.parse(document.body.innerText)
  );

  await browser.close();

  return {
    productName: rawData.title,
    productHandleGroup: "3mm-round-cut-diamond-tennis-bracelet",

    productImages: rawData.images,

    productDetails: {
      descriptionHtml: rawData.body_html,
      tags: rawData.tags,
      vendor: rawData.vendor,
      productType: rawData.product_type,
      shippingInfo: "Ships within 48 working hours",
    },

    ratings, 

    variants: [whiteGold, yellowGold],
  };
}

module.exports = scrapeFullProduct;
