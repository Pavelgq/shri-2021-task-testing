import { ExampleApi } from "../../../src/client/api";
import { getMockProduct, getMockProducts, getMockCheckout } from "./moskData";

export class MockApi extends ExampleApi {
  async getProducts() {
    return { data: getMockProducts(3) };
  }

  async getProductById(id) {
    return { data: getMockProduct(id) };
  }

  async checkout(form, cart) {
    return { data: getMockCheckout(1) };
  }
}
