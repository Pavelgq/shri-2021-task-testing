import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

const MockRoute = ({ path, children }) => {
  const history = createMemoryHistory({
    initialEntries: [path],
    initialIndex: 0,
  });

  return <Router history={history}>{children}</Router>;
};

export { MockRoute };
