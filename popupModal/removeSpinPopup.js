async function removeSpinPopup(page) {
  await page.evaluate(() => {
    /* Remove all Alia / Spin modals */
    document
      .querySelectorAll(
        '[id^="alia-root"], .animate-fade-in-up, [aria-modal="true"]'
      )
      .forEach((el) => el.remove());

    /* Remove fixed overlays */
    document
      .querySelectorAll('div[style*="position: fixed"][style*="z-index"]')
      .forEach((el) => {
        if (getComputedStyle(el).zIndex > 1000) el.remove();
      });

    /* Unlock page */
    document.body.style.overflow = "auto";
    document.body.style.pointerEvents = "auto";
    document.documentElement.style.overflow = "auto";
  });
}

module.exports = { removeSpinPopup };
