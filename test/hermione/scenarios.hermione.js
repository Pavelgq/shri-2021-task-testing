const { expect } = require("chai");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// describe("github", async function () {
//   it("Тест, который пройдет", async function () {
//     await this.browser.url("https://github.com/gemini-testing/hermione");
//     await this.browser.assertView("plain", "#readme", {
//       compositeImage: true,
//     });

//     const title = await this.browser.$("#readme h1").getText();
//     assert.equal(title, "Hermione");
//   });
// it("Тест, который пройдет", async function () {
//
//   await browser.keys(["курс доллара к рублю", "Enter"]);

//   const converter = await browser.$(".Converter");

//   await converter.waitForExist();

//   await browser.assertView("plain", ".Converter");

//   // const isExisting = await converter.isExisting();
//   // assert.ok(isExisting, "Конвертер валют не появился");
// });
// });

describe("Пользовательские сценарии", async function () {
  it("Сохранение состояние корзины после обновления страницы", async function () {
    const browser = this.browser;
    await browser.url("/hw/store/catalog");
    // await browser.execute(() => {});
    await browser.$(".ProductItem-DetailsLink").click();
    await browser.$(".ProductDetails-AddToCart").click();
    await browser.url("/hw/store/cart");
    await wait(200);
    await browser.refresh();
    await wait(200);

    const isDisplayed = await browser.$(".Cart-Table").isDisplayed();
    console.log(isDisplayed);
    expect(isDisplayed).to.equal(true);

    await browser.$(".Cart-Clear").click();
  });

  it("", async function () {});
  it("", async function () {});
  it("", async function () {});
});
