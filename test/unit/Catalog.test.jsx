import React from 'react'
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MockApi } from './mosk/moskApi';
import { AppForTest } from './mosk/AppForTest';
import { CartApi } from '../../../src/client/api';
import { getMockCart } from './mosk/moskData';
import { MockStore } from './mosk/moskStore';
import { BrowserRouter } from 'react-router-dom';
import { Catalog } from '../../../src/client/pages/Catalog';

const renderCatalog = () => {
    return render(
        <MockStore>
            <BrowserRouter>
                <Catalog />
            </BrowserRouter>
        </MockStore>
    );
}

describe('Проверки каталога', () => {
   let mockApi;
    beforeEach(() => {
      mockApi = new MockApi('/');
    }) 
    it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
       
        const products = await mockApi.getProducts();
        const productIds = products?.data?.map((product) => product.id);

        await renderCatalog();
        productIds.forEach((id) => screen.getAllByTestId(id));
    });

    it('Для каждого товара отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const products = await mockApi.getProducts();
        await renderCatalog();

        products.data.forEach((product) => {
            const oneProduct = screen.getAllByTestId(product.id)?.[0];
            within(oneProduct).getByRole('heading', {name: product.name, level: 5});
            within(oneProduct).getByText(`$${product.price}`);
            within(oneProduct).getByRole('link', {name: /Details/i});
        });
    });

    it('Если товар добавить в корзину, отображается сообщение о наличии его в корзине', async () => {
        const productId = 0;
        const cart = new CartApi();

        cart.setState(getMockCart(productId));
        await renderCatalog();

        const elProduct = screen.getAllByTestId(productId)?.[0];

        within(elProduct).getByText(/Item in cart/i);
        cart.setState({});
    });
    
    it('При клике по ссылке на товаре, переходим на страницу с подробной информацией о товаре', async () => {
        const mockApi = new MockApi('/');
        const products = await mockApi.getProducts();
        const product = products.data[0];

        await render(<AppForTest path={`/catalog`} />);

        const elProduct = screen.getAllByTestId(product.id)?.[0];
        const link = within(elProduct).getByRole('link', {name: /Details/i});

        await fireEvent.click(link);
        screen.getByRole('heading', {name: product.name, level: 1});
    });

   
});