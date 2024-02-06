module.exports = (input) => {
  const fixedIngredients = { hasCp: [], noCp: [] };
  const nonFixedIngredients = { energySource: [], proteinSource: [] };
  const result = { data: {}, err: null };
  input.forEach((elem) => {
    if (!elem.price) {
      result.err = `${elem.name} does not have a price`;
    }
    if (elem.quantity) {
      if (elem.cp) {
        fixedIngredients.hasCp.push(elem);
      } else {
        fixedIngredients.noCp.push(elem);
      }
    } else if (elem.cp < 20) {
      nonFixedIngredients.energySource.push(elem);
    } else {
      nonFixedIngredients.proteinSource.push(elem);
    }
  });
  result.data = { fixedIngredients, nonFixedIngredients };
  return result;
};
