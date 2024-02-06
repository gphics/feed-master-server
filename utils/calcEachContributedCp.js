module.exports = (data) => {
  const res = data.map((elem) => {
    const first = (elem.cp / 100) * elem.quantity;
    elem.contributedCp = first
    return elem;
  });
  return { data: res, err: null };
};
