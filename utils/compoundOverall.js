const numFix = require("./numFix");
const calcOverallContributedCp = require("./calcOverallContributedCp");
const calcOverallCost = require("./calcOverallCost");
const calcOverallQuantity = require("./calcOverallQuantity");
module.exports = (energy, protein) => {
  // overall quantity
  const energyOverallQuantity = calcOverallQuantity(energy).data;
  const proteinOverallQuantity = calcOverallQuantity(protein).data;
  const finalTotalNonFixedQuantity =
    energyOverallQuantity + proteinOverallQuantity;

  // __________________
  // __________________
  // overall cost
  const energyOverallCost = calcOverallCost(energy).data;
  const proteinOverallCost = calcOverallCost(protein).data;
  const finalTotalNonFixedCost = numFix(energyOverallCost + proteinOverallCost);
  // __________________
  // __________________
  // overall contributed cp
  const energyOverallContributedCp = calcOverallContributedCp(energy).data;
  const proteinOverallContributedCp = calcOverallContributedCp(protein).data;
  const finalTotalNonFixedContributedCp = numFix(
    proteinOverallContributedCp + energyOverallContributedCp
  );

  const data = {
    energyOverallContributedCp,
    energyOverallCost,
    energyOverallQuantity,
    proteinOverallContributedCp,
    proteinOverallCost,
    proteinOverallQuantity,
    finalTotalNonFixedContributedCp,
    finalTotalNonFixedCost,
    finalTotalNonFixedQuantity,
  };
  return { data, err: null };
};
