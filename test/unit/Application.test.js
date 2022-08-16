// import { shallow, mount, render } from "enzyme";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import events from "@testing-library/user-event";
// import { render } from "@testing-library/react";

import { AppForTest } from "./mosk/AppForTest";

describe("Проверка наличия страниц", () => {
  it('При переходе /catalog открывается страница "Catalog"', () => {
    render(<AppForTest path="/catalog" />);
    screen.getByRole("heading", { name: /Catalog/i, level: 1 });
  });

  it('При переходе /delivery открывается страница "Delivery"', () => {
    render(<AppForTest path="/delivery" />);
    screen.getByRole("heading", { name: /Delivery/i, level: 1 });
  });

  it('При переходе /contacts открывается страница "Contacts"', () => {
    render(<AppForTest path="/contacts" />);
    screen.getByRole("heading", { name: /Contacts/i, level: 1 });
  });

  it('При переходе /cart открывается страница "Shopping cart"', () => {
    render(<AppForTest path="/cart" />);
    screen.getByRole("heading", { name: /Shopping cart/i, level: 1 });
  });
});

describe("Общие требования: в шапке отображаются ссылки ", () => {
  beforeEach(() => {
    render(<AppForTest path="/" />);
  });
  it("Отображается ссылка на главную страницу", async () => {
    const link = screen.getByRole("link", { name: /example store/i });

    expect(link).toBeDefined();
  });

  it("Отображается ссылка на страницу каталога", () => {
    const link = screen.getByRole("link", { name: /catalog/i });

    expect(link).toBeDefined();
  });

  it("Отображается ссылка на страницу доставки", () => {
    const link = screen.getByRole("link", { name: /delivery/i });

    expect(link).toBeDefined();
  });

  it("Отображается ссылка на страницу контантов", () => {
    const link = screen.getByRole("link", { name: /contacts/i });

    expect(link).toBeDefined();
  });

  it("Отображается ссылка на корзину товара", () => {
    const link = screen.getByRole("link", { name: /cart/i });

    expect(link).toBeDefined();
  });
});

describe("Прочие требования", () => {
  it("название магазина в шапке должно быть ссылкой на главную страницу", async () => {
    const { container } = render(<AppForTest path="/cart" />);

    await fireEvent.click(screen.getByRole("link", { name: /example store/i }));

    const homeElement = screen.getByText(/Welcome to Example store/i);
    expect(homeElement).toBeDefined();
  });
});
