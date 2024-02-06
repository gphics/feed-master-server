module.exports = (data) => {
  let quantity = 0;
  data.forEach((elem) => {
    quantity += elem.quantity;
  });
  return { data: quantity, err: null };
};
