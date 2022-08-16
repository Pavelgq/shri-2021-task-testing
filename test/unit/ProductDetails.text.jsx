import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import events from "@testing-library/user-event";
import { CartApi } from "../../src/client/api";
import { getMockCart, getMockProduct } from "./mosk/moskData";
import { ProductDetails } from "../../../../../src/client/components/ProductDetails";
import { MockStore } from "./mosk/moskStore";


const renderProduct = (product) => {
    return render(
        <MockStore>
            <ProductDetails product={product} />
        </MockStore>
    );
};

describe('Проверки страницы с подробной информацией о товаре', () => {
    const productId = 0;
    const product = getMockProduct(productId);
    let container;
    beforeEach(() => {
        container = renderProduct(product).container;
    })
    it('На странице отображается название', () => {
        const value = container.querySelector('.ProductDetails-Name').innerHTML;

        expect(value).toBe(product.name);
    });

    it('На странице отображается описание', () => {
        const value = container.querySelector('.ProductDetails-Description').innerHTML;

        expect(value).toBe(product.description);
    });

    it('На странице отображается цена', () => {
        const value = container.querySelector('.ProductDetails-Price').innerHTML;

        expect(value).toBe(`$${product.price}`);
    });

    it('На странице отображается цвет', () => {
        const value = container.querySelector('.ProductDetails-Color').innerHTML;

        expect(value).toBe(product.color);
    });

    it('На странице отображается материал', () => {
        const value = container.querySelector('.ProductDetails-Material').innerHTML;

        expect(value).toBe(product.material);
    });

    it('На странице отображается кнопка добавления в корзину', () => {
        const button = container.querySelector('.ProductDetails-AddToCart');

        expect(button).toBeDefined();
    });

    it('При клике на кнопку, товар добавляется в корзину', () => {
        const cart = new CartApi();

        cart.setState(getMockCart(productId));
        renderProduct(product);

        const cartState = cart.getState();

        expect(cartState).toHaveProperty(productId.toString());
        cart.setState({});
    });

    it('Если товар добавлен в корзину, отображается сообщение о наличии товара в корзине', () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const cart = new CartApi();

        cart.setState(getMockCart(productId));
        renderProduct(product);
        screen.getByText(/Item in cart/i);
        cart.setState({});
    });

    it('Если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
        const productId = 0;
        const product = getMockProduct(productId);
        const cart = new CartApi();

        renderProduct(product);

        const buttonSubmit = screen.getByRole('button', {name: /Add to Cart/i});

        await events.click(buttonSubmit);

        let countCurProductInCart = cart.getState()?.[productId]?.count;

        expect(countCurProductInCart).toBe(1);
        await events.click(buttonSubmit);
        countCurProductInCart = cart.getState()?.[productId]?.count;
        expect(countCurProductInCart).toBe(2);
        cart.setState({});
    });
});