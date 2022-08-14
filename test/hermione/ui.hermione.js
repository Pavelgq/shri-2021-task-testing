const { assert } = require("chai");
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Адаптивная верстка", async function () {
  it("Сравнение скриншотов на расширении 1024px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1024, 2048);
    await browser.url("/hw/store/");
    await wait(2000);
    await browser.assertView("store-full-click", "#root");
    // await browser.assertView("plain", ".Home", {
    //   compositeImage: true,
    // });
  });
  it("Сравнение скриншотов на расширении 575px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(575, 1024);
    await browser.url("/hw/store/");
    await wait(2000);
    await browser.assertView("store-full-click", "#root");
    // await browser.assertView("plain", ".Home", {
    //   compositeImage: true,
    // });
  });
});
