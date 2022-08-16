const getMockShortProduct = (id) => ({
  id,
  name: `Какой-то товар ${id}`,
  price: 300,
});

const getMockProduct = (id) => ({
  id,
  name: `Какой-то товар ${id}`,
  price: 100,
  description: "Какое-то описание",
  material: "plastic",
  color: "green",
});

const getMockProducts = (n) => {
  return Array(n)
    .fill("")
    .map((el, id) => getMockShortProduct(id));
};

const getMockCheckout = (n) => {
  return { id: n };
};

const getMockCart = (id) => ({
  [id]: {
    name: `Товар для теста ${id}`,
    price: Math.floor(Math.random() * 100) + id,
    count: 2,
  },
});

export {
  getMockShortProduct,
  getMockProduct,
  getMockProducts,
  getMockCheckout,
  getMockCart,
};
