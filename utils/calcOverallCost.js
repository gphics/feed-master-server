module.exports = (data) => {
  let cost = 0;
  data.forEach((elem) => {
    cost += elem.totalPrice;
  });
  return { data: cost, err: null };
};
