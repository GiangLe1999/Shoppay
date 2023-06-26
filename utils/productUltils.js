export const sortPricesArr = (products) => {
  return products.map((product) => product.price).sort((a, b) => a - b);
};

export const priceAfterDiscount = (beforePrice, discount) => {
  return (beforePrice - (beforePrice * discount) / 100).toFixed(2);
};
