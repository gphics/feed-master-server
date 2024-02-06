module.exports = (data) => {
  const result = [...data].map((elem) => {
    elem.totalPrice = elem.quantity * elem.price
    return elem;
  });
  return { data: result, err: null };
};
