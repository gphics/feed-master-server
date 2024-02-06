module.exports = (data) => {
  let total = 0;
  data.forEach((elem) => {
    total += elem.contributedCp;
  });
  return { data: total, err: null };
};
