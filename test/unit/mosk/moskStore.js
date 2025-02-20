import React from "react";
import { MockApi } from "./moskApi";
import { CartApi } from "../../../src/client/api";
import { initStore } from "../../../src/client/store";
import { Provider } from "react-redux";

const MockStore = ({ children }) => {
  const mockApi = new MockApi("/");
  const cart = new CartApi();
  const store = initStore(mockApi, cart);

  return <Provider store={store}>{children}</Provider>;
};

export { MockStore };
