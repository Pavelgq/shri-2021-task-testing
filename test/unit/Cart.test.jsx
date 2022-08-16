import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CartApi } from "../../src/client/api";
import { Cart } from "../../src/client/pages/Cart";
import { getMockCart } from "./mosk/moskData";
import { MockStore } from "./mosk/moskStore";
import { AppForTest } from './mosk/AppForTest';

const CartWrapperForTest = () => (
    <MockStore>
        <BrowserRouter>
            <Cart />
        </BrowserRouter>
    </MockStore>
);

/**
 * Рендерит корзину с компонентом
 * @param {number} id Product id
 * @returns Render result
 */
const renderCartWithProduct = (id) => {
    const cart = new CartApi();
    cart.setState(getMockCart(id));
    const renderComponent = render(<CartWrapperForTest />);
    cart.setState({});
    return renderComponent;
}

describe('Проверки функционала в корзине', () => {

    it('Когда в корзине товары, в шапке рядом со ссылкой на корзину отображается количество не повторяющихся товаров в ней', () => {
      const cart = new CartApi();
      const itemsCart = {...getMockCart(0), ...getMockCart(1)};
      cart.setState(itemsCart);
      // render(<CartWrapperForTest />);
      render(<AppForTest path="/" />);
      screen.getByText(`Cart (2)`);
      cart.setState({});
    })

    it('Когда корзина пустая, отображатется ссылка на каталог', async () => {
        render(<AppForTest path="/cart" />);

        const catalogLinks = screen.getAllByRole('link', {name: /catalog/i});
        const catalogLink = catalogLinks[catalogLinks.length - 1];

        await fireEvent.click(catalogLink);
        screen.getByRole('heading', {name: /Catalog/i, level: 1});
    });

    it('Когда в корзине несколько товаров, отображается верная сумма заказа', () => {
        const cart = new CartApi();
        const items = {...getMockCart(0), ...getMockCart(1)};
        const total = Object.values(items)
            .reduce((prev, item) =>  prev + (item.price * item.count), 0);

        cart.setState(items);
        render(<CartWrapperForTest />);
        screen.getByText(`$${total}`);
        cart.setState({});
    });

    it('При нажатии на кнопку для очистки, корзина очищается', async () => {
        const cart = new CartApi();
        const productId = 0;
        renderCartWithProduct(productId);
        const buttonSubmit = screen.getByRole('button', {name: /Clear shopping cart/});

        await fireEvent.click(buttonSubmit);

        const cartIsEmpty = screen.getByText(/Cart is empty/i);

        expect(cartIsEmpty).toBeDefined();
        cart.setState({});
    });


});

describe('Проверка отображения товаров в корзине', () => {
    const productId = 0;
    const cart = new CartApi();
    const dataCart = getMockCart(productId);
    const product = dataCart[productId];
    let container;
    beforeEach(() => {
      cart.setState(dataCart);
      container = render(<CartWrapperForTest />).container;
    });
      

    it('Отображается название товара', async () => {
        screen.getByText(`${product.name}`)
        cart.setState({});
    });

    it('Отображается цена товара', async () => {
        screen.getAllByText(`$${product.price}`)
        cart.setState({});
    });

    it('Отображается количество товара', async () => {
        screen.getByText(`${product.count}`);
        const item = container.querySelector('.Cart-Count');
        expect(item).toBeDefined();
        cart.setState({});
    });

    it('Отображается общая стоимость товаров', async () => {
        const total = product.price * product.count;

        const totalFields = screen.getAllByText(`$${total}`);
        expect(totalFields[totalFields.length - 1].classList.contains('Cart-OrderPrice')).toBeTruthy();
        cart.setState({});
    });
});

describe('Проверка формы для заказа', () => {
    it('Форма присутствует на странице', async () => {
        const productId = 0;
        const {container} = renderCartWithProduct(productId);
        const issetForm = container.querySelector('.Form');

        expect(issetForm).toBeDefined();
    });

    it('Если форма пуста, она не отправляется', async () => {
        const cart = new CartApi();
        const productId = 0;
        const {container} = renderCartWithProduct(productId);
        const buttonSubmit = screen.getByRole('button', {name: /Checkout/i});

        await fireEvent.click(buttonSubmit);

        const inValidInput = container.querySelector('.Form .Form-Field.is-invalid');

        expect(inValidInput).toBeDefined();
        cart.setState({});
    });

    it('Оформление заказа работает', async () => {
        const cart = new CartApi();
        const productId = 0;
        renderCartWithProduct(productId);
        const inputName = screen.getByRole('textbox', {name: /name/i});
        const inputPhone = screen.getByRole('textbox', {name: /phone/i});
        const inputAddress = screen.getByRole('textbox', {name: /address/i});
        const submitButton = screen.getByRole('button', {name: /Checkout/i});

        fireEvent.change(inputName, {target: {value: 'Product for test'}});
        fireEvent.change(inputPhone, {target: {value: '89990001122'}});
        fireEvent.change(inputAddress, {target: {value: 'Address for test'}});
        await fireEvent.click(submitButton);

        const message = screen.getByText(/Well done/i);

        expect(message).toBeDefined();
        cart.setState({});
    });
});

