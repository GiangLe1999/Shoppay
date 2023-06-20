const prettyDate = (data) => {
  return new Date(data).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default prettyDate;
