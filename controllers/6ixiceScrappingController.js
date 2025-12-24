// require("dotenv").config();
const puppeteer = require("puppeteer");
const { removeSpinPopup } = require("../popupModal/removeSpinPopup");
const { createPage } = require("../scraper/createPage");

const CATEGORY_URL = process.env.CATEGORY_URL;

const scrape6ixiceProduct = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
    ],
    defaultViewport: null,
  });

  try {
    const page = await createPage(browser);

    await page.goto(CATEGORY_URL, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    /* REMOVE POPUP ON LOAD */
    await removeSpinPopup(page);

    await page.waitForSelector("section.collection-products-list", {
      timeout: 30000,
    });

    let pageCount = 1;

    while (true) {
      /* REMOVE POPUP AGAIN (SAFETY) */
      await removeSpinPopup(page);

      console.log(`📄 Scraping page ${pageCount}`);

      /* -------- SCRAPE PRODUCTS -------- */
      const productLinks = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(".product-item .product-item-info a[href]")
        ).map((el) => el.href)
      );

      console.log(`🛍 Found ${productLinks.length} products`);

      for (const href of productLinks) {
// SINGLE PRODUCT SCRAPPING LOGIC HERE

      }

      /* -------- CHECK NEXT BUTTON -------- */
      const hasNext = await page.$(".pagination-next");

      if (!hasNext) {
        console.log("⛔ No next page → category completed");
        break;
      }

      console.log("➡️ Clicking NEXT");

      /* -------- SCROLL INTO VIEW -------- */
      await page.evaluate(() => {
        document
          .querySelector(".pagination-next")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      });

      /* -------- CLICK + WAIT FOR NEW PRODUCTS -------- */
      const firstProductBefore = await page.evaluate(
        () =>
          document.querySelector(".product-item .product-item-info a[href]")
            ?.href
      );

      await Promise.all([
        page.click(".pagination-next"),
        page.waitForFunction(
          (prev) => {
            const first = document.querySelector(
              ".product-item .product-item-info a[href]"
            )?.href;
            return first && first !== prev;
          },
          { timeout: 60000 },
          firstProductBefore
        ),
      ]);

      console.log("✅ Next page loaded");

      pageCount++;
    }
  } catch (err) {
    console.error("❌ Fatal Error:", err.message);
  } finally {
    await browser.close();
  }
};

module.exports = { scrape6ixiceProduct };
