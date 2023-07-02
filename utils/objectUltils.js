export const calculateFiltersApplied = (object) => {
  let oldQuery = { ...object };
  for (const property in oldQuery) {
    if (!oldQuery[property].trim()) {
      delete oldQuery[property];
    }
  }

  return Object.keys(oldQuery).length;
};
