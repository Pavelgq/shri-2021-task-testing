const { assert } = require("chai");
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Проверка адаптивная верстка", async function () {
  it("Сравнение скриншотов на расширении 1024px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1024, 2048);
    await browser.url("/hw/store/");
    await wait(2000);
    await browser.assertView("store-full-click", "#root", {});
    // await browser.assertView("plain", ".Home", {
    //   compositeImage: true,
    // });
  });
  it("Сравнение скриншотов на расширении 575px", async function () {
    const browser = this.browser;
    await browser.setWindowSize(575, 1024);
    await browser.url("/hw/store/");
    await wait(2000);
    await browser.assertView("store-mobile-click", "#root", {});
    // await browser.assertView("plain", ".Home", {
    //   compositeImage: true,
    // });
  });
  // it("Корзина", async function () {
  //   const browser = this.browser;
  //   await browser.url("/hw/store/cart");
  //   await wait(100);
  //   await browser.$(".col").scrollIntoView();
  //   await browser.assertView("cart-default", ".col");
  // });
});

describe("Проверка статического содержимого", async function () {
  it("Главная страница должна иметь статическое содержимое", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1024, 2048);
    await browser.url("/hw/store/");
    await wait(1000);
    await browser.assertView("store-main", "#root");
  });
  it("Страница доставки должна иметь статическое содержимое", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1024, 2048);
    await browser.url("/hw/store/delivery/");
    await wait(1000);
    await browser.assertView("delivery", "#root");
  });
  it("Страница с контактами должна иметь статическое содержимое", async function () {
    const browser = this.browser;
    await browser.setWindowSize(1024, 2048);
    await browser.url("/hw/store/contacts/");
    await wait(1000);
    await browser.assertView("contacts", "#root");
  });
});
