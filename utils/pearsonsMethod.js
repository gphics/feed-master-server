const numFix = require("./numFix");
const percentOf = require("./percentOf");

module.exports = (energyCp, proteinCp, requiredCp, totalQuantity) => {
  const arr = [];
  const energySubtract = Math.abs(energyCp - requiredCp);
  const proteinSubtract = Math.abs(proteinCp - requiredCp);
  const netValue = proteinSubtract + energySubtract;
  const percentageEnergy = Math.abs((proteinSubtract / netValue) * 100);
  const percentageProtein = Math.abs((energySubtract / netValue) * 100);
  const energyQuantity = percentOf(percentageEnergy, totalQuantity);
  const proteinQuantity = percentOf(percentageProtein, totalQuantity);
  return {
    data: {
      percentageEnergy,
      percentageProtein,
      energyQuantity,
      proteinQuantity,
    },
    err: null,
  };
};
