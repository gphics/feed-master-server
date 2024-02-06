const calcEachContributedCp = require("./calcEachContributedCp");
const calcEachCost = require("./calcEachCost");
const calcEachQuantity = require("./calcEachQuantity");

const compoundOverall = require("./compoundOverall");

module.exports = (nonFixedIngredients, mixingRatio, fromPearson) => {
  const result = { data: null, err: null };
  // __________________
  // __________________
  // adding the quantity
  // Energy
  const energyWithQuantity = calcEachQuantity(
    nonFixedIngredients.energySource,
    mixingRatio?.energySource || null,
    fromPearson.energyQuantity
  ).data;

  // Protein
  const proteinWithQuantity = calcEachQuantity(
    nonFixedIngredients.proteinSource,
    mixingRatio?.proteinSource || null,
    fromPearson.proteinQuantity
  ).data;
  // __________________
  // __________________
  // adding the totalPrice
  // Energy
  const energyWithQuantiyAndTotalPrice = calcEachCost(energyWithQuantity).data;
  // Protein
  const proteinWithQuantiyAndTotalPrice =
    calcEachCost(proteinWithQuantity).data;
  // __________________
  // __________________
  // adding the contributed crude protein
  //  Energy
  const energyWithCCP = calcEachContributedCp(
    energyWithQuantiyAndTotalPrice
  ).data;
  // Protein
  const proteinWithCCP = calcEachContributedCp(
    proteinWithQuantiyAndTotalPrice
  ).data;

  // __________________
  // __________________
  const compounds = compoundOverall(energyWithCCP, proteinWithCCP).data;
  result.data = { energyWithCCP, proteinWithCCP, ...compounds };
  return { ...result };
};
