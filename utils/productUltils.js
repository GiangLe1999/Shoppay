export const sortPricesArr = (products) => {
  return products.map((product) => product.price).sort((a, b) => a - b);
};

export const priceAfterDiscount = (beforePrice, discount) => {
  return (beforePrice - (beforePrice * discount) / 100).toFixed(2);
};

export const findAllSizes = (subProducts) => {
  const sizeObjectsArr = subProducts
    .map((subProduct) => subProduct.sizes)
    .flat();

  const sizeArr = sizeObjectsArr
    .map((sizeObj) => sizeObj.size)
    .sort((a, b) => a - b);

  return [...new Set(sizeArr)];
};

export const calculatePercentage = (reviewsArr, numsOfStar) => {
  const reviewNumsByStar = reviewsArr.filter(
    (r) => r.rating === numsOfStar || r.rating - 0.5 === numsOfStar
  );

  return ((reviewNumsByStar.length / reviewsArr.length) * 100).toFixed(1);
};
