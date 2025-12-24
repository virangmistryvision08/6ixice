const puppeteer = require("puppeteer");

async function scrapeColorVariant(handle, colorName) {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  const page = await browser.newPage();
  await page.goto(`https://6ixice.com/products/${handle}.js`, {
    waitUntil: "networkidle2",
  });

  const rawData = await page.evaluate(() =>
    JSON.parse(document.body.innerText)
  );

  await browser.close();

  const materialMap = {};

  rawData.variants.forEach((v) => {
    if (!materialMap[v.option1]) {
      materialMap[v.option1] = { material: v.option1, sizes: [] };
    }

    materialMap[v.option1].sizes.push({
      size: v.option2,
      price: Number(v.price),
      oldPrice: v.compare_at_price
        ? Number(v.compare_at_price)
        : null,
      variantId: v.id,
      variantUrl: `https://6ixice.com/products/${rawData.handle}?variant=${v.id}`,
    });
  });

  return {
    color: colorName,
    handle: rawData.handle,
    productUrl: `https://6ixice.com/products/${rawData.handle}`,
    materials: Object.values(materialMap),
  };
}

module.exports = scrapeColorVariant;