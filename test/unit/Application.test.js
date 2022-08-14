// import { shallow, mount, render } from "enzyme";
import { AppForTest } from "./mosk/AppForTest";

describe("Переходы по адресу", () => {
  it('Путь /catalog открывается страница "Catalog"', () => {
    render(<AppForTest path="/catalog" />);
    screen.getByRole("heading", { name: /Catalog/i, level: 1 });
  });

  it('/delivery открывается страница "Delivery"', () => {
    render(<AppForTest path="/delivery" />);
    screen.getByRole("heading", { name: /Delivery/i, level: 1 });
  });

  it('/contacts открывается страница "Contacts"', () => {
    render(<AppForTest path="/contacts" />);
    screen.getByRole("heading", { name: /Contacts/i, level: 1 });
  });

  it('/cart открывается страница "Shopping cart"', () => {
    render(<AppForTest path="/cart" />);
    screen.getByRole("heading", { name: /Shopping cart/i, level: 1 });
  });
});

describe("Ссылки в шапке ", () => {
  it("Ссылка на главную страницу соответствуют назначению", async () => {
    const { container } = render(<AppForTest path="/" />);
    const elLinkInHeader = !!container.querySelector(
      ".navbar a.Application-Brand"
    );

    expect(elLinkInHeader).toBeTruthy();
  });

  it("Ссылка на страницу каталога соответствуют назначению", () => {
    const { container } = render(<AppForTest path="/" />);
    const elLinkInHeader = !!container.querySelector(
      ".navbar a.nav-link[href$=catalog]"
    );

    expect(elLinkInHeader).toBeTruthy();
  });

  it("Ссылка на страницу доставки соответствуют назначению", () => {
    const { container } = render(<AppForTest path="/" />);
    const elLinkInHeader = !!container.querySelector(
      ".navbar a.nav-link[href$=delivery]"
    );

    expect(elLinkInHeader).toBeTruthy();
  });

  it("Ссылка на страницу контантов соответствуют назначению", () => {
    const { container } = render(<AppForTest path="/" />);
    const elLinkInHeader = !!container.querySelector(
      ".navbar a.nav-link[href$=contacts]"
    );

    expect(elLinkInHeader).toBeTruthy();
  });

  it("Ссылка на корзину товара соответствуют назначению", () => {
    const { container } = render(<AppForTest path="/" />);
    const elLinkInHeader = !!container.querySelector(
      ".navbar a.nav-link[href$=cart]"
    );

    expect(elLinkInHeader).toBeTruthy();
  });
});

describe("Другие требования", () => {
  it('при выборе элемента из меню "гамбургера", меню должно закрываться', async () => {
    const { container } = render(<AppForTest path="/" />);

    await events.click(screen.getByRole("link", { name: /delivery/i }));

    const isClosedMobileMenu = !!container.querySelector(
      ".navbar-collapse.collapse"
    );

    expect(isClosedMobileMenu).toBeTruthy();
  });

  it("название магазина в шапке должно быть ссылкой на главную страницу", async () => {
    const { container } = render(<AppForTest path="/delivery" />);

    await events.click(screen.getByRole("link", { name: /example store/i }));

    const issetElHome = !!container.querySelector(".Home");

    expect(issetElHome).toBeTruthy();
  });
});
