export const filterArray = (array, property) => {
  return array.filter((item) => item.name == property).map((s) => s.value);
};

export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

export const randomize = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};
